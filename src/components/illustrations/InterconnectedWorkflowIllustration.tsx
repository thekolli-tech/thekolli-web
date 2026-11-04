"use client";

import React from "react";
import { motion } from "framer-motion";

interface IllustrationProps {
  className?: string;
  caption?: string;
}

/**
 * Interconnected Workflow & Business Systems Illustration
 * Hand-drawn graphite pencil illustration showing interconnected business systems, modules and operational workflows.
 */
export function InterconnectedWorkflowIllustration({
  className = "",
  caption = "TK BUSINESS OPERATING SYSTEM / INTERCONNECTED WORKFLOWS",
}: IllustrationProps) {
  return (
    <div className={`relative flex flex-col items-center justify-center p-4 bg-[#FFFFFF] ${className}`}>
      <svg
        viewBox="0 0 540 400"
        className="w-full h-auto max-w-[520px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Graphite pencil illustration of interconnected business systems and workflows"
        role="img"
      >
        <title>Interconnected Business Operating System Architecture</title>

        {/* Faint drafting grid */}
        <line x1="30" y1="80" x2="510" y2="80" stroke="#D9D9D9" strokeWidth="0.5" strokeDasharray="3 3" />
        <line x1="30" y1="200" x2="510" y2="200" stroke="#D9D9D9" strokeWidth="0.5" strokeDasharray="3 3" />
        <line x1="30" y1="320" x2="510" y2="320" stroke="#D9D9D9" strokeWidth="0.5" strokeDasharray="3 3" />
        
        <line x1="140" y1="40" x2="140" y2="360" stroke="#D9D9D9" strokeWidth="0.5" strokeDasharray="3 3" />
        <line x1="270" y1="40" x2="270" y2="360" stroke="#D9D9D9" strokeWidth="0.5" strokeDasharray="3 3" />
        <line x1="400" y1="40" x2="400" y2="360" stroke="#D9D9D9" strokeWidth="0.5" strokeDasharray="3 3" />

        {/* Outer Circular Orbiting Rings */}
        <motion.circle
          cx="270"
          cy="200"
          r="140"
          stroke="#777777"
          strokeWidth="0.75"
          strokeDasharray="4 4"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        />
        <circle cx="270" cy="200" r="105" stroke="#D9D9D9" strokeWidth="0.6" strokeDasharray="2 3" />

        {/* CENTRAL BOS NUCLEUS */}
        <motion.circle
          cx="270"
          cy="200"
          r="48"
          stroke="#242424"
          strokeWidth="1.8"
          fill="#FFFFFF"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        />
        <circle cx="270" cy="200" r="40" stroke="#777777" strokeWidth="0.8" strokeDasharray="3 2" />
        <circle cx="270" cy="200" r="14" fill="#242424" />
        <text
          x="270"
          y="196"
          fill="#FFFFFF"
          fontSize="9"
          fontFamily="var(--font-architects)"
          textAnchor="middle"
        >
          TK
        </text>
        <text
          x="270"
          y="206"
          fill="#FFFFFF"
          fontSize="7"
          fontFamily="var(--font-architects)"
          textAnchor="middle"
        >
          BOS
        </text>
        <text
          x="270"
          y="230"
          fill="#242424"
          fontSize="11"
          fontFamily="var(--font-kalam)"
          fontWeight="bold"
          textAnchor="middle"
        >
          CORE ENGINE
        </text>

        {/* WORKFLOW DATA HIGHWAY BUS PATHS */}
        <motion.path
          d="M 270 152 L 270 90 L 140 90 L 140 120"
          stroke="#242424"
          strokeWidth="1.4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.path
          d="M 270 152 L 270 90 L 400 90 L 400 120"
          stroke="#242424"
          strokeWidth="1.4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.path
          d="M 270 248 L 270 310 L 140 310 L 140 280"
          stroke="#242424"
          strokeWidth="1.4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.path
          d="M 270 248 L 270 310 L 400 310 L 400 280"
          stroke="#242424"
          strokeWidth="1.4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
        />

        {/* DIAGONAL CROSS-SYNC CURVES */}
        <path
          d="M 140 120 C 140 200 200 200 222 200"
          stroke="#777777"
          strokeWidth="0.8"
          strokeDasharray="2 2"
        />
        <path
          d="M 400 120 C 400 200 340 200 318 200"
          stroke="#777777"
          strokeWidth="0.8"
          strokeDasharray="2 2"
        />

        {/* SURROUNDING FUNCTIONAL NODES */}
        
        {/* Node 1: Operations & Inventory (Top-Left) */}
        <g>
          <rect x="95" y="105" width="90" height="42" fill="#FFFFFF" stroke="#242424" strokeWidth="1.4" />
          <line x1="95" y1="120" x2="185" y2="120" stroke="#D9D9D9" strokeWidth="0.75" />
          <text x="140" y="117" fill="#777777" fontSize="8" fontFamily="var(--font-architects)" textAnchor="middle">OPERATIONS</text>
          <text x="140" y="136" fill="#242424" fontSize="11" fontFamily="var(--font-kalam)" fontWeight="bold" textAnchor="middle">TKERP &bull; INVENTORY</text>
        </g>

        {/* Node 2: Finance & Commerce (Top-Right) */}
        <g>
          <rect x="355" y="105" width="90" height="42" fill="#FFFFFF" stroke="#242424" strokeWidth="1.4" />
          <line x1="355" y1="120" x2="445" y2="120" stroke="#D9D9D9" strokeWidth="0.75" />
          <text x="400" y="117" fill="#777777" fontSize="8" fontFamily="var(--font-architects)" textAnchor="middle">FINANCIALS</text>
          <text x="400" y="136" fill="#242424" fontSize="11" fontFamily="var(--font-kalam)" fontWeight="bold" textAnchor="middle">TKFIN &bull; COMMERCE</text>
        </g>

        {/* Node 3: People & Workforce (Bottom-Left) */}
        <g>
          <rect x="95" y="255" width="90" height="42" fill="#FFFFFF" stroke="#242424" strokeWidth="1.4" />
          <line x1="95" y1="270" x2="185" y2="270" stroke="#D9D9D9" strokeWidth="0.75" />
          <text x="140" y="267" fill="#777777" fontSize="8" fontFamily="var(--font-architects)" textAnchor="middle">WORKFORCE</text>
          <text x="140" y="286" fill="#242424" fontSize="11" fontFamily="var(--font-kalam)" fontWeight="bold" textAnchor="middle">TKHR &bull; RECRUIT</text>
        </g>

        {/* Node 4: Customer Lifecycle & CRM (Bottom-Right) */}
        <g>
          <rect x="355" y="255" width="90" height="42" fill="#FFFFFF" stroke="#242424" strokeWidth="1.4" />
          <line x1="355" y1="270" x2="445" y2="270" stroke="#D9D9D9" strokeWidth="0.75" />
          <text x="400" y="267" fill="#777777" fontSize="8" fontFamily="var(--font-architects)" textAnchor="middle">CUSTOMERS</text>
          <text x="400" y="286" fill="#242424" fontSize="11" fontFamily="var(--font-kalam)" fontWeight="bold" textAnchor="middle">TKCRM &bull; SALES</text>
        </g>

        {/* Peripheral Satellite Nodes (Productivity & Connectivity) */}
        {/* Far Left: Flow & Automation */}
        <circle cx="50" cy="200" r="22" fill="#FFFFFF" stroke="#777777" strokeWidth="1.2" />
        <text x="50" y="198" fill="#777777" fontSize="8" fontFamily="var(--font-architects)" textAnchor="middle">FLOW</text>
        <text x="50" y="209" fill="#242424" fontSize="9" fontFamily="var(--font-kalam)" textAnchor="middle">AUTO</text>
        <line x1="72" y1="200" x2="95" y2="200" stroke="#242424" strokeWidth="1" strokeDasharray="2 2" />

        {/* Far Right: Connect & API */}
        <circle cx="490" cy="200" r="22" fill="#FFFFFF" stroke="#777777" strokeWidth="1.2" />
        <text x="490" y="198" fill="#777777" fontSize="8" fontFamily="var(--font-architects)" textAnchor="middle">CONNECT</text>
        <text x="490" y="209" fill="#242424" fontSize="9" fontFamily="var(--font-kalam)" textAnchor="middle">GATEWAY</text>
        <line x1="468" y1="200" x2="445" y2="200" stroke="#242424" strokeWidth="1" strokeDasharray="2 2" />

        {/* Hand-drawn drafting notes */}
        <text
          x="120"
          y="60"
          fill="#777777"
          fontSize="14"
          fontFamily="var(--font-caveat)"
          transform="rotate(-1 120 60)"
        >
          Synchronized event pipeline triggers operations across modules
        </text>

        <text
          x="280"
          y="350"
          fill="#777777"
          fontSize="14"
          fontFamily="var(--font-caveat)"
          transform="rotate(1 280 350)"
        >
          Single source of truth &bull; zero duplicate data silos
        </text>

        {/* Drafting arrows */}
        <polyline points="200,90 205,87 205,93" fill="#242424" stroke="#242424" />
        <polyline points="335,90 340,87 340,93" fill="#242424" stroke="#242424" />
      </svg>

      {caption && (
        <div className="mt-3 flex items-center justify-between w-full max-w-[520px] border-t border-[#D9D9D9] pt-2 text-xs text-[#777777] font-hand-draft">
          <span>{caption}</span>
          <span>18 INTEGRATED MODULES</span>
        </div>
      )}
    </div>
  );
}
