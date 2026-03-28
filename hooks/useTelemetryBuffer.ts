'use client';

import { useCallback, useRef, useState } from 'react';
import type { AttemptPayload, EventPayload, MovementPayload } from '@/types/telemetry';

type AttemptInit = {
  puzzleId: string;
  codeSnapshot?: string | null;
  metrics?: AttemptPayload['metrics'];
};

type FlushResult =
  | { ok: true; attemptId: string | null }
  | { ok: false; error: string };

export function useTelemetryBuffer(initialSessionId?: string) {
  const [sessionId, setSessionId] = useState<string | null>(initialSessionId ?? null);
  const [isFlushing, setIsFlushing] = useState(false);
  const [lastAttemptId, setLastAttemptId] = useState<string | null>(null);
  const attemptRef = useRef<AttemptPayload | null>(null);
  const eventsRef = useRef<EventPayload[]>([]);
  const movementsRef = useRef<MovementPayload[]>([]);

  const beginAttempt = useCallback(({ puzzleId, codeSnapshot, metrics }: AttemptInit) => {
    const now = new Date().toISOString();
    attemptRef.current = {
      puzzleId,
      status: 'in_progress',
      startedAt: now,
      endedAt: undefined,
      codeSnapshot: codeSnapshot ?? undefined,
      metrics,
    };
    eventsRef.current = [];
    movementsRef.current = [];
  }, []);

  const updateAttemptSnapshot = useCallback((codeSnapshot: string) => {
    if (!attemptRef.current) return;
    attemptRef.current = {
      ...attemptRef.current,
      codeSnapshot,
    };
  }, []);

  const markAttemptStatus = useCallback((status: AttemptPayload['status'], failureReason?: AttemptPayload['failureReason']) => {
    if (!attemptRef.current) return;
    attemptRef.current = {
      ...attemptRef.current,
      status,
      failureReason,
      endedAt: new Date().toISOString(),
    };
  }, []);

  const recordEvent = useCallback((event: Omit<EventPayload, 'timestamp'> & { timestamp?: string }) => {
    eventsRef.current.push({
      ...event,
      timestamp: event.timestamp ?? new Date().toISOString(),
    });
  }, []);

  const recordMovement = useCallback((movement: Omit<MovementPayload, 'timestamp'> & { timestamp?: string }) => {
    movementsRef.current.push({
      ...movement,
      timestamp: movement.timestamp ?? new Date().toISOString(),
    });
  }, []);

  const flush = useCallback(async (): Promise<FlushResult> => {
    if (!sessionId || !attemptRef.current) {
      return { ok: false, error: 'Missing session or attempt.' };
    }
    setIsFlushing(true);
    try {
      const response = await fetch('/api/events/batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          attempt: attemptRef.current,
          events: eventsRef.current,
          movements: movementsRef.current,
        }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        return { ok: false, error: payload.error ?? 'Failed to write telemetry' };
      }
      const attemptId = payload.attemptId ?? attemptRef.current.attemptId ?? null;
      if (attemptId) {
        attemptRef.current = { ...attemptRef.current, attemptId };
      }
      eventsRef.current = [];
      movementsRef.current = [];
      setLastAttemptId(attemptId);
      return { ok: true, attemptId };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown telemetry error';
      return { ok: false, error: message };
    } finally {
      setIsFlushing(false);
    }
  }, [sessionId]);

  return {
    sessionId,
    setSessionId,
    beginAttempt,
    updateAttemptSnapshot,
    markAttemptStatus,
    recordEvent,
    recordMovement,
    flush,
    isFlushing,
    lastAttemptId,
  };
}
