import { NextRequest, NextResponse } from 'next/server';
import { endSession } from '@/lib/telemetry/ingest';
import { sessionEndSchema } from '@/types/telemetry';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const payload = sessionEndSchema.parse(body);
    const result = endSession(payload);
    return NextResponse.json({ ok: true, result });
  } catch (error) {
    console.error('session end failed', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
