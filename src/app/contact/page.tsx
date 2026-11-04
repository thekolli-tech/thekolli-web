import React from "react";
import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { siteConfig } from "@/config/site";
import { ContactForm } from "@/components/forms/ContactForm";
import { Mail, Shield, Globe } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Contact",
  description:
    "Initiate technical communications with THEKOLLI for engineering partnerships, enterprise platform collaboration, or applied research.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="bg-[#FFFFFF] pt-28 pb-24 lg:pt-36 lg:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl">
          <SectionEyebrow tag="THEKOLLI / COMMUNICATIONS">CONTACT CHANNELS</SectionEyebrow>
          <h1 className="editorial-hero-title mt-4 text-[#242424]">
            Start a conversation with our engineering team.
          </h1>
          <p className="mt-6 font-hand-body text-xl leading-relaxed text-[#777777] sm:text-2xl">
            We welcome inquiries from engineering leaders, enterprise organizations, researchers, and builders who value technical precision and architectural rigor.
          </p>
        </div>

        <div className="my-16 border-t border-[#D9D9D9]" />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Right Column: Verified Contact Information & Channels */}
          <div className="space-y-8 lg:col-span-5">
            {/* Direct Communication Channels */}
            <div className="border border-[#D9D9D9] bg-[#FFFFFF] p-8 shadow-xs">
              <span className="font-hand-draft text-xs uppercase tracking-widest text-[#777777]">
                OFFICIAL CHANNELS
              </span>
              <h3 className="editorial-card-title mt-2 text-[#242424]">
                Direct Communications
              </h3>

              <div className="mt-6 space-y-5">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-[#242424] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-hand-draft text-xs text-[#777777] uppercase block">
                      General &amp; Technical Inquiries
                    </span>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="font-hand-body text-base font-semibold text-[#242424] hover:underline"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-[#242424] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-hand-draft text-xs text-[#777777] uppercase block">
                      Careers &amp; Portfolio Submissions
                    </span>
                    <a
                      href={`mailto:${siteConfig.contact.careersEmail}`}
                      className="font-hand-body text-base font-semibold text-[#242424] hover:underline"
                    >
                      {siteConfig.contact.careersEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 text-[#242424] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-hand-draft text-xs text-[#777777] uppercase block">
                      Jurisdiction
                    </span>
                    <span className="font-hand-body text-base text-[#242424]">
                      {siteConfig.contact.address.country}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Hygiene & Governance */}
            <div className="border border-[#D9D9D9] bg-[#FFFFFF] p-6 shadow-xs">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-[#242424]" />
                <span className="font-hand-draft text-xs font-bold uppercase text-[#242424]">
                  Anti-Fabrication Notice
                </span>
              </div>
              <p className="mt-2 font-hand-body text-sm text-[#777777] leading-relaxed">
                THEKOLLI adheres to strict corporate governance and does not publish unverified physical addresses, fabricated employee lists, or unauthorized direct phone numbers. All official technical dialogue originates strictly through our authenticated domain communications infrastructure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
