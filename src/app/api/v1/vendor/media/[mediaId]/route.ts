import { NextRequest } from 'next/server';
import { UserRole } from '@prisma/client';
import { requireRole } from '@/lib/auth';
import { apiResponse } from '@/lib/apiResponse';
import { validateData } from '@/lib/validation';
import { updateMediaAssetSchema } from '@/lib/validation/vendorPortfolio';
import { vendorPortfolioService } from '@/lib/services/vendorPortfolio.service';
import { ForbiddenError, ValidationError } from '@/lib/errors';

interface RouteContext {
  params: Promise<{ mediaId: string }>;
}

/**
 * GET /api/v1/vendor/media/[mediaId]
 * Fetches a specific media asset owned by the authenticated vendor.
 * Returns 404 if missing or if owned by another vendor.
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireRole(UserRole.VENDOR);

    if (!user.id) {
      throw new ForbiddenError('Vendor user identification failed');
    }

    const { mediaId } = await context.params;

    const media = await vendorPortfolioService.getMediaForCurrentVendor({
      userId: user.id,
      mediaId,
    });

    return apiResponse.success(media);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}

/**
 * PATCH /api/v1/vendor/media/[mediaId]
 * Updates a specific media asset owned by the authenticated vendor.
 * Returns 404 if missing or if owned by another vendor.
 */
export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireRole(UserRole.VENDOR);

    if (!user.id) {
      throw new ForbiddenError('Vendor user identification failed');
    }

    const { mediaId } = await context.params;

    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      throw new ValidationError('Invalid JSON body');
    }

    const input = validateData(updateMediaAssetSchema, rawBody);
    const updatedMedia = await vendorPortfolioService.updateMediaForCurrentVendor({
      userId: user.id,
      mediaId,
      input,
    });

    return apiResponse.success(updatedMedia, 200, 'Media asset updated successfully');
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
