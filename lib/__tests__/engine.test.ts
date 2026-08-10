import { describe, it, expect } from "vitest";
import { runEngine } from "@/lib/engine";
import { lintClaims, lintAllFields } from "@/lib/claims";
import type { Answers } from "@/lib/types";

function makeAnswers(overrides: Partial<Answers> = {}): Answers {
  return {
    city: "Mumbai",
    waterHardness: "moderate",
    primaryConcern: "hair_fall",
    secondaryConcerns: [],
    scalpFeel: "normal",
    washFrequency: "every_2_3",
    lifestyle: ["none"],
    stressLevel: "both_fine",
    safetyFlags: ["none"],
    ...overrides,
  };
}

describe("runEngine", () => {
  it("hair fall + hard water → serum is top, conditioner is boosted into top 3", () => {
    const result = runEngine(
      makeAnswers({
        primaryConcern: "hair_fall",
        waterHardness: "hard",
      })
    );

    const ids = result.products.map((p) => p.id);
    expect(ids[0]).toBe("serum");
    expect(ids).toContain("conditioner");
  });

  it("dandruff + oily → scrub is top", () => {
    const result = runEngine(
      makeAnswers({
        primaryConcern: "flakes_dandruff",
        scalpFeel: "oily",
      })
    );

    expect(result.products[0].id).toBe("scrub");
  });

  it("dry + sensitive → scrub not in top 3", () => {
    const result = runEngine(
      makeAnswers({
        primaryConcern: "dry_itchy",
        scalpFeel: "sensitive",
      })
    );

    const ids = result.products.map((p) => p.id);
    expect(ids).not.toContain("scrub");
  });

  it("kit rule: hair_fall, no secondary, normal scalp, moderate water, daily wash → kit recommended", () => {
    const result = runEngine(
      makeAnswers({
        primaryConcern: "hair_fall",
        secondaryConcerns: [],
        scalpFeel: "normal",
        waterHardness: "moderate",
        washFrequency: "daily",
        lifestyle: ["pollution", "helmet"],
      })
    );

    const ids = new Set(result.products.map((p) => p.id));
    expect(ids).toContain("serum");
    expect(ids).toContain("scrub");
    expect(ids).toContain("shampoo");
    expect(result.kit.recommended).toBe(true);
  });

  it("pregnancy override: scrub removed from top 3 when pregnant_breastfeeding", () => {
    const result = runEngine(
      makeAnswers({
        primaryConcern: "flakes_dandruff",
        scalpFeel: "oily",
        safetyFlags: ["pregnant_breastfeeding"],
      })
    );

    const ids = result.products.map((p) => p.id);
    expect(ids).not.toContain("scrub");
    expect(result.flags.pregnancyOverride).toBe(true);
    expect(result.products).toHaveLength(3);
  });
});

describe("lintClaims", () => {
  it("rejects 'This product cures hair loss'", () => {
    const result = lintClaims("This product cures hair loss");
    expect(result.passed).toBe(false);
    expect(result.matches.length).toBeGreaterThan(0);
  });

  it("allows 'This helps manage shedding'", () => {
    const result = lintClaims("This helps manage shedding");
    expect(result.passed).toBe(true);
    expect(result.matches).toHaveLength(0);
  });
});

describe("lintAllFields", () => {
  it("catches banned terms in nested objects", () => {
    const result = lintAllFields({
      title: "Our serum",
      details: {
        tagline: "Guaranteed regrowth overnight results",
        bullets: ["Safe formula", "Clinically proven miracle"],
      },
    });

    expect(result.passed).toBe(false);
    expect(result.matches.length).toBeGreaterThanOrEqual(3);
  });

  it("passes clean nested objects", () => {
    const result = lintAllFields({
      title: "Scalp Serum",
      details: {
        tagline: "Helps manage shedding over time",
        bullets: ["Gentle on the scalp", "Suitable for daily use"],
      },
    });

    expect(result.passed).toBe(true);
  });
});
