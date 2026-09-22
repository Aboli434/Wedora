import { NextRequest } from 'next/server';
import { UserRole } from '@prisma/client';
import { requireRole } from '@/lib/auth';
import { apiResponse } from '@/lib/apiResponse';
import { paymentService } from '@/lib/services/payment.service';
import { ForbiddenError } from '@/lib/errors';

interface RouteContext {
  params: Promise<{
    bookingId: string;
  }>;
}

/**
 * GET /api/v1/vendor/bookings/[bookingId]/payments
 * Lists all payment milestones for a booking received by the authenticated vendor.
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireRole(UserRole.VENDOR);

    if (!user.id) {
      throw new ForbiddenError('Vendor user identification failed');
    }

    const { bookingId } = await context.params;

    const payments = await paymentService.listPaymentsForBooking({
      bookingId,
      userId: user.id,
      userRole: user.role,
    });

    return apiResponse.success(payments);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
