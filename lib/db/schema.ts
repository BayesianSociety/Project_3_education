import type Database from 'better-sqlite3';

export type SqliteDatabase = Database.Database;

export type AttemptStatus = 'running' | 'success' | 'failure';

const tableStatements = [
  `CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    display_name TEXT,
    created_at DATETIME DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    device TEXT,
    locale TEXT,
    created_at DATETIME DEFAULT (datetime('now')),
    ended_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )`,
  `CREATE TABLE IF NOT EXISTS puzzles (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    concept TEXT NOT NULL CHECK (concept IN ('sequencing','loops','conditionals')),
    difficulty INTEGER NOT NULL,
    scene_slug TEXT NOT NULL,
    goal TEXT NOT NULL,
    created_at DATETIME DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS attempts (
    id TEXT PRIMARY KEY,
    session_id TEXT NOT NULL,
    puzzle_id TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('running','success','failure')),
    failure_reason TEXT,
    duration_ms INTEGER,
    code_snapshot TEXT,
    started_at DATETIME DEFAULT (datetime('now')),
    completed_at DATETIME,
    FOREIGN KEY (session_id) REFERENCES sessions(id),
    FOREIGN KEY (puzzle_id) REFERENCES puzzles(id)
  )`,
  `CREATE TABLE IF NOT EXISTS events (
    id TEXT PRIMARY KEY,
    session_id TEXT NOT NULL,
    attempt_id TEXT,
    puzzle_id TEXT,
    kind TEXT NOT NULL,
    payload TEXT,
    occurred_at DATETIME DEFAULT (datetime('now')),
    FOREIGN KEY (session_id) REFERENCES sessions(id),
    FOREIGN KEY (attempt_id) REFERENCES attempts(id)
  )`,
  `CREATE TABLE IF NOT EXISTS movements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    attempt_id TEXT NOT NULL,
    step_index INTEGER NOT NULL,
    x INTEGER NOT NULL,
    y INTEGER NOT NULL,
    facing TEXT,
    state TEXT,
    occurred_at DATETIME DEFAULT (datetime('now')),
    FOREIGN KEY (attempt_id) REFERENCES attempts(id)
  )`,
  `CREATE TABLE IF NOT EXISTS puzzle_progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    puzzle_id TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('locked','unlocked','complete')),
    last_attempt_id TEXT,
    updated_at DATETIME DEFAULT (datetime('now')),
    UNIQUE(user_id, puzzle_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (last_attempt_id) REFERENCES attempts(id)
  )`
];

const indexStatements = [
  `CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id)`,
  `CREATE INDEX IF NOT EXISTS idx_attempts_session ON attempts(session_id)`,
  `CREATE INDEX IF NOT EXISTS idx_attempts_puzzle ON attempts(puzzle_id)`,
  `CREATE INDEX IF NOT EXISTS idx_events_attempt ON events(attempt_id)`,
  `CREATE INDEX IF NOT EXISTS idx_events_session ON events(session_id)`,
  `CREATE INDEX IF NOT EXISTS idx_movements_attempt ON movements(attempt_id)`,
  `CREATE INDEX IF NOT EXISTS idx_progress_user ON puzzle_progress(user_id)`
];

export const schemaStatements = [...tableStatements, ...indexStatements];

export const requiredTables = [
  'users',
  'sessions',
  'puzzles',
  'attempts',
  'events',
  'movements',
  'puzzle_progress'
];

/**
 * Applies idempotent schema migrations to the provided SQLite connection.
 */
export function applyMigrations(db: SqliteDatabase): void {
  db.pragma('foreign_keys = ON');
  for (const sql of schemaStatements) {
    db.prepare(sql).run();
  }
}

export type PuzzleSeed = {
  id: string;
  title: string;
  concept: 'sequencing' | 'loops' | 'conditionals';
  difficulty: number;
  sceneSlug: string;
  goal: string;
};

/**
 * Ensures that every puzzle definition from the frontend catalog exists in SQLite.
 */
export function syncPuzzleCatalog(db: SqliteDatabase, seeds: PuzzleSeed[]): void {
  const insert = db.prepare(`
    INSERT INTO puzzles (id, title, concept, difficulty, scene_slug, goal)
    VALUES (@id, @title, @concept, @difficulty, @sceneSlug, @goal)
    ON CONFLICT(id) DO UPDATE SET
      title = excluded.title,
      concept = excluded.concept,
      difficulty = excluded.difficulty,
      scene_slug = excluded.scene_slug,
      goal = excluded.goal
  `);

  const seenIds = new Set<string>();
  const tx = db.transaction((payload: PuzzleSeed[]) => {
    for (const seed of payload) {
      insert.run(seed);
      seenIds.add(seed.id);
    }
  });

  tx(seeds);

  if (seenIds.size === 0) {
    return;
  }

  const placeholders = Array.from(seenIds).map(() => '?').join(', ');
  const staleQuery = `SELECT id FROM puzzles WHERE id NOT IN (${placeholders})`;
  const stale = db.prepare(staleQuery).all(...Array.from(seenIds));
  for (const row of stale) {
    db.prepare('DELETE FROM puzzles WHERE id = ?').run(row.id);
  }
}
