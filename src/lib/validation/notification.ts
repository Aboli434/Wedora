import { z } from 'zod';

export const updateNotificationSchema = z
  .object({
    isRead: z.boolean({ required_error: 'isRead boolean is required' }),
  })
  .strict({ message: 'Payload contains unmodifiable or forbidden fields' });

export type UpdateNotificationInput = z.infer<typeof updateNotificationSchema>;

export const queryNotificationSchema = z.object({
  isRead: z.boolean().optional(),
  page: z.number().int().min(1).optional(),
  pageSize: z.number().int().min(1).max(100).optional(),
});

export type QueryNotificationInput = z.infer<typeof queryNotificationSchema>;
