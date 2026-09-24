import { describe, it, expect, beforeEach } from 'vitest';
import { setAuthUser, createMockNextRequest } from '../helpers/auth';
import { GET as getWeddings } from '@/app/api/v1/weddings/route';
import { GET as getNotifications } from '@/app/api/v1/notifications/route';
import { GET as getVendorProfile } from '@/app/api/v1/vendor/profile/route';
import { GET as getVendorBookings } from '@/app/api/v1/vendor/bookings/route';
import { GET as getPayments } from '@/app/api/v1/weddings/[weddingId]/bookings/[bookingId]/payments/route';

describe('Phase 43.01 — Authentication Security Tests', () => {
  beforeEach(() => {
    setAuthUser(null); // Ensure unauthenticated context by default
  });

  it('rejects unauthenticated request to GET /api/v1/weddings with 401', async () => {
    const req = createMockNextRequest('/api/v1/weddings');
    const res = await getWeddings(req);
    const json = await res.json();

    expect(res.status).toBe(401);
    expect(json.success).toBe(false);
    expect(json.error.code).toBe('UNAUTHORIZED');
  });

  it('rejects unauthenticated request to GET /api/v1/notifications with 401', async () => {
    const req = createMockNextRequest('/api/v1/notifications');
    const res = await getNotifications(req);
    const json = await res.json();

    expect(res.status).toBe(401);
    expect(json.success).toBe(false);
    expect(json.error.code).toBe('UNAUTHORIZED');
  });

  it('rejects unauthenticated request to GET /api/v1/vendor/profile with 401', async () => {
    const req = createMockNextRequest('/api/v1/vendor/profile');
    const res = await getVendorProfile(req);
    const json = await res.json();

    expect(res.status).toBe(401);
    expect(json.success).toBe(false);
    expect(json.error.code).toBe('UNAUTHORIZED');
  });

  it('rejects unauthenticated request to GET /api/v1/vendor/bookings with 401', async () => {
    const req = createMockNextRequest('/api/v1/vendor/bookings');
    const res = await getVendorBookings(req);
    const json = await res.json();

    expect(res.status).toBe(401);
    expect(json.success).toBe(false);
    expect(json.error.code).toBe('UNAUTHORIZED');
  });

  it('rejects unauthenticated request to GET /api/v1/weddings/[id]/bookings/[id]/payments with 401', async () => {
    const dummyId = '00000000-0000-4000-8000-000000000000';
    const req = createMockNextRequest(`/api/v1/weddings/${dummyId}/bookings/${dummyId}/payments`);
    const context = {
      params: Promise.resolve({
        weddingId: dummyId,
        bookingId: dummyId,
      }),
    };
    const res = await getPayments(req, context);
    const json = await res.json();

    expect(res.status).toBe(401);
    expect(json.success).toBe(false);
    expect(json.error.code).toBe('UNAUTHORIZED');
  });
});
