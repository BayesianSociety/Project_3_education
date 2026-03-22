/**
 * Raw SQL definitions for the telemetry schema. Each statement is exported
 * individually so migrations and tests can cherry-pick tables as needed.
 */
export const CREATE_TABLE_USERS = `
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  nickname TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
`;

export const CREATE_TABLE_SESSIONS = `
CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  puzzle_id TEXT,
  status TEXT NOT NULL CHECK (status IN ('active','ended')),
  started_at TEXT NOT NULL DEFAULT (datetime('now')),
  ended_at TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
`;

export const CREATE_TABLE_PUZZLES = `
CREATE TABLE IF NOT EXISTS puzzles (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  concept TEXT NOT NULL CHECK (concept IN ('sequencing','loops','conditionals')),
  sort_order INTEGER NOT NULL UNIQUE
);
`;

export const CREATE_TABLE_ATTEMPTS = `
CREATE TABLE IF NOT EXISTS attempts (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  puzzle_id TEXT NOT NULL,
  started_at TEXT NOT NULL DEFAULT (datetime('now')),
  completed_at TEXT,
  outcome TEXT NOT NULL CHECK (outcome IN ('success','failure','aborted')),
  failure_reason TEXT,
  code_snapshot TEXT,
  hint_count INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY (session_id) REFERENCES sessions(id),
  FOREIGN KEY (puzzle_id) REFERENCES puzzles(id)
);
`;

export const CREATE_TABLE_EVENTS = `
CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  attempt_id TEXT NOT NULL,
  session_id TEXT NOT NULL,
  puzzle_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  payload TEXT,
  occurred_at TEXT NOT NULL,
  FOREIGN KEY (attempt_id) REFERENCES attempts(id),
  FOREIGN KEY (session_id) REFERENCES sessions(id),
  FOREIGN KEY (puzzle_id) REFERENCES puzzles(id)
);
`;

export const CREATE_TABLE_MOVEMENTS = `
CREATE TABLE IF NOT EXISTS movements (
  id TEXT PRIMARY KEY,
  attempt_id TEXT NOT NULL,
  step_index INTEGER NOT NULL,
  x INTEGER NOT NULL,
  y INTEGER NOT NULL,
  facing TEXT,
  action TEXT,
  occurred_at TEXT NOT NULL,
  FOREIGN KEY (attempt_id) REFERENCES attempts(id)
);
`;

export const CREATE_TABLE_PUZZLE_PROGRESS = `
CREATE TABLE IF NOT EXISTS puzzle_progress (
  user_id TEXT NOT NULL,
  puzzle_id TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('locked','unlocked','complete')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (user_id, puzzle_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (puzzle_id) REFERENCES puzzles(id)
);
`;

export const SCHEMA_STATEMENTS = [
  CREATE_TABLE_USERS,
  CREATE_TABLE_SESSIONS,
  CREATE_TABLE_PUZZLES,
  CREATE_TABLE_ATTEMPTS,
  CREATE_TABLE_EVENTS,
  CREATE_TABLE_MOVEMENTS,
  CREATE_TABLE_PUZZLE_PROGRESS,
];
