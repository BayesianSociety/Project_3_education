import Link from 'next/link';
import { PUZZLES } from '@/lib/puzzles/data';

const featureCards = [
  {
    title: 'Drag-and-drop logic',
    body: 'Build under a fixed On Start root with curated palettes for movement, actions, logic, sensing, and loops.',
  },
  {
    title: 'Polished WebGL scene',
    body: 'See Pixel Pup sprint across the candy boardwalk with sprite lighting, particles, and camera sway built for readability.',
  },
  {
    title: 'Telemetry-first analytics',
    body: 'Every movement, code edit, and hint ping is buffered into SQLite, unlocking dashboards and replay tools.',
  },
  {
    title: 'Accessible by design',
    body: 'Keyboard-friendly controls, text-to-speech goals, and high-contrast palettes help every learner participate.',
  },
];

export default function HomePage() {
  return (
    <div className="page-shell">
      <section className="hero-card" aria-labelledby="hero-title">
        <p className="badge">
          <span role="img" aria-hidden="true">
            ✨
          </span>{' '}
          Learn to think like a programmer
        </p>
        <h1 id="hero-title">Block Coding Puzzles</h1>
        <p>
          Assemble Blockly commands, send Pixel Pup running across candy-coated scenes, and watch telemetry bring every lesson to life.
          Sequencing, loops, and conditionals unfold over three handcrafted puzzles with analytics your facilitators can trust.
        </p>
        <div className="cta-row">
          <Link className="cta-button" href="/puzzles">
            Start Puzzle Journey
          </Link>
          <Link className="cta-button secondary" href="/analytics">
            View Analytics
          </Link>
        </div>
      </section>

      <section style={{ marginTop: 64 }}>
        <h2 style={{ color: 'white', fontFamily: 'var(--font-display)', fontSize: '2rem' }}>Why learners love it</h2>
        <div className="card-grid">
          {featureCards.map((card) => (
            <article key={card.title} className="card">
              <h3 style={{ marginTop: 0 }}>{card.title}</h3>
              <p className="text-muted">{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 72 }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', color: 'white' }}>
          <div>
            <p className="badge">
              <span role="img" aria-hidden="true">
                🗺️
              </span>{' '}
              Puzzle Roadmap
            </p>
            <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: 8 }}>Three-step arc from sequencing to sensing</h2>
            <p className="text-muted">Exactly three puzzles. Each adds a new computing concept and new telemetry hooks.</p>
          </div>
          <Link href="/puzzles" style={{ color: 'var(--color-mint-200)', fontWeight: 700 }}>
            Open map →
          </Link>
        </header>
        <div className="map-grid">
          {PUZZLES.map((puzzle) => (
            <article key={puzzle.id} className="map-card">
              <div>
                <p className="badge" aria-label={`Level ${puzzle.order}`}>
                  🔒 L{puzzle.order}
                </p>
                <h3>{puzzle.title}</h3>
                <p className="text-muted">{puzzle.story}</p>
              </div>
              <footer>
                <span>{puzzle.goal}</span>
                <span aria-hidden>›</span>
              </footer>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
