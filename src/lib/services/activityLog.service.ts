import { ActivityLog, LogSeverity, Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { ActivityLogResponse, PaginationMeta } from '@/lib/api/types';
import { QueryActivityLogInput } from '@/lib/validation/activityLog';

export class ActivityLogService {
  /**
   * Transforms a Prisma ActivityLog record into a clean ActivityLogResponse DTO.
   */
  public formatActivityLogResponse(log: ActivityLog): ActivityLogResponse {
    return {
      id: log.id,
      userId: log.userId,
      action: log.action,
      entityType: log.entityType,
      entityId: log.entityId,
      metadata: log.metadata,
      severity: log.severity,
      createdAt: log.createdAt,
    };
  }

  /**
   * Internal helper to record an activity log entry.
   */
  public async logActivity(params: {
    userId?: string | null;
    action: string;
    entityType: string;
    entityId?: string | null;
    metadata?: Prisma.InputJsonValue | null;
    severity?: LogSeverity;
    tx?: Prisma.TransactionClient;
  }): Promise<ActivityLogResponse> {
    const { userId, action, entityType, entityId, metadata, severity, tx } = params;
    const client = tx ?? prisma;

    const log = await client.activityLog.create({
      data: {
        userId: userId ?? null,
        action,
        entityType,
        entityId: entityId ?? null,
        metadata: metadata ?? Prisma.DbNull,
        severity: severity ?? LogSeverity.INFO,
      },
    });

    return this.formatActivityLogResponse(log);
  }

  /**
   * Lists paginated activity logs for the authenticated user.
   */
  public async listActivityLogsForUser(params: {
    userId: string;
    query: QueryActivityLogInput;
  }): Promise<{ data: ActivityLogResponse[]; meta: PaginationMeta }> {
    const { userId, query } = params;
    const page = query.page ?? 1;
    const pageSize = query.pageSize ?? 20;
    const skip = (page - 1) * pageSize;

    const where: Prisma.ActivityLogWhereInput = {
      userId,
    };

    const [total, items] = await prisma.$transaction([
      prisma.activityLog.count({ where }),
      prisma.activityLog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: pageSize,
      }),
    ]);

    const totalPages = Math.ceil(total / pageSize) || 1;

    return {
      data: items.map((item) => this.formatActivityLogResponse(item)),
      meta: {
        page,
        pageSize,
        total,
        totalPages,
      },
    };
  }
}

export const activityLogService = new ActivityLogService();
