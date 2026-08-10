"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { RootLine } from "@/components/site/RootLine";

const sectionReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  },
};

interface Article {
  question: string;
  body: string;
}

const articles: Article[] = [
  {
    question: "Does rosemary oil actually work?",
    body: `The claim: rosemary oil is as effective as minoxidil for hair growth. This comes from a single 2015 study comparing rosemary oil to 2% minoxidil over six months in 100 participants with androgenetic alopecia. Both groups saw improvement, but the study had no placebo arm and relied on photo counts.

What's actually established: rosemary oil has anti-inflammatory properties and may improve scalp circulation. The study is real but limited — small sample, no placebo, one research group. No follow-up trials of the same rigour have confirmed the finding. Dermatologists generally consider the evidence preliminary.

What that means for you: rosemary oil is unlikely to cause harm when diluted, and some people find it soothing. But treating it as a proven alternative to clinically studied ingredients is a stretch the evidence does not support.

What we'd honestly say: use it if you enjoy it. Do not rely on it as your main approach to hair fall. The evidence is thin, and thin evidence is not the same as proof.`,
  },
  {
    question: "Can hard water cause hair fall?",
    body: `The claim: hard water causes hair fall. This shows up constantly in Indian cities where water hardness runs well above 200 ppm — Gurgaon, Jaipur, Ahmedabad and much of Delhi.

What's actually established: hard water contains calcium and magnesium salts that deposit on the hair shaft, making it feel rough, dry and more prone to tangling and breakage. A 2016 study in the International Journal of Trichology found hard water did not affect hair tensile strength, but did increase surface roughness. Breakage from handling rough, tangled hair can look and feel like hair fall.

What that means for you: hard water is unlikely to cause follicular hair loss (the kind where hair stops growing from the root), but it does cause cosmetic damage that leads to breakage. If you live in a hard-water area, a chelating or clarifying step — like a weekly scrub — and a good conditioner can reduce the mineral buildup on the strand.

What we'd honestly say: hard water makes hair look and feel worse, and breakage from it is real. But it is not the same as true hair fall. If your hair is thinning at the root, hard water alone is probably not the cause.`,
  },
  {
    question: "Why is my scalp oily but my hair dry?",
    body: `The claim: if your scalp is oily, your hair should be oily too. This assumption drives people to use harsh clarifying products from root to tip, which often makes the dryness worse.

What's actually established: the scalp and the hair shaft are different structures. The scalp is skin — it produces sebum from sebaceous glands. Hair is a dead protein strand — it cannot produce anything. Sebum travels down the strand slowly and may never reach the ends, especially on longer, coarser or curly hair. Hard water, heat styling and chemical treatments roughen the cuticle, making the mid-lengths and ends feel dry even when the scalp is producing plenty of oil.

What that means for you: an oily scalp and dry ends is one of the most common hair patterns in India. The mistake is treating both zones the same way. Shampoo belongs on the scalp. Conditioner belongs on the ends. Applying conditioner to the roots adds oil where you don't need it; shampooing the ends strips them further.

What we'd honestly say: this is not a defect — it is how hair works. Treat the two zones separately and the problem mostly manages itself. If the oiliness is extreme or sudden, it may be hormonal, and that is worth checking.`,
  },
];

const SUGGESTION_CHIPS = [
  "Does rosemary oil actually work?",
  "Can hard water cause hair fall?",
  "Why is my scalp oily but my hair dry?",
];

type Verdict = "Holds up" | "Partly true" | "Not proven" | "Myth";

interface AskResult {
  verdict: Verdict;
  short: string;
  detail: string;
  forYou: string;
}

const verdictColors: Record<Verdict, string> = {
  "Holds up": "bg-sage text-cream",
  "Partly true": "bg-sage-pale text-forest",
  "Not proven": "bg-terracotta text-cream",
  Myth: "bg-terracotta text-cream",
};

