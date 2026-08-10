"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface QuestionCardProps {
  questionId: string;
  question: string;
  subCopy?: string;
  options: { id: string; label: string }[];
  type: "single" | "multi" | "multi_optional" | "safety";
  selected: string | string[];
  onSelect: (value: string | string[]) => void;
  onNext: () => void;
  onBack?: () => void;
  direction?: number;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 24 : -24,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -24 : 24,
    opacity: 0,
  }),
};

export function QuestionCard({
  questionId,
  question,
  subCopy,
  options,
  type,
  selected,
  onSelect,
  onNext,
  onBack,
  direction = 1,
}: QuestionCardProps) {
  const isMulti = type === "multi" || type === "multi_optional" || type === "safety";
  const selectedArray = Array.isArray(selected) ? selected : selected ? [selected] : [];
  const containerRef = useRef<HTMLDivElement>(null);
  const [focusIndex, setFocusIndex] = useState(0);

  const handleOptionClick = useCallback(
    (optionId: string) => {
      if (isMulti) {
        if (optionId === "none") {
          onSelect(["none"]);
          return;
        }
        let next = selectedArray.filter((s) => s !== "none");
        if (next.includes(optionId)) {
          next = next.filter((s) => s !== optionId);
        } else {
          next = [...next, optionId];
        }
        onSelect(next);
      } else {
        onSelect(optionId);
        setTimeout(onNext, 200);
      }
    },
    [isMulti, selectedArray, onSelect, onNext]
  );

  useEffect(() => {
    setFocusIndex(0);
  }, [questionId]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
        case "ArrowRight":
          e.preventDefault();
          setFocusIndex((i) => Math.min(i + 1, options.length - 1));
          break;
        case "ArrowUp":
        case "ArrowLeft":
          e.preventDefault();
          setFocusIndex((i) => Math.max(i - 1, 0));
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          handleOptionClick(options[focusIndex].id);
          break;
      }
    },
    [focusIndex, options, handleOptionClick]
  );

  useEffect(() => {
    const el = containerRef.current?.querySelector(
      `[data-index="${focusIndex}"]`
    ) as HTMLElement | null;
    el?.focus();
  }, [focusIndex]);

  const canProceed =
    type === "multi_optional" || selectedArray.length > 0;

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={questionId}
        custom={direction}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 flex flex-col px-6 pb-6"
      >
        <fieldset className="flex-1 flex flex-col">
          <legend className="text-display-lg text-forest mb-2 pt-4">
            {question}
          </legend>
          {subCopy && (
            <p className="text-body text-stone mb-6">{subCopy}</p>
          )}
          <div
            ref={containerRef}
            role={isMulti ? "group" : "radiogroup"}
            aria-label={question}
            onKeyDown={handleKeyDown}
            className="flex flex-col gap-3 mt-4"
          >
            {options.map((opt, i) => {
              const isSelected = selectedArray.includes(opt.id);
              return (
                <button
                  key={opt.id}
                  type="button"
                  role={isMulti ? "checkbox" : "radio"}
                  aria-checked={isSelected}
                  data-index={i}
                  tabIndex={i === focusIndex ? 0 : -1}
                  onClick={() => handleOptionClick(opt.id)}
                  className={`
                    w-full text-left px-4 py-3 sm:px-5 sm:py-4 rounded-sm transition-all duration-150
                    font-body text-sm sm:text-base
                    ${
                      isSelected
                        ? "bg-sage-light text-cream ring-2 ring-sage"
                        : "bg-cream-warm text-forest hover:bg-sage-pale/30"
                    }
                    focus-visible:outline-2 focus-visible:outline-sage focus-visible:outline-offset-2
                  `}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`
                        w-5 h-5 border-2 flex items-center justify-center flex-shrink-0
                        ${isMulti ? "rounded-sm" : "rounded-full"}
                        ${isSelected ? "border-cream bg-sage" : "border-sage-pale"}
                      `}
                    >
                      {isSelected && (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="2,6 5,9 10,3" />
                        </svg>
                      )}
                    </span>
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="flex items-center justify-between mt-8 pt-4 border-t border-forest/10">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="text-stone hover:text-forest text-sm font-body transition-colors"
            >
              ← Back
            </button>
          ) : (
            <div />
          )}
          {isMulti && (
            <button
              type="button"
              onClick={onNext}
              disabled={!canProceed}
              className={`
                px-6 py-2.5 rounded-sm font-body text-sm font-medium transition-all
                ${
                  canProceed
                    ? "bg-sage text-cream hover:bg-sage-light"
                    : "bg-sage-pale text-cream/60 cursor-not-allowed"
                }
              `}
            >
              {type === "multi_optional" && selectedArray.length === 0
                ? "Skip"
                : "Continue"}
            </button>
          )}
        </div>

        <div aria-live="polite" className="sr-only">
          {question}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
