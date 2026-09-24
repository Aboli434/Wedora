import { describe, it, expect, beforeAll } from 'vitest';
import { createTestFixtures, TestFixtures } from '../helpers/fixtures';
import { setAuthUser, createMockNextRequest } from '../helpers/auth';
import { GET as getNotifications } from '@/app/api/v1/notifications/route';
import { PATCH as updateNotificationStatus, GET as getNotificationItem } from '@/app/api/v1/notifications/[notificationId]/route';
import { PATCH as markAllAsRead } from '@/app/api/v1/notifications/read-all/route';
import { prisma } from '@/lib/prisma';
import { NotificationType } from '@prisma/client';

describe('Phase 43.10 — Notification Domain Integration Tests', () => {
  let fixtures: TestFixtures;
  beforeAll(async () => {
    fixtures = await createTestFixtures();
  });

  it('lists paginated notifications for Client A with unreadCount and pagination meta', async () => {
    setAuthUser(fixtures.clientUserA.supabaseAuthUserId);

    const req = createMockNextRequest('http://localhost:3000/api/v1/notifications?page=1&pageSize=10');
    const res = await getNotifications(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(Array.isArray(json.data)).toBe(true);
    expect(json.meta).toBeDefined();
    expect(json.meta.page).toBe(1);
    expect(json.meta.pageSize).toBe(10);
    expect(typeof json.unreadCount).toBe('number');
  });

  it('marks a single notification as read for Client A', async () => {
    setAuthUser(fixtures.clientUserA.supabaseAuthUserId);

    const n = await prisma.notification.create({
      data: {
        userId: fixtures.clientUserA.id,
        title: 'Booking Confirmed',
        message: 'Your booking BKG-123 has been confirmed.',
        type: NotificationType.BOOKING,
        isRead: false,
      },
    });

    const req = createMockNextRequest(`http://localhost:3000/api/v1/notifications/${n.id}`, {
      method: 'PATCH',
      json: { isRead: true },
    });
    const context = { params: Promise.resolve({ notificationId: n.id }) };
    const res = await updateNotificationStatus(req, context);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data.isRead).toBe(true);
  });

  it('bulk marks all notifications as read for Client A', async () => {
    setAuthUser(fixtures.clientUserA.supabaseAuthUserId);

    const req = createMockNextRequest('http://localhost:3000/api/v1/notifications/read-all', {
      method: 'PATCH',
    });
    const res = await markAllAsRead(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(typeof json.data.count).toBe('number');
  });

  it('rejects Client B accessing Client A notification with 404', async () => {
    const notifA = await prisma.notification.create({
      data: {
        userId: fixtures.clientUserA.id,
        title: 'Private Notification A',
        message: 'Private message for A',
        type: NotificationType.BOOKING,
        isRead: false,
      },
    });

    setAuthUser(fixtures.clientUserB.supabaseAuthUserId);

    const req = createMockNextRequest(`http://localhost:3000/api/v1/notifications/${notifA.id}`);
    const context = { params: Promise.resolve({ notificationId: notifA.id }) };
    const res = await getNotificationItem(req, context);
    const json = await res.json();

    expect(res.status).toBe(404);
    expect(json.success).toBe(false);
  });
});
