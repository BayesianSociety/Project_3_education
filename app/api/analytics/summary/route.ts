import { NextResponse } from 'next/server';
import { getAnalyticsSummary } from '@/lib/telemetry/analytics';

export async function GET() {
  try {
    const summary = getAnalyticsSummary();
    return NextResponse.json({ ok: true, summary });
  } catch (error) {
    console.error('summary analytics failed', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
