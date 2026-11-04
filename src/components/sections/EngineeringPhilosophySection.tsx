"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { engineeringPrinciples } from "@/config/philosophy";
import { GeometricCompositionIllustration } from "@/components/illustrations/GeometricCompositionIllustration";
import { NetworkDiagramIllustration } from "@/components/illustrations/NetworkDiagramIllustration";
import { MechanicalSketchIllustration } from "@/components/illustrations/MechanicalSketchIllustration";
import { ConnectedSystemsIllustration } from "@/components/illustrations/ConnectedSystemsIllustration";

export function EngineeringPhilosophySection() {
  const getIllustration = (type: string) => {
    switch (type) {
      case "precision":
        return <GeometricCompositionIllustration caption="PRECISION / HARMONIC PROPORTIONS" />;
      case "intelligence":
        return <NetworkDiagramIllustration caption="INTELLIGENCE / GRAPH TOPOLOGY" />;
      case "engineering":
        return <MechanicalSketchIllustration caption="ENGINEERING / MECHANICAL RIGOR" />;
      case "evolution":
        return <ConnectedSystemsIllustration caption="EVOLUTION / ADAPTIVE BUS" />;
      default:
        return null;
    }
  };

  return (
    <section
      id="philosophy"
      aria-label="Engineering Philosophy"
      className="relative border-t border-[#D9D9D9] bg-transparent py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl">
          <SectionEyebrow tag="SECTION 02">ENGINEERING PHILOSOPHY</SectionEyebrow>
          <h2 className="editorial-section-title mt-4 text-[#242424]">
            Good engineering begins with better questions.
          </h2>
          <p className="mt-4 font-hand-body text-xl text-[#777777] sm:text-2xl">
            We structure our engineering culture around four immutable principles. These dictate how we formulate problems, evaluate architectures, and commit code.
          </p>
        </div>

        {/* Four Editorial Principle Cards */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
          {engineeringPrinciples.map((principle, index) => (
            <motion.div
              key={principle.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group flex flex-col justify-between border border-[#D9D9D9] bg-[#FFFFFF] p-8 transition-all duration-300 hover:border-[#242424] hover:shadow-[0_8px_30px_rgba(23,23,23,0.04)]"
            >
              <div>
                {/* Top Header Row with Index & Principle Name */}
                <div className="flex items-baseline justify-between border-b border-[#D9D9D9]/50 pb-3">
                  <span className="font-hand-draft text-xs tracking-widest text-[#777777]">
                    PRINCIPLE [{principle.number}]
                  </span>
                  <span className="font-hand-annotation text-lg text-[#242424]">
                    {principle.handwrittenNote}
                  </span>
                </div>

                {/* Principle Title */}
                <h3 className="editorial-card-title mt-4 text-[#242424]">
                  {principle.name}
                </h3>
                <p className="mt-1 font-hand-draft text-sm text-[#777777]">
                  {principle.lead}
                </p>

                {/* Body Explanation */}
                <p className="mt-4 font-hand-body text-lg leading-relaxed text-[#777777]">
                  {principle.description}
                </p>
              </div>

              {/* Original Pencil Illustration Container */}
              <div className="mt-8 overflow-hidden border border-[#D9D9D9] bg-[#FFFFFF] p-2 transition-colors group-hover:border-[#242424]">
                {getIllustration(principle.graphiteSketchType)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
