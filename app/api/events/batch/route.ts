import { NextRequest, NextResponse } from 'next/server';
import { recordEventBatch } from '@/lib/telemetry/ingest';
import { eventBatchSchema } from '@/types/telemetry';

export async function POST(request: NextRequest) {
  try {
    const payload = eventBatchSchema.parse(await request.json());
    const result = recordEventBatch(payload);
    return NextResponse.json({ ok: true, result });
  } catch (error) {
    console.error('event batch failed', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    const normalized = message.toLowerCase();
    const status = normalized.includes('not found') ? 404 : 400;
    return NextResponse.json({ ok: false, error: message }, { status });
  }
}
