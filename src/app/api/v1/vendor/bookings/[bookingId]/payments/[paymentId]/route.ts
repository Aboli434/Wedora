import { NextRequest } from 'next/server';
import { UserRole } from '@prisma/client';
import { requireRole } from '@/lib/auth';
import { apiResponse } from '@/lib/apiResponse';
import { validateData } from '@/lib/validation';
import { updatePaymentSchema } from '@/lib/validation/payment';
import { paymentService } from '@/lib/services/payment.service';
import { ForbiddenError, ValidationError } from '@/lib/errors';

interface RouteContext {
  params: Promise<{
    bookingId: string;
    paymentId: string;
  }>;
}

/**
 * GET /api/v1/vendor/bookings/[bookingId]/payments/[paymentId]
 * Fetches a single payment milestone for a booking received by the authenticated vendor.
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireRole(UserRole.VENDOR);

    if (!user.id) {
      throw new ForbiddenError('Vendor user identification failed');
    }

    const { bookingId, paymentId } = await context.params;

    const payment = await paymentService.getPaymentForBooking({
      bookingId,
      paymentId,
      userId: user.id,
      userRole: user.role,
    });

    return apiResponse.success(payment);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}

/**
 * PATCH /api/v1/vendor/bookings/[bookingId]/payments/[paymentId]
 * Updates a single payment milestone for a booking received by the authenticated vendor.
 */
export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireRole(UserRole.VENDOR);

    if (!user.id) {
      throw new ForbiddenError('Vendor user identification failed');
    }

    const { bookingId, paymentId } = await context.params;

    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      throw new ValidationError('Invalid JSON body');
    }

    const input = validateData(updatePaymentSchema, rawBody);
    const updatedPayment = await paymentService.updatePaymentForBooking({
      bookingId,
      paymentId,
      userId: user.id,
      userRole: user.role,
      input,
    });

    return apiResponse.success(updatedPayment, 200, 'Payment milestone updated successfully');
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
