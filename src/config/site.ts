/**
 * Central site configuration for THEKOLLI Corporate Website
 * Following strict guidelines:
 * - Clear placeholders for unconfirmed domains/channels
 * - No invented company credentials, histories, or commercial claims
 */

export const siteConfig = {
  name: "THEKOLLI",
  legalName: "THEKOLLI",
  positioning: "AI & Advanced Engineering Company",
  tagline: "Engineering what comes next.",
  supportingStatement: "Where intelligence meets engineering.",
  description:
    "THEKOLLI is an AI and advanced engineering company focused on developing intelligent technologies, connected software systems, and engineering-led digital solutions.",
  metadataYear: "2026",
  
  // Domains and URLs
  domain: "https://thekolli.com",
  canonicalUrl: "https://thekolli.com",
  
  // Contact details
  contact: {
    email: "contact@thekolli.com",
    inquiriesEmail: "inquiries@thekolli.com",
    careersEmail: "thekolli.in@gmail.com",
    address: {
      note: "Registered corporate communications address available upon direct request",
      country: "India",
    },
  },

  // Social & external links (placeholders)
  links: {
    linkedin: "https://www.linkedin.com/company/thekolli",
    github: "https://github.com/thekolli",
    x: "https://x.com/thekolli",
  },

  // Official THEKOLLI Software Systems
  products: {
    overview: {
      positioning: "Engineered Software Platforms",
      tagline: "Proprietary software architectures engineered for resilience and scale.",
      summary:
        "THEKOLLI architects proprietary digital platforms, autonomous reasoning engines, and connected software systems for enterprise scale.",
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;
