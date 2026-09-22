import { NextRequest } from 'next/server';
import { UserRole } from '@prisma/client';
import { requireRole } from '@/lib/auth';
import { apiResponse } from '@/lib/apiResponse';
import { validateData } from '@/lib/validation';
import { createMediaAssetSchema } from '@/lib/validation/vendorPortfolio';
import { vendorPortfolioService } from '@/lib/services/vendorPortfolio.service';
import { ForbiddenError, ValidationError } from '@/lib/errors';

/**
 * GET /api/v1/vendor/media
 * Lists all media assets owned by the current authenticated vendor.
 */
export async function GET() {
  try {
    const user = await requireRole(UserRole.VENDOR);

    if (!user.id) {
      throw new ForbiddenError('Vendor user identification failed');
    }

    const mediaList = await vendorPortfolioService.listMediaForCurrentVendor(user.id);

    return apiResponse.success(mediaList);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}

/**
 * POST /api/v1/vendor/media
 * Creates a new media asset metadata record for the current authenticated vendor.
 */
export async function POST(request: NextRequest) {
  try {
    const user = await requireRole(UserRole.VENDOR);

    if (!user.id) {
      throw new ForbiddenError('Vendor user identification failed');
    }

    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      throw new ValidationError('Invalid JSON body');
    }

    const input = validateData(createMediaAssetSchema, rawBody);
    const createdMedia = await vendorPortfolioService.createMediaForCurrentVendor({
      userId: user.id,
      input,
    });

    return apiResponse.success(createdMedia, 201, 'Media asset created successfully');
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
