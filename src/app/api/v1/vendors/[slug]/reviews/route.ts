import { NextRequest } from 'next/server';
import { apiResponse } from '@/lib/apiResponse';
import { reviewService } from '@/lib/services/review.service';

interface RouteContext {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * GET /api/v1/vendors/[slug]/reviews
 * Publicly lists all PUBLISHED reviews for a vendor profile by slug.
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { slug } = await context.params;

    const reviews = await reviewService.listPublicReviewsForVendorSlug(slug);

    return apiResponse.success(reviews);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
