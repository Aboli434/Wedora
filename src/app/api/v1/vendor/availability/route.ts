import { NextRequest } from 'next/server';
import { UserRole } from '@prisma/client';
import { requireRole } from '@/lib/auth';
import { apiResponse } from '@/lib/apiResponse';
import { validateData } from '@/lib/validation';
import {
  createVendorAvailabilitySchema,
  vendorAvailabilityQuerySchema,
  VendorAvailabilityQueryInput,
} from '@/lib/validation/vendorAvailability';
import { vendorAvailabilityService } from '@/lib/services/vendorAvailability.service';
import { ForbiddenError, ValidationError } from '@/lib/errors';

/**
 * GET /api/v1/vendor/availability
 * Lists all availability records for the current authenticated vendor.
 * Supports optional date range filters (startDate, endDate) and status filter (isAvailable).
 */
export async function GET(request: NextRequest) {
  try {
    const user = await requireRole(UserRole.VENDOR);

    if (!user.id) {
      throw new ForbiddenError('Vendor user identification failed');
    }

    const searchParams = request.nextUrl.searchParams;
    const rawQueryParams = {
      startDate: searchParams.get('startDate') || undefined,
      endDate: searchParams.get('endDate') || undefined,
      isAvailable: searchParams.get('isAvailable') || undefined,
    };

    const query = validateData(vendorAvailabilityQuerySchema, rawQueryParams) as VendorAvailabilityQueryInput;
    const records = await vendorAvailabilityService.listAvailabilityForCurrentVendor({
      userId: user.id,
      query,
    });

    return apiResponse.success(records);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}

/**
 * POST /api/v1/vendor/availability
 * Creates a new availability record for the current authenticated vendor.
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

    const input = validateData(createVendorAvailabilitySchema, rawBody);
    const createdRecord = await vendorAvailabilityService.createAvailabilityForCurrentVendor({
      userId: user.id,
      input,
    });

    return apiResponse.success(createdRecord, 201, 'Availability record created successfully');
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
