import { NextResponse } from 'next/server';

import { readAnalyticsSnapshot } from '../../../../../lib/db/analytics';
import { getDb } from '../../../../../lib/db/connection';

export async function GET(_: Request, context: { params: Promise<{ puzzleId: string }> }) {
  try {
    const { puzzleId } = await context.params;
    const snapshot = readAnalyticsSnapshot(getDb());
    return NextResponse.json({
      puzzleId,
      attempts: snapshot.attempts.filter((attempt) => attempt.puzzleId === puzzleId),
      events: snapshot.events.filter((event) => event.puzzleId === puzzleId),
      movements: snapshot.movements[puzzleId] ?? [],
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to read puzzle analytics', details: error instanceof Error ? error.message : error },
      { status: 500 }
    );
  }
}
