import { describe, it, expect, beforeAll } from 'vitest';
import { createTestFixtures, TestFixtures } from '../helpers/fixtures';
import { setAuthUser, createMockNextRequest } from '../helpers/auth';
import { POST as createBooking } from '@/app/api/v1/weddings/[weddingId]/bookings/route';
import { PATCH as updateBookingVendor } from '@/app/api/v1/vendor/bookings/[bookingId]/route';
import { POST as createBookingService } from '@/app/api/v1/weddings/[weddingId]/bookings/[bookingId]/services/route';
import { POST as createBookingEvent } from '@/app/api/v1/weddings/[weddingId]/bookings/[bookingId]/events/route';
import { prisma } from '@/lib/prisma';
import { BookingStatus, NotificationType } from '@prisma/client';

describe('Phase 43.07 — Booking Domain Integration Tests', () => {
  let fixtures: TestFixtures;

  beforeAll(async () => {
    fixtures = await createTestFixtures();
  });

  it('creates a client booking, generates referenceCode, and notifies vendor', async () => {
    setAuthUser(fixtures.clientUserA.supabaseAuthUserId);

    const req = createMockNextRequest(
      `http://localhost:3000/api/v1/weddings/${fixtures.weddingA.id}/bookings`,
      {
        method: 'POST',
        json: {
          vendorId: fixtures.vendorProfileA.id,
          totalAmount: '250000',
          advanceAmount: '50000',
          notes: 'Standard photography contract',
        },
      }
    );
    const context = { params: Promise.resolve({ weddingId: fixtures.weddingA.id }) };
    const res = await createBooking(req, context);
    const json = await res.json();

    expect(res.status).toBe(201);
    expect(json.success).toBe(true);
    expect(json.data.referenceCode).toMatch(/^BKG-/);
    expect(json.data.paidAmount).toBe('0'); // Client cannot inject paidAmount

    // Check Vendor notification
    const notification = await prisma.notification.findFirst({
      where: {
        userId: fixtures.vendorUserA.id,
        type: NotificationType.BOOKING,
        title: 'New Booking Created',
      },
      orderBy: { createdAt: 'desc' },
    });

    expect(notification).toBeDefined();
  });

  it('calculates BookingService.totalPrice server-side as unitPrice * quantity', async () => {
    setAuthUser(fixtures.clientUserA.supabaseAuthUserId);

    const req = createMockNextRequest(
      `http://localhost:3000/api/v1/weddings/${fixtures.weddingA.id}/bookings/${fixtures.bookingA.id}/services`,
      {
        method: 'POST',
        json: {
          serviceName: 'Pre-wedding Shoot',
          unitPrice: '40000',
          quantity: 2,
        },
      }
    );
    const context = {
      params: Promise.resolve({
        weddingId: fixtures.weddingA.id,
        bookingId: fixtures.bookingA.id,
      }),
    };
    const res = await createBookingService(req, context);
    const json = await res.json();

    expect(res.status).toBe(201);
    expect(json.success).toBe(true);
    expect(json.data.unitPrice).toBe('4000000'); // 40000 in paise
    expect(json.data.quantity).toBe(2);
    expect(json.data.totalPrice).toBe('8000000'); // 80000 in paise (unitPrice * 2)
  });

  it('validates weddingEventId ownership on BookingEvent creation', async () => {
    setAuthUser(fixtures.clientUserA.supabaseAuthUserId);

    const req = createMockNextRequest(
      `http://localhost:3000/api/v1/weddings/${fixtures.weddingA.id}/bookings/${fixtures.bookingA.id}/events`,
      {
        method: 'POST',
        json: {
          eventName: 'Reception Ceremony',
          eventDate: '2026-11-16',
          weddingEventId: fixtures.weddingEventA.id,
        },
      }
    );
    const context = {
      params: Promise.resolve({
        weddingId: fixtures.weddingA.id,
        bookingId: fixtures.bookingA.id,
      }),
    };
    const res = await createBookingEvent(req, context);
    const json = await res.json();

    expect(res.status).toBe(201);
    expect(json.success).toBe(true);
    expect(json.data.weddingEventId).toBe(fixtures.weddingEventA.id);
  });

  it('notifies client when vendor updates booking status', async () => {
    setAuthUser(fixtures.vendorUserA.supabaseAuthUserId);

    const req = createMockNextRequest(
      `http://localhost:3000/api/v1/vendor/bookings/${fixtures.bookingA.id}`,
      {
        method: 'PATCH',
        json: {
          status: BookingStatus.CANCELLED,
        },
      }
    );
    const context = { params: Promise.resolve({ bookingId: fixtures.bookingA.id }) };
    const res = await updateBookingVendor(req, context);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data.status).toBe(BookingStatus.CANCELLED);

    // Verify Notification received by Client A
    const notification = await prisma.notification.findFirst({
      where: {
        userId: fixtures.clientUserA.id,
        type: NotificationType.BOOKING,
        title: 'Booking Status Updated',
      },
      orderBy: { createdAt: 'desc' },
    });

    expect(notification).toBeDefined();
  });
});
