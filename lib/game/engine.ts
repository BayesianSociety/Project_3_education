import type { PuzzleDefinition, SceneEntity } from '../puzzles/definitions';

export type Facing = 'north' | 'south' | 'east' | 'west';
export type BlockCategory =
  | 'movement'
  | 'actions'
  | 'control'
  | 'logic'
  | 'sensing'
  | 'root';

export type BlockNode = {
  id: string;
  type: string;
  category: BlockCategory;
  label: string;
  args?: Record<string, unknown>;
  children?: BlockNode[];
  elseBranch?: BlockNode[];
};

export type MovementFrame = {
  x: number;
  y: number;
  facing: Facing;
  step: number;
  event: 'move' | 'turn' | 'jump' | 'pickup' | 'goal' | 'collision' | 'idle';
  note?: string;
};

export type EngineEvent = {
  kind: string;
  detail?: Record<string, unknown>;
};

export type EngineRunResult = {
  status: 'success' | 'failure';
  failureReason?: FailureReason;
  durationMs: number;
  timeline: MovementFrame[];
  events: EngineEvent[];
};

export type EngineOptions = {
  program: BlockNode[];
  puzzle: PuzzleDefinition;
  speed: 'slow' | 'normal' | 'fast';
};

type FailureReason =
  | 'target_not_reached'
  | 'wrong_item'
  | 'wrong_order'
  | 'obstacle_collision'
  | 'missing_condition';

type ExecutionContext = {
  puzzle: PuzzleDefinition;
  world: Map<string, WorldTile>;
  state: PlayerState;
  timeline: MovementFrame[];
  events: EngineEvent[];
};

type PlayerState = {
  x: number;
  y: number;
  facing: Facing;
  steps: number;
  collected: Set<string>;
  collectibles: Set<string>;
  goalReached: boolean;
  failureReason?: FailureReason;
};

type WorldTile = {
  entities: SceneEntity[];
  obstacle?: SceneEntity;
  goal?: SceneEntity;
  collectible?: SceneEntity;
};

const directionVectors: Record<Facing, { dx: number; dy: number }> = {
  north: { dx: 0, dy: 1 },
  south: { dx: 0, dy: -1 },
  east: { dx: 1, dy: 0 },
  west: { dx: -1, dy: 0 },
};

const STEP_LIMIT = 400;
const LOOP_LIMIT = 32;

export function executeProgram({ program, puzzle }: EngineOptions): EngineRunResult {
  const start = Date.now();
  const timeline: MovementFrame[] = [
    {
      x: puzzle.scene.startEntity.x,
      y: puzzle.scene.startEntity.y,
      facing: puzzle.scene.startEntity.facing ?? 'east',
      step: 0,
      event: 'idle',
      note: 'On Start',
    },
  ];
  const events: EngineEvent[] = [{ kind: 'run:start', detail: { puzzleId: puzzle.id } }];

  const world = buildWorld(puzzle);
  const collectibles = collectIdsByRole(puzzle.scene.entities, 'collectible');
  const state: PlayerState = {
    x: puzzle.scene.startEntity.x,
    y: puzzle.scene.startEntity.y,
    facing: puzzle.scene.startEntity.facing ?? 'east',
    steps: 0,
    collected: new Set<string>(),
    collectibles,
    goalReached: false,
  };
  const ctx: ExecutionContext = { puzzle, world, state, timeline, events };

  if (!passesRequiredBlocks(program, puzzle.constraints?.requiredBlocks ?? [])) {
    state.failureReason = 'missing_condition';
    events.push({ kind: 'run:missing-blocks', detail: { required: puzzle.constraints?.requiredBlocks } });
    return finalizeResult(ctx, start);
  }

  const ranSuccessfully = runBlocks(program, ctx);
  if (!ranSuccessfully) {
    return finalizeResult(ctx, start);
  }

  const goalTile = world.get(tileKey(state.x, state.y));
  if (!goalTile?.goal) {
    state.failureReason = 'target_not_reached';
    return finalizeResult(ctx, start);
  }

  if (state.collectibles.size > 0 && state.collected.size < state.collectibles.size) {
    state.failureReason = 'wrong_item';
    return finalizeResult(ctx, start);
  }

  state.goalReached = true;
  events.push({ kind: 'run:success', detail: { puzzleId: puzzle.id } });
  if (timeline[timeline.length - 1]?.event !== 'goal') {
    timeline.push({
      x: state.x,
      y: state.y,
      facing: state.facing,
      step: timeline.length,
      event: 'goal',
      note: 'Goal achieved',
    });
  }
  return finalizeResult(ctx, start);
}

