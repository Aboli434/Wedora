import { NextRequest } from 'next/server';
import { UserRole } from '@prisma/client';
import { requireRole } from '@/lib/auth';
import { apiResponse } from '@/lib/apiResponse';
import { validateData } from '@/lib/validation';
import { createVendorServiceSchema } from '@/lib/validation/vendorService';
import { vendorServiceService } from '@/lib/services/vendorService.service';
import { ForbiddenError, ValidationError } from '@/lib/errors';

/**
 * GET /api/v1/vendor/services
 * Lists all services owned by the current authenticated vendor.
 */
export async function GET() {
  try {
    const user = await requireRole(UserRole.VENDOR);

    if (!user.id) {
      throw new ForbiddenError('Vendor user identification failed');
    }

    const services = await vendorServiceService.listServicesForCurrentVendor(user.id);

    return apiResponse.success(services);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}

/**
 * POST /api/v1/vendor/services
 * Creates a new vendor service for the current authenticated vendor.
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

    const input = validateData(createVendorServiceSchema, rawBody);
    const createdService = await vendorServiceService.createServiceForCurrentVendor({
      userId: user.id,
      input,
    });

    return apiResponse.success(createdService, 201, 'Vendor service created successfully');
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
