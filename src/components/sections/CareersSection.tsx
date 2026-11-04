"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Terminal, Compass, Lightbulb } from "lucide-react";

export function CareersSection() {
  return (
    <section
      id="careers"
      aria-label="Careers and Collaboration"
      className="relative border-t border-[#D9D9D9] bg-transparent py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <SectionEyebrow tag="SECTION 06" className="justify-center">
            TALENT &amp; COLLABORATION
          </SectionEyebrow>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="editorial-section-title mt-4 text-[#242424]"
          >
            Build the future with us.
          </motion.h2>

          <p className="mt-6 font-hand-body text-xl leading-relaxed text-[#777777] sm:text-2xl">
            We are always interested in conversing with engineers, researchers, systems architects, and technical designers who believe that software should be crafted with intellectual honesty and engineering rigor.
          </p>

          <div className="mt-6 font-hand-annotation text-2xl text-[#242424]">
            &ldquo;We value deep craft, mathematical clarity, and persistent curiosity.&rdquo;
          </div>
        </div>

        {/* Collaboration Profiles */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="border border-[#D9D9D9] bg-[#FFFFFF] p-6 text-left transition-colors hover:border-[#242424] shadow-xs">
            <Terminal className="h-6 w-6 text-[#242424]" />
            <h3 className="mt-4 font-hand-heading text-xl font-bold uppercase text-[#242424]">
              Systems &amp; Software Engineers
            </h3>
            <p className="mt-2 font-hand-body text-base leading-relaxed text-[#777777]">
              Builders focused on distributed concurrency, type-safe runtimes, deterministic state sync, and high-performance computing infrastructure.
            </p>
          </div>

          <div className="border border-[#D9D9D9] bg-[#FFFFFF] p-6 text-left transition-colors hover:border-[#242424] shadow-xs">
            <Compass className="h-6 w-6 text-[#242424]" />
            <h3 className="mt-4 font-hand-heading text-xl font-bold uppercase text-[#242424]">
              AI &amp; Applied Researchers
            </h3>
            <p className="mt-2 font-hand-body text-base leading-relaxed text-[#777777]">
              Thinkers exploring contextual machine learning, evaluation pipelines, agentic orchestration, and structured neural-symbolic systems.
            </p>
          </div>

          <div className="border border-[#D9D9D9] bg-[#FFFFFF] p-6 text-left transition-colors hover:border-[#242424] shadow-xs">
            <Lightbulb className="h-6 w-6 text-[#242424]" />
            <h3 className="mt-4 font-hand-heading text-xl font-bold uppercase text-[#242424]">
              Design &amp; Architecture Collaborators
            </h3>
            <p className="mt-2 font-hand-body text-base leading-relaxed text-[#777777]">
              Collaborators crafting refined digital interfaces, ergonomic developer experiences, and human-computer interaction models.
            </p>
          </div>
        </div>

        {/* Dual CTA Buttons */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
          <Button href="/careers" variant="primary" size="lg" icon="arrow">
            Explore opportunities
          </Button>
          <Button href="/contact" variant="secondary" size="lg" icon="arrow">
            Start a conversation
          </Button>
        </div>

        {/* Direct Email note */}
        <div className="mt-8 text-center font-hand-draft text-xs text-[#777777]">
          Direct portfolio submissions:{" "}
          <a
            href={`mailto:${siteConfig.contact.careersEmail}`}
            className="text-[#242424] underline hover:text-[#171717]"
          >
            {siteConfig.contact.careersEmail}
          </a>
        </div>
      </div>
    </section>
  );
}
