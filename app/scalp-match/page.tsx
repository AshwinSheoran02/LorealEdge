"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { QuizShell } from "@/components/app/QuizShell";
import { QuestionCard } from "@/components/app/QuestionCard";
import { CitySelect } from "@/components/app/CitySelect";
import { LoadingState } from "@/components/app/LoadingState";
import { SafetyInterstitial } from "@/components/app/SafetyInterstitial";
import { ResultCard } from "@/components/app/ResultCard";
import { questions } from "@/data/questions";
import { runEngine } from "@/lib/engine";
import { getFallbackCopy } from "@/data/copy";
import type {
  Answers,
  EngineResult,
  AiScalpMatchResponse,
  WaterHardness,
  PrimaryConcern,
  ScalpFeel,
  WashFrequency,
  LifestyleFactor,
  StressLevel,
  SafetyFlag,
} from "@/lib/types";

type QuizStage = "intro" | "questions" | "safety" | "loading" | "result";

const STORAGE_KEY = "rooted-quiz";
const TOTAL_QUESTIONS = 8;
const DERM_FLAGS: SafetyFlag[] = [
  "patchy_loss",
  "sores_pain",
  "widening_part",
  "recent_illness",
];

function getInitialAnswers(): Partial<Answers> {
  if (typeof window === "undefined") return {};
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

export default function ScalpMatchPage() {
  const [stage, setStage] = useState<QuizStage>("intro");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<Partial<Answers>>({});
  const [engineResult, setEngineResult] = useState<EngineResult | null>(null);
  const [aiResponse, setAiResponse] = useState<AiScalpMatchResponse | null>(
    null
  );

  useEffect(() => {
    setAnswers(getInitialAnswers());
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && Object.keys(answers).length > 0) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    }
  }, [answers]);

  // Check if an answer came pre-filled from the homepage mini-quiz
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const prefill = params.get("prefill");
    if (prefill) {
      setAnswers((prev) => ({
        ...prev,
        primaryConcern: prefill as PrimaryConcern,
      }));
      setStage("questions");
      setQuestionIndex(0);
      window.history.replaceState({}, "", "/scalp-match");
    }
  }, []);

  const currentQuestion = questions[questionIndex];

  const getOptionsForQuestion = useCallback(() => {
    if (currentQuestion.id === "secondary_concerns") {
      const primary = answers.primaryConcern;
      const allOptions = questions.find(
        (q) => q.id === "primary_concern"
      )?.options;
      return (allOptions ?? []).filter((o) => o.id !== primary);
    }
    return currentQuestion.options ?? [];
  }, [currentQuestion, answers.primaryConcern]);

  const getSelectedForQuestion = useCallback((): string | string[] => {
    switch (currentQuestion.id) {
      case "city":
        return answers.city ?? "";
      case "primary_concern":
        return answers.primaryConcern ?? "";
      case "secondary_concerns":
        return answers.secondaryConcerns ?? [];
      case "scalp_feel":
        return answers.scalpFeel ?? "";
      case "wash_frequency":
        return answers.washFrequency ?? "";
      case "lifestyle":
        return answers.lifestyle ?? [];
      case "stress":
        return answers.stressLevel ?? "";
      case "safety":
        return answers.safetyFlags ?? [];
      default:
        return "";
    }
  }, [currentQuestion, answers]);

  const handleSelect = useCallback(
    (value: string | string[]) => {
      setAnswers((prev) => {
        const next = { ...prev };
        switch (currentQuestion.id) {
          case "primary_concern":
            next.primaryConcern = value as PrimaryConcern;
            break;
          case "secondary_concerns":
            next.secondaryConcerns = value as PrimaryConcern[];
            break;
          case "scalp_feel":
            next.scalpFeel = value as ScalpFeel;
            break;
          case "wash_frequency":
            next.washFrequency = value as WashFrequency;
            break;
          case "lifestyle":
            next.lifestyle = value as LifestyleFactor[];
            break;
          case "stress":
            next.stressLevel = value as StressLevel;
            break;
          case "safety":
            next.safetyFlags = value as SafetyFlag[];
            break;
        }
        return next;
      });
    },
    [currentQuestion]
  );

  const handleCitySelect = useCallback(
    (city: string, hardness: WaterHardness) => {
      setAnswers((prev) => ({ ...prev, city, waterHardness: hardness }));
      setTimeout(() => {
        setDirection(1);
        setQuestionIndex((i) => i + 1);
      }, 200);
    },
    []
  );

  const handleNext = useCallback(() => {
    if (questionIndex < TOTAL_QUESTIONS - 1) {
      setDirection(1);
      setQuestionIndex((i) => i + 1);
    } else {
      handleQuizComplete();
    }
  }, [questionIndex, answers]);

  const handleBack = useCallback(() => {
    if (questionIndex > 0) {
      setDirection(-1);
      setQuestionIndex((i) => i - 1);
    } else {
      setStage("intro");
    }
  }, [questionIndex]);

  const handleQuizComplete = useCallback(async () => {
    const fullAnswers: Answers = {
      city: answers.city ?? "Unknown",
      waterHardness: answers.waterHardness ?? "moderate",
      primaryConcern: answers.primaryConcern ?? "hair_fall",
      secondaryConcerns: answers.secondaryConcerns ?? [],
      scalpFeel: answers.scalpFeel ?? "normal",
      washFrequency: answers.washFrequency ?? "every_2_3",
      lifestyle: answers.lifestyle ?? [],
      stressLevel: answers.stressLevel ?? "both_fine",
      safetyFlags: answers.safetyFlags ?? ["none"],
    };

    // Check for safety interstitial
    const needsDerm = fullAnswers.safetyFlags.some((f) =>
      DERM_FLAGS.includes(f)
    );

    const result = runEngine(fullAnswers);
    setEngineResult(result);

    if (needsDerm) {
      setStage("safety");
      return;
    }

    await fetchAiAndShow(fullAnswers, result);
  }, [answers]);

  const fetchAiAndShow = useCallback(
    async (fullAnswers: Answers, result: EngineResult) => {
      setStage("loading");

      const minDelay = new Promise((r) => setTimeout(r, 1200));

      try {
        const response = await Promise.race([
          fetch("/api/scalp-match", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              answers: fullAnswers,
              engineResult: result,
            }),
          }),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error("timeout")), 12000)
          ),
        ]);

        const data = await response.json();
        await minDelay;

        if (data.error || !data.profileLine) {
          throw new Error("Invalid response");
        }

        setAiResponse(data);
      } catch {
        await minDelay;
        setAiResponse(
          getFallbackCopy(fullAnswers.primaryConcern, fullAnswers.scalpFeel)
        );
      }

      setStage("result");
    },
    []
  );

  const handleSafetyAccept = useCallback(async () => {
    const fullAnswers: Answers = {
      city: answers.city ?? "Unknown",
      waterHardness: answers.waterHardness ?? "moderate",
      primaryConcern: answers.primaryConcern ?? "hair_fall",
      secondaryConcerns: answers.secondaryConcerns ?? [],
      scalpFeel: answers.scalpFeel ?? "normal",
      washFrequency: answers.washFrequency ?? "every_2_3",
      lifestyle: answers.lifestyle ?? [],
      stressLevel: answers.stressLevel ?? "both_fine",
      safetyFlags: answers.safetyFlags ?? ["none"],
    };
    await fetchAiAndShow(fullAnswers, engineResult!);
  }, [answers, engineResult, fetchAiAndShow]);

  // Intro screen
  if (stage === "intro") {
    return (
      <div className="min-h-dvh bg-cream flex items-center justify-center px-6">
        <div className="max-w-lg text-center">
          <p className="text-eyebrow text-stone mb-4">SCALP MATCH</p>
          <h1 className="text-display-lg text-forest mb-4">
            Find your scalp routine.
          </h1>
          <p className="text-body-lg text-stone mb-8">
            An honest 60-second quiz — not a fake diagnosis. It reads your
            city&apos;s water, your symptoms and your stress, then routes you to
            the right routine.
          </p>
          <button
            type="button"
            onClick={() => setStage("questions")}
            className="px-8 py-3.5 bg-sage text-cream rounded-sm font-body text-base font-medium hover:bg-sage-light transition-colors"
          >
            Start
          </button>
        </div>
      </div>
    );
  }

  // Safety interstitial
  if (stage === "safety") {
    return (
      <SafetyInterstitial
        onContinue={handleSafetyAccept}
        onBack={() => {
          setQuestionIndex(TOTAL_QUESTIONS - 1);
          setStage("questions");
        }}
      />
    );
  }

  // Loading
  if (stage === "loading") {
    return <LoadingState />;
  }

  // Result
  if (stage === "result" && engineResult && aiResponse) {
    const fullAnswers: Answers = {
      city: answers.city ?? "Unknown",
      waterHardness: answers.waterHardness ?? "moderate",
      primaryConcern: answers.primaryConcern ?? "hair_fall",
      secondaryConcerns: answers.secondaryConcerns ?? [],
      scalpFeel: answers.scalpFeel ?? "normal",
      washFrequency: answers.washFrequency ?? "every_2_3",
      lifestyle: answers.lifestyle ?? [],
      stressLevel: answers.stressLevel ?? "both_fine",
      safetyFlags: answers.safetyFlags ?? ["none"],
    };
    return (
      <ResultCard
        answers={fullAnswers}
        engineResult={engineResult}
        aiResponse={aiResponse}
      />
    );
  }

  // Quiz questions
  return (
    <QuizShell step={questionIndex + 1} totalSteps={TOTAL_QUESTIONS}>
      {currentQuestion.type === "city_select" ? (
        <CitySelect
          value={answers.city ?? ""}
          onSelect={handleCitySelect}
          onBack={handleBack}
        />
      ) : (
        <QuestionCard
          questionId={currentQuestion.id}
          question={currentQuestion.question}
          subCopy={currentQuestion.subCopy}
          options={getOptionsForQuestion()}
          type={currentQuestion.type as "single" | "multi" | "multi_optional" | "safety"}
          selected={getSelectedForQuestion()}
          onSelect={handleSelect}
          onNext={handleNext}
          onBack={questionIndex > 0 ? handleBack : undefined}
          direction={direction}
        />
      )}
    </QuizShell>
  );
}
