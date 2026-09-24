import { NextRequest } from 'next/server';
import { UserRole } from '@prisma/client';
import { requireRole } from '@/lib/auth';
import { apiResponse } from '@/lib/apiResponse';
import { validateData } from '@/lib/validation';
import { createPaymentTransactionSchema } from '@/lib/validation/paymentTransaction';
import { paymentTransactionService } from '@/lib/services/paymentTransaction.service';
import { ForbiddenError, ValidationError } from '@/lib/errors';

interface RouteContext {
  params: Promise<{
    weddingId: string;
    bookingId: string;
    paymentId: string;
  }>;
}

/**
 * GET /api/v1/weddings/[weddingId]/bookings/[bookingId]/payments/[paymentId]/transactions
 * Lists all transactions for a payment milestone (client-owned booking).
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireRole(UserRole.CLIENT);

    if (!user.clientProfile) {
      throw new ForbiddenError('Client profile is required to access payment transactions');
    }

    const { weddingId, bookingId, paymentId } = await context.params;

    const transactions = await paymentTransactionService.listTransactionsForPayment({
      bookingId,
      weddingId,
      paymentId,
      userId: user.id,
      userRole: user.role,
      clientProfileId: user.clientProfile.id,
    });

    return apiResponse.success(transactions);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}

/**
 * POST /api/v1/weddings/[weddingId]/bookings/[bookingId]/payments/[paymentId]/transactions
 * Records a new payment transaction against a payment milestone (client-owned booking).
 */
export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireRole(UserRole.CLIENT);

    if (!user.clientProfile) {
      throw new ForbiddenError('Client profile is required to record a payment transaction');
    }

    const { weddingId, bookingId, paymentId } = await context.params;

    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      throw new ValidationError('Invalid JSON body');
    }

    const input = validateData(createPaymentTransactionSchema, rawBody);
    const createdTransaction = await paymentTransactionService.createTransactionForPayment({
      bookingId,
      weddingId,
      paymentId,
      userId: user.id,
      userRole: user.role,
      clientProfileId: user.clientProfile.id,
      input,
    });

    return apiResponse.success(createdTransaction, 201, 'Payment transaction recorded successfully');
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
