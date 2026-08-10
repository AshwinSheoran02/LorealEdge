import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { lintAllFields } from "@/lib/claims";

const InvestigatesSchema = z.object({
  verdict: z.enum(["Holds up", "Partly true", "Not proven", "Myth"]),
  short: z.string().max(150),
  detail: z.string(),
  forYou: z.string(),
});

const SYSTEM_PROMPT = `You are the fact-checker for ROOTED, a scalp-care brand by L'Oréal India. Someone has asked about a hair care claim they've seen online. Your job is to give them an honest, evidence-based answer.

Voice: plain, direct, warm but unsentimental. Sentence case. Short sentences. Speak to one person as "you". No exclamation marks, no emoji, no marketing adjectives.

Rules:
- Be willing to say the evidence is weak, including about ingredients ROOTED sells.
- Do not mention ROOTED products unless directly relevant, and never more than once.
- Never claim anything cures, treats, fixes, reverses, regrows, or guarantees results.
- Never diagnose. Use hedged language.
- Base your verdicts on published research, not influencer content.

Return only valid JSON with these fields:
- verdict: one of "Holds up", "Partly true", "Not proven", or "Myth"
- short: ≤25 words, the honest headline answer
- detail: 3–4 sentences on what's actually established
- forYou: 1–2 sentences on what to do with that information

No preamble, no markdown fences. Only JSON.`;

export async function POST(request: Request) {
  try {
    const { question } = await request.json();

    if (!question || typeof question !== "string" || question.length > 500) {
      return NextResponse.json(
        { error: "Invalid question" },
        { status: 400 }
      );
    }

    if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === "sk-ant-REPLACE_WITH_YOUR_KEY") {
      return NextResponse.json({
        verdict: "Not proven" as const,
        short: "We need an API key to answer this one.",
        detail: "The Ask Rooted feature requires a valid Anthropic API key to work. Once configured, it will give you honest, evidence-based answers about hair care claims.",
        forYou: "Set up your ANTHROPIC_API_KEY in .env.local to enable this feature.",
      });
    }

    const client = new Anthropic();

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: question }],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";

    let parsed: z.infer<typeof InvestigatesSchema>;
    try {
      parsed = InvestigatesSchema.parse(JSON.parse(text));
    } catch {
      console.error("Investigates response failed validation");
      return NextResponse.json(
        { error: "Failed to parse response" },
        { status: 500 }
      );
    }

    const lintResult = lintAllFields(parsed);
    if (!lintResult.passed) {
      console.error(
        `Claim linter rejected investigates response. Matches: ${lintResult.matches.join(", ")}`
      );
      return NextResponse.json(
        { error: "Response contained banned claims" },
        { status: 500 }
      );
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Investigates API error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
