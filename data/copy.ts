import { PrimaryConcern, ScalpFeel, AiScalpMatchResponse } from "@/lib/types";

/**
 * Fallback copy templates keyed by primary concern × scalp type.
 * Used when the AI call errors, times out, returns malformed JSON,
 * or trips the claim linter. The user must never see an error state.
 */

interface FallbackKey {
  concern: PrimaryConcern;
  scalpFeel: ScalpFeel;
}

function key(concern: PrimaryConcern, scalpFeel: ScalpFeel): string {
  return `${concern}__${scalpFeel}`;
}

const fallbacks: Record<string, AiScalpMatchResponse> = {
  // Hair fall
  [key("hair_fall", "oily")]: {
    profileLine: "Hair fall with an oily scalp — a common combination.",
    reading:
      "When the scalp produces excess oil, it can clog follicles and weaken the anchoring of hair strands. Addressing the buildup first often helps the scalp do its job better. Your routine targets both the oil and the fall.",
    whyThis: [
      "The serum supports the hair cycle with follicle-level actives.",
      "The shampoo keeps the scalp clean without stripping it.",
      "A weekly scrub clears the buildup that oil leaves behind.",
    ],
    routineNote:
      "Start with the scrub once a week, then shampoo. Use the serum on dry nights. Consistency matters more than quantity.",
    honestLimit:
      "This routine will not stop hair fall caused by hormonal changes, stress or nutritional gaps — those need a different conversation.",
  },
  [key("hair_fall", "dry")]: {
    profileLine: "Hair fall on a dry, tight scalp.",
    reading:
      "A dry scalp can mean a weakened barrier, which makes it harder for follicles to hold on. Your routine focuses on calming the scalp and supporting the hair cycle, without adding harsh actives.",
    whyThis: [
      "The serum targets the follicle to support growth-phase hair.",
      "The mask overnight calms and moisturises a stressed scalp.",
      "The shampoo cleanses gently without stripping natural oils.",
    ],
    routineNote:
      "Use the serum nightly on a dry scalp. The mask once a week, left on overnight. Shampoo on wash days only.",
    honestLimit:
      "If your hair fall is sudden or patchy, this routine alone is not enough — a dermatologist should look at it.",
  },
  [key("hair_fall", "normal")]: {
    profileLine: "Hair fall with a balanced scalp.",
    reading:
      "Your scalp seems comfortable, which is a good sign. The fall is likely driven by something upstream — stress, water quality or the hair cycle itself. Your routine focuses on the follicle.",
    whyThis: [
      "The serum delivers growth-phase actives directly to the scalp.",
      "The shampoo supports the barrier with niacinamide and prebiotics.",
      "The mask gives the scalp a weekly deep-conditioning reset.",
    ],
    routineNote:
      "Serum every night, shampoo on wash days, mask once a week. Keep it simple and stick with it.",
    honestLimit:
      "This routine supports the scalp environment. It will not override genetics or hormonal factors.",
  },
  [key("hair_fall", "combination")]: {
    profileLine: "Hair fall with oily roots and dry ends.",
    reading:
      "A combination scalp makes product choice tricky — too rich clogs the roots, too stripping dries the ends. This routine addresses the scalp without neglecting the lengths.",
    whyThis: [
      "The serum works on the follicle, not the strand — safe for combo scalps.",
      "The conditioner protects dry mid-lengths without weighing down roots.",
      "The shampoo balances cleansing without over-stripping.",
    ],
    routineNote:
      "Serum at the roots nightly. Conditioner mid-lengths to ends only. Shampoo on wash days, focusing on the scalp.",
    honestLimit:
      "This will not change your scalp's oil production pattern — that is hormonal. It works around it.",
  },
  [key("hair_fall", "sensitive")]: {
    profileLine: "Hair fall on a sensitive, easily irritated scalp.",
    reading:
      "A reactive scalp needs gentler handling. Your routine skips harsh exfoliants and focuses on calming the environment while supporting the hair cycle.",
    whyThis: [
      "The serum supports follicles with peptide actives, no irritants.",
      "The shampoo uses prebiotics to calm the scalp barrier.",
      "The mask soothes and conditions overnight.",
    ],
    routineNote:
      "Be gentle — no scrubbing, no hot water. Serum on dry nights, shampoo on wash days, mask once a week.",
    honestLimit:
      "If your scalp is actively inflamed or painful, see a dermatologist before adding any actives.",
  },

  // Flakes/dandruff
  [key("flakes_dandruff", "oily")]: {
    profileLine: "Flakes with an oily scalp — often a buildup issue.",
    reading:
      "Oily flaking is usually seborrheic rather than dry. It means excess oil traps dead skin, creating visible flakes. Your routine focuses on clearing the surface and rebalancing.",
    whyThis: [
      "The scrub dissolves buildup with salicylic acid — the first step.",
      "The shampoo maintains the cleaner surface between scrubs.",
      "A weekly routine keeps pores clear so oil flows normally.",
    ],
    routineNote:
      "Scrub once a week before shampooing. Shampoo every wash day. Let the scrub sit for a minute before rinsing.",
    honestLimit:
      "Persistent, recurring flakes despite consistent use may be fungal — a dermatologist can prescribe what this cannot.",
  },
  [key("flakes_dandruff", "dry")]: {
    profileLine: "Flakes on a dry scalp — likely dryness, not dandruff.",
    reading:
      "Dry-scalp flaking looks like dandruff but often responds to moisture, not medicated shampoo. Your routine hydrates and gently clears, without stripping.",
    whyThis: [
      "The mask delivers deep overnight moisture to a parched scalp.",
      "The shampoo cleanses without stripping what little oil you have.",
      "The conditioner smooths and protects dryness-prone lengths.",
    ],
    routineNote:
      "Mask overnight once a week. Shampoo gently on wash days. Conditioner on mid-lengths and ends every wash.",
    honestLimit:
      "This addresses dryness-based flaking. If it is truly seborrheic dermatitis, you will need medical treatment.",
  },
  [key("flakes_dandruff", "normal")]: {
    profileLine: "Mild flaking on a generally balanced scalp.",
    reading:
      "Your scalp is mostly comfortable, so the flaking is probably surface buildup rather than a chronic condition. A weekly clear-out should make a noticeable difference.",
    whyThis: [
      "The scrub clears dead skin and product buildup weekly.",
      "The shampoo supports barrier health day to day.",
      "The mask conditions once a week to keep the scalp calm.",
    ],
    routineNote:
      "Scrub before shampoo once a week. Shampoo on other wash days. Mask overnight when the scalp feels tight.",
    honestLimit:
      "This routine manages surface flaking. It is not anti-fungal treatment and will not address underlying dermatitis.",
  },
  [key("flakes_dandruff", "combination")]: {
    profileLine: "Flaking with oily roots and dry ends.",
    reading:
      "The flaking is likely concentrated where oil builds up — around the crown and hairline. Your routine targets the scalp without drying out already-parched ends.",
    whyThis: [
      "The scrub works on the oily zones where flakes form.",
      "The shampoo maintains balance across the scalp.",
      "The conditioner protects dry ends without adding oil to roots.",
    ],
    routineNote:
      "Apply scrub to oily areas only. Shampoo the scalp, condition the ends. Keep the two zones separate.",
    honestLimit:
      "Combination scalps are often hormonally driven. This routine manages symptoms, not the underlying oil pattern.",
  },
  [key("flakes_dandruff", "sensitive")]: {
    profileLine: "Flaking on a sensitive, reactive scalp.",
    reading:
      "When the scalp is sensitive, exfoliation needs to be gentle and infrequent. Your routine prioritises calming over clearing.",
    whyThis: [
      "The shampoo uses prebiotics to calm the barrier first.",
      "The mask soothes irritation overnight.",
      "The conditioner adds slip and protection to fragile strands.",
    ],
    routineNote:
      "Shampoo gently every wash day. Mask once a week, not more. Skip the scrub until the irritation settles.",
    honestLimit:
      "If there is redness, burning or pain alongside flaking, this is not enough. A dermatologist should assess it.",
  },

  // Oily scalp
  [key("oily_scalp", "oily")]: {
    profileLine: "An oily scalp that stays oily — your main concern.",
    reading:
      "Your scalp produces more sebum than average. The goal is not to dry it out — that often backfires — but to clear the excess regularly and keep pores healthy.",
    whyThis: [
      "The scrub deep-cleans pores once a week with salicylic acid.",
      "The shampoo manages daily oil without harsh sulfates.",
      "Together they keep the scalp clear without over-stripping.",
    ],
    routineNote:
      "Scrub once a week. Shampoo on every wash day. Resist the urge to wash more — it can trigger more oil.",
    honestLimit:
      "Sebum production is hormonal. This routine manages the surface, but it will not change how much oil your scalp produces.",
  },
  [key("oily_scalp", "normal")]: {
    profileLine: "An oily tendency on a generally balanced scalp.",
    reading:
      "Your scalp leans oily but is not uncomfortable. A light exfoliation routine keeps things clear without overcomplicating your wash days.",
    whyThis: [
      "The scrub prevents buildup from settling in.",
      "The shampoo keeps things balanced day to day.",
      "The serum supports the follicle environment where oil sits.",
    ],
    routineNote:
      "Weekly scrub before shampoo. Shampoo on wash days. Add the serum at night if thinning is a secondary concern.",
    honestLimit:
      "Oil levels fluctuate with hormones, diet and weather. This helps manage it — it does not control it.",
  },
  [key("oily_scalp", "combination")]: {
    profileLine: "Oily roots with dry, roughened ends.",
    reading:
      "Classic combination pattern — the scalp overproduces, and the ends are left dry, especially if your water is hard. The routine addresses both zones separately.",
    whyThis: [
      "The scrub targets the oily scalp zone specifically.",
      "The shampoo cleanses the roots without stripping further down.",
      "The conditioner goes on mid-lengths and ends only.",
    ],
    routineNote:
      "Scrub and shampoo on the scalp. Conditioner from mid-lengths down. Never condition the roots.",
    honestLimit:
      "This will not unify your scalp and strand oil levels. It manages the mismatch.",
  },
  [key("oily_scalp", "dry")]: {
    profileLine: "Your concern is oil, but your scalp reads dry.",
    reading:
      "Sometimes what feels oily is actually a dry scalp overcompensating. Your routine balances gentle cleansing with hydration.",
    whyThis: [
      "The shampoo cleanses without stripping the barrier.",
      "The mask adds moisture the scalp may be missing.",
      "The conditioner protects dry lengths from washing.",
    ],
    routineNote:
      "Shampoo gently. Mask once a week. Conditioner on ends. See if the oiliness settles once moisture is restored.",
    honestLimit:
      "If the oiliness persists despite hydration, it may be worth checking with a dermatologist.",
  },
  [key("oily_scalp", "sensitive")]: {
    profileLine: "An oily scalp that is also sensitive.",
    reading:
      "Sensitive and oily is a tricky combination — too much cleansing irritates, too little lets oil build up. Your routine walks that line carefully.",
    whyThis: [
      "The shampoo uses gentle surfactants with prebiotic support.",
      "The mask calms the scalp overnight once a week.",
      "The serum supports follicles without adding irritants.",
    ],
    routineNote:
      "Shampoo every wash day, gently. Mask once a week. No scrubbing until the sensitivity settles.",
    honestLimit:
      "An irritated, oily scalp that does not respond to gentle care may need a prescription. Do not just push through it.",
  },

  // Dry/itchy
  [key("dry_itchy", "dry")]: {
    profileLine: "A dry, tight scalp — your primary concern.",
    reading:
      "Dryness often means a weakened scalp barrier. The goal is to restore moisture and calm irritation, not to add more actives.",
    whyThis: [
      "The mask delivers overnight deep moisture with bhringraj and kalonji.",
      "The conditioner protects and smooths from mid-lengths down.",
      "The shampoo cleanses without stripping the little oil you have.",
    ],
    routineNote:
      "Mask overnight once a week. Conditioner every wash. Shampoo less often if you can — every 2–3 days.",
    honestLimit:
      "Chronic dryness can signal eczema, psoriasis or other conditions. If it persists, get it looked at.",
  },
  [key("dry_itchy", "normal")]: {
    profileLine: "Dryness and tightness, though your scalp is mostly balanced.",
    reading:
      "The dryness may be seasonal or water-related rather than chronic. Your routine adds targeted moisture without overloading a comfortable scalp.",
    whyThis: [
      "The mask gives a deep-moisture reset once a week.",
      "The conditioner adds daily protection on the lengths.",
      "The shampoo keeps the scalp barrier supported.",
    ],
    routineNote:
      "Mask once a week. Conditioner every wash, ends only. Shampoo gently — no hot water.",
    honestLimit:
      "If the dryness is coming from hard water, this helps manage it, but it does not fix the water.",
  },
  [key("dry_itchy", "oily")]: {
    profileLine: "Itchiness with an oily scalp — a confusing mix.",
    reading:
      "Oil and itch together can mean the scalp barrier is disrupted. The oil may be compensating for underlying dryness. Your routine focuses on calming and rebalancing.",
    whyThis: [
      "The mask calms irritation and adds moisture overnight.",
      "The shampoo cleanses gently with prebiotic barrier support.",
      "The conditioner protects the lengths without adding scalp oil.",
    ],
    routineNote:
      "Mask once a week overnight. Shampoo on wash days, lukewarm water. Conditioner ends only.",
    honestLimit:
      "If the itch is persistent and comes with redness, it may be seborrheic dermatitis. A dermatologist can tell you for sure.",
  },
  [key("dry_itchy", "combination")]: {
    profileLine: "Dry, tight scalp with oily roots.",
    reading:
      "Your scalp is dry overall but the roots stay oily — often a sign of barrier disruption. The routine hydrates without feeding the oiliness at the root.",
    whyThis: [
      "The mask delivers moisture where the scalp needs it most.",
      "The conditioner works on dry ends without touching the roots.",
      "The shampoo keeps roots clean without stripping further.",
    ],
    routineNote:
      "Mask away from the roots. Shampoo focused on the scalp. Conditioner mid-lengths to ends only.",
    honestLimit:
      "Combination dryness is often a barrier issue. This helps, but it takes time — and it may not fully resolve without understanding the cause.",
  },
  [key("dry_itchy", "sensitive")]: {
    profileLine: "Dry, itchy and sensitive — your scalp needs gentle handling.",
    reading:
      "When dryness meets sensitivity, less is more. Your routine strips back to the essentials: hydrate, protect, do not irritate.",
    whyThis: [
      "The mask soothes and moisturises overnight with gentle botanicals.",
      "The conditioner adds a protective layer to fragile strands.",
      "The shampoo is the mildest cleanser in the range.",
    ],
    routineNote:
      "Mask once a week. Conditioner every wash. Shampoo only when needed, never with hot water.",
    honestLimit:
      "A sensitive, dry, itchy scalp can be eczema or contact dermatitis. If this does not settle in 4 weeks, see a doctor.",
  },

  // Dull/damaged
  [key("dull_damaged", "normal")]: {
    profileLine: "Dull, damaged lengths on a healthy scalp.",
    reading:
      "Your scalp is fine — the issue is downstream. Damage from heat, colour or hard water has roughened the cuticle. Your routine focuses on repairing and protecting the strand.",
    whyThis: [
      "The conditioner smooths and seals the cuticle with rice water.",
      "The mask deeply conditions stressed strands overnight.",
      "The shampoo cleanses gently to avoid further stripping.",
    ],
    routineNote:
      "Conditioner every wash on ends. Mask once a week, lengths and ends. Shampoo scalp only.",
    honestLimit:
      "Once a strand is damaged, it cannot be repaired from within — only smoothed on the surface. These products coat and protect, they do not reconstruct.",
  },
  [key("dull_damaged", "dry")]: {
    profileLine: "Dull hair with a dry scalp — both need moisture.",
    reading:
      "Dryness at the scalp and damage on the lengths often go together, especially with hard water. Your routine hydrates both zones.",
    whyThis: [
      "The mask works on both the scalp and the strand overnight.",
      "The conditioner smooths roughened cuticles from hard water.",
      "The shampoo avoids stripping what little natural oil you have.",
    ],
    routineNote:
      "Mask from scalp to ends once a week. Conditioner every wash. Shampoo gently, no more than needed.",
    honestLimit:
      "This improves how hair looks and feels. It will not undo structural damage from bleaching or heat — that grows out.",
  },
  [key("dull_damaged", "oily")]: {
    profileLine: "Dull lengths with an oily scalp.",
    reading:
      "The oil at the roots is not reaching the ends — so the scalp is greasy while the lengths stay dry and dull. Your routine conditions the lengths while managing the roots.",
    whyThis: [
      "The conditioner targets mid-lengths and ends only.",
      "The mask gives a weekly deep treatment where dullness sits.",
      "The shampoo manages root oil without drying ends further.",
    ],
    routineNote:
      "Shampoo roots, condition ends. Mask on ends once a week. Keep the two zones separate.",
    honestLimit:
      "Shine from conditioner is surface-level. If the damage is from colour or heat, only growing it out will fully fix it.",
  },
  [key("dull_damaged", "combination")]: {
    profileLine: "Dull, damaged lengths with a combination scalp.",
    reading:
      "The mismatch between oily roots and dry, dull ends is common and frustrating. Your routine treats each zone differently.",
    whyThis: [
      "The conditioner goes where the damage is — mid-lengths to ends.",
      "The mask gives a weekly boost of moisture to the driest parts.",
      "The shampoo keeps the oily roots in check.",
    ],
    routineNote:
      "Shampoo at the scalp. Conditioner from mid-lengths down. Mask on ends, once a week, overnight.",
    honestLimit:
      "This manages the visible symptoms. Combination hair is structural — the routine works with it, not against it.",
  },
  [key("dull_damaged", "sensitive")]: {
    profileLine: "Dull hair on a sensitive scalp.",
    reading:
      "Your scalp needs careful handling, and your lengths need repair. The routine is gentle on the scalp and restorative on the strand.",
    whyThis: [
      "The conditioner smooths and protects damaged cuticles.",
      "The mask conditions gently overnight without irritating.",
      "The shampoo cleanses mildly — no harsh surfactants.",
    ],
    routineNote:
      "Conditioner every wash, ends only. Mask once a week. Shampoo when needed, cool water.",
    honestLimit:
      "Sensitive scalp plus damaged hair is uncomfortable. If the sensitivity worsens, stop all actives and see a dermatologist.",
  },
};

export function getFallbackCopy(
  concern: PrimaryConcern,
  scalpFeel: ScalpFeel
): AiScalpMatchResponse {
  const k = key(concern, scalpFeel);
  return (
    fallbacks[k] ??
    fallbacks[key(concern, "normal")] ?? {
      profileLine: "Your scalp, your routine.",
      reading:
        "Based on what you have told us, we have put together a routine that addresses your main concerns. It focuses on the scalp first — because that is where healthy hair starts.",
      whyThis: [
        "Each product targets a specific part of your concern.",
        "The routine is designed to work together, not in isolation.",
        "Consistency over 8–12 weeks is where the difference shows up.",
      ],
      routineNote:
        "Stick with it daily. The hair cycle takes time, and the routine works with it, not around it.",
      honestLimit:
        "This routine supports scalp health. It will not override medical conditions, hormonal factors or genetic predispositions.",
    }
  );
}
