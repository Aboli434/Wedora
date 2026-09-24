import { NextRequest, NextResponse } from 'next/server';
import { requireAuthenticatedUser } from '@/lib/auth';
import { apiResponse } from '@/lib/apiResponse';
import { validateData } from '@/lib/validation';
import { queryNotificationSchema } from '@/lib/validation/notification';
import { notificationService } from '@/lib/services/notification.service';

/**
 * GET /api/v1/notifications
 * Lists paginated notifications for the authenticated user.
 */
export async function GET(request: NextRequest) {
  try {
    const user = await requireAuthenticatedUser();

    const searchParams = request.nextUrl.searchParams;
    const isReadParam = searchParams.get('isRead');
    const rawQueryParams = {
      isRead: isReadParam === 'true' ? true : isReadParam === 'false' ? false : undefined,
      page: searchParams.get('page') ? Number(searchParams.get('page')) : undefined,
      pageSize: searchParams.get('pageSize') ? Number(searchParams.get('pageSize')) : undefined,
    };

    const query = validateData(queryNotificationSchema, rawQueryParams);

    const result = await notificationService.listNotificationsForUser({
      userId: user.id,
      query,
    });

    return NextResponse.json(
      {
        success: true,
        data: result.data,
        meta: result.meta,
        unreadCount: result.unreadCount,
      },
      { status: 200 }
    );
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
