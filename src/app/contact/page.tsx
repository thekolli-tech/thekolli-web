import React from "react";
import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { siteConfig } from "@/config/site";
import { ContactForm } from "@/components/forms/ContactForm";
import { Mail, MessageCircle, Globe, Shield } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Contact",
  description:
    "Initiate technical communications with THEKOLLI for engineering partnerships, enterprise platform collaboration, or applied research.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="bg-transparent pt-28 pb-24 lg:pt-36 lg:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl">
          <SectionEyebrow tag="THEKOLLI / COMMUNICATIONS">CONTACT CHANNELS</SectionEyebrow>
          <h1 className="editorial-hero-title mt-4 text-[#242424]">
            Start a conversation with our engineering team.
          </h1>
          <p className="mt-6 font-hand-body text-xl leading-relaxed text-[#242424] sm:text-2xl">
            Tell us what you want to improve, build, automate, or connect. We will help shape the next practical step with direct engineer-to-engineer accountability.
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
            <div className="border-2 border-[#242424] bg-[#FFFFFF]/90 p-8 shadow-xs">
              <span className="font-hand-draft text-xs uppercase tracking-widest text-[#777777]">
                OFFICIAL CHANNELS
              </span>
              <h3 className="editorial-card-title mt-2 text-[#242424]">
                Direct Communications
              </h3>

              <div className="mt-6 space-y-6">
                {/* WhatsApp Channel */}
                <div className="flex items-start gap-3">
                  <MessageCircle className="h-5 w-5 text-[#242424] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-hand-draft text-xs text-[#777777] uppercase block">
                      Direct WhatsApp Desk
                    </span>
                    <a
                      href={siteConfig.contact.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-hand-body text-lg font-bold text-[#242424] hover:underline"
                    >
                      {siteConfig.contact.phone} ↗
                    </a>
                  </div>
                </div>

                {/* Corporate Email */}
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-[#242424] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-hand-draft text-xs text-[#777777] uppercase block">
                      General &amp; Technical Inquiries
                    </span>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="font-hand-body text-lg font-semibold text-[#242424] hover:underline"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>

                {/* Careers Email */}
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-[#242424] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-hand-draft text-xs text-[#777777] uppercase block">
                      Careers &amp; Portfolio Submissions
                    </span>
                    <a
                      href={`mailto:${siteConfig.contact.careersEmail}`}
                      className="font-hand-body text-lg font-semibold text-[#242424] hover:underline"
                    >
                      {siteConfig.contact.careersEmail}
                    </a>
                  </div>
                </div>

                {/* Global Coverage */}
                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 text-[#242424] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-hand-draft text-xs text-[#777777] uppercase block">
                      Jurisdiction &amp; Delivery
                    </span>
                    <span className="font-hand-body text-base text-[#242424]">
                      {siteConfig.contact.address.country} &bull; Delivering globally across North America, Europe, Middle East, and India.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Hygiene & Governance */}
            <div className="border border-[#D9D9D9] bg-[#FFFFFF]/90 p-6 shadow-xs">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-[#242424]" />
                <span className="font-hand-draft text-xs font-bold uppercase text-[#242424]">
                  Engineering Integrity
                </span>
              </div>
              <p className="mt-2 font-hand-body text-base text-[#777777] leading-relaxed">
                All communications are routed directly to our senior engineering desk. We review every submission with engineer-to-engineer attention and never share your project specifications with third parties.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
