import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { lintAllFields } from "@/lib/claims";
import { getFallbackCopy } from "@/data/copy";
import type { Answers, EngineResult } from "@/lib/types";
import { products } from "@/data/products";

const ScalpMatchResponseSchema = z.object({
  profileLine: z.string().max(120),
  reading: z.string(),
  whyThis: z.tuple([z.string(), z.string(), z.string()]),
  routineNote: z.string(),
  honestLimit: z.string(),
});

const SYSTEM_PROMPT = `You write for ROOTED, a scalp-care brand. Your job is to explain a routine that has already been chosen for this person by a rules engine. You do not choose or suggest products — the product list is fixed and given to you.

Voice: plain, direct, warm but unsentimental. Sentence case. Short sentences. Speak to one person as "you". No exclamation marks, no emoji, no marketing adjectives ("revolutionary", "game-changing", "luxurious").

Honesty rules, which override everything else:
- Never claim a product cures, treats, fixes, reverses, regrows, or guarantees anything.
- Never diagnose. Use "this often points to", "this is commonly linked with", "one likely factor is".
- Never state a timeline shorter than 8 weeks for visible change in shedding.
- Never contradict or add to the ingredient list you are given.
- honestLimit must name something real this routine will not do. Do not soften it.

If dermFlag is true, drop all efficacy framing. Be supportive, keep it short, and reinforce that a doctor should look at this.

Return only valid JSON matching the given schema. No preamble, no markdown fences.`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { answers, engineResult } = body as {
      answers: Answers;
      engineResult: EngineResult;
    };

    const productDetails = engineResult.products
      .map((p) => {
        const prod = products[p.id];
        return `- ${prod.name} (₹${prod.price}): ${prod.keyActives.join(", ")}. ${prod.use}. ${prod.frequency}, ${prod.amount}.`;
      })
      .join("\n");

    const userPrompt = `Here is the person's profile:
- City: ${answers.city} (water: ${answers.waterHardness})
- Primary concern: ${answers.primaryConcern}
- Secondary concerns: ${answers.secondaryConcerns.join(", ") || "none"}
- Scalp feel: ${answers.scalpFeel}
- Wash frequency: ${answers.washFrequency}
- Lifestyle factors: ${answers.lifestyle.join(", ") || "none"}
- Stress/sleep: ${answers.stressLevel}
- Safety flags: ${answers.safetyFlags.join(", ") || "none"}
- dermFlag: ${engineResult.flags.dermReferral}

The engine has selected these products for them:
${productDetails}

${engineResult.kit.recommended ? "The kit rule fired — recommend the Scalp Reset Kit (₹899)." : ""}
${engineResult.flags.pregnancyOverride ? "The scrub was removed due to pregnancy (salicylic acid)." : ""}
${engineResult.flags.sensitiveOverride ? "Scrub frequency reduced to every 10 days (sensitive scalp)." : ""}

Return JSON with these fields:
- profileLine: ≤20 words reflecting their inputs back
- reading: 2–3 sentences on what's likely going on, hedged honestly
- whyThis: exactly 3 strings, ≤18 words each, one per recommended product
- routineNote: 1–2 sentences on how to stick to it
- honestLimit: 1 sentence naming what this routine will NOT fix`;

    if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === "sk-ant-REPLACE_WITH_YOUR_KEY") {
      const fallback = getFallbackCopy(answers.primaryConcern, answers.scalpFeel);
      return NextResponse.json(fallback);
    }

    const client = new Anthropic();

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";

    let parsed: z.infer<typeof ScalpMatchResponseSchema>;
    try {
      parsed = ScalpMatchResponseSchema.parse(JSON.parse(text));
    } catch {
      console.error("AI response failed Zod validation, using fallback");
      const fallback = getFallbackCopy(
        answers.primaryConcern,
        answers.scalpFeel
      );
      return NextResponse.json(fallback);
    }

    const lintResult = lintAllFields(parsed);
    if (!lintResult.passed) {
      console.error(
        `Claim linter rejected AI response. Matches: ${lintResult.matches.join(", ")}`
      );
      const fallback = getFallbackCopy(
        answers.primaryConcern,
        answers.scalpFeel
      );
      return NextResponse.json(fallback);
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Scalp Match API error:", error);
    return NextResponse.json(
      getFallbackCopy("hair_fall", "normal"),
      { status: 200 }
    );
  }
}
