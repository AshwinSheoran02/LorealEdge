import { WaterHardness } from "@/lib/types";

export interface CityWater {
  city: string;
  hardness: WaterHardness;
  label: string;
}

const cityHardnessMap: Record<string, WaterHardness> = {
  // Very hard
  Gurgaon: "very_hard",
  Gurugram: "very_hard",
  Jaipur: "very_hard",
  Ahmedabad: "very_hard",
  Faridabad: "very_hard",
  Noida: "very_hard",
  Ghaziabad: "very_hard",
  Jhajjar: "very_hard",

  // Hard
  Delhi: "hard",
  Chennai: "hard",
  Hyderabad: "hard",
  Lucknow: "hard",
  Kanpur: "hard",
  Indore: "hard",
  Coimbatore: "hard",
  Agra: "hard",

  Jamshedpur: "hard",

  // Moderate
  Bengaluru: "moderate",
  Bangalore: "moderate",
  Kolkata: "moderate",
  Pune: "moderate",
  Chandigarh: "moderate",
  Bhopal: "moderate",
  Nagpur: "moderate",
  Visakhapatnam: "moderate",
  Patna: "moderate",

  // Soft
  Mumbai: "soft",
  Thane: "soft",
  Kochi: "soft",
  Goa: "soft",
  Guwahati: "soft",
  Shillong: "soft",
  Dehradun: "soft",
};

export function getCityList(): string[] {
  return [...new Set(Object.keys(cityHardnessMap))].sort();
}

export function getWaterHardness(city: string): WaterHardness | null {
  return cityHardnessMap[city] ?? null;
}

export function getHardnessLabel(hardness: WaterHardness): string {
  const labels: Record<WaterHardness, string> = {
    soft: "Water in most of this area runs soft.",
    moderate: "Water here tends to be moderate.",
    hard: "Water in most of this area runs hard.",
    very_hard: "Water here is typically very hard.",
  };
  return labels[hardness];
}
