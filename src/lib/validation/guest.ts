import { z } from 'zod';
import { AttendanceStatus } from '@prisma/client';

export const createGuestSchema = z
  .object({
    name: z.string().trim().min(1, 'Guest name is required').max(100),
    email: z.string().trim().email('Invalid email address').optional().nullable().or(z.literal('')),
    phone: z.string().trim().max(20).optional().nullable(),
    rsvpStatus: z.nativeEnum(AttendanceStatus).optional(),
    plusOne: z.boolean().optional(),
    plusOneName: z.string().trim().max(100).optional().nullable(),
    dietaryRestrictions: z.string().trim().max(500).optional().nullable(),
    group: z.string().trim().max(50).optional().nullable(),
    tableNumber: z.string().trim().max(50).optional().nullable(),
  })
  .strict({ message: 'Payload contains unmodifiable or forbidden fields' });

export type CreateGuestInput = z.infer<typeof createGuestSchema>;

export const updateGuestSchema = z
  .object({
    name: z.string().trim().min(1, 'Guest name cannot be empty').max(100).optional(),
    email: z.string().trim().email('Invalid email address').optional().nullable().or(z.literal('')),
    phone: z.string().trim().max(20).optional().nullable(),
    rsvpStatus: z.nativeEnum(AttendanceStatus).optional(),
    plusOne: z.boolean().optional(),
    plusOneName: z.string().trim().max(100).optional().nullable(),
    dietaryRestrictions: z.string().trim().max(500).optional().nullable(),
    group: z.string().trim().max(50).optional().nullable(),
    tableNumber: z.string().trim().max(50).optional().nullable(),
  })
  .strict({ message: 'Payload contains unmodifiable or forbidden fields' });

export type UpdateGuestInput = z.infer<typeof updateGuestSchema>;
