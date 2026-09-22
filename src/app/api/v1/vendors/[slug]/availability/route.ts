import { NextRequest } from 'next/server';
import { apiResponse } from '@/lib/apiResponse';
import { validateData } from '@/lib/validation';
import {
  vendorAvailabilityQuerySchema,
  VendorAvailabilityQueryInput,
} from '@/lib/validation/vendorAvailability';
import { vendorAvailabilityService } from '@/lib/services/vendorAvailability.service';

interface RouteContext {
  params: Promise<{ slug: string }>;
}

/**
 * GET /api/v1/vendors/[slug]/availability
 * Public endpoint to list availability records for a vendor identified by public slug.
 * Returns 404 if vendor slug is invalid/missing.
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { slug } = await context.params;

    const searchParams = request.nextUrl.searchParams;
    const rawQueryParams = {
      startDate: searchParams.get('startDate') || undefined,
      endDate: searchParams.get('endDate') || undefined,
      isAvailable: searchParams.get('isAvailable') || undefined,
    };

    const query = validateData(vendorAvailabilityQuerySchema, rawQueryParams) as VendorAvailabilityQueryInput;
    const records = await vendorAvailabilityService.listPublicAvailabilityForVendor({
      slug,
      query,
    });

    return apiResponse.success(records);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
