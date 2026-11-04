import { db } from "@/lib/db";
import { AccessPermissionService } from "./AccessPermissionService";
import { Prisma } from "@prisma/client";

export interface LogAuditParams {
  organisationId: string;
  userId?: string;
  action: string;
  entityType: string;
  entityId?: string;
  metadata?: Prisma.InputJsonValue;
  ipAddress?: string;
  userAgent?: string;
}

export class AuditService {
  /**
   * Records an immutable audit log entry
   */
  static async log(params: LogAuditParams) {
    try {
      return await db.auditLog.create({
        data: {
          organisationId: params.organisationId,
          userId: params.userId,
          action: params.action,
          entityType: params.entityType,
          entityId: params.entityId,
          metadata: params.metadata || {},
          ipAddress: params.ipAddress,
          userAgent: params.userAgent,
        },
      });
    } catch (err) {
      console.error("Failed to write audit log:", err);
      // Non-blocking for primary transaction unless strict compliance mode is requested
      return null;
    }
  }

  /**
   * Retrieves audit logs strictly scoped to the requesting user's tenant organisation
   */
  static async getTenantLogs(
    userId: string,
    organisationId: string,
    limit = 50,
    offset = 0
  ) {
    // Enforce Tenant Isolation
    await AccessPermissionService.assertTenantMembership(userId, organisationId);

    return await db.auditLog.findMany({
      where: { organisationId },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: offset,
    });
  }
}
