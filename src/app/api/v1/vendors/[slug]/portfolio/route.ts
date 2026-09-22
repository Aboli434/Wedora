import { NextRequest } from 'next/server';
import { apiResponse } from '@/lib/apiResponse';
import { vendorPortfolioService } from '@/lib/services/vendorPortfolio.service';

interface RouteContext {
  params: Promise<{ slug: string }>;
}

/**
 * GET /api/v1/vendors/[slug]/portfolio
 * Public endpoint to list all portfolio items for a vendor identified by public slug.
 * Returns 404 if vendor slug is invalid/missing.
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { slug } = await context.params;

    const items = await vendorPortfolioService.listPublicPortfolioForVendor(slug);

    return apiResponse.success(items);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
