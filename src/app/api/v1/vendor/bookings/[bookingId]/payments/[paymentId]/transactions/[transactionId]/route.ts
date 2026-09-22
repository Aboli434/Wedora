import { NextRequest } from 'next/server';
import { UserRole } from '@prisma/client';
import { requireRole } from '@/lib/auth';
import { apiResponse } from '@/lib/apiResponse';
import { paymentTransactionService } from '@/lib/services/paymentTransaction.service';
import { ForbiddenError } from '@/lib/errors';

interface RouteContext {
  params: Promise<{
    bookingId: string;
    paymentId: string;
    transactionId: string;
  }>;
}

/**
 * GET /api/v1/vendor/bookings/[bookingId]/payments/[paymentId]/transactions/[transactionId]
 * Fetches a single payment transaction by ID (vendor-received booking).
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireRole(UserRole.VENDOR);

    if (!user.id) {
      throw new ForbiddenError('Vendor user identification failed');
    }

    const { bookingId, paymentId, transactionId } = await context.params;

    const transaction = await paymentTransactionService.getTransactionForPayment({
      bookingId,
      paymentId,
      transactionId,
      userId: user.id,
      userRole: user.role,
    });

    return apiResponse.success(transaction);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
