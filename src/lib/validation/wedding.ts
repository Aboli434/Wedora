import { z } from 'zod';
import { commonSchemas } from '@/lib/validation';

export const createWeddingSchema = z
  .object({
    partner1Name: z.string().trim().min(1, 'Partner 1 name is required').max(100),
    partner2Name: z.string().trim().min(1, 'Partner 2 name is required').max(100),
    title: z.string().trim().min(1, 'Wedding title is required').max(150),
    weddingDate: commonSchemas.dateString,
    location: z.string().trim().min(1, 'Location is required').max(150),
    totalBudget: commonSchemas.rupeesAmount,
    status: z.string().trim().max(50).optional(),
  })
  .strict({ message: 'Payload contains unmodifiable or forbidden fields' });

export type CreateWeddingInput = z.infer<typeof createWeddingSchema>;

export const updateWeddingSchema = z
  .object({
    partner1Name: z.string().trim().min(1, 'Partner 1 name cannot be empty').max(100).optional(),
    partner2Name: z.string().trim().min(1, 'Partner 2 name cannot be empty').max(100).optional(),
    title: z.string().trim().min(1, 'Wedding title cannot be empty').max(150).optional(),
    weddingDate: commonSchemas.dateString.optional(),
    location: z.string().trim().min(1, 'Location cannot be empty').max(150).optional(),
    totalBudget: commonSchemas.rupeesAmount.optional(),
    status: z.string().trim().max(50).optional(),
  })
  .strict({ message: 'Payload contains unmodifiable or forbidden fields' });

export type UpdateWeddingInput = z.infer<typeof updateWeddingSchema>;
