"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { getCityList, getWaterHardness, getHardnessLabel } from "@/data/water";
import type { WaterHardness } from "@/lib/types";

interface CitySelectProps {
  value: string;
  onSelect: (city: string, hardness: WaterHardness) => void;
  onBack?: () => void;
}

export function CitySelect({ value, onSelect, onBack }: CitySelectProps) {
  const cities = useMemo(() => getCityList(), []);
  const [query, setQuery] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const [showManual, setShowManual] = useState(false);
  const [selectedCity, setSelectedCity] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    if (!query) return cities;
    const q = query.toLowerCase();
    return cities.filter((c) => c.toLowerCase().includes(q));
  }, [query, cities]);

  const handleCitySelect = (city: string) => {
    const hardness = getWaterHardness(city);
    if (hardness) {
      setSelectedCity(city);
      setQuery(city);
      setIsOpen(false);
      onSelect(city, hardness);
    }
  };

  const handleManualSelect = (hardness: WaterHardness) => {
    const cityName = query || "My city";
    onSelect(cityName, hardness);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const hardness = selectedCity ? getWaterHardness(selectedCity) : null;

  return (
    <div className="flex-1 flex flex-col px-6 pb-6">
      <fieldset className="flex-1 flex flex-col">
        <legend className="text-display-lg text-forest mb-2 pt-4">
          Where do you wash your hair?
        </legend>
        <p className="text-body text-stone mb-6">
          We use this to estimate your water hardness — it affects what your
          scalp needs.
        </p>

        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
              setShowManual(false);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Search your city…"
            className="w-full px-4 py-3.5 bg-cream-warm border border-sage-pale rounded-sm text-forest placeholder:text-stone/40 focus:border-sage focus:outline-none transition-colors text-base"
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
          />

          {isOpen && filtered.length > 0 && (
            <ul
              role="listbox"
              className="absolute top-full left-0 right-0 mt-1 bg-cream border border-sage-pale rounded-sm max-h-52 overflow-y-auto z-10 shadow-card"
            >
              {filtered.map((city) => (
                <li
                  key={city}
                  role="option"
                  aria-selected={city === selectedCity}
                  onClick={() => handleCitySelect(city)}
                  className={`px-4 py-3 cursor-pointer text-sm transition-colors
                    ${
                      city === selectedCity
                        ? "bg-sage-light text-cream"
                        : "text-forest hover:bg-cream-warm"
                    }
                  `}
                >
                  {city}
                </li>
              ))}
            </ul>
          )}

          {isOpen && filtered.length === 0 && query && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-cream border border-sage-pale rounded-sm p-4 z-10 shadow-card">
              <p className="text-sm text-stone mb-3">
                City not listed.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setShowManual(true);
                }}
                className="text-sm text-sage hover:underline"
              >
                Tell us about your water instead →
              </button>
            </div>
          )}
        </div>

        {hardness && !showManual && (
          <p className="text-sm text-stone mt-3">
            {getHardnessLabel(hardness)}
          </p>
        )}

        {showManual && (
          <div className="mt-6 space-y-3">
            <p className="text-body text-forest mb-2">
              Do you know if your water is hard?
            </p>
            {(
              [
                { id: "hard" as const, label: "Yes, hard" },
                { id: "soft" as const, label: "No, soft" },
                { id: "moderate" as const, label: "Not sure" },
              ] as const
            ).map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleManualSelect(opt.id)}
                className="w-full text-left px-5 py-4 rounded-sm bg-cream-warm text-forest hover:bg-sage-pale/30 transition-colors text-base"
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
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
        <div />
      </div>
    </div>
  );
}
