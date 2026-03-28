import { z } from 'zod';

export const failureReasons = [
  'target_not_reached',
  'wrong_item',
  'wrong_order',
  'obstacle_collision',
  'missing_condition',
  'timeout',
  'unknown',
] as const;

export type FailureReason = (typeof failureReasons)[number];

export const sessionStartSchema = z.object({
  userId: z.string().uuid().optional(),
  playerName: z.string().min(1).max(64).optional(),
  metadata: z.record(z.any()).optional(),
  clientVersion: z.string().optional(),
  platform: z.string().optional(),
  startedAt: z.string().datetime().optional(),
});

export const sessionEndSchema = z.object({
  sessionId: z.string().uuid(),
  endedAt: z.string().datetime().optional(),
  status: z.enum(['completed', 'abandoned', 'timeout']).optional(),
});

export const attemptPayloadSchema = z.object({
  attemptId: z.string().uuid().optional(),
  puzzleId: z.string().min(3),
  startedAt: z.string().datetime(),
  endedAt: z.string().datetime().optional(),
  status: z.enum(['in_progress', 'success', 'failure']),
  failureReason: z.enum(failureReasons).optional(),
  codeSnapshot: z.string().max(20000).optional(),
  metrics: z
    .object({
      commands: z.number().int().nonnegative().optional(),
      durationMs: z.number().int().nonnegative().optional(),
    })
    .optional(),
});

export const eventSchema = z.object({
  type: z.string().min(1),
  timestamp: z.string().datetime().optional(),
  blockId: z.string().optional(),
  detail: z.record(z.any()).optional(),
});

export const movementSchema = z.object({
  stepIndex: z.number().int().nonnegative(),
  x: z.number().int(),
  y: z.number().int(),
  action: z.string().default('move'),
  timestamp: z.string().datetime().optional(),
});

export const eventBatchSchema = z.object({
  sessionId: z.string().uuid(),
  attempt: attemptPayloadSchema,
  events: z.array(eventSchema).max(500),
  movements: z.array(movementSchema).max(500).optional(),
});

export const analyticsPuzzleParamsSchema = z.object({
  puzzleId: z.string().min(3),
});

export const analyticsReplayParamsSchema = z.object({
  attemptId: z.string().uuid(),
});

export type SessionStartBody = z.infer<typeof sessionStartSchema>;
export type SessionEndBody = z.infer<typeof sessionEndSchema>;
export type EventBatchBody = z.infer<typeof eventBatchSchema>;
export type MovementPayload = z.infer<typeof movementSchema>;
export type EventPayload = z.infer<typeof eventSchema>;
export type AttemptPayload = z.infer<typeof attemptPayloadSchema>;
