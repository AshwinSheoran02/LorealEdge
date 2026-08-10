const BANNED_TERMS = [
  /\bcures?\b/i,
  /\btreats?\b/i,
  /\bguaranteed?\b/i,
  /\bpermanent\b/i,
  /\bregrows?\b/i,
  /\bregrowth\b/i,
  /\breverses?\b/i,
  /\bclinically\s+proven\b/i,
  /\bmiracle\b/i,
  /\b100%\b/,
  /\bovernight\s+results?\b/i,
];

export interface ClaimLintResult {
  passed: boolean;
  matches: string[];
}

export function lintClaims(text: string): ClaimLintResult {
  const matches: string[] = [];

  for (const pattern of BANNED_TERMS) {
    const match = text.match(pattern);
    if (match) {
      matches.push(match[0]);
    }
  }

  return {
    passed: matches.length === 0,
    matches,
  };
}

export function lintAllFields(obj: Record<string, unknown>): ClaimLintResult {
  const allText = extractStrings(obj).join(" ");
  return lintClaims(allText);
}

function extractStrings(obj: unknown): string[] {
  if (typeof obj === "string") return [obj];
  if (Array.isArray(obj)) return obj.flatMap(extractStrings);
  if (obj && typeof obj === "object") {
    return Object.values(obj).flatMap(extractStrings);
  }
  return [];
}
