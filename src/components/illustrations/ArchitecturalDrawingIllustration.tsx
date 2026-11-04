"use client";

import React from "react";
import { motion } from "framer-motion";

interface IllustrationProps {
  className?: string;
  caption?: string;
}

/**
 * Architectural Construction Drawing Illustration
 * Precision floor plan layers, drafting grid lines, elevation profiles, section cuts, and dimensional arrows.
 */
export function ArchitecturalDrawingIllustration({
  className = "",
  caption = "ARCHITECTURAL BLUEPRINT / LAYER 04 SECTION",
}: IllustrationProps) {
  return (
    <div className={`relative flex flex-col items-center justify-center p-4 bg-[#FFFFFF] ${className}`}>
      <svg
        viewBox="0 0 520 380"
        className="w-full h-auto max-w-[500px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Graphite pencil illustration of architectural construction blueprints"
        role="img"
      >
        <title>Architectural Construction Blueprint</title>

        {/* Blueprint drafting border */}
        <rect x="20" y="20" width="480" height="340" stroke="#777777" strokeWidth="0.8" />
        <rect x="25" y="25" width="470" height="330" stroke="#D9D9D9" strokeWidth="0.5" strokeDasharray="2 4" />

        {/* Title Block Box in corner */}
        <rect x="330" y="295" width="160" height="55" fill="#FFFFFF" stroke="#242424" strokeWidth="1" />
        <line x1="330" y1="315" x2="490" y2="315" stroke="#777777" strokeWidth="0.6" />
        <text x="338" y="309" fill="#242424" fontSize="11" fontFamily="var(--font-architects)">THEKOLLI ARCHITECTURE</text>
        <text x="338" y="328" fill="#777777" fontSize="10" fontFamily="var(--font-architects)">PROJ: AI SYSTEMS BASE</text>
        <text x="338" y="342" fill="#242424" fontSize="10" fontFamily="var(--font-architects)">SHEET A-101 / REV 02</text>

        {/* Column Grid Gridlines */}
        <g stroke="#D9D9D9" strokeWidth="0.5" strokeDasharray="3 3">
          <line x1="70" y1="35" x2="70" y2="280" />
          <line x1="160" y1="35" x2="160" y2="280" />
          <line x1="250" y1="35" x2="250" y2="280" />
          <line x1="340" y1="35" x2="340" y2="280" />
          
          <line x1="45" y1="65" x2="370" y2="65" />
          <line x1="45" y1="140" x2="370" y2="140" />
          <line x1="45" y1="215" x2="370" y2="215" />
        </g>

        {/* Grid Bubble Identifiers */}
        {["A", "B", "C", "D"].map((col, idx) => (
          <g key={col}>
            <circle cx={70 + idx * 90} cy={35} r="8" fill="#FFFFFF" stroke="#777777" strokeWidth="0.75" />
            <text x={67 + idx * 90} y={39} fill="#242424" fontSize="11" fontFamily="var(--font-architects)">{col}</text>
          </g>
        ))}

        {/* Primary Load Bearing Walls */}
        <motion.path
          d="M 70 65 L 340 65 L 340 215 L 70 215 Z"
          stroke="#242424"
          strokeWidth="2.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />

        {/* Inner Partitions */}
        <line x1="160" y1="65" x2="160" y2="160" stroke="#242424" strokeWidth="1.8" />
        <line x1="160" y1="160" x2="250" y2="160" stroke="#242424" strokeWidth="1.8" />
        <line x1="250" y1="100" x2="250" y2="215" stroke="#242424" strokeWidth="1.8" />

        {/* Wall Hatching */}
        <g stroke="#777777" strokeWidth="0.5">
          <line x1="72" y1="67" x2="80" y2="75" />
          <line x1="82" y1="67" x2="90" y2="75" />
          <line x1="92" y1="67" x2="100" y2="75" />
          <line x1="102" y1="67" x2="110" y2="75" />
          <line x1="112" y1="67" x2="120" y2="75" />
          <line x1="122" y1="67" x2="130" y2="75" />
        </g>

        {/* Door Swings */}
        <path d="M 160 160 A 25 25 0 0 1 185 185" stroke="#777777" strokeWidth="0.8" strokeDasharray="2 2" fill="none" />
        <line x1="160" y1="160" x2="160" y2="185" stroke="#242424" strokeWidth="0.9" />

        <path d="M 250 100 A 25 25 0 0 0 225 75" stroke="#777777" strokeWidth="0.8" strokeDasharray="2 2" fill="none" />
        <line x1="250" y1="100" x2="225" y2="100" stroke="#242424" strokeWidth="0.9" />

        {/* Dimensional Annotation Lines */}
        <g stroke="#242424" strokeWidth="0.75">
          <line x1="70" y1="240" x2="340" y2="240" />
          <line x1="70" y1="235" x2="70" y2="245" />
          <line x1="340" y1="235" x2="340" y2="245" />
          <text x="175" y="254" fill="#242424" fontSize="12" fontFamily="var(--font-architects)">
            SPAN = 18,400 mm
          </text>
        </g>

        {/* Handwritten Drafting Note */}
        <text
          x="80"
          y="275"
          fill="#777777"
          fontSize="17"
          fontFamily="var(--font-caveat)"
          transform="rotate(-1 80 275)"
        >
          Check thermal tolerances at node junctions prior to integration
        </text>
      </svg>

      {caption && (
        <div className="mt-3 flex items-center justify-between w-full max-w-[500px] border-t border-[#D9D9D9] pt-2 text-xs text-[#777777] font-hand-draft">
          <span>{caption}</span>
          <span>AUTONOMOUS SYSTEMS DIVISION</span>
        </div>
      )}
    </div>
  );
}
