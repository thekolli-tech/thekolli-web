import React from "react";

interface SectionEyebrowProps {
  children: React.ReactNode;
  tag?: string;
  className?: string;
}

export function SectionEyebrow({
  children,
  tag,
  className = "",
}: SectionEyebrowProps) {
  return (
    <div className={`flex items-center gap-2.5 text-[#242424] ${className}`}>
      <span className="h-px w-5 bg-[#242424]" />
      <span className="font-hand-draft text-xs font-semibold tracking-[0.14em] uppercase">
        {children}
      </span>
      {tag && (
        <span className="border border-[#D9D9D9] px-1.5 py-0.5 font-hand-draft text-[10px] text-[#777777]">
          {tag}
        </span>
      )}
    </div>
  );
}
