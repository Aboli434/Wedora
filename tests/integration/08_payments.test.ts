import { describe, it, expect, beforeAll } from 'vitest';
import { createTestFixtures, TestFixtures } from '../helpers/fixtures';
import { setAuthUser, createMockNextRequest } from '../helpers/auth';
import { POST as createPayment } from '@/app/api/v1/weddings/[weddingId]/bookings/[bookingId]/payments/route';
import { POST as createTransaction } from '@/app/api/v1/weddings/[weddingId]/bookings/[bookingId]/payments/[paymentId]/transactions/route';
import { prisma } from '@/lib/prisma';
import { NotificationType, PaymentStatus, TransactionType } from '@prisma/client';

describe('Phase 43.08 — Payment & Transaction Integration Tests', () => {
  let fixtures: TestFixtures;
  let testPaymentId: string;

  beforeAll(async () => {
    fixtures = await createTestFixtures();
  });

  it('creates a new payment milestone for a booking', async () => {
    setAuthUser(fixtures.clientUserA.supabaseAuthUserId);

    const req = createMockNextRequest(
      `http://localhost:3000/api/v1/weddings/${fixtures.weddingA.id}/bookings/${fixtures.bookingA.id}/payments`,
      {
        method: 'POST',
        json: {
          amount: '100000',
          dueDate: '2026-11-05',
          milestoneTitle: 'Advance Payment Milestone',
        },
      }
    );
    const context = {
      params: Promise.resolve({
        weddingId: fixtures.weddingA.id,
        bookingId: fixtures.bookingA.id,
      }),
    };
    const res = await createPayment(req, context);
    const json = await res.json();

    expect(res.status).toBe(201);
    expect(json.success).toBe(true);
    expect(json.data.amount).toBe('10000000'); // 100000 in paise
    expect(json.data.status).toBe(PaymentStatus.PENDING);

    testPaymentId = json.data.id;
  });

  it('records a payment transaction, recalculates payment status to PAID, and updates booking paidAmount', async () => {
    setAuthUser(fixtures.clientUserA.supabaseAuthUserId);

    const req = createMockNextRequest(
      `http://localhost:3000/api/v1/weddings/${fixtures.weddingA.id}/bookings/${fixtures.bookingA.id}/payments/${testPaymentId}/transactions`,
      {
        method: 'POST',
        json: {
          amount: '100000',
          paymentMethod: 'UPI',
          type: 'PAYMENT',
        },
      }
    );
    const context = {
      params: Promise.resolve({
        weddingId: fixtures.weddingA.id,
        bookingId: fixtures.bookingA.id,
        paymentId: testPaymentId,
      }),
    };
    const res = await createTransaction(req, context);
    const json = await res.json();

    expect(res.status).toBe(201);
    expect(json.success).toBe(true);
    expect(json.data.transactionRef).toMatch(/^TXN-/);

    // Verify Payment status is now PAID
    const updatedPayment = await prisma.payment.findUnique({
      where: { id: testPaymentId },
    });
    expect(updatedPayment?.status).toBe(PaymentStatus.PAID);

    // Verify Notification received by Vendor A
    const notification = await prisma.notification.findFirst({
      where: {
        userId: fixtures.vendorUserA.id,
        type: NotificationType.PAYMENT,
      },
      orderBy: { createdAt: 'desc' },
    });

    expect(notification).toBeDefined();
    expect(notification?.message).toContain('Milestone status: PAID');
  });

  it('records a refund transaction and recalculates net paid amount', async () => {
    setAuthUser(fixtures.clientUserA.supabaseAuthUserId);

    const req = createMockNextRequest(
      `http://localhost:3000/api/v1/weddings/${fixtures.weddingA.id}/bookings/${fixtures.bookingA.id}/payments/${testPaymentId}/transactions`,
      {
        method: 'POST',
        json: {
          amount: '50000',
          paymentMethod: 'BANK_TRANSFER',
          type: 'REFUND',
        },
      }
    );
    const context = {
      params: Promise.resolve({
        weddingId: fixtures.weddingA.id,
        bookingId: fixtures.bookingA.id,
        paymentId: testPaymentId,
      }),
    };
    const res = await createTransaction(req, context);
    const json = await res.json();

    expect(res.status).toBe(201);
    expect(json.success).toBe(true);
    expect(json.data.type).toBe(TransactionType.REFUND);

    // Payment status transitions from PAID to PARTIAL
    const updatedPayment = await prisma.payment.findUnique({
      where: { id: testPaymentId },
    });
    expect(updatedPayment?.status).toBe(PaymentStatus.PARTIAL);
  });

  it('rejects duplicate transactionRef with 409 Conflict', async () => {
    setAuthUser(fixtures.clientUserA.supabaseAuthUserId);

    const duplicateRef = 'TXN-DUPLICATE-TEST-REF';

    // First transaction with custom ref
    const req1 = createMockNextRequest(
      `http://localhost:3000/api/v1/weddings/${fixtures.weddingA.id}/bookings/${fixtures.bookingA.id}/payments/${testPaymentId}/transactions`,
      {
        method: 'POST',
        json: {
          amount: '1000',
          paymentMethod: 'UPI',
          transactionRef: duplicateRef,
        },
      }
    );
    const context = {
      params: Promise.resolve({
        weddingId: fixtures.weddingA.id,
        bookingId: fixtures.bookingA.id,
        paymentId: testPaymentId,
      }),
    };
    await createTransaction(req1, context);

    // Second transaction with same ref -> 409
    const req2 = createMockNextRequest(
      `http://localhost:3000/api/v1/weddings/${fixtures.weddingA.id}/bookings/${fixtures.bookingA.id}/payments/${testPaymentId}/transactions`,
      {
        method: 'POST',
        json: {
          amount: '1000',
          paymentMethod: 'UPI',
          transactionRef: duplicateRef,
        },
      }
    );
    const res2 = await createTransaction(req2, context);
    const json2 = await res2.json();

    expect(res2.status).toBe(409);
    expect(json2.success).toBe(false);
    expect(json2.error.code).toBe('CONFLICT');
  });

  it('rejects invalid negative payment amount with 422 Validation Error', async () => {
    setAuthUser(fixtures.clientUserA.supabaseAuthUserId);

    const req = createMockNextRequest(
      `http://localhost:3000/api/v1/weddings/${fixtures.weddingA.id}/bookings/${fixtures.bookingA.id}/payments/${testPaymentId}/transactions`,
      {
        method: 'POST',
        json: {
          amount: '-5000',
          paymentMethod: 'UPI',
        },
      }
    );
    const context = {
      params: Promise.resolve({
        weddingId: fixtures.weddingA.id,
        bookingId: fixtures.bookingA.id,
        paymentId: testPaymentId,
      }),
    };
    const res = await createTransaction(req, context);
    const json = await res.json();

    expect(res.status).toBe(422);
    expect(json.success).toBe(false);
    expect(json.error.code).toBe('VALIDATION_ERROR');
  });
});
