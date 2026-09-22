import { z } from 'zod';
import { commonSchemas } from '@/lib/validation';

export const createVendorAvailabilitySchema = z
  .object({
    date: commonSchemas.dateString,
    isAvailable: z.boolean().optional(),
    notes: z.string().trim().max(1000).optional().nullable(),
  })
  .strict({ message: 'Payload contains unmodifiable or forbidden fields' });

export type CreateVendorAvailabilityInput = z.infer<typeof createVendorAvailabilitySchema>;

export const updateVendorAvailabilitySchema = z
  .object({
    date: commonSchemas.dateString.optional(),
    isAvailable: z.boolean().optional(),
    notes: z.string().trim().max(1000).optional().nullable(),
  })
  .strict({ message: 'Payload contains unmodifiable or forbidden fields' });

export type UpdateVendorAvailabilityInput = z.infer<typeof updateVendorAvailabilitySchema>;

export const vendorAvailabilityQuerySchema = z.object({
  startDate: commonSchemas.dateString.optional(),
  endDate: commonSchemas.dateString.optional(),
  isAvailable: z
    .preprocess((val) => {
      if (val === 'true') return true;
      if (val === 'false') return false;
      return val;
    }, z.boolean())
    .optional(),
});

export interface VendorAvailabilityQueryInput {
  startDate?: string;
  endDate?: string;
  isAvailable?: boolean;
}
