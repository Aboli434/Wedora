"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SERVICES_PAGE_DATA } from "@/data/servicesData";

export function ServicesFlow() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section padding="lg" className="bg-[#161514] text-[#FAF8F5] overflow-hidden">
      <Container>
        {/* Header Content */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C5A880] mb-4 block">
              {SERVICES_PAGE_DATA.flow.eyebrow}
            </span>
          </motion.div>

          <motion.h2
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#FAF8F5] leading-[1.14] tracking-tight"
          >
            {SERVICES_PAGE_DATA.flow.heading}
          </motion.h2>

          <motion.p
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="font-sans text-base md:text-lg text-[#FAF8F5]/80 font-light leading-relaxed mt-6 max-w-2xl"
          >
            {SERVICES_PAGE_DATA.flow.explanation}
          </motion.p>
        </div>

        {/* Minimal Horizontal / Vertical Connected Flow */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 border-t border-[#FAF8F5]/15 pt-12 md:pt-16">
          {SERVICES_PAGE_DATA.flow.steps.map((item, idx) => (
            <motion.div
              key={item.step}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="relative flex flex-col justify-between group pr-4"
            >
              <div>
                <span className="font-serif text-3xl md:text-4xl text-[#C5A880] font-light block mb-3">
                  {item.step}
                </span>
                <h3 className="font-serif text-xl md:text-2xl font-light tracking-wide text-[#FAF8F5] mb-2 group-hover:text-[#C5A880] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="font-sans text-xs md:text-sm text-[#FAF8F5]/70 font-light">
                  {item.subtitle}
                </p>
              </div>

              {/* Connecting Accent Line for Desktop */}
              {idx < SERVICES_PAGE_DATA.flow.steps.length - 1 && (
                <div className="hidden md:block absolute top-6 right-0 w-8 h-[1px] bg-[#C5A880]/30" />
              )}
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
