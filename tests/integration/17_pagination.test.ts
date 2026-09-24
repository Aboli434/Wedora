import { describe, it, expect, beforeAll } from 'vitest';
import { createTestFixtures } from '../helpers/fixtures';
import { setAuthUser, createMockNextRequest } from '../helpers/auth';
import { GET as getNotifications } from '@/app/api/v1/notifications/route';
import { GET as getActivityLogs } from '@/app/api/v1/activity/route';
import { GET as getVendors } from '@/app/api/v1/vendors/route';

describe('Phase 43 — 17. Pagination Tests', () => {
  let fixtures: Awaited<ReturnType<typeof createTestFixtures>>;

  beforeAll(async () => {
    fixtures = await createTestFixtures();
  });

  it('should return standard pagination metadata structure for notifications API', async () => {
    setAuthUser(fixtures.clientUserA.supabaseAuthUserId);
    const req = createMockNextRequest('/api/v1/notifications?page=1&pageSize=5');
    const res = await getNotifications(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.data).toBeDefined();
    expect(Array.isArray(json.data)).toBe(true);
    expect(json.meta).toBeDefined();
    expect(json.meta.page).toBe(1);
    expect(json.meta.pageSize).toBe(5);
    expect(typeof json.meta.total).toBe('number');
    expect(typeof json.meta.totalPages).toBe('number');
  });

  it('should return standard pagination metadata structure for activity logs API', async () => {
    setAuthUser(fixtures.clientUserA.supabaseAuthUserId);
    const req = createMockNextRequest('/api/v1/activity?page=1&pageSize=10');
    const res = await getActivityLogs(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.data).toBeDefined();
    expect(Array.isArray(json.data)).toBe(true);
    expect(json.meta).toBeDefined();
    expect(json.meta.page).toBe(1);
    expect(json.meta.pageSize).toBe(10);
  });

  it('should handle page beyond total gracefully returning empty data array and valid metadata', async () => {
    setAuthUser(fixtures.clientUserA.supabaseAuthUserId);
    const req = createMockNextRequest('/api/v1/notifications?page=999&pageSize=10');
    const res = await getNotifications(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.data).toEqual([]);
    expect(json.meta.page).toBe(999);
    expect(json.meta.pageSize).toBe(10);
  });

  it('should support pagination on public vendors API', async () => {
    const req = createMockNextRequest('/api/v1/vendors?page=1&limit=2');
    const res = await getVendors(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.meta.page).toBe(1);
    expect(json.meta.pageSize).toBe(2);
  });
});
