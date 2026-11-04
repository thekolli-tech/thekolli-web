import React from "react";
import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { ArchitecturalDrawingIllustration } from "@/components/illustrations/ArchitecturalDrawingIllustration";
import { ConnectedSystemsIllustration } from "@/components/illustrations/ConnectedSystemsIllustration";

export const metadata: Metadata = constructMetadata({
  title: "Company",
  description:
    "Learn about THEKOLLI — an AI and advanced engineering company building intelligent technologies, connected software systems, and engineering-led digital solutions.",
  path: "/company",
});

export default function CompanyPage() {
  return (
    <div className="bg-[#FFFFFF] pt-28 pb-24 lg:pt-36 lg:pb-32">
      {/* Page Header */}
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="max-w-3xl">
          <SectionEyebrow tag="THEKOLLI / ABOUT">OUR IDENTITY</SectionEyebrow>
          <h1 className="editorial-hero-title mt-4 text-[#242424]">
            An engineering company built on fundamental principles.
          </h1>
          <p className="mt-6 font-hand-body text-xl leading-relaxed text-[#777777] sm:text-2xl">
            THEKOLLI is an AI and advanced engineering company focused on developing intelligent technologies, connected software systems, and engineering-led digital solutions.
          </p>
        </div>

        {/* Editorial Divider */}
        <div className="my-16 border-t border-[#D9D9D9]" />

        {/* Core Pillars */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7 space-y-6 font-hand-body text-xl leading-relaxed text-[#777777] sm:text-2xl">
            <h2 className="editorial-section-title text-[#242424]">
              Intellectual honesty before execution.
            </h2>
            <p>
              Modern technology moves rapidly, often prioritizing novelty over durability. At THEKOLLI, our orientation is different. We approach engineering not as an assembly of ephemeral frameworks, but as a discipline of enduring structural integrity.
            </p>
            <p>
              We bring rigorous systems thinking to computational challenges. Whether designing multi-layered business platforms or deploying contextual machine learning models, we analyze every dependency, stress test critical failure paths, and insist on clean computational boundaries.
            </p>
            <div className="border-l-2 border-[#242424] pl-4 font-hand-annotation text-2xl text-[#242424]">
              &ldquo;Where intelligence meets engineering — we bridge mathematical possibility with production durability.&rdquo;
            </div>
          </div>

          <div className="border border-[#D9D9D9] bg-[#FFFFFF] p-6 lg:col-span-5 shadow-xs">
            <ArchitecturalDrawingIllustration caption="FOUNDATIONAL ARCHITECTURE BLUEPRINT" />
          </div>
        </div>

        {/* Second Deep-dive Section */}
        <div className="mt-24 grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="order-2 border border-[#D9D9D9] bg-[#FFFFFF] p-6 lg:order-1 lg:col-span-5 shadow-xs">
            <ConnectedSystemsIllustration caption="SYSTEMIC ALIGNMENT TOPOLOGY" />
          </div>

          <div className="order-1 lg:order-2 lg:col-span-7 space-y-6 font-hand-body text-xl leading-relaxed text-[#777777] sm:text-2xl">
            <SectionEyebrow tag="PRACTICE">HOW WE OPERATE</SectionEyebrow>
            <h2 className="editorial-section-title text-[#242424]">
              Independent platforms, focused execution.
            </h2>
            <p>
              Our engineering efforts are structured around high-impact software systems and autonomous business platforms. Rather than creating generic software, we build focused technologies that solve real organizational complexity.
            </p>
            <p>
              We deliberately operate with lean, high-density engineering teams. By avoiding unnecessary bureaucracy and artificial expansion, every engineer at THEKOLLI maintains deep contextual mastery of the systems they construct.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <Button href="/engineering" variant="primary" icon="arrow">
                Explore Our Engineering Practice
              </Button>
              <Button href="/contact" variant="outline">
                Contact Leadership
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
