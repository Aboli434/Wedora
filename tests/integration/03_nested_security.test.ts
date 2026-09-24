import { describe, it, expect, beforeAll, beforeEach } from 'vitest';
import { createTestFixtures, TestFixtures } from '../helpers/fixtures';
import { setAuthUser, createMockNextRequest } from '../helpers/auth';
import { GET as getBookingItem } from '@/app/api/v1/weddings/[weddingId]/bookings/[bookingId]/route';
import { GET as getPayments } from '@/app/api/v1/weddings/[weddingId]/bookings/[bookingId]/payments/route';
import { GET as getPaymentItem } from '@/app/api/v1/weddings/[weddingId]/bookings/[bookingId]/payments/[paymentId]/route';
import { GET as getTransactions } from '@/app/api/v1/weddings/[weddingId]/bookings/[bookingId]/payments/[paymentId]/transactions/route';
import { GET as getTransactionItem } from '@/app/api/v1/weddings/[weddingId]/bookings/[bookingId]/payments/[paymentId]/transactions/[transactionId]/route';

describe('Phase 43.03 — Nested Parent/Child Security Regression Tests (Phase 41 Defect)', () => {
  let fixtures: TestFixtures;

  beforeAll(async () => {
    fixtures = await createTestFixtures();
  });

  beforeEach(() => {
    // Authenticate as Client A (who owns Wedding A, but Booking A belongs to Wedding A, not Wedding B)
    setAuthUser(fixtures.clientUserA.supabaseAuthUserId);
  });

  it('rejects mismatched parent wedding & child booking with 404', async () => {
    // Client A requests /api/v1/weddings/WEDDING_B/bookings/BOOKING_A
    const req = createMockNextRequest(
      `http://localhost:3000/api/v1/weddings/${fixtures.weddingB.id}/bookings/${fixtures.bookingA.id}`
    );
    const context = {
      params: Promise.resolve({
        weddingId: fixtures.weddingB.id,
        bookingId: fixtures.bookingA.id,
      }),
    };
    const res = await getBookingItem(req, context);
    const json = await res.json();

    expect(res.status).toBe(404);
    expect(json.success).toBe(false);
  });

  it('rejects mismatched parent wedding & child booking payments with 404', async () => {
    const req = createMockNextRequest(
      `http://localhost:3000/api/v1/weddings/${fixtures.weddingB.id}/bookings/${fixtures.bookingA.id}/payments`
    );
    const context = {
      params: Promise.resolve({
        weddingId: fixtures.weddingB.id,
        bookingId: fixtures.bookingA.id,
      }),
    };
    const res = await getPayments(req, context);
    const json = await res.json();

    expect(res.status).toBe(404);
    expect(json.success).toBe(false);
  });

  it('rejects mismatched parent wedding/booking & child payment item with 404', async () => {
    const req = createMockNextRequest(
      `http://localhost:3000/api/v1/weddings/${fixtures.weddingB.id}/bookings/${fixtures.bookingA.id}/payments/${fixtures.paymentA.id}`
    );
    const context = {
      params: Promise.resolve({
        weddingId: fixtures.weddingB.id,
        bookingId: fixtures.bookingA.id,
        paymentId: fixtures.paymentA.id,
      }),
    };
    const res = await getPaymentItem(req, context);
    const json = await res.json();

    expect(res.status).toBe(404);
    expect(json.success).toBe(false);
  });

  it('rejects mismatched parent wedding/booking & child payment transactions with 404', async () => {
    const req = createMockNextRequest(
      `http://localhost:3000/api/v1/weddings/${fixtures.weddingB.id}/bookings/${fixtures.bookingA.id}/payments/${fixtures.paymentA.id}/transactions`
    );
    const context = {
      params: Promise.resolve({
        weddingId: fixtures.weddingB.id,
        bookingId: fixtures.bookingA.id,
        paymentId: fixtures.paymentA.id,
      }),
    };
    const res = await getTransactions(req, context);
    const json = await res.json();

    expect(res.status).toBe(404);
    expect(json.success).toBe(false);
  });

  it('rejects mismatched parent wedding/booking/payment & child transaction item with 404', async () => {
    const req = createMockNextRequest(
      `http://localhost:3000/api/v1/weddings/${fixtures.weddingB.id}/bookings/${fixtures.bookingA.id}/payments/${fixtures.paymentA.id}/transactions/${fixtures.paymentTxA.id}`
    );
    const context = {
      params: Promise.resolve({
        weddingId: fixtures.weddingB.id,
        bookingId: fixtures.bookingA.id,
        paymentId: fixtures.paymentA.id,
        transactionId: fixtures.paymentTxA.id,
      }),
    };
    const res = await getTransactionItem(req, context);
    const json = await res.json();

    expect(res.status).toBe(404);
    expect(json.success).toBe(false);
  });
});
