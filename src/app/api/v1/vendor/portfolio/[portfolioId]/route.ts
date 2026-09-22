import { NextRequest } from 'next/server';
import { UserRole } from '@prisma/client';
import { requireRole } from '@/lib/auth';
import { apiResponse } from '@/lib/apiResponse';
import { validateData } from '@/lib/validation';
import { updateVendorPortfolioItemSchema } from '@/lib/validation/vendorPortfolio';
import { vendorPortfolioService } from '@/lib/services/vendorPortfolio.service';
import { ForbiddenError, ValidationError } from '@/lib/errors';

interface RouteContext {
  params: Promise<{ portfolioId: string }>;
}

/**
 * GET /api/v1/vendor/portfolio/[portfolioId]
 * Fetches a specific portfolio item owned by the authenticated vendor.
 * Returns 404 if missing or if owned by another vendor.
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireRole(UserRole.VENDOR);

    if (!user.id) {
      throw new ForbiddenError('Vendor user identification failed');
    }

    const { portfolioId } = await context.params;

    const item = await vendorPortfolioService.getPortfolioItemForCurrentVendor({
      userId: user.id,
      portfolioId,
    });

    return apiResponse.success(item);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}

/**
 * PATCH /api/v1/vendor/portfolio/[portfolioId]
 * Updates a specific portfolio item owned by the authenticated vendor.
 * Returns 404 if missing or if owned by another vendor.
 */
export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireRole(UserRole.VENDOR);

    if (!user.id) {
      throw new ForbiddenError('Vendor user identification failed');
    }

    const { portfolioId } = await context.params;

    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      throw new ValidationError('Invalid JSON body');
    }

    const input = validateData(updateVendorPortfolioItemSchema, rawBody);
    const updatedItem = await vendorPortfolioService.updatePortfolioItemForCurrentVendor({
      userId: user.id,
      portfolioId,
      input,
    });

    return apiResponse.success(updatedItem, 200, 'Portfolio item updated successfully');
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
