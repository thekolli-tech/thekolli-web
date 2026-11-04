import React from "react";

interface TechnicalRuleProps {
  className?: string;
  label?: string;
  dots?: boolean;
}

export function TechnicalRule({
  className = "",
  label,
  dots = true,
}: TechnicalRuleProps) {
  return (
    <div className={`relative flex items-center w-full my-8 ${className}`}>
      <div className="flex-1 h-px bg-[#D9D9D9]" />
      {dots && (
        <span className="mx-2 h-1 w-1 rounded-full bg-[#777777]" />
      )}
      {label && (
        <span className="px-3 font-hand-draft text-[11px] tracking-widest text-[#777777] uppercase">
          {label}
        </span>
      )}
      {dots && (
        <span className="mx-2 h-1 w-1 rounded-full bg-[#777777]" />
      )}
      <div className="flex-1 h-px bg-[#D9D9D9]" />
    </div>
  );
}
