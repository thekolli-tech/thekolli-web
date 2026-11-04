"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface GraphiteEmblemProps {
  className?: string;
  size?: number;
  priority?: boolean;
  withPencilReveal?: boolean;
}

/**
 * THEKOLLI Architectural Drafting Diagram with K Emblem
 * Recreates the exact technical concept illustration from the design specification:
 * - Central monochrome graphite ribbon K emblem
 * - Circular dashed drafting ring & centerline Cartesian axes
 * - Registration brackets ⌜ ⌝ ⌞ ⌟
 * - 5 Hand-drawn curved sketch arrows with handwritten callout annotations:
 *   (AI Systems, Engineering Solutions, Connected Systems, Automation, Software Platforms)
 * - FIG. 01 - K EMBLEM capsule title
 */
export function GraphiteEmblem({
  className = "",
  size = 520,
  priority = true,
}: GraphiteEmblemProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none w-full max-w-[540px] aspect-[540/500] ${className}`}
    >
      {/* SVG Layer: Construction Guides, Curved Arrows, and Annotations */}
      <svg
        viewBox="0 0 540 500"
        className="pointer-events-none absolute inset-0 h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Arrowhead marker definition */}
          <marker
            id="graphite-arrow"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1.5 L 8 5 L 0 8.5" fill="none" stroke="#242424" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>

        {/* 1. Circumscribed Dashed Drafting Circle */}
        <motion.circle
          cx="270"
          cy="240"
          r="145"
          stroke="#777777"
          strokeWidth="0.85"
          strokeDasharray="4 6"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />

        {/* 2. Cartesian Drafting Axes (Horizontal & Vertical) */}
        <motion.line
          x1="30"
          y1="240"
          x2="510"
          y2="240"
          stroke="#777777"
          strokeWidth="0.85"
          strokeDasharray="2 4"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        <motion.line
          x1="270"
          y1="20"
          x2="270"
          y2="460"
          stroke="#777777"
          strokeWidth="0.85"
          strokeDasharray="2 4"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        {/* 3. Corner Registration Brackets ⌜ ⌝ ⌞ ⌟ */}
        <path d="M 205 135 L 190 135 L 190 150" stroke="#242424" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 335 135 L 350 135 L 350 150" stroke="#242424" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 205 345 L 190 345 L 190 330" stroke="#242424" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 335 345 L 350 345 L 350 330" stroke="#242424" strokeWidth="1.5" strokeLinecap="round" />

        {/* 4. CALLOUT 1: AI Systems (Top-Left) */}
        <g className="font-hand-heading">
          <text x="145" y="52" textAnchor="middle" fill="#242424" fontSize="20" fontStyle="italic" fontWeight="600">
            AI
          </text>
          <text x="145" y="74" textAnchor="middle" fill="#242424" fontSize="20" fontStyle="italic" fontWeight="600">
            Systems
          </text>
          {/* Curved arrow pointing down towards top ribbon peak */}
          <path
            d="M 175 62 C 200 62, 222 75, 220 102"
            fill="none"
            stroke="#242424"
            strokeWidth="1.5"
            strokeLinecap="round"
            markerEnd="url(#graphite-arrow)"
          />
        </g>

        {/* 5. CALLOUT 2: Engineering Solutions (Top-Right) */}
        <g className="font-hand-heading">
          <text x="430" y="65" textAnchor="middle" fill="#242424" fontSize="19" fontStyle="italic" fontWeight="600">
            Engineering
          </text>
          <text x="430" y="86" textAnchor="middle" fill="#242424" fontSize="19" fontStyle="italic" fontWeight="600">
            Solutions
          </text>
          {/* Curved arrow pointing down-left to outer right loop */}
          <path
            d="M 385 86 C 365 100, 350 120, 342 135"
            fill="none"
            stroke="#242424"
            strokeWidth="1.5"
            strokeLinecap="round"
            markerEnd="url(#graphite-arrow)"
          />
        </g>

        {/* 6. CALLOUT 3: Connected Systems (Middle-Right) */}
        <g className="font-hand-heading">
          <text x="440" y="295" textAnchor="middle" fill="#242424" fontSize="19" fontStyle="italic" fontWeight="600">
            Connected
          </text>
          <text x="440" y="316" textAnchor="middle" fill="#242424" fontSize="19" fontStyle="italic" fontWeight="600">
            Systems
          </text>
          {/* Arrow pointing left directly to the bottom right ribbon tail */}
          <path
            d="M 390 305 C 375 305, 360 305, 345 305"
            fill="none"
            stroke="#242424"
            strokeWidth="1.5"
            strokeLinecap="round"
            markerEnd="url(#graphite-arrow)"
          />
        </g>

        {/* 7. CALLOUT 4: Automation (Bottom-Left) */}
        <g className="font-hand-heading">
          <text x="145" y="375" textAnchor="middle" fill="#242424" fontSize="20" fontStyle="italic" fontWeight="600">
            Automation
          </text>
          {/* Curved arrow pointing up-right to bottom curve */}
          <path
            d="M 180 370 C 205 365, 218 348, 226 328"
            fill="none"
            stroke="#242424"
            strokeWidth="1.5"
            strokeLinecap="round"
            markerEnd="url(#graphite-arrow)"
          />
        </g>

        {/* 8. CALLOUT 5: Software Platforms (Middle-Left) */}
        <g className="font-hand-heading">
          <text x="115" y="230" textAnchor="middle" fill="#242424" fontSize="19" fontStyle="italic" fontWeight="600">
            Software
          </text>
          <text x="115" y="251" textAnchor="middle" fill="#242424" fontSize="19" fontStyle="italic" fontWeight="600">
            Platforms
          </text>
          {/* Curved arrow pointing right to the inner fold */}
          <path
            d="M 155 248 C 175 252, 192 254, 206 248"
            fill="none"
            stroke="#242424"
            strokeWidth="1.5"
            strokeLinecap="round"
            markerEnd="url(#graphite-arrow)"
          />
        </g>

        {/* 9. Figure 01 Capsule (Bottom-Right of Emblem) */}
        <g transform="rotate(-1 372 402)">
          <rect
            x="290"
            y="390"
            width="164"
            height="26"
            rx="13"
            fill="#FCFCFC"
            stroke="#242424"
            strokeWidth="1.2"
          />
          <text
            x="372"
            y="407"
            textAnchor="middle"
            fill="#242424"
            fontSize="12"
            fontWeight="bold"
            letterSpacing="0.08em"
            className="font-hand-draft"
          >
            FIG. 01 - K EMBLEM
          </text>
        </g>
      </svg>

      {/* Central Authentic Monochrome Graphite K Ribbon Emblem */}
      <motion.div
        className="relative z-10 flex items-center justify-center pointer-events-auto"
        style={{ width: "52%", height: "56%", marginTop: "-4%" }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src="/brand/monochrome-graphite-ribbon.png"
          alt="THEKOLLI Intertwined Graphite Ribbon K"
          width={280}
          height={280}
          priority={priority}
          className="h-full w-full object-contain filter drop-shadow-[0_12px_28px_rgba(23,23,23,0.12)] transition-transform duration-500 hover:scale-[1.03]"
        />
      </motion.div>
    </div>
  );
}
