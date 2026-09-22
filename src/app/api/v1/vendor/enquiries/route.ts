import { UserRole } from '@prisma/client';
import { requireRole } from '@/lib/auth';
import { apiResponse } from '@/lib/apiResponse';
import { vendorEnquiryService } from '@/lib/services/vendorEnquiry.service';
import { ForbiddenError } from '@/lib/errors';

/**
 * GET /api/v1/vendor/enquiries
 * Lists all vendor enquiries received by the authenticated vendor.
 */
export async function GET() {
  try {
    const user = await requireRole(UserRole.VENDOR);

    if (!user.id) {
      throw new ForbiddenError('Vendor user identification failed');
    }

    const enquiries = await vendorEnquiryService.listEnquiriesForCurrentVendor(user.id);

    return apiResponse.success(enquiries);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
