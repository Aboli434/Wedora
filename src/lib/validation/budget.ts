import { z } from 'zod';
import { CategoryType, PaymentStatus } from '@prisma/client';
import { commonSchemas } from '@/lib/validation';

export const createBudgetSchema = z
  .object({
    category: z.nativeEnum(CategoryType, {
      errorMap: () => ({ message: 'Invalid category enum value' }),
    }),
    allocatedAmount: commonSchemas.rupeesAmount.optional(),
    spentAmount: commonSchemas.rupeesAmount.optional(),
    notes: z.string().trim().max(2000).optional().nullable(),
  })
  .strict({ message: 'Payload contains unmodifiable or forbidden fields' });

export type CreateBudgetInput = z.infer<typeof createBudgetSchema>;

export const updateBudgetSchema = z
  .object({
    category: z
      .nativeEnum(CategoryType, {
        errorMap: () => ({ message: 'Invalid category enum value' }),
      })
      .optional(),
    allocatedAmount: commonSchemas.rupeesAmount.optional(),
    spentAmount: commonSchemas.rupeesAmount.optional(),
    notes: z.string().trim().max(2000).optional().nullable(),
  })
  .strict({ message: 'Payload contains unmodifiable or forbidden fields' });

export type UpdateBudgetInput = z.infer<typeof updateBudgetSchema>;

export const createExpenseSchema = z
  .object({
    budgetId: z.string().uuid('Invalid budgetId').optional().nullable(),
    vendorName: z.string().trim().min(1, 'Vendor name is required').max(150),
    category: z.nativeEnum(CategoryType, {
      errorMap: () => ({ message: 'Invalid category enum value' }),
    }),
    amount: commonSchemas.rupeesAmount,
    paidAmount: commonSchemas.rupeesAmount.optional(),
    paymentDueDate: commonSchemas.dateString.optional().nullable(),
    status: z
      .nativeEnum(PaymentStatus, {
        errorMap: () => ({ message: 'Invalid payment status enum value' }),
      })
      .optional(),
    notes: z.string().trim().max(2000).optional().nullable(),
  })
  .strict({ message: 'Payload contains unmodifiable or forbidden fields' });

export type CreateExpenseInput = z.infer<typeof createExpenseSchema>;

export const updateExpenseSchema = z
  .object({
    budgetId: z.string().uuid('Invalid budgetId').optional().nullable(),
    vendorName: z.string().trim().min(1, 'Vendor name cannot be empty').max(150).optional(),
    category: z
      .nativeEnum(CategoryType, {
        errorMap: () => ({ message: 'Invalid category enum value' }),
      })
      .optional(),
    amount: commonSchemas.rupeesAmount.optional(),
    paidAmount: commonSchemas.rupeesAmount.optional(),
    paymentDueDate: commonSchemas.dateString.optional().nullable(),
    status: z
      .nativeEnum(PaymentStatus, {
        errorMap: () => ({ message: 'Invalid payment status enum value' }),
      })
      .optional(),
    notes: z.string().trim().max(2000).optional().nullable(),
  })
  .strict({ message: 'Payload contains unmodifiable or forbidden fields' });

export type UpdateExpenseInput = z.infer<typeof updateExpenseSchema>;
