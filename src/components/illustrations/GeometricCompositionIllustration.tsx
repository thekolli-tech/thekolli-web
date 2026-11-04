"use client";

import React from "react";
import { motion } from "framer-motion";

interface IllustrationProps {
  className?: string;
  caption?: string;
}

/**
 * Geometric Composition Illustration
 * Golden ratio spirals, overlapping Euclidean solids, tangents, and harmonic graphite proportions.
 */
export function GeometricCompositionIllustration({
  className = "",
  caption = "HARMONIC GEOMETRY / EUCLIDEAN PROPORTIONS",
}: IllustrationProps) {
  return (
    <div className={`relative flex flex-col items-center justify-center p-4 bg-[#FFFFFF] ${className}`}>
      <svg
        viewBox="0 0 500 360"
        className="w-full h-auto max-w-[480px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Graphite pencil illustration of geometric compositions and golden ratio"
        role="img"
      >
        <title>Geometric Composition</title>

        {/* Golden Section Rectangles */}
        <motion.rect
          x="60"
          y="40"
          width="380"
          height="235"
          stroke="#242424"
          strokeWidth="1.2"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />
        <line x1="295" y1="40" x2="295" y2="275" stroke="#777777" strokeWidth="0.8" />
        <line x1="295" y1="185" x2="440" y2="185" stroke="#777777" strokeWidth="0.8" />
        <line x1="385" y1="40" x2="385" y2="185" stroke="#777777" strokeWidth="0.8" />

        {/* Golden Ratio Arc (Graphite Curve) */}
        <motion.path
          d="M 60 275 A 235 235 0 0 1 295 40 A 145 145 0 0 1 440 185 A 90 90 0 0 1 350 275"
          stroke="#242424"
          strokeWidth="1.8"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />

        {/* Inscribed Isometric Hexagon */}
        <polygon
          points="177,70 240,110 240,180 177,220 114,180 114,110"
          stroke="#242424"
          strokeWidth="1.2"
          strokeDasharray="4 2"
          fill="#171717"
          fillOpacity="0.03"
        />
        <line x1="177" y1="70" x2="177" y2="220" stroke="#777777" strokeWidth="0.6" />
        <line x1="114" y1="110" x2="240" y2="180" stroke="#777777" strokeWidth="0.6" />
        <line x1="114" y1="180" x2="240" y2="110" stroke="#777777" strokeWidth="0.6" />

        {/* Graphite Diagonal Ray Hatching */}
        <g stroke="#D9D9D9" strokeWidth="0.5">
          <line x1="60" y1="40" x2="440" y2="275" strokeDasharray="3 3" />
          <line x1="60" y1="275" x2="440" y2="40" strokeDasharray="3 3" />
          <line x1="295" y1="40" x2="60" y2="275" strokeDasharray="2 4" />
        </g>

        {/* Ratio Labels */}
        <text x="75" y="305" fill="#242424" fontSize="12" fontFamily="var(--font-architects)">
          Φ = (1 + √5) / 2 ≈ 1.618033
        </text>

        {/* Handwritten Annotation */}
        <text
          x="260"
          y="320"
          fill="#777777"
          fontSize="17"
          fontFamily="var(--font-caveat)"
          transform="rotate(-1 260 320)"
        >
          Proportion governs enduring structural integrity
        </text>
      </svg>

      {caption && (
        <div className="mt-3 flex items-center justify-between w-full max-w-[480px] border-t border-[#D9D9D9] pt-2 text-xs text-[#777777] font-hand-draft">
          <span>{caption}</span>
          <span>MODULAR GEOMETRIC MATRIX</span>
        </div>
      )}
    </div>
  );
}
