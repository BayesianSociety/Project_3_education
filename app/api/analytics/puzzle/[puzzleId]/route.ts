import { NextRequest, NextResponse } from 'next/server';
import { getPuzzleAnalytics } from '@/lib/telemetry/analytics';

export async function GET(_request: NextRequest, context: { params: Promise<{ puzzleId: string }> }) {
  try {
    const { puzzleId } = await context.params;
    const detail = getPuzzleAnalytics(puzzleId);
    return NextResponse.json({ ok: true, detail });
  } catch (error) {
    console.error('puzzle analytics failed', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    const normalized = message.toLowerCase();
    const status = normalized.includes('not found') ? 404 : 500;
    return NextResponse.json({ ok: false, error: message }, { status });
  }
}
