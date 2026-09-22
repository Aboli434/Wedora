import { BookingStatus, Prisma, Review, ReviewStatus } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { CreateReviewInput, UpdateReviewInput } from '@/lib/validation/review';
import { ReviewResponse } from '@/lib/api/types';
import { ConflictError, NotFoundError, ValidationError } from '@/lib/errors';

export class ReviewService {
  /**
   * Transforms a Prisma Review record into a clean ReviewResponse DTO.
   */
  public formatReviewResponse(
    review: Review & {
      author?: { id: string; fullName: string; avatarUrl: string | null };
    }
  ): ReviewResponse {
    return {
      id: review.id,
      bookingId: review.bookingId,
      vendorId: review.vendorId,
      authorId: review.authorId,
      rating: review.rating,
      title: review.title,
      comment: review.comment,
      status: review.status,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
      ...(review.author
        ? {
            author: {
              id: review.author.id,
              fullName: review.author.fullName,
              avatarUrl: review.author.avatarUrl,
            },
          }
        : {}),
    };
  }

  /**
   * Recalculates VendorProfile rating aggregate and reviewCount for PUBLISHED reviews.
   * Executed atomically inside a Prisma transaction context.
   */
  public async recalculateVendorRating(
    tx: Prisma.TransactionClient,
    vendorId: string
  ): Promise<void> {
    const publishedReviews = await tx.review.findMany({
      where: {
        vendorId,
        status: ReviewStatus.PUBLISHED,
      },
      select: { rating: true },
    });

    const reviewCount = publishedReviews.length;
    let avgRating = 0;

    if (reviewCount > 0) {
      const sum = publishedReviews.reduce((acc, r) => acc + r.rating, 0);
      avgRating = Math.round((sum / reviewCount) * 10) / 10;
    }

    await tx.vendorProfile.update({
      where: { id: vendorId },
      data: {
        rating: avgRating,
        reviewCount,
      },
    });
  }

  /**
   * Helper to resolve VendorProfile ID for an authenticated vendor's User ID.
   */
  private async getVendorProfileIdByUserId(userId: string): Promise<string> {
    const profile = await prisma.vendorProfile.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!profile) {
      throw new NotFoundError('Vendor profile not found');
    }

