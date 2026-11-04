"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Button } from "@/components/ui/Button";
import { GraphiteEmblem } from "@/components/illustrations/GraphiteEmblem";
import { siteConfig } from "@/config/site";

export function ClosingCtaSection() {
  return (
    <section
      id="closing-cta"
      aria-label="Closing Call to Action"
      className="relative border-t border-[#D9D9D9] bg-transparent py-28 lg:py-36 overflow-hidden"
    >
      <div className="paper-grid pointer-events-none absolute inset-0 opacity-30" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <SectionEyebrow tag="INITIATE COLLABORATION">
              NEXT STEP
            </SectionEyebrow>

            <h2 className="editorial-hero-title mt-4 text-[#242424]">
              Let&apos;s engineer something meaningful.
            </h2>

            <p className="mt-6 max-w-xl font-hand-body text-xl leading-relaxed text-[#777777] sm:text-2xl">
              Whether you are architecting a mission-critical platform, exploring autonomous reasoning layers, or looking for an engineering partner with relentless standards, we are ready to build.
            </p>

            <div className="mt-6 font-hand-annotation text-2xl text-[#242424]">
              &ldquo;Where intelligence meets engineering.&rdquo;
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Button href="/contact" variant="primary" size="lg" icon="arrow">
                Start a conversation
              </Button>
              <Button href="/products" variant="secondary" size="lg">
                View platforms
              </Button>
            </div>

            <div className="mt-8 font-hand-draft text-xs text-[#777777]">
              Direct corporate communications:{" "}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-[#242424] underline hover:text-[#171717]"
              >
                {siteConfig.contact.email}
              </a>
            </div>
          </motion.div>

          {/* Right Column: Large Graphite Emblem */}
          <div className="flex items-center justify-center lg:col-span-5">
            <GraphiteEmblem size={340} withPencilReveal />
          </div>
        </div>
      </div>
    </section>
  );
}
