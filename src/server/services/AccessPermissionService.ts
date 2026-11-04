import { db } from "@/lib/db";

export interface PermissionCheck {
  module: string;
  resource: string;
  action: string;
  scope?: string;
}

export class AccessPermissionService {
  /**
   * Asserts that a user has active membership in the given organisation.
   * Throws an error if the user does not belong to the organisation (Tenant Isolation).
   */
  static async assertTenantMembership(userId: string, organisationId: string) {
    const membership = await db.organisationMembership.findUnique({
      where: {
        userId_organisationId: {
          userId,
          organisationId,
        },
      },
      include: {
        role: true,
        organisation: true,
      },
    });

    if (!membership || membership.status !== "ACTIVE" || membership.organisation.status !== "ACTIVE") {
      throw new Error("UNAUTHORIZED_TENANT_ACCESS: You do not have permission to access this organisation's data.");
    }

    return membership;
  }

  /**
   * Checks if user has a specific granular permission inside the organisation.
   */
  static async hasPermission(
    userId: string,
    organisationId: string,
    check: PermissionCheck
  ): Promise<boolean> {
    try {
      const membership = await this.assertTenantMembership(userId, organisationId);

      // Organisation Owners have omnipotent authority inside their organisation
      if (membership.role.key === "OWNER" || membership.role.key === "SUPER_ADMIN") {
        return true;
      }

      // Query role permissions
      const rolePerm = await db.rolePermission.findFirst({
        where: {
          roleId: membership.roleId,
          permission: {
            module: check.module,
            resource: check.resource,
            action: check.action,
            ...(check.scope ? { scope: check.scope } : {}),
          },
        },
      });

      return Boolean(rolePerm);
    } catch {
      return false;
    }
  }

  /**
   * Returns list of all permission keys the user has in this organisation
   */
  static async getUserEffectivePermissions(
    userId: string,
    organisationId: string
  ): Promise<string[]> {
    try {
      const membership = await this.assertTenantMembership(userId, organisationId);

      if (membership.role.key === "OWNER" || membership.role.key === "SUPER_ADMIN") {
        // Return wildcard or all permissions
        return ["*"];
      }

      const rolePerms = await db.rolePermission.findMany({
        where: { roleId: membership.roleId },
        include: { permission: true },
      });

      return rolePerms.map(
        (rp) => `${rp.permission.module}:${rp.permission.resource}:${rp.permission.action}`
      );
    } catch {
      return [];
    }
  }
}
