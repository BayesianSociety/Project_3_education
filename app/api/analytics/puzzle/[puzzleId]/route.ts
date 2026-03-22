import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type PuzzleParams = {
  puzzleId: string;
};

export async function GET(
  _request: Request,
  context: { params: PuzzleParams },
) {
  return NextResponse.json(
    {
      error: 'Puzzle analytics route not yet implemented',
      puzzleId: context.params.puzzleId,
    },
    { status: 501 },
  );
}
