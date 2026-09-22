import { NextRequest } from 'next/server';
import { UserRole } from '@prisma/client';
import { requireRole } from '@/lib/auth';
import { apiResponse } from '@/lib/apiResponse';
import { validateData } from '@/lib/validation';
import { createVendorEnquirySchema } from '@/lib/validation/vendorEnquiry';
import { vendorEnquiryService } from '@/lib/services/vendorEnquiry.service';
import { ForbiddenError, ValidationError } from '@/lib/errors';

interface RouteContext {
  params: Promise<{ weddingId: string }>;
}

/**
 * GET /api/v1/weddings/[weddingId]/enquiries
 * Lists all vendor enquiries created for a specific client-owned wedding.
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireRole(UserRole.CLIENT);

    if (!user.clientProfile) {
      throw new ForbiddenError('Client profile is required to access enquiries');
    }

    const { weddingId } = await context.params;

    const enquiries = await vendorEnquiryService.listEnquiriesForClientWedding({
      weddingId,
      clientProfileId: user.clientProfile.id,
    });

    return apiResponse.success(enquiries);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}

/**
 * POST /api/v1/weddings/[weddingId]/enquiries
 * Creates a new vendor enquiry for a client-owned wedding.
 */
export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireRole(UserRole.CLIENT);

    if (!user.clientProfile) {
      throw new ForbiddenError('Client profile is required to create an enquiry');
    }

    const { weddingId } = await context.params;

    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      throw new ValidationError('Invalid JSON body');
    }

    const input = validateData(createVendorEnquirySchema, rawBody);
    const createdEnquiry = await vendorEnquiryService.createEnquiryForClientWedding({
      weddingId,
      clientProfileId: user.clientProfile.id,
      input,
    });

    return apiResponse.success(createdEnquiry, 201, 'Vendor enquiry created successfully');
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
