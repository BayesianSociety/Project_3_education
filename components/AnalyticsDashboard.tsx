'use client';

import { useMemo, useState } from 'react';
import type { PuzzleDefinition } from '../lib/puzzles/definitions';
import type { MovementFrame } from '../lib/game/engine';
import { createReplayTimeline, getReplayFrame, type ReplayTimeline } from '../lib/game/replay';

export type AttemptRecord = {
  id: string;
  puzzleId: string;
  status: 'success' | 'failure';
  durationMs?: number;
  failureReason?: string;
};

export type EventRecord = {
  kind: string;
  detail?: Record<string, unknown>;
  puzzleId: string;
};

export type AnalyticsSnapshot = {
  attempts: AttemptRecord[];
  events: EventRecord[];
  movements: Record<string, MovementFrame[]>;
  aggregates: {
    totalAttempts: number;
    completionRate: number;
    avgDurationMs: number;
  };
};

type AnalyticsDashboardProps = {
  snapshot: AnalyticsSnapshot;
  selectedPuzzle: PuzzleDefinition;
};

function formatMs(value?: number) {
  if (!value) return '—';
  return `${Math.round(value)} ms`;
}

export default function AnalyticsDashboard({ snapshot, selectedPuzzle }: AnalyticsDashboardProps) {
  const [cursor, setCursor] = useState(0);
  const frames = snapshot.movements[selectedPuzzle.id] ?? [];
  const replay: ReplayTimeline | null = useMemo(() => {
    if (frames.length === 0) return null;
    return createReplayTimeline(frames);
  }, [frames]);

  const filteredAttempts = snapshot.attempts.filter((attempt) => attempt.puzzleId === selectedPuzzle.id);
  const filteredEvents = snapshot.events.filter((event) => event.puzzleId === selectedPuzzle.id);

  const currentFrame = replay ? getReplayFrame(replay, cursor) : null;

  return (
    <div className="analytics-dashboard">
      <div className="analytics-grid">
        <div className="metric-card">
          <p>Total Attempts</p>
          <strong>{snapshot.aggregates.totalAttempts}</strong>
        </div>
        <div className="metric-card">
          <p>Completion Rate</p>
          <strong>{Math.round(snapshot.aggregates.completionRate * 100)}%</strong>
        </div>
        <div className="metric-card">
          <p>Average Duration</p>
          <strong>{formatMs(snapshot.aggregates.avgDurationMs)}</strong>
        </div>
      </div>

      <div className="analytics-panels">
        <section>
          <header>
            <h4>Attempts for {selectedPuzzle.title}</h4>
            <span>{filteredAttempts.length} recorded</span>
          </header>
          <div className="table">
            <div className="table-head">
              <span>ID</span>
              <span>Status</span>
              <span>Duration</span>
              <span>Failure reason</span>
            </div>
            {filteredAttempts.length === 0 && <p className="table-empty">Run a puzzle to see attempts.</p>}
            {filteredAttempts.map((attempt) => (
              <div key={attempt.id} className={`table-row ${attempt.status}`}>
                <span>{attempt.id}</span>
                <span>{attempt.status}</span>
                <span>{formatMs(attempt.durationMs)}</span>
                <span>{attempt.failureReason ?? '—'}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <header>
            <h4>Event Stream</h4>
            <span>{filteredEvents.length} events</span>
          </header>
          <ul className="event-list">
            {filteredEvents.length === 0 && <li>No events yet.</li>}
            {filteredEvents.map((event, index) => (
              <li key={`${event.kind}-${index}`}>
                <strong>{event.kind}</strong>
                {event.detail && <span>{JSON.stringify(event.detail)}</span>}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="replay-panel">
        <header>
          <h4>Movement Replay</h4>
          <span>{replay ? `${replay.frames.length} steps` : 'No data yet'}</span>
        </header>
        {replay ? (
          <div>
            <input
              type="range"
              min={0}
              max={Math.max(0, replay.frames.length - 1)}
              value={cursor}
              onChange={(event) => setCursor(Number(event.target.value))}
            />
            {currentFrame && (
              <div className="replay-readout">
                <p>
                  Step {currentFrame.step} → Position ({currentFrame.x}, {currentFrame.y}) — Facing{' '}
                  {currentFrame.facing}
                </p>
                <p>{currentFrame.note ?? currentFrame.event}</p>
              </div>
            )}
            <div className="replay-path">
              {replay.frames.map((frame, index) => (
                <span
                  key={`${frame.step}-${frame.x}-${frame.y}-${index}`}
                  className={`replay-dot ${index <= cursor ? 'active' : ''}`}
                  style={{ left: `${replay.progress[index] * 100}%` }}
                />
              ))}
            </div>
          </div>
        ) : (
          <p className="table-empty">Complete a run to unlock telemetry playback.</p>
        )}
      </section>
    </div>
  );
}
