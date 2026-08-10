export interface QuizOption {
  id: string;
  label: string;
}

export interface QuizQuestion {
  id: string;
  number: number;
  question: string;
  subCopy?: string;
  type: "city_select" | "single" | "multi" | "multi_optional" | "safety";
  options?: QuizOption[];
  dynamicOptions?: boolean;
}

export const questions: QuizQuestion[] = [
  {
    id: "city",
    number: 1,
    question: "Where do you wash your hair?",
    type: "city_select",
  },
  {
    id: "primary_concern",
    number: 2,
    question: "What's bothering you most right now?",
    type: "single",
    options: [
      { id: "hair_fall", label: "Hair fall / thinning" },
      { id: "flakes_dandruff", label: "Flakes or dandruff" },
      { id: "oily_scalp", label: "Oily scalp" },
      { id: "dry_itchy", label: "Dry, itchy or tight scalp" },
      { id: "dull_damaged", label: "Dull, damaged lengths" },
    ],
  },
  {
    id: "secondary_concerns",
    number: 3,
    question: "Anything else going on?",
    type: "multi_optional",
    dynamicOptions: true,
  },
  {
    id: "scalp_feel",
    number: 4,
    question: "How does your scalp feel two days after washing?",
    type: "single",
    options: [
      { id: "oily", label: "Oily at the roots" },
      { id: "dry", label: "Dry or flaky" },
      { id: "normal", label: "Comfortable" },
      { id: "combination", label: "Oily roots but dry ends" },
      { id: "sensitive", label: "Itchy or easily irritated" },
    ],
  },
  {
    id: "wash_frequency",
    number: 5,
    question: "How often do you wash?",
    type: "single",
    options: [
      { id: "daily", label: "Every day" },
      { id: "every_2_3", label: "Every 2–3 days" },
      { id: "weekly", label: "Once a week" },
      { id: "less_than_weekly", label: "Less than once a week" },
    ],
  },
  {
    id: "lifestyle",
    number: 6,
    question: "What does your hair go through?",
    type: "multi",
    options: [
      { id: "pollution", label: "Pollution / city commute" },
      { id: "heat_styling", label: "Heat styling" },
      { id: "chemical", label: "Colour or chemical treatment" },
      { id: "gym_sweat", label: "Gym sweat" },
      { id: "helmet", label: "Helmet most days" },
      { id: "none", label: "None of these" },
    ],
  },
  {
    id: "stress",
    number: 7,
    question: "Honestly, how are stress and sleep?",
    type: "single",
    options: [
      { id: "both_fine", label: "Both fine" },
      { id: "one_off", label: "One of them is off" },
      { id: "both_mess", label: "Both are a mess" },
    ],
  },
  {
    id: "safety",
    number: 8,
    question: "Anything we should know?",
    subCopy:
      "We ask because some causes of hair fall are medical, and a shampoo isn't the answer to those.",
    type: "safety",
    options: [
      { id: "patchy_loss", label: "Sudden patchy hair loss" },
      { id: "sores_pain", label: "Sores, pain or bleeding on the scalp" },
      { id: "widening_part", label: "My parting is visibly widening" },
      { id: "recent_illness", label: "Recent illness, surgery or childbirth" },
      { id: "thyroid_pcos", label: "Diagnosed thyroid issue or PCOS" },
      { id: "pregnant_breastfeeding", label: "I'm pregnant or breastfeeding" },
      { id: "none", label: "None of these" },
    ],
  },
];
