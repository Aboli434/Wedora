import { NextRequest } from 'next/server';
import { UserRole } from '@prisma/client';
import { requireRole } from '@/lib/auth';
import { apiResponse } from '@/lib/apiResponse';
import { validateData } from '@/lib/validation';
import { updateChecklistTaskSchema } from '@/lib/validation/checklistTask';
import { checklistTaskService } from '@/lib/services/checklistTask.service';
import { ForbiddenError, ValidationError } from '@/lib/errors';

interface RouteContext {
  params: Promise<{
    weddingId: string;
    taskId: string;
  }>;
}

/**
 * GET /api/v1/weddings/[weddingId]/checklist/[taskId]
 * Retrieves a specific checklist task for a client-owned wedding.
 * Returns 404 if not found or if wedding/task belongs to another user.
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireRole(UserRole.CLIENT);

    if (!user.clientProfile) {
      throw new ForbiddenError('Client profile is required to access checklist tasks');
    }

    const { weddingId, taskId } = await context.params;

    const task = await checklistTaskService.getChecklistTaskForClientWedding({
      weddingId,
      taskId,
      clientProfileId: user.clientProfile.id,
    });

    return apiResponse.success(task);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}

/**
 * PATCH /api/v1/weddings/[weddingId]/checklist/[taskId]
 * Updates a specific checklist task for a client-owned wedding.
 * Returns 404 if not found or if wedding/task belongs to another user.
 */
export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireRole(UserRole.CLIENT);

    if (!user.clientProfile) {
      throw new ForbiddenError('Client profile is required to update a task');
    }

    const { weddingId, taskId } = await context.params;

    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      throw new ValidationError('Invalid JSON body');
    }

    const input = validateData(updateChecklistTaskSchema, rawBody);
    const updatedTask = await checklistTaskService.updateChecklistTaskForClientWedding({
      weddingId,
      taskId,
      clientProfileId: user.clientProfile.id,
      input,
    });

    return apiResponse.success(updatedTask, 200, 'Checklist task updated successfully');
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
