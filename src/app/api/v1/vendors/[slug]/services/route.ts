import { NextRequest } from 'next/server';
import { apiResponse } from '@/lib/apiResponse';
import { vendorServiceService } from '@/lib/services/vendorService.service';

interface RouteContext {
  params: Promise<{ slug: string }>;
}

/**
 * GET /api/v1/vendors/[slug]/services
 * Public endpoint to list all services offered by a specific vendor identified by slug.
 * Returns 404 if vendor slug is invalid/missing.
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { slug } = await context.params;

    const services = await vendorServiceService.listPublicServicesForVendor(slug);

    return apiResponse.success(services);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
