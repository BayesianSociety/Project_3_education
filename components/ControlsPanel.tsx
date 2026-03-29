'use client';

import type { PuzzleDefinition } from '../lib/puzzles/definitions';

type ControlsPanelProps = {
  status: 'idle' | 'running' | 'success' | 'failure';
  onPlay: () => void;
  onReset: () => void;
  speed: 'slow' | 'normal' | 'fast';
  onSpeedChange: (speed: 'slow' | 'normal' | 'fast') => void;
  workspaceCollapsed: boolean;
  onToggleWorkspace: () => void;
  puzzle?: PuzzleDefinition;
  recommendedBlocks: string[];
  stepPlan: string[];
  failureHint?: string;
  failedAttempts: number;
  canRevealProgram: boolean;
  onRevealProgram: () => void;
};

const speedOptions: Array<{ label: string; value: 'slow' | 'normal' | 'fast'; description: string }> = [
  { label: 'Slow', value: 'slow', description: 'Step-by-step' },
  { label: 'Normal', value: 'normal', description: 'Story pace' },
  { label: 'Fast', value: 'fast', description: 'Speed run' },
];

function speakGoal(text?: string) {
  if (!text || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.pitch = 1.05;
  utterance.rate = 1;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

const statusCopy: Record<ControlsPanelProps['status'], { title: string; tone: string }> = {
  idle: { title: 'Ready to run', tone: 'Neutral' },
  running: { title: 'Running program…', tone: 'Animated' },
  success: { title: 'Success! Lumi reached the goal.', tone: 'Celebratory' },
  failure: { title: 'Oops! Run failed.', tone: 'Retry' },
};

export default function ControlsPanel({
  status,
  onPlay,
  onReset,
  speed,
  onSpeedChange,
  workspaceCollapsed,
  onToggleWorkspace,
  puzzle,
  recommendedBlocks,
  stepPlan,
  failureHint,
  failedAttempts,
  canRevealProgram,
  onRevealProgram,
}: ControlsPanelProps) {
  const state = statusCopy[status];
  return (
    <div className="controls-panel" aria-live="polite">
      <div className="controls-status">
        <div>
          <p className="status-label">{state.tone}</p>
          <h3>{state.title}</h3>
        </div>
        <button type="button" className="ghost-button" onClick={onToggleWorkspace}>
          {workspaceCollapsed ? 'Expand Workspace' : 'Minimize Workspace'}
        </button>
      </div>

      <div className="controls-actions">
        <button
          type="button"
          className="button-primary controls-play"
          onClick={onPlay}
          disabled={status === 'running'}
        >
          ▶ Play
        </button>
        <button type="button" className="button-secondary" onClick={onReset}>
          ⟲ Reset
        </button>
        <button
          type="button"
          className="button-secondary"
          onClick={() => speakGoal(puzzle?.goal)}
        >
          🔊 Goal Voice
        </button>
      </div>

      <div className="puzzle-coach">
        <div className="puzzle-coach-section">
          <p className="puzzle-coach-label">Recommended Blocks</p>
          <div className="puzzle-coach-chips">
            {recommendedBlocks.map((block) => (
              <span key={block} className="puzzle-coach-chip">
                {block}
              </span>
            ))}
          </div>
        </div>
        <div className="puzzle-coach-section">
          <p className="puzzle-coach-label">Plan</p>
          <ol className="puzzle-coach-steps">
            {stepPlan.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      </div>

      {status === 'failure' && (
        <div className="run-hint-banner" role="alert">
          <strong>What to fix:</strong> {failureHint ?? 'Adjust the block order, then run again.'}
        </div>
      )}

      {canRevealProgram && (
        <button type="button" className="button-secondary reveal-program-button" onClick={onRevealProgram}>
          Reveal Working Program
        </button>
      )}

      {!canRevealProgram && failedAttempts > 0 && (
        <p className="reveal-progress">
          Reveal unlocks after 5 failed attempts. Current failed attempts: {failedAttempts}/5.
        </p>
      )}

      <fieldset className="speed-toggle">
        <legend>Speed</legend>
        <div className="speed-options">
          {speedOptions.map((option) => (
            <label key={option.value}>
              <input
                type="radio"
                name="speed"
                value={option.value}
                checked={speed === option.value}
                onChange={() => onSpeedChange(option.value)}
              />
              <span>
                {option.label}
                <small>{option.description}</small>
              </span>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
