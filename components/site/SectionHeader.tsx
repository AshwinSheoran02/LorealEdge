export interface SectionHeaderProps {
  eyebrow: string | string[];
  headline: string;
  variant?: "dark" | "light";
  headlineSize?: "lg" | "sm";
}

export function SectionHeader({
  eyebrow,
  headline,
  variant = "dark",
  headlineSize = "lg",
}: SectionHeaderProps) {
  const eyebrowParts = Array.isArray(eyebrow) ? eyebrow : [eyebrow];
  const eyebrowColor = variant === "dark" ? "text-sage-pale" : "text-stone";
  const headlineColor = variant === "dark" ? "text-cream" : "text-forest";

  return (
    <header className="flex flex-col gap-4">
      <p className={`text-eyebrow ${eyebrowColor}`}>
        {eyebrowParts.map((part, i) => (
          <span key={i}>
            {i > 0 && <span className="mx-2 opacity-50">&middot;</span>}
            {part}
          </span>
        ))}
      </p>
      <h2
        className={`${headlineSize === "lg" ? "text-display-lg" : "text-display-sm"} ${headlineColor}`}
      >
        {headline}
      </h2>
    </header>
  );
}
