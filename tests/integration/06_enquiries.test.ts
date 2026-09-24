import { describe, it, expect, beforeAll } from 'vitest';
import { createTestFixtures, TestFixtures } from '../helpers/fixtures';
import { setAuthUser, createMockNextRequest } from '../helpers/auth';
import { POST as createEnquiry } from '@/app/api/v1/weddings/[weddingId]/enquiries/route';
import { POST as createMessage, GET as getMessages } from '@/app/api/v1/enquiries/[enquiryId]/messages/route';
import { POST as convertEnquiry } from '@/app/api/v1/weddings/[weddingId]/enquiries/[enquiryId]/convert/route';
import { prisma } from '@/lib/prisma';
import { EnquiryStatus, NotificationType } from '@prisma/client';

describe('Phase 43.06 — Enquiry & Message Domain Integration Tests', () => {
  let fixtures: TestFixtures;

  beforeAll(async () => {
    fixtures = await createTestFixtures();
  });

  it('creates an enquiry and sends a notification to target vendor', async () => {
    setAuthUser(fixtures.clientUserA.supabaseAuthUserId);

    const req = createMockNextRequest(
      `http://localhost:3000/api/v1/weddings/${fixtures.weddingA.id}/enquiries`,
      {
        method: 'POST',
        json: {
          vendorId: fixtures.vendorProfileA.id,
          eventDate: '2026-11-20',
          message: 'Hello Alex, need quote for full day photo package',
          estimatedBudget: '150000',
        },
      }
    );
    const context = { params: Promise.resolve({ weddingId: fixtures.weddingA.id }) };
    const res = await createEnquiry(req, context);
    const json = await res.json();

    expect(res.status).toBe(201);
    expect(json.success).toBe(true);
    expect(json.data.referenceCode).toMatch(/^ENQ-/);

    // Verify Notification created for Vendor A
    const notification = await prisma.notification.findFirst({
      where: {
        userId: fixtures.vendorUserA.id,
        type: NotificationType.ENQUIRY,
      },
      orderBy: { createdAt: 'desc' },
    });

    expect(notification).toBeDefined();
    expect(notification?.title).toBe('New Enquiry Received');

    // Verify ActivityLog created for Client A
    const activity = await prisma.activityLog.findFirst({
      where: {
        userId: fixtures.clientUserA.id,
        action: 'ENQUIRY_CREATED',
      },
      orderBy: { createdAt: 'desc' },
    });

    expect(activity).toBeDefined();
    expect(activity?.entityId).toBe(json.data.id);
  });

  it('sends an enquiry message to counter-party and generates recipient notification', async () => {
    // Client A sends message to Vendor A on enquiryA
    setAuthUser(fixtures.clientUserA.supabaseAuthUserId);

    const req = createMockNextRequest(
      `http://localhost:3000/api/v1/enquiries/${fixtures.enquiryA.id}/messages`,
      {
        method: 'POST',
        json: {
          message: 'What packages do you offer?',
        },
      }
    );
    const context = { params: Promise.resolve({ enquiryId: fixtures.enquiryA.id }) };
    const res = await createMessage(req, context);
    const json = await res.json();

    expect(res.status).toBe(201);
    expect(json.success).toBe(true);

    // Verify Notification received by Vendor A
    const notification = await prisma.notification.findFirst({
      where: {
        userId: fixtures.vendorUserA.id,
        title: 'New Enquiry Message',
      },
      orderBy: { createdAt: 'desc' },
    });

    expect(notification).toBeDefined();

    // Verify ActivityLog created for Client A (sender)
    const activity = await prisma.activityLog.findFirst({
      where: {
        userId: fixtures.clientUserA.id,
        action: 'ENQUIRY_MESSAGE_SENT',
      },
      orderBy: { createdAt: 'desc' },
    });

    expect(activity).toBeDefined();
  });

  it('rejects message access for unrelated Client B with 404', async () => {
    setAuthUser(fixtures.clientUserB.supabaseAuthUserId);

    const req = createMockNextRequest(
      `http://localhost:3000/api/v1/enquiries/${fixtures.enquiryA.id}/messages`
    );
    const context = { params: Promise.resolve({ enquiryId: fixtures.enquiryA.id }) };
    const res = await getMessages(req, context);
    const json = await res.json();

    expect(res.status).toBe(404);
    expect(json.success).toBe(false);
  });

  it('converts an enquiry into a booking and rejects duplicate conversion with 409', async () => {
    setAuthUser(fixtures.clientUserA.supabaseAuthUserId);

    // First conversion
    const req1 = createMockNextRequest(
      `http://localhost:3000/api/v1/weddings/${fixtures.weddingA.id}/enquiries/${fixtures.enquiryA.id}/convert`,
      { method: 'POST' }
    );
    const context = {
      params: Promise.resolve({
        weddingId: fixtures.weddingA.id,
        enquiryId: fixtures.enquiryA.id,
      }),
    };
    const res1 = await convertEnquiry(req1, context);
    const json1 = await res1.json();

    expect(res1.status).toBe(201);
    expect(json1.success).toBe(true);
    expect(json1.data.referenceCode).toMatch(/^BKG-/);

    // Verify Enquiry status is now CONVERTED
    const updatedEnquiry = await prisma.vendorEnquiry.findUnique({
      where: { id: fixtures.enquiryA.id },
    });
    expect(updatedEnquiry?.status).toBe(EnquiryStatus.CONVERTED);

    // Second conversion attempt -> 409 Conflict
    const req2 = createMockNextRequest(
      `http://localhost:3000/api/v1/weddings/${fixtures.weddingA.id}/enquiries/${fixtures.enquiryA.id}/convert`,
      { method: 'POST' }
    );
    const res2 = await convertEnquiry(req2, context);
    const json2 = await res2.json();

    expect(res2.status).toBe(409);
    expect(json2.success).toBe(false);
    expect(json2.error.code).toBe('CONFLICT');
  });
});
