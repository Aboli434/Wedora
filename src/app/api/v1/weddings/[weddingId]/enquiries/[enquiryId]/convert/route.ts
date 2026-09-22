import { NextRequest } from 'next/server';
import { UserRole } from '@prisma/client';
import { requireRole } from '@/lib/auth';
import { apiResponse } from '@/lib/apiResponse';
import { bookingService } from '@/lib/services/booking.service';
import { ForbiddenError } from '@/lib/errors';

interface RouteContext {
  params: Promise<{
    weddingId: string;
    enquiryId: string;
  }>;
}

/**
 * POST /api/v1/weddings/[weddingId]/enquiries/[enquiryId]/convert
 * Dedicated atomic conversion of an enquiry into a booking for a client-owned wedding.
 */
export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireRole(UserRole.CLIENT);

    if (!user.clientProfile) {
      throw new ForbiddenError('Client profile is required to convert an enquiry');
    }

    const { weddingId, enquiryId } = await context.params;

    const booking = await bookingService.convertEnquiryToBooking({
      weddingId,
      enquiryId,
      clientProfileId: user.clientProfile.id,
    });

    return apiResponse.success(booking, 201, 'Enquiry converted into booking successfully');
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
