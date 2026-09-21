import { z } from 'zod';
import { ValidationError } from '@/lib/errors';

/**
 * Validates data against a Zod schema.
 * Throws a formatted ValidationError with detailed issues if validation fails.
 */
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const formattedIssues = result.error.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
      code: issue.code,
    }));
    throw new ValidationError('Validation failed for request data', formattedIssues);
  }
  return result.data;
}

// Common reusable schema primitives for backend API validation
export const commonSchemas = {
  uuid: z.string().uuid('Invalid UUID format'),
  pagination: z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
  }),
  dateString: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
  timeString: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)(:([0-5]\d))?$/, 'Invalid time format (HH:MM or HH:MM:SS)'),
  rupeesAmount: z
    .union([z.string(), z.number()])
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      'Monetary amount must be a non-negative number'
    ),
};
