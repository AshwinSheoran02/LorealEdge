"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { products, kit } from "@/data/products";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { RootLine } from "@/components/site/RootLine";
import type { SkuId } from "@/lib/types";

const sectionReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const productOrder: SkuId[] = ["serum", "scrub", "shampoo", "conditioner", "mask"];

export default function RangePage() {
  return (
    <>
      <Nav variant="site" />
      <RootLine />

      <section className="bg-forest section-gap pt-32">
        <div className="content-width">
          <p className="text-eyebrow text-sage-pale mb-6">THE RANGE</p>
          <h1 className="text-display-xl text-cream mb-4">Five hero SKUs.</h1>
          <p className="text-body-lg text-cream/80 max-w-2xl">
            Scalp-first hair care, built like skincare. Clinical actives plus
            Indian botanicals, priced to compete.
          </p>
        </div>
      </section>

      {/* Product rows */}
      {productOrder.map((id, i) => {
        const p = products[id];
        const isReversed = i % 2 === 1;

        return (
          <motion.section
            key={id}
            className={`${i % 2 === 0 ? "bg-cream" : "bg-cream-warm"} text-forest section-gap`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionReveal}
          >
            <div className="content-width">
              <div
                className={`grid md:grid-cols-2 gap-12 items-start ${isReversed ? "md:direction-rtl" : ""}`}
              >
                <div className={isReversed ? "md:order-2" : ""}>
                  <div className="w-full aspect-square bg-forest/5 rounded-md flex items-center justify-center">
                    <span className="text-eyebrow text-sage-pale text-lg">
                      {p.name}
                    </span>
                  </div>
                </div>
                <div className={isReversed ? "md:order-1" : ""}>
                  <h2 className="text-display-lg text-forest mb-2">
                    {p.name}
                  </h2>
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-price text-2xl">₹{p.price}</span>
                    <span className="text-caption text-stone">
                      Recommended MRP {p.priceRange}
                    </span>
                  </div>
                  <p className="text-body-lg text-stone mb-6">{p.concern}</p>

                  <div className="space-y-4 mb-6">
                    <div>
                      <p className="text-eyebrow text-stone mb-1">
                        KEY ACTIVES
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {p.keyActives.map((a) => (
                          <span
                            key={a}
                            className="px-3 py-1 bg-sage/10 text-sage rounded-sm text-sm"
                          >
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-eyebrow text-stone mb-1">HOW TO USE</p>
                      <p className="text-body text-forest">{p.use}</p>
                    </div>
                    <div>
                      <p className="text-eyebrow text-stone mb-1">HOW OFTEN</p>
                      <p className="text-body text-forest">{p.frequency}</p>
                    </div>
                    <div>
                      <p className="text-eyebrow text-stone mb-1">AMOUNT</p>
                      <p className="text-body text-forest">{p.amount}</p>
                    </div>
                    {p.notFor && (
                      <div className="bg-terracotta/8 rounded-sm p-4">
                        <p className="text-eyebrow text-terracotta mb-1">
                          NOT FOR
                        </p>
                        <p className="text-body text-forest">{p.notFor}</p>
                      </div>
                    )}
                  </div>

                  {/* Competitor Benchmarks */}
                  <div className="border border-forest/10 rounded-md p-5 mb-6">
                    <p className="text-eyebrow text-stone mb-3">
                      MARKET BENCHMARKS
                    </p>
                    <div className="space-y-2 mb-3">
                      {p.benchmarks.map((b) => (
                        <div
                          key={b.name}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-stone">{b.name}</span>
                          <span className="text-forest font-medium whitespace-nowrap ml-4">
                            {b.price}
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="text-caption text-stone/70">
                      {p.marketContext}
                    </p>
                  </div>

                  <Link
                    href="/scalp-match"
                    className="inline-flex px-6 py-2.5 bg-sage text-cream rounded-sm text-sm font-medium hover:bg-sage-light transition-colors"
                  >
                    Find your Scalp Match
                  </Link>
                </div>
              </div>
            </div>
          </motion.section>
        );
      })}

      {/* Kit Block */}
      <motion.section
        className="bg-forest section-gap"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionReveal}
      >
        <div className="content-width">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-eyebrow text-sage-pale mb-6">
              THE STARTER KIT
            </p>
            <h2 className="text-display-lg text-cream mb-4">{kit.name}</h2>
            <p className="text-body-lg text-cream/80 mb-6">
              {kit.includes.map((id) => products[id].name).join(" + ")}
            </p>
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="text-price text-3xl">₹{kit.price}</span>
              <span className="text-cream/50 line-through text-lg">
                ₹{kit.separatePrice}
              </span>
            </div>
            <p className="text-body text-cream/70 mb-8">
              Save ₹{kit.saving} compared to buying separately.
            </p>
            <Link
              href="/scalp-match"
              className="inline-flex px-8 py-3 bg-sage text-cream rounded-sm font-medium hover:bg-sage-light transition-colors"
            >
              Find your Scalp Match
            </Link>
          </div>
        </div>
      </motion.section>

      <Footer />
    </>
  );
}
