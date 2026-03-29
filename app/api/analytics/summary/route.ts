import { NextResponse } from 'next/server';

import { readAnalyticsSnapshot } from '../../../../lib/db/analytics';
import { getDb } from '../../../../lib/db/connection';

export async function GET() {
  try {
    const snapshot = readAnalyticsSnapshot(getDb());
    return NextResponse.json(snapshot);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to read analytics summary', details: error instanceof Error ? error.message : error },
      { status: 500 }
    );
  }
}
