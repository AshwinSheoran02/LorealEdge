"use client";

import { useState, useEffect } from "react";

const STATUS_LINES = [
  "Reading your city's water…",
  "Matching symptoms to actives…",
  "Writing your routine…",
];

export function LoadingState() {
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLineIndex((i) => (i + 1) % STATUS_LINES.length);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-dvh bg-cream flex items-center justify-center">
      <div className="text-center px-6">
        {/* Animated root line */}
        <div className="w-px h-24 bg-sage/40 mx-auto mb-8 relative overflow-hidden">
          <div className="absolute inset-x-0 h-12 bg-sage animate-pulse" />
        </div>
        <p className="text-body text-stone animate-pulse">
          {STATUS_LINES[lineIndex]}
        </p>
      </div>
    </div>
  );
}
