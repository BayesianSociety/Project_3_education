#!/usr/bin/env tsx
import { randomUUID } from 'crypto';
import { getDb } from '@/lib/db/sqlite';
import { PUZZLES } from '@/lib/puzzles/data';

function seed() {
  const db = getDb();
  const userId = randomUUID();
  const sessionId = randomUUID();

  const userStmt = db.prepare('INSERT INTO users (id, display_name) VALUES (?, ?)');
  const sessionStmt = db.prepare(
    'INSERT INTO sessions (id, user_id, client_version, platform, started_at, status) VALUES (?, ?, ?, ?, ?, ?)'
  );
  const attemptStmt = db.prepare(
    `INSERT INTO attempts (id, session_id, puzzle_id, started_at, ended_at, status, failure_reason, code_snapshot)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  );

  userStmt.run(userId, 'Demo Ranger');
  sessionStmt.run(sessionId, userId, 'demo', 'script', new Date().toISOString(), 'completed');

  for (const puzzle of PUZZLES) {
    const attemptId = randomUUID();
    attemptStmt.run(
      attemptId,
      sessionId,
      puzzle.id,
      new Date().toISOString(),
      new Date().toISOString(),
      'success',
      null,
      JSON.stringify({ blocks: ['move', 'jump', 'collect'] })
    );
  }

  console.log('Seeded demo user, session, and attempts.');
}

seed();
