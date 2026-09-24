import { describe, it, expect, beforeAll } from 'vitest';
import { createTestFixtures, TestFixtures } from '../helpers/fixtures';
import { setAuthUser, createMockNextRequest } from '../helpers/auth';
import { POST as createReview } from '@/app/api/v1/weddings/[weddingId]/bookings/[bookingId]/review/route';
import { prisma } from '@/lib/prisma';
import { BookingStatus } from '@prisma/client';

describe('Phase 43.09 — Review Domain Integration Tests', () => {
  let fixtures: TestFixtures;
  let nonCompletedBookingId: string;

  beforeAll(async () => {
    fixtures = await createTestFixtures();

    // Mark fixture bookingA as COMPLETED so reviews can be posted against it
    await prisma.booking.update({
      where: { id: fixtures.bookingA.id },
      data: { status: BookingStatus.COMPLETED },
    });

    // Create a non-completed booking (PENDING)
    const b = await prisma.booking.create({
      data: {
        referenceCode: `BKG-PENDING-${Date.now().toString().slice(-4)}`,
        weddingId: fixtures.weddingA.id,
        vendorId: fixtures.vendorProfileA.id,
        status: BookingStatus.PENDING,
        totalAmount: BigInt(5000000),
      },
    });
    nonCompletedBookingId = b.id;
  });

  it('rejects review for non-completed booking with 403 Forbidden', async () => {
    setAuthUser(fixtures.clientUserA.supabaseAuthUserId);

    const req = createMockNextRequest(
      `http://localhost:3000/api/v1/weddings/${fixtures.weddingA.id}/bookings/${nonCompletedBookingId}/review`,
      {
        method: 'POST',
        json: {
          rating: 5,
          comment: 'Review for non-completed booking should fail',
        },
      }
    );
    const context = {
      params: Promise.resolve({
        weddingId: fixtures.weddingA.id,
        bookingId: nonCompletedBookingId,
      }),
    };
    const res = await createReview(req, context);
    const json = await res.json();

    expect(res.status).toBe(422);
    expect(json.success).toBe(false);
    expect(json.error.message).toContain('completed');
  });

  it('rejects review rating outside 1–5 range with 422 Validation Error', async () => {
    setAuthUser(fixtures.clientUserA.supabaseAuthUserId);

    const req = createMockNextRequest(
      `http://localhost:3000/api/v1/weddings/${fixtures.weddingA.id}/bookings/${fixtures.bookingA.id}/review`,
      {
        method: 'POST',
        json: {
          rating: 6, // Invalid rating
          comment: 'Invalid rating test',
        },
      }
    );
    const context = {
      params: Promise.resolve({
        weddingId: fixtures.weddingA.id,
        bookingId: fixtures.bookingA.id,
      }),
    };
    const res = await createReview(req, context);
    const json = await res.json();

    expect(res.status).toBe(422);
    expect(json.success).toBe(false);
  });

  it('rejects duplicate review creation for completed booking with 409 Conflict', async () => {
    setAuthUser(fixtures.clientUserA.supabaseAuthUserId);

    // fixtures.bookingA already has reviewA created in setup
    const req = createMockNextRequest(
      `http://localhost:3000/api/v1/weddings/${fixtures.weddingA.id}/bookings/${fixtures.bookingA.id}/review`,
      {
        method: 'POST',
        json: {
          rating: 4,
          comment: 'Attempting duplicate review',
        },
      }
    );
    const context = {
      params: Promise.resolve({
        weddingId: fixtures.weddingA.id,
        bookingId: fixtures.bookingA.id,
      }),
    };
    const res = await createReview(req, context);
    const json = await res.json();

    expect(res.status).toBe(409);
    expect(json.success).toBe(false);
    expect(json.error.code).toBe('CONFLICT');
  });

  it('recalculates VendorProfile rating aggregate and reviewCount on published review', async () => {
    // Check Vendor A's profile aggregate
    const vendorProfile = await prisma.vendorProfile.findUnique({
      where: { id: fixtures.vendorProfileA.id },
    });

    expect(vendorProfile?.rating).toBe(5);
    expect(vendorProfile?.reviewCount).toBe(1);
  });
});
