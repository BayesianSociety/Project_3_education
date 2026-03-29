'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { PuzzleDefinition } from '../lib/puzzles/definitions';
import type { MovementFrame } from '../lib/game/engine';

const speedDurations: Record<'slow' | 'normal' | 'fast', number> = {
  slow: 800,
  normal: 480,
  fast: 240,
};

function getFrameDuration(speed: 'slow' | 'normal' | 'fast', event: MovementFrame['event']) {
  const baseDuration = speedDurations[speed];
  if (event === 'jump') return Math.round(baseDuration * 1.55);
  if (event === 'pickup') return Math.round(baseDuration * 1.2);
  return baseDuration;
}

type SceneCanvasProps = {
  puzzle: PuzzleDefinition;
  timeline: MovementFrame[];
  runState: 'idle' | 'running' | 'success' | 'failure';
  speed: 'slow' | 'normal' | 'fast';
  onSequenceComplete: () => void;
};

export default function SceneCanvas({ puzzle, timeline, runState, speed, onSequenceComplete }: SceneCanvasProps) {
  const completionRef = useRef(onSequenceComplete);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    completionRef.current = onSequenceComplete;
  }, [onSequenceComplete]);

  const metrics = useMemo(() => {
    const maxX = Math.max(puzzle.scene.startEntity.x, ...puzzle.scene.entities.map((entity) => entity.x));
    const maxY = Math.max(puzzle.scene.startEntity.y, ...puzzle.scene.entities.map((entity) => entity.y));
    const cols = Math.max(puzzle.scene.gridCols, maxX + 1);
    const rows = Math.max(puzzle.scene.gridRows, maxY + 1);
    const toPercent = (entity: { x: number; y: number }) => ({
      left: 8 + (entity.x / Math.max(cols - 1, 1)) * 84,
      top: 72 - (entity.y / Math.max(rows - 1, 1)) * 34,
    });
    return { cols, rows, toPercent };
  }, [puzzle]);

  const startPosition = useMemo(() => metrics.toPercent(puzzle.scene.startEntity), [metrics, puzzle.scene.startEntity]);
  const [heroPosition, setHeroPosition] = useState(startPosition);
  const [heroFacing, setHeroFacing] = useState(puzzle.scene.startEntity.facing ?? 'east');
  const [heroMotion, setHeroMotion] = useState<'idle' | 'jump' | 'pickup'>('idle');
  const [heroStepDuration, setHeroStepDuration] = useState(speedDurations[speed]);

  useEffect(() => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setHeroPosition(startPosition);
    setHeroFacing(puzzle.scene.startEntity.facing ?? 'east');
    setHeroMotion('idle');
    setHeroStepDuration(speedDurations[speed]);
  }, [startPosition, puzzle.scene.startEntity.facing, puzzle.id, runState]);

  useEffect(() => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (runState !== 'running') return;
    if (timeline.length <= 1) {
      timeoutRef.current = window.setTimeout(() => {
        timeoutRef.current = null;
        completionRef.current();
      }, 0);
      return () => {
        if (timeoutRef.current !== null) {
          window.clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      };
    }
    let cancelled = false;
    const frames = timeline.slice(1);

    async function animate() {
      for (const frame of frames) {
        if (cancelled) return;
        const frameDuration = getFrameDuration(speed, frame.event);
        setHeroFacing(frame.facing);
        setHeroPosition(metrics.toPercent(frame));
        setHeroMotion(frame.event === 'jump' ? 'jump' : frame.event === 'pickup' ? 'pickup' : 'idle');
        setHeroStepDuration(frameDuration);
        await new Promise<void>((resolve) => {
          timeoutRef.current = window.setTimeout(() => {
            timeoutRef.current = null;
            resolve();
          }, frameDuration);
        });
      }
      setHeroMotion('idle');
      setHeroStepDuration(speedDurations[speed]);
      if (!cancelled) {
        completionRef.current();
      }
    }

    animate();
    return () => {
      cancelled = true;
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [timeline, metrics, speed, runState]);

  const goalEntities = puzzle.scene.entities.filter((entity) => entity.role === 'goal' || entity.role === 'collectible');

  return (
    <div className="scene-canvas">
      <div className="scene-meta">
        <p>{puzzle.goal}</p>
        <span>{runState === 'running' ? 'Executing…' : 'Compose and press play'}</span>
      </div>
      <div className="scene-target-banner" aria-hidden>
        <img src="/assets/sprites/main_character.png" alt="" />
        <span>Control Lumi</span>
        <img src="/assets/sprites/food.png" alt="" />
        <span>Reach the food target</span>
        <img src="/assets/sprites/obstacle.png" alt="" />
        <span>Avoid or handle obstacles</span>
      </div>
      <div className="scene-stage-wrap">
        <div className="scene-stage scene-stage-dom" aria-label="Animated puzzle scene">
          <img className="scene-background-image" src={puzzle.background} alt="" />
          <div className="scene-floor-band" />

          {puzzle.scene.entities.map((entity) => {
            const pos = metrics.toPercent(entity);
            return (
              <div
                key={entity.id}
                className={`scene-entity scene-entity-${entity.role}`}
                style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
              >
                <img src={entity.sprite} alt="" />
                {entity.role === 'goal' && <div className="scene-entity-label">Goal</div>}
                {entity.role === 'collectible' && <div className="scene-entity-label">Treat</div>}
                {entity.role === 'obstacle' && <div className="scene-entity-label">Obstacle</div>}
              </div>
            );
          })}

          <div
            className={`scene-hero facing-${heroFacing} motion-${heroMotion}`}
            style={
              {
                left: `${heroPosition.left}%`,
                top: `${heroPosition.top}%`,
                '--scene-step-duration': `${heroStepDuration}ms`,
              } as React.CSSProperties
            }
          >
            <div className="scene-hero-glow" />
            <img src={puzzle.scene.startEntity.sprite} alt="Lumi" />
            <div className="scene-entity-label">Lumi</div>
          </div>

          {goalEntities.length > 0 && (
            <div className="scene-objective-callout">
              {puzzle.id === 'loop-lane'
                ? 'Collect the treats, then finish on the goal tile on the right.'
                : 'Goal is on the right side of the scene.'}
            </div>
          )}
        </div>
        <div className="scene-stage-hint">Puzzle scene: Lumi starts on the left. The target is highlighted on the right.</div>
      </div>
    </div>
  );
}
