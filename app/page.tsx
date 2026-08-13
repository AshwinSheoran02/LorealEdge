"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { products, kit } from "@/data/products";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { RootLine } from "@/components/site/RootLine";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const sectionReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const productOrder = ["serum", "scrub", "shampoo", "conditioner", "mask"] as const;

const competitors = [
  {
    name: "Kama / Forest Essentials",
    desc: "premium Ayurveda, ₹2k–₹4k",
    variant: "light" as const,
  },
  {
    name: "Root Botanié",
    desc: "scalp microbiome, indie scale",
    variant: "light" as const,
  },
  {
    name: "Mass anti-dandruff",
    desc: '"scalp" in name only',
    variant: "light" as const,
  },
  {
    name: "ROOTED",
    desc: "science + Gen Z price + reach",
    variant: "dark" as const,
  },
];

function MiniQuiz() {
  const options = [
    { id: "hair_fall", label: "Hair fall / thinning" },
    { id: "flakes_dandruff", label: "Flakes or dandruff" },
    { id: "oily_scalp", label: "Oily scalp" },
    { id: "dry_itchy", label: "Dry, itchy or tight scalp" },
    { id: "dull_damaged", label: "Dull, damaged lengths" },
  ];

  return (
    <div className="bg-cream rounded-lg p-5 space-y-3">
      <p className="text-eyebrow text-stone mb-3">01 / 08</p>
      <p className="font-display text-lg font-medium text-forest mb-4">
        What&apos;s bothering you most right now?
      </p>
      {options.map((opt) => (
        <Link
          key={opt.id}
          href={`/scalp-match?prefill=${opt.id}`}
          className="block w-full text-left px-4 py-3 rounded-sm bg-cream-warm text-forest text-sm hover:bg-sage-pale/30 transition-colors"
        >
          {opt.label}
        </Link>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Nav variant="site" />
      <RootLine />

      {/* Section 1 — Hero */}
      <section className="min-h-dvh flex items-center justify-center bg-forest relative">
        <motion.div
          className="text-center content-width"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-eyebrow text-sage-pale mb-6"
          >
            L&apos;ORÉAL INDIA · GEN Z HAIR CARE
          </motion.p>
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-display-xl text-cream tracking-[0.12em] mb-6"
          >
            ROOTED
          </motion.h1>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-display-sm text-cream/80 mb-10"
          >
            Care that starts at the scalp.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
          >
            <Link
              href="/scalp-match"
              className="px-8 py-3.5 bg-sage text-cream rounded-sm font-body text-base font-medium hover:bg-sage-light transition-colors"
            >
              Find your Scalp Match
            </Link>
            <Link
              href="/range"
              className="text-cream/70 hover:text-cream text-sm font-body transition-colors"
            >
              See the range →
            </Link>
          </motion.div>

          {/* YouTube Shorts embed */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center"
          >
            <div className="w-48 sm:w-56 rounded-[20px] overflow-hidden shadow-2xl">
              <iframe
                src="https://www.youtube.com/embed/oqiV1TDr3sM"
                title="ROOTED — L'Oréal India advertisement"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full aspect-[9/16] border-0"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Section 2 — The Problem */}
      <motion.section
        className="bg-forest section-gap"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionReveal}
      >
        <div className="content-width">
          <p className="text-eyebrow text-sage-pale mb-6">THE PROBLEM</p>
          <h2 className="text-display-lg text-cream mb-6 max-w-4xl">
            At 22, she isn&apos;t worried about wrinkles. She&apos;s counting
            the hairs on her pillow.
          </h2>
          <p className="text-body-lg text-cream/80 mb-10 max-w-3xl">
            For India&apos;s Gen Z, hair fall isn&apos;t vanity — it&apos;s
            anxiety they can see. In a generation that lives on camera, a
            receding hairline at 22 attacks the one thing they care about most:
            how they show up online.
          </p>
          <div className="flex flex-wrap gap-3 mb-12">
            {["Hard water", "Pollution", "Stress", "No sleep"].map((cause) => (
              <span
                key={cause}
                className="px-4 py-2 bg-forest-soft text-cream-warm rounded-sm text-sm"
              >
                {cause}
              </span>
            ))}
          </div>
          <p className="text-display-sm text-cream">
            <span className="text-terracotta">35–40%</span> of India is Gen Z —
            the fastest-growing beauty segment.
          </p>
        </div>
      </motion.section>

      {/* Section 3 — The Gap */}
      <motion.section
        className="bg-cream text-forest section-gap"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionReveal}
      >
        <div className="content-width">
          <p className="text-eyebrow text-stone mb-6">THE INSIGHT</p>
          <h2 className="text-display-lg text-forest mb-10 max-w-4xl">
            Everyone&apos;s talking scalp. Nobody&apos;s cracked affordable
            scalp science.
          </h2>
          <div className="space-y-0 mb-10 max-w-3xl">
            {[
              "Premium Ayurveda prices Gen Z out — ₹2,000–₹4,000 jars.",
              'Mass brands just print "scalp" on an anti-dandruff shampoo.',
              "Gen Z searches for scalp serums. They find anti-dandruff shampoo.",
            ].map((fact, i) => (
              <p
                key={i}
                className="text-body-lg text-stone py-4 border-b border-forest/10"
              >
                {fact}
              </p>
            ))}
          </div>
          <p className="text-body-lg text-terracotta font-medium mb-12">
            No one has built credible, science-backed scalp care for the
            ₹499–799 wallet.
          </p>

          {/* Competitive strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {competitors.map((c) => (
              <div
                key={c.name}
                className={`rounded-md p-5 ${
                  c.variant === "dark"
                    ? "bg-forest text-cream"
                    : "bg-cream-warm text-forest"
                }`}
              >
                <p
                  className={`font-body font-semibold text-sm mb-1 ${c.variant === "dark" ? "text-cream" : "text-forest"}`}
                >
                  {c.name}
                </p>
                <p
                  className={`text-caption ${c.variant === "dark" ? "text-cream/70" : "text-stone"}`}
                >
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Section 4 — Range Preview */}
      <motion.section
        className="bg-forest section-gap"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionReveal}
      >
        <div className="content-width">
          <p className="text-eyebrow text-sage-pale mb-6">THE RANGE · FIVE HERO SKUs</p>
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-5 md:overflow-visible">
            {productOrder.map((id) => {
              const p = products[id];
              return (
                <div
                  key={id}
                  className="flex-shrink-0 w-56 md:w-auto snap-start bg-cream-warm rounded-md p-5 shadow-card"
                >
                  <div className="w-full aspect-square bg-cream rounded-sm mb-4 flex items-center justify-center">
                    <span className="text-eyebrow text-sage-pale">
                      {p.name}
                    </span>
                  </div>
                  <h3 className="font-body font-semibold text-forest text-sm mb-1">
                    {p.name}
                  </h3>
                  <p className="text-price text-base">₹{p.price}</p>
                </div>
              );
            })}
          </div>
          <p className="text-body text-cream/70 mt-8">
            Starter &ldquo;Scalp Reset&rdquo; Kit — ₹{kit.price} · all five priced
            ₹499–₹799.{" "}
            <Link href="/range" className="text-sage hover:underline">
              See the full range →
            </Link>
          </p>
        </div>
      </motion.section>

      {/* Section 5 — App Teaser */}
      <motion.section
        className="bg-cream text-forest section-gap"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionReveal}
      >
        <div className="content-width">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-eyebrow text-stone mb-6">
                THE UNFAIR ADVANTAGE
              </p>
              <h2 className="text-display-lg text-forest mb-4">
                Find Your Scalp Match
              </h2>
              <p className="text-body-lg text-stone mb-10">
                An honest 60-second quiz — not a fake diagnosis. It reads your
                city&apos;s water, your symptoms and your stress, then routes you
                to the right routine.
              </p>

              {/* Three pillars */}
              <div className="space-y-6 mb-10">
                {[
                  {
                    num: 1,
                    color: "bg-terracotta",
                    title: "Honest",
                    desc: 'We promise to help — never to "cure." Claims stay truthful.',
                  },
                  {
                    num: 2,
                    color: "bg-terracotta",
                    title: "Useful",
                    desc: "Routes you to the right products, capturing first-party data.",
                  },
                  {
                    num: 3,
                    color: "bg-sage",
                    title: "Safe",
                    desc: "Severe hair fall? It tells you to see a dermatologist.",
                  },
                ].map((pillar) => (
                  <div key={pillar.num} className="flex items-start gap-4">
                    <span
                      className={`w-8 h-8 rounded-full ${pillar.color} text-cream flex items-center justify-center text-sm font-body font-semibold flex-shrink-0`}
                    >
                      {pillar.num}
                    </span>
                    <div>
                      <p className="font-body font-semibold text-forest">
                        {pillar.title}
                      </p>
                      <p className="text-body text-stone">{pillar.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="font-display italic text-stone text-lg leading-relaxed">
                &ldquo;A brand that says &lsquo;this helps&rsquo; survives a bad
                review. One that says &lsquo;this fixes you&rsquo; does
                not.&rdquo;
              </p>
            </div>

            {/* Phone frame with mini quiz */}
            <div className="flex justify-center">
              <div className="w-72 rounded-[28px] border-2 border-forest/10 p-3 bg-forest/5">
                <div className="rounded-[20px] overflow-hidden">
                  <MiniQuiz />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Section 6 — Your Routine */}
      <motion.section
        className="bg-forest section-gap"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionReveal}
      >
        <div className="content-width">
          <p className="text-eyebrow text-sage-pale mb-6">YOUR ROUTINE</p>
          <h2 className="text-display-lg text-cream mb-12 max-w-3xl">
            Four steps. One healthy scalp.
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "Cleanse",
                actives: "Niacinamide + Prebiotics",
                desc: "Breaks the mineral bonds hard water leaves on your scalp — the one thing ordinary shampoo can't do.",
              },
              {
                step: "Detox",
                actives: "Salicylic Acid",
                desc: "A weekly reset that lifts pollution, product buildup and excess oil trapped at the root.",
              },
              {
                step: "Fortify",
                actives: "Redensyl + Anagain",
                desc: "Supports your hair's growth phase and helps reduce stress-driven shedding over time.",
              },
              {
                step: "Repair",
                actives: "Bhringraj + Kalonji",
                desc: "Overnight barrier repair that calms and seals the scalp while you sleep.",
              },
            ].map((item) => (
              <div key={item.step} className="border-t border-cream/12 pt-6">
                <p className="text-eyebrow text-sage-pale mb-2">
                  {item.step}
                </p>
                <p className="font-body font-semibold text-cream mb-1 text-sm">
                  {item.actives}
                </p>
                <p className="text-body text-cream/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Section 7 — Campaign */}
      <motion.section
        className="bg-forest-deep section-gap"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionReveal}
      >
        <div className="content-width text-center">
          <h2 className="text-display-xl text-cream mb-6">
            &ldquo;Fix the Root, Not the Reel.&rdquo;
          </h2>
          <p className="text-body-lg text-cream/70 mb-16 max-w-2xl mx-auto">
            Real creators. Real derms. Real hair-fall stories. No filters, no
            fake promises.
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-left mb-16">
            {[
              {
                title: "Reframe",
                desc: "Scalp, not strands — a category no one owns.",
              },
              {
                title: "Emotion",
                desc: "We answer anxiety, not vanity.",
              },
              {
                title: "Muscle",
                desc: "L'Oréal R&D + distribution indie brands can't match.",
              },
            ].map((col) => (
              <div key={col.title}>
                <p className="text-eyebrow text-sage-pale mb-3">{col.title}</p>
                <p className="text-body-lg text-cream">{col.desc}</p>
              </div>
            ))}
          </div>
          <p className="font-display text-xl text-cream italic">
            Indie brands sell strands. We own the root.
          </p>
        </div>
      </motion.section>

      <Footer />
    </>
  );
}
