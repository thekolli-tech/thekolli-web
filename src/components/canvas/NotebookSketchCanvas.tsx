"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Point {
  x: number;
  y: number;
  time: number;
}

interface Stroke {
  points: Point[];
  color: string;
  width: number;
}

/**
 * Authentic Notebook Pencil Sketching Canvas
 * - Fixed-viewport canvas with zero layout footprint: CANNOT cause any trailing scroll or extra page height.
 * - Stores absolute document coordinates so drawings stay anchored to paper as the user scrolls.
 * - Real graphite pencil physics: variable speed-pressure thickness, soft multi-layer graphite grain,
 *   and smooth quadratic bezier interpolation.
 * - Non-intrusive: preserves regular clicking on links, buttons, and inputs.
 * - Supports Undo (Ctrl+Z) and clear sketch action.
 */
export function NotebookSketchCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const strokesRef = useRef<Stroke[]>([]);
  const currentStrokeRef = useRef<Stroke | null>(null);
  const isPointerDownRef = useRef(false);
  const startTargetRef = useRef<HTMLElement | null>(null);
  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const isActivelyDrawingRef = useRef(false);
  const rafScrollRef = useRef<number | null>(null);

  const [hasStrokes, setHasStrokes] = useState(false);
  const [strokeCount, setStrokeCount] = useState(0);

  // Render a graphite pencil segment with authentic pencil texture
  const renderPencilSegment = (
    ctx: CanvasRenderingContext2D,
    p0: Point,
    p1: Point,
    p2: Point
  ) => {
    const mid1 = { x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2 };
    const mid2 = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };

    const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
    const dt = Math.max(1, p2.time - p1.time);
    const speed = dist / dt;

    // Graphite pressure dynamics: slower strokes deposit thicker, darker graphite
    const baseWidth = Math.max(1.3, Math.min(2.7, 2.3 - speed * 0.45));
    const opacity = Math.max(0.48, Math.min(0.85, 0.78 - speed * 0.1));

    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // 1. Core Graphite Line (Dark 2B/4B Graphite Core)
    ctx.beginPath();
    ctx.moveTo(mid1.x, mid1.y);
    ctx.quadraticCurveTo(p1.x, p1.y, mid2.x, mid2.y);
    ctx.strokeStyle = `rgba(28, 28, 28, ${opacity})`;
    ctx.lineWidth = baseWidth * 0.85;
    ctx.stroke();

    // 2. Soft Powder Halo (Graphite Smudge Border)
    ctx.beginPath();
    ctx.moveTo(mid1.x, mid1.y);
    ctx.quadraticCurveTo(p1.x, p1.y, mid2.x, mid2.y);
    ctx.strokeStyle = `rgba(45, 45, 45, ${opacity * 0.35})`;
    ctx.lineWidth = baseWidth * 1.7;
    ctx.stroke();

    // 3. Fine Graphite Grain Flecks (catching on paper tooth)
    if (dist > 3) {
      const steps = Math.floor(dist / 3);
      for (let i = 0; i < steps; i++) {
        const t = i / steps;
        const qx = (1 - t) * (1 - t) * mid1.x + 2 * (1 - t) * t * p1.x + t * t * mid2.x;
        const qy = (1 - t) * (1 - t) * mid1.y + 2 * (1 - t) * t * p1.y + t * t * mid2.y;

        const offsetX = (Math.random() - 0.5) * baseWidth * 1.2;
        const offsetY = (Math.random() - 0.5) * baseWidth * 1.2;
        const grainSize = Math.random() * 0.9 + 0.4;
        const grainAlpha = (Math.random() * 0.4 + 0.2) * opacity;

        ctx.fillStyle = `rgba(32, 32, 32, ${grainAlpha})`;
        ctx.fillRect(qx + offsetX, qy + offsetY, grainSize, grainSize);
      }
    }

    ctx.restore();
  };

  // Redraw all accumulated strokes anchored to document coordinates
  const redrawAllStrokes = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.scale(dpr, dpr);
    // Translate by current scroll position so drawings stay anchored to content
    ctx.translate(-window.scrollX, -window.scrollY);

    for (const stroke of strokesRef.current) {
      const pts = stroke.points;
      if (pts.length < 2) continue;

      if (pts.length === 2) {
        ctx.save();
        ctx.fillStyle = "rgba(28, 28, 28, 0.75)";
        ctx.beginPath();
        ctx.arc(pts[0].x, pts[0].y, 1.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        continue;
      }

      for (let i = 1; i < pts.length - 1; i++) {
        renderPencilSegment(ctx, pts[i - 1], pts[i], pts[i + 1]);
      }
    }

    ctx.restore();
  }, []);

  // Resize canvas to strictly match viewport (100vw x 100vh) - zero page overflow
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    redrawAllStrokes();
  }, [redrawAllStrokes]);

  // Clear all notebook drawings
  const handleClear = useCallback(() => {
    strokesRef.current = [];
    currentStrokeRef.current = null;
    setHasStrokes(false);
    setStrokeCount(0);

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  // Undo last stroke
  const handleUndo = useCallback(() => {
    if (strokesRef.current.length === 0) return;
    strokesRef.current.pop();
    setHasStrokes(strokesRef.current.length > 0);
    setStrokeCount(strokesRef.current.length);
    redrawAllStrokes();
  }, [redrawAllStrokes]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Scroll listener translates viewport canvas smoothly
    const handleScroll = () => {
      if (!rafScrollRef.current) {
        rafScrollRef.current = requestAnimationFrame(() => {
          redrawAllStrokes();
          rafScrollRef.current = null;
        });
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Pointer events on window
    const handlePointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return; // Only primary button

      const target = e.target as HTMLElement | null;
      startTargetRef.current = target;
      isPointerDownRef.current = true;
      isActivelyDrawingRef.current = false;

      const pageX = e.pageX;
      const pageY = e.pageY;
      startPosRef.current = { x: pageX, y: pageY };

      // Check if clicked element is an interactive control (button, link, input)
      const isInteractive = !!target?.closest(
        "a, button, input, textarea, select, [role='button'], [data-no-draw]"
      );

      // If NOT on an interactive button/link, start drawing immediately
      if (!isInteractive) {
        isActivelyDrawingRef.current = true;
        const newPoint: Point = { x: pageX, y: pageY, time: performance.now() };
        currentStrokeRef.current = {
          points: [newPoint],
          color: "#242424",
          width: 2,
        };
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isPointerDownRef.current) return;

      const pageX = e.pageX;
      const pageY = e.pageY;
      const now = performance.now();

      // If user was on an interactive control, only begin drawing if dragged past 4px threshold
      if (!isActivelyDrawingRef.current && startPosRef.current) {
        const dragDist = Math.hypot(
          pageX - startPosRef.current.x,
          pageY - startPosRef.current.y
        );

        if (dragDist > 4) {
          isActivelyDrawingRef.current = true;
          const startPt: Point = {
            x: startPosRef.current.x,
            y: startPosRef.current.y,
            time: now - 16,
          };
          currentStrokeRef.current = {
            points: [startPt],
            color: "#242424",
            width: 2,
          };
        }
      }

      if (isActivelyDrawingRef.current && currentStrokeRef.current) {
        if (e.cancelable) {
          e.preventDefault();
        }
        const pts = currentStrokeRef.current.points;
        const newPoint: Point = { x: pageX, y: pageY, time: now };
        pts.push(newPoint);

        const canvas = canvasRef.current;
        if (canvas && pts.length >= 3) {
          const ctx = canvas.getContext("2d");
          if (ctx) {
            const dpr = window.devicePixelRatio || 1;
            ctx.save();
            ctx.scale(dpr, dpr);
            ctx.translate(-window.scrollX, -window.scrollY);
            const len = pts.length;
            renderPencilSegment(ctx, pts[len - 3], pts[len - 2], pts[len - 1]);
            ctx.restore();
          }
        }
      }
    };

    const handlePointerUp = () => {
      if (!isPointerDownRef.current) return;

      if (isActivelyDrawingRef.current && currentStrokeRef.current) {
        const stroke = currentStrokeRef.current;
        if (stroke.points.length >= 2) {
          strokesRef.current.push(stroke);
          setHasStrokes(true);
          setStrokeCount(strokesRef.current.length);
        }
      }

      isPointerDownRef.current = false;
      isActivelyDrawingRef.current = false;
      currentStrokeRef.current = null;
      startTargetRef.current = null;
      startPosRef.current = null;
    };

    // Keyboard shortcuts: Ctrl+Z / Cmd+Z for undo, Escape for clear
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z" && !e.shiftKey) {
        const activeEl = document.activeElement;
        const isTyping =
          activeEl?.tagName === "INPUT" || activeEl?.tagName === "TEXTAREA";
        if (!isTyping && strokesRef.current.length > 0) {
          e.preventDefault();
          handleUndo();
        }
      } else if (e.key === "Escape" && strokesRef.current.length > 0) {
        handleClear();
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", handleScroll);
      if (rafScrollRef.current) {
        cancelAnimationFrame(rafScrollRef.current);
      }
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [resizeCanvas, redrawAllStrokes, handleUndo, handleClear]);

  return (
    <>
      {/* 
        Fixed-viewport drawing canvas:
        - Exactly matches window.innerWidth x window.innerHeight
        - Zero layout footprint, completely eliminating trailing scroll or page overflow
      */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-30 select-none"
      />

      {/* Discrete Notebook Controls (Appears only when user has sketched on the paper) */}
      <AnimatePresence>
        {hasStrokes && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-[#242424] bg-[#FFFFFF]/95 px-3 py-1.5 shadow-[0_4px_16px_rgba(23,23,23,0.12)] backdrop-blur-md"
            data-no-draw="true"
          >
            <div className="flex items-center gap-1.5 pl-1 pr-2 border-r border-[#D9D9D9] font-hand-draft text-xs text-[#242424]">
              {/* Wooden pencil icon */}
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 stroke-[#242424]" fill="none">
                <path d="M11 2L14 5L5 14H2V11L11 2Z" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{strokeCount} sketch{strokeCount === 1 ? "" : "es"}</span>
            </div>

            {/* Undo Action */}
            <button
              onClick={handleUndo}
              title="Undo last stroke (Ctrl+Z)"
              className="rounded-full px-2 py-0.5 font-hand-heading text-sm font-semibold text-[#242424] hover:bg-[#F5F5F5] transition-colors"
            >
              Undo
            </button>

            {/* Clear All Action */}
            <button
              onClick={handleClear}
              title="Erase all sketches from notebook (Esc)"
              className="flex items-center gap-1 rounded-full bg-[#242424] px-2.5 py-0.5 font-hand-heading text-sm font-semibold text-[#FFFFFF] hover:bg-[#171717] transition-colors"
            >
              <span>Erase</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
