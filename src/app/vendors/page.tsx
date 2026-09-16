import React from "react";
import type { Metadata } from "next";
import {
  VendorsHero,
  VendorDirectory,
  VendorCTA,
} from "@/components/sections/vendors";

export const metadata: Metadata = {
  title: "Vendors — Wedora | Luxury Wedding & Vendor Directory",
  description:
    "Explore Wedora's curated directory of premier Indian wedding artisans, photographers, planners, venues, caterers, and couturiers.",
};

export default function VendorsPage() {
  return (
    <article className="min-h-screen bg-[#FAF8F5]">
      <VendorsHero />
      <VendorDirectory />
      <VendorCTA />
    </article>
  );
}
