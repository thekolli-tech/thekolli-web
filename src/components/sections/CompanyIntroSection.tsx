"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { ArchitecturalDrawingIllustration } from "@/components/illustrations/ArchitecturalDrawingIllustration";
import { Button } from "@/components/ui/Button";

export function CompanyIntroSection() {
  return (
    <section
      id="intro"
      aria-label="Company Introduction"
      className="relative border-t border-[#D9D9D9] bg-transparent py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <SectionEyebrow tag="SECTION 01">WHO WE ARE</SectionEyebrow>

            <h2 className="editorial-section-title mt-4 text-[#242424]">
              Technology is only as powerful as the thinking behind it.
            </h2>

            <div className="mt-6 space-y-4 font-hand-body text-xl leading-relaxed text-[#777777] sm:text-2xl">
              <p>
                THEKOLLI is an AI and advanced engineering company focused on developing intelligent technologies, connected software systems, and engineering-led digital solutions.
              </p>
              <p>
                We operate from a foundational belief: exceptional software is neither an accident of rapid iteration nor a byproduct of trend chasing. It is the result of disciplined questions, architectural foresight, and the patient alignment of modern artificial intelligence with computational fundamentals.
              </p>
              <p>
                From complex multi-tenant business backbones to high-concurrency neural reasoning layers, we engineer software designed to function with predictable precision and resilient permanence.
              </p>
            </div>

            {/* Editorial handwritten margin note */}
            <div className="mt-8 border-l-2 border-[#242424] pl-4 font-hand-annotation text-2xl text-[#242424]">
              &ldquo;We design systems that remain clear under complexity and reliable under load.&rdquo;
            </div>

            <div className="mt-8 flex items-center gap-6">
              <Button href="/company" variant="outline" size="md" icon="arrow">
                Read about our company
              </Button>
            </div>
          </motion.div>

          {/* Right Column: Graphite Technical Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="border border-[#D9D9D9] bg-[#FFFFFF] p-6 lg:col-span-5 shadow-xs"
          >
            <ArchitecturalDrawingIllustration
              caption="SYSTEM BLUEPRINT / ARCHITECTURAL LAYER 01"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
