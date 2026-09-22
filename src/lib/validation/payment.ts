import { z } from 'zod';
import { PaymentStatus } from '@prisma/client';
import { commonSchemas } from '@/lib/validation';

export const createPaymentSchema = z
  .object({
    invoiceId: z.string().uuid('Invalid invoiceId format').optional().nullable(),
    amount: commonSchemas.rupeesAmount,
    dueDate: commonSchemas.dateString,
    status: z
      .nativeEnum(PaymentStatus, {
        errorMap: () => ({ message: 'Invalid payment status enum value' }),
      })
      .optional(),
    milestoneTitle: z.string().trim().max(150, 'Milestone title cannot exceed 150 characters').optional().nullable(),
  })
  .strict({ message: 'Payload contains unmodifiable or forbidden fields' });

export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;

export const updatePaymentSchema = z
  .object({
    invoiceId: z.string().uuid('Invalid invoiceId format').optional().nullable(),
    amount: commonSchemas.rupeesAmount.optional(),
    dueDate: commonSchemas.dateString.optional(),
    status: z
      .nativeEnum(PaymentStatus, {
        errorMap: () => ({ message: 'Invalid payment status enum value' }),
      })
      .optional(),
    milestoneTitle: z.string().trim().max(150, 'Milestone title cannot exceed 150 characters').optional().nullable(),
  })
  .strict({ message: 'Payload contains unmodifiable or forbidden fields' });

export type UpdatePaymentInput = z.infer<typeof updatePaymentSchema>;
