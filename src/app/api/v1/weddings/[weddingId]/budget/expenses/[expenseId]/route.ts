import { NextRequest } from 'next/server';
import { UserRole } from '@prisma/client';
import { requireRole } from '@/lib/auth';
import { apiResponse } from '@/lib/apiResponse';
import { validateData } from '@/lib/validation';
import { updateExpenseSchema } from '@/lib/validation/budget';
import { budgetService } from '@/lib/services/budget.service';
import { ForbiddenError, ValidationError } from '@/lib/errors';

interface RouteContext {
  params: Promise<{
    weddingId: string;
    expenseId: string;
  }>;
}

/**
 * GET /api/v1/weddings/[weddingId]/budget/expenses/[expenseId]
 * Retrieves a specific expense line item for a client-owned wedding.
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireRole(UserRole.CLIENT);

    if (!user.clientProfile) {
      throw new ForbiddenError('Client profile is required to access expense');
    }

    const { weddingId, expenseId } = await context.params;

    const expense = await budgetService.getExpenseForClientWedding({
      weddingId,
      expenseId,
      clientProfileId: user.clientProfile.id,
    });

    return apiResponse.success(expense);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}

/**
 * PATCH /api/v1/weddings/[weddingId]/budget/expenses/[expenseId]
 * Updates a specific expense line item for a client-owned wedding.
 */
export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireRole(UserRole.CLIENT);

    if (!user.clientProfile) {
      throw new ForbiddenError('Client profile is required to update expense');
    }

    const { weddingId, expenseId } = await context.params;

    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      throw new ValidationError('Invalid JSON body');
    }

    const input = validateData(updateExpenseSchema, rawBody);
    const updatedExpense = await budgetService.updateExpenseForClientWedding({
      weddingId,
      expenseId,
      clientProfileId: user.clientProfile.id,
      input,
    });

    return apiResponse.success(updatedExpense, 200, 'Expense line item updated successfully');
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
