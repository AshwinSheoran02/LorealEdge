import { products } from "@/data/products";
import {
  SkuId,
  Answers,
  EngineResult,
  PrimaryConcern,
  ProductRecommendation,
} from "@/lib/types";

/**
 * The deterministic engine is the source of truth for product recommendations.
 * The AI only explains picks — it never chooses them.
 */

const ALL_SKUS: SkuId[] = ["serum", "scrub", "shampoo", "conditioner", "mask"];

const TIMELINE_NOTE =
  "Shedding takes 8–12 weeks to visibly change, because that's how long the hair cycle takes. Not because the product is slow.";

const DERM_REFERRAL_FLAGS = [
  "patchy_loss",
  "sores_pain",
  "widening_part",
  "recent_illness",
] as const;

const BASE_WEIGHTS: Record<PrimaryConcern, Record<SkuId, number>> = {
  hair_fall: { serum: 40, scrub: 0, shampoo: 15, conditioner: 0, mask: 10 },
  flakes_dandruff: { serum: 0, scrub: 40, shampoo: 25, conditioner: 0, mask: 5 },
  oily_scalp: { serum: 0, scrub: 35, shampoo: 30, conditioner: 0, mask: 0 },
  dry_itchy: { serum: 0, scrub: 0, shampoo: 15, conditioner: 20, mask: 35 },
  dull_damaged: { serum: 0, scrub: 0, shampoo: 0, conditioner: 35, mask: 25 },
};

