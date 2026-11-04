"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { GraphiteEmblem } from "@/components/illustrations/GraphiteEmblem";
import { WoodenPencil } from "@/components/illustrations/WoodenPencil";

export function HeroSection() {
  return (
    <section
      aria-label="Hero"
      className="relative flex min-h-[96vh] flex-col justify-between overflow-hidden pt-28 pb-10 lg:pt-36 lg:pb-12"
    >
      {/* Main Hero Container */}
      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 lg:px-12">
        {/* Hero Grid: Left Content & Right Emblem Diagram */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Hand-drawn Editorial Composition */}
          <div className="lg:col-span-7">
            {/* 1. Pencil & Speech Callout Bubble */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-5 flex items-center gap-3"
            >
              <WoodenPencil size={56} className="filter drop-shadow-xs" />
              
              <div className="relative inline-flex items-center gap-2 border border-[#777777] bg-[#FFFFFF]/90 px-4 py-1.5 rounded-lg shadow-xs -rotate-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#242424]" />
                <span className="font-hand-heading text-lg sm:text-xl font-bold text-[#242424]">
                  Where intelligence meets engineering.
                </span>

                {/* Hand-drawn radiant sketch lines on top-right */}
                <svg
                  className="pointer-events-none absolute -top-3.5 -right-3 h-5 w-5 stroke-[#242424]"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path d="M 4 16 L 2 10" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M 10 16 L 10 5" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M 16 16 L 18 9" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </div>
            </motion.div>

            {/* 2. Main Editorial Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.2 }}
              className="relative my-3"
            >
              <div className="flex items-baseline">
                {/* 3 sketch accent lines to the left of "Engineering" */}
                <svg
                  className="pointer-events-none mr-2.5 h-8 w-8 shrink-0 self-center stroke-[#242424] lg:h-10 lg:w-10"
                  viewBox="0 0 28 28"
                  fill="none"
                >
                  <path d="M 4 8 L 22 5" strokeWidth="2.8" strokeLinecap="round" />
                  <path d="M 2 14 L 24 14" strokeWidth="3.2" strokeLinecap="round" />
                  <path d="M 4 20 L 22 23" strokeWidth="2.8" strokeLinecap="round" />
                </svg>

                <h1 className="font-hand-heading text-5xl sm:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-[#242424] leading-[0.98] select-none">
                  Engineering what
                </h1>
              </div>

              <div className="relative inline-block mt-1 pl-10 lg:pl-12">
                <h1 className="font-hand-heading text-5xl sm:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-[#242424] leading-[0.98] select-none">
                  comes next.
                </h1>

                {/* Hand-drawn pencil underline beneath "comes next." */}
                <svg
                  className="pointer-events-none absolute -bottom-3 left-8 h-4 w-[92%] stroke-[#242424] max-w-md"
                  viewBox="0 0 320 14"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path d="M 2 8 C 80 14, 180 5, 318 9" strokeWidth="3.8" strokeLinecap="round" />
                </svg>
              </div>
            </motion.div>

            {/* 3. Company Description with Shaded THEKOLLI Swatch */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-8 max-w-2xl font-hand-heading text-xl sm:text-2xl leading-relaxed text-[#242424]"
            >
              <span className="relative inline-block bg-[#D9D9D9]/85 px-2.5 py-0.5 rounded-xs font-bold text-[#171717] -rotate-1 shadow-xs mr-2 border border-[#777777]/30">
                THEKOLLI
              </span>
              <span>
                is an AI and advanced engineering company focused on developing intelligent technologies, connected software systems, and engineering-led digital solutions.
              </span>
            </motion.div>

            {/* 4. Action Buttons (Pill Primary & Outline Secondary) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-9 flex flex-wrap items-center gap-5"
            >
              {/* Primary: Hand-shaded dark graphite pill with sketch radiant marks */}
              <div className="relative inline-block">
                {/* Radiant sketch lines on top-left of primary button */}
                <svg
                  className="pointer-events-none absolute -top-3.5 -left-2.5 h-6 w-6 stroke-[#242424]"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path d="M 5 15 L 2 9" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M 10 16 L 10 5" strokeWidth="2.2" strokeLinecap="round" />
                  <path d="M 15 15 L 18 9" strokeWidth="1.8" strokeLinecap="round" />
                </svg>

                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2.5 rounded-full border border-[#242424] bg-[#242424] px-7 py-3 font-hand-heading text-xl sm:text-2xl font-bold text-[#FFFFFF] shadow-sm transition-all hover:bg-[#171717] hover:shadow-md active:scale-[0.98]"
                >
                  <span>Let&apos;s build something</span>
                  <span className="font-hand-body text-xl transition-transform group-hover:translate-x-1">&rarr;</span>
                </Link>
              </div>

              {/* Secondary: Rounded outline sketch button */}
              <Link
                href="/engineering"
                className="inline-flex items-center justify-center rounded-xl border-2 border-[#242424] bg-transparent px-7 py-3 font-hand-heading text-xl sm:text-2xl font-bold text-[#242424] transition-all hover:bg-[#FCFCFC]/80 hover:shadow-xs active:scale-[0.98]"
              >
                <span>Explore Engineering</span>
              </Link>
            </motion.div>

            {/* 5. Technical Spec Metadata Line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="mt-8 flex flex-wrap items-center gap-2.5 font-hand-draft text-xs sm:text-sm text-[#242424] font-semibold"
            >
              <span className="font-bold text-[#242424]">[ARCH-SPEC]</span>
              <span>DETERMINISTIC SYSTEMS &bull; RESILIENT APPS &bull; ENTERPRISE PLATFORMS</span>
            </motion.div>
          </div>

          {/* Right Column: Complete K-Emblem Engineering Diagram */}
          <div className="flex items-center justify-center lg:col-span-5">
            <GraphiteEmblem />
          </div>
        </div>
      </div>

      {/* Bottom Line with Scroll Indicator */}
      <div className="mx-auto mt-10 w-full max-w-7xl px-6 lg:px-12">
        <div className="flex items-center justify-end border-t border-[#D9D9D9] pt-4 font-hand-draft text-xs sm:text-sm text-[#242424] font-semibold">
          {/* Scroll Down Indicator */}
          <a
            href="#intro"
            className="group flex items-center gap-1.5 text-[#242424] transition-colors hover:text-[#171717]"
            aria-label="Scroll to introduction section"
          >
            <span>SCROLL DOWN</span>
            <span className="text-sm transition-transform group-hover:translate-y-0.5">&darr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
