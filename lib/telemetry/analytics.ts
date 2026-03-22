import type Database from 'better-sqlite3';

export type TotalsSummary = {
  sessions: number;
  activeSessions: number;
  attempts: number;
  successRate: number;
  events: number;
  movementSteps: number;
};

export type PuzzleSummary = {
  puzzleId: string;
  title: string | null;
  concept: string | null;
  attempts: number;
  successRate: number;
  avgHints: number | null;
  avgDurationMs: number | null;
  lastCompletedAt: string | null;
};

export type AttemptSnapshot = {
  id: string;
  sessionId: string;
  puzzleId: string;
  outcome: string;
  failureReason: string | null;
  startedAt: string;
  completedAt: string | null;
  durationMs: number | null;
};

export type AnalyticsSummary = {
  totals: TotalsSummary;
  puzzles: PuzzleSummary[];
  recentAttempts: AttemptSnapshot[];
};

const asNumber = (value: unknown, fallback = 0) => {
  const parsed = typeof value === 'number' ? value : Number(value ?? fallback);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const computeTotals = (db: Database): TotalsSummary => {
  const sessionRow = db.prepare(
    `SELECT COUNT(*) AS total, SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) AS active FROM sessions`,
  ).get() as { total?: number; active?: number } | undefined;

  const attemptRow = db.prepare(
    `SELECT COUNT(*) AS total, SUM(CASE WHEN outcome = 'success' THEN 1 ELSE 0 END) AS success FROM attempts`,
  ).get() as { total?: number; success?: number } | undefined;

  const eventsRow = db.prepare(`SELECT COUNT(*) AS total FROM events`).get() as { total?: number } | undefined;
  const movementRow = db.prepare(`SELECT COUNT(*) AS total FROM movements`).get() as { total?: number } | undefined;

  const attemptCount = asNumber(attemptRow?.total);
  const successRate = attemptCount === 0 ? 0 : asNumber(attemptRow?.success) / attemptCount;

  return {
    sessions: asNumber(sessionRow?.total),
    activeSessions: asNumber(sessionRow?.active),
    attempts: attemptCount,
    successRate,
    events: asNumber(eventsRow?.total),
    movementSteps: asNumber(movementRow?.total),
  };
};

const computePuzzleSummaries = (db: Database): PuzzleSummary[] => {
  const rows = db
    .prepare(`
      SELECT
        p.id AS puzzleId,
        p.title AS title,
        p.concept AS concept,
        COUNT(a.id) AS attempts,
        SUM(CASE WHEN a.outcome = 'success' THEN 1 ELSE 0 END) AS successCount,
        AVG(a.hint_count) AS avgHints,
        AVG(
          CASE
            WHEN a.completed_at IS NOT NULL THEN
              (julianday(a.completed_at) - julianday(a.started_at)) * 86400000
            ELSE NULL
          END
        ) AS avgDurationMs,
        MAX(a.completed_at) AS lastCompletedAt
      FROM puzzles p
      LEFT JOIN attempts a ON a.puzzle_id = p.id
      GROUP BY p.id
      ORDER BY p.sort_order ASC;
    `)
    .all() as Array<{
    puzzleId: string;
    title: string | null;
    concept: string | null;
    attempts: number | null;
    successCount: number | null;
    avgHints: number | null;
    avgDurationMs: number | null;
    lastCompletedAt: string | null;
  }>;

  return rows.map((row) => {
    const attemptCount = asNumber(row.attempts);
    const successRate = attemptCount === 0 ? 0 : asNumber(row.successCount) / attemptCount;
    return {
      puzzleId: row.puzzleId,
      title: row.title,
      concept: row.concept,
      attempts: attemptCount,
      successRate,
      avgHints: row.avgHints,
      avgDurationMs: row.avgDurationMs,
      lastCompletedAt: row.lastCompletedAt,
    };
  });
};

const computeRecentAttempts = (db: Database, limit = 25): AttemptSnapshot[] => {
  const rows = db
    .prepare(
      `
      SELECT
        a.id AS id,
        a.session_id AS sessionId,
        a.puzzle_id AS puzzleId,
        a.outcome AS outcome,
        a.failure_reason AS failureReason,
        a.started_at AS startedAt,
        a.completed_at AS completedAt,
        CASE
          WHEN a.completed_at IS NOT NULL THEN
            (julianday(a.completed_at) - julianday(a.started_at)) * 86400000
          ELSE NULL
        END AS durationMs
      FROM attempts a
      ORDER BY a.started_at DESC
      LIMIT ?;
    `,
    )
    .all(limit) as Array<AttemptSnapshot>;

  return rows.map((row) => ({
    ...row,
    durationMs: row.durationMs === null ? null : Math.round(row.durationMs),
  }));
};

export function buildAnalyticsSummary(db: Database): AnalyticsSummary {
  return {
    totals: computeTotals(db),
    puzzles: computePuzzleSummaries(db),
    recentAttempts: computeRecentAttempts(db),
  };
}
