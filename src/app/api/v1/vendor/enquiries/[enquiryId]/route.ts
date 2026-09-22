import { NextRequest } from 'next/server';
import { UserRole } from '@prisma/client';
import { requireRole } from '@/lib/auth';
import { apiResponse } from '@/lib/apiResponse';
import { validateData } from '@/lib/validation';
import { updateVendorEnquirySchema } from '@/lib/validation/vendorEnquiry';
import { vendorEnquiryService } from '@/lib/services/vendorEnquiry.service';
import { ForbiddenError, ValidationError } from '@/lib/errors';

interface RouteContext {
  params: Promise<{ enquiryId: string }>;
}

/**
 * GET /api/v1/vendor/enquiries/[enquiryId]
 * Fetches a specific enquiry received by the authenticated vendor.
 * Returns 404 if missing or if received by another vendor.
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireRole(UserRole.VENDOR);

    if (!user.id) {
      throw new ForbiddenError('Vendor user identification failed');
    }

    const { enquiryId } = await context.params;

    const enquiry = await vendorEnquiryService.getEnquiryForCurrentVendor({
      userId: user.id,
      enquiryId,
    });

    return apiResponse.success(enquiry);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}

/**
 * PATCH /api/v1/vendor/enquiries/[enquiryId]
 * Updates a specific enquiry received by the authenticated vendor (status, response message, etc.).
 * Returns 404 if missing or if received by another vendor.
 */
export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireRole(UserRole.VENDOR);

    if (!user.id) {
      throw new ForbiddenError('Vendor user identification failed');
    }

    const { enquiryId } = await context.params;

    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      throw new ValidationError('Invalid JSON body');
    }

    const input = validateData(updateVendorEnquirySchema, rawBody);
    const updatedEnquiry = await vendorEnquiryService.updateEnquiryForCurrentVendor({
      userId: user.id,
      enquiryId,
      input,
    });

    return apiResponse.success(updatedEnquiry, 200, 'Vendor enquiry updated successfully');
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
