'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { puzzles, type PuzzleDefinition } from '../lib/puzzles/definitions';
import { executeProgram, type BlockNode, type EngineRunResult, type MovementFrame } from '../lib/game/engine';
import BlockWorkspace from '../components/BlockWorkspace';
import SceneCanvas from '../components/SceneCanvas';
import ControlsPanel from '../components/ControlsPanel';
import FailureModal from '../components/FailureModal';
import AnalyticsDashboard, { type AnalyticsSnapshot } from '../components/AnalyticsDashboard';

const initialProgram: BlockNode[] = [];

type ProgramBlueprint = {
  type: string;
  args?: Record<string, unknown>;
  children?: ProgramBlueprint[];
  elseBranch?: ProgramBlueprint[];
};

const blockLibrary: Record<string, Pick<BlockNode, 'label' | 'category'>> = {
  moveForward: { label: 'Move Forward', category: 'movement' },
  jump: { label: 'Jump', category: 'movement' },
  turnLeft: { label: 'Turn Left', category: 'movement' },
  turnRight: { label: 'Turn Right', category: 'movement' },
  pickUp: { label: 'Pick Up', category: 'actions' },
  placeItem: { label: 'Place Item', category: 'actions' },
  repeat: { label: 'Repeat', category: 'control' },
  repeatUntil: { label: 'Repeat Until', category: 'control' },
  while: { label: 'While', category: 'control' },
  if: { label: 'If', category: 'logic' },
  ifElse: { label: 'If / Else', category: 'logic' },
};

const revealPrograms: Record<string, ProgramBlueprint[]> = {
  'garden-stroll': [
    { type: 'moveForward' },
    { type: 'moveForward' },
    { type: 'jump' },
    { type: 'moveForward' },
    { type: 'moveForward' },
  ],
  'loop-lane': [
    {
      type: 'repeat',
      args: { count: 2 },
      children: [{ type: 'moveForward' }],
    },
    { type: 'pickUp' },
    { type: 'moveForward' },
    { type: 'jump' },
    { type: 'moveForward' },
    { type: 'pickUp' },
    {
      type: 'repeat',
      args: { count: 2 },
      children: [{ type: 'moveForward' }],
    },
  ],
  'conditional-crossing': [
    {
      type: 'repeat',
      args: { count: 2 },
      children: [{ type: 'moveForward' }],
    },
    {
      type: 'ifElse',
      args: { condition: 'isPuddleAhead' },
      children: [{ type: 'jump' }],
      elseBranch: [{ type: 'moveForward' }],
    },
    { type: 'moveForward' },
    { type: 'jump' },
    {
      type: 'repeat',
      args: { count: 2 },
      children: [{ type: 'moveForward' }],
    },
  ],
};

function createNodeId() {
  return crypto.randomUUID?.() ?? Math.random().toString(36).slice(2);
}

function buildProgramFromBlueprint(blueprints: ProgramBlueprint[]): BlockNode[] {
  return blueprints.map((blueprint) => {
    const meta = blockLibrary[blueprint.type];
    return {
      id: createNodeId(),
      type: blueprint.type,
      label: meta?.label ?? blueprint.type,
      category: meta?.category ?? 'root',
      args: blueprint.args,
      children: blueprint.children ? buildProgramFromBlueprint(blueprint.children) : undefined,
      elseBranch: blueprint.elseBranch ? buildProgramFromBlueprint(blueprint.elseBranch) : undefined,
    };
  });
}

const puzzleCoach: Record<
  string,
  {
    summary: string;
    recommendedBlocks: string[];
    stepPlan: string[];
    starterRecipe: string[];
  }
