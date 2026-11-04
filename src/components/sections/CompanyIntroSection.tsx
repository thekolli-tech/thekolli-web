"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
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
              Technology with purpose. Engineering with intent.
            </h2>

            <div className="mt-6 space-y-4 font-hand-body text-xl leading-relaxed text-[#242424] sm:text-2xl">
              <p>
                Founded by <strong>Charan Teja Kolli</strong>, THEKOLLI partners with ambitious companies to build complete software and SaaS products, automate operational bottlenecks with practical AI, engineer dependable cloud infrastructure, and scale revenue through digital growth.
              </p>
              <p>
                We operate from a foundational belief: exceptional software is neither an accident of rapid iteration nor a byproduct of trend chasing. It begins by understanding the business outcome first, then connecting strategy, software, and operations into one coherent system your team can own.
              </p>
              <p>
                From custom enterprise operations to autonomous agentic workflows and multi-region cloud backbones, we engineer digital systems built for the moments that matter.
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

          {/* Right Column: Founder Graphite Portrait Plate */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="border-2 border-[#242424] bg-[#FFFFFF] p-5 lg:col-span-5 shadow-xs"
          >
            <div className="relative overflow-hidden border border-[#D9D9D9] bg-[#F6F5F0]">
              <Image
                src="/brand/charan-teja-kolli.jpg"
                alt="Charan Teja Kolli — Founder of THEKOLLI"
                width={600}
                height={660}
                className="w-full h-auto object-cover grayscale contrast-105"
                priority
              />
            </div>

            <div className="mt-4 flex items-baseline justify-between border-t border-[#D9D9D9] pt-3">
              <div>
                <span className="font-hand-heading text-2xl font-bold text-[#242424] block leading-tight">
                  Charan Teja Kolli
                </span>
                <span className="font-hand-draft text-xs uppercase text-[#777777] block mt-0.5">
                  Founder &bull; THEKOLLI
                </span>
              </div>
              <span className="font-hand-draft text-[11px] border border-[#242424] px-2 py-0.5 text-[#242424]">
                FIG. 02 &bull; FOUNDER
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
