'use client';

import { useMemo, useRef, useState } from 'react';
import type { PuzzleDefinition } from '../lib/puzzles/definitions';
import type { BlockCategory, BlockNode } from '../lib/game/engine';

export type BlockWorkspaceProps = {
  puzzle: PuzzleDefinition;
  program: BlockNode[];
  onProgramChange: (nodes: BlockNode[]) => void;
  isRunning: boolean;
  collapsed: boolean;
  starterRecipe: string[];
};

type BlockDescriptor = {
  type: string;
  label: string;
  category: BlockCategory;
  color: string;
  description?: string;
  acceptsChildren?: boolean;
  acceptsElse?: boolean;
  numericField?: {
    key: string;
    min: number;
    max: number;
    defaultValue: number;
    suffix?: string;
  };
  requiresCondition?: boolean;
};

type DropTarget = {
  parentId: string;
  branch: 'root' | 'children' | 'else';
  index: number;
};

type DragSource =
  | { origin: 'library'; descriptor: BlockDescriptor }
  | { origin: 'program'; nodeId: string }
  | { origin: 'floating'; nodeId: string };

type FloatingBlock = BlockNode;

const BASE_BLOCKS: Record<string, BlockDescriptor> = {
  moveForward: {
    type: 'moveForward',
    label: 'Move Forward',
    category: 'movement',
    color: '#f77bdb',
    description: 'Advance one tile',
  },
  jump: {
    type: 'jump',
    label: 'Jump',
    category: 'movement',
    color: '#fdc6ff',
    description: 'Leap over one obstacle',
  },
  turnLeft: {
    type: 'turnLeft',
    label: 'Turn Left',
    category: 'movement',
    color: '#d7c2ff',
  },
  turnRight: {
    type: 'turnRight',
    label: 'Turn Right',
    category: 'movement',
    color: '#d7c2ff',
  },
  pickUp: {
    type: 'pickUp',
    label: 'Pick Up',
    category: 'actions',
    color: '#b0f9f2',
  },
  placeItem: {
    type: 'placeItem',
    label: 'Place Item',
    category: 'actions',
    color: '#b0f9f2',
  },
  repeat: {
    type: 'repeat',
    label: 'Repeat',
    category: 'control',
    color: '#8b5cf6',
    acceptsChildren: true,
    numericField: { key: 'count', min: 2, max: 12, defaultValue: 3, suffix: 'x' },
  },
  repeatUntil: {
    type: 'repeatUntil',
    label: 'Repeat Until',
    category: 'control',
    color: '#8b5cf6',
    acceptsChildren: true,
    requiresCondition: true,
  },
  while: {
    type: 'while',
    label: 'While',
    category: 'control',
    color: '#8b5cf6',
    acceptsChildren: true,
    requiresCondition: true,
  },
  if: {
    type: 'if',
    label: 'If',
    category: 'logic',
    color: '#f472b6',
    acceptsChildren: true,
    requiresCondition: true,
  },
  ifElse: {
    type: 'ifElse',
    label: 'If / Else',
    category: 'logic',
    color: '#f472b6',
    acceptsChildren: true,
    acceptsElse: true,
    requiresCondition: true,
  },
};

function makeBlockNode(descriptor: BlockDescriptor, sensingOptions: string[]): BlockNode {
  const args: Record<string, unknown> = {};
  if (descriptor.numericField) {
    args[descriptor.numericField.key] = descriptor.numericField.defaultValue;
  }
  if (descriptor.requiresCondition) {
    args.condition = sensingOptions[0] ?? 'pathAhead';
  }
  return {
    id: crypto.randomUUID?.() ?? Math.random().toString(36).slice(2),
    type: descriptor.type,
    category: descriptor.category,
    label: descriptor.label,
    args,
    children: descriptor.acceptsChildren ? [] : undefined,
    elseBranch: descriptor.acceptsElse ? [] : undefined,
  };
}

function removeNode(tree: BlockNode[], targetId: string): { nodes: BlockNode[]; removed?: BlockNode } {
  let removed: BlockNode | undefined;
  const nodes = tree
    .map((node) => {
      if (node.id === targetId) {
        removed = node;
        return null;
      }
      if (removed) {
        return node;
      }
      let updated: BlockNode = node;
      if (node.children) {
        const childResult = removeNode(node.children, targetId);
        if (childResult.removed) {
          removed = childResult.removed;
          updated = { ...updated, children: childResult.nodes };
        }
      }
      if (!removed && node.elseBranch) {
        const elseResult = removeNode(node.elseBranch, targetId);
        if (elseResult.removed) {
          removed = elseResult.removed;
          updated = { ...updated, elseBranch: elseResult.nodes };
        }
      }
      return updated;
    })
    .filter(Boolean) as BlockNode[];

  return { nodes, removed };
}

