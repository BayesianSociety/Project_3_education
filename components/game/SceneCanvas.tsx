'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { PuzzleDefinition } from '@/lib/puzzles/data';
import type { MovementFrame } from '@/lib/game/runtime';
import Workspace, { type BlocklyWorkspaceRef } from '@/components/blockly/Workspace';
import Palette from '@/components/blockly/Palette';
import CodeWarning from '@/components/blockly/CodeWarning';
import RunControls from './RunControls';
import HintPanel from './HintPanel';
import TextToSpeechToggle from './TextToSpeechToggle';
import { useAccessibility } from '@/hooks/useAccessibility';
import { useTelemetryBuffer } from '@/hooks/useTelemetryBuffer';
import { executeProgram } from '@/lib/game/runtime';
import { CandyRenderer, type RenderPayload, type Sprite } from '@/lib/webgl/renderer';
import type { SpeedValue } from './SpeedToggle';

type SceneCanvasProps = {
  puzzle: PuzzleDefinition;
  frames: MovementFrame[];
  speed: SpeedValue;
  onFrame?: (frame: MovementFrame | null) => void;
  onComplete?: () => void;
};

const tileSize = 96;
const backgroundTexture = '/assets/backgrounds/background.jpg';

export default function SceneCanvas({ puzzle, frames, speed, onFrame, onComplete }: SceneCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rendererRef = useRef<CandyRenderer | null>(null);
  const onFrameRef = useRef(onFrame);
  const onCompleteRef = useRef(onComplete);
  const [playerState, setPlayerState] = useState(() => ({
    x: puzzle.grid.start.x,
    y: puzzle.grid.start.y,
    facing: 'east' as 'east' | 'west',
    lift: 0,
  }));

  const assetList = useMemo(() => {
    const assets = new Set<string>([backgroundTexture]);
    puzzle.entities.forEach((entity) => assets.add(resolveSprite(entity.asset)));
    assets.add(resolveSprite('main_character.png'));
    return Array.from(assets);
  }, [puzzle]);

  const staticSprites = useMemo(() => {
    return puzzle.entities
      .filter((entity) => entity.role !== 'player')
      .map((entity) =>
        toSprite({
          id: entity.id,
          asset: resolveSprite(entity.asset),
          x: entity.x,
          y: entity.y,
          width: tileSize,
          height: tileSize,
        })
      );
  }, [puzzle]);

  useEffect(() => {
    onFrameRef.current = onFrame;
  }, [onFrame]);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const renderer = new CandyRenderer(canvasRef.current);
    rendererRef.current = renderer;
    renderer.prepareAssets(assetList).then(() => renderScene(staticSprites, playerState, renderer));
    return () => {
      rendererRef.current = null;
    };
  }, [assetList, staticSprites]);

  useEffect(() => {
    if (!frames.length) {
      setPlayerState({
        x: puzzle.grid.start.x,
        y: puzzle.grid.start.y,
        facing: 'east',
        lift: 0,
      });
      onFrameRef.current?.(null);
      return;
    }
    let cancelled = false;
    const timers: number[] = [];
    const durations: Record<SpeedValue, number> = {
      slow: 700,
      normal: 450,
      fast: 250,
    };
    const duration = durations[speed];

    const playFrame = (index: number) => {
      if (cancelled) return;
      if (index >= frames.length) {
        onCompleteRef.current?.();
        return;
      }
      const frame = frames[index];
      const previous = index === 0
        ? { x: puzzle.grid.start.x, y: puzzle.grid.start.y, facing: 'east' as const }
        : frames[index - 1];

      onFrameRef.current?.(frame);

      if (frame.action === 'jump') {
        setPlayerState({
          x: previous.x,
          y: previous.y,
          facing: frame.facing ?? previous.facing,
          lift: 28,
        });
        timers.push(
          window.setTimeout(() => {
            if (cancelled) return;
            setPlayerState({
              x: frame.x,
              y: frame.y,
              facing: frame.facing ?? previous.facing,
              lift: 0,
            });
          }, duration / 2)
        );
      } else {
        setPlayerState({
          x: frame.x,
          y: frame.y,
          facing: frame.facing ?? previous.facing,
          lift: 0,
        });
      }

      timers.push(
        window.setTimeout(() => {
          playFrame(index + 1);
        }, duration)
      );
    };

    playFrame(0);

    return () => {
      cancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [frames, speed, puzzle.grid.start.x, puzzle.grid.start.y]);

  useEffect(() => {
    if (!rendererRef.current) return;
    renderScene(staticSprites, playerState, rendererRef.current);
  }, [playerState, staticSprites]);

  return (
    <canvas
      ref={canvasRef}
      width={960}
      height={560}
      style={{ width: '100%', height: '100%', borderRadius: 32, border: '1px solid rgba(255,255,255,0.1)' }}
    />
  );
}

function renderScene(
  staticSprites: Sprite[],
  playerState: { x: number; y: number; facing: 'east' | 'west'; lift: number },
  renderer: CandyRenderer
) {
  const playerSprite = toSprite({
    id: 'player',
    asset: resolveSprite('main_character.png'),
    x: playerState.x,
    y: playerState.y,
    width: tileSize,
    height: tileSize,
  });
  playerSprite.flip = playerState.facing === 'west';
  playerSprite.y -= playerState.lift;
  const payload: RenderPayload = {
    background: backgroundTexture,
    sprites: [...staticSprites, playerSprite],
  };
  renderer.render(payload);
}

function toSprite({
  id,
  asset,
  x,
  y,
  width,
  height,
}: {
  id: string;
  asset: string;
  x: number;
  y: number;
  width: number;
  height: number;
}): Sprite {
  return {
    id,
    asset,
    ...gridToPixels(x, y, width, height),
  };
}

function gridToPixels(x: number, y: number, width: number, height: number) {
  const offsetX = 80;
  const baseY = 280;
  const px = offsetX + x * (tileSize * 0.9);
  const py = baseY - y * (tileSize * 0.35);
  return {
    x: px,
    y: py,
    width,
    height,
  };
}

function resolveSprite(asset: string) {
  if (asset.startsWith('/')) return asset;
  return `/assets/sprites/${asset}`;
}

type PuzzleExperienceProps = {
  puzzle: PuzzleDefinition;
  locked: boolean;
  progressOrder: { id: string; order: number; status: 'locked' | 'available' | 'complete' }[];
};

export function PuzzleExperience({ puzzle, locked, progressOrder }: PuzzleExperienceProps) {
  const router = useRouter();
  const workspaceRef = useRef<BlocklyWorkspaceRef>(null);
  const nextPuzzleIdRef = useRef<string | null>(null);
  const [frames, setFrames] = useState<MovementFrame[]>([]);
  const [speed, setSpeed] = useState<SpeedValue>('normal');
  const [showCode, setShowCode] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'failure'>('idle');
  const [hint, setHint] = useState<string | undefined>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [blockCount, setBlockCount] = useState(0);
  const [hasDisconnected, setHasDisconnected] = useState(false);
  const telemetry = useTelemetryBuffer();
  const { setSessionId } = telemetry;
  const accessibility = useAccessibility();

  useEffect(() => {
    ensureSession(setSessionId, puzzle.id);
  }, [puzzle.id, setSessionId]);

  const handleFrame = (frame: MovementFrame | null) => {
    workspaceRef.current?.highlight(frame?.blockId ?? null);
  };

  const canRun = !locked && Boolean(telemetry.sessionId);

  const handleRun = () => {
    if (!canRun || isPlaying) return;
    if (!telemetry.sessionId) {
      setStatus('failure');
      setHint('Starting session. Try again in a second.');
      return;
    }
    const program = workspaceRef.current?.getProgram() ?? [];
    if (!program.length) {
      setStatus('failure');
      setHint('Connect blocks under On Start before pressing Play.');
      return;
    }
    setIsPlaying(true);
    telemetry.beginAttempt({
      puzzleId: puzzle.id,
      codeSnapshot: workspaceRef.current?.getSnapshot() ?? '',
      metrics: { commands: program.length },
    });
    telemetry.recordEvent({ type: 'run_started', detail: { puzzleId: puzzle.id } });
    const result = executeProgram(program, puzzle);
    setFrames(result.movements);
    result.events.forEach((event) => telemetry.recordEvent(event));
    result.movements.forEach((movement) =>
      telemetry.recordMovement({
        stepIndex: movement.stepIndex,
        x: movement.x,
        y: movement.y,
        action: movement.action,
      })
    );
    setStatus(result.success ? 'success' : 'failure');
    setHint(result.hint);
    if (result.success) {
      nextPuzzleIdRef.current = updateProgress(puzzle, progressOrder);
    } else {
      nextPuzzleIdRef.current = null;
    }
    telemetry.recordEvent({
      type: 'run_finished',
      detail: { success: result.success, failureReason: result.failureReason },
    });
    telemetry.markAttemptStatus(result.success ? 'success' : 'failure', result.failureReason);
    if (!result.movements.length) {
      setIsPlaying(false);
      telemetry.flush();
    }
  };

  const handleReset = () => {
    setFrames([]);
    setShowCode(false);
    setStatus('idle');
    setHint(undefined);
    setIsPlaying(false);
    workspaceRef.current?.reset();
    workspaceRef.current?.highlight(null);
    telemetry.recordEvent({ type: 'reset_clicked', detail: { puzzleId: puzzle.id } });
  };

  const handleComplete = () => {
    setIsPlaying(false);
    telemetry.flush();
    if (nextPuzzleIdRef.current) {
      router.push(`/puzzles/${nextPuzzleIdRef.current}`);
    }
  };

  const hearGoal = () => accessibility.speak(puzzle.goal);

  return (
    <div>
      <header style={{ color: 'white' }}>
        <p className="badge">Puzzle {puzzle.order}</p>
        <h1 style={{ fontFamily: 'var(--font-display)', marginBottom: 4 }}>{puzzle.title}</h1>
        <p className="text-muted" style={{ maxWidth: 720 }}>{puzzle.story}</p>
      </header>
      {locked && (
        <div
          style={{
            padding: 16,
            borderRadius: 16,
            background: 'rgba(255, 132, 209, 0.15)',
            border: '1px solid rgba(255,132,209,0.4)',
            color: 'white',
            marginBottom: 16,
          }}
        >
          Complete the previous puzzle to unlock this scene.
        </div>
      )}
      <div style={{ marginBottom: 12, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <strong style={{ color: 'white' }}>Goal:</strong>
        <span style={{ color: 'rgba(255,255,255,0.85)' }}>{puzzle.goal}</span>
        <button
          type="button"
          onClick={hearGoal}
          disabled={!accessibility.ttsEnabled}
          style={{
            borderRadius: 999,
            border: '1px solid rgba(255,255,255,0.3)',
            background: 'transparent',
            color: accessibility.ttsEnabled ? 'var(--color-mint-200)' : 'rgba(255,255,255,0.4)',
            padding: '4px 12px',
          }}
        >
          Hear goal
        </button>
        <TextToSpeechToggle enabled={accessibility.ttsEnabled} onToggle={accessibility.toggleTts} />
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
          gap: 24,
          alignItems: 'stretch',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateRows: 'minmax(0, 1fr) auto auto',
            gap: 16,
            minHeight: 720,
          }}
        >
          <div style={{ minHeight: 0 }}>
            <SceneCanvas puzzle={puzzle} frames={frames} speed={speed} onFrame={handleFrame} onComplete={handleComplete} />
          </div>
          <RunControls
            isPlaying={isPlaying}
            onPlay={handleRun}
            onReset={handleReset}
            disablePlay={!canRun}
            speed={speed}
            onSpeedChange={setSpeed}
            showCode={showCode}
            onToggleCode={() => setShowCode((prev) => !prev)}
            auxiliary={
              <button
                type="button"
                onClick={() => setFrames([])}
                style={{
                  borderRadius: 999,
                  border: '1px solid rgba(255,255,255,0.25)',
                  background: 'transparent',
                  color: 'rgba(255,255,255,0.8)',
                  padding: '6px 14px',
                }}
              >
                Clear animation
              </button>
            }
          />
          <HintPanel status={status} hint={hint} />
        </div>
        <div
          style={{
            transition: 'transform 240ms ease, opacity 240ms ease',
            transform: isPlaying ? 'scale(0.985)' : 'scale(1)',
            opacity: isPlaying ? 0.96 : 1,
            minHeight: 720,
          }}
        >
          <Workspace
            ref={workspaceRef}
            puzzleId={puzzle.id}
            palette={puzzle.availableBlocks}
            maxBlocks={puzzle.constraints.maxBlocks}
            showCode={showCode}
            onShowCodeChange={setShowCode}
            onProgramChange={({ blockCount: nextBlockCount, hasDisconnected: nextHasDisconnected }) => {
              setBlockCount(nextBlockCount);
              setHasDisconnected(nextHasDisconnected);
            }}
          />
        </div>
      </div>
      <footer
        style={{
          marginTop: 24,
          background: 'rgba(12, 4, 25, 0.72)',
          borderRadius: 24,
          border: '1px solid rgba(255,255,255,0.08)',
          padding: 20,
        }}
      >
        <h2 style={{ color: 'white', marginTop: 0, marginBottom: 16 }}>Command Library</h2>
        <Palette palette={puzzle.availableBlocks} layout="row" />
        <div style={{ marginTop: 16 }}>
          <CodeWarning hasDisconnected={hasDisconnected} blockCount={blockCount} maxBlocks={puzzle.constraints.maxBlocks} />
        </div>
      </footer>
    </div>
  );
}

function ensureSession(setSessionId: (id: string) => void, puzzleId: string) {
  if (typeof window === 'undefined') return;
  const stored = window.localStorage.getItem('blockCoding.session');
  if (stored) {
    setSessionId(stored);
    return;
  }
  fetch('/api/session/start', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ puzzleId }),
  })
    .then((res) => res.json())
    .then((payload) => {
      if (payload?.session?.sessionId) {
        window.localStorage.setItem('blockCoding.session', payload.session.sessionId);
        setSessionId(payload.session.sessionId);
      }
    })
    .catch((error) => console.error('session start failed', error));
}

