import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { footerNavItems } from "@/config/navigation";

export function Footer() {
  return (
    <footer className="border-t border-[#D9D9D9] bg-transparent text-[#242424]">
      {/* Upper Footer: Brand & Editorial Summary */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Brand Column (Col 1-6) */}
          <div className="lg:col-span-6">
            <Link
              href="/"
              className="inline-flex items-center gap-3"
              aria-label={`${siteConfig.name} Home`}
            >
              <div className="relative h-9 w-9">
                <Image
                  src="/brand/monochrome-graphite-ribbon.png"
                  alt="THEKOLLI Emblem"
                  width={36}
                  height={36}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-hand-heading text-2xl font-bold tracking-[0.14em] text-[#242424] leading-none">
                  THEKOLLI
                </span>
                <span className="font-hand-draft text-[12px] text-[#777777] leading-none mt-1">
                  AI &amp; Advanced Engineering
                </span>
              </div>
            </Link>

            <p className="mt-4 max-w-md font-hand-body text-base leading-relaxed text-[#777777]">
              {siteConfig.description}
            </p>

            <div className="mt-4 flex items-center gap-2 font-hand-draft text-xs text-[#242424]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#242424]" />
              <span>{siteConfig.tagline}</span>
            </div>

            <div className="mt-5 border-l-2 border-[#242424] pl-3">
              <p className="font-hand-annotation text-lg text-[#777777]">
                &ldquo;{siteConfig.supportingStatement}&rdquo;
              </p>
            </div>
          </div>

          {/* Navigation Column (Col 7-9) */}
          <div className="lg:col-span-3">
            <h4 className="font-hand-draft text-sm font-bold uppercase tracking-wider text-[#242424]">
              Company
            </h4>
            <ul className="mt-4 space-y-2">
              {footerNavItems.navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-hand-body text-base text-[#777777] transition-colors hover:text-[#242424] hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Inquiries (Col 10-12) */}
          <div className="lg:col-span-3">
            <h4 className="font-hand-draft text-sm font-bold uppercase tracking-wider text-[#242424]">
              Inquiries
            </h4>
            <div className="mt-4 space-y-3 font-hand-body text-sm text-[#777777]">
              <div>
                <span className="block font-hand-draft text-xs text-[#777777] uppercase">
                  Direct Channel
                </span>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="inline-flex items-center gap-1.5 text-base text-[#242424] hover:underline"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>{siteConfig.contact.email}</span>
                </a>
              </div>
              <div>
                <span className="block font-hand-draft text-xs text-[#777777] uppercase">
                  Careers Channel
                </span>
                <a
                  href={`mailto:${siteConfig.contact.careersEmail}`}
                  className="text-base text-[#242424] hover:underline"
                >
                  {siteConfig.contact.careersEmail}
                </a>
              </div>
              <div className="pt-2 font-hand-draft text-xs text-[#777777]">
                {siteConfig.contact.address.country}
              </div>
            </div>
          </div>
        </div>

        {/* Lower Footer */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-[#D9D9D9] pt-8 font-hand-draft text-xs text-[#777777] md:flex-row">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>&copy; {siteConfig.metadataYear} {siteConfig.legalName}. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            {footerNavItems.legal.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-[#242424] hover:underline"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
