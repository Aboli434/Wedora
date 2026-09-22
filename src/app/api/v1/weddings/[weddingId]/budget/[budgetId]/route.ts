import { NextRequest } from 'next/server';
import { UserRole } from '@prisma/client';
import { requireRole } from '@/lib/auth';
import { apiResponse } from '@/lib/apiResponse';
import { validateData } from '@/lib/validation';
import { updateBudgetSchema } from '@/lib/validation/budget';
import { budgetService } from '@/lib/services/budget.service';
import { ForbiddenError, ValidationError } from '@/lib/errors';

interface RouteContext {
  params: Promise<{
    weddingId: string;
    budgetId: string;
  }>;
}

/**
 * GET /api/v1/weddings/[weddingId]/budget/[budgetId]
 * Fetches a specific budget category allocation for a client-owned wedding.
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireRole(UserRole.CLIENT);

    if (!user.clientProfile) {
      throw new ForbiddenError('Client profile is required to access budget allocation');
    }

    const { weddingId, budgetId } = await context.params;

    const budget = await budgetService.getBudgetForClientWedding({
      weddingId,
      budgetId,
      clientProfileId: user.clientProfile.id,
    });

    return apiResponse.success(budget);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}

/**
 * PATCH /api/v1/weddings/[weddingId]/budget/[budgetId]
 * Updates a specific budget category allocation for a client-owned wedding.
 */
export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireRole(UserRole.CLIENT);

    if (!user.clientProfile) {
      throw new ForbiddenError('Client profile is required to update budget allocation');
    }

    const { weddingId, budgetId } = await context.params;

    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      throw new ValidationError('Invalid JSON body');
    }

    const input = validateData(updateBudgetSchema, rawBody);
    const updatedBudget = await budgetService.updateBudgetForClientWedding({
      weddingId,
      budgetId,
      clientProfileId: user.clientProfile.id,
      input,
    });

    return apiResponse.success(updatedBudget, 200, 'Budget category allocation updated successfully');
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