function insertNode(tree: BlockNode[], target: DropTarget, block: BlockNode): BlockNode[] {
  if (target.parentId === 'root') {
    const next = [...tree];
    next.splice(target.index, 0, block);
    return next;
  }

  return tree.map((node) => {
    if (node.id === target.parentId) {
      if (target.branch === 'children') {
        const children = node.children ? [...node.children] : [];
        children.splice(target.index, 0, block);
        return { ...node, children };
      }
      if (target.branch === 'else') {
        const elseBranch = node.elseBranch ? [...node.elseBranch] : [];
        elseBranch.splice(target.index, 0, block);
        return { ...node, elseBranch };
      }
      return node;
    }

    let updated = node;
    if (node.children) {
      const children = insertNode(node.children, target, block);
      if (children !== node.children) {
        updated = { ...updated, children };
        return updated;
      }
    }
    if (node.elseBranch) {
      const elseBranch = insertNode(node.elseBranch, target, block);
      if (elseBranch !== node.elseBranch) {
        updated = { ...updated, elseBranch };
        return updated;
      }
    }
    return node;
  });
}

function updateNode(
  tree: BlockNode[],
  targetId: string,
  updater: (node: BlockNode) => BlockNode
): BlockNode[] {
  return tree.map((node) => {
    if (node.id === targetId) {
      return updater(node);
    }
    let updated = node;
    if (node.children) {
      const children = updateNode(node.children, targetId, updater);
      if (children !== node.children) {
        updated = { ...updated, children };
      }
    }
    if (node.elseBranch) {
      const elseBranch = updateNode(node.elseBranch, targetId, updater);
      if (elseBranch !== node.elseBranch) {
        updated = { ...updated, elseBranch };
      }
    }
    return updated;
  });
}

function formatProgram(nodes: BlockNode[], indent = 0): string {
  const pad = '  '.repeat(indent);
  return nodes
    .map((node) => {
      switch (node.type) {
        case 'repeat':
          return `${pad}repeat ${node.args?.count} times\n${formatProgram(node.children ?? [], indent + 1)}`;
        case 'if':
          return `${pad}if (${node.args?.condition})\n${formatProgram(node.children ?? [], indent + 1)}`;
        case 'ifElse':
          return `${pad}if (${node.args?.condition})\n${formatProgram(
            node.children ?? [],
            indent + 1
          )}\n${pad}else\n${formatProgram(node.elseBranch ?? [], indent + 1)}`;
        default:
          return `${pad}${node.label}`;
      }
    })
    .join('\n');
}

const categoryOrder: BlockCategory[] = ['movement', 'actions', 'control', 'logic', 'sensing'];

