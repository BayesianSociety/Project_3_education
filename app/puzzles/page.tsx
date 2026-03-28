import Link from 'next/link';
import { cookies } from 'next/headers';
import { PUZZLES } from '@/lib/puzzles/data';

type ProgressStatus = 'locked' | 'available' | 'complete';

type ProgressRow = { id: string; status: ProgressStatus };

async function readProgress(): Promise<Record<string, ProgressStatus>> {
  const raw = (await cookies()).get('blockCodingProgress')?.value;
  if (!raw) return {};
  try {
    return JSON.parse(raw) as Record<string, ProgressStatus>;
  } catch (error) {
    console.warn('failed to parse progress cookie', error);
    return {};
  }
}

async function computeProgressRows(): Promise<ProgressRow[]> {
  const stored = await readProgress();
  return PUZZLES.map((puzzle, index) => ({
    id: puzzle.id,
    status: stored[puzzle.id] ?? (index === 0 ? 'available' : 'locked'),
  }));
}

const statusCopy: Record<ProgressStatus, { label: string; color: string }> = {
  locked: { label: 'Locked', color: 'rgba(255,255,255,0.5)' },
  available: { label: 'Available', color: 'var(--color-mint-200)' },
  complete: { label: 'Cleared', color: 'var(--color-cream-300)' },
};

export default async function PuzzleMapPage() {
  const progress = await computeProgressRows();

  return (
    <div className="page-shell">
      <header style={{ color: 'white' }}>
        <p className="badge">
          <span role="img" aria-hidden="true">
            🧠
          </span>{' '}
          Mission Control
        </p>
        <h1 style={{ fontFamily: 'var(--font-display)', marginBottom: 8 }}>Choose your next challenge</h1>
        <p className="text-muted" style={{ maxWidth: 720 }}>
          Each puzzle enforces the available block palette and concept focus spelled out in the brief. Locked levels become available as soon as the
          preceding attempt succeeds, and analytics run regardless so facilitators can study failures.
        </p>
      </header>

      <section className="map-grid" aria-label="Puzzle map">
        {PUZZLES.map((puzzle) => {
          const status = progress.find((row) => row.id === puzzle.id)?.status ?? 'locked';
          const { label, color } = statusCopy[status];
          const content = (
            <article
              key={puzzle.id}
              className={`map-card ${status === 'locked' ? 'locked' : ''}`}
              aria-live="polite"
              aria-label={`${puzzle.title} is ${label}`}
            >
              <div>
                <p className="badge" style={{ color }}>
                  {label}
                </p>
                <h3>{puzzle.title}</h3>
                <p className="text-muted">{puzzle.story}</p>
                <ul style={{ paddingLeft: 16 }}>
                  <li>Goal: {puzzle.goal}</li>
                  <li>Concept: {puzzle.constraints.requiredConcept}</li>
                  <li>Max blocks: {puzzle.constraints.maxBlocks}</li>
                </ul>
              </div>
              <footer>
                <span>{status === 'locked' ? 'Solve previous puzzle' : 'Enter scene'}</span>
                <span aria-hidden>›</span>
              </footer>
            </article>
          );

          if (status === 'locked') {
            return (
              <div key={puzzle.id} aria-disabled className="map-card locked">
                {content}
              </div>
            );
          }

          return (
            <Link key={puzzle.id} href={`/puzzles/${puzzle.id}`} aria-disabled={status === 'locked'} style={{ textDecoration: 'none' }}>
              {content}
            </Link>
          );
        })}
      </section>
    </div>
  );
}
