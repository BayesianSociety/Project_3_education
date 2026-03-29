import type { MovementFrame } from '../game/engine';
import type { AnalyticsSnapshot } from '../../components/AnalyticsDashboard';
import type { SqliteDatabase } from './connection';

type AttemptRow = {
  id: string;
  puzzle_id: string;
  status: 'success' | 'failure';
  duration_ms: number | null;
  failure_reason: string | null;
};

type EventRow = {
  kind: string;
  payload: string | null;
  puzzle_id: string | null;
};

type MovementRow = {
  puzzle_id: string;
  step_index: number;
  x: number;
  y: number;
  facing: MovementFrame['facing'] | null;
  state: MovementFrame['event'] | null;
};

export function readAnalyticsSnapshot(db: SqliteDatabase): AnalyticsSnapshot {
  const attemptsRows = db
    .prepare(
      `SELECT id, puzzle_id, status, duration_ms, failure_reason
       FROM attempts
       ORDER BY completed_at DESC, rowid DESC`
    )
    .all() as AttemptRow[];

  const eventRows = db
    .prepare(
      `SELECT kind, payload, puzzle_id
       FROM events
       ORDER BY occurred_at DESC, rowid DESC`
    )
    .all() as EventRow[];

  const movementRows = db
    .prepare(
      `SELECT attempts.puzzle_id, movements.step_index, movements.x, movements.y, movements.facing, movements.state
       FROM movements
       JOIN attempts ON attempts.id = movements.attempt_id
       ORDER BY movements.attempt_id ASC, movements.step_index ASC, movements.id ASC`
    )
    .all() as MovementRow[];

  const attempts = attemptsRows.map((row) => ({
    id: row.id,
    puzzleId: row.puzzle_id,
    status: row.status,
    durationMs: row.duration_ms ?? undefined,
    failureReason: row.failure_reason ?? undefined,
  }));

  const events = eventRows
    .filter((row) => row.puzzle_id)
    .map((row) => ({
      kind: row.kind,
      puzzleId: row.puzzle_id!,
      detail: row.payload ? safeParseJson(row.payload) : undefined,
    }));

  const movements = movementRows.reduce<Record<string, MovementFrame[]>>((acc, row) => {
    const frame: MovementFrame = {
      x: row.x,
      y: row.y,
      facing: row.facing ?? 'east',
      step: row.step_index,
      event: row.state ?? 'idle',
    };
    if (!acc[row.puzzle_id]) {
      acc[row.puzzle_id] = [];
    }
    acc[row.puzzle_id].push(frame);
    return acc;
  }, {});

  const totalAttempts = attempts.length;
  const completionRate =
    totalAttempts === 0 ? 0 : attempts.filter((attempt) => attempt.status === 'success').length / totalAttempts;
  const avgDurationMs =
    totalAttempts === 0
      ? 0
      : attempts.reduce((sum, attempt) => sum + (attempt.durationMs ?? 0), 0) / totalAttempts;

  return {
    attempts,
    events,
    movements,
    aggregates: {
      totalAttempts,
      completionRate,
      avgDurationMs,
    },
  };
}

function safeParseJson(payload: string): Record<string, unknown> | undefined {
  try {
    return JSON.parse(payload) as Record<string, unknown>;
  } catch {
    return undefined;
  }
}
