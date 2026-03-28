import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import { PUZZLES } from '@/lib/puzzles/data';
import { PuzzleExperience } from '@/components/game/SceneCanvas';

type Params = {
  params: Promise<{ puzzleId: string }>;
};

type ProgressStatus = 'locked' | 'available' | 'complete';

export default async function PuzzlePage({ params }: Params) {
  const { puzzleId } = await params;
  const puzzle = PUZZLES.find((entry) => entry.id === puzzleId);
  if (!puzzle) {
    notFound();
  }
  const progress = await readProgress();
  const entry = progress.find((row) => row.id === puzzle.id);
  const locked = entry ? entry.status === 'locked' : puzzle.order > 1;

  return (
    <div className="page-shell">
      <PuzzleExperience puzzle={puzzle} locked={locked} progressOrder={progress} />
    </div>
  );
}

async function readProgress(): Promise<{ id: string; order: number; status: ProgressStatus }[]> {
  const cookieStore = await cookies();
  const raw = cookieStore.get('blockCodingProgress')?.value;
  let stored: Record<string, ProgressStatus> = {};
  if (raw) {
    try {
      stored = JSON.parse(raw) as Record<string, ProgressStatus>;
    } catch (error) {
      stored = {};
    }
  }
  return PUZZLES.map((puzzle, index) => ({
    id: puzzle.id,
    order: puzzle.order,
    status: stored[puzzle.id] ?? (index === 0 ? 'available' : 'locked'),
  }));
}
