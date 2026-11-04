import React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "text";
  size?: "sm" | "md" | "lg";
  icon?: "arrow" | "external" | "none";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  icon = "none",
  className = "",
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const baseStyles =
    "group inline-flex items-center justify-center font-hand-heading font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#242424] disabled:opacity-50 disabled:pointer-events-none select-none";

  const sizeStyles = {
    sm: "px-3.5 py-1 text-base gap-1.5",
    md: "px-5 py-2 text-lg gap-2",
    lg: "px-7 py-3 text-xl gap-2.5",
  };

  const variantStyles = {
    primary:
      "border border-[#242424] bg-[#242424] text-[#FFFFFF] hover:bg-[#171717] active:bg-[#000000] shadow-xs",
    secondary:
      "bg-[#FFFFFF] text-[#242424] border border-[#242424] hover:bg-[#F5F5F5]",
    outline:
      "bg-transparent text-[#242424] border border-[#D9D9D9] hover:border-[#242424] hover:bg-[#FFFFFF]",
    text: "bg-transparent text-[#242424] hover:underline p-0",
  };

  const renderedIcon =
    icon === "arrow" ? (
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    ) : icon === "external" ? (
      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    ) : null;

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (href) {
    const isExternal = href.startsWith("http");
    return (
      <Link
        href={href}
        className={combinedClasses}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        <span>{children}</span>
        {renderedIcon}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
    >
      <span>{children}</span>
      {renderedIcon}
    </button>
  );
}
