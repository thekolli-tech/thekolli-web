import React from "react";

interface EditorialCardProps {
  children: React.ReactNode;
  className?: string;
  number?: string;
  annotation?: string;
}

export function EditorialCard({
  children,
  className = "",
  number,
  annotation,
}: EditorialCardProps) {
  return (
    <div
      className={`group relative flex flex-col justify-between border border-[#D9D9D9] bg-[#FFFFFF] p-8 transition-all duration-300 hover:border-[#242424] hover:shadow-[0_8px_30px_rgba(23,23,23,0.04)] ${className}`}
    >
      {/* Top corner drafting notch */}
      <div className="absolute top-0 right-0 h-3 w-3 border-t border-r border-[#242424]" />
      <div className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-[#242424]" />

      {/* Top row with technical number & handwriting note */}
      {(number || annotation) && (
        <div className="mb-6 flex items-baseline justify-between border-b border-[#D9D9D9]/50 pb-3">
          {number && (
            <span className="font-hand-draft text-xs tracking-widest text-[#777777]">
              [{number}]
            </span>
          )}
          {annotation && (
            <span className="font-hand-annotation text-base text-[#242424] italic">
              {annotation}
            </span>
          )}
        </div>
      )}

      {children}
    </div>
  );
}
