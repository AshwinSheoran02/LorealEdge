import { type HTMLAttributes } from "react";

const variantStyles = {
  cream: "bg-cream-warm text-forest",
  forest: "bg-forest text-cream",
  product: "bg-cream-warm text-forest shadow-card rounded-md",
} as const;

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof variantStyles;
}

export function Card({
  variant = "cream",
  className = "",
  children,
  ...rest
}: CardProps) {
  return (
    <div
      className={`${variantStyles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
