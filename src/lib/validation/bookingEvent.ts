import { z } from 'zod';
import { commonSchemas } from '@/lib/validation';

export const createBookingEventSchema = z
  .object({
    weddingEventId: z.string().uuid('Invalid weddingEventId format').optional().nullable(),
    eventName: z.string().trim().min(1, 'Event name is required').max(150),
    eventDate: commonSchemas.dateString,
    startTime: commonSchemas.timeString.optional().nullable(),
    endTime: commonSchemas.timeString.optional().nullable(),
    venue: z.string().trim().max(250).optional().nullable(),
  })
  .strict({ message: 'Payload contains unmodifiable or forbidden fields' });

export type CreateBookingEventInput = z.infer<typeof createBookingEventSchema>;

export const updateBookingEventSchema = z
  .object({
    eventName: z.string().trim().min(1, 'Event name cannot be empty').max(150).optional(),
    eventDate: commonSchemas.dateString.optional(),
    startTime: commonSchemas.timeString.optional().nullable(),
    endTime: commonSchemas.timeString.optional().nullable(),
    venue: z.string().trim().max(250).optional().nullable(),
  })
  .strict({ message: 'Payload contains unmodifiable or forbidden fields' });

export type UpdateBookingEventInput = z.infer<typeof updateBookingEventSchema>;
