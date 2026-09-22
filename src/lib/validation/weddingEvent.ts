import { z } from 'zod';
import { commonSchemas } from '@/lib/validation';

export const createWeddingEventSchema = z
  .object({
    name: z.string().trim().min(1, 'Event name is required').max(100),
    date: commonSchemas.dateString,
    startTime: commonSchemas.timeString.optional().nullable(),
    endTime: commonSchemas.timeString.optional().nullable(),
    timezone: z.string().trim().max(50).optional(),
    venue: z.string().trim().max(150).optional().nullable(),
    address: z.string().trim().max(250).optional().nullable(),
    notes: z.string().trim().max(2000).optional().nullable(),
  })
  .strict({ message: 'Payload contains unmodifiable or forbidden fields' })
  .refine(
    (data) => {
      if (data.startTime && data.endTime) {
        return data.endTime >= data.startTime;
      }
      return true;
    },
    {
      message: 'endTime cannot be earlier than startTime',
      path: ['endTime'],
    }
  );

export type CreateWeddingEventInput = z.infer<typeof createWeddingEventSchema>;

export const updateWeddingEventSchema = z
  .object({
    name: z.string().trim().min(1, 'Event name cannot be empty').max(100).optional(),
    date: commonSchemas.dateString.optional(),
    startTime: commonSchemas.timeString.optional().nullable(),
    endTime: commonSchemas.timeString.optional().nullable(),
    timezone: z.string().trim().max(50).optional(),
    venue: z.string().trim().max(150).optional().nullable(),
    address: z.string().trim().max(250).optional().nullable(),
    notes: z.string().trim().max(2000).optional().nullable(),
  })
  .strict({ message: 'Payload contains unmodifiable or forbidden fields' })
  .refine(
    (data) => {
      if (data.startTime && data.endTime) {
        return data.endTime >= data.startTime;
      }
      return true;
    },
    {
      message: 'endTime cannot be earlier than startTime',
      path: ['endTime'],
    }
  );

export type UpdateWeddingEventInput = z.infer<typeof updateWeddingEventSchema>;
