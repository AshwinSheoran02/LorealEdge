"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The root line: a single continuous hairline SVG path that runs down the
 * left gutter of the marketing site from the hero to the footer. 1px,
 * sage at 40% opacity. At each section boundary it branches once — a short
 * offshoot reaching toward the section's eyebrow label.
 *
 * Drawn on scroll via stroke-dasharray/stroke-dashoffset.
 * Mobile (<768px): collapses to a 2px progress rail pinned to the left edge.
 * prefers-reduced-motion: renders full path statically, no draw animation.
 */

export function RootLine() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pageHeight, setPageHeight] = useState(0);
  const [prefersReduced, setPrefersReduced] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const updateScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setPageHeight(document.documentElement.scrollHeight);
      if (docH > 0) {
        setScrollProgress(window.scrollY / docH);
      }
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);
    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, []);

  // Mobile: simple progress rail
  if (isMobile) {
    return (
      <div
        className="fixed left-0 top-0 w-0.5 h-full z-40 bg-sage/10 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="w-full bg-sage/40 transition-[height] duration-100"
          style={{ height: `${scrollProgress * 100}%` }}
        />
      </div>
    );
  }

  // Section boundaries as proportional positions (approximate)
  const branches = [0.15, 0.3, 0.45, 0.6, 0.75, 0.9];
  const gutterX = 40;
  const branchLength = 30;
  const svgHeight = Math.max(pageHeight, 2000);

  // Build the main path + branches
  let d = `M ${gutterX} 0 L ${gutterX} ${svgHeight}`;
  const branchPaths = branches.map((pct) => {
    const y = pct * svgHeight;
    return `M ${gutterX} ${y} L ${gutterX + branchLength} ${y - 15}`;
  });

  const totalLength = svgHeight + branches.length * Math.sqrt(branchLength * branchLength + 15 * 15);

  return (
    <svg
      ref={svgRef}
      className="fixed left-0 top-0 w-20 pointer-events-none z-40"
      style={{ height: "100vh" }}
      viewBox={`0 0 80 ${svgHeight}`}
      preserveAspectRatio="xMinYMin slice"
      aria-hidden="true"
    >
      {/* Main stem */}
      <path
        ref={pathRef}
        d={d}
        fill="none"
        stroke="var(--color-sage)"
        strokeWidth="1"
        strokeOpacity="0.4"
        strokeDasharray={prefersReduced ? "none" : totalLength}
        strokeDashoffset={prefersReduced ? 0 : totalLength * (1 - scrollProgress)}
      />
      {/* Branch offshoots */}
      {branchPaths.map((bd, i) => {
        const branchProgress = Math.max(0, (scrollProgress - branches[i] + 0.05) / 0.05);
        const branchLen = Math.sqrt(branchLength * branchLength + 15 * 15);
        return (
          <path
            key={i}
            d={bd}
            fill="none"
            stroke="var(--color-sage)"
            strokeWidth="1"
            strokeOpacity="0.4"
            strokeDasharray={prefersReduced ? "none" : branchLen}
            strokeDashoffset={
              prefersReduced
                ? 0
                : branchLen * (1 - Math.min(1, branchProgress))
            }
          />
        );
      })}
    </svg>
  );
}
