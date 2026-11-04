"use client";

import React from "react";
import { motion } from "framer-motion";

interface IllustrationProps {
  className?: string;
  caption?: string;
}

/**
 * Interconnected Network Diagram Illustration
 * Graph topology, multi-layered mesh neural links, directed edges, and flow gradients.
 */
export function NetworkDiagramIllustration({
  className = "",
  caption = "GRAPH TOPOLOGY / ADAPTIVE MESH COMPUTATION",
}: IllustrationProps) {
  const nodes = [
    { id: 1, cx: 80, cy: 120, label: "IN.0" },
    { id: 2, cx: 80, cy: 220, label: "IN.1" },
    { id: 3, cx: 200, cy: 80, label: "NODE.A" },
    { id: 4, cx: 200, cy: 170, label: "NODE.B" },
    { id: 5, cx: 200, cy: 260, label: "NODE.C" },
    { id: 6, cx: 330, cy: 110, label: "TENSOR.1" },
    { id: 7, cx: 330, cy: 230, label: "TENSOR.2" },
    { id: 8, cx: 440, cy: 170, label: "OUT.SYNC" },
  ];

  const edges = [
    [1, 3], [1, 4], [2, 4], [2, 5],
    [3, 6], [4, 6], [4, 7], [5, 7],
    [6, 8], [7, 8],
    [3, 4], [4, 5], [6, 7],
  ];

  return (
    <div className={`relative flex flex-col items-center justify-center p-4 bg-[#FFFFFF] ${className}`}>
      <svg
        viewBox="0 0 520 360"
        className="w-full h-auto max-w-[500px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Graphite pencil illustration of interconnected network diagrams and graphs"
        role="img"
      >
        <title>Interconnected Network Graph</title>

        {/* Directed Edges */}
        {edges.map(([fromId, toId], idx) => {
          const from = nodes.find((n) => n.id === fromId)!;
          const to = nodes.find((n) => n.id === toId)!;
          const isCross = Math.abs(from.cx - to.cx) < 20;

          return (
            <motion.line
              key={idx}
              x1={from.cx}
              y1={from.cy}
              x2={to.cx}
              y2={to.cy}
              stroke={isCross ? "#D9D9D9" : "#777777"}
              strokeWidth={isCross ? "0.75" : "1.2"}
              strokeDasharray={isCross ? "2 3" : undefined}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.04 }}
            />
          );
        })}

        {/* Network Nodes */}
        {nodes.map((node) => {
          const isOut = node.id === 8;
          return (
            <g key={node.id}>
              {/* Outer halo */}
              <circle
                cx={node.cx}
                cy={node.cy}
                r={isOut ? 22 : 18}
                stroke={isOut ? "#171717" : "#242424"}
                strokeWidth={isOut ? 2 : 1.2}
                fill="#FFFFFF"
              />
              {/* Inner core */}
              <circle
                cx={node.cx}
                cy={node.cy}
                r={isOut ? 6 : 4}
                fill={isOut ? "#171717" : "#242424"}
              />
              {/* Node label */}
              <text
                x={node.cx}
                y={node.cy + 32}
                fill="#777777"
                fontSize="10"
                fontFamily="var(--font-architects)"
                textAnchor="middle"
              >
                {node.label}
              </text>
            </g>
          );
        })}

        {/* Mathematical weights on edges */}
        <text x="140" y="90" fill="#242424" fontSize="10" fontFamily="var(--font-architects)">
          w=0.884
        </text>
        <text x="260" y="130" fill="#242424" fontSize="10" fontFamily="var(--font-architects)">
          w=1.414
        </text>
        <text x="385" y="195" fill="#242424" fontSize="10" fontFamily="var(--font-architects)">
          σ(z)
        </text>

        {/* Handwritten Annotation */}
        <text
          x="120"
          y="325"
          fill="#777777"
          fontSize="17"
          fontFamily="var(--font-caveat)"
          transform="rotate(0.5 120 325)"
        >
          High-dimensional connectivity converges to stable state equilibrium
        </text>
      </svg>

      {caption && (
        <div className="mt-3 flex items-center justify-between w-full max-w-[500px] border-t border-[#D9D9D9] pt-2 text-xs text-[#777777] font-hand-draft">
          <span>{caption}</span>
          <span>DIRECTED ACYCLIC GRAPH</span>
        </div>
      )}
    </div>
  );
}
