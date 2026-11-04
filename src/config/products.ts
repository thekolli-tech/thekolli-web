export interface ProductModule {
  id: string;
  name: string;
  category: string;
  shortDescription: string;
  keyCapability: string;
}

export interface ModuleCategory {
  name: string;
  description: string;
  modules: ProductModule[];
}

export interface PlatformBenefit {
  title: string;
  description: string;
  iconSketch: "unified" | "workflows" | "centralized" | "org" | "rbac" | "visibility" | "modular" | "extensible";
}

export const tkBusinessSuiteModules: ProductModule[] = [
  // 1. Business Operations
  {
    id: "tkerp",
    name: "TKERP",
    category: "Business Operations",
    shortDescription: "Core organizational resource planning and enterprise management backbone.",
    keyCapability: "Unified operational ledger and inter-departmental resource orchestration.",
  },
  {
    id: "tk-inventory",
    name: "TK Inventory",
    category: "Business Operations",
    shortDescription: "Multi-location stock tracking, valuation, reorder levels, and asset monitoring.",
    keyCapability: "Real-time stock ledger with multi-warehouse tracking and automated reordering.",
  },
  {
    id: "tk-supply",
    name: "TK Supply",
    category: "Business Operations",
    shortDescription: "Supply chain orchestration, vendor management, procurement, and fulfillment.",
    keyCapability: "End-to-end procurement cycles from purchase requisitions to receipt audits.",
  },
  {
    id: "tk-project",
    name: "TK Project",
    category: "Business Operations",
    shortDescription: "Project planning, milestones, team task assignment, and delivery tracking.",
    keyCapability: "Milestone-driven project boards with task dependencies and progress burn-downs.",
  },

  // 2. Finance
  {
    id: "tkfin",
    name: "TKFIN",
    category: "Finance",
    shortDescription: "Financial accounting, general ledger, expense tracking, and fiscal governance.",
    keyCapability: "Double-entry general ledger, automated bank reconciliation, and tax journals.",
  },
  {
    id: "tk-commerce",
    name: "TK Commerce",
    category: "Finance",
    shortDescription: "Multi-channel digital commerce catalog, order processing, and payment flows.",
    keyCapability: "Synchronized product catalogs, payment tracking, and order fulfillment states.",
  },

  // 3. People
  {
    id: "tkhr",
    name: "TKHR",
    category: "People",
    shortDescription: "Human resource administration, staff records, attendance, and organizational hierarchies.",
    keyCapability: "Centralized employee profiles, departmental hierarchies, and leave management.",
  },
  {
    id: "tk-recruit",
    name: "TK Recruit",
    category: "People",
    shortDescription: "Candidate applicant tracking, interview stages, and talent acquisition pipeline.",
    keyCapability: "Structured hiring funnels, candidate evaluation scorecards, and offer tracking.",
  },

  // 4. Productivity & Workflows
  {
    id: "tk-workspace",
    name: "TK Workspace",
    category: "Productivity",
    shortDescription: "Collaborative team spaces, announcements, internal forums, and shared knowledge.",
    keyCapability: "Team communications, company notice boards, and unified workspace portals.",
  },
  {
    id: "tk-docs",
    name: "TK Docs",
    category: "Productivity",
    shortDescription: "Centralized document vault, folder governance, version control, and access permissions.",
    keyCapability: "Hierarchical document stores with strict access lists and immutable version history.",
  },
  {
    id: "tk-flow",
    name: "TK Flow",
    category: "Productivity",
    shortDescription: "Automated multi-step approval workflows, conditional branching, and event triggers.",
    keyCapability: "Drag-and-drop workflow automation with multi-level managerial approval logic.",
  },

  // 5. Customer Operations
  {
    id: "tkcrm",
    name: "TKCRM",
    category: "Customer Operations",
    shortDescription: "Unified customer relationship lifecycle, pipeline tracking, and client intelligence.",
    keyCapability: "360-degree contact histories, opportunity stages, and lead conversion logs.",
  },
  {
    id: "tk-sales",
    name: "TK Sales",
    category: "Customer Operations",
    shortDescription: "Quotations, deal progression, order booking, and revenue pipeline coordination.",
    keyCapability: "Rapid quotation builders, sales order generation, and revenue forecast timelines.",
  },
  {
    id: "tk-service",
    name: "TK Service",
    category: "Customer Operations",
    shortDescription: "Customer support desk, ticket resolution, service level tracking, and field assistance.",
    keyCapability: "Omnichannel support ticketing, SLA tracking, and service resolution histories.",
  },

  // 6. Connectivity & Trust
  {
    id: "tk-forms",
    name: "TK Forms",
    category: "Connectivity",
    shortDescription: "Custom dynamic data collection, digital intake forms, and automated survey pipelines.",
    keyCapability: "Custom dynamic intake forms with field validations and direct database binding.",
  },
  {
    id: "tk-sign",
    name: "TK Sign",
    category: "Connectivity",
    shortDescription: "Secure digital signature collection, document signing workflows, and audit trails.",
    keyCapability: "Legally compliant digital signature capture with cryptographic audit records.",
  },
  {
    id: "tk-analytics",
    name: "TK Analytics",
    category: "Connectivity",
    shortDescription: "Cross-module operational business intelligence, metrics, and executive reporting.",
    keyCapability: "Real-time cross-functional metrics, operational KPI dashboards, and data exports.",
  },
  {
    id: "tk-connect",
    name: "TK Connect",
    category: "Connectivity",
    shortDescription: "API gateways, third-party service webhooks, integrations, and external bridges.",
    keyCapability: "Secure webhook listeners, REST/gRPC API bridges, and external service connectors.",
  },
];

