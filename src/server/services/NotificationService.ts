import { db } from "@/lib/db";
import { AccessPermissionService } from "./AccessPermissionService";
import { NotificationType } from "@prisma/client";

export class NotificationService {
  /**
   * Creates a notification for a user within an organisation
   */
  static async sendNotification(params: {
    organisationId: string;
    userId: string;
    title: string;
    message: string;
    type?: NotificationType;
    link?: string;
  }) {
    return await db.notification.create({
      data: {
        organisationId: params.organisationId,
        userId: params.userId,
        title: params.title,
        message: params.message,
        type: params.type || "INFO",
        link: params.link,
      },
    });
  }

  /**
   * Retrieves notifications scoped to tenant and user
   */
  static async getUserNotifications(userId: string, organisationId: string) {
    await AccessPermissionService.assertTenantMembership(userId, organisationId);

    return await db.notification.findMany({
      where: {
        userId,
        organisationId,
      },
      orderBy: { createdAt: "desc" },
      take: 30,
    });
  }

  /**
   * Marks a notification as read
   */
  static async markAsRead(notificationId: string, userId: string, organisationId: string) {
    await AccessPermissionService.assertTenantMembership(userId, organisationId);

    return await db.notification.updateMany({
      where: {
        id: notificationId,
        userId,
        organisationId,
      },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });
  }
}
