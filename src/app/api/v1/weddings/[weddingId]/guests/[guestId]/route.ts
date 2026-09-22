import { NextRequest } from 'next/server';
import { UserRole } from '@prisma/client';
import { requireRole } from '@/lib/auth';
import { apiResponse } from '@/lib/apiResponse';
import { validateData } from '@/lib/validation';
import { updateGuestSchema } from '@/lib/validation/guest';
import { guestService } from '@/lib/services/guest.service';
import { ForbiddenError, ValidationError } from '@/lib/errors';

interface RouteContext {
  params: Promise<{
    weddingId: string;
    guestId: string;
  }>;
}

/**
 * GET /api/v1/weddings/[weddingId]/guests/[guestId]
 * Retrieves a specific guest for a client-owned wedding.
 * Returns 404 if not found or if wedding/guest belongs to another user.
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireRole(UserRole.CLIENT);

    if (!user.clientProfile) {
      throw new ForbiddenError('Client profile is required to access guests');
    }

    const { weddingId, guestId } = await context.params;

    const guest = await guestService.getGuestForClientWedding({
      weddingId,
      guestId,
      clientProfileId: user.clientProfile.id,
    });

    return apiResponse.success(guest);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}

/**
 * PATCH /api/v1/weddings/[weddingId]/guests/[guestId]
 * Updates a specific guest for a client-owned wedding.
 * Returns 404 if not found or if wedding/guest belongs to another user.
 */
export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireRole(UserRole.CLIENT);

    if (!user.clientProfile) {
      throw new ForbiddenError('Client profile is required to update a guest');
    }

    const { weddingId, guestId } = await context.params;

    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      throw new ValidationError('Invalid JSON body');
    }

    const input = validateData(updateGuestSchema, rawBody);
    const updatedGuest = await guestService.updateGuestForClientWedding({
      weddingId,
      guestId,
      clientProfileId: user.clientProfile.id,
      input,
    });

    return apiResponse.success(updatedGuest, 200, 'Guest updated successfully');
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
