"use client";

import React from "react";
import { motion } from "framer-motion";

interface IllustrationProps {
  className?: string;
  caption?: string;
}

/**
 * Connected Systems Illustration
 * Graphite nodes, data bus tracks, circuitous routing, and synchronized state topologies.
 */
export function ConnectedSystemsIllustration({
  className = "",
  caption = "DISTRIBUTED COHESION / BUS ARCHITECTURE",
}: IllustrationProps) {
  return (
    <div className={`relative flex flex-col items-center justify-center p-4 bg-[#FFFFFF] ${className}`}>
      <svg
        viewBox="0 0 500 360"
        className="w-full h-auto max-w-[480px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Graphite pencil illustration of connected systems and topologies"
        role="img"
      >
        <title>Connected Systems Architecture</title>

        {/* Technical drafting background lines */}
        <line x1="40" y1="60" x2="460" y2="60" stroke="#D9D9D9" strokeWidth="0.5" strokeDasharray="4 4" />
        <line x1="40" y1="180" x2="460" y2="180" stroke="#D9D9D9" strokeWidth="0.5" strokeDasharray="4 4" />
        <line x1="40" y1="300" x2="460" y2="300" stroke="#D9D9D9" strokeWidth="0.5" strokeDasharray="4 4" />

        {/* Central Orchestrator Core */}
        <circle cx="250" cy="180" r="54" stroke="#242424" strokeWidth="1.5" fill="#FFFFFF" />
        <circle cx="250" cy="180" r="46" stroke="#777777" strokeWidth="0.8" strokeDasharray="2 3" />
        <circle cx="250" cy="180" r="28" stroke="#242424" strokeWidth="1.2" fill="#F5F5F5" />
        <circle cx="250" cy="180" r="6" fill="#171717" />

        {/* Core Hatched Rings */}
        <g stroke="#D9D9D9" strokeWidth="0.6">
          <line x1="225" y1="165" x2="235" y2="155" />
          <line x1="235" y1="175" x2="245" y2="165" />
          <line x1="255" y1="195" x2="265" y2="185" />
          <line x1="265" y1="205" x2="275" y2="195" />
        </g>

        {/* Primary Radial Bus Channels */}
        <motion.path
          d="M 250 126 L 250 50 L 140 50"
          stroke="#242424"
          strokeWidth="1.2"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />
        <motion.path
          d="M 250 234 L 250 310 L 360 310"
          stroke="#242424"
          strokeWidth="1.2"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />
        <motion.path
          d="M 196 180 L 90 180 L 70 240"
          stroke="#242424"
          strokeWidth="1.2"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />
        <motion.path
          d="M 304 180 L 410 180 L 430 120"
          stroke="#242424"
          strokeWidth="1.2"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />

        {/* Secondary Cross-link Curves */}
        <path
          d="M 140 50 C 180 80 320 80 360 50"
          stroke="#777777"
          strokeWidth="0.8"
          strokeDasharray="3 3"
        />
        <path
          d="M 70 240 C 100 290 200 300 250 234"
          stroke="#777777"
          strokeWidth="0.8"
          strokeDasharray="3 3"
        />

        {/* Peripheral Sub-system Nodes */}
        {/* Node 1 */}
        <rect x="105" y="36" width="35" height="28" fill="#FFFFFF" stroke="#242424" strokeWidth="1" />
        <text x="110" y="55" fill="#242424" fontSize="11" fontFamily="var(--font-architects)">SYS.A</text>
        
        {/* Node 2 */}
        <rect x="360" y="36" width="35" height="28" fill="#FFFFFF" stroke="#242424" strokeWidth="1" />
        <text x="365" y="55" fill="#242424" fontSize="11" fontFamily="var(--font-architects)">SYS.B</text>

        {/* Node 3 */}
        <rect x="50" y="226" width="36" height="28" fill="#FFFFFF" stroke="#242424" strokeWidth="1" />
        <text x="56" y="245" fill="#242424" fontSize="11" fontFamily="var(--font-architects)">I/O.1</text>

        {/* Node 4 */}
        <rect x="414" y="106" width="36" height="28" fill="#FFFFFF" stroke="#242424" strokeWidth="1" />
        <text x="420" y="125" fill="#242424" fontSize="11" fontFamily="var(--font-architects)">I/O.2</text>

        {/* Node 5 */}
        <rect x="345" y="296" width="38" height="28" fill="#FFFFFF" stroke="#242424" strokeWidth="1" />
        <text x="350" y="315" fill="#242424" fontSize="11" fontFamily="var(--font-architects)">SYNC</text>

        {/* Technical annotation labels */}
        <text x="200" y="260" fill="#242424" fontSize="12" fontFamily="var(--font-architects)">
          CORE BUS [SYNC.OK]
        </text>
        <line x1="250" y1="240" x2="250" y2="250" stroke="#242424" strokeWidth="0.8" />
      </svg>

      {caption && (
        <div className="mt-3 flex items-center justify-between w-full max-w-[480px] border-t border-[#D9D9D9] pt-2 text-xs text-[#777777] font-hand-draft">
          <span>{caption}</span>
          <span>LATENCY &lt; 1.2ms</span>
        </div>
      )}
    </div>
  );
}
