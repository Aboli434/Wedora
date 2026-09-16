"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { aboutData } from "@/data/about";

export function AboutPhilosophy() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section padding="lg" className="bg-[#FAF8F5] text-[#161514] overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Typography Column */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Micro-Label / Tag */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <span className="inline-block text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C5A880]">
                {aboutData.philosophy.eyebrow}
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#161514] leading-[1.15] tracking-tight"
            >
              {aboutData.philosophy.heading}
            </motion.h2>

            {/* Supporting Copy */}
            <motion.p
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="font-sans text-base md:text-lg text-[#5A5650] font-light leading-relaxed mt-6 md:mt-8 max-w-xl"
            >
              {aboutData.philosophy.supporting}
            </motion.p>

            {/* Editorial Micro-Label */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 pt-6 border-t border-[#161514]/10 flex items-center gap-3"
            >
              <span className="w-6 h-[1px] bg-[#C5A880]" />
              <span className="text-[10px] md:text-[11px] tracking-[0.25em] uppercase font-semibold text-[#161514]/70">
                {aboutData.philosophy.microLabel}
              </span>
            </motion.div>
          </div>

          {/* Portrait Image Column */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-6 relative aspect-[3/4] overflow-hidden rounded-none shadow-xl group"
          >
            <motion.div
              whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
              className="w-full h-full relative"
            >
              <Image
                src={aboutData.philosophy.image}
                alt="Wedora Philosophy — Bride preparation and intimate wedding details"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
                quality={90}
              />
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
