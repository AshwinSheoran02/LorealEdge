"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ingredients } from "@/data/ingredients";
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

const clinical = ingredients.filter((i) => i.family === "clinical");
const botanical = ingredients.filter((i) => i.family === "botanical");

function IngredientAccordion({
  ingredient,
}: {
  ingredient: (typeof ingredients)[0];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-forest/10">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full text-left py-5 flex items-center justify-between"
        aria-expanded={open}
      >
        <span className="font-body font-semibold text-forest">
          {ingredient.name}
        </span>
        <span className="text-stone text-lg">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="pb-5 space-y-4">
          <div>
            <p className="text-eyebrow text-stone mb-1">WHAT IT DOES</p>
            <p className="text-body text-forest">{ingredient.whatItDoes}</p>
          </div>
          <div>
            <p className="text-eyebrow text-stone mb-1">WHERE IT SHOWS UP</p>
            <p className="text-body text-forest">{ingredient.whereItShowsUp}</p>
          </div>
          <div className="bg-cream-warm rounded-sm p-4">
            <p className="text-eyebrow text-terracotta mb-1">
              WHAT IT WON&apos;T DO
            </p>
            <p className="text-body text-forest">{ingredient.whatItWontDo}</p>
          </div>
        </div>
      )}
    </div>
  );
}

const goToMarket = [
  {
    step: 1,
    title: "Quick Commerce",
    desc: "Blinkit & Zepto — ₹99 minis, in-hand in 10 minutes, zero commitment.",
  },
  {
    step: 2,
    title: "D2C + Nykaa",
    desc: "Owns the Scalp-Match data, margin and the loyal core.",
  },
  {
    step: 3,
    title: "Modern Trade",
    desc: "Month 4+: shelf legitimacy once online demand is proven.",
  },
  {
    step: 4,
    title: "Salons",
    desc: "Month 8+: L'Oréal's salon halo — the at-home extension of pro care.",
  },
];

export default function SciencePage() {
  return (
    <>
      <Nav variant="site" />
      <RootLine />

      <section className="bg-forest section-gap pt-32">
        <div className="content-width">
          <p className="text-eyebrow text-sage-pale mb-6">THE SCIENCE</p>
          <h1 className="text-display-xl text-cream mb-4">Lab meets Land.</h1>
          <p className="text-body-lg text-cream/80 max-w-2xl">
            Scalp-first hair care, built like skincare — backed by L&apos;Oréal&apos;s
            dermatological science.
          </p>
        </div>
      </section>

      <motion.section
        className="bg-cream text-forest section-gap"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionReveal}
      >
        <div className="content-width">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {/* Clinical */}
            <div>
              <p className="text-eyebrow text-stone mb-6">CLINICAL ACTIVES</p>
              {clinical.map((ing) => (
                <IngredientAccordion key={ing.name} ingredient={ing} />
              ))}
            </div>

            {/* Botanical — separated by vertical hairline on desktop */}
            <div className="md:border-l md:border-forest/10 md:pl-16">
              <p className="text-eyebrow text-stone mb-6">
                INDIAN BOTANICALS
              </p>
              {botanical.map((ing) => (
                <IngredientAccordion key={ing.name} ingredient={ing} />
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* The Moat */}
      <motion.section
        className="bg-forest section-gap"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionReveal}
      >
        <div className="content-width">
          <p className="text-eyebrow text-sage-pale mb-6">THE MOAT</p>
          <p className="text-display-sm text-cream max-w-3xl">
            Luxury owns premium. Indie owns cheap. Only L&apos;Oréal can put
            clinical scalp science on the ₹400 shelf — at Blinkit speed.
          </p>
        </div>
      </motion.section>

      {/* Go-to-Market Timeline */}
      <motion.section
        className="bg-cream text-forest section-gap"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionReveal}
      >
        <div className="content-width">
          <p className="text-eyebrow text-stone mb-10">GO-TO-MARKET</p>
          <div className="grid md:grid-cols-4 gap-6">
            {goToMarket.map((item) => (
              <div key={item.step} className="relative pl-8">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-sage/40" />
                <div className="absolute left-[-4px] top-1 w-[9px] h-[9px] rounded-full bg-sage" />
                <p className="text-eyebrow text-stone mb-2">
                  STEP {item.step}
                </p>
                <h3 className="font-body font-semibold text-forest mb-2">
                  {item.title}
                </h3>
                <p className="text-body text-stone">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <Footer />
    </>
  );
}
