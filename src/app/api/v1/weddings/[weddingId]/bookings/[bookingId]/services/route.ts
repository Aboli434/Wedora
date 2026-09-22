import { NextRequest } from 'next/server';
import { requireAuthenticatedUser } from '@/lib/auth';
import { apiResponse } from '@/lib/apiResponse';
import { validateData } from '@/lib/validation';
import { createBookingServiceSchema } from '@/lib/validation/bookingService';
import { bookingServiceService } from '@/lib/services/bookingService.service';
import { ValidationError } from '@/lib/errors';

interface RouteContext {
  params: Promise<{
    weddingId: string;
    bookingId: string;
  }>;
}

/**
 * GET /api/v1/weddings/[weddingId]/bookings/[bookingId]/services
 * Lists all line item services for a booking. Authorized for participants (Client owner or Vendor owner).
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireAuthenticatedUser();
    const { bookingId } = await context.params;

    const services = await bookingServiceService.listServicesForBooking({
      bookingId,
      userId: user.id,
      userRole: user.role,
      clientProfileId: user.clientProfile?.id,
    });

    return apiResponse.success(services);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}

/**
 * POST /api/v1/weddings/[weddingId]/bookings/[bookingId]/services
 * Adds a new line item service to a booking. Authorized for participants (Client owner or Vendor owner).
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

    const input = validateData(createBookingServiceSchema, rawBody);
    const createdService = await bookingServiceService.createServiceForBooking({
      bookingId,
      userId: user.id,
      userRole: user.role,
      clientProfileId: user.clientProfile?.id,
      input,
    });

    return apiResponse.success(createdService, 201, 'Booking service line item created successfully');
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
