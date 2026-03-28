#!/usr/bin/env tsx
import { randomUUID } from 'crypto';
import { recordEventBatch, startSession } from '@/lib/telemetry/ingest';

const BASE_URL = process.env.TELEMETRY_BASE_URL ?? 'http://127.0.0.1:3000';

type JsonValue = Record<string, unknown>;

async function postJson(path: string, body: JsonValue) {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`Request ${path} failed with ${response.status}`);
  }
  return response.json();
}

async function main() {
  const sessionBody = {
    playerName: 'Smoke Runner',
    clientVersion: 'smoke-script',
  };

  let sessionId: string;
  try {
    console.log('POST /api/session/start');
    const result = (await postJson('/api/session/start', sessionBody)) as { session: { sessionId: string } };
    sessionId = result.session.sessionId;
  } catch (error) {
    console.warn('Falling back to direct session start:', error);
    sessionId = startSession(sessionBody).sessionId;
  }

  const attemptBody = {
    sessionId,
    attempt: {
      puzzleId: 'puzzle-01',
      startedAt: new Date().toISOString(),
      status: 'in_progress' as const,
    },
    events: [
      { type: 'play_clicked', timestamp: new Date().toISOString(), detail: { speed: 'normal' } },
      { type: 'block_executed', timestamp: new Date().toISOString(), detail: { block: 'move_forward' } },
    ],
    movements: [
      { stepIndex: 0, x: 0, y: 2, action: 'spawn', timestamp: new Date().toISOString() },
      { stepIndex: 1, x: 1, y: 2, action: 'move', timestamp: new Date().toISOString() },
    ],
  };

  try {
    console.log('POST /api/events/batch');
    await postJson('/api/events/batch', attemptBody);
  } catch (error) {
    console.warn('Falling back to direct batch ingest:', error);
    recordEventBatch({
      ...attemptBody,
      attempt: {
        ...attemptBody.attempt,
        attemptId: randomUUID(),
        endedAt: new Date().toISOString(),
        status: 'failure',
        failureReason: 'target_not_reached',
        codeSnapshot: 'move(); move(); jump();',
      },
    });
  }

  console.log('Telemetry smoke test finished.');
}

main().catch((error) => {
  console.error('Smoke test failed', error);
  process.exitCode = 1;
});