function finalizeResult(ctx: ExecutionContext, startedAt: number): EngineRunResult {
  const durationMs = Date.now() - startedAt;
  if (ctx.state.failureReason) {
    ctx.events.push({ kind: 'run:failure', detail: { reason: ctx.state.failureReason } });
    return {
      status: 'failure',
      failureReason: ctx.state.failureReason,
      durationMs,
      timeline: ctx.timeline,
      events: ctx.events,
    };
  }

  return {
    status: 'success',
    durationMs,
    timeline: ctx.timeline,
    events: ctx.events,
  };
}

function runBlocks(blocks: BlockNode[], ctx: ExecutionContext): boolean {
  for (const block of blocks) {
    if (!executeBlock(block, ctx)) {
      return false;
    }
  }
  return true;
}

function executeBlock(block: BlockNode, ctx: ExecutionContext): boolean {
  if (ctx.state.failureReason) {
    return false;
  }

  ctx.state.steps += 1;
  if (ctx.state.steps > STEP_LIMIT) {
    ctx.state.failureReason = 'missing_condition';
    ctx.timeline.push({
      x: ctx.state.x,
      y: ctx.state.y,
      facing: ctx.state.facing,
      step: ctx.timeline.length,
      event: 'idle',
      note: 'Loop limit exceeded',
    });
    return false;
  }

  switch (block.type) {
    case 'moveForward':
      return performMove(ctx, 1, 'move');
    case 'jump':
      return performMove(ctx, 2, 'jump');
    case 'turnLeft':
      return turn(ctx, 'left');
    case 'turnRight':
      return turn(ctx, 'right');
    case 'pickUp':
      return pickUp(ctx);
    case 'placeItem':
      ctx.events.push({ kind: 'action:placeItem' });
      return true;
    case 'repeat':
      return repeatBlock(ctx, block, Math.max(1, Number(block.args?.count) || 2));
    case 'repeatUntil':
      return repeatUntil(ctx, block);
    case 'while':
      return whileLoop(ctx, block);
    case 'if':
      return conditional(ctx, block, false);
    case 'ifElse':
      return conditional(ctx, block, true);
    default:
      // Unsupported blocks act as no-ops but log for analytics
      ctx.events.push({ kind: 'block:noop', detail: { type: block.type } });
      return true;
  }
}

function performMove(ctx: ExecutionContext, distance: number, event: MovementFrame['event']): boolean {
  const { state, world } = ctx;
  const dir = directionVectors[state.facing];

  if (event === 'jump' && distance === 2) {
    const obstacleX = state.x + dir.dx;
    const obstacleY = state.y + dir.dy;
    const obstacleTile = world.get(tileKey(obstacleX, obstacleY));

    if (!obstacleTile) {
      state.failureReason = 'target_not_reached';
      ctx.timeline.push({
        x: state.x,
        y: state.y,
        facing: state.facing,
        step: ctx.timeline.length,
        event: 'collision',
        note: 'Jumped outside scene',
      });
      return false;
    }

    if (obstacleTile.obstacle) {
      ctx.events.push({ kind: 'movement:jump-over', detail: { obstacle: obstacleTile.obstacle.id } });
    }

    const landingX = state.x + dir.dx * distance;
    const landingY = state.y + dir.dy * distance;
    const landingTile = world.get(tileKey(landingX, landingY));

    if (!landingTile) {
      state.failureReason = 'target_not_reached';
      ctx.timeline.push({
        x: state.x,
        y: state.y,
        facing: state.facing,
        step: ctx.timeline.length,
        event: 'collision',
        note: 'Jump landing is outside scene',
      });
      return false;
    }

    if (landingTile.obstacle) {
      state.failureReason = 'obstacle_collision';
      ctx.timeline.push({
        x: landingTile.obstacle.x,
        y: landingTile.obstacle.y,
        facing: state.facing,
        step: ctx.timeline.length,
        event: 'collision',
        note: 'Landed on an obstacle',
      });
      ctx.events.push({ kind: 'movement:collision', detail: { obstacle: landingTile.obstacle.id } });
      return false;
    }

    state.x = landingX;
    state.y = landingY;
    ctx.timeline.push({
      x: state.x,
      y: state.y,
      facing: state.facing,
      step: ctx.timeline.length,
      event: 'jump',
      note: obstacleTile.obstacle ? 'Jumped over obstacle' : 'Long jump',
    });
    ctx.events.push({ kind: 'movement:step', detail: { x: state.x, y: state.y, mode: 'jump' } });

    if (!handleTileSideEffects(ctx, landingTile)) {
      return false;
    }
    return true;
  }

  for (let i = 0; i < distance; i += 1) {
    const nextX = state.x + dir.dx;
    const nextY = state.y + dir.dy;
    const tile = world.get(tileKey(nextX, nextY));

    if (!tile) {
      state.failureReason = 'target_not_reached';
      ctx.timeline.push({
        x: state.x,
        y: state.y,
        facing: state.facing,
        step: ctx.timeline.length,
        event: 'collision',
        note: 'Stepped outside scene',
      });
      return false;
    }

    if (tile.obstacle) {
      if (event === 'jump' && i === 0) {
        // Jump clears the first obstacle but still requires safe landing
        ctx.events.push({ kind: 'movement:jump-over', detail: { obstacle: tile.obstacle.id } });
      } else {
        state.failureReason = 'obstacle_collision';
        ctx.timeline.push({
          x: tile.obstacle.x,
          y: tile.obstacle.y,
          facing: state.facing,
          step: ctx.timeline.length,
          event: 'collision',
          note: 'Hit an obstacle',
        });
        ctx.events.push({ kind: 'movement:collision', detail: { obstacle: tile.obstacle.id } });
        return false;
      }
    }

    state.x = nextX;
    state.y = nextY;
    const frame: MovementFrame = {
      x: state.x,
      y: state.y,
      facing: state.facing,
      step: ctx.timeline.length,
      event,
      note: event === 'jump' ? 'Jump arc' : undefined,
    };
    ctx.timeline.push(frame);
    ctx.events.push({ kind: 'movement:step', detail: { x: state.x, y: state.y, mode: event } });

    if (!handleTileSideEffects(ctx, tile)) {
      return false;
    }
  }
  return true;
}

