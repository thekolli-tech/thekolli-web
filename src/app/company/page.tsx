import React from "react";
import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { ArchitecturalDrawingIllustration } from "@/components/illustrations/ArchitecturalDrawingIllustration";
import { ConnectedSystemsIllustration } from "@/components/illustrations/ConnectedSystemsIllustration";
import { MessageCircle, Mail, MapPin } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Company & Leadership",
  description:
    "Learn about THEKOLLI — founded by Charan Teja Kolli. An AI and advanced engineering company building software products, intelligent automation, and resilient cloud systems.",
  path: "/company",
});

export default function CompanyPage() {
  return (
    <div className="bg-transparent pt-28 pb-24 lg:pt-36 lg:pb-32">
      {/* Page Header */}
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="max-w-3xl">
          <SectionEyebrow tag="THEKOLLI / ABOUT">OUR IDENTITY &amp; FOUNDATION</SectionEyebrow>
          <h1 className="editorial-hero-title mt-4 text-[#242424]">
            Technology with purpose. Engineering with intent.
          </h1>
          <p className="mt-6 font-hand-body text-xl leading-relaxed text-[#242424] sm:text-2xl">
            {siteConfig.description}
          </p>
        </div>

        {/* Editorial Divider */}
        <div className="my-16 border-t border-[#D9D9D9]" />

        {/* Founder & Mission Section */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7 space-y-6 font-hand-body text-xl leading-relaxed text-[#242424] sm:text-2xl">
            <h2 className="editorial-section-title text-[#242424]">
              Founded by Charan Teja Kolli.
            </h2>
            <p>
              THEKOLLI was founded by <strong>Charan Teja Kolli (Founder of THEKOLLI)</strong> with a focused vision: to build meaningful software systems and deliver practical technological engineering that helps organizations operate smarter, modernize legacy workflows, and scale with verifiable confidence.
            </p>
            <p>
              We operate as master builders for ambitious companies. We bridge the gap between bespoke engineering services and proprietary enterprise platforms—treating every line of code, every architectural constraint, and every operational boundary with founder-level ownership.
            </p>
            <div className="border-l-2 border-[#242424] pl-4 font-hand-annotation text-2xl text-[#242424]">
              &ldquo;We start with the business outcome, not a favorite technology. Every system should make operations clearer, faster, and more valuable.&rdquo;
            </div>
          </div>

          <div className="border border-[#D9D9D9] bg-[#FFFFFF] p-6 lg:col-span-5 shadow-xs">
            <ArchitecturalDrawingIllustration caption="FOUNDATIONAL ARCHITECTURE BLUEPRINT" />
          </div>
        </div>

        {/* Core Principles Grid */}
        <div className="mt-20 border-t border-[#D9D9D9] pt-16">
          <SectionEyebrow tag="THE STANDARD WE WORK TO">ENGINEERING PRINCIPLES</SectionEyebrow>
          <h2 className="editorial-section-title mt-4 text-[#242424]">
            How we formulate solutions and commit code.
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Standard 01 */}
            <div className="border border-[#242424] bg-[#FFFFFF]/90 p-8 shadow-xs">
              <span className="font-hand-draft text-xs uppercase tracking-widest text-[#777777]">
                STANDARD &bull; 01
              </span>
              <h3 className="font-hand-heading text-2xl font-bold text-[#242424] mt-2">
                Business First
              </h3>
              <p className="font-hand-body text-lg text-[#242424] mt-3 leading-relaxed">
                We start with the business outcome, not an ephemeral technology trend. Every system must make operations clearer, faster, and more valuable.
              </p>
            </div>

            {/* Standard 02 */}
            <div className="border border-[#242424] bg-[#FFFFFF]/90 p-8 shadow-xs">
              <span className="font-hand-draft text-xs uppercase tracking-widest text-[#777777]">
                STANDARD &bull; 02
              </span>
              <h3 className="font-hand-heading text-2xl font-bold text-[#242424] mt-2">
                Visible Progress
              </h3>
              <p className="font-hand-body text-lg text-[#242424] mt-3 leading-relaxed">
                Clear milestones, direct communication, and demonstrably working software keep decisions grounded in measurable reality from day one.
              </p>
            </div>

            {/* Standard 03 */}
            <div className="border border-[#242424] bg-[#FFFFFF]/90 p-8 shadow-xs">
              <span className="font-hand-draft text-xs uppercase tracking-widest text-[#777777]">
                STANDARD &bull; 03
              </span>
              <h3 className="font-hand-heading text-2xl font-bold text-[#242424] mt-2">
                Built to Last
              </h3>
              <p className="font-hand-body text-lg text-[#242424] mt-3 leading-relaxed">
                Engineering integrity first. Clean, modular, and maintainable software designed to withstand production pressures without technical debt.
              </p>
            </div>
          </div>
        </div>

        {/* Global Operations & Contact Callout */}
        <div className="mt-20 border-2 border-[#242424] bg-[#FFFFFF]/95 p-8 lg:p-12 shadow-xs">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <span className="font-hand-draft text-xs uppercase tracking-wider text-[#777777]">
                GLOBAL OPERATIONS &bull; DIRECT CONTACT
              </span>
              <h3 className="font-hand-heading text-3xl font-bold text-[#242424] mt-2">
                Based in India. Operating Globally.
              </h3>
              <p className="font-hand-body text-xl text-[#242424] mt-3 max-w-2xl leading-relaxed">
                Delivering high-throughput software and cloud infrastructure for businesses across North America, Europe, the Middle East, and India.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-6 font-hand-draft text-sm text-[#242424]">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>India (Global Coverage)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <a href={`mailto:${siteConfig.contact.careersEmail}`} className="underline">
                    {siteConfig.contact.careersEmail}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  <a
                    href={siteConfig.contact.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    WhatsApp: {siteConfig.contact.phone}
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
              <a
                href={siteConfig.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-[#242424] bg-[#242424] px-6 py-3 font-hand-heading text-lg font-bold text-[#FFFFFF] shadow-sm hover:bg-[#171717] transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Chat on WhatsApp</span>
              </a>
              <Button href="/contact" variant="outline" size="md">
                Send Corporate Inquiry
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
