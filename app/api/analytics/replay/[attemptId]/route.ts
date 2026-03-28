import { NextRequest, NextResponse } from 'next/server';
import { getReplayPayload } from '@/lib/telemetry/analytics';

export async function GET(_request: NextRequest, context: { params: Promise<{ attemptId: string }> }) {
  try {
    const { attemptId } = await context.params;
    const replay = getReplayPayload(attemptId);
    return NextResponse.json({ ok: true, replay });
  } catch (error) {
    console.error('replay analytics failed', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    const normalized = message.toLowerCase();
    const status = normalized.includes('not found') ? 404 : 500;
    return NextResponse.json({ ok: false, error: message }, { status });
  }
}
