"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { mainNavItems } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { MobileNav } from "./MobileNav";

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  if (pathname?.startsWith("/app")) {
    return null;
  }

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "border-b border-[#D9D9D9]/80 bg-[#FFFFFF]/85 backdrop-blur-md py-3 shadow-[0_2px_12px_rgba(23,23,23,0.03)]"
            : "border-b border-transparent bg-transparent py-4"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-12">
          {/* Brand Identity: K-Emblem with 4 Registration Crosshairs & Wordmark */}
          <Link
            href="/"
            className="group flex items-center gap-3 transition-opacity hover:opacity-90"
            aria-label={`${siteConfig.name} Home`}
          >
            {/* Ribbon K Emblem with 4 Technical Registration Crosshairs */}
            <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center p-1">
              <span className="pointer-events-none absolute -top-1 -left-1 font-mono text-[9px] font-bold text-[#777777] leading-none select-none">+</span>
              <span className="pointer-events-none absolute -top-1 -right-1 font-mono text-[9px] font-bold text-[#777777] leading-none select-none">+</span>
              <span className="pointer-events-none absolute -bottom-1 -left-1 font-mono text-[9px] font-bold text-[#777777] leading-none select-none">+</span>
              <span className="pointer-events-none absolute -bottom-1 -right-1 font-mono text-[9px] font-bold text-[#777777] leading-none select-none">+</span>
              
              <Image
                src="/brand/monochrome-graphite-ribbon.png"
                alt="THEKOLLI Emblem"
                width={38}
                height={38}
                priority
                className="h-full w-full object-contain filter drop-shadow-xs"
              />
            </div>

            {/* Handwritten Wordmark & Tagline */}
            <div className="flex flex-col">
              <span className="font-hand-heading text-2xl font-bold tracking-tight text-[#242424] leading-none">
                THEKOLLI
              </span>
              <span className="font-hand-annotation text-[13px] text-[#242424] italic leading-tight mt-0.5">
                AI &amp; Advanced Engineering
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden items-center gap-7 lg:flex"
          >
            {mainNavItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(item.href + "/");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative font-hand-heading text-xl font-medium transition-colors hover:text-[#242424] py-1 ${
                    isActive ? "text-[#242424] font-bold pencil-underline" : "text-[#242424]/85"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className="inline-flex items-center gap-1">
                    <span>{item.label}</span>
                    {item.label === "Products" && (
                      <span className="font-hand-draft text-xs text-[#242424] font-bold ml-0.5">&or;</span>
                    )}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop Handwritten Primary CTA Pill with Radiant Sketch Marks */}
          <div className="hidden items-center gap-4 lg:flex">
            <div className="relative inline-block">
              {/* Radiant sketch marks on top-right of navbar CTA button */}
              <svg
                className="pointer-events-none absolute -top-3.5 -right-2.5 h-5 w-5 stroke-[#242424]"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path d="M 4 15 L 2 9" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M 10 15 L 10 4" strokeWidth="2" strokeLinecap="round" />
                <path d="M 16 15 L 18 9" strokeWidth="1.6" strokeLinecap="round" />
              </svg>

              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full border border-[#242424] bg-[#242424] px-5 py-2 font-hand-heading text-lg font-bold text-[#FFFFFF] shadow-sm transition-all hover:bg-[#171717] hover:shadow-md active:scale-[0.98]"
              >
                <span>Let&apos;s build something</span>
                <span className="font-hand-body text-base transition-transform group-hover:translate-x-1">&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 text-[#242424] transition-colors hover:text-[#171717] lg:hidden"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Full-screen Mobile Menu */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        pathname={pathname}
      />
    </>
  );
}
