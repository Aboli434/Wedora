"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function BudgetHero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section padding="none" className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center overflow-hidden bg-[#161514]">
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={shouldReduceMotion ? { scale: 1, opacity: 0.85 } : { scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.85 }}
        transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
      >
        <Image
          src="/images/wedding/wedora-service-budget.jpg"
          alt="Wedora Budget Calculator Hero — Stationery, journal, and wedding planning details"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          quality={90}
        />
        {/* Solid dark overlay */}
        <div className="absolute inset-0 bg-[#161514]/55" />
      </motion.div>

      {/* Content — Split Editorial Layout */}
      <Container className="relative z-10 pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <span className="text-[11px] md:text-xs font-semibold tracking-[0.3em] uppercase text-[#C5A880] mb-4 block">
                PLAN WITH CLARITY
              </span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h1
                initial={shouldReduceMotion ? { opacity: 1 } : { y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
                className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-[#FAF8F5] leading-[1.12] tracking-tight"
              >
                What might your celebration cost?
              </motion.h1>
            </div>
          </div>

          <div className="lg:col-span-5 lg:pb-2">
            <motion.p
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="font-sans text-base sm:text-lg text-[#FAF8F5]/85 font-light leading-relaxed border-l border-[#C5A880]/40 pl-6"
            >
              Build a thoughtful starting estimate based on your guest count, location, events, and priorities — before the numbers start adding up.
            </motion.p>
            <p className="text-[11px] font-sans tracking-widest text-[#C5A880] uppercase mt-4 pl-6 opacity-80">
              An illustrative estimate to help you plan. Not a final quote.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