    return profile.id;
  }

  // ==========================================
  // CLIENT-SIDE REVIEW OPERATIONS
  // ==========================================

  /**
   * Creates a review for a completed booking owned by the authenticated client.
   */
  public async createReviewForClientBooking(params: {
    weddingId: string;
    bookingId: string;
    userId: string;
    clientProfileId: string;
    input: CreateReviewInput;
  }): Promise<ReviewResponse> {
    const { weddingId, bookingId, userId, clientProfileId, input } = params;

    const booking = await prisma.booking.findFirst({
      where: {
        id: bookingId,
        weddingId,
        wedding: { clientId: clientProfileId },
      },
      select: { id: true, vendorId: true, status: true },
    });

    if (!booking) {
      throw new NotFoundError('Booking not found');
    }

    if (booking.status !== BookingStatus.COMPLETED) {
      throw new ValidationError('Reviews can only be submitted for completed bookings');
    }

    const existingReview = await prisma.review.findUnique({
      where: { bookingId },
      select: { id: true },
    });

    if (existingReview) {
      throw new ConflictError('A review for this booking already exists');
    }

    try {
      const review = await prisma.$transaction(async (tx) => {
        const created = await tx.review.create({
          data: {
            bookingId,
            vendorId: booking.vendorId,
            authorId: userId,
            rating: input.rating,
            title: input.title ?? null,
            comment: input.comment,
            status: input.status ?? ReviewStatus.PUBLISHED,
          },
          include: {
            author: {
              select: { id: true, fullName: true, avatarUrl: true },
            },
          },
        });

        await this.recalculateVendorRating(tx, booking.vendorId);

        return created;
      });

      return this.formatReviewResponse(review);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictError('A review for this booking already exists');
      }
      throw error;
    }
  }

  /**
   * Fetches the review for a client-owned booking.
   */
  public async getReviewForClientBooking(params: {
    weddingId: string;
    bookingId: string;
    clientProfileId: string;
  }): Promise<ReviewResponse> {
    const { weddingId, bookingId, clientProfileId } = params;

    const booking = await prisma.booking.findFirst({
      where: {
        id: bookingId,
        weddingId,
        wedding: { clientId: clientProfileId },
      },
      select: { id: true },
    });

    if (!booking) {
      throw new NotFoundError('Booking not found');
    }

    const review = await prisma.review.findUnique({
      where: { bookingId },
      include: {
        author: {
          select: { id: true, fullName: true, avatarUrl: true },
        },
      },
    });

    if (!review) {
      throw new NotFoundError('Review not found');
    }

    return this.formatReviewResponse(review);
  }

  /**
   * Updates an existing review for a client-owned booking.
   */
  public async updateReviewForClientBooking(params: {
    weddingId: string;
    bookingId: string;
    clientProfileId: string;
    input: UpdateReviewInput;
  }): Promise<ReviewResponse> {
    const { weddingId, bookingId, clientProfileId, input } = params;

    const booking = await prisma.booking.findFirst({
      where: {
        id: bookingId,
        weddingId,
        wedding: { clientId: clientProfileId },
      },
      select: { id: true },
    });

    if (!booking) {
      throw new NotFoundError('Booking not found');
    }

    const existing = await prisma.review.findUnique({
      where: { bookingId },
    });

    if (!existing) {
      throw new NotFoundError('Review not found');
    }

    const updateData: Prisma.ReviewUpdateInput = {};
    if (input.rating !== undefined) updateData.rating = input.rating;
    if (input.title !== undefined) updateData.title = input.title;
    if (input.comment !== undefined) updateData.comment = input.comment;
    if (input.status !== undefined) updateData.status = input.status;

    const updated = await prisma.$transaction(async (tx) => {
      const res = await tx.review.update({
        where: { id: existing.id },
        data: updateData,
        include: {
          author: {
            select: { id: true, fullName: true, avatarUrl: true },
          },
        },
      });

      await this.recalculateVendorRating(tx, existing.vendorId);

      return res;
    });

    return this.formatReviewResponse(updated);
  }

  // ==========================================
  // VENDOR-SIDE REVIEW OPERATIONS
  // ==========================================

  /**
   * Lists all reviews received by the authenticated vendor.
   */
  public async listReviewsForVendor(userId: string): Promise<ReviewResponse[]> {
    const vendorId = await this.getVendorProfileIdByUserId(userId);

    const reviews = await prisma.review.findMany({
      where: { vendorId },
      include: {
        author: {
          select: { id: true, fullName: true, avatarUrl: true },
        },
      },
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
    });

    return reviews.map((r) => this.formatReviewResponse(r));
  }

  /**
   * Gets a single review received by the authenticated vendor.
   */
  public async getReviewForVendor(params: {
    userId: string;
    reviewId: string;
  }): Promise<ReviewResponse> {
    const { userId, reviewId } = params;
    const vendorId = await this.getVendorProfileIdByUserId(userId);

    const review = await prisma.review.findFirst({
      where: {
        id: reviewId,
        vendorId,
      },
      include: {
        author: {
          select: { id: true, fullName: true, avatarUrl: true },
        },
      },
    });

    if (!review) {
      throw new NotFoundError('Review not found');
    }

    return this.formatReviewResponse(review);
  }

  // ==========================================
  // PUBLIC REVIEW OPERATIONS
  // ==========================================

  /**
   * Lists published reviews for a public vendor profile by slug.
   */
  public async listPublicReviewsForVendorSlug(slug: string): Promise<ReviewResponse[]> {
    const vendor = await prisma.vendorProfile.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!vendor) {
      throw new NotFoundError('Vendor profile not found');
    }

    const reviews = await prisma.review.findMany({
      where: {
        vendorId: vendor.id,
        status: ReviewStatus.PUBLISHED,
      },
      include: {
        author: {
          select: { id: true, fullName: true, avatarUrl: true },
        },
      },
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
    });

    return reviews.map((r) => this.formatReviewResponse(r));
  }
}

export const reviewService = new ReviewService();
