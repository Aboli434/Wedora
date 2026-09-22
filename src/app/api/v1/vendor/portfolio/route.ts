import { NextRequest } from 'next/server';
import { UserRole } from '@prisma/client';
import { requireRole } from '@/lib/auth';
import { apiResponse } from '@/lib/apiResponse';
import { validateData } from '@/lib/validation';
import { createVendorPortfolioItemSchema } from '@/lib/validation/vendorPortfolio';
import { vendorPortfolioService } from '@/lib/services/vendorPortfolio.service';
import { ForbiddenError, ValidationError } from '@/lib/errors';

/**
 * GET /api/v1/vendor/portfolio
 * Lists all portfolio items owned by the current authenticated vendor.
 */
export async function GET() {
  try {
    const user = await requireRole(UserRole.VENDOR);

    if (!user.id) {
      throw new ForbiddenError('Vendor user identification failed');
    }

    const items = await vendorPortfolioService.listPortfolioForCurrentVendor(user.id);

    return apiResponse.success(items);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}

/**
 * POST /api/v1/vendor/portfolio
 * Creates a new portfolio item for the current authenticated vendor.
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

    const input = validateData(createVendorPortfolioItemSchema, rawBody);
    const createdItem = await vendorPortfolioService.createPortfolioItemForCurrentVendor({
      userId: user.id,
      input,
    });

    return apiResponse.success(createdItem, 201, 'Portfolio item created successfully');
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
