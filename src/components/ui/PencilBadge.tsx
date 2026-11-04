import React from "react";

interface PencilBadgeProps {
  children: React.ReactNode;
  variant?: "default" | "focus" | "outline" | "product";
  className?: string;
}

export function PencilBadge({
  children,
  variant = "default",
  className = "",
}: PencilBadgeProps) {
  const variants = {
    default: "border-[#D9D9D9] bg-[#FFFFFF] text-[#242424]",
    focus: "border-[#242424] bg-[#F5F5F5] text-[#242424]",
    outline: "border-[#242424] bg-transparent text-[#242424]",
    product: "border-[#242424] bg-[#242424] text-[#FFFFFF]",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 border px-2.5 py-0.5 font-hand-draft text-[11px] font-medium tracking-wider uppercase ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