function turn(ctx: ExecutionContext, direction: 'left' | 'right'): boolean {
  const order: Facing[] = ['north', 'east', 'south', 'west'];
  const currentIndex = order.indexOf(ctx.state.facing);
  const nextIndex = direction === 'left'
    ? (currentIndex + 3) % order.length
    : (currentIndex + 1) % order.length;
  ctx.state.facing = order[nextIndex];
  ctx.timeline.push({
    x: ctx.state.x,
    y: ctx.state.y,
    facing: ctx.state.facing,
    step: ctx.timeline.length,
    event: 'turn',
    note: `Turn ${direction}`,
  });
  ctx.events.push({ kind: 'movement:turn', detail: { direction: ctx.state.facing } });
  return true;
}

function pickUp(ctx: ExecutionContext): boolean {
  const tile = ctx.world.get(tileKey(ctx.state.x, ctx.state.y));
  if (tile?.collectible && !ctx.state.collected.has(tile.collectible.id)) {
    ctx.state.collected.add(tile.collectible.id);
    ctx.timeline.push({
      x: ctx.state.x,
      y: ctx.state.y,
      facing: ctx.state.facing,
      step: ctx.timeline.length,
      event: 'pickup',
      note: `Collected ${tile.collectible.id}`,
    });
    ctx.events.push({ kind: 'collectible:pickup', detail: { id: tile.collectible.id } });
    return true;
  }

  ctx.state.failureReason = 'wrong_item';
  ctx.timeline.push({
    x: ctx.state.x,
    y: ctx.state.y,
    facing: ctx.state.facing,
    step: ctx.timeline.length,
    event: 'idle',
    note: 'Tried to pick up wrong item',
  });
  return false;
}

function repeatBlock(ctx: ExecutionContext, block: BlockNode, times: number): boolean {
  for (let i = 0; i < times; i += 1) {
    if (!block.children || !runBlocks(block.children, ctx)) {
      return false;
    }
  }
  return true;
}

function repeatUntil(ctx: ExecutionContext, block: BlockNode): boolean {
  let guard = 0;
  do {
    if (!block.children || !runBlocks(block.children, ctx)) {
      return false;
    }
    guard += 1;
    if (guard > LOOP_LIMIT) {
      ctx.state.failureReason = 'missing_condition';
      return false;
    }
  } while (!evaluateCondition(block.args?.condition as string | undefined, ctx));
  return true;
}

function whileLoop(ctx: ExecutionContext, block: BlockNode): boolean {
  let guard = 0;
  while (evaluateCondition(block.args?.condition as string | undefined, ctx)) {
    if (!block.children || !runBlocks(block.children, ctx)) {
      return false;
    }
    guard += 1;
    if (guard > LOOP_LIMIT) {
      ctx.state.failureReason = 'missing_condition';
      return false;
    }
  }
  return true;
}

