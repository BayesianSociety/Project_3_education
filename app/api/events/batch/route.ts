import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '../../../../lib/db/client';
import {
  persistTelemetryBatch,
  type EventInput,
  type MovementInput,
} from '../../../../lib/telemetry/ingest';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const requireString = (value: unknown, field: string) => {
  if (typeof value === 'string' && value.trim().length > 0) {
    return value;
  }
  throw new Error(`Missing or invalid ${field}`);
};

const optionalString = (value: unknown) =>
  typeof value === 'string' && value.trim().length > 0 ? value : undefined;

const requireNumber = (value: unknown, field: string) => {
  const parsed = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(parsed)) {
    throw new Error(`Missing or invalid ${field}`);
  }
  return parsed;
};

const parseEvents = (maybeEvents: unknown): EventInput[] => {
  if (!Array.isArray(maybeEvents)) return [];
  return maybeEvents.map((evt, index) => ({
    id: requireString(evt?.id, `events[${index}].id`),
    attemptId: requireString(evt?.attemptId ?? evt?.attempt_id, `events[${index}].attemptId`),
    sessionId: requireString(evt?.sessionId ?? evt?.session_id, `events[${index}].sessionId`),
    puzzleId: requireString(evt?.puzzleId ?? evt?.puzzle_id, `events[${index}].puzzleId`),
    eventType: requireString(evt?.eventType ?? evt?.event_type, `events[${index}].eventType`),
    payload: evt?.payload,
    occurredAt: optionalString(evt?.occurredAt ?? evt?.occurred_at),
  }));
};

const parseMovements = (maybeMovements: unknown): MovementInput[] => {
  if (!Array.isArray(maybeMovements)) return [];
  return maybeMovements.map((move, index) => ({
    id: requireString(move?.id, `movements[${index}].id`),
    attemptId: requireString(move?.attemptId ?? move?.attempt_id, `movements[${index}].attemptId`),
    stepIndex: requireNumber(move?.stepIndex ?? move?.step_index, `movements[${index}].stepIndex`),
    x: requireNumber(move?.x, `movements[${index}].x`),
    y: requireNumber(move?.y, `movements[${index}].y`),
    facing: optionalString(move?.facing ?? move?.facing_direction),
    action: optionalString(move?.action),
    occurredAt: optionalString(move?.occurredAt ?? move?.occurred_at),
  }));
};

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  try {
    const typedBody = (body ?? {}) as { events?: unknown; movements?: unknown };
    const events = parseEvents(typedBody.events);
    const movements = parseMovements(typedBody.movements);

    if (events.length === 0 && movements.length === 0) {
      return NextResponse.json(
        { error: 'Submit at least one event or movement item' },
        { status: 400 },
      );
    }

    const db = getDb();
    const result = persistTelemetryBatch(db, { events, movements });

    return NextResponse.json({ ok: true, ...result }, { status: 201 });
  } catch (error) {
    console.error('Failed to persist telemetry batch', error);
    return NextResponse.json({ error: 'Failed to persist telemetry batch' }, { status: 500 });
  }
}
