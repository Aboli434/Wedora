import { NextRequest } from 'next/server';
import { UserRole } from '@prisma/client';
import { requireRole } from '@/lib/auth';
import { apiResponse } from '@/lib/apiResponse';
import { validateData } from '@/lib/validation';
import { updateBookingSchema } from '@/lib/validation/booking';
import { bookingService } from '@/lib/services/booking.service';
import { ForbiddenError, ValidationError } from '@/lib/errors';

interface RouteContext {
  params: Promise<{ bookingId: string }>;
}

/**
 * GET /api/v1/vendor/bookings/[bookingId]
 * Fetches a specific booking received by the authenticated vendor.
 * Returns 404 if missing or if received by another vendor.
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireRole(UserRole.VENDOR);

    if (!user.id) {
      throw new ForbiddenError('Vendor user identification failed');
    }

    const { bookingId } = await context.params;

    const booking = await bookingService.getBookingForCurrentVendor({
      userId: user.id,
      bookingId,
    });

    return apiResponse.success(booking);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}

/**
 * PATCH /api/v1/vendor/bookings/[bookingId]
 * Updates a specific booking received by the authenticated vendor (status, notes, etc.).
 * Returns 404 if missing or if received by another vendor.
 */
export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireRole(UserRole.VENDOR);

    if (!user.id) {
      throw new ForbiddenError('Vendor user identification failed');
    }

    const { bookingId } = await context.params;

    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      throw new ValidationError('Invalid JSON body');
    }

    const input = validateData(updateBookingSchema, rawBody);
    const updatedBooking = await bookingService.updateBookingForCurrentVendor({
      userId: user.id,
      bookingId,
      input,
    });

    return apiResponse.success(updatedBooking, 200, 'Booking updated successfully');
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
