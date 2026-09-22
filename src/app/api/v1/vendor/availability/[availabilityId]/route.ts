import { NextRequest } from 'next/server';
import { UserRole } from '@prisma/client';
import { requireRole } from '@/lib/auth';
import { apiResponse } from '@/lib/apiResponse';
import { validateData } from '@/lib/validation';
import { updateVendorAvailabilitySchema } from '@/lib/validation/vendorAvailability';
import { vendorAvailabilityService } from '@/lib/services/vendorAvailability.service';
import { ForbiddenError, ValidationError } from '@/lib/errors';

interface RouteContext {
  params: Promise<{ availabilityId: string }>;
}

/**
 * GET /api/v1/vendor/availability/[availabilityId]
 * Fetches a specific availability record owned by the authenticated vendor.
 * Returns 404 if missing or if owned by another vendor.
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireRole(UserRole.VENDOR);

    if (!user.id) {
      throw new ForbiddenError('Vendor user identification failed');
    }

    const { availabilityId } = await context.params;

    const record = await vendorAvailabilityService.getAvailabilityByIdForCurrentVendor({
      userId: user.id,
      availabilityId,
    });

    return apiResponse.success(record);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}

/**
 * PATCH /api/v1/vendor/availability/[availabilityId]
 * Updates a specific availability record owned by the authenticated vendor.
 * Returns 404 if missing or if owned by another vendor.
 */
export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireRole(UserRole.VENDOR);

    if (!user.id) {
      throw new ForbiddenError('Vendor user identification failed');
    }

    const { availabilityId } = await context.params;

    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      throw new ValidationError('Invalid JSON body');
    }

    const input = validateData(updateVendorAvailabilitySchema, rawBody);
    const updatedRecord = await vendorAvailabilityService.updateAvailabilityForCurrentVendor({
      userId: user.id,
      availabilityId,
      input,
    });

    return apiResponse.success(updatedRecord, 200, 'Availability record updated successfully');
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
