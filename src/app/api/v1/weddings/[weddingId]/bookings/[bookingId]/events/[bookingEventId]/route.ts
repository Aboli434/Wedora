import { NextRequest } from 'next/server';
import { requireAuthenticatedUser } from '@/lib/auth';
import { apiResponse } from '@/lib/apiResponse';
import { validateData } from '@/lib/validation';
import { updateBookingEventSchema } from '@/lib/validation/bookingEvent';
import { bookingEventService } from '@/lib/services/bookingEvent.service';
import { ValidationError } from '@/lib/errors';

interface RouteContext {
  params: Promise<{
    weddingId: string;
    bookingId: string;
    bookingEventId: string;
  }>;
}

/**
 * GET /api/v1/weddings/[weddingId]/bookings/[bookingId]/events/[bookingEventId]
 * Fetches a single scheduled event for a booking. Authorized for participants.
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireAuthenticatedUser();
    const { bookingId, bookingEventId } = await context.params;

    const event = await bookingEventService.getEventForBooking({
      bookingId,
      bookingEventId,
      userId: user.id,
      userRole: user.role,
      clientProfileId: user.clientProfile?.id,
    });

    return apiResponse.success(event);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}

/**
 * PATCH /api/v1/weddings/[weddingId]/bookings/[bookingId]/events/[bookingEventId]
 * Updates a scheduled event for a booking. Authorized for participants.
 */
export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireAuthenticatedUser();
    const { bookingId, bookingEventId } = await context.params;

    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      throw new ValidationError('Invalid JSON body');
    }

    const input = validateData(updateBookingEventSchema, rawBody);
    const updatedEvent = await bookingEventService.updateEventForBooking({
      bookingId,
      bookingEventId,
      userId: user.id,
      userRole: user.role,
      clientProfileId: user.clientProfile?.id,
      input,
    });

    return apiResponse.success(updatedEvent, 200, 'Booking event updated successfully');
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
