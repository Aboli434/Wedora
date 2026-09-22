import { z } from 'zod';
import { CategoryType } from '@prisma/client';
import { commonSchemas } from '@/lib/validation';

export const updateVendorProfileSchema = z
  .object({
    businessName: z.string().trim().min(1, 'Business name cannot be empty').max(150).optional(),
    slug: z
      .string()
      .trim()
      .min(1, 'Slug cannot be empty')
      .max(150)
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase and URL-safe (e.g. "my-vendor-name")')
      .optional(),
    category: z
      .nativeEnum(CategoryType, {
        errorMap: () => ({ message: 'Invalid category enum value' }),
      })
      .optional(),
    city: z.string().trim().min(1, 'City cannot be empty').max(100).optional(),
    startingPrice: commonSchemas.rupeesAmount.optional(),
    coverImage: z.string().trim().url('Invalid cover image URL').optional().nullable(),
    description: z.string().trim().max(3000).optional().nullable(),
    experienceYears: z
      .number()
      .int('Experience years must be an integer')
      .min(0, 'Experience years cannot be negative')
      .max(100)
      .optional()
      .nullable(),
    teamSize: z.string().trim().max(50).optional().nullable(),
  })
  .strict({ message: 'Payload contains unmodifiable or forbidden fields' });

export type UpdateVendorProfileInput = z.infer<typeof updateVendorProfileSchema>;

export const vendorDirectoryQuerySchema = z.object({
  search: z.string().trim().optional(),
  category: z.nativeEnum(CategoryType).optional(),
  city: z.string().trim().optional(),
  featured: z
    .preprocess((val) => {
      if (val === 'true') return true;
      if (val === 'false') return false;
      return val;
    }, z.boolean())
    .optional(),
  sort: z.enum(['rating', 'price_asc', 'price_desc', 'newest']).default('rating'),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export interface VendorDirectoryQueryInput {
  search?: string;
  category?: CategoryType;
  city?: string;
  featured?: boolean;
  sort: 'rating' | 'price_asc' | 'price_desc' | 'newest';
  page: number;
  limit: number;
}
