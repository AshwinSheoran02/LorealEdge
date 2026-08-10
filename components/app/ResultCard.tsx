"use client";

import { useState } from "react";
import Link from "next/link";
import type { Answers, EngineResult, AiScalpMatchResponse } from "@/lib/types";
import { SafetyBanner } from "./SafetyBanner";
import { RoutineTimeline } from "./RoutineTimeline";
import { getHardnessLabel } from "@/data/water";
import { products, kit } from "@/data/products";

interface ResultCardProps {
  answers: Answers;
  engineResult: EngineResult;
  aiResponse: AiScalpMatchResponse;
}

const concernLabels: Record<string, string> = {
  hair_fall: "Hair fall",
  flakes_dandruff: "Flakes / dandruff",
  oily_scalp: "Oily scalp",
  dry_itchy: "Dry / itchy scalp",
  dull_damaged: "Dull / damaged",
};

const lifestyleLabels: Record<string, string> = {
  pollution: "Pollution",
  heat_styling: "Heat styling",
  chemical: "Chemical treatment",
  gym_sweat: "Gym sweat",
  helmet: "Helmet",
  none: "No major stressors",
};

export function ResultCard({
  answers,
  engineResult,
  aiResponse,
}: ResultCardProps) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [saved, setSaved] = useState(false);

  const topLifestyle = answers.lifestyle.find((l) => l !== "none") ?? "none";
  const hardnessNote = getHardnessLabel(answers.waterHardness);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && consent) {
      setSaved(true);
    }
  };

  return (
    <div className="min-h-dvh bg-cream text-forest">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-cream border-b border-forest/10">
        <div className="flex items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="font-display text-lg tracking-[0.3em] uppercase font-medium text-forest"
          >
            ROOTED
          </Link>
          <Link
            href="/"
            className="w-10 h-10 flex items-center justify-center text-stone hover:text-forest transition-colors"
            aria-label="Close and return home"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <line x1="4" y1="4" x2="16" y2="16" />
              <line x1="16" y1="4" x2="4" y2="16" />
            </svg>
          </Link>
        </div>
      </header>

      <div className="content-width py-12 space-y-16">
        {/* 1. Scalp Profile */}
        <section>
          <p className="text-eyebrow text-stone mb-4">YOUR SCALP PROFILE</p>
          <h1 className="text-display-lg text-forest mb-6">
            {aiResponse.profileLine}
          </h1>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center px-3 py-1.5 bg-cream-warm rounded-sm text-sm text-forest">
              {answers.city} · {hardnessNote.split(" ").slice(-1)[0].replace(".", "")} water
            </span>
            <span className="inline-flex items-center px-3 py-1.5 bg-cream-warm rounded-sm text-sm text-forest">
              {concernLabels[answers.primaryConcern]}
            </span>
            <span className="inline-flex items-center px-3 py-1.5 bg-cream-warm rounded-sm text-sm text-forest">
              {lifestyleLabels[topLifestyle]}
            </span>
          </div>
        </section>

        {/* 2. Safety Banner */}
        {(engineResult.flags.dermReferral ||
          engineResult.flags.thyroidNote ||
          engineResult.flags.pregnancyOverride) && (
          <SafetyBanner
            reasons={engineResult.flags.dermReferralReasons}
            thyroidNote={engineResult.flags.thyroidNote}
            pregnancyNote={engineResult.flags.pregnancyOverride}
          />
        )}

        {/* 3. The Reading */}
        <section className="bg-cream-warm rounded-md p-6 md:p-8">
          <p className="text-eyebrow text-stone mb-3">THE READING</p>
          <p className="text-body-lg text-forest">{aiResponse.reading}</p>
        </section>

        {/* 4. Your Routine */}
        <section>
          <p className="text-eyebrow text-stone mb-4">YOUR ROUTINE</p>
          <RoutineTimeline routine={engineResult.routine} />
        </section>

        {/* 5. Products and Why */}
        <section>
          <p className="text-eyebrow text-stone mb-6">
            WHAT WE&apos;VE PICKED, AND WHY
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {engineResult.products.map((rec, i) => {
              const product = products[rec.id];
              return (
                <div
                  key={rec.id}
                  className="bg-cream-warm rounded-md p-6 shadow-card"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-body font-semibold text-forest">
                      {product.name}
                    </h3>
                    <span className="text-price text-lg">
                      ₹{product.price}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {product.keyActives.map((a) => (
                      <span
                        key={a}
                        className="text-xs px-2 py-0.5 bg-sage/10 text-sage rounded-sm"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-stone">
                    {aiResponse.whyThis[i]}
                  </p>
                  <p className="text-caption text-stone/70 mt-3">
                    {rec.frequency} · {rec.amount}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Kit card */}
          {engineResult.kit.recommended && (
            <div className="mt-6 bg-forest text-cream rounded-md p-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-body font-semibold">{kit.name}</h3>
                  <p className="text-caption text-cream/70 mt-1">
                    {kit.includes
                      .map((id) => products[id].name)
                      .join(" + ")}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-price text-xl">₹{kit.price}</span>
                  <p className="text-caption text-cream/50 line-through">
                    ₹{kit.separatePrice}
                  </p>
                </div>
              </div>
              <p className="text-sm text-cream/80">
                Save ₹{kit.saving} with the starter kit.
              </p>
            </div>
          )}

          {!engineResult.kit.recommended && (
            <div className="mt-6 border border-forest/12 rounded-md p-5">
              <p className="text-sm text-stone">
                The {kit.name} (Serum + Scrub + Shampoo) is also available at
                ₹{kit.price}{" "}
                <span className="text-caption text-stone/60 line-through">
                  ₹{kit.separatePrice}
                </span>
              </p>
            </div>
          )}
        </section>

        {/* 6. Honest Limit */}
        <section className="bg-forest text-cream rounded-md p-8 md:p-12">
          <p className="text-eyebrow text-sage-pale mb-4">
            WHAT THIS WON&apos;T DO
          </p>
          <p className="font-display text-xl md:text-2xl italic text-cream leading-snug">
            {aiResponse.honestLimit}
          </p>
        </section>

        {/* 7. Timeline */}
        <section className="text-center py-4">
          <p className="text-body-lg text-stone max-w-xl mx-auto">
            {engineResult.timelineNote}
          </p>
        </section>

        {/* 8. Save Routine */}
        <section className="max-w-md mx-auto">
          <p className="text-eyebrow text-stone mb-4 text-center">
            SAVE YOUR ROUTINE
          </p>
          {saved ? (
            <div className="text-center py-6">
              <p className="text-body text-sage font-medium">
                Saved. We&apos;ll send your routine to {email}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm text-stone mb-1.5"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 bg-cream-warm border border-sage-pale rounded-sm text-forest placeholder:text-stone/40 focus:border-sage focus:outline-none transition-colors"
                />
              </div>
              <label className="flex items-start gap-3 cursor-pointer">
                {/* Consent unchecked by default — no dark patterns */}
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded-sm border-sage-pale text-sage focus:ring-sage"
                />
                <span className="text-sm text-stone">
                  Email me this routine and a reminder in 4 weeks.
                </span>
              </label>
              <p className="text-caption text-stone/60">
                We&apos;ll only use this to send your routine. Nothing else.
              </p>
              {/*
                Production note: handling scalp/health inputs with email capture
                requires consent, purpose limitation, and deletion provisions
                under India's Digital Personal Data Protection Act 2023.
              */}
              <button
                type="submit"
                disabled={!email || !consent}
                className={`
                  w-full py-3 rounded-sm font-body text-sm font-medium transition-all
                  ${
                    email && consent
                      ? "bg-sage text-cream hover:bg-sage-light"
                      : "bg-sage-pale text-cream/60 cursor-not-allowed"
                  }
                `}
              >
                Save my routine
              </button>
            </form>
          )}
        </section>

        {/* 9. Start Again */}
        <div className="text-center pb-8">
          <Link
            href="/scalp-match"
            onClick={() => {
              if (typeof window !== "undefined") {
                sessionStorage.removeItem("rooted-quiz");
              }
            }}
            className="text-sage hover:underline text-sm"
          >
            Start again
          </Link>
        </div>
      </div>
    </div>
  );
}
