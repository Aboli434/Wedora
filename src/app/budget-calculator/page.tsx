import React from "react";
import type { Metadata } from "next";
import {
  BudgetHero,
  BudgetCalculator,
  BudgetCTA,
} from "@/components/sections/budget";

export const metadata: Metadata = {
  title: "Budget Calculator | Wedora",
  description:
    "Build a thoughtful starting estimate for your wedding based on your celebration, location, guest count, and priorities.",
};

export default function BudgetCalculatorPage() {
  return (
    <article className="min-h-screen bg-[#FAF8F5]">
      <BudgetHero />
      <BudgetCalculator />
      <BudgetCTA />
    </article>
  );
}
