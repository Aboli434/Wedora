import { NextRequest } from 'next/server';
import { UserRole } from '@prisma/client';
import { requireRole } from '@/lib/auth';
import { apiResponse } from '@/lib/apiResponse';
import { validateData } from '@/lib/validation';
import { createReviewSchema, updateReviewSchema } from '@/lib/validation/review';
import { reviewService } from '@/lib/services/review.service';
import { ForbiddenError, ValidationError } from '@/lib/errors';

interface RouteContext {
  params: Promise<{
    weddingId: string;
    bookingId: string;
  }>;
}

/**
 * GET /api/v1/weddings/[weddingId]/bookings/[bookingId]/review
 * Fetches the review submitted for a client-owned booking.
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireRole(UserRole.CLIENT);

    if (!user.clientProfile) {
      throw new ForbiddenError('Client profile is required to access review');
    }

    const { weddingId, bookingId } = await context.params;

    const review = await reviewService.getReviewForClientBooking({
      weddingId,
      bookingId,
      clientProfileId: user.clientProfile.id,
    });

    return apiResponse.success(review);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}

/**
 * POST /api/v1/weddings/[weddingId]/bookings/[bookingId]/review
 * Creates a new review for a completed client-owned booking.
 */
export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireRole(UserRole.CLIENT);

    if (!user.clientProfile) {
      throw new ForbiddenError('Client profile is required to submit a review');
    }

    const { weddingId, bookingId } = await context.params;

    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      throw new ValidationError('Invalid JSON body');
    }

    const input = validateData(createReviewSchema, rawBody);
    const createdReview = await reviewService.createReviewForClientBooking({
      weddingId,
      bookingId,
      userId: user.id,
      clientProfileId: user.clientProfile.id,
      input,
    });

    return apiResponse.success(createdReview, 201, 'Review submitted successfully');
  } catch (error) {
    return apiResponse.handleError(error);
  }
}

/**
 * PATCH /api/v1/weddings/[weddingId]/bookings/[bookingId]/review
 * Updates an existing review for a client-owned booking.
 */
export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireRole(UserRole.CLIENT);

    if (!user.clientProfile) {
      throw new ForbiddenError('Client profile is required to update a review');
    }

    const { weddingId, bookingId } = await context.params;

    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      throw new ValidationError('Invalid JSON body');
    }

    const input = validateData(updateReviewSchema, rawBody);
    const updatedReview = await reviewService.updateReviewForClientBooking({
      weddingId,
      bookingId,
      clientProfileId: user.clientProfile.id,
      input,
    });

    return apiResponse.success(updatedReview, 200, 'Review updated successfully');
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
