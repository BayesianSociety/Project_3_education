import type Database from 'better-sqlite3';

type EventPayload = Record<string, unknown> | null | undefined;

export type EventInput = {
  id: string;
  attemptId: string;
  sessionId: string;
  puzzleId: string;
  eventType: string;
  payload?: EventPayload;
  occurredAt?: string;
};

export type MovementInput = {
  id: string;
  attemptId: string;
  stepIndex: number;
  x: number;
  y: number;
  facing?: string | null;
  action?: string | null;
  occurredAt?: string;
};

export type TelemetryBatch = {
  events: EventInput[];
  movements: MovementInput[];
};

const coerceIsoTimestamp = (value?: string) => value ?? new Date().toISOString();

const stringifyPayload = (payload: EventPayload) =>
  payload === undefined ? null : JSON.stringify(payload ?? null);

export function persistTelemetryBatch(db: Database, batch: TelemetryBatch) {
  const insertEvent = db.prepare(`
    INSERT OR REPLACE INTO events (
      id, attempt_id, session_id, puzzle_id, event_type, payload, occurred_at
    ) VALUES (@id, @attemptId, @sessionId, @puzzleId, @eventType, @payload, @occurredAt)
  `);

  const insertMovement = db.prepare(`
    INSERT OR REPLACE INTO movements (
      id, attempt_id, step_index, x, y, facing, action, occurred_at
    ) VALUES (@id, @attemptId, @stepIndex, @x, @y, @facing, @action, @occurredAt)
  `);

  const run = db.transaction(() => {
    for (const event of batch.events) {
      insertEvent.run({
        ...event,
        payload: stringifyPayload(event.payload),
        occurredAt: coerceIsoTimestamp(event.occurredAt),
      });
    }

    for (const movement of batch.movements) {
      insertMovement.run({
        ...movement,
        occurredAt: coerceIsoTimestamp(movement.occurredAt),
      });
    }

    return {
      insertedEvents: batch.events.length,
      insertedMovements: batch.movements.length,
    };
  });

  return run();
}
