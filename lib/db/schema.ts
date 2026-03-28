export const TABLES = {
  users: `
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      display_name TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `,
  sessions: `
    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      client_version TEXT,
      platform TEXT,
      started_at TEXT NOT NULL,
      ended_at TEXT,
      status TEXT NOT NULL DEFAULT 'active',
      metadata TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `,
  puzzles: `
    CREATE TABLE IF NOT EXISTS puzzles (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      story TEXT NOT NULL,
      goal TEXT NOT NULL,
      scene_id TEXT NOT NULL,
      order_index INTEGER NOT NULL,
      grid TEXT NOT NULL,
      entities TEXT NOT NULL,
      available_blocks TEXT NOT NULL,
      constraints TEXT,
      success_criteria TEXT,
      hints TEXT,
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `,
  attempts: `
    CREATE TABLE IF NOT EXISTS attempts (
      id TEXT PRIMARY KEY,
      session_id TEXT NOT NULL,
      puzzle_id TEXT NOT NULL,
      started_at TEXT NOT NULL,
      ended_at TEXT,
      status TEXT NOT NULL,
      failure_reason TEXT,
      code_snapshot TEXT,
      metadata TEXT,
      FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE,
      FOREIGN KEY (puzzle_id) REFERENCES puzzles(id) ON DELETE CASCADE
    );
  `,
  events: `
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      attempt_id TEXT,
      session_id TEXT NOT NULL,
      puzzle_id TEXT NOT NULL,
      type TEXT NOT NULL,
      detail TEXT,
      created_at TEXT NOT NULL,
      FOREIGN KEY (attempt_id) REFERENCES attempts(id) ON DELETE CASCADE,
      FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE,
      FOREIGN KEY (puzzle_id) REFERENCES puzzles(id) ON DELETE CASCADE
    );
  `,
  movements: `
    CREATE TABLE IF NOT EXISTS movements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      attempt_id TEXT NOT NULL,
      step_index INTEGER NOT NULL,
      x INTEGER NOT NULL,
      y INTEGER NOT NULL,
      action TEXT,
      timestamp TEXT NOT NULL,
      FOREIGN KEY (attempt_id) REFERENCES attempts(id) ON DELETE CASCADE
    );
  `,
  puzzleProgress: `
    CREATE TABLE IF NOT EXISTS puzzle_progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      puzzle_id TEXT NOT NULL,
      status TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      UNIQUE(user_id, puzzle_id),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (puzzle_id) REFERENCES puzzles(id) ON DELETE CASCADE
    );
  `,
};

export const INDEXES = [
  `CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);`,
  `CREATE INDEX IF NOT EXISTS idx_attempts_session ON attempts(session_id);`,
  `CREATE INDEX IF NOT EXISTS idx_attempts_puzzle ON attempts(puzzle_id);`,
  `CREATE INDEX IF NOT EXISTS idx_events_attempt ON events(attempt_id);`,
  `CREATE INDEX IF NOT EXISTS idx_movements_attempt ON movements(attempt_id);`,
  `CREATE INDEX IF NOT EXISTS idx_progress_user_puzzle ON puzzle_progress(user_id, puzzle_id);`
];
