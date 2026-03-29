import { randomUUID } from 'node:crypto';

import { NextResponse } from 'next/server';
import { z } from 'zod';

import { getDb } from '../../../../lib/db/connection';

type MovementInput = {
  stepIndex: number;
  x: number;
  y: number;
  facing?: string;
  state?: string;
  occurredAt?: string;
};

type EventInput = {
  id?: string;
  kind: string;
  attemptId?: string;
  puzzleId?: string;
  payload?: Record<string, unknown>;
  occurredAt?: string;
  movement?: MovementInput;
};

type AttemptInput = {
  id: string;
  puzzleId: string;
  status: 'running' | 'success' | 'failure';
  failureReason?: string;
  durationMs?: number;
  codeSnapshot?: string;
  startedAt?: string;
  completedAt?: string;
};

type RequestBody = {
  sessionId: string;
  userId?: string;
  puzzleId?: string;
  attempt?: AttemptInput;
  events: EventInput[];
};

const movementSchema = z.object({
  stepIndex: z.number().int().nonnegative(),
  x: z.number().int(),
  y: z.number().int(),
  facing: z.string().min(1).max(24).optional(),
  state: z.string().min(1).max(32).optional(),
  occurredAt: z.string().datetime().optional(),
});

const eventSchema = z.object({
  id: z.string().uuid().optional(),
  kind: z.string().min(1),
  attemptId: z.string().min(1).optional(),
  puzzleId: z.string().min(1).optional(),
  payload: z.record(z.any()).optional(),
  occurredAt: z.string().datetime().optional(),
  movement: movementSchema.optional(),
});

const attemptSchema = z.object({
  id: z.string().min(1),
  puzzleId: z.string().min(1),
  status: z.enum(['running', 'success', 'failure']),
  failureReason: z.string().optional(),
  durationMs: z.number().int().nonnegative().optional(),
  codeSnapshot: z.string().optional(),
  startedAt: z.string().datetime().optional(),
  completedAt: z.string().datetime().optional(),
});

const bodySchema = z.object({
  sessionId: z.string().min(1),
  userId: z.string().optional(),
  puzzleId: z.string().optional(),
  attempt: attemptSchema.optional(),
  events: z.array(eventSchema).min(1),
});

type SqliteDatabase = ReturnType<typeof getDb>;

function ensureUser(db: SqliteDatabase, userId?: string) {
  if (!userId) return;
  db.prepare(`INSERT INTO users (id) VALUES (?) ON CONFLICT(id) DO NOTHING`).run(userId);
}

function ensureSession(db: SqliteDatabase, sessionId: string, userId?: string) {
  db.prepare(
    `INSERT INTO sessions (id, user_id, created_at)
     VALUES (?, ?, datetime('now'))
     ON CONFLICT(id) DO NOTHING`
  ).run(sessionId, userId ?? null);
}

function upsertAttempt(db: SqliteDatabase, sessionId: string, attempt?: AttemptInput) {
  if (!attempt) return;
  db.prepare(
    `INSERT INTO attempts (id, session_id, puzzle_id, status, failure_reason, duration_ms, code_snapshot, started_at, completed_at)
     VALUES (@id, @sessionId, @puzzleId, @status, @failureReason, @durationMs, @codeSnapshot, @startedAt, @completedAt)
     ON CONFLICT(id) DO UPDATE SET
       status = excluded.status,
       failure_reason = excluded.failure_reason,
       duration_ms = excluded.duration_ms,
       code_snapshot = excluded.code_snapshot,
       completed_at = excluded.completed_at`
  ).run({
    id: attempt.id,
    sessionId,
    puzzleId: attempt.puzzleId,
    status: attempt.status,
    failureReason: attempt.failureReason ?? null,
    durationMs: attempt.durationMs ?? null,
    codeSnapshot: attempt.codeSnapshot ?? null,
    startedAt: attempt.startedAt ?? null,
    completedAt: attempt.completedAt ?? null,
  });
}

function updateProgress(
  db: SqliteDatabase,
  puzzleId: string | undefined,
  attempt: AttemptInput | undefined,
  userId: string | undefined
) {
  if (!attempt || !userId || !puzzleId) return;
  const status = attempt.status === 'success' ? 'complete' : 'unlocked';
  db.prepare(
    `INSERT INTO puzzle_progress (user_id, puzzle_id, status, last_attempt_id)
     VALUES (?, ?, ?, ?)
     ON CONFLICT(user_id, puzzle_id) DO UPDATE SET
       status = CASE
         WHEN puzzle_progress.status = 'complete' THEN puzzle_progress.status
         WHEN excluded.status = 'complete' THEN 'complete'
         ELSE excluded.status
       END,
       last_attempt_id = excluded.last_attempt_id,
       updated_at = datetime('now')`
  ).run(userId, puzzleId, status, attempt.id);
}

export async function POST(request: Request) {
  let parsed: RequestBody;
  try {
    const json = await request.json();
    parsed = bodySchema.parse(json);
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid payload', details: error instanceof Error ? error.message : error },
      { status: 400 }
    );
  }

  const db = getDb();
  ensureUser(db, parsed.userId);
  ensureSession(db, parsed.sessionId, parsed.userId);
  upsertAttempt(db, parsed.sessionId, parsed.attempt);

  const defaultPuzzleId = parsed.attempt?.puzzleId ?? parsed.puzzleId;

  const insertEvent = db.prepare(
    `INSERT INTO events (id, session_id, attempt_id, puzzle_id, kind, payload, occurred_at)
     VALUES (@id, @sessionId, @attemptId, @puzzleId, @kind, @payload, @occurredAt)`
  );
  const insertMovement = db.prepare(
    `INSERT INTO movements (attempt_id, step_index, x, y, facing, state, occurred_at)
     VALUES (@attemptId, @stepIndex, @x, @y, @facing, @state, @occurredAt)`
  );

  const stats = { events: 0, movements: 0 };

  const tx = db.transaction((events: EventInput[]) => {
    for (const event of events) {
      const attemptId = event.attemptId ?? parsed.attempt?.id ?? null;
      const puzzleId = event.puzzleId ?? defaultPuzzleId ?? null;
      const occurredAt = event.occurredAt ?? new Date().toISOString();
      insertEvent.run({
        id: event.id ?? randomUUID(),
        sessionId: parsed.sessionId,
        attemptId,
        puzzleId,
        kind: event.kind,
        payload: event.payload ? JSON.stringify(event.payload) : null,
        occurredAt,
      });
      stats.events += 1;

      if (event.movement && attemptId) {
        insertMovement.run({
          attemptId,
          stepIndex: event.movement.stepIndex,
          x: event.movement.x,
          y: event.movement.y,
          facing: event.movement.facing ?? null,
          state: event.movement.state ?? event.kind,
          occurredAt: event.movement.occurredAt ?? occurredAt,
        });
        stats.movements += 1;
      }
    }
  });

  try {
    tx(parsed.events);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to persist events', details: error instanceof Error ? error.message : error },
      { status: 500 }
    );
  }

  updateProgress(db, defaultPuzzleId, parsed.attempt, parsed.userId);

  return NextResponse.json({
    ok: true,
    insertedEvents: stats.events,
    insertedMovements: stats.movements,
    attemptStatus: parsed.attempt?.status ?? null,
  });
}
