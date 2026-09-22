import { NextRequest } from 'next/server';
import { UserRole } from '@prisma/client';
import { requireRole } from '@/lib/auth';
import { apiResponse } from '@/lib/apiResponse';
import { validateData } from '@/lib/validation';
import { createBudgetSchema } from '@/lib/validation/budget';
import { budgetService } from '@/lib/services/budget.service';
import { ForbiddenError, ValidationError } from '@/lib/errors';

interface RouteContext {
  params: Promise<{ weddingId: string }>;
}

/**
 * GET /api/v1/weddings/[weddingId]/budget
 * Fetches all budget category allocations and calculated totals summary for a client-owned wedding.
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireRole(UserRole.CLIENT);

    if (!user.clientProfile) {
      throw new ForbiddenError('Client profile is required to access budget');
    }

    const { weddingId } = await context.params;

    const data = await budgetService.getBudgetSummaryForClientWedding({
      weddingId,
      clientProfileId: user.clientProfile.id,
    });

    return apiResponse.success(data);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}

/**
 * POST /api/v1/weddings/[weddingId]/budget
 * Creates a new budget category allocation for a client-owned wedding.
 */
export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireRole(UserRole.CLIENT);

    if (!user.clientProfile) {
      throw new ForbiddenError('Client profile is required to create a budget allocation');
    }

    const { weddingId } = await context.params;

    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      throw new ValidationError('Invalid JSON body');
    }

    const input = validateData(createBudgetSchema, rawBody);
    const createdBudget = await budgetService.createBudgetForClientWedding({
      weddingId,
      clientProfileId: user.clientProfile.id,
      input,
    });

    return apiResponse.success(createdBudget, 201, 'Budget category allocation created successfully');
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
