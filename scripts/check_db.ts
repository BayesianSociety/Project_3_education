import fs from 'node:fs';
import path from 'node:path';

import Database from 'better-sqlite3';

import { applyMigrations, requiredTables, syncPuzzleCatalog } from '../lib/db/schema';
import { puzzles } from '../lib/puzzles/definitions';

const DB_PATH = process.env.DB_PATH ?? path.join(process.cwd(), 'db', 'telemetry.sqlite');

function bootstrapDatabase() {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  const db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');
  applyMigrations(db);
  syncPuzzleCatalog(
    db,
    puzzles.map((puzzle) => ({
      id: puzzle.id,
      title: puzzle.title,
      concept: puzzle.concept,
      difficulty: puzzle.difficulty,
      sceneSlug: puzzle.id,
      goal: puzzle.goal,
    }))
  );
  return db;
}

function summarize(db: Database.Database) {
  console.log(`SQLite database ready at ${DB_PATH}`);
  for (const table of requiredTables) {
    const count = db.prepare(`SELECT COUNT(*) as count FROM ${table}`).get() as { count: number };
    console.log(`- ${table}: ${count.count} rows`);
  }
}

async function main() {
  const db = bootstrapDatabase();
  summarize(db);
}

main().catch((error) => {
  console.error('Failed to verify database', error);
  process.exitCode = 1;
});
