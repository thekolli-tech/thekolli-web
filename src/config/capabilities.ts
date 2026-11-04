export interface CapabilityItem {
  id: string;
  number: string;
  title: string;
  headline: string;
  description: string;
  focusAreas: string[];
  technicalAnnotation: string;
}

export const capabilitiesData: CapabilityItem[] = [
  {
    id: "software-saas",
    number: "01",
    title: "Software & SaaS Engineering",
    headline: "Custom software and SaaS platforms, from idea to production launch.",
    description:
      "Plan, design, architect, ship, and evolve digital products your customers and internal teams need. We engineer purpose-built enterprise software that fits your operational workflows, integrates with existing database stacks, and scales predictably.",
    focusAreas: [
      "Custom Web & Enterprise Applications",
      "SaaS Product Engineering & MVP to Scale",
      "Event-Driven API Ecosystems & Bridges",
      "Modular Type-Safe Distributed Systems",
    ],
    technicalAnnotation: "Full lifecycle / zero-debt architecture",
  },
  {
    id: "ai-automation",
    number: "02",
    title: "AI Automation & Agents",
    headline: "Connected autonomous workflows and intelligent conversational agents.",
    description:
      "Deploy useful AI agents and connected autonomous workflows that eliminate repetitive operational tasks, process incoming inquiries, and support your organization 24/7 with deterministic guarantees and human-in-the-loop controls.",
    focusAreas: [
      "Conversational AI Assistants & Concierges",
      "Autonomous Multi-Step Data Workflows",
      "WhatsApp & Omnichannel Automation Bots",
      "Contextual LLM Reasoning Pipelines",
    ],
    technicalAnnotation: "Deterministic execution / cognitive reasoning",
  },
  {
    id: "cloud-devops",
    number: "03",
    title: "Cloud Infrastructure & DevOps",
    headline: "Secure, observable cloud foundations engineered for 99.99% uptime.",
    description:
      "Build, automate, and monitor secure, observable cloud infrastructure. We engineer continuous deployment pipelines, automated scaling policies, multi-region database fabrics, and disaster recovery architectures designed for sustained resilience.",
    focusAreas: [
      "Cloud Architecture & High-Throughput Scaling",
      "Automated CI/CD Deployment Pipelines",
      "Multi-Region Database Replication & Backups",
      "Zero-Trust Security & Observability",
    ],
    technicalAnnotation: "High-concurrency / 99.99% operational uptime",
  },
  {
    id: "people-hrms",
    number: "04",
    title: "People Systems & HRMS",
    headline: "HRMS and payroll supporting the complete employee journey.",
    description:
      "Give HR and employees a streamlined way to manage people operations. We unify employee profiles, biometric attendance tracking, statutory payroll computation, and documentation workflows into a secure, intuitive environment.",
    focusAreas: [
      "Unified Employee Profiles & Hierarchy",
      "Biometric Attendance & Leave Management",
      "Automated Statutory Payroll & Compliance",
      "Digital Onboarding & Document Vaults",
    ],
    technicalAnnotation: "Role-based access / cryptographic audit trails",
  },
  {
    id: "growth-systems",
    number: "05",
    title: "Growth & Performance Systems",
    headline: "Digital marketing connected to measurable revenue outcomes.",
    description:
      "Bring multi-channel ad acquisition, algorithmic optimization, SEO, and lead conversion into a predictable revenue engine. We align paid media, generative search optimization (GEO), and CRM pipelines directly with organizational growth.",
    focusAreas: [
      "Performance Ads (Meta, Google, LinkedIn)",
      "Technical SEO & Generative Search (GEO)",
      "Automated Funnel & CRM Synchronization",
      "High-Converting Landing Experiences",
    ],
    technicalAnnotation: "Measurable ROI / data-attributed pipelines",
  },
];
