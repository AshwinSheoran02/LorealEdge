"use client";

import { type ButtonHTMLAttributes } from "react";

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

export function Chip({
  selected = false,
  className = "",
  children,
  ...rest
}: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={[
        "rounded-sm px-3 py-1.5 text-sm font-medium transition-colors duration-150 cursor-pointer",
        selected
          ? "bg-sage-light text-cream"
          : "bg-cream-warm text-forest hover:bg-sage-pale/40",
        className,
      ].join(" ")}
      {...rest}
    >
      {children}
    </button>
  );
}
