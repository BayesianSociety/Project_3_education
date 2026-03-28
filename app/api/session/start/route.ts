import { NextRequest, NextResponse } from 'next/server';
import { startSession } from '@/lib/telemetry/ingest';
import { sessionStartSchema } from '@/types/telemetry';

export async function POST(request: NextRequest) {
  try {
    const body = await request
      .json()
      .catch(() => ({}));
    const payload = sessionStartSchema.parse(body);
    const session = startSession(payload);
    return NextResponse.json({ ok: true, session });
  } catch (error) {
    console.error('session start failed', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
