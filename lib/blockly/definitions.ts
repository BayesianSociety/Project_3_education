import * as Blockly from 'blockly';
import type { BlockCategory, PuzzleDefinition } from '@/lib/puzzles/data';

export type PaletteConfig = PuzzleDefinition['availableBlocks'];

export const CATEGORY_DETAILS: Record<
  BlockCategory,
  { label: string; description: string; accent: string; icon: string }
> = {
  movement: {
    label: 'Movement',
    description: 'Walk, turn, and jump across the path.',
    accent: '#f154c0',
    icon: '↪',
  },
  actions: {
    label: 'Actions',
    description: 'Collect treats or inspect the scene.',
    accent: '#ffa158',
    icon: '⚡',
  },
  control: {
    label: 'Control',
    description: 'Loops and program structure.',
    accent: '#7f5dff',
    icon: '⟳',
  },
  logic: {
    label: 'Logic',
    description: 'If/else decisions.',
    accent: '#5cf2d2',
    icon: '✦',
  },
  sensing: {
    label: 'Sensing',
    description: 'Read the world with sensors.',
    accent: '#ffd6f1',
    icon: '👀',
  },
};

const BLOCK_DEFINITIONS: Blockly.BlockDefinition[] = [
  {
    type: 'custom_on_start',
    message0: 'On Start %1 %2',
    args0: [
      {
        type: 'field_image',
        src: '/assets/sprites/main_character.png',
        width: 36,
        height: 36,
        alt: '*',
      },
      {
        type: 'input_statement',
        name: 'STACK',
      },
    ],
    style: 'movement',
    previousStatement: null,
    nextStatement: null,
    tooltip: 'All code under On Start executes when you press Play.',
    helpUrl: '',
    enableContextMenu: false,
    deletable: false,
    movable: false,
  },
  {
    type: 'move_forward',
    message0: 'Move forward',
    previousStatement: null,
    nextStatement: null,
    style: 'movement',
    tooltip: 'Advance one tile.',
  },
  {
    type: 'turn_left',
    message0: 'Turn left',
    previousStatement: null,
    nextStatement: null,
    style: 'movement',
    tooltip: 'Rotate left.',
  },
  {
    type: 'turn_right',
    message0: 'Turn right',
    previousStatement: null,
    nextStatement: null,
    style: 'movement',
    tooltip: 'Rotate right.',
  },
  {
    type: 'jump',
    message0: 'Jump over hazard',
    previousStatement: null,
    nextStatement: null,
    style: 'movement',
    tooltip: 'Leap straight ahead.',
  },
  {
    type: 'collect_item',
    message0: 'Collect treat',
    previousStatement: null,
    nextStatement: null,
    style: 'actions',
    tooltip: 'Grab the tasty goal.',
  },
  {
    type: 'inspect',
    message0: 'Inspect surroundings',
    previousStatement: null,
    nextStatement: null,
    style: 'actions',
    tooltip: 'Look for conditions or surprises.',
  },
  {
    type: 'repeat_times',
    message0: 'Repeat %1 times',
    args0: [
      {
        type: 'field_number',
        name: 'TIMES',
        value: 2,
        min: 1,
        max: 12,
      },
    ],
    message1: '%1',
    args1: [{ type: 'input_statement', name: 'DO' }],
    previousStatement: null,
    nextStatement: null,
    style: 'control',
    tooltip: 'Run the nested steps a number of times.',
  },
  {
    type: 'repeat_until',
    message0: 'Repeat until %1',
    args0: [
      {
        type: 'field_dropdown',
        name: 'CONDITION',
        options: [
          ['goal reached', 'goal_reached'],
          ['item collected', 'item_collected'],
        ],
      },
    ],
    message1: '%1',
    args1: [{ type: 'input_statement', name: 'DO' }],
    previousStatement: null,
    nextStatement: null,
    style: 'control',
    tooltip: 'Repeat until the condition is true.',
  },
  {
    type: 'if_else',
    message0: 'If %1',
    args0: [
      {
        type: 'input_value',
        name: 'CONDITION',
        check: 'Boolean',
      },
    ],
    message1: 'do %1',
    args1: [{ type: 'input_statement', name: 'IF' }],
    message2: 'else %1',
    args2: [{ type: 'input_statement', name: 'ELSE' }],
    previousStatement: null,
    nextStatement: null,
    style: 'logic',
    tooltip: 'Choose between two paths based on the sensor.',
  },
  {
    type: 'is_path_clear',
    message0: 'Path is clear',
    output: 'Boolean',
    style: 'sensing',
    tooltip: 'Returns true when the next tile is safe.',
  },
  {
    type: 'is_obstacle_ahead',
    message0: 'Obstacle ahead',
    output: 'Boolean',
    style: 'sensing',
    tooltip: 'True if something blocks the way.',
  },
  {
    type: 'is_item_nearby',
    message0: 'Item nearby',
    output: 'Boolean',
    style: 'sensing',
    tooltip: 'True if a collectible is close.',
  },
];

let registered = false;

export function ensureBlocklyBlocks() {
  if (registered) return;
  Blockly.common.defineBlocksWithJsonArray(BLOCK_DEFINITIONS);
  registered = true;
}

export function buildToolbox(palette: PaletteConfig): Blockly.utils.toolbox.ToolboxDefinition {
  return {
    kind: 'categoryToolbox',
    contents: palette.map((entry) => ({
      kind: 'category',
      name: CATEGORY_DETAILS[entry.category].label,
      categorystyle: entry.category,
      contents:
        entry.blocks.length > 0
          ? entry.blocks.map((block) => ({ kind: 'block', type: block }))
          : [{ kind: 'label', text: 'Locked for this puzzle' }],
    })),
  };
}
