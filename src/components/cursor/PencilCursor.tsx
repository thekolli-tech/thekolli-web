"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Custom Sharpened Graphite Pencil Cursor
 * - The tip of the pencil lead points directly at (0, 0) of the mouse pointer
 * - Only active on fine-pointer desktop devices; disabled on touch/coarse devices
 * - Tilts into active sketching angle on click-drag (isDrawing)
 * - Pure monochrome graphite visual aesthetics
 */
export function PencilCursor() {
  const [isActive, setIsActive] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth graphite trailing spring
  const springX = useSpring(mouseX, { damping: 30, stiffness: 450 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 450 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Only enable on desktop devices with a mouse/trackpad
    const finePointerQuery = window.matchMedia("(pointer: fine) and (hover: hover)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!finePointerQuery.matches || reducedMotionQuery.matches) {
      return;
    }

    // Hide default browser cursor
    document.documentElement.classList.add("custom-pencil-active");
    setIsActive(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest("a") ||
          target.closest("button") ||
          target.closest("input") ||
          target.closest("textarea") ||
          target.closest("select") ||
          target.getAttribute("role") === "button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (e.button === 0) {
        setIsDrawing(true);
      }
    };

    const handlePointerUp = () => {
      setIsDrawing(false);
    };

    const handleMouseLeave = () => {
      setIsActive(false);
      setIsDrawing(false);
    };

    const handleMouseEnter = () => {
      setIsActive(true);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.documentElement.classList.remove("custom-pencil-active");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY]);

  if (!isActive) {
    return null;
  }

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] select-none"
      style={{
        x: springX,
        y: springY,
      }}
      aria-hidden="true"
    >
      {/* 
        The SVG is positioned so the graphite lead tip is EXACTLY at (0, 0).
        The pencil body angles up and to the right at ~42 degrees.
      */}
      <div className="relative">
        <motion.svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
          animate={{
            rotate: isDrawing ? -14 : isHovering ? -6 : 0,
            scale: isDrawing ? 0.94 : isHovering ? 1.08 : 1,
          }}
          transition={{ duration: 0.12 }}
        >
          {/* Graphite contact pressure dot when drawing or hovering */}
          {(isDrawing || isHovering) && (
            <circle
              cx="0"
              cy="0"
              r={isDrawing ? 2 : 1.5}
              fill="#171717"
              opacity={isDrawing ? 0.85 : 0.6}
            />
          )}

          {/* Sharpened Graphite Lead Tip (exact point at 0, 0) */}
          <polygon
            points="0,0 2.5,-3 4,-1.5"
            fill="#171717"
            stroke="#171717"
            strokeWidth="0.5"
          />

          {/* Sharpened Wood Cone (hatching texture in pencil grey) */}
          <polygon
            points="2.5,-3 4,-1.5 9,-5 6.5,-7.5"
            fill="#F5F5F5"
            stroke="#777777"
            strokeWidth="0.5"
          />
          {/* Wood grain pencil hatching lines */}
          <line x1="3.2" y1="-2.3" x2="7.7" y2="-6.2" stroke="#777777" strokeWidth="0.4" />
          <line x1="4.5" y1="-3.5" x2="8.2" y2="-5.5" stroke="#D9D9D9" strokeWidth="0.4" />

          {/* Hexagonal Pencil Shaft (Graphite Black) */}
          {/* Lower facet */}
          <polygon
            points="6.5,-7.5 9,-5 22,-18 19.5,-20.5"
            fill="#242424"
            stroke="#171717"
            strokeWidth="0.5"
          />
          {/* Upper facet with subtle highlight */}
          <polygon
            points="9,-5 11.5,-2.5 24.5,-15.5 22,-18"
            fill="#3A3A3A"
            stroke="#171717"
            strokeWidth="0.5"
          />
          {/* Top highlight ridge */}
          <line x1="9" y1="-5" x2="22" y2="-18" stroke="#555555" strokeWidth="0.5" />

          {/* Metal Ferrule Ring */}
          <polygon
            points="19.5,-20.5 24.5,-15.5 26.5,-17.5 21.5,-22.5"
            fill="#D9D9D9"
            stroke="#777777"
            strokeWidth="0.5"
          />
          <line x1="20.5" y1="-21.5" x2="25.5" y2="-16.5" stroke="#777777" strokeWidth="0.4" />

          {/* Graphite Eraser at back */}
          <polygon
            points="21.5,-22.5 26.5,-17.5 28.5,-19.5 23.5,-24.5"
            fill="#171717"
            stroke="#171717"
            strokeWidth="0.5"
          />
        </motion.svg>
      </div>
    </motion.div>
  );
}
