"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { aboutData } from "@/data/about";

export function AboutProblem() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section padding="lg" className="bg-[#161514] text-[#FAF8F5] overflow-hidden">
      <Container>
        {/* Header Content */}
        <div className="max-w-3xl">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C5A880] mb-4 block">
              {aboutData.problem.eyebrow}
            </span>
          </motion.div>

          <motion.h2
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#FAF8F5] leading-[1.14] tracking-tight"
          >
            {aboutData.problem.heading}
          </motion.h2>

          <motion.p
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="font-sans text-base md:text-lg text-[#FAF8F5]/80 font-light leading-relaxed mt-6 max-w-2xl"
          >
            {aboutData.problem.paragraph1}
          </motion.p>

          <motion.p
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="font-serif text-xl sm:text-2xl md:text-3xl text-[#C5A880] font-light italic mt-6"
          >
            {aboutData.problem.paragraph2}
          </motion.p>
        </div>

        {/* Wide Editorial Image */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
          className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden mt-12 md:mt-16 group"
        >
          <motion.div
            whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
            transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
            className="w-full h-full relative"
          >
            <Image
              src={aboutData.problem.image}
              alt="Wedora Planning Reality — Editorial layout of stationery, fabric swatches, and wedding details"
              fill
              sizes="100vw"
              className="object-cover object-center"
              quality={90}
            />
            {/* Subtle overlay for depth */}
            <div className="absolute inset-0 bg-[#161514]/20" />
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
