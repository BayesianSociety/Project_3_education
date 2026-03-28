import Database from 'better-sqlite3';
import { randomUUID } from 'crypto';
import { getDb } from '@/lib/db/sqlite';
import type {
  AttemptPayload,
  EventBatchBody,
  EventPayload,
  MovementPayload,
  SessionEndBody,
  SessionStartBody,
} from '@/types/telemetry';

function ensureUser(userId: string | undefined, playerName?: string) {
  const db = getDb();
  const resolvedId = userId ?? randomUUID();
  const existing = db.prepare('SELECT id FROM users WHERE id = ?').get(resolvedId);
  if (!existing) {
    db.prepare('INSERT INTO users (id, display_name) VALUES (?, ?)').run(resolvedId, playerName ?? 'Player');
  } else if (playerName) {
    db.prepare('UPDATE users SET display_name = ? WHERE id = ?').run(playerName, resolvedId);
  }
  return resolvedId;
}

export function startSession(body: SessionStartBody) {
  const db = getDb();
  const now = body.startedAt ?? new Date().toISOString();
  const userId = ensureUser(body.userId, body.playerName);
  const sessionId = randomUUID();
  db.prepare(
    `INSERT INTO sessions (id, user_id, client_version, platform, started_at, metadata)
     VALUES (@id, @userId, @clientVersion, @platform, @startedAt, @metadata)`
  ).run({
    id: sessionId,
    userId,
    clientVersion: body.clientVersion ?? 'frontend',
    platform: body.platform ?? 'browser',
    startedAt: now,
    metadata: body.metadata ? JSON.stringify(body.metadata) : null,
  });
  return { sessionId, userId, startedAt: now };
}

export function endSession(body: SessionEndBody) {
  const db = getDb();
  const endedAt = body.endedAt ?? new Date().toISOString();
  const result = db
    .prepare('UPDATE sessions SET ended_at = ?, status = ? WHERE id = ?')
    .run(endedAt, body.status ?? 'completed', body.sessionId);
  if (result.changes === 0) {
    throw new Error('Session not found');
  }
  return { sessionId: body.sessionId, endedAt };
}

function upsertAttempt(db: Database.Database, payload: AttemptPayload, sessionId: string) {
  const attemptId = payload.attemptId ?? randomUUID();
  db.prepare(
    `INSERT INTO attempts (id, session_id, puzzle_id, started_at, ended_at, status, failure_reason, code_snapshot, metadata)
     VALUES (@id, @sessionId, @puzzleId, @startedAt, @endedAt, @status, @failureReason, @codeSnapshot, @metadata)
     ON CONFLICT(id) DO UPDATE SET
       ended_at = excluded.ended_at,
       status = excluded.status,
       failure_reason = excluded.failure_reason,
       code_snapshot = COALESCE(excluded.code_snapshot, attempts.code_snapshot),
       metadata = excluded.metadata`
  ).run({
    id: attemptId,
    sessionId,
    puzzleId: payload.puzzleId,
    startedAt: payload.startedAt,
    endedAt: payload.endedAt ?? null,
    status: payload.status,
    failureReason: payload.failureReason ?? null,
    codeSnapshot: payload.codeSnapshot ?? null,
    metadata: payload.metrics ? JSON.stringify(payload.metrics) : null,
  });
  return attemptId;
}

function insertEvents(
  db: Database.Database,
  attemptId: string,
  sessionId: string,
  puzzleId: string,
  events: EventPayload[]
) {
  if (!events.length) return 0;
  const stmt = db.prepare(
    `INSERT INTO events (attempt_id, session_id, puzzle_id, type, detail, created_at)
     VALUES (@attemptId, @sessionId, @puzzleId, @type, @detail, @createdAt)`
  );
  const now = new Date().toISOString();
  const txn = db.transaction(() => {
    for (const event of events) {
      const mergedDetail = event.blockId
        ? { ...(event.detail ?? {}), blockId: event.blockId }
        : event.detail ?? null;
      stmt.run({
        attemptId,
        sessionId,
        puzzleId,
        type: event.type,
        detail: mergedDetail ? JSON.stringify(mergedDetail) : null,
        createdAt: event.timestamp ?? now,
      });
    }
  });
  txn();
  return events.length;
}

function insertMovements(db: Database.Database, attemptId: string, movements: MovementPayload[] = []) {
  if (!movements.length) return 0;
  const stmt = db.prepare(
    `INSERT INTO movements (attempt_id, step_index, x, y, action, timestamp)
     VALUES (?, ?, ?, ?, ?, ?)`
  );
  const txn = db.transaction(() => {
    for (const movement of movements) {
      stmt.run(
        attemptId,
        movement.stepIndex,
        movement.x,
        movement.y,
        movement.action,
        movement.timestamp ?? new Date().toISOString()
      );
    }
  });
  txn();
  return movements.length;
}

export function recordEventBatch(body: EventBatchBody) {
  const db = getDb();
  const session = db.prepare('SELECT id, user_id FROM sessions WHERE id = ?').get(body.sessionId);
  if (!session) {
    throw new Error('Session not found');
  }
  const result = db.transaction(() => {
    const attemptId = upsertAttempt(db, body.attempt, body.sessionId);
    const eventCount = insertEvents(db, attemptId, body.sessionId, body.attempt.puzzleId, body.events);
    const movementCount = insertMovements(db, attemptId, body.movements ?? []);

    const status = body.attempt.status === 'success' ? 'completed' : 'attempted';
    db.prepare(
      `INSERT INTO puzzle_progress (user_id, puzzle_id, status, updated_at)
       VALUES (?, ?, ?, datetime('now'))
       ON CONFLICT(user_id, puzzle_id) DO UPDATE SET status = excluded.status, updated_at = excluded.updated_at`
    ).run(session.user_id, body.attempt.puzzleId, status);

    return { attemptId, eventCount, movementCount };
  })();

  return {
    attemptId: result.attemptId,
    sessionId: body.sessionId,
    eventsStored: result.eventCount,
    movementsStored: result.movementCount,
  };
}
