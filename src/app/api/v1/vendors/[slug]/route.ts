import { NextRequest } from 'next/server';
import { apiResponse } from '@/lib/apiResponse';
import { vendorProfileService } from '@/lib/services/vendorProfile.service';

interface RouteContext {
  params: Promise<{ slug: string }>;
}

/**
 * GET /api/v1/vendors/[slug]
 * Public endpoint to fetch details of a specific vendor profile by public slug.
 * Returns 404 if not found.
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { slug } = await context.params;

    const profile = await vendorProfileService.getPublicVendorProfileBySlug(slug);

    return apiResponse.success(profile);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
