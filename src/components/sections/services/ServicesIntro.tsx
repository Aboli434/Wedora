"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SERVICES_PAGE_DATA } from "@/data/servicesData";

export function ServicesIntro() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section padding="lg" className="bg-[#FAF8F5] text-[#161514] overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Typography Side */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C5A880] mb-4">
                {SERVICES_PAGE_DATA.intro.eyebrow}
              </span>
            </motion.div>

            <motion.h2
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#161514] leading-[1.16] tracking-tight"
            >
              {SERVICES_PAGE_DATA.intro.heading}
            </motion.h2>

            <motion.p
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="font-sans text-base md:text-lg text-[#5A5650] font-light leading-relaxed mt-6 md:mt-8 max-w-xl"
            >
              {SERVICES_PAGE_DATA.intro.supporting}
            </motion.p>

            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 pt-6 border-t border-[#161514]/10 flex items-center gap-3"
            >
              <span className="w-8 h-[1px] bg-[#C5A880]" />
              <span className="text-[10px] md:text-[11px] tracking-[0.25em] uppercase font-semibold text-[#161514]/70">
                THOUGHTFUL ARCHITECTURE
              </span>
            </motion.div>
          </div>

          {/* Supporting Image Side */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-6 relative aspect-[4/3] md:aspect-[16/11] overflow-hidden group shadow-lg"
          >
            <motion.div
              whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
              className="w-full h-full relative"
            >
              <Image
                src={SERVICES_PAGE_DATA.intro.imageSrc}
                alt={SERVICES_PAGE_DATA.intro.imageAlt}
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
