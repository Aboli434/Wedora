import { NextRequest } from 'next/server';
import { UserRole } from '@prisma/client';
import { requireRole } from '@/lib/auth';
import { apiResponse } from '@/lib/apiResponse';
import { validateData } from '@/lib/validation';
import { createChecklistTaskSchema } from '@/lib/validation/checklistTask';
import { checklistTaskService } from '@/lib/services/checklistTask.service';
import { ForbiddenError, ValidationError } from '@/lib/errors';

interface RouteContext {
  params: Promise<{ weddingId: string }>;
}

/**
 * GET /api/v1/weddings/[weddingId]/checklist
 * Lists all checklist tasks for a specific client-owned wedding.
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireRole(UserRole.CLIENT);

    if (!user.clientProfile) {
      throw new ForbiddenError('Client profile is required to access checklist tasks');
    }

    const { weddingId } = await context.params;

    const tasks = await checklistTaskService.listChecklistTasksForClientWedding({
      weddingId,
      clientProfileId: user.clientProfile.id,
    });

    return apiResponse.success(tasks);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}

/**
 * POST /api/v1/weddings/[weddingId]/checklist
 * Creates a new checklist task for a client-owned wedding.
 */
export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireRole(UserRole.CLIENT);

    if (!user.clientProfile) {
      throw new ForbiddenError('Client profile is required to create a task');
    }

    const { weddingId } = await context.params;

    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      throw new ValidationError('Invalid JSON body');
    }

    const input = validateData(createChecklistTaskSchema, rawBody);
    const createdTask = await checklistTaskService.createChecklistTaskForClientWedding({
      weddingId,
      clientProfileId: user.clientProfile.id,
      input,
    });

    return apiResponse.success(createdTask, 201, 'Checklist task created successfully');
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
