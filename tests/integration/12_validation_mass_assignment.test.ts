import { describe, it, expect, beforeAll } from 'vitest';
import { createTestFixtures, TestFixtures } from '../helpers/fixtures';
import { setAuthUser, createMockNextRequest } from '../helpers/auth';
import { POST as createBooking } from '@/app/api/v1/weddings/[weddingId]/bookings/route';
import { POST as createTransaction } from '@/app/api/v1/weddings/[weddingId]/bookings/[bookingId]/payments/[paymentId]/transactions/route';

describe('Phase 43.12 — Validation & Mass Assignment Security Tests', () => {
  let fixtures: TestFixtures;

  beforeAll(async () => {
    fixtures = await createTestFixtures();
  });

  it('rejects injected paidAmount and referenceCode on booking creation with 422', async () => {
    setAuthUser(fixtures.clientUserA.supabaseAuthUserId);

    const req = createMockNextRequest(
      `http://localhost:3000/api/v1/weddings/${fixtures.weddingA.id}/bookings`,
      {
        method: 'POST',
        json: {
          vendorId: fixtures.vendorProfileA.id,
          totalAmount: '100000',
          paidAmount: '999999999', // Injected paidAmount
          referenceCode: 'BKG-HACKED-CODE', // Injected referenceCode
        },
      }
    );
    const context = { params: Promise.resolve({ weddingId: fixtures.weddingA.id }) };
    const res = await createBooking(req, context);
    const json = await res.json();

    expect(res.status).toBe(422);
    expect(json.success).toBe(false);
  });

  it('rejects invalid non-numeric amount on payment transaction with 422', async () => {
    setAuthUser(fixtures.clientUserA.supabaseAuthUserId);

    const req = createMockNextRequest(
      `http://localhost:3000/api/v1/weddings/${fixtures.weddingA.id}/bookings/${fixtures.bookingA.id}/payments/${fixtures.paymentA.id}/transactions`,
      {
        method: 'POST',
        json: {
          amount: 'invalid-non-numeric',
          paymentMethod: 'UPI',
        },
      }
    );
    const context = {
      params: Promise.resolve({
        weddingId: fixtures.weddingA.id,
        bookingId: fixtures.bookingA.id,
        paymentId: fixtures.paymentA.id,
      }),
    };
    const res = await createTransaction(req, context);
    const json = await res.json();

    expect(res.status).toBe(422);
    expect(json.success).toBe(false);
  });
});
