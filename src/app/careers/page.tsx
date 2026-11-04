import React from "react";
import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { Mail, Terminal, Compass, Layers } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Careers & Collaboration",
  description:
    "Join THEKOLLI as an engineer, researcher, or systems architect. Explore our engineering culture and collaboration opportunities.",
  path: "/careers",
});

export default function CareersPage() {
  const engineeringValues = [
    {
      title: "First-Principles Thinking",
      desc: "We dissect challenges down to their physical and computational fundamentals rather than relying on analogies or trend conformity.",
    },
    {
      title: "High Context, Low Noise",
      desc: "We minimize administrative theater and maximize uninterrupted engineering time, fostering deep focus on hard technical problems.",
    },
    {
      title: "Code as Permanent Craft",
      desc: "We write code that is clean, readable, thoroughly typed, and built to survive long after its initial author has moved on.",
    },
    {
      title: "Intellectual Rigor",
      desc: "We encourage open debate, rigorous code review, and humble validation against empirical benchmarks and mathematical invariants.",
    },
  ];

  return (
    <div className="bg-[#FFFFFF] pt-28 pb-24 lg:pt-36 lg:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl">
          <SectionEyebrow tag="THEKOLLI / TALENT">CAREERS &amp; COLLABORATION</SectionEyebrow>
          <h1 className="editorial-hero-title mt-4 text-[#242424]">
            Build the future with us.
          </h1>
          <p className="mt-6 font-hand-body text-xl leading-relaxed text-[#777777] sm:text-2xl">
            We are looking for exceptional minds who view engineering not merely as a job, but as an applied craft requiring relentless intellectual discipline.
          </p>
        </div>

        <div className="my-16 border-t border-[#D9D9D9]" />

        {/* Culture & Ethos */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7 space-y-6 font-hand-body text-xl leading-relaxed text-[#777777] sm:text-2xl">
            <h2 className="editorial-section-title text-[#242424]">
              Where intelligence meets engineering discipline.
            </h2>
            <p>
              At THEKOLLI, our engineering environment is designed for builders who thrive in deep technical work. We reject inflated commercial hype and bureaucratic bloat in favor of small, elite engineering squads with high autonomy and exacting standards.
            </p>
            <p>
              We do not post superficial, evergreen job listings to harvest resumes. Instead, we continuously evaluate candidates who demonstrate exceptional foundational mastery, systems design acumen, and a passionate devotion to software excellence.
            </p>
            <div className="border-l-2 border-[#242424] pl-4 font-hand-annotation text-2xl text-[#242424]">
              &ldquo;We hire individuals who ask the questions others overlook.&rdquo;
            </div>
          </div>

          {/* Core Values Card */}
          <div className="border border-[#D9D9D9] bg-[#FFFFFF] p-8 lg:col-span-5 shadow-xs">
            <span className="font-hand-draft text-xs uppercase tracking-widest text-[#777777]">
              OUR ENGINEERING ETHOS
            </span>
            <div className="mt-6 space-y-5">
              {engineeringValues.map((value, idx) => (
                <div key={idx} className="border-b border-[#D9D9D9]/50 pb-4 last:border-b-0 last:pb-0">
                  <h3 className="font-hand-heading text-lg font-bold text-[#242424]">
                    {value.title}
                  </h3>
                  <p className="mt-1 font-hand-body text-base text-[#777777] leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Areas of Interest */}
        <div className="mt-28">
          <SectionEyebrow tag="COLLABORATION DOMAINS">TECHNICAL PROFILES WE WELCOME</SectionEyebrow>
          <h2 className="editorial-section-title mt-4 text-[#242424]">
            Disciplines We Are Always Interested In
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="border border-[#D9D9D9] bg-[#FFFFFF] p-8 shadow-xs">
              <Terminal className="h-6 w-6 text-[#242424]" />
              <h3 className="editorial-card-title mt-4 text-[#242424]">
                Distributed Systems Engineers
              </h3>
              <p className="mt-3 font-hand-body text-base text-[#777777] leading-relaxed">
                Expertise in concurrent programming, event streaming architectures, transactional state machines, and microservice decoupling.
              </p>
              <div className="mt-6 border-t border-[#D9D9D9]/50 pt-4 font-hand-draft text-xs text-[#242424]">
                DOMAINS: Distributed consensus &bull; Event pipelines &bull; Fault tolerance
              </div>
            </div>

            <div className="border border-[#D9D9D9] bg-[#FFFFFF] p-8 shadow-xs">
              <Compass className="h-6 w-6 text-[#242424]" />
              <h3 className="editorial-card-title mt-4 text-[#242424]">
                AI &amp; Machine Reasoning Researchers
              </h3>
              <p className="mt-3 font-hand-body text-base text-[#777777] leading-relaxed">
                Focus on deterministic reasoning pipelines, contextual model evaluation, structured agentic systems, and mathematical validation.
              </p>
              <div className="mt-6 border-t border-[#D9D9D9]/50 pt-4 font-hand-draft text-xs text-[#242424]">
                DOMAINS: Evaluation harnesses &bull; Graph RAG &bull; Agentic protocols
              </div>
            </div>

            <div className="border border-[#D9D9D9] bg-[#FFFFFF] p-8 shadow-xs">
              <Layers className="h-6 w-6 text-[#242424]" />
              <h3 className="editorial-card-title mt-4 text-[#242424]">
                Enterprise Platform Architects
              </h3>
              <p className="mt-3 font-hand-body text-base text-[#777777] leading-relaxed">
                Skilled in designing multi-tenant web applications, resilient relational schemas, secure RBAC boundaries, and cohesive frontend experiences.
              </p>
              <div className="mt-6 border-t border-[#D9D9D9]/50 pt-4 font-hand-draft text-xs text-[#242424]">
                DOMAINS: Multi-tenancy &bull; Modular frontends &bull; State management
              </div>
            </div>
          </div>
        </div>

        {/* Direct Submission Block */}
        <div className="mt-20 border border-[#242424] bg-[#242424] p-10 text-[#FFFFFF] lg:p-14 shadow-xs">
          <div className="max-w-2xl">
            <span className="font-hand-draft text-xs uppercase tracking-widest text-[#D9D9D9]">
              INITIATE CANDIDACY
            </span>
            <h3 className="editorial-hero-title mt-2 text-[#FFFFFF]">
              Start a technical dialogue.
            </h3>
            <p className="mt-4 font-hand-body text-xl text-[#D9D9D9] leading-relaxed">
              Send us a direct introduction outlining your technical background, code repositories, papers, or systems you have constructed. We review every submission with engineer-to-engineer attention.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${siteConfig.contact.careersEmail}?subject=Engineering%20Candidacy%20%E2%80%94%20THEKOLLI`}
                className="inline-flex items-center gap-2 border border-[#FFFFFF] bg-[#FFFFFF] px-6 py-3 font-hand-heading text-lg font-semibold text-[#242424] shadow-xs hover:bg-[#F5F5F5] transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>Submit Candidacy Portfolio</span>
              </a>
              <Button href="/contact" variant="outline" className="text-[#FFFFFF] border-white/40 hover:bg-white/10">
                General Inquiries
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
