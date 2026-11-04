"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ArrowRight } from "lucide-react";
import { mainNavItems } from "@/config/navigation";
import { siteConfig } from "@/config/site";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}

export function MobileNav({ isOpen, onClose, pathname }: MobileNavProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
      className="fixed inset-0 z-50 flex flex-col bg-[#FFFFFF] lg:hidden animate-in fade-in duration-200"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#D9D9D9] px-6 py-4.5">
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center gap-3"
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
            <span className="font-hand-heading text-xl font-bold tracking-[0.12em] text-[#242424] leading-none">
              THEKOLLI
            </span>
            <span className="font-hand-draft text-[12px] text-[#777777] leading-none mt-1">
              AI &amp; Advanced Engineering
            </span>
          </div>
        </Link>

        <button
          type="button"
          onClick={onClose}
          className="p-2 text-[#242424] hover:text-[#171717]"
          aria-label="Close menu"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="mb-4 font-hand-draft text-xs tracking-widest text-[#777777] uppercase">
          INDEX &bull; NAVIGATION
        </div>

        <nav className="flex flex-col space-y-1">
          {mainNavItems.map((item, index) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`group flex items-center justify-between border-b border-[#D9D9D9]/70 py-4 transition-colors hover:text-[#242424] ${
                  isActive ? "text-[#242424] font-bold" : "text-[#777777]"
                }`}
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-hand-draft text-xs text-[#777777]">
                    0{index + 1}
                  </span>
                  <div>
                    <span className="font-hand-heading text-2xl text-[#242424]">
                      {item.label}
                    </span>
                    {item.description && (
                      <p className="mt-0.5 font-hand-body text-xs text-[#777777]">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-[#777777] transition-transform group-hover:translate-x-1 group-hover:text-[#242424]" />
              </Link>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="mt-8">
          <Link
            href="/contact"
            onClick={onClose}
            className="flex w-full items-center justify-center gap-2 border border-[#242424] bg-[#242424] px-5 py-3 font-hand-heading text-lg font-semibold text-[#FFFFFF] shadow-xs hover:bg-[#171717]"
          >
            <span>Let&apos;s build something</span>
            <span className="font-hand-body">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
