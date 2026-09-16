"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { aboutData } from "@/data/about";

export function AboutClosingCTA() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section padding="none" className="relative min-h-[75vh] flex items-center justify-center overflow-hidden bg-[#161514]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={aboutData.closing.image}
          alt="Wedora About Closing — Newlywed couple celebrating at sunset"
          fill
          sizes="100vw"
          className="object-cover object-center"
          quality={90}
        />
        {/* Dark translucent overlay for editorial clarity */}
        <div className="absolute inset-0 bg-[#161514]/65" />
      </div>

      {/* Content Container */}
      <Container className="relative z-10 py-24 md:py-36 text-center flex flex-col items-center">
        {/* Eyebrow */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#C5A880] mb-4 block">
            {aboutData.closing.eyebrow}
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#FAF8F5] leading-[1.14] tracking-tight max-w-3xl"
        >
          {aboutData.closing.heading}
        </motion.h2>

        {/* Supporting Copy */}
        <motion.p
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="font-sans text-base sm:text-lg md:text-xl text-[#FAF8F5]/85 font-light max-w-2xl mt-6 leading-relaxed"
        >
          {aboutData.closing.supporting}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md"
        >
          <Link href="/register" className="w-full sm:w-auto">
            <Button variant="primary" size="lg" className="w-full sm:w-auto">
              {aboutData.closing.primaryCta}
            </Button>
          </Link>

          <Link href="/services" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              {aboutData.closing.secondaryCta}
            </Button>
          </Link>
        </motion.div>
      </Container>
    </Section>
  );
}
