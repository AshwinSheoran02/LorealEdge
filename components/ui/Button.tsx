import { type ButtonHTMLAttributes, forwardRef } from "react";

const variantStyles = {
  primary:
    "bg-sage text-cream hover:bg-sage-light active:bg-sage-light",
  secondary:
    "border border-sage text-sage hover:bg-sage/10 active:bg-sage/15",
  text: "text-sage hover:underline underline-offset-4",
  pill: "bg-sage text-cream rounded-full px-5 py-2 hover:bg-sage-light active:bg-sage-light",
} as const;

const sizeStyles = {
  sm: "text-sm px-3 py-1.5",
  md: "text-body px-5 py-2.5",
  lg: "text-body-lg px-7 py-3.5",
} as const;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...rest }, ref) => {
    const needsPadding = variant !== "pill" && variant !== "text";
    return (
      <button
        ref={ref}
        className={[
          "inline-flex items-center justify-center font-medium transition-colors duration-200",
          "outline-2 outline-sage outline-offset-2",
          "rounded-sm",
          variantStyles[variant],
          needsPadding ? sizeStyles[size] : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button };
