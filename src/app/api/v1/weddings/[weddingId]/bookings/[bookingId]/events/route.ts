import { NextRequest } from 'next/server';
import { requireAuthenticatedUser } from '@/lib/auth';
import { apiResponse } from '@/lib/apiResponse';
import { validateData } from '@/lib/validation';
import { createBookingEventSchema } from '@/lib/validation/bookingEvent';
import { bookingEventService } from '@/lib/services/bookingEvent.service';
import { ValidationError } from '@/lib/errors';

interface RouteContext {
  params: Promise<{
    weddingId: string;
    bookingId: string;
  }>;
}

/**
 * GET /api/v1/weddings/[weddingId]/bookings/[bookingId]/events
 * Lists all scheduled events for a booking. Authorized for participants (Client owner or Vendor owner).
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireAuthenticatedUser();
    const { bookingId } = await context.params;

    const events = await bookingEventService.listEventsForBooking({
      bookingId,
      userId: user.id,
      userRole: user.role,
      clientProfileId: user.clientProfile?.id,
    });

    return apiResponse.success(events);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}

/**
 * POST /api/v1/weddings/[weddingId]/bookings/[bookingId]/events
 * Adds a new scheduled event to a booking. Authorized for participants (Client owner or Vendor owner).
 */
export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireAuthenticatedUser();
    const { bookingId } = await context.params;

    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      throw new ValidationError('Invalid JSON body');
    }

    const input = validateData(createBookingEventSchema, rawBody);
    const createdEvent = await bookingEventService.createEventForBooking({
      bookingId,
      userId: user.id,
      userRole: user.role,
      clientProfileId: user.clientProfile?.id,
      input,
    });

    return apiResponse.success(createdEvent, 201, 'Booking event created successfully');
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
