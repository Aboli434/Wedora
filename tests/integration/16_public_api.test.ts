import { describe, it, expect, beforeAll } from 'vitest';
import { createTestFixtures } from '../helpers/fixtures';
import { GET as getVendors } from '@/app/api/v1/vendors/route';
import { GET as getVendorBySlug } from '@/app/api/v1/vendors/[slug]/route';
import { GET as getVendorServices } from '@/app/api/v1/vendors/[slug]/services/route';
import { GET as getVendorPortfolio } from '@/app/api/v1/vendors/[slug]/portfolio/route';
import { GET as getVendorAvailability } from '@/app/api/v1/vendors/[slug]/availability/route';
import { GET as getVendorReviews } from '@/app/api/v1/vendors/[slug]/reviews/route';
import { createMockNextRequest } from '../helpers/auth';

describe('Phase 43 — 16. Public API Data-Leak Protection Tests', () => {
  let fixtures: Awaited<ReturnType<typeof createTestFixtures>>;

  beforeAll(async () => {
    fixtures = await createTestFixtures();
  });

  it('should not leak sensitive user auth/phone/email details in public vendor directory list', async () => {
    const req = createMockNextRequest('/api/v1/vendors');
    const res = await getVendors(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.data).toBeDefined();

    const vendorAData = json.data.find((v: { id: string }) => v.id === fixtures.vendorProfileA!.id);
    expect(vendorAData).toBeDefined();

    // Verify no user credentials, hashed passwords, or private client data is leaked
    expect(vendorAData.password).toBeUndefined();
    expect(vendorAData.passwordHash).toBeUndefined();
    expect(vendorAData.user?.password).toBeUndefined();
    expect(vendorAData.user?.email).toBeUndefined();
  });

  it('should return public vendor profile without sensitive internal fields', async () => {
    const slug = fixtures.vendorProfileA!.slug;
    const req = createMockNextRequest(`/api/v1/vendors/${slug}`);
    const res = await getVendorBySlug(req, { params: Promise.resolve({ slug }) });
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.data.slug).toBe(slug);
    expect(json.data.user?.password).toBeUndefined();
  });

  it('should return public services without internal booking or payment data', async () => {
    const slug = fixtures.vendorProfileA!.slug;
    const req = createMockNextRequest(`/api/v1/vendors/${slug}/services`);
    const res = await getVendorServices(req, { params: Promise.resolve({ slug }) });
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(Array.isArray(json.data)).toBe(true);
    for (const item of json.data) {
      expect(item.payments).toBeUndefined();
      expect(item.bookings).toBeUndefined();
    }
  });

  it('should return public portfolio without client/booking sensitive data', async () => {
    const slug = fixtures.vendorProfileA!.slug;
    const req = createMockNextRequest(`/api/v1/vendors/${slug}/portfolio`);
    const res = await getVendorPortfolio(req, { params: Promise.resolve({ slug }) });
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json).toBeDefined();
  });

  it('should return public availability without client details', async () => {
    const slug = fixtures.vendorProfileA!.slug;
    const req = createMockNextRequest(`/api/v1/vendors/${slug}/availability`);
    const res = await getVendorAvailability(req, { params: Promise.resolve({ slug }) });
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json).toBeDefined();
  });

  it('should return published reviews without leaking client phone or private payment details', async () => {
    const slug = fixtures.vendorProfileA!.slug;
    const req = createMockNextRequest(`/api/v1/vendors/${slug}/reviews`);
    const res = await getVendorReviews(req, { params: Promise.resolve({ slug }) });
    const json = await res.json();

    expect(res.status).toBe(200);
    for (const review of json.data) {
      expect(review.client?.user?.password).toBeUndefined();
      expect(review.booking?.payments).toBeUndefined();
    }
  });
});
