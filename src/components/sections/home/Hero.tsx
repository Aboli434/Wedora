"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { HeroMedia } from "./HeroMedia";
import { HeroContent } from "./HeroContent";
import { ScrollIndicator } from "./ScrollIndicator";

export interface HeroProps {
  desktopVideoSrc?: string;
  mobileImageSrc?: string;
  fallbackImageSrc?: string;
}

export function Hero({
  desktopVideoSrc,
  mobileImageSrc = "/images/wedding/wedora-hero-wedding.jpg",
  fallbackImageSrc = "/images/wedding/wedora-hero-wedding.jpg",
}: HeroProps) {
  return (
    <section className="relative w-full min-h-[100svh] flex flex-col justify-between overflow-hidden">
      {/* Background Video / Image & Overlay */}
      <HeroMedia
        desktopVideoSrc={desktopVideoSrc}
        mobileImageSrc={mobileImageSrc}
        fallbackImageSrc={fallbackImageSrc}
      />

      {/* Hero Content Container (Positioned toward lower-left/center-left) */}
      <div className="relative z-10 w-full flex-1 flex items-end pb-10 pt-24 sm:pb-14 sm:pt-28 lg:pb-16 lg:pt-32">
        <Container size="lg" className="w-full">
          <HeroContent />
        </Container>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="relative z-10 pb-4 sm:pb-6 w-full flex justify-center">
        <ScrollIndicator />
      </div>
    </section>
  );
}
