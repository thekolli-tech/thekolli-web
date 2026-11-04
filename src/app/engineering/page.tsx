import React from "react";
import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Button } from "@/components/ui/Button";
import { capabilitiesData } from "@/config/capabilities";
import { MechanicalSketchIllustration } from "@/components/illustrations/MechanicalSketchIllustration";
import { Check } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Engineering",
  description:
    "Explore THEKOLLI's engineering disciplines: Artificial Intelligence, Software Engineering, Systems Engineering, and Digital Innovation.",
  path: "/engineering",
});

export default function EngineeringPage() {
  return (
    <div className="bg-[#FFFFFF] pt-28 pb-24 lg:pt-36 lg:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl">
          <SectionEyebrow tag="THEKOLLI / DISCIPLINE">TECHNICAL RIGOR</SectionEyebrow>
          <h1 className="editorial-hero-title mt-4 text-[#242424]">
            Engineering across computational layers.
          </h1>
          <p className="mt-6 font-hand-body text-xl leading-relaxed text-[#777777] sm:text-2xl">
            We apply mathematical precision and systems discipline to build resilient software architectures that perform deterministically in demanding environments.
          </p>
        </div>

        <div className="my-16 border-t border-[#D9D9D9]" />

        {/* Feature Hero Illustration & Overview */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7 space-y-5 font-hand-body text-xl leading-relaxed text-[#777777] sm:text-2xl">
            <h2 className="editorial-section-title text-[#242424]">
              Zero-leak abstractions and deterministic state.
            </h2>
            <p>
              In distributed systems and modern web architecture, abstraction leaks are the primary source of operational fragility. Our engineering doctrine requires strict interface contracts, immutable transactional logs, and decoupled service layers.
            </p>
            <p>
              When integrating artificial intelligence, we emphasize verifiable reasoning pipelines and deterministic constraints over opaque black-box magic. Systems must be explainable, debuggable, and bounded.
            </p>
            <div className="border-l-2 border-[#242424] pl-4 font-hand-annotation text-2xl text-[#242424]">
              &ldquo;Complexity is managed not by adding layers, but by clarifying contracts.&rdquo;
            </div>
          </div>

          <div className="border border-[#D9D9D9] bg-[#FFFFFF] p-6 lg:col-span-5 shadow-xs">
            <MechanicalSketchIllustration caption="MECHANICAL RIGOR / KINEMATIC TOLERANCE" />
          </div>
        </div>

        {/* Detailed 4 Capability Blocks */}
        <div className="mt-28">
          <SectionEyebrow tag="CAPABILITIES">OUR TECHNICAL PRACTICE</SectionEyebrow>
          <h2 className="editorial-section-title mt-4 text-[#242424]">
            Core Engineering Vectors
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {capabilitiesData.map((item) => (
              <div
                key={item.id}
                className="border border-[#D9D9D9] bg-[#FFFFFF] p-8 transition-colors hover:border-[#242424] shadow-xs"
              >
                <div className="flex items-center justify-between border-b border-[#D9D9D9]/50 pb-3">
                  <span className="font-hand-draft text-xs font-semibold text-[#242424]">
                    [{item.number}]
                  </span>
                  <span className="font-hand-draft text-xs text-[#777777]">
                    {item.technicalAnnotation}
                  </span>
                </div>

                <h3 className="editorial-card-title mt-4 text-[#242424]">
                  {item.title}
                </h3>
                <p className="mt-1 font-hand-draft text-sm text-[#777777]">
                  {item.headline}
                </p>

                <p className="mt-4 font-hand-body text-lg leading-relaxed text-[#777777]">
                  {item.description}
                </p>

                <div className="mt-6 border-t border-[#D9D9D9]/50 pt-4">
                  <h4 className="font-hand-draft text-xs font-bold uppercase text-[#242424]">
                    Focus Areas:
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {item.focusAreas.map((area, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 font-hand-body text-base text-[#242424]"
                      >
                        <Check className="h-4 w-4 text-[#242424] stroke-[2.5]" />
                        <span>{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Closing CTA */}
        <div className="mt-24 border border-[#242424] bg-[#242424] p-10 text-[#FFFFFF] lg:p-14 shadow-xs">
          <div className="max-w-2xl">
            <span className="font-hand-draft text-xs uppercase tracking-widest text-[#D9D9D9]">
              TECHNICAL COLLABORATION
            </span>
            <h3 className="editorial-hero-title mt-3 text-[#FFFFFF]">
              Have an advanced engineering challenge?
            </h3>
            <p className="mt-4 font-hand-body text-xl text-[#D9D9D9] leading-relaxed">
              We collaborate with organizations to design mission-critical systems and deploy intelligent software layers that scale predictably.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/contact" variant="secondary" icon="arrow">
                Start Technical Dialogue
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
