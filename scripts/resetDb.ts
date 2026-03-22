import fs from 'fs';
import { closeDb, getDatabasePath, getDb } from '../lib/db/client';

async function reset() {
  closeDb();
  const dbPath = getDatabasePath();
  if (fs.existsSync(dbPath)) {
    fs.rmSync(dbPath);
    console.log(`Removed ${dbPath}`);
  } else {
    console.log(`No database found at ${dbPath}, skipping delete.`);
  }

  // Recreate database and apply migrations
  getDb();
  closeDb();
  console.log('Database reset complete.');
}

reset();
