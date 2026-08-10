export interface Ingredient {
  name: string;
  family: "clinical" | "botanical";
  whatItDoes: string;
  whereItShowsUp: string;
  whatItWontDo: string;
}

export const ingredients: Ingredient[] = [
  {
    name: "Redensyl",
    family: "clinical",
    whatItDoes:
      "A peptide complex that targets hair follicle stem cells to support the anagen (growth) phase of the hair cycle. Studies show improvement in hair density over 90 days.",
    whereItShowsUp: "Scalp Serum",
    whatItWontDo:
      "It is not a treatment for androgenetic alopecia or pattern baldness. It will not regrow hair in areas where follicles have closed.",
  },
  {
    name: "Anagain",
    family: "clinical",
    whatItDoes:
      "Derived from organic pea sprouts, it signals dermal papilla cells to help shift more follicles from the resting phase into growth. Works alongside Redensyl to extend the growth window.",
    whereItShowsUp: "Scalp Serum",
    whatItWontDo:
      "It will not stop hair fall caused by hormonal, thyroid or nutritional issues. Those need a doctor.",
  },
  {
    name: "Niacinamide",
    family: "clinical",
    whatItDoes:
      "Vitamin B3 — strengthens the scalp barrier, helps regulate sebum and calms surface inflammation. A staple in skincare, applied here to the scalp.",
    whereItShowsUp: "Shampoo",
    whatItWontDo:
      "It will not clear severe dandruff or fungal conditions on its own. For persistent flaking, see a dermatologist.",
  },
  {
    name: "Salicylic Acid",
    family: "clinical",
    whatItDoes:
      "A beta-hydroxy acid that dissolves dead skin and product buildup on the scalp surface. Keeps pores clear so actives in other steps can absorb better.",
    whereItShowsUp: "Scalp Scrub",
    whatItWontDo:
      "It is an exfoliant, not a treatment. It will not reduce hair fall on its own, and it should be avoided on broken or irritated skin and during pregnancy.",
  },
  {
    name: "Prebiotics",
    family: "clinical",
    whatItDoes:
      "Feed the beneficial bacteria on your scalp to support a balanced microbiome. A healthy microbiome is linked to less irritation and fewer flakes.",
    whereItShowsUp: "Shampoo",
    whatItWontDo:
      "Prebiotics support the environment, not the hair itself. They will not add volume, shine or strength to the strand.",
  },
  {
    name: "Bhringraj",
    family: "botanical",
    whatItDoes:
      "An Ayurvedic herb traditionally used for scalp health. Provides a cooling, calming sensation and is rich in compounds that help condition a dry, stressed scalp.",
    whereItShowsUp: "Scalp Mask",
    whatItWontDo:
      "Traditional use is not the same as clinical proof. Bhringraj will not reverse hair loss or replace medical treatment for thinning hair.",
  },
  {
    name: "Cold-pressed Kalonji",
    family: "botanical",
    whatItDoes:
      "Black seed oil, cold-pressed to keep its fatty acids intact. It moisturises a dry scalp and has mild antimicrobial properties that may help with flakes.",
    whereItShowsUp: "Scalp Mask",
    whatItWontDo:
      "The evidence for hair growth from Kalonji oil is mostly anecdotal. Do not expect it to reduce shedding — it is here to condition the scalp, not treat hair fall.",
  },
  {
    name: "Rice Water",
    family: "botanical",
    whatItDoes:
      "Fermented rice water has been used for centuries in East and South Asian hair care. It coats the strand, smooths the cuticle and adds slip — especially useful after hard-water exposure.",
    whereItShowsUp: "Conditioner",
    whatItWontDo:
      "It works on the strand surface, not the follicle. It will not prevent hair fall or strengthen hair from within. The shine it adds is cosmetic, not structural.",
  },
];
