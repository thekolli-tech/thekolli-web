import { db } from "@/lib/db";
import { AccessPermissionService } from "./AccessPermissionService";

export class BillingService {
  /**
   * Retrieves organisation's subscription status and plan details
   */
  static async getSubscription(userId: string, organisationId: string) {
    await AccessPermissionService.assertTenantMembership(userId, organisationId);

    return await db.organisationSubscription.findUnique({
      where: { organisationId },
      include: {
        plan: true,
        invoices: {
          orderBy: { createdAt: "desc" },
          take: 10,
        },
      },
    });
  }

  /**
   * Checks whether the organisation is currently entitled to use a specific module
   */
  static async isModuleEntitled(
    userId: string,
    organisationId: string,
    moduleCode: string
  ): Promise<boolean> {
    try {
      await AccessPermissionService.assertTenantMembership(userId, organisationId);

      // Check subscription status
      const subscription = await db.organisationSubscription.findUnique({
        where: { organisationId },
      });

      if (!subscription || subscription.status === "SUSPENDED" || subscription.status === "CANCELLED") {
        return false;
      }

      // Check module entitlement
      const entitlement = await db.moduleEntitlement.findFirst({
        where: {
          organisationId,
          module: { code: moduleCode.toLowerCase() },
          isEnabled: true,
        },
      });

      return Boolean(entitlement);
    } catch {
      return false;
    }
  }

  /**
   * Returns list of all entitled module codes for an organisation
   */
  static async getEntitledModules(userId: string, organisationId: string): Promise<string[]> {
    try {
      await AccessPermissionService.assertTenantMembership(userId, organisationId);

      const entitlements = await db.moduleEntitlement.findMany({
        where: {
          organisationId,
          isEnabled: true,
        },
        include: { module: true },
      });

      return entitlements.map((e) => e.module.code);
    } catch {
      return [];
    }
  }

  /**
   * Upgrades or changes subscription plan
   */
  static async changeSubscriptionPlan(
    userId: string,
    organisationId: string,
    newPlanCode: string
  ) {
    await AccessPermissionService.assertTenantMembership(userId, organisationId);

    const plan = await db.subscriptionPlan.findUnique({
      where: { code: newPlanCode },
    });
    if (!plan) {
      throw new Error(`Plan '${newPlanCode}' not found.`);
    }

    const currentSub = await db.organisationSubscription.findUnique({
      where: { organisationId },
    });

    const periodEnd = new Date();
    periodEnd.setMonth(periodEnd.getMonth() + 1);

    const updatedSub = await db.organisationSubscription.upsert({
      where: { organisationId },
      update: {
        planId: plan.id,
        status: "ACTIVE",
        currentPeriodEnd: periodEnd,
        renewalDate: periodEnd,
      },
      create: {
        organisationId,
        planId: plan.id,
        status: "ACTIVE",
        currentPeriodStart: new Date(),
        currentPeriodEnd: periodEnd,
        renewalDate: periodEnd,
      },
    });

    // Record Billing Event
    await db.billingEvent.create({
      data: {
        organisationId,
        eventType: "PLAN_CHANGED",
        details: {
          oldPlanId: currentSub?.planId,
          newPlanId: plan.id,
          newPlanCode: plan.code,
        },
      },
    });

    return updatedSub;
  }
}
