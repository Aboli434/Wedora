import { NextRequest, NextResponse } from 'next/server';
import { apiResponse } from '@/lib/apiResponse';
import { validateData } from '@/lib/validation';
import { vendorDirectoryQuerySchema, VendorDirectoryQueryInput } from '@/lib/validation/vendorProfile';
import { vendorProfileService } from '@/lib/services/vendorProfile.service';

/**
 * GET /api/v1/vendors
 * Public endpoint to search and browse vendor profiles directory.
 * Supports filtering by category, city, featured status, text search, sorting, and pagination.
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const rawQueryParams = {
      search: searchParams.get('search') || undefined,
      category: searchParams.get('category') || undefined,
      city: searchParams.get('city') || undefined,
      featured: searchParams.get('featured') || undefined,
      sort: searchParams.get('sort') || undefined,
      page: searchParams.get('page') || undefined,
      limit: searchParams.get('limit') || undefined,
    };

    const query = validateData(vendorDirectoryQuerySchema, rawQueryParams) as unknown as VendorDirectoryQueryInput;
    const result = await vendorProfileService.listPublicVendorProfiles(query);

    return NextResponse.json(
      {
        success: true,
        data: result.data,
        meta: result.meta,
      },
      { status: 200 }
    );
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
