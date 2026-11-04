import React from "react";
import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Button } from "@/components/ui/Button";
import { GeometricCompositionIllustration } from "@/components/illustrations/GeometricCompositionIllustration";
import { NetworkDiagramIllustration } from "@/components/illustrations/NetworkDiagramIllustration";

export const metadata: Metadata = constructMetadata({
  title: "Innovation",
  description:
    "Discover how THEKOLLI approaches applied research, experimentation, and advanced engineering.",
  path: "/innovation",
});

export default function InnovationPage() {
  return (
    <div className="bg-[#FFFFFF] pt-28 pb-24 lg:pt-36 lg:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl">
          <SectionEyebrow tag="THEKOLLI / RESEARCH">APPLIED EXPLORATION</SectionEyebrow>
          <h1 className="editorial-hero-title mt-4 text-[#242424]">
            We believe the future is engineered, not predicted.
          </h1>
          <p className="mt-6 font-hand-body text-xl leading-relaxed text-[#777777] sm:text-2xl">
            Our innovation framework bridges theoretical concepts in computation and artificial intelligence with pragmatic, hardened software engineering.
          </p>
        </div>

        <div className="my-16 border-t border-[#D9D9D9]" />

        {/* Feature Section 1 */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7 space-y-6 font-hand-body text-xl leading-relaxed text-[#777777] sm:text-2xl">
            <h2 className="editorial-section-title text-[#242424]">
              From theoretical inquiry to resilient systems.
            </h2>
            <p>
              We conduct exploratory development across the computational layers that define modern software: machine reasoning, multi-agent coordination, graph-based data retrieval, and real-time event streaming.
            </p>
            <p>
              We reject the superficial notion that innovation is merely adopting new libraries or generating hype. For us, true innovation is the disciplined refinement of system behavior: reducing latency, eliminating race conditions, and creating autonomous digital architectures that operate reliably in production.
            </p>
            <div className="border-l-2 border-[#242424] pl-4 font-hand-annotation text-2xl text-[#242424]">
              &ldquo;Rigor is the prerequisite for breakthrough engineering.&rdquo;
            </div>
          </div>

          <div className="border border-[#D9D9D9] bg-[#FFFFFF] p-6 lg:col-span-5 shadow-xs">
            <GeometricCompositionIllustration caption="HARMONIC MATRICES / GEOMETRIC INVARIANTS" />
          </div>
        </div>

        {/* Methodology Stages */}
        <div className="mt-28">
          <SectionEyebrow tag="FRAMEWORK">INNOVATION METHODOLOGY</SectionEyebrow>
          <h2 className="editorial-section-title mt-4 text-[#242424]">
            How We Test and Validate Hypotheses
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="border border-[#D9D9D9] bg-[#FFFFFF] p-8 shadow-xs">
              <span className="font-hand-draft text-xs font-bold text-[#242424]">[01 / DISCOVERY]</span>
              <h3 className="editorial-card-title mt-3 text-[#242424]">Hypothesis Formulation</h3>
              <p className="mt-4 font-hand-body text-base text-[#777777] leading-relaxed">
                Defining precise problem statements, boundary conditions, and performance criteria before writing exploratory code.
              </p>
            </div>

            <div className="border border-[#D9D9D9] bg-[#FFFFFF] p-8 shadow-xs">
              <span className="font-hand-draft text-xs font-bold text-[#242424]">[02 / PROTOTYPING]</span>
              <h3 className="editorial-card-title mt-3 text-[#242424]">Stress Benchmarking</h3>
              <p className="mt-4 font-hand-body text-base text-[#777777] leading-relaxed">
                Deploying rapid sandboxed prototypes under simulated extreme concurrency, network partitions, and edge conditions.
              </p>
            </div>

            <div className="border border-[#D9D9D9] bg-[#FFFFFF] p-8 shadow-xs">
              <span className="font-hand-draft text-xs font-bold text-[#242424]">[03 / PRODUCTION]</span>
              <h3 className="editorial-card-title mt-3 text-[#242424]">Architectural Codification</h3>
              <p className="mt-4 font-hand-body text-base text-[#777777] leading-relaxed">
                Refactoring validated solutions into modular libraries, type-safe API boundaries, and production-ready systems.
              </p>
            </div>
          </div>
        </div>

        {/* Visual Graph Showcase */}
        <div className="mt-24 border border-[#D9D9D9] bg-[#FFFFFF] p-8 lg:p-12 shadow-xs">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <span className="font-hand-draft text-xs text-[#242424] uppercase tracking-wider">
                TOPOLOGICAL RESEARCH
              </span>
              <h3 className="editorial-section-title mt-2 text-[#242424]">
                Mesh Computation &amp; State Synchronization
              </h3>
              <p className="mt-4 font-hand-body text-lg leading-relaxed text-[#777777]">
                Investigating low-latency consensus protocols, distributed event topologies, and real-time state synchronization across edge and cloud instances.
              </p>
              <div className="mt-6">
                <Button href="/contact" variant="primary" icon="arrow">
                  Inquire about technical research
                </Button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <NetworkDiagramIllustration caption="ADAPTIVE MESH COMPUTATION / ACTIVE TOPOLOGY" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
