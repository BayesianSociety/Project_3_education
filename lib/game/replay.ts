import type { MovementPayload } from '@/types/telemetry';

export type ReplayPoint = MovementPayload & { t: number };

export function buildReplay(points: MovementPayload[], speedMultiplier = 1): ReplayPoint[] {
  const baseDuration = 500 / speedMultiplier;
  return points.map((point, index) => ({
    ...point,
    t: index * baseDuration,
  }));
}
