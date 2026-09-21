import { NextRequest } from 'next/server';
import { UserRole } from '@prisma/client';
import { requireRole } from '@/lib/auth';
import { apiResponse } from '@/lib/apiResponse';
import { validateData } from '@/lib/validation';
import { updateWeddingSchema } from '@/lib/validation/wedding';
import { weddingService } from '@/lib/services/wedding.service';
import { ForbiddenError, ValidationError } from '@/lib/errors';

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/v1/weddings/[id]
 * Retrieves a specific wedding owned by the authenticated client.
 * Returns 404 if not found or if wedding belongs to another client.
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireRole(UserRole.CLIENT);

    if (!user.clientProfile) {
      throw new ForbiddenError('Client profile is required to access weddings');
    }

    const { id: weddingId } = await context.params;

    const wedding = await weddingService.getWeddingForClient({
      weddingId,
      clientProfileId: user.clientProfile.id,
    });

    return apiResponse.success(wedding);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}

/**
 * PATCH /api/v1/weddings/[id]
 * Updates a specific wedding owned by the authenticated client.
 * Returns 404 if not found or if wedding belongs to another client.
 */
export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireRole(UserRole.CLIENT);

    if (!user.clientProfile) {
      throw new ForbiddenError('Client profile is required to update a wedding');
    }

    const { id: weddingId } = await context.params;

    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      throw new ValidationError('Invalid JSON body');
    }

    const input = validateData(updateWeddingSchema, rawBody);
    const updatedWedding = await weddingService.updateWeddingForClient({
      weddingId,
      clientProfileId: user.clientProfile.id,
      input,
    });

    return apiResponse.success(updatedWedding, 200, 'Wedding updated successfully');
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