export const tkBusinessSuiteCategories: ModuleCategory[] = [
  {
    name: "Business Operations",
    description: "Core organizational logistics, resource planning, stock, and project execution.",
    modules: tkBusinessSuiteModules.filter((m) => m.category === "Business Operations"),
  },
  {
    name: "Finance",
    description: "Fiscal discipline, general ledger compliance, and commercial transaction handling.",
    modules: tkBusinessSuiteModules.filter((m) => m.category === "Finance"),
  },
  {
    name: "People",
    description: "Workforce administration, organizational structure, and talent pipeline management.",
    modules: tkBusinessSuiteModules.filter((m) => m.category === "People"),
  },
  {
    name: "Productivity",
    description: "Collaborative knowledge bases, structured document vaults, and workflow automation.",
    modules: tkBusinessSuiteModules.filter((m) => m.category === "Productivity"),
  },
  {
    name: "Customer Operations",
    description: "End-to-end customer interactions, sales pipelines, and service fulfillment.",
    modules: tkBusinessSuiteModules.filter((m) => m.category === "Customer Operations"),
  },
  {
    name: "Connectivity & Trust",
    description: "Cross-module intelligence, digital form intake, signatures, and external API gateways.",
    modules: tkBusinessSuiteModules.filter((m) => m.category === "Connectivity"),
  },
];

export const platformBenefits: PlatformBenefit[] = [
  {
    title: "Unified Business Operations",
    description:
      "Replaces disparate third-party tools with a single coordinated system designed to run all core organizational functions.",
    iconSketch: "unified",
  },
  {
    title: "Connected Workflows",
    description:
      "Automates event triggers across departments: sales orders instantly update inventory, trigger project tasks, and log revenue.",
    iconSketch: "workflows",
  },
  {
    title: "Centralised Information",
    description:
      "Eliminates data silos by preserving a single source of operational truth across all users, modules, and teams.",
    iconSketch: "centralized",
  },
  {
    title: "Organisation-Level Management",
    description:
      "Enables multi-entity, multi-department, and multi-branch governance through a consolidated administrative console.",
    iconSketch: "org",
  },
  {
    title: "Role-Based Access (RBAC)",
    description:
      "Granular permission matrices safeguard sensitive fiscal and personal records across every functional tier.",
    iconSketch: "rbac",
  },
  {
    title: "Business Visibility",
    description:
      "Real-time operational dashboards provide clear metrics into inventory velocity, sales pipelines, and project delivery.",
    iconSketch: "visibility",
  },
  {
    title: "Modular Capabilities",
    description:
      "Activate only the modules your organization requires today, seamlessly introducing additional capabilities as operations expand.",
    iconSketch: "modular",
  },
  {
    title: "Extensible Architecture",
    description:
      "Engineered on robust API standards, enabling bespoke integrations, custom automated logic, and enterprise webhooks.",
    iconSketch: "extensible",
  },
];
