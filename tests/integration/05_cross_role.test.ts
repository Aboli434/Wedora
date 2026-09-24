import { describe, it, expect, beforeAll } from 'vitest';
import { createTestFixtures, TestFixtures } from '../helpers/fixtures';
import { setAuthUser, createMockNextRequest } from '../helpers/auth';
import { POST as createWedding } from '@/app/api/v1/weddings/route';
import { POST as createVendorService } from '@/app/api/v1/vendor/services/route';
import { POST as createVendorPortfolio } from '@/app/api/v1/vendor/portfolio/route';

describe('Phase 43.05 — Cross-Role Boundary Security Tests', () => {
  let fixtures: TestFixtures;

  beforeAll(async () => {
    fixtures = await createTestFixtures();
  });

  it('rejects Vendor attempting to create a Client wedding with 403 Forbidden', async () => {
    setAuthUser(fixtures.vendorUserA.supabaseAuthUserId);
    const req = createMockNextRequest('http://localhost:3000/api/v1/weddings', {
      method: 'POST',
      json: {
        partner1Name: 'Vendor',
        partner2Name: 'Partner',
        title: 'Vendor Wedding',
        weddingDate: '2026-11-15',
        location: 'Goa',
        totalBudget: '100000',
      },
    });
    const res = await createWedding(req);
    const json = await res.json();

    expect(res.status).toBe(403);
    expect(json.success).toBe(false);
    expect(json.error.code).toBe('FORBIDDEN');
  });

  it('rejects Client attempting to create a Vendor service with 403 Forbidden', async () => {
    setAuthUser(fixtures.clientUserA.supabaseAuthUserId);
    const req = createMockNextRequest('http://localhost:3000/api/v1/vendor/services', {
      method: 'POST',
      json: {
        name: 'Illegal Client Service',
        price: '5000',
      },
    });
    const res = await createVendorService(req);
    const json = await res.json();

    expect(res.status).toBe(403);
    expect(json.success).toBe(false);
    expect(json.error.code).toBe('FORBIDDEN');
  });

  it('rejects Client attempting to create Vendor portfolio item with 403 Forbidden', async () => {
    setAuthUser(fixtures.clientUserA.supabaseAuthUserId);
    const req = createMockNextRequest('http://localhost:3000/api/v1/vendor/portfolio', {
      method: 'POST',
      json: {
        title: 'Illegal Client Portfolio Item',
        coverUrl: 'https://example.com/item.jpg',
      },
    });
    const res = await createVendorPortfolio(req);
    const json = await res.json();

    expect(res.status).toBe(403);
    expect(json.success).toBe(false);
    expect(json.error.code).toBe('FORBIDDEN');
  });
});
