import React from "react";
import type { Metadata } from "next";
import {
  ServicesHero,
  ServicesIntro,
  ServiceDetail,
  ServicesFlow,
  ServicesCTA,
} from "@/components/sections/services";

export const metadata: Metadata = {
  title: "Services — Wedora | Luxury Wedding & Vendor Platform",
  description:
    "Explore Wedora's bespoke services: wedding planning, vendor discovery, guest & event management, and budget management for luxury celebrations.",
};

export default function ServicesPage() {
  return (
    <article className="min-h-screen bg-[#FAF8F5]">
      <ServicesHero />
      <ServicesIntro />
      <ServiceDetail />
      <ServicesFlow />
      <ServicesCTA />
    </article>
  );
}
