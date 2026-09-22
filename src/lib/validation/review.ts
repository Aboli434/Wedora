import { z } from 'zod';
import { ReviewStatus } from '@prisma/client';

export const createReviewSchema = z
  .object({
    rating: z
      .number({ invalid_type_error: 'Rating must be a number' })
      .int('Rating must be an integer')
      .min(1, 'Rating must be at least 1')
      .max(5, 'Rating cannot exceed 5'),
    title: z.string().trim().max(150, 'Title cannot exceed 150 characters').optional().nullable(),
    comment: z
      .string()
      .trim()
      .min(5, 'Comment must be at least 5 characters long')
      .max(3000, 'Comment cannot exceed 3000 characters'),
    status: z
      .nativeEnum(ReviewStatus, {
        errorMap: () => ({ message: 'Invalid review status enum value' }),
      })
      .optional(),
  })
  .strict({ message: 'Payload contains unmodifiable or forbidden fields' });

export type CreateReviewInput = z.infer<typeof createReviewSchema>;

export const updateReviewSchema = z
  .object({
    rating: z
      .number({ invalid_type_error: 'Rating must be a number' })
      .int('Rating must be an integer')
      .min(1, 'Rating must be at least 1')
      .max(5, 'Rating cannot exceed 5')
      .optional(),
    title: z.string().trim().max(150, 'Title cannot exceed 150 characters').optional().nullable(),
    comment: z
      .string()
      .trim()
      .min(5, 'Comment must be at least 5 characters long')
      .max(3000, 'Comment cannot exceed 3000 characters')
      .optional(),
    status: z
      .nativeEnum(ReviewStatus, {
        errorMap: () => ({ message: 'Invalid review status enum value' }),
      })
      .optional(),
  })
  .strict({ message: 'Payload contains unmodifiable or forbidden fields' });

export type UpdateReviewInput = z.infer<typeof updateReviewSchema>;
