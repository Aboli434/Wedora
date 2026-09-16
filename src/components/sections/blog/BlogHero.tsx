"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function BlogHero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section padding="none" className="relative min-h-[65vh] sm:min-h-[75vh] flex items-center justify-center overflow-hidden bg-[#161514]">
      {/* Background Image with Split Dark Overlay */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={shouldReduceMotion ? { scale: 1, opacity: 0.85 } : { scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.85 }}
        transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
      >
        <Image
          src="/images/wedding/wedora-hero-wedding.jpg"
          alt="Wedora Journal Hero — Royal courtyard celebration in Rajasthan"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          quality={90}
        />
        {/* Solid dark overlay */}
        <div className="absolute inset-0 bg-[#161514]/55" />
      </motion.div>

      {/* Hero Content — Split Editorial Layout */}
      <Container className="relative z-10 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <span className="text-[11px] md:text-xs font-semibold tracking-[0.3em] uppercase text-[#C5A880] mb-4 block">
                THE WEDORA JOURNAL
              </span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h1
                initial={shouldReduceMotion ? { opacity: 1 } : { y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
                className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[#FAF8F5] leading-[1.12] tracking-tight"
              >
                Thoughts for the celebration ahead.
              </motion.h1>
            </div>
          </div>

          <div className="lg:col-span-4 lg:pb-2">
            <motion.p
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="font-sans text-base sm:text-lg text-[#FAF8F5]/80 font-light leading-relaxed border-l border-[#C5A880]/40 pl-6"
            >
              Planning notes, thoughtful ideas, and inspiration for creating a wedding that feels entirely your own.
            </motion.p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
