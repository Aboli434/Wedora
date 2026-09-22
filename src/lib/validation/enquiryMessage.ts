import { z } from 'zod';

export const createEnquiryMessageSchema = z
  .object({
    message: z.string().trim().min(1, 'Message content is required').max(3000),
  })
  .strict({ message: 'Payload contains unmodifiable or forbidden fields' });

export type CreateEnquiryMessageInput = z.infer<typeof createEnquiryMessageSchema>;
