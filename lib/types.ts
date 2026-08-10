export type SkuId = "serum" | "scrub" | "shampoo" | "conditioner" | "mask";

export type WaterHardness = "soft" | "moderate" | "hard" | "very_hard";

export type ScalpFeel = "oily" | "dry" | "normal" | "combination" | "sensitive";

export type PrimaryConcern =
  | "hair_fall"
  | "flakes_dandruff"
  | "oily_scalp"
  | "dry_itchy"
  | "dull_damaged";

export type WashFrequency = "daily" | "every_2_3" | "weekly" | "less_than_weekly";

export type LifestyleFactor =
  | "pollution"
  | "heat_styling"
  | "chemical"
  | "gym_sweat"
  | "helmet"
  | "none";

export type StressLevel = "both_fine" | "one_off" | "both_mess";

export type SafetyFlag =
  | "patchy_loss"
  | "sores_pain"
  | "widening_part"
  | "recent_illness"
  | "thyroid_pcos"
  | "pregnant_breastfeeding"
  | "none";

export interface Answers {
  city: string;
  waterHardness: WaterHardness;
  primaryConcern: PrimaryConcern;
  secondaryConcerns: PrimaryConcern[];
  scalpFeel: ScalpFeel;
  washFrequency: WashFrequency;
  lifestyle: LifestyleFactor[];
  stressLevel: StressLevel;
  safetyFlags: SafetyFlag[];
}

export interface ProductRecommendation {
  id: SkuId;
  name: string;
  price: number;
  frequency: string;
  amount: string;
  note?: string;
}

export interface EngineResult {
  products: ProductRecommendation[];
  kit: {
    recommended: boolean;
    price: number;
    saving: number;
  };
  routine: {
    washDays: string[];
    nightly: string[];
    weekly: string[];
  };
  flags: {
    dermReferral: boolean;
    dermReferralReasons: string[];
    pregnancyOverride: boolean;
    sensitiveOverride: boolean;
    thyroidNote: boolean;
  };
  timelineNote: string;
}

export interface AiScalpMatchResponse {
  profileLine: string;
  reading: string;
  whyThis: [string, string, string];
  routineNote: string;
  honestLimit: string;
}

export interface AiInvestigatesResponse {
  verdict: "Holds up" | "Partly true" | "Not proven" | "Myth";
  short: string;
  detail: string;
  forYou: string;
}
