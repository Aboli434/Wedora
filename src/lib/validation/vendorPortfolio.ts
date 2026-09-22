import { z } from 'zod';
import { PortfolioMediaType } from '@prisma/client';
import { commonSchemas } from '@/lib/validation';

export const createVendorPortfolioItemSchema = z
  .object({
    title: z.string().trim().min(1, 'Title is required').max(150),
    description: z.string().trim().max(3000).optional().nullable(),
    coverUrl: z.string().trim().url('Invalid cover URL'),
    images: z.unknown().optional().nullable(),
    tags: z.unknown().optional().nullable(),
    eventDate: commonSchemas.dateString.optional().nullable(),
  })
  .strict({ message: 'Payload contains unmodifiable or forbidden fields' });

export type CreateVendorPortfolioItemInput = z.infer<typeof createVendorPortfolioItemSchema>;

export const updateVendorPortfolioItemSchema = z
  .object({
    title: z.string().trim().min(1, 'Title cannot be empty').max(150).optional(),
    description: z.string().trim().max(3000).optional().nullable(),
    coverUrl: z.string().trim().url('Invalid cover URL').optional(),
    images: z.unknown().optional().nullable(),
    tags: z.unknown().optional().nullable(),
    eventDate: commonSchemas.dateString.optional().nullable(),
  })
  .strict({ message: 'Payload contains unmodifiable or forbidden fields' });

export type UpdateVendorPortfolioItemInput = z.infer<typeof updateVendorPortfolioItemSchema>;

export const createMediaAssetSchema = z
  .object({
    url: z.string().trim().url('Invalid media URL'),
    type: z
      .nativeEnum(PortfolioMediaType, {
        errorMap: () => ({ message: 'Invalid media type enum value' }),
      })
      .optional(),
    caption: z.string().trim().max(1000).optional().nullable(),
    sortOrder: z
      .number()
      .int('Sort order must be an integer')
      .min(0, 'Sort order cannot be negative')
      .optional(),
  })
  .strict({ message: 'Payload contains unmodifiable or forbidden fields' });

export type CreateMediaAssetInput = z.infer<typeof createMediaAssetSchema>;

export const updateMediaAssetSchema = z
  .object({
    url: z.string().trim().url('Invalid media URL').optional(),
    type: z
      .nativeEnum(PortfolioMediaType, {
        errorMap: () => ({ message: 'Invalid media type enum value' }),
      })
      .optional(),
    caption: z.string().trim().max(1000).optional().nullable(),
    sortOrder: z
      .number()
      .int('Sort order must be an integer')
      .min(0, 'Sort order cannot be negative')
      .optional(),
  })
  .strict({ message: 'Payload contains unmodifiable or forbidden fields' });

export type UpdateMediaAssetInput = z.infer<typeof updateMediaAssetSchema>;
