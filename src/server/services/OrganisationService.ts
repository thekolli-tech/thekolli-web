import { db } from "@/lib/db";
import crypto from "crypto";
import { Organisation, Workspace, Role } from "@prisma/client";

export interface CreateOrganisationInput {
  userId: string;
  name: string;
  legalName?: string;
  slug?: string;
  orgType?: string;
  contactEmail: string;
  contactPhone?: string;
  country?: string;
  timezone?: string;
  currency?: string;
  initialWorkspaceName?: string;
  planCode?: string;
}

export class OrganisationService {
  /**
   * Generates a clean URL-safe slug from organisation name
   */
  static generateSlug(name: string): string {
    const base = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return `${base}-${crypto.randomBytes(3).toString("hex")}`;
  }

  /**
   * Complete 10-step organisation onboarding execution
   */
  static async createOrganisation(input: CreateOrganisationInput): Promise<{
    organisation: Organisation;
    workspace: Workspace;
  }> {
    const slug = input.slug || this.generateSlug(input.name);

    // 1. Resolve Owner Role
    const ownerRole = await db.role.findFirst({
      where: { key: "OWNER", isSystem: true },
    });
    if (!ownerRole) {
      throw new Error("System role 'OWNER' not found. Please ensure database is seeded.");
    }

    // 2. Resolve Subscription Plan
    const plan = await db.subscriptionPlan.findUnique({
      where: { code: input.planCode || "STARTER" },
    });
    if (!plan) {
      throw new Error(`Subscription plan '${input.planCode || "STARTER"}' not found.`);
    }

    // 3. Create Organisation and all related entities in a Prisma Transaction
    return await db.$transaction(async (tx) => {
      // Create Organisation
      const org = await tx.organisation.create({
        data: {
          name: input.name,
          legalName: input.legalName || input.name,
          slug,
          orgType: input.orgType || "ENTERPRISE",
          contactEmail: input.contactEmail,
          contactPhone: input.contactPhone,
          country: input.country || "India",
          timezone: input.timezone || "Asia/Kolkata",
          currency: input.currency || "INR",
          status: "ACTIVE",
        },
      });

      // Create Initial Workspace
      const workspace = await tx.workspace.create({
        data: {
          organisationId: org.id,
          name: input.initialWorkspaceName || "Default Workspace",
          slug: "default",
          description: "Initial operational workspace.",
          isDefault: true,
        },
      });

      // Add User as Organisation Owner
      await tx.organisationMembership.create({
        data: {
          userId: input.userId,
          organisationId: org.id,
          roleId: ownerRole.id,
          isDefault: true,
          status: "ACTIVE",
        },
      });

      // Attach Subscription
      const periodEnd = new Date();
      periodEnd.setMonth(periodEnd.getMonth() + 1);

      await tx.organisationSubscription.create({
        data: {
          organisationId: org.id,
          planId: plan.id,
          status: "ACTIVE",
          currentPeriodStart: new Date(),
          currentPeriodEnd: periodEnd,
          renewalDate: periodEnd,
        },
      });

      // Entitle all 18 core modules
      const coreModules = await tx.module.findMany();
      for (const mod of coreModules) {
        await tx.moduleEntitlement.create({
          data: {
            organisationId: org.id,
            moduleId: mod.id,
            isEnabled: true,
          },
        });
      }

      // Record Audit Log
      await tx.auditLog.create({
        data: {
          organisationId: org.id,
          userId: input.userId,
          action: "ORGANISATION_ONBOARDED",
          entityType: "ORGANISATION",
          entityId: org.id,
          metadata: {
            orgName: org.name,
            plan: plan.code,
            workspace: workspace.name,
          },
        },
      });

      return { organisation: org, workspace };
    });
  }

  /**
   * Retrieves all organisations the user belongs to
   */
  static async getUserOrganisations(userId: string) {
    return await db.organisationMembership.findMany({
      where: {
        userId,
        status: "ACTIVE",
      },
      include: {
        organisation: {
          include: {
            workspaces: true,
            subscription: {
              include: { plan: true },
            },
          },
        },
        role: true,
      },
      orderBy: { joinedAt: "asc" },
    });
  }

  /**
   * Invites a team member to an organisation
   */
  static async inviteMember(
    organisationId: string,
    invitedById: string,
    email: string,
    roleKey: string = "EMPLOYEE"
  ) {
    const role = await db.role.findFirst({
      where: { key: roleKey },
    });
    if (!role) {
      throw new Error(`Role '${roleKey}' not found.`);
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    const invitation = await db.organisationInvitation.create({
      data: {
        organisationId,
        email: email.trim().toLowerCase(),
        roleId: role.id,
        token,
        expiresAt,
        invitedById,
        status: "PENDING",
      },
      include: {
        organisation: true,
        role: true,
      },
    });

    await db.auditLog.create({
      data: {
        organisationId,
        userId: invitedById,
        action: "MEMBER_INVITED",
        entityType: "ORGANISATION_INVITATION",
        entityId: invitation.id,
        metadata: { invitedEmail: email, role: role.name },
      },
    });

    return invitation;
  }

  /**
   * Accepts an invitation and binds user to organisation
   */
  static async acceptInvitation(token: string, userId: string) {
    const invitation = await db.organisationInvitation.findUnique({
      where: { token },
      include: { organisation: true },
    });

    if (!invitation || invitation.status !== "PENDING" || invitation.expiresAt < new Date()) {
      throw new Error("Invitation is invalid or has expired.");
    }

    return await db.$transaction(async (tx) => {
      // Create membership
      const membership = await tx.organisationMembership.upsert({
        where: {
          userId_organisationId: {
            userId,
            organisationId: invitation.organisationId,
          },
        },
        update: {
          status: "ACTIVE",
          roleId: invitation.roleId,
        },
        create: {
          userId,
          organisationId: invitation.organisationId,
          roleId: invitation.roleId,
          status: "ACTIVE",
        },
      });

      // Update invitation
      await tx.organisationInvitation.update({
        where: { id: invitation.id },
        data: {
          status: "ACCEPTED",
          acceptedAt: new Date(),
        },
      });

      return membership;
    });
  }
}