> = {
  'garden-stroll': {
    summary: 'Use simple forward moves, jump the middle obstacle once, then land on the snack tile.',
    recommendedBlocks: ['Move Forward', 'Jump'],
    stepPlan: [
      'Walk forward until Lumi is directly before the center obstacle.',
      'Use one Jump to clear the obstacle cleanly.',
      'Finish with forward moves until Lumi stands on the goal tile.',
    ],
    starterRecipe: ['Move Forward', 'Move Forward', 'Jump', 'Move Forward', 'Move Forward'],
  },
  'loop-lane': {
    summary: 'Cross the lane from left to right, collect both treats on the lane, jump the center obstacle, then stop on Goal.',
    recommendedBlocks: ['Repeat', 'Move Forward', 'Pick Up', 'Jump'],
    stepPlan: [
      'Reach the first Treat on the left lane and use Pick Up on that tile.',
      'Continue through the middle lane and Jump over the obstacle instead of colliding with it.',
      'Pick up the second Treat, then keep moving right until Lumi finishes on Goal.',
    ],
    starterRecipe: ['Repeat', 'Move Forward', 'Pick Up', 'Jump', 'Pick Up'],
  },
  'conditional-crossing': {
    summary: 'Use a sensor check before moving so Lumi reacts to the gate instead of guessing.',
    recommendedBlocks: ['If', 'Path Ahead', 'Move Forward'],
    stepPlan: [
      'Read the scene before stepping into the blocked space.',
      'Use a condition block that checks the path ahead.',
      'Only move when the path is safe, then continue to the goal.',
    ],
    starterRecipe: ['If', 'Move Forward'],
  },
};

const initialProgress = puzzles.reduce<Record<string, 'locked' | 'unlocked' | 'complete'>>((acc, puzzle) => {
  if (puzzle.sequence === 1) {
    acc[puzzle.id] = 'unlocked';
  } else {
    acc[puzzle.id] = 'locked';
  }
  return acc;
}, {});

function buildInitialAnalytics(): AnalyticsSnapshot {
  return {
    attempts: [],
    events: [],
    movements: {},
    aggregates: {
      totalAttempts: 0,
      completionRate: 0,
      avgDurationMs: 0,
    },
  };
}

