"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { capabilitiesData } from "@/config/capabilities";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

export function CapabilitiesSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section
      id="capabilities"
      aria-label="Technology and Capabilities"
      className="relative border-t border-[#D9D9D9] bg-transparent py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl">
          <SectionEyebrow tag="SECTION 03">CAPABILITIES &amp; STACK</SectionEyebrow>
          <h2 className="editorial-section-title mt-4 text-[#242424]">
            Building across the layers of modern technology.
          </h2>
          <p className="mt-4 font-hand-body text-xl text-[#777777] sm:text-2xl">
            Our capabilities span mathematical modeling to full-stack platform orchestration. We deploy disciplined engineering across each operational layer.
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Tab List (Col 1-5) */}
          <div className="flex flex-col space-y-2.5 lg:col-span-5">
            {capabilitiesData.map((item, index) => {
              const isActive = activeTab === index;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(index)}
                  className={`group relative flex items-start justify-between border p-5 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#242424] ${
                    isActive
                      ? "border-[#242424] bg-[#FFFFFF] shadow-xs"
                      : "border-[#D9D9D9] bg-[#FFFFFF] hover:border-[#777777]"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-hand-draft text-xs font-semibold text-[#242424]">
                        [{item.number}]
                      </span>
                      <h3
                        className={`font-hand-heading text-xl font-bold ${
                          isActive ? "text-[#242424]" : "text-[#777777] group-hover:text-[#242424]"
                        }`}
                      >
                        {item.title}
                      </h3>
                    </div>
                    <p className="mt-1 font-hand-draft text-xs text-[#777777]">
                      {item.headline}
                    </p>
                  </div>
                  <ArrowRight
                    className={`h-4 w-4 mt-1 transition-transform ${
                      isActive
                        ? "text-[#242424] translate-x-1"
                        : "text-[#D9D9D9] group-hover:text-[#777777]"
                    }`}
                  />
                  {isActive && (
                    <span className="absolute top-0 bottom-0 left-0 w-1 bg-[#242424]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Active Capability Showcase Card (Col 6-12) */}
          <div className="lg:col-span-7">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35 }}
              className="flex h-full flex-col justify-between border border-[#242424] bg-[#FFFFFF] p-8 lg:p-10 shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#D9D9D9] pb-4">
                  <span className="font-hand-draft text-xs tracking-widest text-[#777777] uppercase">
                    CAPABILITY SPECIFICATION [{capabilitiesData[activeTab].number}]
                  </span>
                  <span className="font-hand-draft text-xs text-[#242424]">
                    {capabilitiesData[activeTab].technicalAnnotation}
                  </span>
                </div>

                <h3 className="editorial-card-title mt-6 text-[#242424]">
                  {capabilitiesData[activeTab].title}
                </h3>
                <p className="mt-2 font-hand-draft text-sm text-[#777777]">
                  {capabilitiesData[activeTab].headline}
                </p>

                <p className="mt-6 font-hand-body text-xl leading-relaxed text-[#777777]">
                  {capabilitiesData[activeTab].description}
                </p>

                {/* Focus Areas List */}
                <div className="mt-8">
                  <h4 className="font-hand-draft text-xs font-bold tracking-wider text-[#242424] uppercase">
                    Engineering Focus Vectors:
                  </h4>
                  <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {capabilitiesData[activeTab].focusAreas.map((area, idx) => (
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

              {/* Card Footer Link */}
              <div className="mt-10 border-t border-[#D9D9D9] pt-6 flex items-center justify-between">
                <span className="font-hand-annotation text-lg text-[#777777]">
                  Engineered with deterministic safeguards
                </span>
                <Link
                  href="/engineering"
                  className="inline-flex items-center gap-1 font-hand-heading text-base font-semibold text-[#242424] hover:underline"
                >
                  Detailed technical overview &rarr;
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
