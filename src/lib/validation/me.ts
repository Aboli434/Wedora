import { z } from 'zod';

export const updateMeSchema = z
  .object({
    fullName: z.string().trim().min(1, 'Full name cannot be empty').max(100).optional(),
    avatarUrl: z.string().trim().url('Invalid avatar URL').or(z.literal('')).optional().nullable(),
    phoneNumber: z.string().trim().max(20).optional().nullable(),

    // Client Profile canonical fields
    location: z.string().trim().max(100).optional().nullable(),
    phone: z.string().trim().max(20).optional().nullable(),
    budgetRange: z.string().trim().max(50).optional().nullable(),
    notes: z.string().trim().max(1000).optional().nullable(),

    // Vendor Profile canonical fields
    businessName: z.string().trim().min(1, 'Business name cannot be empty').max(100).optional(),
    city: z.string().trim().max(100).optional().nullable(),
    description: z.string().trim().max(2000).optional().nullable(),
    coverImage: z.string().trim().url('Invalid cover image URL').or(z.literal('')).optional().nullable(),
    experienceYears: z.number().int().min(0).max(100).optional().nullable(),
    teamSize: z.string().trim().max(50).optional().nullable(),
  })
  .strict({ message: 'Payload contains unmodifiable or forbidden fields' });

export type UpdateMeInput = z.infer<typeof updateMeSchema>;
