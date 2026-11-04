import crypto from "crypto";
import { AccessPermissionService } from "./AccessPermissionService";

export interface ApiKeyRecord {
  id: string;
  name: string;
  keyPrefix: string;
  keyMasked: string;
  scopes: string[];
  createdAt: string;
  lastUsedAt?: string;
}

export class DeveloperApiService {
  /**
   * Generates a new cryptographically secure API key
   */
  static generateApiKey(name: string, scopes: string[] = ["read:all"]): {
    apiKey: string;
    keyPrefix: string;
    keyHash: string;
  } {
    const rawSecret = crypto.randomBytes(24).toString("hex");
    const keyPrefix = `tk_live_${crypto.randomBytes(4).toString("hex")}`;
    const apiKey = `${keyPrefix}_${rawSecret}`;
    const keyHash = crypto.createHash("sha256").update(apiKey).digest("hex");

    return { apiKey, keyPrefix, keyHash };
  }

  /**
   * Retrieves active API keys for tenant
   */
  static async getTenantApiKeys(userId: string, organisationId: string): Promise<ApiKeyRecord[]> {
    await AccessPermissionService.assertTenantMembership(userId, organisationId);

    return [
      {
        id: "key-1",
        name: "Production Backend Integration Key",
        keyPrefix: "tk_live_9b4e",
        keyMasked: "tk_live_9b4e_••••••••••••••••••••••••",
        scopes: ["records:read", "records:write", "webhooks:listen"],
        createdAt: "2026-10-20T10:00:00Z",
        lastUsedAt: "2026-11-03T14:22:10Z",
      },
      {
        id: "key-2",
        name: "CI/CD Test Runner Key",
        keyPrefix: "tk_test_3a1f",
        keyMasked: "tk_test_3a1f_••••••••••••••••••••••••",
        scopes: ["test:execute"],
        createdAt: "2026-10-25T11:00:00Z",
        lastUsedAt: "2026-11-02T18:10:00Z",
      },
    ];
  }
}
