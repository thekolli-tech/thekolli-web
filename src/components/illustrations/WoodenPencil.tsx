"use client";

import React from "react";

interface WoodenPencilProps {
  className?: string;
  size?: number;
}

export function WoodenPencil({ className = "", size = 64 }: WoodenPencilProps) {
  return (
    <svg
      viewBox="0 0 72 32"
      className={`shrink-0 select-none ${className}`}
      style={{ width: size, height: (size * 32) / 72 }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="rotate(-14 36 16)">
        {/* Metal Ferrule Band */}
        <rect x="52" y="8" width="8" height="16" fill="#A9A59D" stroke="#242424" strokeWidth="1.2" />
        <line x1="56" y1="8" x2="56" y2="24" stroke="#777777" strokeWidth="0.8" />
        
        {/* Pink/Grey Pencil Eraser */}
        <path d="M 60 8 C 65 8, 68 11, 68 16 C 68 21, 65 24, 60 24 Z" fill="#D9D9D9" stroke="#242424" strokeWidth="1.2" />

        {/* Hexagonal Pencil Shaft */}
        <rect x="22" y="8" width="30" height="16" fill="#E2A45A" stroke="#242424" strokeWidth="1.2" />
        <line x1="22" y1="13" x2="52" y2="13" stroke="#C9883D" strokeWidth="1.2" />
        <line x1="22" y1="19" x2="52" y2="19" stroke="#C9883D" strokeWidth="1.2" />

        {/* Sharpened Wooden Cone */}
        <polygon points="22,8 6,16 22,24" fill="#F5F0E6" stroke="#242424" strokeWidth="1.2" />
        {/* Wood carving scallop */}
        <path d="M 22 8 Q 18 12, 22 16 Q 18 20, 22 24" fill="#EADBC8" stroke="#242424" strokeWidth="0.8" />

        {/* Graphite Pencil Lead Tip */}
        <polygon points="12,13 3,16 12,19" fill="#242424" />
      </g>
    </svg>
  );
}
