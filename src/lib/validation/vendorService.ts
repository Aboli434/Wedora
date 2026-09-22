import { z } from 'zod';
import { ServicePricingType } from '@prisma/client';
import { commonSchemas } from '@/lib/validation';

export const createVendorServiceSchema = z
  .object({
    name: z.string().trim().min(1, 'Service name is required').max(150),
    description: z.string().trim().max(3000).optional().nullable(),
    pricingType: z
      .nativeEnum(ServicePricingType, {
        errorMap: () => ({ message: 'Invalid pricingType enum value' }),
      })
      .optional(),
    price: commonSchemas.rupeesAmount,
    isCustomizable: z.boolean().optional(),
    features: z.unknown().optional().nullable(),
  })
  .strict({ message: 'Payload contains unmodifiable or forbidden fields' });

export type CreateVendorServiceInput = z.infer<typeof createVendorServiceSchema>;

export const updateVendorServiceSchema = z
  .object({
    name: z.string().trim().min(1, 'Service name cannot be empty').max(150).optional(),
    description: z.string().trim().max(3000).optional().nullable(),
    pricingType: z
      .nativeEnum(ServicePricingType, {
        errorMap: () => ({ message: 'Invalid pricingType enum value' }),
      })
      .optional(),
    price: commonSchemas.rupeesAmount.optional(),
    isCustomizable: z.boolean().optional(),
    features: z.unknown().optional().nullable(),
  })
  .strict({ message: 'Payload contains unmodifiable or forbidden fields' });

export type UpdateVendorServiceInput = z.infer<typeof updateVendorServiceSchema>;
