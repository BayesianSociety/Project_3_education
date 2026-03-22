import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type MovementParams = {
  attemptId: string;
};

export async function GET(
  _request: Request,
  context: { params: MovementParams },
) {
  return NextResponse.json(
    {
      error: 'Movement analytics route not yet implemented',
      attemptId: context.params.attemptId,
    },
    { status: 501 },
  );
}
