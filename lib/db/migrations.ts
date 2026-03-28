import Database from 'better-sqlite3';
import { INDEXES, TABLES } from './schema';

type Migration = {
  id: string;
  statements: string[];
};

export const MIGRATIONS: Migration[] = [
  {
    id: '0001-core-schema',
    statements: [
      TABLES.users,
      TABLES.sessions,
      TABLES.puzzles,
      TABLES.attempts,
      TABLES.events,
      TABLES.movements,
      TABLES.puzzleProgress,
      ...INDEXES,
    ],
  },
];

export function applyMigrations(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id TEXT PRIMARY KEY,
      applied_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  const applied = new Set<string>(
    db.prepare('SELECT id FROM schema_migrations').all().map((row: { id: string }) => row.id)
  );

  for (const migration of MIGRATIONS) {
    if (applied.has(migration.id)) continue;
    const run = db.transaction(() => {
      for (const statement of migration.statements) {
        db.exec(statement);
      }
      db.prepare('INSERT INTO schema_migrations (id) VALUES (?)').run(migration.id);
    });
    run();
  }
}
