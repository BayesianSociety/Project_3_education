import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import '@/styles/globals.css';
import TopBar from '@/components/layout/TopBar';
import { PUZZLES } from '@/lib/puzzles/data';

export const metadata: Metadata = {
  title: 'Block Coding Puzzles',
  description: 'Play through three animated puzzles, learn sequencing, loops, and conditionals, and track telemetry-rich analytics.',
};

type ProgressStatus = 'locked' | 'available' | 'complete';

type StoredProgress = Record<string, ProgressStatus>;

async function readProgress(): Promise<{ id: string; title: string; order: number; status: ProgressStatus }[]> {
  const cookieStore = await cookies();
  const raw = cookieStore.get('blockCodingProgress')?.value;
  let stored: StoredProgress = {};
  if (raw) {
    try {
      stored = JSON.parse(raw) as StoredProgress;
    } catch (error) {
      console.warn('Failed to parse puzzle progress cookie', error);
    }
  }

  return PUZZLES.map((puzzle, index) => {
    const status = stored[puzzle.id] ?? (index === 0 ? 'available' : 'locked');
    return {
      id: puzzle.id,
      title: puzzle.title,
      order: puzzle.order,
      status,
    };
  });
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const progress = await readProgress();

  return (
    <html lang="en">
      <body>
        <TopBar puzzles={progress} />
        <main>{children}</main>
      </body>
    </html>
  );
}
