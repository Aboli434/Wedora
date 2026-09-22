import { z } from 'zod';
import { commonSchemas } from '@/lib/validation';

export const createBookingServiceSchema = z
  .object({
    vendorServiceId: z.string().uuid('Invalid vendorServiceId format').optional().nullable(),
    serviceName: z.string().trim().min(1, 'Service name is required').max(150),
    unitPrice: commonSchemas.rupeesAmount,
    quantity: z
      .number()
      .int('Quantity must be an integer')
      .min(1, 'Quantity must be at least 1')
      .optional()
      .default(1),
  })
  .strict({ message: 'Payload contains unmodifiable or forbidden fields' });

export interface CreateBookingServiceInput {
  vendorServiceId?: string | null;
  serviceName: string;
  unitPrice: string | number;
  quantity?: number;
}

export const updateBookingServiceSchema = z
  .object({
    serviceName: z.string().trim().min(1, 'Service name cannot be empty').max(150).optional(),
    unitPrice: commonSchemas.rupeesAmount.optional(),
    quantity: z
      .number()
      .int('Quantity must be an integer')
      .min(1, 'Quantity must be at least 1')
      .optional(),
  })
  .strict({ message: 'Payload contains unmodifiable or forbidden fields' });

export type UpdateBookingServiceInput = z.infer<typeof updateBookingServiceSchema>;
