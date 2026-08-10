"use client";

import Link from "next/link";
import { Progress } from "@/components/ui/Progress";

interface QuizShellProps {
  step: number;
  totalSteps: number;
  children: React.ReactNode;
}

export function QuizShell({ step, totalSteps, children }: QuizShellProps) {
  const progress = Math.round((step / totalSteps) * 100);

  return (
    <div className="min-h-dvh bg-cream text-forest flex flex-col">
      <header className="sticky top-0 z-50 bg-cream">
        <div className="flex items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="font-display text-lg tracking-[0.3em] uppercase font-medium text-forest"
          >
            ROOTED
          </Link>
          <Link
            href="/"
            className="w-10 h-10 flex items-center justify-center text-stone hover:text-forest transition-colors"
            aria-label="Close and return home"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <line x1="4" y1="4" x2="16" y2="16" />
              <line x1="16" y1="4" x2="4" y2="16" />
            </svg>
          </Link>
        </div>
        <Progress value={progress} className="px-0" />
        <div className="px-6 pt-3 pb-1">
          <span className="text-eyebrow text-stone">
            {String(step).padStart(2, "0")} / {String(totalSteps).padStart(2, "0")}
          </span>
        </div>
      </header>
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
}
