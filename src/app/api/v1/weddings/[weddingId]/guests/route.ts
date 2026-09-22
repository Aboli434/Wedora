import { NextRequest } from 'next/server';
import { UserRole } from '@prisma/client';
import { requireRole } from '@/lib/auth';
import { apiResponse } from '@/lib/apiResponse';
import { validateData } from '@/lib/validation';
import { createGuestSchema } from '@/lib/validation/guest';
import { guestService } from '@/lib/services/guest.service';
import { ForbiddenError, ValidationError } from '@/lib/errors';

interface RouteContext {
  params: Promise<{ weddingId: string }>;
}

/**
 * GET /api/v1/weddings/[weddingId]/guests
 * Lists all guests for a specific client-owned wedding.
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireRole(UserRole.CLIENT);

    if (!user.clientProfile) {
      throw new ForbiddenError('Client profile is required to access guests');
    }

    const { weddingId } = await context.params;

    const guests = await guestService.listGuestsForClientWedding({
      weddingId,
      clientProfileId: user.clientProfile.id,
    });

    return apiResponse.success(guests);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}

/**
 * POST /api/v1/weddings/[weddingId]/guests
 * Creates a new guest for a client-owned wedding.
 */
export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireRole(UserRole.CLIENT);

    if (!user.clientProfile) {
      throw new ForbiddenError('Client profile is required to create a guest');
    }

    const { weddingId } = await context.params;

    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      throw new ValidationError('Invalid JSON body');
    }

    const input = validateData(createGuestSchema, rawBody);
    const createdGuest = await guestService.createGuestForClientWedding({
      weddingId,
      clientProfileId: user.clientProfile.id,
      input,
    });

    return apiResponse.success(createdGuest, 201, 'Guest created successfully');
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
