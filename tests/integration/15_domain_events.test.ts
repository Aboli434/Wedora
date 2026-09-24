import { describe, it, expect, beforeAll } from 'vitest';
import { createTestFixtures } from '../helpers/fixtures';
import { vendorEnquiryService } from '@/lib/services/vendorEnquiry.service';
import { enquiryMessageService } from '@/lib/services/enquiryMessage.service';
import { bookingService } from '@/lib/services/booking.service';
import { paymentTransactionService } from '@/lib/services/paymentTransaction.service';
import { reviewService } from '@/lib/services/review.service';
import { prisma } from '@/lib/prisma';
import { BookingStatus, UserRole, PaymentMethod } from '@prisma/client';

describe('Phase 43 — 15. Domain Event & Notification/Activity Tests', () => {
  let fixtures: Awaited<ReturnType<typeof createTestFixtures>>;

  beforeAll(async () => {
    fixtures = await createTestFixtures();
  });

  it('should generate exactly 1 notification and activity log when enquiry is created', async () => {
    const initialNotificationCount = await prisma.notification.count({
      where: { userId: fixtures.vendorUserA.id },
    });
    const initialActivityCount = await prisma.activityLog.count({
      where: { userId: fixtures.clientUserA.id },
    });

    await vendorEnquiryService.createEnquiryForClientWedding({
      weddingId: fixtures.weddingA.id,
      clientProfileId: fixtures.clientProfileA.id,
      input: {
        vendorId: fixtures.vendorProfileA.id,
        eventDate: '2026-10-10',
        estimatedBudget: '15000',
        message: 'Hello Vendor A, testing notification generation!',
      },
    });

    const finalNotificationCount = await prisma.notification.count({
      where: { userId: fixtures.vendorUserA.id },
    });
    const finalActivityCount = await prisma.activityLog.count({
      where: { userId: fixtures.clientUserA.id },
    });

    expect(finalNotificationCount).toBe(initialNotificationCount + 1);
    expect(finalActivityCount).toBe(initialActivityCount + 1);
  });

  it('should generate exactly 1 notification to counter-party on enquiry message', async () => {
    const enquiry = fixtures.enquiryA;
    const initialVendorNotifs = await prisma.notification.count({
      where: { userId: fixtures.vendorUserA.id },
    });

    await enquiryMessageService.createMessageForEnquiry({
      enquiryId: enquiry.id,
      userId: fixtures.clientUserA.id,
      userRole: UserRole.CLIENT,
      clientProfileId: fixtures.clientProfileA.id,
      input: { message: 'New message from Client A' },
    });

    const finalVendorNotifs = await prisma.notification.count({
      where: { userId: fixtures.vendorUserA.id },
    });

    expect(finalVendorNotifs).toBe(initialVendorNotifs + 1);
  });

  it('should generate notification and activity on booking status update', async () => {
    const booking = fixtures.bookingA;
    const initialClientNotifs = await prisma.notification.count({
      where: { userId: fixtures.clientUserA.id },
    });

    await bookingService.updateBookingForCurrentVendor({
      userId: fixtures.vendorUserA.id,
      bookingId: booking.id,
      input: { status: BookingStatus.CANCELLED },
    });

    const finalClientNotifs = await prisma.notification.count({
      where: { userId: fixtures.clientUserA.id },
    });

    expect(finalClientNotifs).toBe(initialClientNotifs + 1);
  });

  it('should generate notification and activity on payment transaction', async () => {
    const payment = fixtures.paymentA;
    const initialVendorNotifs = await prisma.notification.count({
      where: { userId: fixtures.vendorUserA.id },
    });

    await paymentTransactionService.createTransactionForPayment({
      weddingId: fixtures.weddingA.id,
      bookingId: fixtures.bookingA.id,
      paymentId: payment.id,
      userId: fixtures.clientUserA.id,
      userRole: UserRole.CLIENT,
      clientProfileId: fixtures.clientProfileA.id,
      input: {
        amount: '1000',
        paymentMethod: PaymentMethod.UPI,
        transactionRef: 'EVT_TX_999',
      },
    });

    const finalVendorNotifs = await prisma.notification.count({
      where: { userId: fixtures.vendorUserA.id },
    });

    expect(finalVendorNotifs).toBe(initialVendorNotifs + 1);
  });

  it('should generate vendor notification when review is created', async () => {
    const freshBooking = await prisma.booking.create({
      data: {
        referenceCode: `BKG-EVT-${Date.now().toString().slice(-4)}`,
        weddingId: fixtures.weddingA.id,
        vendorId: fixtures.vendorProfileA.id,
        status: BookingStatus.COMPLETED,
        totalAmount: BigInt(5000000),
      },
    });

    const initialVendorNotifs = await prisma.notification.count({
      where: { userId: fixtures.vendorUserA.id },
    });

    await reviewService.createReviewForClientBooking({
      weddingId: fixtures.weddingA.id,
      bookingId: freshBooking.id,
      clientProfileId: fixtures.clientProfileA.id,
      userId: fixtures.clientUserA.id,
      input: {
        rating: 5,
        title: 'Great Experience',
        comment: 'Exceptional service!',
      },
    });

    const finalVendorNotifs = await prisma.notification.count({
      where: { userId: fixtures.vendorUserA.id },
    });

    expect(finalVendorNotifs).toBe(initialVendorNotifs + 1);
  });
});
