'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as Blockly from 'blockly';
import { ensureBlocklyBlocks, buildToolbox, PaletteConfig } from '@/lib/blockly/definitions';
import { getBlocklyTheme } from '@/lib/blockly/theme';
import {
  ensureOnStartBlock,
  extractProgram,
  getDisconnectedBlockCount,
  programToText,
  serializeWorkspace,
  restoreWorkspace,
  ProgramInstruction,
} from '@/lib/blockly/serialization';

type Params = {
  puzzleId: string;
  palette: PaletteConfig;
  maxBlocks: number;
  initialState?: string | object | null;
  onWorkspaceReady?: (workspace: Blockly.WorkspaceSvg) => void;
};

export function useBlocklyWorkspace({ puzzleId, palette, maxBlocks, initialState, onWorkspaceReady }: Params) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);
  const initialSnapshotRef = useRef<string | null>(null);
  const [code, setCode] = useState('');
  const [blockCount, setBlockCount] = useState(0);
  const [hasDisconnected, setHasDisconnected] = useState(false);
  const [snapshot, setSnapshot] = useState<string | null>(
    initialState ? (typeof initialState === 'string' ? initialState : JSON.stringify(initialState)) : null
  );

  const toolbox = useMemo(() => buildToolbox(palette), [palette]);

  useEffect(() => {
    ensureBlocklyBlocks();
  }, []);

  useEffect(() => {
    const normalized = initialState ? (typeof initialState === 'string' ? initialState : JSON.stringify(initialState)) : null;
    initialSnapshotRef.current = normalized;
    setSnapshot(normalized);
  }, [initialState, puzzleId]);

  useEffect(() => {
    if (!containerRef.current) return;

    const workspace = Blockly.inject(containerRef.current, {
      toolbox,
      theme: getBlocklyTheme(),
      maxBlocks,
      trashcan: true,
      move: {
        scrollbars: true,
        drag: true,
        wheel: true,
      },
      zoom: {
        controls: true,
        wheel: true,
        startScale: 0.9,
      },
      grid: {
        spacing: 24,
        length: 3,
        snap: true,
        colour: '#301a44',
      },
    });

    workspaceRef.current = workspace;
    ensureOnStartBlock(workspace);
    const seedState = initialSnapshotRef.current;
    if (seedState) {
      restoreWorkspace(workspace, seedState);
    }
    workspace.scrollCenter();
    onWorkspaceReady?.(workspace);

    const listener = () => {
      ensureOnStartBlock(workspace);
      const instructions = extractProgram(workspace);
      setCode(programToText(instructions));
      const activeBlocks = workspace
        .getAllBlocks(false)
        .filter((block) => block.type !== 'custom_on_start').length;
      setBlockCount(activeBlocks);
      setHasDisconnected(getDisconnectedBlockCount(workspace) > 0);
      const saved = serializeWorkspace(workspace);
      if (saved) {
        setSnapshot(saved);
      }
    };

    workspace.addChangeListener(listener);
    listener();

    return () => {
      workspace.removeChangeListener(listener);
      workspace.dispose();
      workspaceRef.current = null;
    };
  }, [toolbox, maxBlocks, puzzleId, onWorkspaceReady]);

  const getProgram = useCallback(() => extractProgram(workspaceRef.current), []);
  const getSnapshot = useCallback(() => serializeWorkspace(workspaceRef.current), []);

  const reset = useCallback(() => {
    const workspace = workspaceRef.current;
    if (!workspace) return;
    workspace.clear();
    ensureOnStartBlock(workspace);
    workspace.scrollCenter();
  }, []);

  const focus = useCallback(() => {
    workspaceRef.current?.markFocused();
  }, []);

  return {
    containerRef,
    workspaceRef,
    code,
    blockCount,
    hasDisconnected,
    snapshot,
    getProgram,
    getSnapshot,
    reset,
    focus,
  };
}

export type WorkspaceHookReturn = ReturnType<typeof useBlocklyWorkspace> & {
  getProgram: () => ProgramInstruction[];
};
