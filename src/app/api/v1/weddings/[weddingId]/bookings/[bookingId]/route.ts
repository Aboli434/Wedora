import { NextRequest } from 'next/server';
import { UserRole } from '@prisma/client';
import { requireRole } from '@/lib/auth';
import { apiResponse } from '@/lib/apiResponse';
import { validateData } from '@/lib/validation';
import { updateBookingSchema } from '@/lib/validation/booking';
import { bookingService } from '@/lib/services/booking.service';
import { ForbiddenError, ValidationError } from '@/lib/errors';

interface RouteContext {
  params: Promise<{
    weddingId: string;
    bookingId: string;
  }>;
}

/**
 * GET /api/v1/weddings/[weddingId]/bookings/[bookingId]
 * Fetches a specific booking for a client-owned wedding.
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireRole(UserRole.CLIENT);

    if (!user.clientProfile) {
      throw new ForbiddenError('Client profile is required to access booking');
    }

    const { weddingId, bookingId } = await context.params;

    const booking = await bookingService.getBookingForClientWedding({
      weddingId,
      bookingId,
      clientProfileId: user.clientProfile.id,
    });

    return apiResponse.success(booking);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}

/**
 * PATCH /api/v1/weddings/[weddingId]/bookings/[bookingId]
 * Updates a specific booking for a client-owned wedding.
 */
export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireRole(UserRole.CLIENT);

    if (!user.clientProfile) {
      throw new ForbiddenError('Client profile is required to update booking');
    }

    const { weddingId, bookingId } = await context.params;

    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      throw new ValidationError('Invalid JSON body');
    }

    const input = validateData(updateBookingSchema, rawBody);
    const updatedBooking = await bookingService.updateBookingForClientWedding({
      weddingId,
      bookingId,
      clientProfileId: user.clientProfile.id,
      input,
    });

    return apiResponse.success(updatedBooking, 200, 'Booking updated successfully');
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
