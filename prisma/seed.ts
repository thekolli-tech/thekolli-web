import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting TK Business Suite database seeding...");

  // 1. Seed the 18 Approved Modules
  const modulesData = [
    {
      code: "tkerp",
      name: "TKERP",
      category: "Business Operations",
      description: "Core organizational resource planning and enterprise management backbone.",
      isCore: true,
    },
    {
      code: "tk-inventory",
      name: "TK Inventory",
      category: "Business Operations",
      description: "Multi-location stock tracking, valuation, reorder levels, and asset monitoring.",
      isCore: true,
    },
    {
      code: "tk-supply",
      name: "TK Supply",
      category: "Business Operations",
      description: "Supply chain orchestration, vendor management, procurement, and fulfillment.",
      isCore: true,
    },
    {
      code: "tk-project",
      name: "TK Project",
      category: "Business Operations",
      description: "Project planning, milestones, team task assignment, and delivery tracking.",
      isCore: true,
    },
    {
      code: "tkfin",
      name: "TKFIN",
      category: "Finance",
      description: "Financial accounting, general ledger, expense tracking, and fiscal governance.",
      isCore: true,
    },
    {
      code: "tk-commerce",
      name: "TK Commerce",
      category: "Finance",
      description: "Multi-channel digital commerce catalog, order processing, and payment flows.",
      isCore: true,
    },
    {
      code: "tkhr",
      name: "TKHR",
      category: "People",
      description: "Human resource administration, staff records, attendance, and organizational hierarchies.",
      isCore: true,
    },
    {
      code: "tk-recruit",
      name: "TK Recruit",
      category: "People",
      description: "Candidate applicant tracking, interview stages, and talent acquisition pipeline.",
      isCore: true,
    },
    {
      code: "tk-workspace",
      name: "TK Workspace",
      category: "Productivity",
      description: "Collaborative team spaces, announcements, internal forums, and shared knowledge.",
      isCore: true,
    },
    {
      code: "tk-docs",
      name: "TK Docs",
      category: "Productivity",
      description: "Centralized document vault, folder governance, version control, and access permissions.",
      isCore: true,
    },
    {
      code: "tk-flow",
      name: "TK Flow",
      category: "Productivity",
      description: "Automated multi-step approval workflows, conditional branching, and event triggers.",
      isCore: true,
    },
    {
      code: "tkcrm",
      name: "TKCRM",
      category: "Customer Operations",
      description: "Unified customer relationship lifecycle, pipeline tracking, and client intelligence.",
      isCore: true,
    },
    {
      code: "tk-sales",
      name: "TK Sales",
      category: "Customer Operations",
      description: "Quotations, deal progression, order booking, and revenue pipeline coordination.",
      isCore: true,
    },
    {
      code: "tk-service",
      name: "TK Service",
      category: "Customer Operations",
      description: "Customer support desk, ticket resolution, service level tracking, and field assistance.",
      isCore: true,
    },
    {
      code: "tk-forms",
      name: "TK Forms",
      category: "Connectivity",
      description: "Custom dynamic data collection, digital intake forms, and automated survey pipelines.",
      isCore: true,
    },
    {
      code: "tk-sign",
      name: "TK Sign",
      category: "Connectivity",
      description: "Secure digital signature collection, document signing workflows, and audit trails.",
      isCore: true,
    },
    {
      code: "tk-analytics",
      name: "TK Analytics",
      category: "Connectivity",
      description: "Cross-module operational business intelligence, metrics, and executive reporting.",
      isCore: true,
    },
    {
      code: "tk-connect",
      name: "TK Connect",
      category: "Connectivity",
      description: "API gateways, third-party service webhooks, integrations, and external bridges.",
      isCore: true,
    },
  ];

  console.log("  → Seeding 18 core modules...");
  for (const m of modulesData) {
    await prisma.module.upsert({
      where: { code: m.code },
      update: m,
      create: m,
    });
  }

  // 2. Seed System Roles
  console.log("  → Seeding platform roles...");
  const roles = [
    {
      key: "SUPER_ADMIN",
      name: "Platform Super Admin",
      description: "Unrestricted platform-wide operational authority.",
      isSystem: true,
    },
    {
      key: "OWNER",
      name: "Organisation Owner",
      description: "Full control over organization governance, billing, memberships, and modules.",
      isSystem: true,
    },
    {
      key: "ADMIN",
      name: "Organisation Admin",
      description: "Administrative authority over organization operations, users, and module configurations.",
      isSystem: true,
    },
    {
      key: "MANAGER",
      name: "Manager",
      description: "Team and operational project governance with approval authority.",
      isSystem: true,
    },
    {
      key: "EMPLOYEE",
      name: "Employee",
      description: "Standard operational read/write access scoped to assigned workspaces.",
      isSystem: true,
    },
  ];

  const roleMap: Record<string, string> = {};
  for (const r of roles) {
    const roleRecord = await prisma.role.upsert({
      where: {
        organisationId_key: {
          organisationId: "",
          key: r.key,
        },
      },
      update: { name: r.name, description: r.description },
      create: {
        organisationId: null,
        key: r.key,
        name: r.name,
        description: r.description,
        isSystem: true,
      },
    });
    roleMap[r.key] = roleRecord.id;
  }

  // 3. Seed Permissions
  console.log("  → Seeding RBAC permissions...");
  const permissionsList = [
    // Organisation
    { module: "PLATFORM", resource: "ORGANISATION", action: "MANAGE", scope: "ORGANISATION", description: "Full organisation settings management" },
    { module: "PLATFORM", resource: "ORGANISATION", action: "READ", scope: "ORGANISATION", description: "View organisation profiles" },
    // Members & Roles
    { module: "PLATFORM", resource: "USER", action: "MANAGE", scope: "ORGANISATION", description: "Invite and manage team members" },
    { module: "PLATFORM", resource: "ROLE", action: "MANAGE", scope: "ORGANISATION", description: "Create and assign custom roles" },
    // Billing
    { module: "PLATFORM", resource: "BILLING", action: "MANAGE", scope: "ORGANISATION", description: "Manage subscription plans and payment methods" },
    { module: "PLATFORM", resource: "BILLING", action: "READ", scope: "ORGANISATION", description: "View invoices and billing records" },
    // Audit & Security
    { module: "PLATFORM", resource: "AUDIT", action: "READ", scope: "ORGANISATION", description: "View security and compliance audit logs" },
    // Workspaces
    { module: "PLATFORM", resource: "WORKSPACE", action: "CREATE", scope: "ORGANISATION", description: "Create operational workspaces" },
    { module: "PLATFORM", resource: "WORKSPACE", action: "READ", scope: "ORGANISATION", description: "View operational workspaces" },
    // Modules Generic
    { module: "TKERP", resource: "RESOURCE", action: "READ", scope: "ORGANISATION", description: "View ERP ledgers" },
    { module: "TKERP", resource: "RESOURCE", action: "UPDATE", scope: "ORGANISATION", description: "Modify ERP ledgers" },
    { module: "TKFIN", resource: "LEDGER", action: "MANAGE", scope: "ORGANISATION", description: "Manage general ledger & fiscal journals" },
    { module: "TKCRM", resource: "CUSTOMER", action: "MANAGE", scope: "ORGANISATION", description: "Manage customer profiles and pipelines" },
    { module: "TKHR", resource: "EMPLOYEE", action: "MANAGE", scope: "ORGANISATION", description: "Manage employee directories and records" },
  ];

  const ownerRoleId = roleMap["OWNER"];
  for (const p of permissionsList) {
    const perm = await prisma.permission.upsert({
      where: {
        module_resource_action_scope: {
          module: p.module,
          resource: p.resource,
          action: p.action,
          scope: p.scope,
        },
      },
      update: { description: p.description },
      create: p,
    });

    if (ownerRoleId) {
      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: ownerRoleId,
            permissionId: perm.id,
          },
        },
        update: {},
        create: {
          roleId: ownerRoleId,
          permissionId: perm.id,
        },
      });
    }
  }

  // 4. Seed Subscription Plans
  console.log("  → Seeding subscription plans...");
  const plans = [
    {
      code: "STARTER",
      name: "Starter BOS Plan",
      description: "Essential foundation for emerging businesses and agile teams.",
      billingInterval: "MONTHLY" as const,
      basePriceInCents: 499900, // ₹4,999/mo
      onboardingFeeInCents: 999900,
      maxUsers: 10,
      maxWorkspaces: 2,
      features: ["core_modules", "standard_support", "single_workspace"],
      isPublic: true,
    },
    {
      code: "PROFESSIONAL",
      name: "Professional BOS Plan",
      description: "Comprehensive operations suite with cross-module workflow automation.",
      billingInterval: "MONTHLY" as const,
      basePriceInCents: 1499900, // ₹14,999/mo
      onboardingFeeInCents: 1999900,
      maxUsers: 50,
      maxWorkspaces: 10,
      features: ["all_18_modules", "priority_support", "advanced_workflows", "custom_roles"],
      isPublic: true,
    },
    {
      code: "ENTERPRISE",
      name: "Enterprise BOS Plan",
      description: "Complete organizational operating system for multi-entity corporations.",
      billingInterval: "ANNUAL" as const,
      basePriceInCents: 4999900, // ₹49,999/mo billed annually
      onboardingFeeInCents: 4999900,
      maxUsers: 500,
      maxWorkspaces: 50,
      features: ["all_18_modules", "dedicated_solutions_architect", "custom_integrations", "sla_guarantee"],
      isPublic: true,
    },
  ];

  const planMap: Record<string, string> = {};
  for (const plan of plans) {
    const p = await prisma.subscriptionPlan.upsert({
      where: { code: plan.code },
      update: plan,
      create: plan,
    });
    planMap[plan.code] = p.id;
  }

  // 5. Seed Test Demonstration Organisations & Users
  console.log("  → Seeding test multi-tenant accounts...");
  const salt = await bcrypt.genSalt(10);
  const commonPasswordHash = await bcrypt.hash("Kolli@2026!Secure", salt);

  // User 1: Kalyan Kolli (Primary Owner of THEKOLLI)
  const userKalyan = await prisma.user.upsert({
    where: { email: "admin@thekolli.com" },
    update: {
      passwordHash: commonPasswordHash,
      isEmailVerified: true,
      emailVerifiedAt: new Date(),
    },
    create: {
      email: "admin@thekolli.com",
      passwordHash: commonPasswordHash,
      firstName: "Kalyan",
      lastName: "Kolli",
      isEmailVerified: true,
      emailVerifiedAt: new Date(),
      status: "ACTIVE",
    },
  });

  // User 2: Sarah Chen (Manager in THEKOLLI)
  const userSarah = await prisma.user.upsert({
    where: { email: "sarah.chen@thekolli.com" },
    update: {
      passwordHash: commonPasswordHash,
      isEmailVerified: true,
      emailVerifiedAt: new Date(),
    },
    create: {
      email: "sarah.chen@thekolli.com",
      passwordHash: commonPasswordHash,
      firstName: "Sarah",
      lastName: "Chen",
      isEmailVerified: true,
      emailVerifiedAt: new Date(),
      status: "ACTIVE",
    },
  });

  // User 3: Marcus Vance (Owner of External Tenant: Vertex Dynamics)
  const userMarcus = await prisma.user.upsert({
    where: { email: "marcus.vance@vertex.io" },
    update: {
      passwordHash: commonPasswordHash,
      isEmailVerified: true,
      emailVerifiedAt: new Date(),
    },
    create: {
      email: "marcus.vance@vertex.io",
      passwordHash: commonPasswordHash,
      firstName: "Marcus",
      lastName: "Vance",
      isEmailVerified: true,
      emailVerifiedAt: new Date(),
      status: "ACTIVE",
    },
  });

  // Organisation 1: THEKOLLI Technologies
  const orgKolli = await prisma.organisation.upsert({
    where: { slug: "thekolli-tech" },
    update: {},
    create: {
      name: "THEKOLLI Technologies",
      legalName: "THEKOLLI Advanced Engineering Private Limited",
      slug: "thekolli-tech",
      orgType: "PRIVATE_LIMITED",
      contactEmail: "contact@thekolli.com",
      contactPhone: "+91 98765 43210",
      country: "India",
      timezone: "Asia/Kolkata",
      currency: "INR",
      status: "ACTIVE",
    },
  });

  // Workspace for Org 1
  await prisma.workspace.upsert({
    where: {
      organisationId_slug: {
        organisationId: orgKolli.id,
        slug: "hq-engineering",
      },
    },
    update: {},
    create: {
      organisationId: orgKolli.id,
      name: "HQ & Engineering",
      slug: "hq-engineering",
      description: "Primary headquarters and advanced systems engineering workspace.",
      isDefault: true,
    },
  });

  // Memberships for Org 1
  if (roleMap["OWNER"]) {
    await prisma.organisationMembership.upsert({
      where: {
        userId_organisationId: {
          userId: userKalyan.id,
          organisationId: orgKolli.id,
        },
      },
      update: { roleId: roleMap["OWNER"] },
      create: {
        userId: userKalyan.id,
        organisationId: orgKolli.id,
        roleId: roleMap["OWNER"],
        isDefault: true,
        status: "ACTIVE",
      },
    });
  }

  if (roleMap["MANAGER"]) {
    await prisma.organisationMembership.upsert({
      where: {
        userId_organisationId: {
          userId: userSarah.id,
          organisationId: orgKolli.id,
        },
      },
      update: { roleId: roleMap["MANAGER"] },
      create: {
        userId: userSarah.id,
        organisationId: orgKolli.id,
        roleId: roleMap["MANAGER"],
        isDefault: true,
        status: "ACTIVE",
      },
    });
  }

  // Subscription for Org 1
  const entPlanId = planMap["ENTERPRISE"];
  if (entPlanId) {
    const periodEnd = new Date();
    periodEnd.setFullYear(periodEnd.getFullYear() + 1);

    await prisma.organisationSubscription.upsert({
      where: { organisationId: orgKolli.id },
      update: { status: "ACTIVE", planId: entPlanId },
      create: {
        organisationId: orgKolli.id,
        planId: entPlanId,
        status: "ACTIVE",
        currentPeriodStart: new Date(),
        currentPeriodEnd: periodEnd,
        renewalDate: periodEnd,
      },
    });
  }

  // Entitlements for all 18 modules for Org 1
  const allModules = await prisma.module.findMany();
  for (const m of allModules) {
    await prisma.moduleEntitlement.upsert({
      where: {
        organisationId_moduleId: {
          organisationId: orgKolli.id,
          moduleId: m.id,
        },
      },
      update: { isEnabled: true },
      create: {
        organisationId: orgKolli.id,
        moduleId: m.id,
        isEnabled: true,
      },
    });
  }

  // Organisation 2: Vertex Dynamics (External tenant for multi-tenant isolation testing)
  const orgVertex = await prisma.organisation.upsert({
    where: { slug: "vertex-dyn" },
    update: {},
    create: {
      name: "Vertex Dynamics",
      legalName: "Vertex Dynamics LLC",
      slug: "vertex-dyn",
      orgType: "LLC",
      contactEmail: "ops@vertex.io",
      country: "United States",
      timezone: "America/New_York",
      currency: "USD",
      status: "ACTIVE",
    },
  });

  await prisma.workspace.upsert({
    where: {
      organisationId_slug: {
        organisationId: orgVertex.id,
        slug: "primary",
      },
    },
    update: {},
    create: {
      organisationId: orgVertex.id,
      name: "Primary Workspace",
      slug: "primary",
      description: "Default operational workspace for Vertex Dynamics.",
      isDefault: true,
    },
  });

  if (roleMap["OWNER"]) {
    await prisma.organisationMembership.upsert({
      where: {
        userId_organisationId: {
          userId: userMarcus.id,
          organisationId: orgVertex.id,
        },
      },
      update: { roleId: roleMap["OWNER"] },
      create: {
        userId: userMarcus.id,
        organisationId: orgVertex.id,
        roleId: roleMap["OWNER"],
        isDefault: true,
        status: "ACTIVE",
      },
    });
  }

  console.log("✅ Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
