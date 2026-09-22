import { NextRequest } from 'next/server';
import { UserRole } from '@prisma/client';
import { requireRole } from '@/lib/auth';
import { apiResponse } from '@/lib/apiResponse';
import { validateData } from '@/lib/validation';
import { createWeddingEventSchema } from '@/lib/validation/weddingEvent';
import { weddingEventService } from '@/lib/services/weddingEvent.service';
import { ForbiddenError, ValidationError } from '@/lib/errors';

interface RouteContext {
  params: Promise<{ weddingId: string }>;
}

/**
 * GET /api/v1/weddings/[weddingId]/events
 * Lists all events for a specific client-owned wedding.
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireRole(UserRole.CLIENT);

    if (!user.clientProfile) {
      throw new ForbiddenError('Client profile is required to access events');
    }

    const { weddingId } = await context.params;

    const events = await weddingEventService.listEventsForClientWedding({
      weddingId,
      clientProfileId: user.clientProfile.id,
    });

    return apiResponse.success(events);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}

/**
 * POST /api/v1/weddings/[weddingId]/events
 * Creates a new event for a client-owned wedding.
 */
export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireRole(UserRole.CLIENT);

    if (!user.clientProfile) {
      throw new ForbiddenError('Client profile is required to create an event');
    }

    const { weddingId } = await context.params;

    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      throw new ValidationError('Invalid JSON body');
    }

    const input = validateData(createWeddingEventSchema, rawBody);
    const createdEvent = await weddingEventService.createEventForClientWedding({
      weddingId,
      clientProfileId: user.clientProfile.id,
      input,
    });

    return apiResponse.success(createdEvent, 201, 'Wedding event created successfully');
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
