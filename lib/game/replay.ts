import type { MovementFrame } from './engine';

export type ReplayTimeline = {
  frames: MovementFrame[];
  progress: number[];
};

export function createReplayTimeline(frames: MovementFrame[]): ReplayTimeline {
  const denominator = Math.max(1, frames.length - 1);
  const progress = frames.map((_, index) => index / denominator);
  return {
    frames,
    progress,
  };
}

export function getReplayFrame(timeline: ReplayTimeline, index: number): MovementFrame | null {
  if (!timeline.frames.length) return null;
  const clamped = Math.min(Math.max(index, 0), timeline.frames.length - 1);
  return timeline.frames[clamped];
}
