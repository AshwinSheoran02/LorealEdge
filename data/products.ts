import { SkuId } from "@/lib/types";

export interface Product {
  id: SkuId;
  name: string;
  price: number;
  keyActives: string[];
  concern: string;
  use: string;
  frequency: string;
  amount: string;
  notFor?: string;
}

export const products: Record<SkuId, Product> = {
  serum: {
    id: "serum",
    name: "Scalp Serum",
    price: 799,
    keyActives: ["Redensyl", "Anagain"],
    concern: "Hair fall, thinning",
    use: "Nightly, on a dry scalp, parted in sections",
    frequency: "Every night",
    amount: "6–8 drops",
  },
  scrub: {
    id: "scrub",
    name: "Scalp Scrub",
    price: 649,
    keyActives: ["Salicylic Acid"],
    concern: "Buildup, flakes, oily scalp",
    use: "Weekly, before shampoo",
    frequency: "Once a week",
    amount: "A coin-sized amount",
    notFor: "Sensitive or broken scalp, pregnancy",
  },
  shampoo: {
    id: "shampoo",
    name: "Shampoo",
    price: 499,
    keyActives: ["Niacinamide", "Prebiotics"],
    concern: "Everyday cleansing, barrier support",
    use: "Every wash",
    frequency: "Every wash day",
    amount: "One pump",
  },
  conditioner: {
    id: "conditioner",
    name: "Conditioner",
    price: 499,
    keyActives: ["Rice Water"],
    concern: "Dryness, hard-water roughness",
    use: "Mid-lengths and ends only",
    frequency: "Every wash day",
    amount: "One pump, mid-lengths to ends",
  },
  mask: {
    id: "mask",
    name: "Scalp Mask",
    price: 649,
    keyActives: ["Bhringraj", "Cold-pressed Kalonji"],
    concern: "Dry, stressed scalp",
    use: "Once a week, overnight",
    frequency: "Once a week",
    amount: "Two fingertip scoops",
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
