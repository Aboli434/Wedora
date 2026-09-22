import { NextRequest } from 'next/server';
import { UserRole } from '@prisma/client';
import { requireRole } from '@/lib/auth';
import { apiResponse } from '@/lib/apiResponse';
import { paymentTransactionService } from '@/lib/services/paymentTransaction.service';
import { ForbiddenError } from '@/lib/errors';

interface RouteContext {
  params: Promise<{
    weddingId: string;
    bookingId: string;
    paymentId: string;
    transactionId: string;
  }>;
}

/**
 * GET /api/v1/weddings/[weddingId]/bookings/[bookingId]/payments/[paymentId]/transactions/[transactionId]
 * Fetches a single payment transaction by ID (client-owned booking).
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireRole(UserRole.CLIENT);

    if (!user.clientProfile) {
      throw new ForbiddenError('Client profile is required to access payment transaction');
    }

    const { bookingId, paymentId, transactionId } = await context.params;

    const transaction = await paymentTransactionService.getTransactionForPayment({
      bookingId,
      paymentId,
      transactionId,
      userId: user.id,
      userRole: user.role,
      clientProfileId: user.clientProfile.id,
    });

    return apiResponse.success(transaction);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