export default function JournalPage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [askInput, setAskInput] = useState("");
  const [askResult, setAskResult] = useState<AskResult | null>(null);
  const [askLoading, setAskLoading] = useState(false);
  const [askCount, setAskCount] = useState(0);

  const handleAsk = async (question?: string) => {
    const q = question ?? askInput;
    if (!q.trim() || askCount >= 5) return;

    setAskLoading(true);
    setAskResult(null);
    setAskCount((c) => c + 1);

    try {
      const res = await fetch("/api/investigates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setAskResult(data);
    } catch {
      setAskResult({
        verdict: "Not proven",
        short: "We could not check this one right now.",
        detail:
          "Something went wrong when trying to look this up. Try again in a moment, or try a different question.",
        forYou: "If it sounds too good to be true, it usually is.",
      });
    } finally {
      setAskLoading(false);
    }
  };

  return (
    <>
      <Nav variant="site" />
      <RootLine />

      <section className="bg-forest section-gap pt-32">
        <div className="content-width">
          <p className="text-eyebrow text-sage-pale mb-6">INVESTIGATES</p>
          <h1 className="text-display-xl text-cream mb-4">
            The claims. The evidence.
          </h1>
          <p className="text-body-lg text-cream/80 max-w-2xl">
            Hair care is full of promises. We read the research so you don&apos;t
            have to.
          </p>
        </div>
      </section>

      {/* Article Cards */}
      <motion.section
        className="bg-cream text-forest section-gap"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionReveal}
      >
        <div className="content-width">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {articles.map((article, i) => (
              <div key={i} className="bg-cream-warm rounded-md shadow-card overflow-hidden">
                <button
                  type="button"
                  onClick={() =>
                    setExpandedIndex(expandedIndex === i ? null : i)
                  }
                  className="w-full text-left p-6"
                  aria-expanded={expandedIndex === i}
                >
                  <h3 className="text-display-sm text-forest">
                    {article.question}
                  </h3>
                  <p className="text-sm text-sage mt-3">
                    {expandedIndex === i ? "Close" : "Read the answer →"}
                  </p>
                </button>
                {expandedIndex === i && (
                  <div className="px-6 pb-6">
                    <div className="border-t border-forest/10 pt-4">
                      {article.body.split("\n\n").map((para, j) => (
                        <p key={j} className="text-body text-stone mb-4">
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Ask Rooted */}
          <div className="max-w-2xl mx-auto">
            <p className="text-eyebrow text-stone mb-4 text-center">
              ASK ROOTED
            </p>
            <h2 className="text-display-sm text-forest text-center mb-6">
              Ask about any hair claim you&apos;ve seen online.
            </h2>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={askInput}
                onChange={(e) => setAskInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAsk()}
                placeholder="e.g. Does biotin actually prevent hair fall?"
                disabled={askCount >= 5}
                className="flex-1 px-4 py-3 bg-cream-warm border border-sage-pale rounded-sm text-forest placeholder:text-stone/40 focus:border-sage focus:outline-none transition-colors disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => handleAsk()}
                disabled={askLoading || askCount >= 5 || !askInput.trim()}
                className="px-6 py-3 bg-sage text-cream rounded-sm text-sm font-medium hover:bg-sage-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {askLoading ? "…" : "Ask"}
              </button>
            </div>

            {/* Suggestion chips */}
            <div className="flex flex-wrap gap-2 mb-6">
              {SUGGESTION_CHIPS.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => {
                    setAskInput(chip);
                    handleAsk(chip);
                  }}
                  disabled={askCount >= 5}
                  className="px-3 py-1.5 bg-cream-warm text-stone text-sm rounded-sm hover:bg-sage-pale/30 transition-colors disabled:opacity-50"
                >
                  {chip}
                </button>
              ))}
            </div>

            {askCount >= 5 && (
              <p className="text-caption text-stone text-center">
                You&apos;ve reached the session limit of 5 questions. Refresh to
                ask more.
              </p>
            )}

            {/* Result */}
            {askResult && (
              <div className="bg-cream-warm rounded-md p-6 shadow-card">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${verdictColors[askResult.verdict]}`}
                >
                  {askResult.verdict}
                </span>
                <p className="font-display text-lg font-medium text-forest mb-3">
                  {askResult.short}
                </p>
                <p className="text-body text-stone mb-4">{askResult.detail}</p>
                <p className="text-body text-forest font-medium">
                  {askResult.forYou}
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.section>

      <Footer />
    </>
  );
}
