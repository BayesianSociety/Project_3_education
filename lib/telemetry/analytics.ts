import { getDb } from '@/lib/db/sqlite';

export type AnalyticsSummary = {
  totalUsers: number;
  totalSessions: number;
  totalAttempts: number;
  successRate: number;
  averageCommands: number;
  eventsByType: { type: string; count: number }[];
  puzzleLeaderboard: { id: string; title: string; attempts: number; clears: number }[];
};

export type PuzzleAnalytics = {
  puzzleId: string;
  title: string;
  attempts: number;
  clears: number;
  averageDurationMs: number;
  failureReasons: { reason: string; count: number }[];
  recentAttempts: {
    attemptId: string;
    status: string;
    failureReason: string | null;
    endedAt: string | null;
  }[];
};

export type ReplayPayload = {
  attempt: {
    id: string;
    puzzleId: string;
    sessionId: string;
    status: string;
    failureReason: string | null;
    codeSnapshot: string | null;
  };
  events: { type: string; detail: unknown; createdAt: string }[];
  movements: { stepIndex: number; x: number; y: number; action: string; timestamp: string }[];
};

export function getAnalyticsSummary(): AnalyticsSummary {
  const db = getDb();
  const totals = db.prepare(
    `SELECT 
        (SELECT COUNT(*) FROM users) AS users,
        (SELECT COUNT(*) FROM sessions) AS sessions,
        (SELECT COUNT(*) FROM attempts) AS attempts,
        (SELECT COALESCE(AVG(CAST(json_extract(metadata, '$.commands') AS REAL)), 0) FROM attempts WHERE metadata IS NOT NULL) AS avgCommands,
        (SELECT SUM(CASE WHEN status = 'success' THEN 1 ELSE 0 END) FROM attempts) AS clears
    `
  ).get();

  const eventsByType = db.prepare(`
    SELECT type, COUNT(*) as count FROM events GROUP BY type ORDER BY count DESC LIMIT 12
  `).all();

  const leaderboard = db.prepare(`
    SELECT p.id, p.title, COUNT(a.id) as attempts, SUM(CASE WHEN a.status = 'success' THEN 1 ELSE 0 END) as clears
    FROM puzzles p
    LEFT JOIN attempts a ON a.puzzle_id = p.id
    GROUP BY p.id, p.title
    ORDER BY p.order_index ASC
  `).all();

  const successRate = totals.attempts ? (totals.clears / totals.attempts) : 0;

  return {
    totalUsers: totals.users ?? 0,
    totalSessions: totals.sessions ?? 0,
    totalAttempts: totals.attempts ?? 0,
    successRate,
    averageCommands: totals.avgCommands ?? 0,
    eventsByType,
    puzzleLeaderboard: leaderboard,
  };
}

export function getPuzzleAnalytics(puzzleId: string): PuzzleAnalytics {
  const db = getDb();
  const info = db.prepare(`SELECT title FROM puzzles WHERE id = ?`).get(puzzleId);
  if (!info) {
    throw new Error('Puzzle not found');
  }

  const attemptStats = db.prepare(`
    SELECT COUNT(*) as attempts, SUM(CASE WHEN status = 'success' THEN 1 ELSE 0 END) as clears,
           AVG(CAST(json_extract(metadata, '$.durationMs') AS REAL)) as avgDuration
    FROM attempts
    WHERE puzzle_id = ?
  `).get(puzzleId);

  const failureReasons = db.prepare(`
    SELECT COALESCE(failure_reason, 'unknown') as reason, COUNT(*) as count
    FROM attempts
    WHERE puzzle_id = ? AND status = 'failure'
    GROUP BY reason
    ORDER BY count DESC
  `).all(puzzleId);

  const recentAttempts = db.prepare(`
    SELECT id as attemptId, status, failure_reason as failureReason, ended_at as endedAt
    FROM attempts
    WHERE puzzle_id = ?
    ORDER BY (ended_at IS NULL), ended_at DESC, started_at DESC
    LIMIT 20
  `).all(puzzleId);

  return {
    puzzleId,
    title: info.title,
    attempts: attemptStats.attempts ?? 0,
    clears: attemptStats.clears ?? 0,
    averageDurationMs: attemptStats.avgDuration ?? 0,
    failureReasons,
    recentAttempts,
  };
}

export function getReplayPayload(attemptId: string): ReplayPayload {
  const db = getDb();
  const attempt = db
    .prepare('SELECT id, puzzle_id as puzzleId, session_id as sessionId, status, failure_reason as failureReason, code_snapshot as codeSnapshot FROM attempts WHERE id = ?')
    .get(attemptId);
  if (!attempt) {
    throw new Error('Attempt not found');
  }

  const events = db
    .prepare('SELECT type, detail, created_at as createdAt FROM events WHERE attempt_id = ? ORDER BY created_at ASC')
    .all(attemptId)
    .map((event) => ({
      type: event.type,
      detail: event.detail ? JSON.parse(event.detail) : null,
      createdAt: event.createdAt,
    }));

  const movements = db
    .prepare(
      'SELECT step_index as stepIndex, x, y, action, timestamp FROM movements WHERE attempt_id = ? ORDER BY step_index ASC'
    )
    .all(attemptId);

  return {
    attempt,
    events,
    movements,
  };
}
