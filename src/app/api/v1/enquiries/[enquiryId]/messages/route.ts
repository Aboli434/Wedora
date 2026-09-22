import { NextRequest } from 'next/server';
import { requireAuthenticatedUser } from '@/lib/auth';
import { apiResponse } from '@/lib/apiResponse';
import { validateData } from '@/lib/validation';
import { createEnquiryMessageSchema } from '@/lib/validation/enquiryMessage';
import { enquiryMessageService } from '@/lib/services/enquiryMessage.service';
import { ValidationError } from '@/lib/errors';

interface RouteContext {
  params: Promise<{ enquiryId: string }>;
}

/**
 * GET /api/v1/enquiries/[enquiryId]/messages
 * Lists all messages for an enquiry.
 * Authorized for participants only (Client owner or Vendor owner).
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireAuthenticatedUser();
    const { enquiryId } = await context.params;

    const messages = await enquiryMessageService.listMessagesForEnquiry({
      enquiryId,
      userId: user.id,
      userRole: user.role,
      clientProfileId: user.clientProfile?.id,
    });

    return apiResponse.success(messages);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}

/**
 * POST /api/v1/enquiries/[enquiryId]/messages
 * Appends a new message to an enquiry.
 * Authorized for participants only (Client owner or Vendor owner).
 */
export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireAuthenticatedUser();
    const { enquiryId } = await context.params;

    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      throw new ValidationError('Invalid JSON body');
    }

    const input = validateData(createEnquiryMessageSchema, rawBody);
    const createdMessage = await enquiryMessageService.createMessageForEnquiry({
      enquiryId,
      userId: user.id,
      userRole: user.role,
      clientProfileId: user.clientProfile?.id,
      input,
    });

    return apiResponse.success(createdMessage, 201, 'Enquiry message sent successfully');
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
