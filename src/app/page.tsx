import React from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { CompanyIntroSection } from "@/components/sections/CompanyIntroSection";
import { EngineeringPhilosophySection } from "@/components/sections/EngineeringPhilosophySection";
import { CapabilitiesSection } from "@/components/sections/CapabilitiesSection";
import { InnovationSection } from "@/components/sections/InnovationSection";
import { CareersSection } from "@/components/sections/CareersSection";
import { ClosingCtaSection } from "@/components/sections/ClosingCtaSection";

export default function HomePage() {
  return (
    <>
      {/* 01. Hero */}
      <HeroSection />

      {/* 02. Company Introduction */}
      <CompanyIntroSection />

      {/* 03. Engineering Philosophy */}
      <EngineeringPhilosophySection />

      {/* 04. Technology and Capabilities */}
      <CapabilitiesSection />

      {/* 05. Innovation */}
      <InnovationSection />

      {/* 06. Careers and Collaboration */}
      <CareersSection />

      {/* 07. Closing CTA */}
      <ClosingCtaSection />
    </>
  );
}
