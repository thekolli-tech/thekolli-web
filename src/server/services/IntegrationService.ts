import { db } from "@/lib/db";
import { AccessPermissionService } from "./AccessPermissionService";

export interface WebhookConfig {
  id: string;
  name: string;
  targetUrl: string;
  events: string[];
  isActive: boolean;
  createdAt: string;
}

export class IntegrationService {
  /**
   * Mock / prototype store abstraction for tenant webhooks and integrations
   */
  static async getTenantIntegrations(userId: string, organisationId: string) {
    await AccessPermissionService.assertTenantMembership(userId, organisationId);

    // Return standard integration catalog and active tenant connectors
    return {
      connectedIntegrations: [
        {
          id: "int-slack",
          name: "Slack Notifications",
          category: "Communications",
          status: "CONNECTED",
          configuredAt: "2026-10-15T09:30:00Z",
        },
        {
          id: "int-github",
          name: "GitHub Repository Sync",
          category: "Engineering",
          status: "CONNECTED",
          configuredAt: "2026-10-18T14:15:00Z",
        },
      ],
      availableConnectors: [
        { id: "conn-aws", name: "AWS S3 Vault Storage", category: "Infrastructure" },
        { id: "conn-zoho", name: "Zoho Books Bridge", category: "Finance" },
        { id: "conn-stripe", name: "Stripe Billing Terminal", category: "Payments" },
      ],
    };
  }
}
