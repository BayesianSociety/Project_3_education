import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { applyMigrations } from './migrations';
import { syncPuzzleCatalog } from '@/lib/puzzles/data';

let instance: Database.Database | null = null;

const DEFAULT_DB_PATH = process.env.BLOCK_CODING_DB_PATH
  ? path.resolve(process.env.BLOCK_CODING_DB_PATH)
  : path.join(process.cwd(), 'db', 'block_coding.db');

function configure(db: Database.Database) {
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
  db.pragma('synchronous = NORMAL');
  db.pragma('cache_size = -16000');
  db.pragma('busy_timeout = 5000');
}

function ensureDirectory(targetPath: string) {
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
}

export function getDb(): Database.Database {
  if (instance) return instance;
  ensureDirectory(DEFAULT_DB_PATH);
  instance = new Database(DEFAULT_DB_PATH);
  configure(instance);
  applyMigrations(instance);
  syncPuzzleCatalog(instance);
  return instance;
}

export function resetDbForTests() {
  if (process.env.NODE_ENV !== 'test') {
    throw new Error('resetDbForTests can only run in test mode');
  }
  if (instance) {
    instance.close();
    instance = null;
  }
  if (fs.existsSync(DEFAULT_DB_PATH)) {
    fs.rmSync(DEFAULT_DB_PATH, { force: true });
  }
}
