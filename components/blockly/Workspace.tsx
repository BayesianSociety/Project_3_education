'use client';

import { forwardRef, useEffect, useImperativeHandle } from 'react';
import type { ProgramInstruction } from '@/lib/blockly/serialization';
import type { PaletteConfig } from '@/lib/blockly/definitions';
import { useBlocklyWorkspace } from '@/hooks/useBlocklyWorkspace';
import ShowCodePanel from '@/components/game/ShowCodePanel';

export type BlocklyWorkspaceRef = {
  getProgram: () => ProgramInstruction[];
  getSnapshot: () => string | null;
  reset: () => void;
  focus: () => void;
  highlight: (blockId: string | null) => void;
};

type Props = {
  puzzleId: string;
  palette: PaletteConfig;
  maxBlocks: number;
  initialState?: string | object | null;
  showCode: boolean;
  onShowCodeChange: (next: boolean) => void;
  onProgramChange?: (payload: {
    program: ProgramInstruction[];
    code: string;
    snapshot: string | null;
    blockCount: number;
    hasDisconnected: boolean;
  }) => void;
};

const Workspace = forwardRef<BlocklyWorkspaceRef, Props>(function Workspace(
  { puzzleId, palette, maxBlocks, initialState, showCode, onShowCodeChange, onProgramChange },
  ref
) {
  const {
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
  } = useBlocklyWorkspace({ puzzleId, palette, maxBlocks, initialState });

  useImperativeHandle(
    ref,
    () => ({
      getProgram,
      getSnapshot,
      reset,
      focus,
      highlight: (blockId: string | null) => {
        if (!workspaceRef.current) return;
        workspaceRef.current.highlightBlock(blockId ?? '');
      },
    }),
    [getProgram, getSnapshot, reset, focus, workspaceRef]
  );

  useEffect(() => {
    if (!onProgramChange) return;
    const program = getProgram();
    onProgramChange({
      program,
      code,
      snapshot,
      blockCount,
      hasDisconnected,
    });
  }, [
    code,
    snapshot,
    blockCount,
    hasDisconnected,
    getProgram,
    onProgramChange,
  ]);

  return (
    <div
      style={{
        position: 'relative',
        height: '100%',
      }}
    >
      <div
        style={{
          background: 'rgba(12, 4, 25, 0.8)',
          borderRadius: 24,
          border: '1px solid rgba(255,255,255,0.1)',
          minHeight: 720,
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 20px',
            color: 'white',
          }}
        >
          <div>
            <strong>Program Workspace</strong>
            <p style={{ margin: 0, fontSize: 12, opacity: 0.7 }}>
              Blocks under On Start run when you press Play ({blockCount}/{maxBlocks} blocks).
            </p>
          </div>
          <button
            type="button"
            onClick={() => onShowCodeChange(!showCode)}
            aria-pressed={showCode}
            style={{
              borderRadius: 999,
              border: showCode ? '2px solid var(--color-mint-400)' : '1px solid rgba(255,255,255,0.25)',
              background: showCode ? 'rgba(92,242,210,0.15)' : 'transparent',
              color: 'white',
              padding: '6px 14px',
              fontWeight: 600,
            }}
          >
            {showCode ? 'Hide Code' : 'Show Code'}
          </button>
        </header>
        <div
          ref={containerRef}
          style={{
            flex: 1,
            minHeight: 0,
          }}
        />
        <ShowCodePanel code={code} open={showCode} onClose={() => onShowCodeChange(false)} />
      </div>
    </div>
  );
});

export default Workspace;
