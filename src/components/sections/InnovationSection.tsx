"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { AbstractStructureIllustration } from "@/components/illustrations/AbstractStructureIllustration";
import { Button } from "@/components/ui/Button";

export function InnovationSection() {
  const innovationStages = [
    {
      step: "01",
      name: "Exploratory Research",
      desc: "Deep formulation of computational limits, system constraints, and algorithmic frontiers.",
    },
    {
      step: "02",
      name: "Architectural Prototyping",
      desc: "Rigorous stress testing of theoretical designs against edge cases and load spikes.",
    },
    {
      step: "03",
      name: "Empirical Validation",
      desc: "Systematic benchmarking, measurable verification, and error-budget evaluation.",
    },
    {
      step: "04",
      name: "Production Integration",
      desc: "Codifying research into resilient, documented, maintainable software systems.",
    },
  ];

  return (
    <section
      id="innovation"
      aria-label="Innovation and Research"
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
            <SectionEyebrow tag="SECTION 05">INNOVATION SYSTEM</SectionEyebrow>

            <h2 className="editorial-section-title mt-4 text-[#242424]">
              We believe the future is engineered, not predicted.
            </h2>

            <p className="mt-6 font-hand-body text-xl leading-relaxed text-[#777777] sm:text-2xl">
              Innovation at THEKOLLI is neither speculative guesswork nor reactive adaptation. We treat technological progress as a disciplined discipline: formulating foundational hypotheses, evaluating computational invariants, and systematically turning engineering concepts into hardened digital reality.
            </p>

            {/* Innovation Lifecycle Steps */}
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {innovationStages.map((stage) => (
                <div
                  key={stage.step}
                  className="border border-[#D9D9D9] bg-[#FFFFFF] p-4.5 transition-colors hover:border-[#242424]"
                >
                  <div className="flex items-center gap-2 font-hand-draft text-xs font-bold text-[#242424]">
                    <span>[{stage.step}]</span>
                    <span className="uppercase text-[#242424]">{stage.name}</span>
                  </div>
                  <p className="mt-2 font-hand-body text-base leading-relaxed text-[#777777]">
                    {stage.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-4">
              <Button href="/innovation" variant="outline" size="md" icon="arrow">
                Explore Innovation Framework
              </Button>
            </div>
          </motion.div>

          {/* Right Column: Animated Graphite Line Artwork */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="border border-[#D9D9D9] bg-[#FFFFFF] p-6 lg:col-span-5 shadow-xs"
          >
            <AbstractStructureIllustration
              caption="STRUCTURAL KINEMATICS / EXPERIMENTAL BLUEPRINT"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
