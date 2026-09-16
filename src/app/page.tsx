import React from "react";
import {
  Hero,
  Philosophy,
  Services,
  FeaturedWeddings,
  HowItWorks,
  FeaturedVendors,
  Gallery,
  BudgetCTA,
  Testimonials,
} from "@/components/sections/home";

export default function Home() {
  return (
    <div>
      <Hero />
      <Philosophy />
      <Services />
      <FeaturedWeddings />
      <HowItWorks />
      <FeaturedVendors />
      <Gallery />
      <BudgetCTA />
      <Testimonials />
    </div>
  );
}
