import * as Blockly from 'blockly';

export type SensorCondition = 'path_clear' | 'obstacle_ahead' | 'item_nearby' | 'goal_reached' | 'item_collected';

export type ProgramInstruction =
  | { kind: 'move_forward'; blockId: string }
  | { kind: 'turn_left'; blockId: string }
  | { kind: 'turn_right'; blockId: string }
  | { kind: 'jump'; blockId: string }
  | { kind: 'collect_item'; blockId: string }
  | { kind: 'inspect'; blockId: string }
  | { kind: 'repeat_times'; blockId: string; times: number; body: ProgramInstruction[] }
  | { kind: 'repeat_until'; blockId: string; condition: SensorCondition; body: ProgramInstruction[] }
  | { kind: 'if_else'; blockId: string; condition: SensorCondition; ifBody: ProgramInstruction[]; elseBody: ProgramInstruction[] };

function blockToCondition(block: Blockly.Block | null): SensorCondition {
  if (!block) return 'path_clear';
  switch (block.type) {
    case 'is_obstacle_ahead':
      return 'obstacle_ahead';
    case 'is_item_nearby':
      return 'item_nearby';
    case 'is_path_clear':
      return 'path_clear';
    default:
      return 'path_clear';
  }
}

function walkStack(block: Blockly.Block | null): ProgramInstruction[] {
  const instructions: ProgramInstruction[] = [];
  let cursor: Blockly.Block | null = block;
  while (cursor) {
    const instruction = blockToInstruction(cursor);
    if (instruction) {
      instructions.push(instruction);
    }
    cursor = cursor.getNextBlock();
  }
  return instructions;
}

function blockToInstruction(block: Blockly.Block | null): ProgramInstruction | null {
  if (!block) return null;
  switch (block.type) {
    case 'move_forward':
    case 'turn_left':
    case 'turn_right':
    case 'jump':
    case 'collect_item':
    case 'inspect':
      return { kind: block.type as ProgramInstruction['kind'], blockId: block.id } as ProgramInstruction;
    case 'repeat_times': {
      const times = block.getFieldValue('TIMES');
      return {
        kind: 'repeat_times',
        blockId: block.id,
        times: typeof times === 'number' ? times : parseInt((times as string) ?? '2', 10),
        body: walkStack(block.getInputTargetBlock('DO')),
      };
    }
    case 'repeat_until': {
      const field = block.getFieldValue('CONDITION') as SensorCondition | undefined;
      return {
        kind: 'repeat_until',
        blockId: block.id,
        condition: field ?? 'goal_reached',
        body: walkStack(block.getInputTargetBlock('DO')),
      };
    }
    case 'if_else': {
      const condition = blockToCondition(block.getInputTargetBlock('CONDITION'));
      return {
        kind: 'if_else',
        blockId: block.id,
        condition,
        ifBody: walkStack(block.getInputTargetBlock('IF')),
        elseBody: walkStack(block.getInputTargetBlock('ELSE')),
      };
    }
    default:
      return null;
  }
}

export function ensureOnStartBlock(workspace: Blockly.WorkspaceSvg) {
  const roots = workspace.getBlocksByType('custom_on_start', false);
  if (!roots.length) {
    const block = workspace.newBlock('custom_on_start');
    block.initSvg();
    block.render();
    block.moveBy(32, 32);
  } else {
    roots.forEach((root) => {
      root.setMovable(false);
      root.setDeletable(false);
    });
  }
}

export function extractProgram(workspace: Blockly.WorkspaceSvg | null): ProgramInstruction[] {
  if (!workspace) return [];
  const start = workspace.getBlocksByType('custom_on_start', false)[0];
  if (!start) return [];
  const stack = start.getInputTargetBlock('STACK');
  return walkStack(stack);
}

export function programToText(program: ProgramInstruction[], depth = 0): string {
  const indent = '  '.repeat(depth);
  const lines: string[] = [];
  program.forEach((instruction) => {
    switch (instruction.kind) {
      case 'move_forward':
      case 'turn_left':
      case 'turn_right':
      case 'jump':
      case 'collect_item':
      case 'inspect':
        lines.push(`${indent}${instruction.kind}()`);
        break;
      case 'repeat_times':
        lines.push(`${indent}repeat ${instruction.times} times {`);
        lines.push(programToText(instruction.body, depth + 1));
        lines.push(`${indent}}`);
        break;
      case 'repeat_until':
        lines.push(`${indent}repeat until ${instruction.condition} {`);
        lines.push(programToText(instruction.body, depth + 1));
        lines.push(`${indent}}`);
        break;
      case 'if_else':
        lines.push(`${indent}if ${instruction.condition} {`);
        lines.push(programToText(instruction.ifBody, depth + 1));
        lines.push(`${indent}} else {`);
        lines.push(programToText(instruction.elseBody, depth + 1));
        lines.push(`${indent}}`);
        break;
      default:
        break;
    }
  });
  return lines.filter(Boolean).join('\n');
}

export function serializeWorkspace(workspace: Blockly.WorkspaceSvg | null) {
  if (!workspace) return null;
  const json = Blockly.serialization.workspaces.save(workspace);
  return JSON.stringify(json);
}

export function restoreWorkspace(workspace: Blockly.WorkspaceSvg | null, snapshot: string | object | null) {
  if (!workspace || !snapshot) return;
  const payload = typeof snapshot === 'string' ? JSON.parse(snapshot) : snapshot;
  Blockly.serialization.workspaces.load(payload, workspace);
  ensureOnStartBlock(workspace);
}

export function getDisconnectedBlockCount(workspace: Blockly.WorkspaceSvg | null) {
  if (!workspace) return 0;
  return workspace
    .getTopBlocks(false)
    .filter((block) => block.type !== 'custom_on_start' && !block.getParent())
    .length;
}