export default function HomePage() {
  const workspaceRef = useRef<HTMLElement | null>(null);
  const runStartedAtRef = useRef<number | null>(null);
  const runStartedAtIsoRef = useRef<string | null>(null);
  const activeAttemptIdRef = useRef<string | null>(null);
  const sessionIdRef = useRef<string>('session-local');
  const userIdRef = useRef<string>('player-local');
  const [sceneVersion, setSceneVersion] = useState(0);
  const [selectedPuzzle, setSelectedPuzzle] = useState<PuzzleDefinition>(puzzles[0]);
  const [program, setProgram] = useState<BlockNode[]>(initialProgram);
  const [pendingResult, setPendingResult] = useState<EngineRunResult | null>(null);
  const [lastResult, setLastResult] = useState<EngineRunResult | null>(null);
  const [timeline, setTimeline] = useState<MovementFrame[]>([]);
  const [runState, setRunState] = useState<'idle' | 'running' | 'success' | 'failure'>('idle');
  const [speed, setSpeed] = useState<'slow' | 'normal' | 'fast'>('normal');
  const [workspaceCollapsed, setWorkspaceCollapsed] = useState(false);
  const [showFailureHint, setShowFailureHint] = useState(false);
  const [progressMap, setProgressMap] = useState(initialProgress);
  const [analytics, setAnalytics] = useState<AnalyticsSnapshot>(buildInitialAnalytics);

  const hintsByReason = useMemo(() => {
    return new Map(selectedPuzzle.hintRules.map((rule) => [rule.reason, rule.message]));
  }, [selectedPuzzle]);

  const activeHint = lastResult?.failureReason ? hintsByReason.get(lastResult.failureReason) : undefined;
  const guide = puzzleCoach[selectedPuzzle.id];
  const failureCount = useMemo(
    () =>
      analytics.attempts.filter(
        (attempt) => attempt.puzzleId === selectedPuzzle.id && attempt.status === 'failure'
      ).length,
    [analytics.attempts, selectedPuzzle.id]
  );
  const canRevealProgram = failureCount >= 5 && Boolean(revealPrograms[selectedPuzzle.id]);

  const focusWorkspace = useCallback(() => {
    workspaceRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const loadAnalytics = useCallback(async () => {
    try {
      const response = await fetch('/api/analytics/summary', { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`analytics summary failed: ${response.status}`);
      }
      const snapshot = (await response.json()) as AnalyticsSnapshot;
      setAnalytics(snapshot);
    } catch (error) {
      console.error('Failed to load analytics summary', error);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const sessionKey = 'block-coding-session-id';
    const userKey = 'block-coding-user-id';
    const sessionId = window.localStorage.getItem(sessionKey) ?? crypto.randomUUID();
    const userId = window.localStorage.getItem(userKey) ?? crypto.randomUUID();
    window.localStorage.setItem(sessionKey, sessionId);
    window.localStorage.setItem(userKey, userId);
    sessionIdRef.current = sessionId;
    userIdRef.current = userId;
  }, []);

  useEffect(() => {
    void loadAnalytics();
  }, [loadAnalytics]);

  const handleSelectPuzzle = useCallback(
    (puzzle: PuzzleDefinition) => {
      if (progressMap[puzzle.id] === 'locked') return;
      setSelectedPuzzle(puzzle);
      setProgram([]);
      setTimeline([]);
      setRunState('idle');
      setPendingResult(null);
      setLastResult(null);
      setShowFailureHint(false);
      setWorkspaceCollapsed(false);
      setSceneVersion((value) => value + 1);
      setTimeout(() => {
        workspaceRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 0);
    },
    [progressMap]
  );

  const handlePlay = useCallback(() => {
    if (runState === 'running') return;
    runStartedAtRef.current = performance.now();
    runStartedAtIsoRef.current = new Date().toISOString();
    activeAttemptIdRef.current = crypto.randomUUID();
    setSceneVersion((value) => value + 1);
    setTimeline([]);
    setPendingResult(null);
    setRunState('running');
    setShowFailureHint(false);
    setLastResult(null);
    setWorkspaceCollapsed(true);
    const result = executeProgram({
      program,
      puzzle: selectedPuzzle,
      speed,
    });
    setPendingResult(result);
    setTimeline(result.timeline);
  }, [program, selectedPuzzle, speed, runState]);

  const handleReset = useCallback(() => {
    runStartedAtRef.current = null;
    runStartedAtIsoRef.current = null;
    activeAttemptIdRef.current = null;
    setSceneVersion((value) => value + 1);
    setRunState('idle');
    setTimeline([]);
    setPendingResult(null);
    setLastResult(null);
    setShowFailureHint(false);
    setWorkspaceCollapsed(false);
  }, []);

  const handleRevealProgram = useCallback(() => {
    const blueprint = revealPrograms[selectedPuzzle.id];
    if (!blueprint) return;
    setProgram(buildProgramFromBlueprint(blueprint));
    setRunState('idle');
    setTimeline([]);
    setPendingResult(null);
    setLastResult(null);
    setShowFailureHint(false);
    setWorkspaceCollapsed(false);
    setSceneVersion((value) => value + 1);
    setTimeout(() => {
      workspaceRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  }, [selectedPuzzle.id]);

  const handleSequenceEnd = useCallback(() => {
    if (!pendingResult) return;
    const elapsedMs = runStartedAtRef.current === null
      ? pendingResult.durationMs
      : Math.max(1, Math.round(performance.now() - runStartedAtRef.current));
    const startedAtIso = runStartedAtIsoRef.current ?? new Date().toISOString();
    const completedAtIso = new Date().toISOString();
    const attemptId = activeAttemptIdRef.current ?? crypto.randomUUID();
    runStartedAtRef.current = null;
    runStartedAtIsoRef.current = null;
    activeAttemptIdRef.current = null;
    const finalResult: EngineRunResult = {
      ...pendingResult,
      durationMs: elapsedMs,
    };
    setRunState(finalResult.status);
    setLastResult(finalResult);
    setPendingResult(null);
    setWorkspaceCollapsed(false);
    if (finalResult.status === 'failure') {
      setShowFailureHint(true);
    } else {
      setProgressMap((prev) => {
        const next = { ...prev, [selectedPuzzle.id]: 'complete' };
        selectedPuzzle.progression.unlocks.forEach((unlockId) => {
          if (next[unlockId] === 'locked') {
            next[unlockId] = 'unlocked';
          }
        });
        return next;
      });
    }

    setAnalytics((prev) => {
      const attempts = [
        ...prev.attempts,
        {
          id: `attempt-${prev.attempts.length + 1}`,
          puzzleId: selectedPuzzle.id,
          status: finalResult.status,
          durationMs: finalResult.durationMs,
          failureReason: finalResult.failureReason,
        },
      ];
      const completionRate =
        attempts.length === 0
          ? 0
          : attempts.filter((attempt) => attempt.status === 'success').length / attempts.length;
      const avgDuration =
        attempts.reduce((acc, attempt) => acc + (attempt.durationMs ?? 0), 0) /
        Math.max(1, attempts.length);

      const movementMap = {
        ...prev.movements,
        [selectedPuzzle.id]: pendingResult.timeline,
        
      };
      const eventStream = [
        ...prev.events,
        ...finalResult.events.map((event) => ({
          ...event,
          puzzleId: selectedPuzzle.id,
        })),
      ];
      return {
        ...prev,
        attempts,
        movements: movementMap,
        events: eventStream,
        aggregates: {
          totalAttempts: attempts.length,
          completionRate,
          avgDurationMs: avgDuration,
        },
      };
    });

    const movementEvents = finalResult.timeline.slice(1).map((frame) => ({
      kind: `movement:${frame.event}`,
      attemptId,
      puzzleId: selectedPuzzle.id,
      payload: {
        note: frame.note ?? null,
      },
      occurredAt: completedAtIso,
      movement: {
        stepIndex: frame.step,
        x: frame.x,
        y: frame.y,
        facing: frame.facing,
        state: frame.event,
        occurredAt: completedAtIso,
      },
    }));

    void fetch('/api/events/batch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId: sessionIdRef.current,
        userId: userIdRef.current,
        puzzleId: selectedPuzzle.id,
        attempt: {
          id: attemptId,
          puzzleId: selectedPuzzle.id,
          status: finalResult.status,
          failureReason: finalResult.failureReason,
          durationMs: finalResult.durationMs,
          codeSnapshot: JSON.stringify(program),
          startedAt: startedAtIso,
          completedAt: completedAtIso,
        },
        events: [
          ...finalResult.events.map((event) => ({
            kind: event.kind,
            attemptId,
            puzzleId: selectedPuzzle.id,
            payload: event.detail,
            occurredAt: completedAtIso,
          })),
          ...movementEvents,
        ],
      }),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`persist telemetry failed: ${response.status}`);
        }
        await loadAnalytics();
      })
      .catch((error) => {
        console.error('Failed to persist telemetry', error);
      });
  }, [loadAnalytics, pendingResult, program, selectedPuzzle]);

  return (
    <div>
      <section className="hero">
        <div className="hero-copy">
          <p className="section-title">Block Coding Puzzles</p>
          <h1>Glow-coded adventures that teach sequencing, loops, and logic.</h1>
          <p>
            Drag clear visual blocks, guide Lumi to the target, and watch every move play out in the scene.
            The objective, target sprite, and required puzzle rules are shown before you start.
          </p>
          <div className="hero-cta">
            <button className="button-primary" onClick={() => handleSelectPuzzle(puzzles[0])}>
              Open Puzzle 1
            </button>
            <button className="button-secondary" onClick={focusWorkspace}>
              Jump To Workspace
            </button>
          </div>
        </div>
        <div className="hero-visual" aria-hidden />
      </section>

      <section>
        <p className="section-title">World Map</p>
        <div className="level-map">
          {puzzles.map((puzzle) => {
            const status = progressMap[puzzle.id];
            const isActive = selectedPuzzle.id === puzzle.id;
            return (
              <article
                key={puzzle.id}
                className={`level-tile ${status} ${isActive ? 'active' : ''}`}
                aria-live="polite"
              >
                <div>
                  <h3>{puzzle.title}</h3>
                  <p>{puzzle.story}</p>
                </div>
                <button
                  className="button-primary"
                  disabled={status === 'locked'}
                  onClick={() => handleSelectPuzzle(puzzle)}
                >
                  {status === 'locked' ? 'Locked' : 'Open Puzzle'}
                </button>
              </article>
            );
          })}
        </div>
      </section>

      <section className="puzzle-brief section-card" aria-label="Puzzle briefing">
        <div className="puzzle-brief-copy">
          <p className="section-title">Current Puzzle</p>
          <h2>{selectedPuzzle.title}</h2>
          <p className="puzzle-story">{selectedPuzzle.story}</p>
          <div className="goal-callout">
            <strong>Goal:</strong> {selectedPuzzle.goal}
          </div>
          <div className="brief-grid">
            <div className="brief-card">
              <h3>Do This In Order</h3>
              <p className="brief-summary">{guide?.summary}</p>
              <ol>
                {guide?.stepPlan.map((step) => <li key={step}>{step}</li>)}
              </ol>
            </div>
            <div className="brief-card">
              <h3>Use These Blocks</h3>
              <div className="recommended-blocks" aria-label="Recommended blocks">
                {guide?.recommendedBlocks.map((block) => (
                  <span key={block} className="recommended-block-chip">
                    {block}
                  </span>
                ))}
              </div>
              <p className="brief-summary">
                If a run fails, read the retry hint under the controls before changing the stack.
              </p>
            </div>
            <div className="brief-card">
              <h3>Scene Guide</h3>
              <ul className="asset-guide">
                <li>
                  <img src="/assets/sprites/main_character.png" alt="Main character sprite" />
                  <span><strong>Lumi</strong> is the character you control.</span>
                </li>
                <li>
                  <img src="/assets/sprites/food.png" alt="Food target sprite" />
                  <span><strong>Food</strong> is the target to reach or collect.</span>
                </li>
                <li>
                  <img src="/assets/sprites/obstacle.png" alt="Obstacle sprite" />
                  <span><strong>Obstacle</strong> blocks the path unless your code handles it.</span>
                </li>
                <li>
                  <img src="/assets/sprites/place.png" alt="Path tile sprite" />
                  <span><strong>Path tile</strong> marks the route Lumi can follow.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section ref={workspaceRef} className="scene-workspace-grid" aria-label="Puzzle workspace">
        <div className="scene-panel">
          <SceneCanvas
            key={`${selectedPuzzle.id}:${sceneVersion}`}
            puzzle={selectedPuzzle}
            timeline={timeline}
            runState={runState}
            speed={speed}
            onSequenceComplete={handleSequenceEnd}
          />
        </div>
        <div className="workspace-panel">
          <ControlsPanel
            status={runState}
            onPlay={handlePlay}
            onReset={handleReset}
            speed={speed}
            onSpeedChange={setSpeed}
            workspaceCollapsed={workspaceCollapsed}
            onToggleWorkspace={() => setWorkspaceCollapsed((prev) => !prev)}
            puzzle={selectedPuzzle}
            recommendedBlocks={guide?.recommendedBlocks ?? []}
            stepPlan={guide?.stepPlan ?? []}
            failureHint={activeHint}
            failedAttempts={failureCount}
            canRevealProgram={canRevealProgram}
            onRevealProgram={handleRevealProgram}
          />
          <BlockWorkspace
            puzzle={selectedPuzzle}
            program={program}
            onProgramChange={setProgram}
            isRunning={runState === 'running'}
            collapsed={workspaceCollapsed}
            starterRecipe={guide?.starterRecipe ?? []}
          />
        </div>
      </section>

      <section className="analytics-section">
        <p className="section-title">Analytics & Replay</p>
        <AnalyticsDashboard snapshot={analytics} selectedPuzzle={selectedPuzzle} />
      </section>

      <FailureModal
        open={showFailureHint}
        onClose={() => setShowFailureHint(false)}
        reason={lastResult?.failureReason}
        hint={activeHint}
      />
    </div>
  );
}
