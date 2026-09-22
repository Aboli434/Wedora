import { z } from 'zod';
import { PaymentMethod, TransactionType } from '@prisma/client';
import { commonSchemas } from '@/lib/validation';

export const createPaymentTransactionSchema = z
  .object({
    transactionRef: z.string().trim().max(100, 'Transaction reference too long').optional(),
    amount: commonSchemas.rupeesAmount,
    paymentMethod: z.nativeEnum(PaymentMethod, {
      errorMap: () => ({ message: 'Invalid payment method' }),
    }),
    type: z
      .nativeEnum(TransactionType, {
        errorMap: () => ({ message: 'Invalid transaction type' }),
      })
      .optional(),
    gatewayProvider: z.string().trim().max(100, 'Gateway provider too long').optional().nullable(),
    gatewayTransactionId: z.string().trim().max(100, 'Gateway transaction ID too long').optional().nullable(),
    notes: z.string().trim().max(1000, 'Notes too long').optional().nullable(),
  })
  .strict({ message: 'Payload contains unmodifiable or forbidden fields' });

export type CreatePaymentTransactionInput = z.infer<typeof createPaymentTransactionSchema>;
