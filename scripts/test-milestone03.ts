import { db } from "../src/lib/db";
import { IdentityService } from "../src/server/services/IdentityService";
import { OrganisationService } from "../src/server/services/OrganisationService";
import { AccessPermissionService } from "../src/server/services/AccessPermissionService";
import { BillingService } from "../src/server/services/BillingService";
import { AuditService } from "../src/server/services/AuditService";

async function runTestSuite() {
  console.log("=================================================");
  console.log("🧪 RUNNING TK BUSINESS SUITE — MILESTONE 03 TESTS");
  console.log("=================================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    if (condition) {
      console.log(`  ✅ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ [FAIL] ${testName} - ${detail || ""}`);
      failed++;
    }
  }

  try {
    // -------------------------------------------------------------------------
    // TEST 1: Login & Account Lockout
    // -------------------------------------------------------------------------
    console.log("👉 1. Testing Login & Account Lockout...");
    const loginOk = await IdentityService.authenticateUser("admin@thekolli.com", "Kolli@2026!Secure");
    assert(loginOk.success && loginOk.user?.email === "admin@thekolli.com", "Valid Login Authenticates Successfully");

    const loginBad = await IdentityService.authenticateUser("admin@thekolli.com", "WrongPassword123");
    assert(!loginBad.success && (loginBad.error?.includes("Invalid credentials") || false), "Invalid Password Fails Gracefully");

    // -------------------------------------------------------------------------
    // TEST 2: Session Management & Invalidation
    // -------------------------------------------------------------------------
    console.log("\n👉 2. Testing Session Management & Invalidation...");
    const testUser = await db.user.findUnique({ where: { email: "admin@thekolli.com" } });
    if (!testUser) throw new Error("Seed user admin@thekolli.com not found");

    const session = await db.userSession.create({
      data: {
        userId: testUser.id,
        tokenHash: `test_token_hash_${Date.now()}_${Math.random()}`,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60),
      },
    });
    assert(Boolean(session.id), "Session Created Successfully");

    // Invalidate session
    await db.userSession.update({
      where: { id: session.id },
      data: { revokedAt: new Date() },
    });
    const revoked = await db.userSession.findUnique({ where: { id: session.id } });
    assert(Boolean(revoked?.revokedAt), "Session Invalidation / Logout Verified");

    // -------------------------------------------------------------------------
    // TEST 3: Organisation Creation & Onboarding
    // -------------------------------------------------------------------------
    console.log("\n👉 3. Testing Organisation Creation & Onboarding...");
    const testOrgName = `Test Enterprise ${Date.now()}`;
    const newOrgResult = await OrganisationService.createOrganisation({
      userId: testUser.id,
      name: testOrgName,
      contactEmail: "test.admin@enterprise.test",
      planCode: "STARTER",
      initialWorkspaceName: "Main Test Center",
    });
    assert(Boolean(newOrgResult.organisation.id), "Organisation Entity Created");
    assert(Boolean(newOrgResult.workspace.id), "Default Workspace Created");

    const newMembership = await db.organisationMembership.findUnique({
      where: {
        userId_organisationId: {
          userId: testUser.id,
          organisationId: newOrgResult.organisation.id,
        },
      },
      include: { role: true },
    });
    assert(newMembership?.role.key === "OWNER", "Creator Assigned OWNER Role");

    // -------------------------------------------------------------------------
    // TEST 4: Organisation Switching
    // -------------------------------------------------------------------------
    console.log("\n👉 4. Testing Multi-Tenant Organisation Switching...");
    const userOrgs = await OrganisationService.getUserOrganisations(testUser.id);
    assert(userOrgs.length >= 2, "User Has Multiple Active Organisations");

    const canSwitch = await AccessPermissionService.assertTenantMembership(
      testUser.id,
      newOrgResult.organisation.id
    );
    assert(Boolean(canSwitch), "Authorised Organisation Switch Succeeded");

    // -------------------------------------------------------------------------
    // TEST 5: Role-Based Access Control (RBAC) Permissions
    // -------------------------------------------------------------------------
    console.log("\n👉 5. Testing Role Permissions (RBAC)...");
    const orgKolli = await db.organisation.findUnique({ where: { slug: "thekolli-tech" } });
    if (!orgKolli) throw new Error("Seed organisation not found");

    const ownerHasOrgManage = await AccessPermissionService.hasPermission(
      testUser.id,
      orgKolli.id,
      { module: "PLATFORM", resource: "ORGANISATION", action: "MANAGE" }
    );
    assert(ownerHasOrgManage, "Organisation Owner Has All Permissions");

    const sarahUser = await db.user.findUnique({ where: { email: "sarah.chen@thekolli.com" } });
    if (!sarahUser) throw new Error("Sarah user not found");

    const sarahPerm = await AccessPermissionService.hasPermission(
      sarahUser.id,
      orgKolli.id,
      { module: "PLATFORM", resource: "ORGANISATION", action: "MANAGE" }
    );
    assert(!sarahPerm, "Manager Denied Organisation-Level MANAGE Authority (Properly Restricted)");

    // -------------------------------------------------------------------------
    // TEST 6: Strict Tenant Isolation
    // -------------------------------------------------------------------------
    console.log("\n👉 6. Testing STRICT TENANT ISOLATION...");
    const marcusUser = await db.user.findUnique({ where: { email: "marcus.vance@vertex.io" } });
    if (!marcusUser) throw new Error("Marcus user not found");

    let crossTenantBlocked = false;
    try {
      // Marcus (from Vertex Dynamics) tries to access THEKOLLI Technologies!
      await AccessPermissionService.assertTenantMembership(marcusUser.id, orgKolli.id);
    } catch (e: any) {
      if (e.message.includes("UNAUTHORIZED_TENANT_ACCESS")) {
        crossTenantBlocked = true;
      }
    }
    assert(crossTenantBlocked, "Cross-Tenant Access From External User STRICTLY BLOCKED");

    let crossTenantAuditBlocked = false;
    try {
      // Marcus tries to read THEKOLLI Technologies' audit logs!
      await AuditService.getTenantLogs(marcusUser.id, orgKolli.id);
    } catch (e: any) {
      if (e.message.includes("UNAUTHORIZED_TENANT_ACCESS")) {
        crossTenantAuditBlocked = true;
      }
    }
    assert(crossTenantAuditBlocked, "Cross-Tenant Audit Log Exfiltration STRICTLY BLOCKED");

    // -------------------------------------------------------------------------
    // TEST 7: Subscription & Module Entitlements
    // -------------------------------------------------------------------------
    console.log("\n👉 7. Testing Subscription & Module Entitlements...");
    const tkerpEntitled = await BillingService.isModuleEntitled(
      testUser.id,
      orgKolli.id,
      "tkerp"
    );
    assert(tkerpEntitled, "TKERP Module Is Entitled For Active Subscription");

    const entitledList = await BillingService.getEntitledModules(testUser.id, orgKolli.id);
    assert(entitledList.length === 18, `All 18 Modules Entitled (Count: ${entitledList.length})`);

    // -------------------------------------------------------------------------
    // TEST 8: Unauthorised Access Checks
    // -------------------------------------------------------------------------
    console.log("\n👉 8. Testing Unauthorised Access Handlers...");
    const fakeUserId = "00000000-0000-0000-0000-000000000000";
    let fakeBlocked = false;
    try {
      await AccessPermissionService.assertTenantMembership(fakeUserId, orgKolli.id);
    } catch {
      fakeBlocked = true;
    }
    assert(fakeBlocked, "Non-existent User Access Rejected With Unauthorized Error");

    console.log("\n=================================================");
    console.log(`🏁 TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
    console.log("=================================================");

    if (failed > 0) {
      process.exit(1);
    }
  } catch (err) {
    console.error("Test execution failed with exception:", err);
    process.exit(1);
  } finally {
    await db.$disconnect();
  }
}

runTestSuite();