export function runEngine(answers: Answers): EngineResult {
  const scores: Record<SkuId, number> = {
    serum: 0,
    scrub: 0,
    shampoo: 0,
    conditioner: 0,
    mask: 0,
  };

  // Q2: Primary concern — full weight
  const primary = BASE_WEIGHTS[answers.primaryConcern];
  for (const sku of ALL_SKUS) {
    scores[sku] += primary[sku];
  }

  // Q3: Secondary concerns — 40% weight
  for (const concern of answers.secondaryConcerns) {
    const row = BASE_WEIGHTS[concern];
    for (const sku of ALL_SKUS) {
      scores[sku] += row[sku] * 0.4;
    }
  }

  // Q1: Water hardness
  if (answers.waterHardness === "hard") {
    scores.conditioner += 15;
    scores.scrub += 10;
  } else if (answers.waterHardness === "very_hard") {
    scores.conditioner += 20;
    scores.scrub += 15;
    scores.shampoo += 5;
  }

  // Q4: Scalp feel
  switch (answers.scalpFeel) {
    case "oily":
      scores.scrub += 15;
      scores.shampoo += 10;
      break;
    case "dry":
      scores.mask += 15;
      scores.conditioner += 10;
      scores.scrub -= 15;
      break;
    case "combination":
      scores.conditioner += 10;
      scores.scrub += 5;
      break;
    case "sensitive":
      scores.scrub -= 20;
      scores.shampoo += 10;
      scores.mask += 5;
      break;
    case "normal":
      break;
  }

  // Q5: Wash frequency
  if (answers.washFrequency === "daily") {
    scores.shampoo += 10;
    scores.conditioner += 10;
  } else if (
    answers.washFrequency === "weekly" ||
    answers.washFrequency === "less_than_weekly"
  ) {
    scores.scrub += 10;
    scores.mask += 10;
  }

  // Q6: Lifestyle
  for (const factor of answers.lifestyle) {
    switch (factor) {
      case "pollution":
        scores.scrub += 10;
        scores.shampoo += 5;
        break;
      case "heat_styling":
        scores.conditioner += 15;
        scores.mask += 10;
        break;
      case "chemical":
        scores.conditioner += 15;
        scores.mask += 15;
        scores.scrub -= 10;
        break;
      case "gym_sweat":
        scores.shampoo += 10;
        scores.scrub += 5;
        break;
      case "helmet":
        scores.scrub += 10;
        scores.shampoo += 5;
        break;
      case "none":
        break;
    }
  }

  // Q7: Stress/sleep
  if (answers.stressLevel === "one_off") {
    scores.serum += 8;
    scores.mask += 5;
  } else if (answers.stressLevel === "both_mess") {
    scores.serum += 15;
    scores.mask += 10;
  }

  // Sort and take top 3
  const sorted = ALL_SKUS.slice().sort((a, b) => scores[b] - scores[a]);
  let topThree = sorted.slice(0, 3);

  // Safety flags
  const dermReferralReasons: string[] = [];
  const selectedDermFlags = answers.safetyFlags.filter((f) =>
    (DERM_REFERRAL_FLAGS as readonly string[]).includes(f)
  );
  const dermReferral = selectedDermFlags.length > 0;

  if (answers.safetyFlags.includes("patchy_loss"))
    dermReferralReasons.push("patchy hair loss");
  if (answers.safetyFlags.includes("sores_pain"))
    dermReferralReasons.push("scalp pain or sores");
  if (answers.safetyFlags.includes("widening_part"))
    dermReferralReasons.push("widening part");
  if (answers.safetyFlags.includes("recent_illness"))
    dermReferralReasons.push("recent illness or surgery");

  const pregnancyOverride = answers.safetyFlags.includes(
    "pregnant_breastfeeding"
  );
  const thyroidNote = answers.safetyFlags.includes("thyroid_pcos");
  const sensitiveOverride = answers.scalpFeel === "sensitive";

  // Hard override: pregnancy removes scrub
  if (pregnancyOverride && topThree.includes("scrub")) {
    topThree = topThree.filter((s) => s !== "scrub");
    const next = sorted.find((s) => !topThree.includes(s) && s !== "scrub");
    if (next) topThree.push(next);
  }

  // Kit rule: if top 3 = {serum, scrub, shampoo} in any order
  const topSet = new Set(topThree);
  const kitRecommended =
    topSet.has("serum") && topSet.has("scrub") && topSet.has("shampoo");

  // Build routine
  const routine = buildRoutine(topThree, sensitiveOverride);

  // Build product recommendations
  const recs: ProductRecommendation[] = topThree.map((id) => {
    const p = products[id];
    const rec: ProductRecommendation = {
      id,
      name: p.name,
      price: p.price,
      frequency: p.frequency,
      amount: p.amount,
    };

    if (
      pregnancyOverride &&
      id !== "scrub" &&
      sorted.indexOf("scrub") < sorted.indexOf(id)
    ) {
      // This is the substituted product
    }

    return rec;
  });

  return {
    products: recs,
    kit: {
      recommended: kitRecommended,
      price: 899,
      saving: 548,
    },
    routine,
    flags: {
      dermReferral,
      dermReferralReasons,
      pregnancyOverride,
      sensitiveOverride,
      thyroidNote,
    },
    timelineNote: TIMELINE_NOTE,
  };
}

function buildRoutine(
  topThree: SkuId[],
  sensitiveOverride: boolean
): EngineResult["routine"] {
  const washDays: string[] = [];
  const nightly: string[] = [];
  const weekly: string[] = [];

  if (topThree.includes("shampoo")) {
    washDays.push("Shampoo — one pump, lather on the scalp, rinse.");
  }
  if (topThree.includes("conditioner")) {
    washDays.push(
      "Conditioner — one pump, mid-lengths and ends only. Leave for a minute, rinse."
    );
  }

  if (topThree.includes("serum")) {
    nightly.push(
      "Scalp Serum — 6–8 drops on a dry scalp, parted in sections. Massage in gently."
    );
  }

  if (topThree.includes("scrub")) {
    const freq = sensitiveOverride ? "every 10 days" : "once a week";
    weekly.push(
      `Scalp Scrub — a coin-sized amount, ${freq}, before shampoo. Massage in circular motions, rinse thoroughly.`
    );
  }
  if (topThree.includes("mask")) {
    weekly.push(
      "Scalp Mask — two fingertip scoops, once a week, overnight. Wash out in the morning."
    );
  }

  return { washDays, nightly, weekly };
}
