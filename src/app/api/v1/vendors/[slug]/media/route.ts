import { NextRequest } from 'next/server';
import { apiResponse } from '@/lib/apiResponse';
import { vendorPortfolioService } from '@/lib/services/vendorPortfolio.service';

interface RouteContext {
  params: Promise<{ slug: string }>;
}

/**
 * GET /api/v1/vendors/[slug]/media
 * Public endpoint to list all media assets for a vendor identified by public slug.
 * Returns 404 if vendor slug is invalid/missing.
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { slug } = await context.params;

    const mediaList = await vendorPortfolioService.listPublicMediaForVendor(slug);

    return apiResponse.success(mediaList);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
