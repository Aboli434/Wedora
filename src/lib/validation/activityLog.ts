import { z } from 'zod';

export const queryActivityLogSchema = z.object({
  page: z.number().int().min(1).optional(),
  pageSize: z.number().int().min(1).max(100).optional(),
});

export type QueryActivityLogInput = z.infer<typeof queryActivityLogSchema>;
