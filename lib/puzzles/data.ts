import Database from 'better-sqlite3';

export type BlockCategory = 'movement' | 'actions' | 'control' | 'logic' | 'sensing';

export type PuzzleHint = {
  reason: string;
  message: string;
};

export type PuzzleDefinition = {
  id: string;
  title: string;
  story: string;
  goal: string;
  sceneId: string;
  order: number;
  grid: {
    width: number;
    height: number;
    floorY: number;
    start: { x: number; y: number };
    goal: { x: number; y: number };
    hazard?: { x: number; y: number; type: string };
    waypoints: { x: number; y: number }[];
  };
  entities: {
    id: string;
    asset: string;
    role: 'player' | 'path' | 'hazard' | 'goal' | 'item';
    x: number;
    y: number;
  }[];
  availableBlocks: {
    category: BlockCategory;
    blocks: string[];
  }[];
  constraints: {
    maxBlocks: number;
    requiredConcept: 'sequencing' | 'loops' | 'conditionals';
  };
  successCriteria: {
    steps: string[];
  };
  hints: PuzzleHint[];
};

const BASE_PATH_ENTITIES = [
  { id: 'path-1', asset: 'place.png', x: 1, y: 2 },
  { id: 'path-2', asset: 'place.png', x: 2, y: 2 },
  { id: 'path-3', asset: 'place.png', x: 4, y: 2 },
  { id: 'path-4', asset: 'place.png', x: 5, y: 2 },
];

export const PUZZLES: PuzzleDefinition[] = [
  {
    id: 'puzzle-01',
    title: 'Treat Trail',
    story:
      'Guide Pixel Pup across the stepping stones, jump past the bubble pit, and grab the treat. Focus on simple sequencing under the On Start block.',
    goal: 'Reach the snack without touching the hazard.',
    sceneId: 'sunlit-path',
    order: 1,
    grid: {
      width: 6,
      height: 3,
      floorY: 2,
      start: { x: 0, y: 2 },
      goal: { x: 6, y: 2 },
      hazard: { x: 3, y: 2, type: 'obstacle.png' },
      waypoints: [
        { x: 1, y: 2 },
        { x: 2, y: 2 },
        { x: 4, y: 2 },
        { x: 5, y: 2 },
      ],
    },
    entities: [
      { id: 'player', asset: 'main_character.png', role: 'player', x: 0, y: 2 },
      ...BASE_PATH_ENTITIES.map((entity, idx) => ({ ...entity, id: `seq-path-${idx}` })),
      { id: 'hazard', asset: 'obstacle.png', role: 'hazard', x: 3, y: 2 },
      { id: 'goal', asset: 'food.png', role: 'goal', x: 6, y: 2 },
    ],
    availableBlocks: [
      { category: 'movement', blocks: ['move_forward', 'turn_left', 'turn_right', 'jump'] },
      { category: 'actions', blocks: ['collect_item'] },
      { category: 'control', blocks: [] },
      { category: 'logic', blocks: [] },
      { category: 'sensing', blocks: ['is_path_clear'] },
    ],
    constraints: {
      maxBlocks: 6,
      requiredConcept: 'sequencing',
    },
    successCriteria: {
      steps: ['Start at Pixel Pup', 'Move across stones', 'Jump obstacle', 'Collect treat'],
    },
    hints: [
      { reason: 'target_not_reached', message: 'The pup stopped early. Double-check that every walkway tile has a move command.' },
      { reason: 'obstacle_collision', message: 'You must jump when you reach the bubble pit. Try inserting Jump after the second move.' },
      { reason: 'wrong_order', message: 'Put Collect Treat after the pup lands on the final tile.' },
    ],
  },
  {
    id: 'puzzle-02',
    title: 'Loop Lagoon',
    story: 'Repeat tidy movements across the floating pads. Use loops to avoid writing the same Move block again and again.',
    goal: 'Use a loop to cross the lagoon and grab the item.',
    sceneId: 'loop-lagoon',
    order: 2,
    grid: {
      width: 7,
      height: 3,
      floorY: 2,
      start: { x: 0, y: 2 },
      goal: { x: 6, y: 2 },
      hazard: { x: 3, y: 2, type: 'obstacle.png' },
      waypoints: [
        { x: 1, y: 2 },
        { x: 2, y: 2 },
        { x: 3, y: 2 },
        { x: 4, y: 2 },
        { x: 5, y: 2 },
      ],
    },
    entities: [
      { id: 'player', asset: 'main_character.png', role: 'player', x: 0, y: 2 },
      ...BASE_PATH_ENTITIES.map((entity, idx) => ({ ...entity, id: `loop-path-${idx}` })),
      { id: 'hazard', asset: 'obstacle.png', role: 'hazard', x: 3, y: 2 },
      { id: 'goal', asset: 'food.png', role: 'goal', x: 6, y: 2 },
    ],
    availableBlocks: [
      { category: 'movement', blocks: ['move_forward', 'jump'] },
      { category: 'actions', blocks: ['collect_item'] },
      { category: 'control', blocks: ['repeat_times'] },
      { category: 'logic', blocks: [] },
      { category: 'sensing', blocks: ['is_path_clear'] },
    ],
    constraints: {
      maxBlocks: 8,
      requiredConcept: 'loops',
    },
    successCriteria: {
      steps: ['Use repeat block for forward steps', 'Jump hazard inside loop exit', 'Collect treat'],
    },
    hints: [
      { reason: 'wrong_order', message: 'Make sure Jump happens immediately before the obstacle tile.' },
      { reason: 'missing_condition', message: 'Wrap repeated moves in Repeat so you have room for jump + collect.' },
    ],
  },
  {
    id: 'puzzle-03',
    title: 'Crystal Conditions',
    story: 'Sensors reveal surprise obstacles. Use conditionals to choose whether to jump or keep walking, and finish with the special treat.',
    goal: 'Reach the rightmost food using if/else to avoid hazards.',
    sceneId: 'conditional-ridge',
    order: 3,
    grid: {
      width: 7,
      height: 3,
      floorY: 2,
      start: { x: 0, y: 2 },
      goal: { x: 6, y: 2 },
      hazard: { x: 2, y: 2, type: 'obstacle.png' },
      waypoints: [
        { x: 1, y: 2 },
        { x: 3, y: 2 },
        { x: 4, y: 2 },
        { x: 5, y: 2 },
      ],
    },
    entities: [
      { id: 'player', asset: 'main_character.png', role: 'player', x: 0, y: 2 },
      ...BASE_PATH_ENTITIES.map((entity, idx) => ({ ...entity, id: `cond-path-${idx}` })),
      { id: 'hazard', asset: 'obstacle.png', role: 'hazard', x: 2, y: 2 },
      { id: 'bonus', asset: 'food.png', role: 'goal', x: 6, y: 2 },
    ],
    availableBlocks: [
      { category: 'movement', blocks: ['move_forward', 'jump'] },
      { category: 'actions', blocks: ['collect_item', 'inspect'] },
      { category: 'control', blocks: ['repeat_until'] },
      { category: 'logic', blocks: ['if_else'] },
      { category: 'sensing', blocks: ['is_obstacle_ahead', 'is_item_nearby'] },
    ],
    constraints: {
      maxBlocks: 12,
      requiredConcept: 'conditionals',
    },
    successCriteria: {
      steps: ['Check for hazards each step', 'Jump only when sensor is true', 'Collect treat at end'],
    },
    hints: [
      { reason: 'missing_condition', message: 'Use If/Else with the obstacle sensor to decide when to Jump.' },
      { reason: 'target_not_reached', message: 'Repeat Until Goal ensures you keep moving until you land on the treat.' },
    ],
  },
];

