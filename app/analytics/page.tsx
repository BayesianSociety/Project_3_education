import Dashboard from '@/components/analytics/Dashboard';
import { PUZZLES } from '@/lib/puzzles/data';

export default function AnalyticsPage() {
  const puzzleMetas = PUZZLES.map((puzzle) => ({
    id: puzzle.id,
    title: puzzle.title,
    grid: puzzle.grid,
  }));

  return (
    <div className="page-shell">
      <header style={{ color: 'white' }}>
        <p className="badge">
          <span role="img" aria-hidden="true">
            📈
          </span>{' '}
          Telemetry cockpit
        </p>
        <h1 style={{ fontFamily: 'var(--font-display)', marginBottom: 8 }}>Analytics & Replays</h1>
        <p className="text-muted" style={{ maxWidth: 720 }}>
          Pull insights from the SQLite warehouse: session counts, attempt success rates, event streams, and rerunnable movement traces. This page is
          fully keyboard navigable so facilitators can filter and audit quickly.
        </p>
      </header>
      <Dashboard puzzleMetas={puzzleMetas} />
    </div>
  );
}
