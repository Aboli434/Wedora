import { NextRequest } from 'next/server';
import { UserRole } from '@prisma/client';
import { requireRole } from '@/lib/auth';
import { apiResponse } from '@/lib/apiResponse';
import { validateData } from '@/lib/validation';
import { updateVendorServiceSchema } from '@/lib/validation/vendorService';
import { vendorServiceService } from '@/lib/services/vendorService.service';
import { ForbiddenError, ValidationError } from '@/lib/errors';

interface RouteContext {
  params: Promise<{ serviceId: string }>;
}

/**
 * GET /api/v1/vendor/services/[serviceId]
 * Fetches a specific vendor service owned by the authenticated vendor.
 * Returns 404 if missing or if owned by another vendor.
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireRole(UserRole.VENDOR);

    if (!user.id) {
      throw new ForbiddenError('Vendor user identification failed');
    }

    const { serviceId } = await context.params;

    const service = await vendorServiceService.getServiceForCurrentVendor({
      userId: user.id,
      serviceId,
    });

    return apiResponse.success(service);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}

/**
 * PATCH /api/v1/vendor/services/[serviceId]
 * Updates a specific vendor service owned by the authenticated vendor.
 * Returns 404 if missing or if owned by another vendor.
 */
export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireRole(UserRole.VENDOR);

    if (!user.id) {
      throw new ForbiddenError('Vendor user identification failed');
    }

    const { serviceId } = await context.params;

    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      throw new ValidationError('Invalid JSON body');
    }

    const input = validateData(updateVendorServiceSchema, rawBody);
    const updatedService = await vendorServiceService.updateServiceForCurrentVendor({
      userId: user.id,
      serviceId,
      input,
    });

    return apiResponse.success(updatedService, 200, 'Vendor service updated successfully');
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
