import React from "react";
import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = constructMetadata({
  title: "Terms of Use",
  description: "Terms of use and legal notices governing access to the THEKOLLI corporate website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="bg-[#FFFFFF] pt-28 pb-24 lg:pt-36 lg:pb-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-12">
        <SectionEyebrow tag="LEGAL / GOVERNANCE">TERMS OF USE</SectionEyebrow>
        <h1 className="editorial-hero-title mt-4 text-[#242424]">
          Terms of Use
        </h1>
        <div className="mt-2 font-hand-draft text-xs text-[#777777]">
          LAST REVISED: NOVEMBER 2026 &bull; {siteConfig.legalName}
        </div>

        <div className="my-12 border-t border-[#D9D9D9]" />

        <div className="space-y-8 font-hand-body text-xl leading-relaxed text-[#777777]">
          <section>
            <h2 className="font-hand-draft text-base font-bold uppercase text-[#242424]">
              1. Agreement to Terms
            </h2>
            <p className="mt-2">
              By accessing or using this website ({siteConfig.domain}), you agree to be bound by these Terms of Use. If you do not agree to these terms, do not access this corporate website.
            </p>
          </section>

          <section>
            <h2 className="font-hand-draft text-base font-bold uppercase text-[#242424]">
              2. Intellectual Property &amp; Brand Assets
            </h2>
            <p className="mt-2">
              All contents of this website—including but not limited to the THEKOLLI intertwined graphite K emblem, typography compositions, graphite illustrations, technical schematics, architectural blueprints, software documentation, and editorial text—are the proprietary intellectual property of {siteConfig.legalName}.
            </p>
            <p className="mt-2">
              You may not modify, reproduce, distort, reverse engineer, distribute, or create derivative works of the brand emblem or graphite artwork without prior written consent.
            </p>
          </section>

          <section>
            <h2 className="font-hand-draft text-base font-bold uppercase text-[#242424]">
              3. Platform Governance &amp; Separation
            </h2>
            <p className="mt-2">
              Independent SaaS platforms and enterprise applications engineered by THEKOLLI operate under dedicated software license agreements and terms of service. Reference to proprietary systems on this corporate website is for technical informational purposes.
            </p>
          </section>

          <section>
            <h2 className="font-hand-draft text-base font-bold uppercase text-[#242424]">
              4. Disclaimer of Warranties
            </h2>
            <p className="mt-2">
              This website and all information provided herein are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind, whether express or implied.
            </p>
          </section>

          <section>
            <h2 className="font-hand-draft text-base font-bold uppercase text-[#242424]">
              5. Governing Law
            </h2>
            <p className="mt-2">
              These terms are governed by and construed in accordance with the laws of India, without regard to its conflict of law principles.
            </p>
          </section>

          <section>
            <h2 className="font-hand-draft text-base font-bold uppercase text-[#242424]">
              6. Inquiries
            </h2>
            <p className="mt-2">
              Questions regarding these Terms of Use should be directed to:{" "}
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
