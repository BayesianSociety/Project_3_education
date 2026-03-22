import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';
import { migrations } from './migrations';

const DB_FILE = process.env.SQLITE_DB_FILE ?? 'block_coding.sqlite';
const DB_DIRECTORY =
  process.env.SQLITE_DB_DIRECTORY ?? path.join(process.cwd(), 'var', 'data');
const DB_PATH = path.join(DB_DIRECTORY, DB_FILE);

let instance: Database | null = null;

function ensureDirectory() {
  fs.mkdirSync(DB_DIRECTORY, { recursive: true });
}

function applyMigrations(db: Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id TEXT PRIMARY KEY,
      applied_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  const applied = new Set<string>(
    db.prepare('SELECT id FROM schema_migrations').all().map((row) => row.id as string),
  );

  const insertStmt = db.prepare('INSERT INTO schema_migrations (id) VALUES (?)');
  for (const migration of migrations) {
    if (applied.has(migration.id)) continue;
    const runMigration = db.transaction(() => {
      migration.run(db);
      insertStmt.run(migration.id);
    });
    runMigration();
  }
}

export function getDb(): Database {
  if (instance) {
    return instance;
  }

  ensureDirectory();
  instance = new Database(DB_PATH);
  instance.pragma('journal_mode = WAL');
  instance.pragma('foreign_keys = ON');
  applyMigrations(instance);
  return instance;
}

export function closeDb() {
  if (instance) {
    instance.close();
    instance = null;
  }
}

export function getDatabasePath() {
  return DB_PATH;
}
