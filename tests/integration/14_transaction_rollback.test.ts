import { describe, it, expect, beforeAll } from 'vitest';
import { createTestFixtures } from '../helpers/fixtures';
import { bookingService } from '@/lib/services/booking.service';
import { paymentTransactionService } from '@/lib/services/paymentTransaction.service';
import { reviewService } from '@/lib/services/review.service';
import { prisma } from '@/lib/prisma';
import { UserRole, PaymentMethod } from '@prisma/client';

describe('Phase 43 — 14. Transaction Rollback Tests', () => {
  let fixtures: Awaited<ReturnType<typeof createTestFixtures>>;

  beforeAll(async () => {
    fixtures = await createTestFixtures();
  });

  it('should rollback enquiry conversion if downstream booking creation fails', async () => {
    const enquiry = fixtures.enquiryA;

    // Attempt creating booking with non-existent vendorId causing DB constraint failure inside transaction
    await expect(
      bookingService.createBookingForClientWedding({
        weddingId: fixtures.weddingA.id,
        clientProfileId: fixtures.clientProfileA.id,
        input: {
          vendorId: '00000000-0000-4000-8000-000000000000',
          enquiryId: enquiry.id,
          totalAmount: '50000',
        },
      })
    ).rejects.toThrow();

    // Verify enquiry status was rolled back and remains NEW
    const refreshedEnquiry = await prisma.vendorEnquiry.findUnique({ where: { id: enquiry.id } });
    expect(refreshedEnquiry?.status).toBe('NEW');

    // Verify no booking was created for this enquiry
    const bookingCount = await prisma.booking.count({ where: { enquiryId: enquiry.id } });
    expect(bookingCount).toBe(0);
  });

  it('should rollback payment transaction creation if processing fails', async () => {
    const payment = fixtures.paymentA;

    // Attempt creating a transaction with an invalid amount format causing failure inside transaction
    await expect(
      paymentTransactionService.createTransactionForPayment({
        weddingId: fixtures.weddingA.id,
        bookingId: fixtures.bookingA.id,
        paymentId: payment.id,
        userId: fixtures.clientUserA.id,
        userRole: UserRole.CLIENT,
        clientProfileId: fixtures.clientProfileA.id,
        input: {
          amount: 'invalid-non-numeric-amount',
          paymentMethod: PaymentMethod.UPI,
          transactionRef: 'FAIL_REF_123',
        },
      })
    ).rejects.toThrow();

    // Verify payment status remains unchanged
    const refreshedPayment = await prisma.payment.findUnique({ where: { id: payment.id } });
    expect(refreshedPayment?.status).toEqual(payment.status);

    // Verify no orphan transaction record exists
    const tx = await prisma.paymentTransaction.findFirst({ where: { transactionRef: 'FAIL_REF_123' } });
    expect(tx).toBeNull();
  });

  it('should rollback review creation and aggregate recalculation if rating is invalid', async () => {
    const booking = fixtures.bookingA;
    const initialVendorProfile = await prisma.vendorProfile.findUnique({
      where: { id: fixtures.vendorProfileA.id },
    });

    // Attempt creating review with invalid rating outside 1-5 range
    await expect(
      reviewService.createReviewForClientBooking({
        weddingId: fixtures.weddingA.id,
        bookingId: booking.id,
        clientProfileId: fixtures.clientProfileA.id,
        userId: fixtures.clientUserA.id,
        input: {
          rating: 10,
          title: 'Invalid Rating',
          comment: 'Invalid rating test',
        },
      })
    ).rejects.toThrow();

    // Verify vendor rating aggregate and count remain unchanged
    const refreshedVendorProfile = await prisma.vendorProfile.findUnique({
      where: { id: fixtures.vendorProfileA.id },
    });
    expect(refreshedVendorProfile?.rating).toEqual(initialVendorProfile?.rating);
    expect(refreshedVendorProfile?.reviewCount).toEqual(initialVendorProfile?.reviewCount);

    // Verify no new review record was created beyond the fixture review
    const reviewCount = await prisma.review.count({ where: { comment: 'Invalid rating test' } });
    expect(reviewCount).toBe(0);
  });
});
