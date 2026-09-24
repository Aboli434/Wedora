import { Notification, NotificationType, Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { NotificationResponse, PaginationMeta } from '@/lib/api/types';
import { NotFoundError } from '@/lib/errors';
import { QueryNotificationInput, UpdateNotificationInput } from '@/lib/validation/notification';

export class NotificationService {
  /**
   * Transforms a Prisma Notification record into a clean NotificationResponse DTO.
   */
  public formatNotificationResponse(notification: Notification): NotificationResponse {
    return {
      id: notification.id,
      userId: notification.userId,
      title: notification.title,
      message: notification.message,
      type: notification.type,
      isRead: notification.isRead,
      linkUrl: notification.linkUrl,
      createdAt: notification.createdAt,
    };
  }

  /**
   * Internal helper to create a system/domain notification for a target user.
   */
  public async createNotification(params: {
    userId: string;
    title: string;
    message: string;
    type: NotificationType;
    linkUrl?: string | null;
    tx?: Prisma.TransactionClient;
  }): Promise<NotificationResponse> {
    const { userId, title, message, type, linkUrl, tx } = params;
    const client = tx ?? prisma;

    const notification = await client.notification.create({
      data: {
        userId,
        title,
        message,
        type,
        linkUrl: linkUrl ?? null,
      },
    });

    return this.formatNotificationResponse(notification);
  }

  /**
   * Lists paginated notifications for the authenticated user.
   */
  public async listNotificationsForUser(params: {
    userId: string;
    query: QueryNotificationInput;
  }): Promise<{ data: NotificationResponse[]; meta: PaginationMeta; unreadCount: number }> {
    const { userId, query } = params;
    const page = query.page ?? 1;
    const pageSize = query.pageSize ?? 20;
    const skip = (page - 1) * pageSize;

    const where: Prisma.NotificationWhereInput = {
      userId,
      ...(query.isRead !== undefined ? { isRead: query.isRead } : {}),
    };

    const [total, unreadCount, items] = await prisma.$transaction([
      prisma.notification.count({ where }),
      prisma.notification.count({ where: { userId, isRead: false } }),
      prisma.notification.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: pageSize,
      }),
    ]);

    const totalPages = Math.ceil(total / pageSize) || 1;

    return {
      data: items.map((item) => this.formatNotificationResponse(item)),
      meta: {
        page,
        pageSize,
        total,
        totalPages,
      },
      unreadCount,
    };
  }

  /**
   * Gets a single notification by ID for the authenticated user.
   */
  public async getNotificationForUser(params: {
    userId: string;
    notificationId: string;
  }): Promise<NotificationResponse> {
    const { userId, notificationId } = params;

    const notification = await prisma.notification.findFirst({
      where: {
        id: notificationId,
        userId,
      },
    });

    if (!notification) {
      throw new NotFoundError('Notification not found');
    }

    return this.formatNotificationResponse(notification);
  }

  /**
   * Updates read status of a notification for the authenticated user.
   */
  public async updateNotificationStatus(params: {
    userId: string;
    notificationId: string;
    input: UpdateNotificationInput;
  }): Promise<NotificationResponse> {
    const { userId, notificationId, input } = params;

    const existing = await prisma.notification.findFirst({
      where: {
        id: notificationId,
        userId,
      },
      select: { id: true },
    });

    if (!existing) {
      throw new NotFoundError('Notification not found');
    }

    const updated = await prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: input.isRead },
    });

    return this.formatNotificationResponse(updated);
  }

  /**
   * Bulk marks all unread notifications for the authenticated user as read.
   */
  public async markAllNotificationsAsRead(userId: string): Promise<{ count: number }> {
    const result = await prisma.notification.updateMany({
      where: {
        userId,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });

    return { count: result.count };
  }
}

export const notificationService = new NotificationService();
