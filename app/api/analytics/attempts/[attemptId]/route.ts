import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type AttemptParams = {
  attemptId: string;
};

export async function GET(
  _request: Request,
  context: { params: AttemptParams },
) {
  return NextResponse.json(
    {
      error: 'Analytics attempt details route not yet implemented',
      attemptId: context.params.attemptId,
    },
    { status: 501 },
  );
}
