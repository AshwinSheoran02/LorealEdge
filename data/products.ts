import { SkuId } from "@/lib/types";

export interface CompetitorBenchmark {
  name: string;
  price: string;
}

export interface Product {
  id: SkuId;
  name: string;
  price: number;
  priceRange: string;
  keyActives: string[];
  concern: string;
  use: string;
  frequency: string;
  amount: string;
  notFor?: string;
  benchmarks: CompetitorBenchmark[];
  marketContext: string;
}

export const products: Record<SkuId, Product> = {
  serum: {
    id: "serum",
    name: "Scalp Serum",
    price: 799,
    priceRange: "₹749–₹849",
    keyActives: ["Redensyl", "Anagain"],
    concern: "Hair fall, thinning",
    use: "Nightly, on a dry scalp, parted in sections",
    frequency: "Every night",
    amount: "6–8 drops",
    benchmarks: [
      { name: "Minimalist 18% Hair Growth Actives Serum", price: "₹799" },
      { name: "Bare Anatomy Advanced Hair Growth Serum", price: "₹849" },
      { name: "Pilgrim Redensyl & Anagain Serum", price: "₹995" },
    ],
    marketContext:
      "Serums command the highest premium due to the concentration of clinical actives. Pricing at ~₹799 places ROOTED securely in the clinical tier without breaking the Gen Z budget limit.",
  },
  scrub: {
    id: "scrub",
    name: "Scalp Scrub",
    price: 649,
    priceRange: "₹599–₹699",
    keyActives: ["Salicylic Acid"],
    concern: "Buildup, flakes, oily scalp",
    use: "Weekly, before shampoo",
    frequency: "Once a week",
    amount: "A coin-sized amount",
    notFor: "Sensitive or broken scalp, pregnancy",
    benchmarks: [
      { name: "Bare Anatomy Cleansing Scalp Scrub (250g)", price: "₹649" },
      { name: "ThriveCo AHA/BHA Exfoliating Scalp Scrub (100ml)", price: "₹799" },
    ],
    marketContext:
      "Scalp scrubs are emerging as a specialized weekly treatment category. A ₹649 price point positions ROOTED as an accessible but highly specialized weekly detox step.",
  },
  shampoo: {
    id: "shampoo",
    name: "Shampoo",
    price: 499,
    priceRange: "₹499–₹549",
    keyActives: ["Niacinamide", "Prebiotics"],
    concern: "Everyday cleansing, barrier support",
    use: "Every wash",
    frequency: "Every wash day",
    amount: "One pump",
    benchmarks: [
      { name: "Bare Anatomy Salicylic Acid Shampoo", price: "₹484" },
      { name: "Bare Anatomy Anti-Frizz Shampoo", price: "₹529" },
    ],
    marketContext:
      "Shampoos are high-frequency replenishment items. Keeping the price around ₹499 ensures it competes effectively for the daily/weekly wash cycle while maintaining a premium gap over mass-market brands.",
  },
  conditioner: {
    id: "conditioner",
    name: "Conditioner",
    price: 499,
    priceRange: "₹499–₹549",
    keyActives: ["Rice Water"],
    concern: "Dryness, hard-water roughness",
    use: "Mid-lengths and ends only",
    frequency: "Every wash day",
    amount: "One pump, mid-lengths to ends",
    benchmarks: [
      { name: "Bare Anatomy Shampoo + Conditioner Combo", price: "₹484–₹529 each" },
    ],
    marketContext:
      "Conditioners are typically priced identically to their paired shampoos to encourage bundle purchases.",
  },
  mask: {
    id: "mask",
    name: "Scalp Mask",
    price: 649,
    priceRange: "₹599–₹699",
    keyActives: ["Bhringraj", "Cold-pressed Kalonji"],
    concern: "Dry, stressed scalp",
    use: "Once a week, overnight",
    frequency: "Once a week",
    amount: "Two fingertip scoops",
    benchmarks: [
      { name: "Bare Anatomy Ultra Smoothing Hair Mask (250gm)", price: "₹745" },
    ],
    marketContext:
      "Hair and scalp masks are viewed as intensive treatments. A ₹599–₹699 price point offers a competitive edge while retaining the premium perception of an overnight repair product.",
  },
};

export const kit = {
  id: "kit" as const,
  name: "Scalp Reset Kit",
  price: 1499,
  includes: ["serum", "scrub", "shampoo"] as SkuId[],
  get separatePrice() {
    return products.serum.price + products.scrub.price + products.shampoo.price;
  },
  get saving() {
    return this.separatePrice - this.price;
  },
};
