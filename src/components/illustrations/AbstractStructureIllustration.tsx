"use client";

import React from "react";
import { motion } from "framer-motion";

interface IllustrationProps {
  className?: string;
  caption?: string;
}

/**
 * Abstract Engineering Structure Illustration
 * High-precision graphite isometric truss, cantilever grids, and force vector lines.
 */
export function AbstractStructureIllustration({
  className = "",
  caption = "STRUCTURAL ISOMETRY / LOAD DYNAMICS",
}: IllustrationProps) {
  return (
    <div className={`relative flex flex-col items-center justify-center p-4 bg-[#FFFFFF] ${className}`}>
      <svg
        viewBox="0 0 500 380"
        className="w-full h-auto max-w-[480px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Graphite pencil illustration of abstract engineering structures"
        role="img"
      >
        <title>Abstract Engineering Structure</title>
        
        {/* Subtle dot grid */}
        <pattern id="grid-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.75" fill="#D9D9D9" />
        </pattern>
        <rect width="500" height="380" fill="url(#grid-dots)" opacity="0.5" />

        {/* Primary Isometric Grid Lines */}
        <motion.path
          d="M 50 300 L 250 360 L 450 300 L 250 240 Z"
          stroke="#777777"
          strokeWidth="1"
          strokeDasharray="3 3"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />

        {/* Vertical Structural Columns */}
        <line x1="120" y1="280" x2="120" y2="120" stroke="#242424" strokeWidth="1.2" />
        <line x1="250" y1="360" x2="250" y2="100" stroke="#242424" strokeWidth="1.5" />
        <line x1="380" y1="280" x2="380" y2="120" stroke="#242424" strokeWidth="1.2" />

        {/* Isometric Truss Beams */}
        <motion.path
          d="M 120 120 L 250 100 L 380 120 L 250 160 Z"
          stroke="#242424"
          strokeWidth="1.8"
          fill="#171717"
          fillOpacity="0.04"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        {/* Diagonal Cross-bracing (Graphite Hatching) */}
        <g stroke="#777777" strokeWidth="0.75">
          <line x1="120" y1="120" x2="250" y2="220" />
          <line x1="250" y1="100" x2="120" y2="200" />
          <line x1="250" y1="100" x2="380" y2="200" />
          <line x1="380" y1="120" x2="250" y2="220" />
          <line x1="120" y1="200" x2="250" y2="300" />
          <line x1="250" y1="220" x2="120" y2="280" />
          <line x1="250" y1="220" x2="380" y2="280" />
          <line x1="380" y1="200" x2="250" y2="300" />
        </g>

        {/* Pencil Shading - Dense Hatch Lines */}
        <g stroke="#D9D9D9" strokeWidth="0.6">
          <line x1="250" y1="105" x2="280" y2="114" />
          <line x1="250" y1="115" x2="295" y2="128" />
          <line x1="250" y1="125" x2="310" y2="142" />
          <line x1="250" y1="135" x2="330" y2="159" />
          <line x1="250" y1="145" x2="350" y2="175" />
        </g>

        {/* Force Vectors / Dimension Guides */}
        <g stroke="#242424" strokeWidth="0.9">
          <line x1="250" y1="40" x2="250" y2="95" strokeDasharray="2 2" />
          <polyline points="246,90 250,96 254,90" fill="none" />
          <text x="260" y="70" fill="#242424" fontSize="12" fontFamily="var(--font-architects)">
            Δz = 1.618
          </text>

          {/* Dimension Arc */}
          <path d="M 230 103 A 30 30 0 0 1 250 85" fill="none" strokeDasharray="1 2" stroke="#777777" />
          <text x="210" y="80" fill="#777777" fontSize="11" fontFamily="var(--font-architects)">
            45.0°
          </text>
        </g>

        {/* Node Points */}
        {[
          [120, 120], [250, 100], [380, 120], [250, 160],
          [120, 200], [250, 220], [380, 200],
          [120, 280], [250, 300], [380, 280],
          [250, 360],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="2.5" fill="#242424" stroke="#FFFFFF" strokeWidth="1" />
        ))}
      </svg>

      {caption && (
        <div className="mt-3 flex items-center justify-between w-full max-w-[480px] border-t border-[#D9D9D9] pt-2 text-xs text-[#777777] font-hand-draft">
          <span>{caption}</span>
          <span>SCALE 1:24</span>
        </div>
      )}
    </div>
  );
}
