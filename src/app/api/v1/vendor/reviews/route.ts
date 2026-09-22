import { UserRole } from '@prisma/client';
import { requireRole } from '@/lib/auth';
import { apiResponse } from '@/lib/apiResponse';
import { reviewService } from '@/lib/services/review.service';
import { ForbiddenError } from '@/lib/errors';

/**
 * GET /api/v1/vendor/reviews
 * Lists all reviews received by the authenticated vendor.
 */
export async function GET() {
  try {
    const user = await requireRole(UserRole.VENDOR);

    if (!user.id) {
      throw new ForbiddenError('Vendor user identification failed');
    }

    const reviews = await reviewService.listReviewsForVendor(user.id);

    return apiResponse.success(reviews);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
