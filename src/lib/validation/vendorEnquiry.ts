import { z } from 'zod';
import { EnquiryStatus } from '@prisma/client';
import { commonSchemas } from '@/lib/validation';

export const createVendorEnquirySchema = z
  .object({
    vendorId: z.string().uuid('Invalid vendorId format').optional(),
    vendorSlug: z.string().trim().optional(),
    eventDate: commonSchemas.dateString,
    guestCount: z
      .number()
      .int('Guest count must be an integer')
      .min(0, 'Guest count cannot be negative')
      .optional()
      .nullable(),
    estimatedBudget: commonSchemas.rupeesAmount.optional().nullable(),
    message: z.string().trim().min(1, 'Message is required').max(3000),
  })
  .strict({ message: 'Payload contains unmodifiable or forbidden fields' })
  .refine((data) => Boolean(data.vendorId || data.vendorSlug), {
    message: 'Either vendorId or vendorSlug must be provided',
  });

export type CreateVendorEnquiryInput = z.infer<typeof createVendorEnquirySchema>;

export const updateVendorEnquirySchema = z
  .object({
    eventDate: commonSchemas.dateString.optional(),
    guestCount: z
      .number()
      .int('Guest count must be an integer')
      .min(0, 'Guest count cannot be negative')
      .optional()
      .nullable(),
    estimatedBudget: commonSchemas.rupeesAmount.optional().nullable(),
    status: z
      .nativeEnum(EnquiryStatus, {
        errorMap: () => ({ message: 'Invalid enquiry status enum value' }),
      })
      .optional(),
    message: z.string().trim().min(1, 'Message cannot be empty').max(3000).optional(),
  })
  .strict({ message: 'Payload contains unmodifiable or forbidden fields' });

export type UpdateVendorEnquiryInput = z.infer<typeof updateVendorEnquirySchema>;
