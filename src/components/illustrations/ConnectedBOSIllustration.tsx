"use client";

import React from "react";
import { motion } from "framer-motion";

interface IllustrationProps {
  className?: string;
  caption?: string;
}

/**
 * Connected BOS Systems Architecture Illustration
 * Hand-drawn systems architecture diagram illustrating the exact relationships between:
 * Organisation management, Users and teams, Business operations, Finance,
 * Customers, Projects, Documents, Workflows, and Analytics.
 */
export function ConnectedBOSIllustration({
  className = "",
  caption = "BOS INTER-RELATION MATRIX / SYSTEM TOPOLOGY",
}: IllustrationProps) {
  // Center is (270, 200)
  // 8 outer domains arranged in an octagon around the center core (Organisation Management)
  const domains = [
    { name: "Users & Teams", sub: "Auth & RBAC", angle: -90, x: 270, y: 70 },
    { name: "Workflows", sub: "Automated Flow", angle: -45, x: 410, y: 110 },
    { name: "Finance", sub: "Ledger & Tax", angle: 0, x: 450, y: 200 },
    { name: "Analytics", sub: "Intelligence", angle: 45, x: 410, y: 290 },
    { name: "Documents", sub: "Vault & Sign", angle: 90, x: 270, y: 330 },
    { name: "Projects", sub: "Delivery & Tasks", angle: 135, x: 130, y: 290 },
    { name: "Customers", sub: "CRM & Sales", angle: 180, x: 90, y: 200 },
    { name: "Business Ops", sub: "ERP & Inventory", angle: 225, x: 130, y: 110 },
  ];

  return (
    <div className={`relative flex flex-col items-center justify-center p-4 bg-[#FFFFFF] ${className}`}>
      <svg
        viewBox="0 0 540 400"
        className="w-full h-auto max-w-[520px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Hand-drawn systems architecture diagram showing connected business platform relationships"
        role="img"
      >
        <title>Connected Platform Systems Architecture</title>

        {/* Outer concentric reference circles */}
        <circle cx="270" cy="200" r="160" stroke="#D9D9D9" strokeWidth="0.5" strokeDasharray="4 4" />
        <circle cx="270" cy="200" r="95" stroke="#D9D9D9" strokeWidth="0.5" strokeDasharray="2 3" />

        {/* Ring connecting all 8 perimeter domains */}
        <motion.polygon
          points={domains.map((d) => `${d.x},${d.y}`).join(" ")}
          stroke="#777777"
          strokeWidth="0.8"
          strokeDasharray="3 3"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        />

        {/* Radial connecting lines from Center to all 8 domains */}
        {domains.map((d, i) => (
          <motion.line
            key={i}
            x1="270"
            y1="200"
            x2={d.x}
            y2={d.y}
            stroke="#242424"
            strokeWidth="1.2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.05 }}
          />
        ))}

        {/* Cross-module relationship tangents (Selected key linkages) */}
        {/* Business Ops to Finance */}
        <path d="M 130 110 Q 270 120 450 200" stroke="#777777" strokeWidth="0.6" strokeDasharray="2 2" />
        {/* Customers to Projects */}
        <path d="M 90 200 Q 110 260 130 290" stroke="#777777" strokeWidth="0.6" strokeDasharray="2 2" />
        {/* Workflows to Documents */}
        <path d="M 410 110 Q 380 280 270 330" stroke="#777777" strokeWidth="0.6" strokeDasharray="2 2" />
        {/* Analytics to All (Circle highlight) */}
        <circle cx="410" cy="290" r="32" stroke="#242424" strokeWidth="0.6" strokeDasharray="1 2" />

        {/* CENTER NUCLEUS: ORGANISATION MANAGEMENT */}
        <g>
          <circle cx="270" cy="200" r="44" fill="#FFFFFF" stroke="#242424" strokeWidth="1.8" />
          <circle cx="270" cy="200" r="38" stroke="#777777" strokeWidth="0.6" strokeDasharray="2 2" />
          <text
            x="270"
            y="194"
            fill="#242424"
            fontSize="10"
            fontFamily="var(--font-architects)"
            fontWeight="bold"
            textAnchor="middle"
          >
            ORGANISATION
          </text>
          <text
            x="270"
            y="207"
            fill="#242424"
            fontSize="10"
            fontFamily="var(--font-architects)"
            fontWeight="bold"
            textAnchor="middle"
          >
            MANAGEMENT
          </text>
          <text
            x="270"
            y="222"
            fill="#777777"
            fontSize="8"
            fontFamily="var(--font-caveat)"
            textAnchor="middle"
          >
            Root Governance
          </text>
        </g>

        {/* 8 PERIMETER DOMAIN NODES */}
        {domains.map((d, i) => (
          <g key={i}>
            {/* White masking pill / rect */}
            <rect
              x={d.x - 48}
              y={d.y - 18}
              width="96"
              height="36"
              fill="#FFFFFF"
              stroke="#242424"
              strokeWidth="1.2"
            />
            {/* Corner tick */}
            <line x1={d.x - 48} y1={d.y - 14} x2={d.x - 48} y2={d.y - 18} stroke="#242424" strokeWidth="1" />
            <line x1={d.x - 48} y1={d.y - 18} x2={d.x - 44} y2={d.y - 18} stroke="#242424" strokeWidth="1" />

            <text
              x={d.x}
              y={d.y - 2}
              fill="#242424"
              fontSize="10"
              fontFamily="var(--font-kalam)"
              fontWeight="bold"
              textAnchor="middle"
            >
              {d.name}
            </text>
            <text
              x={d.x}
              y={d.y + 11}
              fill="#777777"
              fontSize="8"
              fontFamily="var(--font-architects)"
              textAnchor="middle"
            >
              {d.sub}
            </text>
          </g>
        ))}

        {/* Hand-drawn marginalia note */}
        <text
          x="60"
          y="370"
          fill="#777777"
          fontSize="14"
          fontFamily="var(--font-caveat)"
        >
          &bull; Single state plane: event in Operations automatically synchronizes Finance &amp; Analytics
        </text>
      </svg>

      {caption && (
        <div className="mt-3 flex items-center justify-between w-full max-w-[520px] border-t border-[#D9D9D9] pt-2 text-xs text-[#777777] font-hand-draft">
          <span>{caption}</span>
          <span>9 COHESIVE DOMAINS</span>
        </div>
      )}
    </div>
  );
}
