import { describe, it, expect, beforeAll, beforeEach } from 'vitest';
import { createTestFixtures, TestFixtures } from '../helpers/fixtures';
import { setAuthUser, createMockNextRequest } from '../helpers/auth';
import { GET as getServices, PATCH as updateService } from '@/app/api/v1/vendor/services/[serviceId]/route';
import { GET as getPortfolio } from '@/app/api/v1/vendor/portfolio/[portfolioId]/route';
import { PATCH as updateMedia } from '@/app/api/v1/vendor/media/[mediaId]/route';
import { GET as getVendorsPublic } from '@/app/api/v1/vendors/route';
import { GET as getVendorPublicBySlug } from '@/app/api/v1/vendors/[slug]/route';

describe('Phase 43.04 — Vendor Ownership & Isolation Security Tests', () => {
  let fixtures: TestFixtures;

  beforeAll(async () => {
    fixtures = await createTestFixtures();
  });

  beforeEach(() => {
    // Authenticate as Vendor A (who does NOT own Vendor B's resources)
    setAuthUser(fixtures.vendorUserA.supabaseAuthUserId);
  });

  it('rejects Vendor A reading Vendor B service with 404', async () => {
    const req = createMockNextRequest(`http://localhost:3000/api/v1/vendor/services/${fixtures.vendorServiceB.id}`);
    const context = { params: Promise.resolve({ serviceId: fixtures.vendorServiceB.id }) };
    const res = await getServices(req, context);
    const json = await res.json();

    expect(res.status).toBe(404);
    expect(json.success).toBe(false);
  });

  it('rejects Vendor A updating Vendor B service with 404', async () => {
    const req = createMockNextRequest(`http://localhost:3000/api/v1/vendor/services/${fixtures.vendorServiceB.id}`, {
      method: 'PATCH',
      json: { name: 'Hacked Service' },
    });
    const context = { params: Promise.resolve({ serviceId: fixtures.vendorServiceB.id }) };
    const res = await updateService(req, context);
    const json = await res.json();

    expect(res.status).toBe(404);
    expect(json.success).toBe(false);
  });

  it('rejects Vendor A reading Vendor B portfolio item with 404', async () => {
    const req = createMockNextRequest(`http://localhost:3000/api/v1/vendor/portfolio/${fixtures.vendorPortfolioB.id}`);
    const context = { params: Promise.resolve({ portfolioId: fixtures.vendorPortfolioB.id }) };
    const res = await getPortfolio(req, context);
    const json = await res.json();

    expect(res.status).toBe(404);
    expect(json.success).toBe(false);
  });

  it('rejects Vendor A updating Vendor B media asset with 404', async () => {
    const req = createMockNextRequest(`http://localhost:3000/api/v1/vendor/media/${fixtures.vendorMediaB.id}`, {
      method: 'PATCH',
      json: { caption: 'Hacked Media' },
    });
    const context = { params: Promise.resolve({ mediaId: fixtures.vendorMediaB.id }) };
    const res = await updateMedia(req, context);
    const json = await res.json();

    expect(res.status).toBe(404);
    expect(json.success).toBe(false);
  });

  it('allows public unauthenticated reading of public vendor directory', async () => {
    setAuthUser(null);
    const req = createMockNextRequest('http://localhost:3000/api/v1/vendors');
    const res = await getVendorsPublic(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(Array.isArray(json.data)).toBe(true);
  });

  it('allows public unauthenticated reading of public vendor profile by slug', async () => {
    setAuthUser(null);
    const req = createMockNextRequest(`http://localhost:3000/api/v1/vendors/${fixtures.vendorProfileA.slug}`);
    const context = { params: Promise.resolve({ slug: fixtures.vendorProfileA.slug }) };
    const res = await getVendorPublicBySlug(req, context);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data.businessName).toBe('Alex Photography');
  });
});
