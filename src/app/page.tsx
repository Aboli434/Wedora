import React from "react";
import {
  Hero,
  Philosophy,
  HowItWorks,
  EditorialShowcase,
  FinalCTA,
} from "@/components/sections/home";

export default function Home() {
  return (
    <div>
      <Hero />
      <Philosophy />
      <HowItWorks />
      <EditorialShowcase />
      <FinalCTA />
    </div>
  );
}
