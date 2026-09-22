import { UserRole } from '@prisma/client';
import { requireRole } from '@/lib/auth';
import { apiResponse } from '@/lib/apiResponse';
import { bookingService } from '@/lib/services/booking.service';
import { ForbiddenError } from '@/lib/errors';

/**
 * GET /api/v1/vendor/bookings
 * Lists all bookings received by the authenticated vendor.
 */
export async function GET() {
  try {
    const user = await requireRole(UserRole.VENDOR);

    if (!user.id) {
      throw new ForbiddenError('Vendor user identification failed');
    }

    const bookings = await bookingService.listBookingsForCurrentVendor(user.id);

    return apiResponse.success(bookings);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
