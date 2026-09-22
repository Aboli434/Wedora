import { NextRequest } from 'next/server';
import { requireAuthenticatedUser } from '@/lib/auth';
import { apiResponse } from '@/lib/apiResponse';
import { validateData } from '@/lib/validation';
import { updateBookingServiceSchema } from '@/lib/validation/bookingService';
import { bookingServiceService } from '@/lib/services/bookingService.service';
import { ValidationError } from '@/lib/errors';

interface RouteContext {
  params: Promise<{
    weddingId: string;
    bookingId: string;
    bookingServiceId: string;
  }>;
}

/**
 * GET /api/v1/weddings/[weddingId]/bookings/[bookingId]/services/[bookingServiceId]
 * Fetches a single line item service for a booking. Authorized for participants.
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireAuthenticatedUser();
    const { bookingId, bookingServiceId } = await context.params;

    const service = await bookingServiceService.getServiceForBooking({
      bookingId,
      bookingServiceId,
      userId: user.id,
      userRole: user.role,
      clientProfileId: user.clientProfile?.id,
    });

    return apiResponse.success(service);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}

/**
 * PATCH /api/v1/weddings/[weddingId]/bookings/[bookingId]/services/[bookingServiceId]
 * Updates a line item service for a booking. Authorized for participants.
 */
export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireAuthenticatedUser();
    const { bookingId, bookingServiceId } = await context.params;

    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      throw new ValidationError('Invalid JSON body');
    }

    const input = validateData(updateBookingServiceSchema, rawBody);
    const updatedService = await bookingServiceService.updateServiceForBooking({
      bookingId,
      bookingServiceId,
      userId: user.id,
      userRole: user.role,
      clientProfileId: user.clientProfile?.id,
      input,
    });

    return apiResponse.success(updatedService, 200, 'Booking service line item updated successfully');
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
