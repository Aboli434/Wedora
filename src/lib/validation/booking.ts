import { z } from 'zod';
import { BookingStatus } from '@prisma/client';
import { commonSchemas } from '@/lib/validation';

export const createBookingSchema = z
  .object({
    vendorId: z.string().uuid('Invalid vendorId format').optional(),
    vendorSlug: z.string().trim().optional(),
    weddingVendorId: z.string().uuid('Invalid weddingVendorId format').optional().nullable(),
    enquiryId: z.string().uuid('Invalid enquiryId format').optional().nullable(),
    status: z
      .nativeEnum(BookingStatus, {
        errorMap: () => ({ message: 'Invalid booking status enum value' }),
      })
      .optional(),
    totalAmount: commonSchemas.rupeesAmount,
    advanceAmount: commonSchemas.rupeesAmount.optional(),
    notes: z.string().trim().max(3000).optional().nullable(),
  })
  .strict({ message: 'Payload contains unmodifiable or forbidden fields' });

export type CreateBookingInput = z.infer<typeof createBookingSchema>;

export const updateBookingSchema = z
  .object({
    status: z
      .nativeEnum(BookingStatus, {
        errorMap: () => ({ message: 'Invalid booking status enum value' }),
      })
      .optional(),
    totalAmount: commonSchemas.rupeesAmount.optional(),
    advanceAmount: commonSchemas.rupeesAmount.optional(),
    notes: z.string().trim().max(3000).optional().nullable(),
  })
  .strict({ message: 'Payload contains unmodifiable or forbidden fields' });

export type UpdateBookingInput = z.infer<typeof updateBookingSchema>;
