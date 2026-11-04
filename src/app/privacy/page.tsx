import React from "react";
import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = constructMetadata({
  title: "Privacy Policy",
  description: "Privacy policy and data governance practices for THEKOLLI corporate website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="bg-[#FFFFFF] pt-28 pb-24 lg:pt-36 lg:pb-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-12">
        <SectionEyebrow tag="LEGAL / GOVERNANCE">DATA INTEGRITY</SectionEyebrow>
        <h1 className="editorial-hero-title mt-4 text-[#242424]">
          Privacy Policy
        </h1>
        <div className="mt-2 font-hand-draft text-xs text-[#777777]">
          LAST REVISED: NOVEMBER 2026 &bull; {siteConfig.legalName}
        </div>

        <div className="my-12 border-t border-[#D9D9D9]" />

        <div className="space-y-8 font-hand-body text-xl leading-relaxed text-[#777777]">
          <section>
            <h2 className="font-hand-draft text-base font-bold uppercase text-[#242424]">
              1. Foundational Commitment
            </h2>
            <p className="mt-2">
              THEKOLLI (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) treats privacy as an engineering constraint rather than an afterthought. This Privacy Policy governs information handling across this corporate website ({siteConfig.domain}).
            </p>
            <p className="mt-2">
              Note that independent SaaS platforms engineered by THEKOLLI operate on isolated perimeters with independent, dedicated terms and data processing agreements appropriate for multi-tenant enterprise software.
            </p>
          </section>

          <section>
            <h2 className="font-hand-draft text-base font-bold uppercase text-[#242424]">
              2. Data We Collect
            </h2>
            <p className="mt-2">
              We collect information strictly when you voluntarily submit it through our communications form or email channels, including:
            </p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>Full name, institutional or company affiliation, and corporate email address.</li>
              <li>Details provided in technical inquiry descriptions and portfolio submissions.</li>
              <li>Standard technical server logs (IP address, user agent, timestamps) used solely for security monitoring, DDoS mitigation, and system health.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-hand-draft text-base font-bold uppercase text-[#242424]">
              3. No Commercial Data Selling
            </h2>
            <p className="mt-2">
              We never sell, rent, monetize, or trade contact information or submission metadata to third-party advertisers, data brokers, or external marketers. Information is used exclusively to evaluate technical collaboration, respond to inquiries, or process career candidacy.
            </p>
          </section>

          <section>
            <h2 className="font-hand-draft text-base font-bold uppercase text-[#242424]">
              4. Cookies and Tracking
            </h2>
            <p className="mt-2">
              This corporate website does not use invasive surveillance trackers, behavioral ad pixels, or third-party behavioral profiling scripts. Any cookies utilized are strictly essential for core site navigation, security token evaluation, or user preference persistence.
            </p>
          </section>

          <section>
            <h2 className="font-hand-draft text-base font-bold uppercase text-[#242424]">
              5. Communications and Inquiries
            </h2>
            <p className="mt-2">
              Inquiries regarding data retention or requests for deletion of submitted communication records can be directed to our technical administrative channel at:{" "}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-[#242424] underline hover:text-[#171717]"
              >
                {siteConfig.contact.email}
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