export function syncPuzzleCatalog(db: Database.Database) {
  const insert = db.prepare(`
    INSERT INTO puzzles (
      id,
      title,
      story,
      goal,
      scene_id,
      order_index,
      grid,
      entities,
      available_blocks,
      constraints,
      success_criteria,
      hints,
      updated_at
    ) VALUES (@id, @title, @story, @goal, @sceneId, @order, @grid, @entities, @availableBlocks, @constraints, @successCriteria, @hints, datetime('now'))
    ON CONFLICT(id) DO UPDATE SET
      title = excluded.title,
      story = excluded.story,
      goal = excluded.goal,
      scene_id = excluded.scene_id,
      order_index = excluded.order_index,
      grid = excluded.grid,
      entities = excluded.entities,
      available_blocks = excluded.available_blocks,
      constraints = excluded.constraints,
      success_criteria = excluded.success_criteria,
      hints = excluded.hints,
      updated_at = datetime('now');
  `);

  const txn = db.transaction(() => {
    for (const puzzle of PUZZLES) {
      insert.run({
        ...puzzle,
        grid: JSON.stringify(puzzle.grid),
        entities: JSON.stringify(puzzle.entities),
        availableBlocks: JSON.stringify(puzzle.availableBlocks),
        constraints: JSON.stringify(puzzle.constraints),
        successCriteria: JSON.stringify(puzzle.successCriteria),
        hints: JSON.stringify(puzzle.hints),
      });
    }
  });

  txn();
}
