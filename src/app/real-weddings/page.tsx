import React from "react";
import type { Metadata } from "next";
import {
  RealWeddingsHero,
  RealWeddingsIntro,
  RealWeddingsDirectory,
  RealWeddingsCTA,
} from "@/components/sections/real-weddings";

export const metadata: Metadata = {
  title: "Real Weddings — Wedora | Luxury Wedding Stories Archive",
  description:
    "Explore Wedora's editorial archive of luxury real weddings — intimate heritage, coastal modern, and traditional celebrations documented across breathtaking destinations.",
};

export default function RealWeddingsPage() {
  return (
    <article className="min-h-screen bg-[#FAF8F5]">
      <RealWeddingsHero />
      <RealWeddingsIntro />
      <RealWeddingsDirectory />
      <RealWeddingsCTA />
    </article>
  );
}
