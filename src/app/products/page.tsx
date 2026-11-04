import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { ArrowRight, Cpu, Layers, ShieldCheck, Database } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Products & Software Systems",
  description:
    "Explore proprietary software platforms and connected digital systems engineered by THEKOLLI.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <div className="bg-transparent pt-28 pb-24 lg:pt-36 lg:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl">
          <SectionEyebrow tag="THEKOLLI PLATFORMS">ENGINEERED SOFTWARE SYSTEMS</SectionEyebrow>
          <h1 className="editorial-hero-title mt-4 text-[#242424]">
            Platforms &amp; Systems engineered by THEKOLLI.
          </h1>
          <p className="mt-6 font-hand-heading text-2xl leading-relaxed text-[#242424]">
            We architect, engineer, and deploy proprietary software platforms built for scale, resilience, and autonomous intelligence.
          </p>
        </div>

        <div className="my-16 border-t border-[#D9D9D9]" />

        {/* Systems Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Platform 01: Autonomous Reasoning Backbones */}
          <div className="border-2 border-[#242424] bg-[#FFFFFF]/85 p-8 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#D9D9D9] pb-4">
              <span className="font-hand-draft text-xs uppercase tracking-widest text-[#777777]">
                SYSTEM ARCHITECTURE &bull; 01
              </span>
              <span className="border border-[#242424] px-2 py-0.5 font-hand-draft text-[11px] text-[#242424]">
                DEPLOYED
              </span>
            </div>

            <div className="mt-6">
              <div className="flex h-12 w-12 items-center justify-center border border-[#242424] bg-[#FFFFFF]">
                <Cpu className="h-6 w-6 stroke-[#242424]" />
              </div>

              <h2 className="font-hand-heading text-3xl font-bold text-[#242424] mt-4">
                Autonomous Reasoning &amp; AI Systems
              </h2>
              <p className="font-hand-draft text-sm text-[#777777] mt-1">
                Deterministic decision models embedded into operational fabric.
              </p>
              <p className="font-hand-body text-xl text-[#242424] mt-4 leading-relaxed">
                Purpose-built artificial intelligence architectures that operate with cryptographic precision, deterministic guarantees, and zero hallucination boundaries in critical enterprise workflows.
              </p>

              <div className="mt-8 border-t border-[#D9D9D9]/80 pt-4">
                <Link
                  href="/engineering"
                  className="inline-flex items-center gap-2 font-hand-heading text-xl font-bold text-[#242424] hover:underline"
                >
                  <span>Explore Architecture Specification</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Platform 02: High-Throughput Distributed Backbones */}
          <div className="border-2 border-[#242424] bg-[#FFFFFF]/85 p-8 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#D9D9D9] pb-4">
              <span className="font-hand-draft text-xs uppercase tracking-widest text-[#777777]">
                SYSTEM ARCHITECTURE &bull; 02
              </span>
              <span className="border border-[#242424] px-2 py-0.5 font-hand-draft text-[11px] text-[#242424]">
                DEPLOYED
              </span>
            </div>

            <div className="mt-6">
              <div className="flex h-12 w-12 items-center justify-center border border-[#242424] bg-[#FFFFFF]">
                <Database className="h-6 w-6 stroke-[#242424]" />
              </div>

              <h2 className="font-hand-heading text-3xl font-bold text-[#242424] mt-4">
                Distributed High-Throughput Engines
              </h2>
              <p className="font-hand-draft text-sm text-[#777777] mt-1">
                Resilient transactional backbones for mission-critical operations.
              </p>
              <p className="font-hand-body text-xl text-[#242424] mt-4 leading-relaxed">
                Distributed data pipelines, low-latency state synchronization engines, and multi-region database fabrics designed to sustain continuous operation without degradation.
              </p>

              <div className="mt-8 border-t border-[#D9D9D9]/80 pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 font-hand-heading text-xl font-bold text-[#242424] hover:underline"
                >
                  <span>Inquire for Enterprise Platforms</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Collaboration CTA */}
        <div className="mt-16 border border-[#242424] bg-[#FFFFFF]/90 p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <span className="font-hand-draft text-xs uppercase tracking-wider text-[#777777]">
                COLLABORATIVE SYSTEMS ENGINEERING
              </span>
              <h3 className="font-hand-heading text-3xl font-bold text-[#242424] mt-1">
                Have a proprietary platform requirement?
              </h3>
              <p className="font-hand-body text-xl text-[#242424] mt-2 max-w-2xl">
                We partner with select enterprises to architect, engineer, and deploy bespoke software systems tailored to specific operational spaces.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-[#242424] bg-[#242424] px-7 py-3 font-hand-heading text-xl font-bold text-[#FFFFFF] shadow-sm hover:bg-[#171717] shrink-0"
            >
              <span>Initiate Technical Dialogue</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
