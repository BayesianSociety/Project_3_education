/**
 * Puzzle definitions follow the frontend-skill rubric: one dominant visual anchor per scene,
 * concise story copy, and data hooks that let the UI balance workspace hierarchy.
 */
export type PuzzleConcept = 'sequencing' | 'loops' | 'conditionals';

export type BlockCategorySet = {
  movement: string[];
  actions: string[];
  control: string[];
  logic: string[];
  sensing: string[];
};

export type SceneEntity = {
  id: string;
  sprite: string;
  x: number;
  y: number;
  facing?: 'north' | 'south' | 'east' | 'west';
  role: 'player' | 'path' | 'obstacle' | 'goal' | 'collectible' | 'trigger';
  interactions?: string[];
};

export type HintRule = {
  reason:
    | 'target_not_reached'
    | 'wrong_item'
    | 'wrong_order'
    | 'obstacle_collision'
    | 'missing_condition';
  message: string;
};

export type PuzzleDefinition = {
  id: string;
  sequence: number;
  concept: PuzzleConcept;
  difficulty: 1 | 2 | 3;
  title: string;
  story: string;
  goal: string;
  background: string;
  palette: {
    primary: string;
    accent: string;
    glow: string;
    canvas: string;
  };
  scene: {
    gridCols: number;
    gridRows: number;
    tileSize: number;
    startEntity: SceneEntity;
    entities: SceneEntity[];
    camera: {
      floorLineY: number;
      focalX: number;
    };
  };
  allowedBlocks: BlockCategorySet;
  constraints: {
    maxBlocks?: number;
    requiredBlocks?: string[];
    lockedUntil?: string | null;
    speedOptions?: ('slow' | 'normal' | 'fast')[];
  };
  successCriteria: string[];
  hintRules: HintRule[];
  progression: {
    unlocks: string[];
  };
  motionDirectives: {
    workspace: string;
    scene: string;
  };
  instrumentation: {
    captureCodeSnapshot: boolean;
    trackMovements: boolean;
  };
};

const basePath = '/assets';
const sprites = {
  character: `${basePath}/sprites/main_character.png`,
  path: `${basePath}/sprites/place.png`,
  obstacle: `${basePath}/sprites/obstacle.png`,
  goal: `${basePath}/sprites/food.png`,
};

const background = `${basePath}/backgrounds/background.jpg`;

