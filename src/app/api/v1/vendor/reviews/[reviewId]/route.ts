import { NextRequest } from 'next/server';
import { UserRole } from '@prisma/client';
import { requireRole } from '@/lib/auth';
import { apiResponse } from '@/lib/apiResponse';
import { reviewService } from '@/lib/services/review.service';
import { ForbiddenError } from '@/lib/errors';

interface RouteContext {
  params: Promise<{
    reviewId: string;
  }>;
}

/**
 * GET /api/v1/vendor/reviews/[reviewId]
 * Fetches a single review received by the authenticated vendor.
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireRole(UserRole.VENDOR);

    if (!user.id) {
      throw new ForbiddenError('Vendor user identification failed');
    }

    const { reviewId } = await context.params;

    const review = await reviewService.getReviewForVendor({
      userId: user.id,
      reviewId,
    });

    return apiResponse.success(review);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