function BlockWorkspace({ puzzle, program, onProgramChange, isRunning, collapsed, starterRecipe }: BlockWorkspaceProps) {
  const [floatingBlocks, setFloatingBlocks] = useState<FloatingBlock[]>([]);
  const [showCode, setShowCode] = useState(false);
  const dragSource = useRef<DragSource | null>(null);

  const descriptors = useMemo(() => {
    const entries: BlockDescriptor[] = [];
    const allowed = puzzle.allowedBlocks;
    categoryOrder.forEach((category) => {
      const blockIds = allowed[category as keyof typeof allowed] ?? [];
      blockIds.forEach((type) => {
        const descriptor = BASE_BLOCKS[type];
        if (descriptor) {
          entries.push(descriptor);
        }
      });
    });
    return entries;
  }, [puzzle]);

  const libraryByCategory = useMemo(() => {
    const grouped: Record<BlockCategory, BlockDescriptor[]> = {
      movement: [],
      actions: [],
      control: [],
      logic: [],
      sensing: [],
      root: [],
    };
    descriptors.forEach((descriptor) => {
      if (descriptor.category !== 'root') {
        grouped[descriptor.category].push(descriptor);
      }
    });
    // Represent sensing options as info chips
    if (puzzle.allowedBlocks.sensing.length > 0) {
      grouped.sensing = puzzle.allowedBlocks.sensing.map((sensor) => ({
        type: `sensor:${sensor}`,
        label: sensor,
        category: 'sensing',
        color: '#fff1fb',
      } as BlockDescriptor));
    }
    return grouped;
  }, [descriptors, puzzle.allowedBlocks.sensing]);

  const handleLibraryDragStart = (descriptor: BlockDescriptor) => (event: React.DragEvent) => {
    if (isRunning) {
      event.preventDefault();
      return;
    }
    if (descriptor.category === 'sensing' && descriptor.type.startsWith('sensor:')) {
      event.preventDefault();
      return;
    }
    dragSource.current = { origin: 'library', descriptor };
    event.dataTransfer.effectAllowed = 'copyMove';
  };

  const handleProgramDragStart = (nodeId: string) => (event: React.DragEvent) => {
    if (isRunning) {
      event.preventDefault();
      return;
    }
    dragSource.current = { origin: 'program', nodeId };
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleFloatingDragStart = (nodeId: string) => (event: React.DragEvent) => {
    if (isRunning) {
      event.preventDefault();
      return;
    }
    dragSource.current = { origin: 'floating', nodeId };
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (target: DropTarget) => (event: React.DragEvent) => {
    if (isRunning) {
      event.preventDefault();
      return;
    }
    event.preventDefault();
    const source = dragSource.current;
    dragSource.current = null;
    if (!source) return;

    if (target.parentId === 'floating') {
      if (source.origin === 'library') {
        const block = makeBlockNode(source.descriptor, puzzle.allowedBlocks.sensing);
        setFloatingBlocks((prev) => [...prev, block]);
      } else if (source.origin === 'program') {
        const removal = removeNode(program, source.nodeId);
        if (removal.removed) {
          onProgramChange(removal.nodes);
          setFloatingBlocks((prev) => [...prev, removal.removed!]);
        }
      } else if (source.origin === 'floating') {
        // Reorder floating blocks
        setFloatingBlocks((prev) => {
          const rest = prev.filter((block) => block.id !== source.nodeId);
          const moved = prev.find((block) => block.id === source.nodeId);
          if (!moved) return prev;
          rest.splice(target.index, 0, moved);
          return [...rest];
        });
      }
      return;
    }

    let payload: BlockNode | undefined;
    let nextProgram = program;
    if (source.origin === 'library') {
      payload = makeBlockNode(source.descriptor, puzzle.allowedBlocks.sensing);
    } else if (source.origin === 'program') {
      const removal = removeNode(program, source.nodeId);
      payload = removal.removed;
      nextProgram = removal.nodes;
    } else {
      const block = floatingBlocks.find((node) => node.id === source.nodeId);
      if (block) {
        payload = block;
        setFloatingBlocks((prev) => prev.filter((node) => node.id !== source.nodeId));
      }
    }

    if (!payload) return;
    const updated = insertNode(nextProgram, target, payload);
    onProgramChange(updated);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const handleNumericChange = (nodeId: string, value: number) => {
    onProgramChange(
      updateNode(program, nodeId, (node) => ({
        ...node,
        args: { ...node.args, count: value },
      }))
    );
  };

  const handleConditionChange = (nodeId: string, condition: string) => {
    onProgramChange(
      updateNode(program, nodeId, (node) => ({
        ...node,
        args: { ...node.args, condition },
      }))
    );
  };

  const handleLibraryClick = (descriptor: BlockDescriptor) => {
    if (isRunning) return;
    if (descriptor.category === 'sensing' && descriptor.type.startsWith('sensor:')) {
      return;
    }
    const block = makeBlockNode(descriptor, puzzle.allowedBlocks.sensing);
    onProgramChange([...program, block]);
  };

  const rootDropZones = (parentId: string, branch: 'root' | 'children' | 'else', blocks: BlockNode[]) => {
    const zones = [];
    for (let i = 0; i <= blocks.length; i += 1) {
      zones.push(
        <div
          key={`${parentId}-${branch}-dz-${i}`}
          className="block-drop-zone"
          onDragOver={handleDragOver}
          onDrop={handleDrop({ parentId, branch, index: i })}
        />
      );
      if (i < blocks.length) {
        zones.push(renderBlock(blocks[i]));
      }
    }
    return zones;
  };

  const renderBlock = (node: BlockNode) => {
    const descriptor = BASE_BLOCKS[node.type];
    const numericField = descriptor?.numericField;
    const requiresCondition = descriptor?.requiresCondition;
    const sensors = puzzle.allowedBlocks.sensing.length > 0 ? puzzle.allowedBlocks.sensing : ['pathAhead'];
    return (
      <div
        key={node.id}
        className={`block-node block-${node.category}`}
        style={{ background: descriptor?.color ?? 'rgba(255,255,255,0.1)' }}
        draggable={!isRunning}
        onDragStart={handleProgramDragStart(node.id)}
      >
        <header>
          <span>{node.label}</span>
          <button
            type="button"
            onClick={() => {
              const removal = removeNode(program, node.id);
              if (removal.removed) {
                onProgramChange(removal.nodes);
                setFloatingBlocks((prev) => [...prev, removal.removed!]);
              }
            }}
          >
            ✕
          </button>
        </header>
        {numericField && (
          <label>
            count
            <input
              type="number"
              min={numericField.min}
              max={numericField.max}
              value={(node.args?.[numericField.key] as number) ?? numericField.defaultValue}
              onChange={(event) => handleNumericChange(node.id, Number(event.target.value))}
            />
          </label>
        )}
        {requiresCondition && (
          <label>
            Sensor
            <select
              value={(node.args?.condition as string) ?? sensors[0]}
              onChange={(event) => handleConditionChange(node.id, event.target.value)}
            >
              {sensors.map((sensor) => (
                <option key={sensor} value={sensor}>
                  {sensor}
                </option>
              ))}
            </select>
          </label>
        )}
        {descriptor?.acceptsChildren && (
          <div className="block-children">
            {rootDropZones(node.id, 'children', node.children ?? [])}
          </div>
        )}
        {descriptor?.acceptsElse && (
          <div className="block-else">
            <p>Else</p>
            {rootDropZones(node.id, 'else', node.elseBranch ?? [])}
          </div>
        )}
      </div>
    );
  };

  const codePreview = formatProgram(program);

  if (collapsed) {
    return (
      <div className="workspace-collapsed" aria-live="polite">
        Workspace is minimized while the scene is running. Tap the toggle in controls to reopen it.
      </div>
    );
  }

  return (
    <div className="block-workspace">
      <div className="workspace-header">
        <div>
          <h3>Block Workspace</h3>
          <p>Drag commands from the library into the On Start root. Disconnected blocks rest in the floating tray.</p>
        </div>
        <button type="button" className="button-secondary" onClick={() => setShowCode((prev) => !prev)}>
          {showCode ? 'Hide Code' : 'Show Code'}
        </button>
      </div>

      {isRunning && (
        <div className="workspace-warning" role="status">
          Program is running — blocks are locked until the scene finishes.
        </div>
      )}

      {floatingBlocks.length > 0 && (
        <div className="workspace-warning" role="status">
          <strong>Warning:</strong> {floatingBlocks.length} disconnected block(s) will not run until attached beneath On Start.
        </div>
      )}

      <div className="workspace-content">
        <div className="block-library" aria-label="Command library">
          {categoryOrder.map((category) => (
            <div key={category} className="block-category">
              <p className="category-title">{category}</p>
              <div className="category-blocks">
                {libraryByCategory[category].map((descriptor) => (
                  <button
                    key={descriptor.type}
                    type="button"
                  className="block-chip"
                  style={{ background: descriptor.color }}
                  draggable={!isRunning && (descriptor.category !== 'sensing' || !descriptor.type.startsWith('sensor:'))}
                  onDragStart={handleLibraryDragStart(descriptor)}
                  onClick={() => handleLibraryClick(descriptor)}
                >
                    {descriptor.label}
                  </button>
                ))}
                {libraryByCategory[category].length === 0 && (
                  <p className="category-empty">No blocks unlocked</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="block-stack" aria-label="Program stack">
          <div className="on-start-block">
            <span>On Start</span>
            <div className="on-start-body">
              {program.length === 0 && (
                <div className="on-start-empty">
                  <strong>Nothing is connected yet.</strong>
                  <p>Click a block in the library to add it here, or drag blocks into this area.</p>
                  {starterRecipe.length > 0 && (
                    <div className="starter-recipe">
                      <span className="starter-recipe-label">Good first blocks:</span>
                      <div className="starter-recipe-chips">
                        {starterRecipe.map((step, index) => (
                          <span key={`${step}-${index}`} className="starter-recipe-chip">
                            {index + 1}. {step}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {rootDropZones('root', 'root', program)}
            </div>
          </div>
          <div
            className="floating-tray"
            onDragOver={handleDragOver}
            onDrop={handleDrop({ parentId: 'floating', branch: 'root', index: floatingBlocks.length })}
          >
            <header>
              <span>Floating Blocks</span>
              <small>Drop here to keep drafts. They will not execute.</small>
            </header>
            <div className="floating-list">
              {floatingBlocks.map((block) => (
                <div
                  key={block.id}
                  className="floating-block"
                  draggable
                  onDragStart={handleFloatingDragStart(block.id)}
                >
                  {block.label}
                </div>
              ))}
              {floatingBlocks.length === 0 && <p className="floating-empty">Drag unused blocks here.</p>}
            </div>
          </div>
        </div>
      </div>

      {showCode && (
        <div className="code-panel" aria-live="polite">
          <h4>Show Code</h4>
          <pre>{codePreview || 'OnStart { /* drop blocks to see code */ }'}</pre>
        </div>
      )}
    </div>
  );
}

export default BlockWorkspace;
