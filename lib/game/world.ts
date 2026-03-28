import type { PuzzleDefinition } from '@/lib/puzzles/data';

export type Facing = 'east' | 'west';

export type PlayerState = {
  x: number;
  y: number;
  facing: Facing;
  hasTreat: boolean;
  collided: boolean;
  misCollected: boolean;
};

export type WorldState = {
  puzzleId: string;
  width: number;
  height: number;
  floorY: number;
  cellSize: number;
  goal: { x: number; y: number };
  hazard?: { x: number; y: number };
  waypoints: { x: number; y: number }[];
  player: PlayerState;
};

export function createWorld(puzzle: PuzzleDefinition): WorldState {
  return {
    puzzleId: puzzle.id,
    width: puzzle.grid.width,
    height: puzzle.grid.height,
    floorY: puzzle.grid.floorY,
    cellSize: 96,
    goal: puzzle.grid.goal,
    hazard: puzzle.grid.hazard,
    waypoints: puzzle.grid.waypoints,
    player: {
      x: puzzle.grid.start.x,
      y: puzzle.grid.start.y,
      facing: 'east',
      hasTreat: false,
      collided: false,
      misCollected: false,
    },
  };
}

export function cloneWorld(world: WorldState): WorldState {
  return JSON.parse(JSON.stringify(world));
}

export function moveForward(world: WorldState) {
  world.player.x += world.player.facing === 'east' ? 1 : -1;
  clampPlayer(world);
  checkCollision(world, false);
}

export function jumpForward(world: WorldState) {
  const startX = world.player.x;
  world.player.x += world.player.facing === 'east' ? 2 : -2;
  clampPlayer(world);
  checkJumpCollision(world, startX);
}

function clampPlayer(world: WorldState) {
  if (world.player.x < 0) world.player.x = 0;
  if (world.player.x > world.goal.x) world.player.x = world.goal.x;
}

function checkCollision(world: WorldState, jumped: boolean) {
  if (!world.hazard) return;
  if (world.player.x === world.hazard.x && !jumped) {
    world.player.collided = true;
  }
}

function checkJumpCollision(world: WorldState, startX: number) {
  if (!world.hazard) return;
  const minX = Math.min(startX, world.player.x);
  const maxX = Math.max(startX, world.player.x);
  if (world.hazard.x > minX && world.hazard.x < maxX) {
    return;
  }
  if (world.player.x === world.hazard.x) {
    world.player.collided = true;
  }
}

export function turnLeft(world: WorldState) {
  world.player.facing = 'west';
}

export function turnRight(world: WorldState) {
  world.player.facing = 'east';
}

export function isAtGoal(world: WorldState) {
  return world.player.x >= world.goal.x && world.player.y === world.goal.y;
}

export function isPathClear(world: WorldState) {
  if (world.player.facing === 'west') return world.player.x > 0;
  const nextX = world.player.x + 1;
  if (world.hazard && world.hazard.x === nextX) {
    return false;
  }
  return nextX <= world.goal.x;
}

export function isObstacleAhead(world: WorldState) {
  if (!world.hazard) return false;
  return world.player.facing === 'east' && world.hazard.x === world.player.x + 1;
}

export function isItemNearby(world: WorldState) {
  return world.player.facing === 'east' && world.goal.x <= world.player.x + 1;
}
