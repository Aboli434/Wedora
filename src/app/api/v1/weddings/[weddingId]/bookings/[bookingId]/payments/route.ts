import { NextRequest } from 'next/server';
import { UserRole } from '@prisma/client';
import { requireRole } from '@/lib/auth';
import { apiResponse } from '@/lib/apiResponse';
import { validateData } from '@/lib/validation';
import { createPaymentSchema } from '@/lib/validation/payment';
import { paymentService } from '@/lib/services/payment.service';
import { ForbiddenError, ValidationError } from '@/lib/errors';

interface RouteContext {
  params: Promise<{
    weddingId: string;
    bookingId: string;
  }>;
}

/**
 * GET /api/v1/weddings/[weddingId]/bookings/[bookingId]/payments
 * Lists all payment milestones for a specific booking owned by the authenticated client.
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireRole(UserRole.CLIENT);

    if (!user.clientProfile) {
      throw new ForbiddenError('Client profile is required to access payments');
    }

    const { weddingId, bookingId } = await context.params;

    const payments = await paymentService.listPaymentsForBooking({
      bookingId,
      weddingId,
      userId: user.id,
      userRole: user.role,
      clientProfileId: user.clientProfile.id,
    });

    return apiResponse.success(payments);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}

/**
 * POST /api/v1/weddings/[weddingId]/bookings/[bookingId]/payments
 * Creates a new payment milestone for a specific booking owned by the authenticated client.
 */
export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireRole(UserRole.CLIENT);

    if (!user.clientProfile) {
      throw new ForbiddenError('Client profile is required to create a payment milestone');
    }

    const { weddingId, bookingId } = await context.params;

    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      throw new ValidationError('Invalid JSON body');
    }

    const input = validateData(createPaymentSchema, rawBody);
    const createdPayment = await paymentService.createPaymentForBooking({
      bookingId,
      weddingId,
      userId: user.id,
      userRole: user.role,
      clientProfileId: user.clientProfile.id,
      input,
    });

    return apiResponse.success(createdPayment, 201, 'Payment milestone created successfully');
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