export const puzzles: PuzzleDefinition[] = [
  {
    id: 'garden-stroll',
    sequence: 1,
    concept: 'sequencing',
    difficulty: 1,
    title: 'Garden Stroll',
    story:
      'Guide Lumi along the garden path to deliver a snack. Use simple steps to cross the walkway without hitting the hurdle.',
    goal: 'Reach the picnic basket on the far right without bumping into the obstacle.',
    background,
    palette: {
      primary: '#f7a2f7',
      accent: '#7b4bce',
      glow: '#ffe0ff',
      canvas: '#fff4fb',
    },
    scene: {
      gridCols: 6,
      gridRows: 3,
      tileSize: 96,
      startEntity: {
        id: 'hero',
        sprite: sprites.character,
        x: 0,
        y: 2,
        facing: 'east',
        role: 'player',
      },
      entities: [
        { id: 'path-a', sprite: sprites.path, x: 1, y: 2, role: 'path' },
        { id: 'path-b', sprite: sprites.path, x: 2, y: 2, role: 'path' },
        {
          id: 'center-obstacle',
          sprite: sprites.obstacle,
          x: 3,
          y: 2,
          role: 'obstacle',
          interactions: ['jump', 'avoid'],
        },
        { id: 'path-c', sprite: sprites.path, x: 4, y: 2, role: 'path' },
        { id: 'path-d', sprite: sprites.path, x: 5, y: 2, role: 'path' },
        {
          id: 'goal',
          sprite: sprites.goal,
          x: 6,
          y: 2,
          role: 'goal',
        },
      ],
      camera: {
        floorLineY: 0.75,
        focalX: 0.5,
      },
    },
    allowedBlocks: {
      movement: ['moveForward', 'jump'],
      actions: [],
      control: [],
      logic: [],
      sensing: [],
    },
    constraints: {
      maxBlocks: 6,
      lockedUntil: null,
      speedOptions: ['slow', 'normal', 'fast'],
    },
    successCriteria: [
      'Hero stands on the goal tile',
      'No collisions detected',
      'Program finishes execution',
    ],
    hintRules: [
      {
        reason: 'target_not_reached',
        message: 'Use enough move blocks to land directly on the snack tile.',
      },
      {
        reason: 'obstacle_collision',
        message: 'Insert a jump over the center block so Lumi clears the barrier.',
      },
    ],
    progression: {
      unlocks: ['loop-lane'],
    },
    motionDirectives: {
      workspace:
        'Library stays on the left with soft violet glassmorphism; animate On Start root sliding down slightly when Play begins.',
      scene:
        'Character should ease-in across the walkway with a subtle glow trail to match the pink/violet palette.',
    },
    instrumentation: {
      captureCodeSnapshot: true,
      trackMovements: true,
    },
  },
  {
    id: 'loop-lane',
    sequence: 2,
    concept: 'loops',
    difficulty: 2,
    title: 'Loop Lane Delivery',
    story:
      'Deliver treats to each tile in the loop lane. Optimize the path using repeats without losing the upbeat rhythm.',
    goal: 'Visit every path tile and reach the goal while reusing a loop to save blocks.',
    background,
    palette: {
      primary: '#f794d2',
      accent: '#8b5cf6',
      glow: '#ffd6ff',
      canvas: '#fff1fb',
    },
    scene: {
      gridCols: 8,
      gridRows: 4,
      tileSize: 88,
      startEntity: {
        id: 'hero',
        sprite: sprites.character,
        x: 0,
        y: 2,
        facing: 'east',
        role: 'player',
      },
      entities: [
        { id: 'path-1', sprite: sprites.path, x: 1, y: 2, role: 'path' },
        { id: 'path-2', sprite: sprites.path, x: 2, y: 2, role: 'path' },
        { id: 'path-3', sprite: sprites.path, x: 3, y: 2, role: 'path' },
        { id: 'path-4', sprite: sprites.path, x: 4, y: 2, role: 'path' },
        {
          id: 'obstacle-mid',
          sprite: sprites.obstacle,
          x: 4,
          y: 2,
          role: 'obstacle',
          interactions: ['jump'],
        },
        { id: 'path-5', sprite: sprites.path, x: 5, y: 2, role: 'path' },
        { id: 'path-6', sprite: sprites.path, x: 6, y: 2, role: 'path' },
        { id: 'path-7', sprite: sprites.path, x: 7, y: 2, role: 'path' },
        {
          id: 'goal',
          sprite: sprites.goal,
          x: 8,
          y: 2,
          role: 'goal',
        },
        {
          id: 'treat-a',
          sprite: sprites.goal,
          x: 2,
          y: 2,
          role: 'collectible',
          interactions: ['pickup'],
        },
        {
          id: 'treat-b',
          sprite: sprites.goal,
          x: 6,
          y: 2,
          role: 'collectible',
          interactions: ['pickup'],
        },
      ],
      camera: {
        floorLineY: 0.7,
        focalX: 0.55,
      },
    },
    allowedBlocks: {
      movement: ['moveForward', 'jump', 'turnLeft', 'turnRight'],
      actions: ['pickUp'],
      control: ['repeat', 'repeatUntil'],
      logic: [],
      sensing: ['pathAhead'],
    },
    constraints: {
      maxBlocks: 10,
      requiredBlocks: ['repeat'],
      lockedUntil: 'garden-stroll',
      speedOptions: ['normal', 'fast'],
    },
    successCriteria: [
      'All collectibles visited',
      'Goal tile reached',
      'Program ends without collisions',
    ],
    hintRules: [
      {
        reason: 'wrong_order',
        message: 'Pick up the treats on the lane before stepping onto the final goal tile on the far right.',
      },
      {
        reason: 'obstacle_collision',
        message: 'Combine jump inside the loop when the lane reaches the middle hurdle.',
      },
    ],
    progression: {
      unlocks: ['conditional-crossing'],
    },
    motionDirectives: {
      workspace:
        'When a loop is added, pulse the block spine to reinforce rhythm; keep code column narrower than scene for clarity.',
      scene:
        'Use staggered easing so repeated moves feel musical; highlight collectibles with a shimmer when picked.',
    },
    instrumentation: {
      captureCodeSnapshot: true,
      trackMovements: true,
    },
  },
  {
    id: 'conditional-crossing',
    sequence: 3,
    concept: 'conditionals',
    difficulty: 3,
    title: 'Conditional Crossing',
    story:
      'Storm clouds roll in, so Lumi must react to hazards in real time. Use conditionals to dodge puddles and grab the glowing treat.',
    goal: 'Reach the glowing treat only if the puddle sensor is clear; otherwise reroute using conditionals.',
    background,
    palette: {
      primary: '#f568c1',
      accent: '#6d28d9',
      glow: '#ffd0ff',
      canvas: '#ffe8fb',
    },
    scene: {
      gridCols: 9,
      gridRows: 4,
      tileSize: 84,
      startEntity: {
        id: 'hero',
        sprite: sprites.character,
        x: 0,
        y: 2,
        facing: 'east',
        role: 'player',
      },
      entities: [
        { id: 'path-a', sprite: sprites.path, x: 1, y: 2, role: 'path' },
        { id: 'path-b', sprite: sprites.path, x: 2, y: 2, role: 'path' },
        {
          id: 'puddle-sensor',
          sprite: sprites.obstacle,
          x: 3,
          y: 2,
          role: 'obstacle',
          interactions: ['senseMoisture'],
        },
        { id: 'path-c', sprite: sprites.path, x: 4, y: 2, role: 'path' },
        { id: 'path-d', sprite: sprites.path, x: 5, y: 2, role: 'path' },
        {
          id: 'branch-upper',
          sprite: sprites.path,
          x: 5,
          y: 1,
          role: 'path',
        },
        {
          id: 'branch-lower',
          sprite: sprites.path,
          x: 5,
          y: 3,
          role: 'path',
        },
        {
          id: 'hazard-upper',
          sprite: sprites.obstacle,
          x: 6,
          y: 1,
          role: 'obstacle',
        },
        {
          id: 'hazard-lower',
          sprite: sprites.obstacle,
          x: 6,
          y: 3,
          role: 'obstacle',
        },
        {
          id: 'path-middle',
          sprite: sprites.path,
          x: 6,
          y: 2,
          role: 'path',
        },
        { id: 'path-e', sprite: sprites.path, x: 7, y: 2, role: 'path' },
        { id: 'path-f', sprite: sprites.path, x: 8, y: 2, role: 'path' },
        {
          id: 'goal',
          sprite: sprites.goal,
          x: 9,
          y: 2,
          role: 'goal',
        },
      ],
      camera: {
        floorLineY: 0.68,
        focalX: 0.6,
      },
    },
    allowedBlocks: {
      movement: ['moveForward', 'turnLeft', 'turnRight', 'jump'],
      actions: ['pickUp', 'placeItem'],
      control: ['repeat', 'repeatUntil', 'while'],
      logic: ['if', 'ifElse', 'compareSensor'],
      sensing: ['isPuddleAhead', 'isHazardLeft', 'isHazardRight'],
    },
    constraints: {
      maxBlocks: 16,
      requiredBlocks: ['ifElse'],
      lockedUntil: 'loop-lane',
      speedOptions: ['slow', 'normal', 'fast'],
    },
    successCriteria: [
      'Conditional branch chosen appropriately based on puddle sensor',
      'Goal reached with snack collected',
      'No hazard collisions occur',
    ],
    hintRules: [
      {
        reason: 'missing_condition',
        message: 'Wrap the hazard dodge code in an if/else so Lumi can react to puddles.',
      },
      {
        reason: 'wrong_item',
        message: 'Be sure the glowing snack is picked up before finishing.',
      },
      {
        reason: 'obstacle_collision',
        message: 'Use turn blocks within the conditional to route around whichever hazard spawns.',
      },
    ],
    progression: {
      unlocks: [],
    },
    motionDirectives: {
      workspace:
        'When conditionals are selected, animate a quick highlight sweep across the branch labels to keep hierarchy sharp.',
      scene:
        'Trigger a soft violet flash whenever sensors fire so the scene remains legible even as blocks animate.',
    },
    instrumentation: {
      captureCodeSnapshot: true,
      trackMovements: true,
    },
  },
];

export const puzzleMap = new Map(puzzles.map((puzzle) => [puzzle.id, puzzle]));

export type PuzzleId = (typeof puzzles)[number]['id'];
