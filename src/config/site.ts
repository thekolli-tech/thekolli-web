/**
 * Central site configuration for THEKOLLI Corporate Website
 * Following strict guidelines:
 * - Clear placeholders for unconfirmed domains/channels
 * - No invented company credentials, histories, or commercial claims
 */

export const siteConfig = {
  name: "THEKOLLI",
  legalName: "THEKOLLI",
  founder: "Charan Teja Kolli",
  positioning: "Software · AI Automation · Cloud · Engineering",
  tagline: "Engineering what comes next.",
  supportingStatement: "Where intelligence meets engineering.",
  ethos: "Technology with purpose. Engineering with intent.",
  description:
    "We partner with ambitious companies to engineer proprietary software platforms, automate critical operations with AI, build dependable cloud systems, and scale revenue through digital growth.",
  metadataYear: "2026",
  
  // Domains and URLs
  domain: "https://thekolli.com",
  canonicalUrl: "https://thekolli.com",
  
  // Contact details
  contact: {
    email: "contact@thekolli.com",
    inquiriesEmail: "contact@thekolli.com",
    careersEmail: "thekolli.in@gmail.com",
    phone: "+91 6366850605",
    whatsapp: "https://wa.me/916366850605",
    address: {
      note: "Registered corporate communications address available upon direct request",
      country: "India",
      coverage: "Operating globally across North America, Europe, Middle East, and India",
    },
  },

  // Social & external links (placeholders)
  links: {
    linkedin: "https://www.linkedin.com/company/thekolli",
    github: "https://github.com/thekolli-tech",
    x: "https://x.com/thekolli",
    whatsapp: "https://wa.me/916366850605",
  },

  // Official THEKOLLI Software Systems & Platforms
  products: {
    overview: {
      positioning: "Engineered Software Platforms",
      tagline: "Proprietary software architectures engineered for resilience and scale.",
      summary:
        "THEKOLLI architects proprietary digital platforms, autonomous reasoning engines, connected ERP operations, and high-throughput cloud systems.",
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;
