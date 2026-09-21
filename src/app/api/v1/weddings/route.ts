import { NextRequest } from 'next/server';
import { UserRole } from '@prisma/client';
import { requireRole } from '@/lib/auth';
import { apiResponse } from '@/lib/apiResponse';
import { validateData } from '@/lib/validation';
import { createWeddingSchema } from '@/lib/validation/wedding';
import { weddingService } from '@/lib/services/wedding.service';
import { ForbiddenError, ValidationError } from '@/lib/errors';

/**
 * GET /api/v1/weddings
 * Lists all weddings belonging to the authenticated client.
 */
export async function GET() {
  try {
    const user = await requireRole(UserRole.CLIENT);

    if (!user.clientProfile) {
      throw new ForbiddenError('Client profile is required to manage weddings');
    }

    const weddings = await weddingService.listWeddingsForClient(user.clientProfile.id);
    return apiResponse.success(weddings);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}

/**
 * POST /api/v1/weddings
 * Creates a new wedding owned by the authenticated client.
 */
export async function POST(request: NextRequest) {
  try {
    const user = await requireRole(UserRole.CLIENT);

    if (!user.clientProfile) {
      throw new ForbiddenError('Client profile is required to create a wedding');
    }

    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      throw new ValidationError('Invalid JSON body');
    }

    const input = validateData(createWeddingSchema, rawBody);
    const createdWedding = await weddingService.createWeddingForClient({
      clientProfileId: user.clientProfile.id,
      input,
    });

    return apiResponse.success(createdWedding, 201, 'Wedding created successfully');
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
