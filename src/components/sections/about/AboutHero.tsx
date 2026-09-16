"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { aboutData } from "@/data/about";

export function AboutHero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section padding="none" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#161514]">
      {/* Background Image with Cinematic Motion */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={shouldReduceMotion ? { scale: 1, opacity: 0.9 } : { scale: 1.06, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.9 }}
        transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
      >
        <Image
          src={aboutData.hero.image}
          alt="Wedora About Hero — Elegant Indian couple in a heritage courtyard"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          quality={90}
        />
        {/* Solid translucent dark overlay for editorial readability */}
        <div className="absolute inset-0 bg-[#161514]/50" />
      </motion.div>

      {/* Hero Content */}
      <Container className="relative z-10 pt-32 pb-20 md:pt-40 md:pb-28 text-center flex flex-col items-center">
        {/* Eyebrow */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-block"
        >
          <span className="text-[11px] md:text-xs font-semibold tracking-[0.3em] uppercase text-[#C5A880] mb-4 block">
            {aboutData.hero.eyebrow}
          </span>
        </motion.div>

        {/* Heading */}
        <div className="overflow-hidden max-w-4xl">
          <motion.h1
            initial={shouldReduceMotion ? { opacity: 1 } : { y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.25, 1, 0.5, 1] }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[#FAF8F5] leading-[1.12] tracking-tight"
          >
            {aboutData.hero.heading}
          </motion.h1>
        </div>

        {/* Supporting Copy */}
        <motion.p
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="font-sans text-base sm:text-lg md:text-xl text-[#FAF8F5]/80 font-light max-w-2xl mt-6 md:mt-8 leading-relaxed"
        >
          {aboutData.hero.supporting}
        </motion.p>
      </Container>
    </Section>
  );
}
