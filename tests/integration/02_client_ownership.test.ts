import { describe, it, expect, beforeAll, beforeEach } from 'vitest';
import { createTestFixtures, TestFixtures } from '../helpers/fixtures';
import { setAuthUser, createMockNextRequest } from '../helpers/auth';
import { GET as getWedding, PATCH as updateWedding } from '@/app/api/v1/weddings/[id]/route';
import { GET as getEvents } from '@/app/api/v1/weddings/[weddingId]/events/route';
import { GET as getGuests } from '@/app/api/v1/weddings/[weddingId]/guests/route';
import { GET as getChecklist } from '@/app/api/v1/weddings/[weddingId]/checklist/route';
import { GET as getBudget } from '@/app/api/v1/weddings/[weddingId]/budget/route';
import { GET as getExpenses } from '@/app/api/v1/weddings/[weddingId]/budget/expenses/route';
import { GET as getEnquiries } from '@/app/api/v1/weddings/[weddingId]/enquiries/route';
import { GET as getBookings } from '@/app/api/v1/weddings/[weddingId]/bookings/route';

describe('Phase 43.02 — Client Ownership & Isolation Security Tests', () => {
  let fixtures: TestFixtures;

  beforeAll(async () => {
    fixtures = await createTestFixtures();
  });

  beforeEach(() => {
    // Authenticate as Client A (who does NOT own Wedding B)
    setAuthUser(fixtures.clientUserA.supabaseAuthUserId);
  });

  it('rejects Client A accessing Wedding B with 404', async () => {
    const req = createMockNextRequest(`http://localhost:3000/api/v1/weddings/${fixtures.weddingB.id}`);
    const context = { params: Promise.resolve({ id: fixtures.weddingB.id }) };
    const res = await getWedding(req, context);
    const json = await res.json();

    expect(res.status).toBe(404);
    expect(json.success).toBe(false);
  });

  it('rejects Client A updating Wedding B with 404', async () => {
    const req = createMockNextRequest(`http://localhost:3000/api/v1/weddings/${fixtures.weddingB.id}`, {
      method: 'PUT',
      json: { title: 'Hacked Title' },
    });
    const context = { params: Promise.resolve({ id: fixtures.weddingB.id }) };
    const res = await updateWedding(req, context);
    const json = await res.json();

    expect(res.status).toBe(404);
    expect(json.success).toBe(false);
  });

  it('rejects Client A reading Wedding B events with 404', async () => {
    const req = createMockNextRequest(`http://localhost:3000/api/v1/weddings/${fixtures.weddingB.id}/events`);
    const context = { params: Promise.resolve({ weddingId: fixtures.weddingB.id }) };
    const res = await getEvents(req, context);
    const json = await res.json();

    expect(res.status).toBe(404);
    expect(json.success).toBe(false);
  });

  it('rejects Client A reading Wedding B guests with 404', async () => {
    const req = createMockNextRequest(`http://localhost:3000/api/v1/weddings/${fixtures.weddingB.id}/guests`);
    const context = { params: Promise.resolve({ weddingId: fixtures.weddingB.id }) };
    const res = await getGuests(req, context);
    const json = await res.json();

    expect(res.status).toBe(404);
    expect(json.success).toBe(false);
  });

  it('rejects Client A reading Wedding B checklist with 404', async () => {
    const req = createMockNextRequest(`http://localhost:3000/api/v1/weddings/${fixtures.weddingB.id}/checklist`);
    const context = { params: Promise.resolve({ weddingId: fixtures.weddingB.id }) };
    const res = await getChecklist(req, context);
    const json = await res.json();

    expect(res.status).toBe(404);
    expect(json.success).toBe(false);
  });

  it('rejects Client A reading Wedding B budget with 404', async () => {
    const req = createMockNextRequest(`http://localhost:3000/api/v1/weddings/${fixtures.weddingB.id}/budget`);
    const context = { params: Promise.resolve({ weddingId: fixtures.weddingB.id }) };
    const res = await getBudget(req, context);
    const json = await res.json();

    expect(res.status).toBe(404);
    expect(json.success).toBe(false);
  });

  it('rejects Client A reading Wedding B expenses with 404', async () => {
    const req = createMockNextRequest(`http://localhost:3000/api/v1/weddings/${fixtures.weddingB.id}/budget/expenses`);
    const context = { params: Promise.resolve({ weddingId: fixtures.weddingB.id }) };
    const res = await getExpenses(req, context);
    const json = await res.json();

    expect(res.status).toBe(404);
    expect(json.success).toBe(false);
  });

  it('rejects Client A reading Wedding B enquiries with 404', async () => {
    const req = createMockNextRequest(`http://localhost:3000/api/v1/weddings/${fixtures.weddingB.id}/enquiries`);
    const context = { params: Promise.resolve({ weddingId: fixtures.weddingB.id }) };
    const res = await getEnquiries(req, context);
    const json = await res.json();

    expect(res.status).toBe(404);
    expect(json.success).toBe(false);
  });

  it('rejects Client A reading Wedding B bookings with 404', async () => {
    const req = createMockNextRequest(`http://localhost:3000/api/v1/weddings/${fixtures.weddingB.id}/bookings`);
    const context = { params: Promise.resolve({ weddingId: fixtures.weddingB.id }) };
    const res = await getBookings(req, context);
    const json = await res.json();

    expect(res.status).toBe(404);
    expect(json.success).toBe(false);
  });
});