function conditional(ctx: ExecutionContext, block: BlockNode, hasElse: boolean): boolean {
  const condition = evaluateCondition(block.args?.condition as string | undefined, ctx);
  const branch = condition ? block.children : hasElse ? block.elseBranch : undefined;
  if (!branch) {
    return true;
  }
  return runBlocks(branch, ctx);
}

function evaluateCondition(condition: string | undefined, ctx: ExecutionContext): boolean {
  switch (condition) {
    case 'pathAhead':
      return isPathAhead(ctx);
    case 'isPuddleAhead':
      return checkAhead(ctx, (tile) => Boolean(tile.obstacle?.interactions?.includes('senseMoisture')));
    case 'isHazardLeft':
      return checkSide(ctx, 'left');
    case 'isHazardRight':
      return checkSide(ctx, 'right');
    default:
      return false;
  }
}

function isPathAhead(ctx: ExecutionContext): boolean {
  return checkAhead(ctx, (tile) => Boolean(tile && !tile.obstacle));
}

function checkAhead(ctx: ExecutionContext, predicate: (tile: WorldTile) => boolean): boolean {
  const dir = directionVectors[ctx.state.facing];
  const tile = ctx.world.get(tileKey(ctx.state.x + dir.dx, ctx.state.y + dir.dy));
  return tile ? predicate(tile) : false;
}

function checkSide(ctx: ExecutionContext, turn: 'left' | 'right'): boolean {
  const order: Facing[] = ['north', 'east', 'south', 'west'];
  const idx = order.indexOf(ctx.state.facing);
  const sideFacing = turn === 'left' ? order[(idx + 3) % order.length] : order[(idx + 1) % order.length];
  const dir = directionVectors[sideFacing];
  const tile = ctx.world.get(tileKey(ctx.state.x + dir.dx, ctx.state.y + dir.dy));
  return Boolean(tile?.obstacle);
}

function handleTileSideEffects(ctx: ExecutionContext, tile: WorldTile): boolean {
  if (tile.goal) {
    if (ctx.state.collectibles.size > 0 && ctx.state.collected.size < ctx.state.collectibles.size) {
      ctx.state.failureReason = 'wrong_order';
      ctx.timeline.push({
        x: ctx.state.x,
        y: ctx.state.y,
        facing: ctx.state.facing,
        step: ctx.timeline.length,
        event: 'goal',
        note: 'Reached goal before collecting all treats',
      });
      ctx.events.push({ kind: 'goal:premature' });
      return false;
    }
    ctx.events.push({ kind: 'goal:touch', detail: { id: tile.goal.id } });
    ctx.timeline.push({
      x: ctx.state.x,
      y: ctx.state.y,
      facing: ctx.state.facing,
      step: ctx.timeline.length,
      event: 'goal',
      note: 'Goal tile reached',
    });
  }
  return true;
}

function buildWorld(puzzle: PuzzleDefinition): Map<string, WorldTile> {
  const map = new Map<string, WorldTile>();
  const register = (entity: SceneEntity) => {
    const key = tileKey(entity.x, entity.y);
    const tile = map.get(key) ?? { entities: [] };
    tile.entities.push(entity);
    if (entity.role === 'obstacle') tile.obstacle = entity;
    if (entity.role === 'goal') tile.goal = entity;
    if (entity.role === 'collectible') tile.collectible = entity;
    map.set(key, tile);
  };

  register(puzzle.scene.startEntity);
  puzzle.scene.entities.forEach(register);
  return map;
}

function collectIdsByRole(entities: SceneEntity[], role: SceneEntity['role']): Set<string> {
  return new Set(entities.filter((entity) => entity.role === role).map((entity) => entity.id));
}

function tileKey(x: number, y: number) {
  return `${x}:${y}`;
}

function passesRequiredBlocks(program: BlockNode[], required: string[]): boolean {
  if (required.length === 0) return true;
  const set = new Set(required);
  walkBlocks(program, (node) => {
    if (set.has(node.type)) {
      set.delete(node.type);
    }
  });
  return set.size === 0;
}

function walkBlocks(nodes: BlockNode[] | undefined, visitor: (node: BlockNode) => void) {
  if (!nodes) return;
  for (const node of nodes) {
    visitor(node);
    walkBlocks(node.children, visitor);
    walkBlocks(node.elseBranch, visitor);
  }
}
