"use client";

import React, { useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import {
  CelebrationStyle,
  PriorityLevel,
  BUDGET_LOCATIONS,
  BUDGET_EVENTS,
  BUDGET_STYLES,
  PRIORITY_CATEGORIES,
  PRIORITY_LEVELS,
} from "@/data/budget";
import { BudgetInputs, calculateBudget, BudgetResultData } from "@/lib/budgetCalculator";
import { BudgetResult } from "./BudgetResult";
import { ChevronRight, ChevronLeft } from "lucide-react";

const DEFAULT_INPUTS: BudgetInputs = {
  guestCount: 150,
  eventCount: 2,
  celebrationStyle: "CLASSIC",
  location: "Jaipur",
  priorities: {
    venue: "Elevated",
    decor: "Elevated",
    photography: "Elevated",
    catering: "Elevated",
    attire: "Elevated",
  },
};

export function BudgetCalculator() {
  const shouldReduceMotion = useReducedMotion();
  const [step, setStep] = useState<number>(1);
  const [inputs, setInputs] = useState<BudgetInputs>(DEFAULT_INPUTS);
  const [guestCountError, setGuestCountError] = useState<string | null>(null);

  // Validation
  const handleGuestCountChange = (val: string) => {
    const num = parseInt(val, 10);
    if (isNaN(num)) {
      setInputs((prev) => ({ ...prev, guestCount: 0 }));
      setGuestCountError("Please enter a valid guest count number.");
      return;
    }

    if (num < 20) {
      setGuestCountError("Minimum guest count is 20.");
    } else if (num > 1000) {
      setGuestCountError("Maximum guest count is 1000.");
    } else {
      setGuestCountError(null);
    }

    setInputs((prev) => ({ ...prev, guestCount: num }));
  };

  const isStep1Valid = inputs.guestCount >= 20 && inputs.guestCount <= 1000;

  // Calculation Result
  const result: BudgetResultData = useMemo(() => {
    return calculateBudget(inputs);
  }, [inputs]);

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setGuestCountError(null);
    setStep(1);
  };

  const stepsHeader = [
    { num: 1, label: "01 Celebration" },
    { num: 2, label: "02 Location" },
    { num: 3, label: "03 Priorities" },
    { num: 4, label: "04 Estimate" },
  ];

  return (
    <Section padding="lg" className="bg-[#FAF8F5] text-[#161514]">
      <Container size="md">
        {/* Progress Step Bar */}
        <div className="mb-12 border-b border-[#161514]/15 pb-6">
          <div className="grid grid-cols-4 gap-2 text-center">
            {stepsHeader.map((s) => {
              const isActive = step === s.num;
              const isPassed = step > s.num;

              return (
                <button
                  key={s.num}
                  onClick={() => {
                    if (s.num < step || (s.num === 4 && isStep1Valid)) {
                      setStep(s.num);
                    }
                  }}
                  disabled={s.num > step && !isStep1Valid}
                  className={`text-xs font-sans tracking-[0.18em] uppercase py-2 transition-all cursor-pointer ${
                    isActive
                      ? "text-[#161514] font-semibold border-b-2 border-[#C5A880]"
                      : isPassed
                      ? "text-[#161514]/70 hover:text-[#161514]"
                      : "text-[#161514]/30 cursor-not-allowed"
                  }`}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step Container */}
        <div className="min-h-[450px] flex flex-col justify-between">
          {/* STEP 01 — YOUR CELEBRATION */}
          {step === 1 && (
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div>
                <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C5A880] block mb-2">
                  STEP 01 OF 04
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#161514]">
                  Tell us about the celebration.
                </h2>
              </div>

              {/* Guest Count */}
              <div className="space-y-3">
                <label
                  htmlFor="guest-count-input"
                  className="block text-sm font-semibold tracking-wider uppercase text-[#161514]"
                >
                  How many guests are you planning for?
                </label>
                <div className="max-w-xs">
                  <input
                    id="guest-count-input"
                    type="number"
                    min={20}
                    max={1000}
                    value={inputs.guestCount || ""}
                    onChange={(e) => handleGuestCountChange(e.target.value)}
                    className="w-full bg-[#F3EFEA] border border-[#161514]/20 text-[#161514] px-4 py-3 text-lg font-serif focus:outline-none focus:border-[#C5A880]"
                  />
                  {guestCountError && (
                    <p className="text-xs text-red-600 mt-2">{guestCountError}</p>
                  )}
                  <p className="text-xs text-[#5A5650] mt-1">Suggested range: 20 to 1000 guests</p>
                </div>
              </div>

              {/* Event Count */}
              <div className="space-y-3 pt-4 border-t border-[#161514]/10">
                <label className="block text-sm font-semibold tracking-wider uppercase text-[#161514]">
                  How many events are you planning?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {BUDGET_EVENTS.map((evt) => {
                    const isSelected = inputs.eventCount === evt.count;
                    return (
                      <button
                        key={evt.count}
                        type="button"
                        onClick={() =>
                          setInputs((prev) => ({ ...prev, eventCount: evt.count }))
                        }
                        className={`p-4 text-center border text-xs font-sans tracking-widest uppercase transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#161514] text-[#FAF8F5] border-[#161514]"
                            : "bg-[#F3EFEA] text-[#161514] border-[#161514]/15 hover:border-[#C5A880]"
                        }`}
                      >
                        {evt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Celebration Style */}
              <div className="space-y-3 pt-4 border-t border-[#161514]/10">
                <label className="block text-sm font-semibold tracking-wider uppercase text-[#161514]">
                  What feels closest to your celebration?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {BUDGET_STYLES.map((st) => {
                    const isSelected = inputs.celebrationStyle === st.key;
                    return (
                      <button
                        key={st.key}
                        type="button"
                        onClick={() =>
                          setInputs((prev) => ({
                            ...prev,
                            celebrationStyle: st.key as CelebrationStyle,
                          }))
                        }
                        className={`p-5 text-left border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#161514] text-[#FAF8F5] border-[#161514]"
                            : "bg-[#F3EFEA] text-[#161514] border-[#161514]/15 hover:border-[#C5A880]"
                        }`}
                      >
                        <h4 className="font-serif text-lg font-light mb-1">{st.label}</h4>
                        <p className={`text-xs font-sans font-light leading-relaxed ${isSelected ? "text-[#FAF8F5]/80" : "text-[#5A5650]"}`}>
                          {st.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 02 — YOUR LOCATION */}
          {step === 2 && (
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div>
                <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C5A880] block mb-2">
                  STEP 02 OF 04
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#161514]">
                  Where will the celebration happen?
                </h2>
              </div>

              <div className="space-y-4 max-w-md">
                <label
                  htmlFor="location-select"
                  className="block text-sm font-semibold tracking-wider uppercase text-[#161514]"
                >
                  Select Celebration Destination
                </label>
                <select
                  id="location-select"
                  value={inputs.location}
                  onChange={(e) =>
                    setInputs((prev) => ({ ...prev, location: e.target.value }))
                  }
                  className="w-full bg-[#F3EFEA] border border-[#161514]/20 text-[#161514] px-4 py-3.5 text-base font-sans focus:outline-none focus:border-[#C5A880] cursor-pointer"
                >
                  {BUDGET_LOCATIONS.map((loc) => (
                    <option key={loc.name} value={loc.name}>
                      {loc.name}
                    </option>
                  ))}
                </select>

                <p className="text-xs text-[#5A5650] font-light leading-relaxed pt-2">
                  Location is used only to shape this illustrative estimate based on general regional market factors.
                </p>
              </div>
            </motion.div>
          )}

          {/* STEP 03 — YOUR PRIORITIES */}
          {step === 3 && (
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div>
                <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C5A880] block mb-2">
                  STEP 03 OF 04
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#161514]">
                  What matters most to you?
                </h2>
                <p className="font-sans text-sm text-[#5A5650] font-light mt-2">
                  Every celebration has different priorities. Tell us where you&apos;d like more of the budget to go.
                </p>
              </div>

              <div className="space-y-6 pt-4 border-t border-[#161514]/15">
                {PRIORITY_CATEGORIES.map((cat) => {
                  const currentLevel = inputs.priorities[cat.key];

                  return (
                    <div
                      key={cat.key}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3 border-b border-[#161514]/10"
                    >
                      <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#161514]">
                        {cat.label}
                      </span>

                      <div className="flex items-center gap-2">
                        {PRIORITY_LEVELS.map((lvl) => {
                          const isSelected = currentLevel === lvl;
                          return (
                            <button
                              key={lvl}
                              type="button"
                              onClick={() =>
                                setInputs((prev) => ({
                                  ...prev,
                                  priorities: {
                                    ...prev.priorities,
                                    [cat.key]: lvl as PriorityLevel,
                                  },
                                }))
                              }
                              className={`px-3 py-1.5 text-xs font-sans tracking-wider uppercase transition-all cursor-pointer ${
                                isSelected
                                  ? "bg-[#161514] text-[#FAF8F5] font-medium"
                                  : "bg-[#F3EFEA] text-[#161514]/70 hover:bg-[#161514]/10"
                              }`}
                            >
                              {lvl}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 04 — YOUR ESTIMATE RESULT */}
          {step === 4 && (
            <BudgetResult
              result={result}
              onEdit={() => setStep(1)}
              onReset={handleReset}
            />
          )}

          {/* Navigation Control Buttons */}
          <div className="mt-12 pt-6 border-t border-[#161514]/15 flex items-center justify-between">
            {step > 1 ? (
              <Button
                variant="outline"
                size="md"
                onClick={() => setStep((prev) => prev - 1)}
                className="inline-flex items-center gap-2 text-[#161514] border-[#161514]"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>
            ) : (
              <div />
            )}

            {step < 4 && (
              <Button
                variant="primary"
                size="md"
                disabled={!isStep1Valid}
                onClick={() => setStep((prev) => prev + 1)}
                className="inline-flex items-center gap-2"
              >
                <span>{step === 3 ? "Generate Estimate" : "Next Step"}</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
