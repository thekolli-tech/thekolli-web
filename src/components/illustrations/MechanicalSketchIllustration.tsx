"use client";

import React from "react";
import { motion } from "framer-motion";

interface IllustrationProps {
  className?: string;
  caption?: string;
}

/**
 * Mechanical Sketch Illustration
 * Precision graphite gears, concentric bearings, pitch diameters, and kinematic linkages.
 */
export function MechanicalSketchIllustration({
  className = "",
  caption = "KINEMATIC LINKAGE / ACTUATION COUPLING",
}: IllustrationProps) {
  return (
    <div className={`relative flex flex-col items-center justify-center p-4 bg-[#FFFFFF] ${className}`}>
      <svg
        viewBox="0 0 500 360"
        className="w-full h-auto max-w-[480px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Graphite pencil illustration of mechanical engineering sketches"
        role="img"
      >
        <title>Mechanical Engineering Sketch</title>

        {/* Centerlines and Pitch Diameters */}
        <g stroke="#777777" strokeWidth="0.5" strokeDasharray="6 3 1 3">
          <line x1="50" y1="180" x2="450" y2="180" />
          <line x1="170" y1="50" x2="170" y2="310" />
          <line x1="330" y1="50" x2="330" y2="310" />
        </g>

        {/* Primary Mechanical Gear (Left) */}
        <motion.circle
          cx="170"
          cy="180"
          r="80"
          stroke="#242424"
          strokeWidth="1.8"
          strokeDasharray="14 4"
          initial={{ rotate: 0 }}
          whileInView={{ rotate: 360 }}
          viewport={{ once: true }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        />
        <circle cx="170" cy="180" r="74" stroke="#777777" strokeWidth="0.8" />
        <circle cx="170" cy="180" r="48" stroke="#242424" strokeWidth="1.2" fill="#FFFFFF" />
        <circle cx="170" cy="180" r="22" stroke="#242424" strokeWidth="1.4" />
        <circle cx="170" cy="180" r="6" fill="#171717" />

        {/* Radial Spokes on Gear 1 */}
        {[0, 45, 90, 135].map((angle) => (
          <line
            key={angle}
            x1="170"
            y1="180"
            x2={170 + 74 * Math.cos((angle * Math.PI) / 180)}
            y2={180 + 74 * Math.sin((angle * Math.PI) / 180)}
            stroke="#777777"
            strokeWidth="0.75"
          />
        ))}

        {/* Secondary Driven Gear (Right) */}
        <motion.circle
          cx="330"
          cy="180"
          r="60"
          stroke="#242424"
          strokeWidth="1.8"
          strokeDasharray="12 4"
          initial={{ rotate: 0 }}
          whileInView={{ rotate: -360 }}
          viewport={{ once: true }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
        <circle cx="330" cy="180" r="54" stroke="#777777" strokeWidth="0.8" />
        <circle cx="330" cy="180" r="32" stroke="#242424" strokeWidth="1.2" fill="#FFFFFF" />
        <circle cx="330" cy="180" r="16" stroke="#242424" strokeWidth="1.4" />
        <circle cx="330" cy="180" r="5" fill="#171717" />

        {/* Tangential Cam Follower Arm */}
        <motion.path
          d="M 170 100 L 330 120 L 410 80"
          stroke="#242424"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        />
        <circle cx="410" cy="80" r="5" fill="#242424" />

        {/* Cross-hatch Graphite Shading inside hub */}
        <g stroke="#D9D9D9" strokeWidth="0.6">
          <line x1="155" y1="170" x2="165" y2="160" />
          <line x1="165" y1="170" x2="175" y2="160" />
          <line x1="175" y1="170" x2="185" y2="160" />
        </g>

        {/* Technical Callout Lines */}
        <g stroke="#242424" strokeWidth="0.8">
          <line x1="170" y1="260" x2="170" y2="290" />
          <line x1="170" y1="290" x2="120" y2="290" />
          <text x="65" y="293" fill="#242424" fontSize="12" fontFamily="var(--font-architects)">
            Ø 160 mm [m=2.5]
          </text>
        </g>

        {/* Handwritten Annotation */}
        <text
          x="260"
          y="290"
          fill="#777777"
          fontSize="17"
          fontFamily="var(--font-caveat)"
          transform="rotate(1.5 260 290)"
        >
          Dynamic backlash calibration &lt; 0.04 mm
        </text>
      </svg>

      {caption && (
        <div className="mt-3 flex items-center justify-between w-full max-w-[480px] border-t border-[#D9D9D9] pt-2 text-xs text-[#777777] font-hand-draft">
          <span>{caption}</span>
          <span>GEAR RATIO 1:1.33</span>
        </div>
      )}
    </div>
  );
}
