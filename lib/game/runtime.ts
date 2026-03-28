import type { PuzzleDefinition } from '@/lib/puzzles/data';
import type { ProgramInstruction, SensorCondition } from '@/lib/blockly/serialization';
import type { FailureReason, EventPayload, MovementPayload } from '@/types/telemetry';
import {
  createWorld,
  moveForward,
  jumpForward,
  turnLeft,
  turnRight,
  isAtGoal,
  isObstacleAhead,
  isPathClear,
  isItemNearby,
  WorldState,
  Facing,
} from './world';

export type MovementFrame = MovementPayload & { blockId?: string; facing: Facing };

type ExecutionContext = {
  world: WorldState;
  movements: MovementFrame[];
  events: EventPayload[];
  steps: number;
  sawConditional: boolean;
};

const MAX_STEPS = 120;

export type ExecutionResult = {
  world: WorldState;
  movements: MovementFrame[];
  events: EventPayload[];
  success: boolean;
  failureReason?: FailureReason;
  hint?: string;
};

export function executeProgram(program: ProgramInstruction[], puzzle: PuzzleDefinition): ExecutionResult {
  const context: ExecutionContext = {
    world: createWorld(puzzle),
    movements: [],
    events: [],
    steps: 0,
    sawConditional: program.some((instruction) => instruction.kind === 'if_else'),
  };

  runSequence(program, context);

  const success = isAtGoal(context.world) && context.world.player.hasTreat && !context.world.player.collided;
  let failureReason: FailureReason | undefined;
  if (!success) {
    if (context.world.player.collided) {
      failureReason = 'obstacle_collision';
    } else if (!context.world.player.hasTreat && isAtGoal(context.world)) {
      failureReason = 'wrong_order';
    } else if (!context.world.player.hasTreat) {
      failureReason = 'target_not_reached';
    } else if (puzzle.constraints.requiredConcept === 'conditionals' && !context.sawConditional) {
      failureReason = 'missing_condition';
    } else {
      failureReason = 'unknown';
    }
  }

  const hint = failureReason ? puzzle.hints.find((h) => h.reason === failureReason)?.message : undefined;

  return {
    world: context.world,
    movements: context.movements,
    events: context.events,
    success,
    failureReason,
    hint,
  };
}

function runSequence(sequence: ProgramInstruction[], context: ExecutionContext) {
  for (const instruction of sequence) {
    if (shouldStopExecution(context)) break;
    executeInstruction(instruction, context);
  }
}

function executeInstruction(instruction: ProgramInstruction, context: ExecutionContext) {
  if (shouldStopExecution(context)) return;
  context.steps += 1;
  switch (instruction.kind) {
    case 'move_forward':
      moveForward(context.world);
      syncGoalCollection(context.world);
      pushMovement(context, instruction.blockId, 'move');
      break;
    case 'turn_left':
      turnLeft(context.world);
      pushMovement(context, instruction.blockId, 'turn');
      break;
    case 'turn_right':
      turnRight(context.world);
      pushMovement(context, instruction.blockId, 'turn');
      break;
    case 'jump':
      jumpForward(context.world);
      syncGoalCollection(context.world);
      pushMovement(context, instruction.blockId, 'jump');
      break;
    case 'collect_item':
      if (isAtGoal(context.world)) {
        context.world.player.hasTreat = true;
      } else {
        context.world.player.misCollected = true;
      }
      pushEvent(context, instruction.blockId, 'collect_item');
      break;
    case 'inspect':
      pushEvent(context, instruction.blockId, 'inspect');
      break;
    case 'repeat_times':
      for (let i = 0; i < instruction.times; i += 1) {
        if (shouldStopExecution(context)) break;
        runSequence(instruction.body, context);
      }
      break;
    case 'repeat_until':
      for (let i = 0; i < MAX_STEPS && !shouldStopExecution(context); i += 1) {
        if (evaluateCondition(context.world, instruction.condition)) break;
        runSequence(instruction.body, context);
      }
      break;
    case 'if_else':
      context.sawConditional = true;
      if (evaluateCondition(context.world, instruction.condition)) {
        runSequence(instruction.ifBody, context);
      } else {
        runSequence(instruction.elseBody, context);
      }
      break;
    default:
      break;
  }
}

function shouldStopExecution(context: ExecutionContext) {
  return (
    context.steps >= MAX_STEPS ||
    context.world.player.collided ||
    (isAtGoal(context.world) && context.world.player.hasTreat)
  );
}

function syncGoalCollection(world: WorldState) {
  if (isAtGoal(world)) {
    world.player.hasTreat = true;
  }
}

function evaluateCondition(world: WorldState, condition: SensorCondition) {
  switch (condition) {
    case 'obstacle_ahead':
      return isObstacleAhead(world);
    case 'item_nearby':
      return isItemNearby(world);
    case 'goal_reached':
      return isAtGoal(world);
    case 'item_collected':
      return world.player.hasTreat;
    case 'path_clear':
    default:
      return isPathClear(world);
  }
}

function pushMovement(context: ExecutionContext, blockId: string, action: string) {
  const frame: MovementFrame = {
    stepIndex: context.movements.length,
    x: context.world.player.x,
    y: context.world.player.y,
    action,
    blockId,
    facing: context.world.player.facing,
  };
  context.movements.push(frame);
  pushEvent(context, blockId, `movement:${action}`);
}

function pushEvent(context: ExecutionContext, blockId: string, type: string) {
  context.events.push({
    type,
    blockId,
    detail: { puzzleId: context.world.puzzleId },
  });
}
