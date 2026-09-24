import { NextRequest } from 'next/server';
import { requireAuthenticatedUser } from '@/lib/auth';
import { apiResponse } from '@/lib/apiResponse';
import { validateData } from '@/lib/validation';
import { updateNotificationSchema } from '@/lib/validation/notification';
import { notificationService } from '@/lib/services/notification.service';
import { ValidationError } from '@/lib/errors';

interface RouteContext {
  params: Promise<{
    notificationId: string;
  }>;
}

/**
 * GET /api/v1/notifications/[notificationId]
 * Fetches a single notification by ID for the authenticated user.
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireAuthenticatedUser();
    const { notificationId } = await context.params;

    const notification = await notificationService.getNotificationForUser({
      userId: user.id,
      notificationId,
    });

    return apiResponse.success(notification);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}

/**
 * PATCH /api/v1/notifications/[notificationId]
 * Updates read status of a notification for the authenticated user.
 */
export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireAuthenticatedUser();
    const { notificationId } = await context.params;

    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      throw new ValidationError('Invalid JSON body');
    }

    const input = validateData(updateNotificationSchema, rawBody);
    const updated = await notificationService.updateNotificationStatus({
      userId: user.id,
      notificationId,
      input,
    });

    return apiResponse.success(updated, 200, 'Notification updated successfully');
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
