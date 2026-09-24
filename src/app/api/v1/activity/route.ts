import { NextRequest, NextResponse } from 'next/server';
import { requireAuthenticatedUser } from '@/lib/auth';
import { apiResponse } from '@/lib/apiResponse';
import { validateData } from '@/lib/validation';
import { queryActivityLogSchema } from '@/lib/validation/activityLog';
import { activityLogService } from '@/lib/services/activityLog.service';

/**
 * GET /api/v1/activity
 * Lists paginated activity logs for the authenticated user.
 */
export async function GET(request: NextRequest) {
  try {
    const user = await requireAuthenticatedUser();

    const searchParams = request.nextUrl.searchParams;
    const rawQueryParams = {
      page: searchParams.get('page') ? Number(searchParams.get('page')) : undefined,
      pageSize: searchParams.get('pageSize') ? Number(searchParams.get('pageSize')) : undefined,
    };

    const query = validateData(queryActivityLogSchema, rawQueryParams);

    const result = await activityLogService.listActivityLogsForUser({
      userId: user.id,
      query,
    });

    return NextResponse.json(
      {
        success: true,
        data: result.data,
        meta: result.meta,
      },
      { status: 200 }
    );
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
