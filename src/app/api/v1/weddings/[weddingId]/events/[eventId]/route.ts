import { NextRequest } from 'next/server';
import { UserRole } from '@prisma/client';
import { requireRole } from '@/lib/auth';
import { apiResponse } from '@/lib/apiResponse';
import { validateData } from '@/lib/validation';
import { updateWeddingEventSchema } from '@/lib/validation/weddingEvent';
import { weddingEventService } from '@/lib/services/weddingEvent.service';
import { ForbiddenError, ValidationError } from '@/lib/errors';

interface RouteContext {
  params: Promise<{
    weddingId: string;
    eventId: string;
  }>;
}

/**
 * GET /api/v1/weddings/[weddingId]/events/[eventId]
 * Retrieves a specific event for a client-owned wedding.
 * Returns 404 if not found or if wedding/event belongs to another user.
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireRole(UserRole.CLIENT);

    if (!user.clientProfile) {
      throw new ForbiddenError('Client profile is required to access events');
    }

    const { weddingId, eventId } = await context.params;

    const event = await weddingEventService.getEventForClientWedding({
      weddingId,
      eventId,
      clientProfileId: user.clientProfile.id,
    });

    return apiResponse.success(event);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}

/**
 * PATCH /api/v1/weddings/[weddingId]/events/[eventId]
 * Updates a specific event for a client-owned wedding.
 * Returns 404 if not found or if wedding/event belongs to another user.
 */
export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireRole(UserRole.CLIENT);

    if (!user.clientProfile) {
      throw new ForbiddenError('Client profile is required to update an event');
    }

    const { weddingId, eventId } = await context.params;

    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      throw new ValidationError('Invalid JSON body');
    }

    const input = validateData(updateWeddingEventSchema, rawBody);
    const updatedEvent = await weddingEventService.updateEventForClientWedding({
      weddingId,
      eventId,
      clientProfileId: user.clientProfile.id,
      input,
    });

    return apiResponse.success(updatedEvent, 200, 'Wedding event updated successfully');
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
