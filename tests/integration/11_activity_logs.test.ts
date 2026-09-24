import { describe, it, expect, beforeAll } from 'vitest';
import { createTestFixtures, TestFixtures } from '../helpers/fixtures';
import { setAuthUser, createMockNextRequest } from '../helpers/auth';
import { GET as getActivityLogs } from '@/app/api/v1/activity/route';
import { prisma } from '@/lib/prisma';
import { LogSeverity } from '@prisma/client';

describe('Phase 43.11 — Activity Log Domain Integration Tests', () => {
  let fixtures: TestFixtures;

  beforeAll(async () => {
    fixtures = await createTestFixtures();

    // Insert test activity logs for Client A and Client B
    await prisma.activityLog.create({
      data: {
        userId: fixtures.clientUserA.id,
        action: 'WEDDING_CREATED',
        entityType: 'Wedding',
        entityId: fixtures.weddingA.id,
        severity: LogSeverity.INFO,
      },
    });

    await prisma.activityLog.create({
      data: {
        userId: fixtures.clientUserB.id,
        action: 'WEDDING_CREATED',
        entityType: 'Wedding',
        entityId: fixtures.weddingB.id,
        severity: LogSeverity.INFO,
      },
    });
  });

  it('lists activity logs exclusively for authenticated Client A with pagination meta', async () => {
    setAuthUser(fixtures.clientUserA.supabaseAuthUserId);

    const req = createMockNextRequest('http://localhost:3000/api/v1/activity?page=1&pageSize=10');
    const res = await getActivityLogs(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(Array.isArray(json.data)).toBe(true);
    expect(json.meta).toBeDefined();

    // Verify all returned logs belong strictly to Client A
    for (const item of json.data) {
      expect(item.userId).toBe(fixtures.clientUserA.id);
    }
  });

  it('ensures Client B receives only Client B activity logs', async () => {
    setAuthUser(fixtures.clientUserB.supabaseAuthUserId);

    const req = createMockNextRequest('http://localhost:3000/api/v1/activity');
    const res = await getActivityLogs(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    for (const item of json.data) {
      expect(item.userId).toBe(fixtures.clientUserB.id);
    }
  });
});
