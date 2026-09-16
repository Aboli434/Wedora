import React from "react";
import type { Metadata } from "next";
import {
  AboutHero,
  AboutPhilosophy,
  AboutProblem,
  AboutFourPillars,
  AboutPrinciples,
  AboutClosingCTA,
} from "@/components/sections/about";

export const metadata: Metadata = {
  title: "About Us — Wedora | Luxury Wedding & Vendor Platform",
  description:
    "Discover the story and philosophy behind Wedora — bringing structure, intention, and clarity to luxury wedding planning.",
};

export default function AboutPage() {
  return (
    <article className="min-h-screen bg-[#FAF8F5]">
      <AboutHero />
      <AboutPhilosophy />
      <AboutProblem />
      <AboutFourPillars />
      <AboutPrinciples />
      <AboutClosingCTA />
    </article>
  );
}
