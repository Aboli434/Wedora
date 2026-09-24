import { requireAuthenticatedUser } from '@/lib/auth';
import { apiResponse } from '@/lib/apiResponse';
import { notificationService } from '@/lib/services/notification.service';

/**
 * PATCH /api/v1/notifications/read-all
 * Bulk marks all unread notifications for the authenticated user as read.
 */
export async function PATCH() {
  try {
    const user = await requireAuthenticatedUser();

    const result = await notificationService.markAllNotificationsAsRead(user.id);

    return apiResponse.success(result, 200, `${result.count} notification(s) marked as read`);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
