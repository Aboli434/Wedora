import { NextRequest } from 'next/server';
import { UserRole } from '@prisma/client';
import { requireRole } from '@/lib/auth';
import { apiResponse } from '@/lib/apiResponse';
import { validateData } from '@/lib/validation';
import { updateVendorProfileSchema } from '@/lib/validation/vendorProfile';
import { vendorProfileService } from '@/lib/services/vendorProfile.service';
import { ForbiddenError, ValidationError } from '@/lib/errors';

/**
 * GET /api/v1/vendor/profile
 * Retrieves the current authenticated vendor's profile.
 */
export async function GET() {
  try {
    const user = await requireRole(UserRole.VENDOR);

    if (!user.id) {
      throw new ForbiddenError('Vendor user identification failed');
    }

    const profile = await vendorProfileService.getCurrentVendorProfile(user.id);

    return apiResponse.success(profile);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}

/**
 * PATCH /api/v1/vendor/profile
 * Updates the current authenticated vendor's profile.
 */
export async function PATCH(request: NextRequest) {
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

    const input = validateData(updateVendorProfileSchema, rawBody);
    const updatedProfile = await vendorProfileService.updateCurrentVendorProfile({
      userId: user.id,
      input,
    });

    return apiResponse.success(updatedProfile, 200, 'Vendor profile updated successfully');
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