function updateProgress(puzzle: PuzzleDefinition, progressOrder: { id: string; order: number; status: string }[]) {
  if (typeof window === 'undefined') return null;
  const key = 'blockCodingProgress';
  let stored: Record<string, string> = {};
  const rawCookie = document.cookie.split(';').find((cookie) => cookie.trim().startsWith(`${key}=`));
  if (rawCookie) {
    try {
      stored = JSON.parse(decodeURIComponent(rawCookie.split('=')[1]));
    } catch (error) {
      stored = {};
    }
  }
  stored[puzzle.id] = 'complete';
  const sorted = [...progressOrder].sort((a, b) => a.order - b.order);
  const next = sorted.find((entry) => entry.order > puzzle.order);
  if (next && stored[next.id] !== 'complete') {
    stored[next.id] = 'available';
  }
  const serialized = JSON.stringify(stored);
  document.cookie = `${key}=${encodeURIComponent(serialized)};path=/;max-age=${60 * 60 * 24 * 365}`;
  window.localStorage.setItem(key, serialized);
  const detail = sorted.map((entry) => ({
    ...entry,
    status: stored[entry.id] ?? entry.status ?? 'locked',
  }));
  window.dispatchEvent(new CustomEvent('puzzle-progress-updated', { detail: { progress: detail } }));
  return next?.id ?? null;
}
