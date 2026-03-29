import fs from 'node:fs';
import path from 'node:path';

import Database from 'better-sqlite3';

import { puzzles } from '../puzzles/definitions';
import { applyMigrations, syncPuzzleCatalog } from './schema';

export type SqliteDatabase = Database.Database;

type DbGlobal = typeof globalThis & {
  __blockCodingDb?: SqliteDatabase;
};

export const DB_PATH = process.env.DB_PATH ?? path.join(process.cwd(), 'db', 'telemetry.sqlite');

export function getDb(): SqliteDatabase {
  const globalWithDb = globalThis as DbGlobal;
  if (!globalWithDb.__blockCodingDb) {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    const connection = new Database(DB_PATH);
    connection.pragma('journal_mode = WAL');
    applyMigrations(connection);
    syncPuzzleCatalog(
      connection,
      puzzles.map((puzzle) => ({
        id: puzzle.id,
        title: puzzle.title,
        concept: puzzle.concept,
        difficulty: puzzle.difficulty,
        sceneSlug: puzzle.id,
        goal: puzzle.goal,
      }))
    );
    globalWithDb.__blockCodingDb = connection;
  }
  return globalWithDb.__blockCodingDb!;
}
