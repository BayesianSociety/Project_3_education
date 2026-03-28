#!/usr/bin/env tsx
import { getDb, resetDbForTests } from '@/lib/db/sqlite';

function runIntegrityCheck() {
  const db = getDb();
  const result = db.prepare("PRAGMA integrity_check").get();
  console.log('SQLite integrity check:', result.integrity_check);
  if (result.integrity_check !== 'ok') {
    process.exitCode = 1;
  }
}

function runMigrations() {
  getDb();
  console.log('Migrations applied. All telemetry tables are ready.');
}

const args = process.argv.slice(2);

if (args.includes('--check')) {
  runIntegrityCheck();
} else if (args.includes('--reset')) {
  resetDbForTests();
  runMigrations();
} else {
  runMigrations();
}
