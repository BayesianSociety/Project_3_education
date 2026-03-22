import type Database from 'better-sqlite3';
import { SCHEMA_STATEMENTS } from './schema';

export type Migration = {
  id: string;
  run: (db: Database) => void;
};

export const migrations: Migration[] = [
  {
    id: '0001_initial_schema',
    run: (db) => {
      db.exec(SCHEMA_STATEMENTS.join('\n'));
    },
  },
];
