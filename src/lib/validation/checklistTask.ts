import { z } from 'zod';
import { TaskPriority, TaskStatus } from '@prisma/client';
import { commonSchemas } from '@/lib/validation';

export const createChecklistTaskSchema = z
  .object({
    title: z.string().trim().min(1, 'Task title is required').max(150),
    category: z.string().trim().min(1, 'Category is required').max(100),
    dueDate: commonSchemas.dateString.optional().nullable(),
    priority: z.nativeEnum(TaskPriority).optional(),
    status: z.nativeEnum(TaskStatus).optional(),
    assignedTo: z.string().trim().max(100).optional().nullable(),
    notes: z.string().trim().max(2000).optional().nullable(),
  })
  .strict({ message: 'Payload contains unmodifiable or forbidden fields' });

export type CreateChecklistTaskInput = z.infer<typeof createChecklistTaskSchema>;

export const updateChecklistTaskSchema = z
  .object({
    title: z.string().trim().min(1, 'Task title cannot be empty').max(150).optional(),
    category: z.string().trim().min(1, 'Category cannot be empty').max(100).optional(),
    dueDate: commonSchemas.dateString.optional().nullable(),
    priority: z.nativeEnum(TaskPriority).optional(),
    status: z.nativeEnum(TaskStatus).optional(),
    assignedTo: z.string().trim().max(100).optional().nullable(),
    notes: z.string().trim().max(2000).optional().nullable(),
  })
  .strict({ message: 'Payload contains unmodifiable or forbidden fields' });

export type UpdateChecklistTaskInput = z.infer<typeof updateChecklistTaskSchema>;
