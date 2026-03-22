import { NextResponse } from 'next/server';
import { getDb } from '../../../../../lib/db/client';
import { buildAnalyticsSummary } from '../../../../../lib/telemetry/analytics';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = getDb();
    const summary = buildAnalyticsSummary(db);
    return NextResponse.json(summary, { status: 200 });
  } catch (error) {
    console.error('Failed to build analytics summary', error);
    return NextResponse.json(
      { error: 'Failed to load analytics summary' },
      { status: 500 },
    );
  }
}
