"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { aboutData } from "@/data/about";

export function AboutPrinciples() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section padding="lg" className="bg-[#F3EFEA] text-[#161514] overflow-hidden">
      <Container>
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-16 md:mb-24">
          <div className="lg:col-span-6">
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C5A880] mb-4 block">
                {aboutData.principles.eyebrow}
              </span>
            </motion.div>

            <motion.h2
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#161514] leading-[1.14] tracking-tight"
            >
              {aboutData.principles.heading}
            </motion.h2>
          </div>

          <div className="lg:col-span-6 lg:pt-8">
            <motion.p
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-sans text-base md:text-lg text-[#5A5650] font-light leading-relaxed max-w-xl"
            >
              {aboutData.principles.supporting}
            </motion.p>
          </div>
        </div>

        {/* Asymmetric Editorial Principles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          {/* Principle 01 — Full Width / Dominant Lead */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-12 border-t border-[#161514]/15 pt-8 md:pt-12 pb-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline"
          >
            <div className="md:col-span-4 flex items-baseline gap-4">
              <span className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#C5A880] font-light">
                {aboutData.principles.items[0].number}
              </span>
              <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl font-light text-[#161514]">
                {aboutData.principles.items[0].title}
              </h3>
            </div>
            <div className="md:col-span-8">
              <p className="font-sans text-base md:text-xl text-[#5A5650] font-light leading-relaxed max-w-2xl">
                {aboutData.principles.items[0].description}
              </p>
            </div>
          </motion.div>

          {/* Principle 02 — Left Column */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 border-t border-[#161514]/15 pt-8 md:pt-12 pb-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-baseline gap-4 mb-4">
                <span className="font-serif text-3xl md:text-4xl text-[#C5A880] font-light">
                  {aboutData.principles.items[1].number}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-light text-[#161514]">
                  {aboutData.principles.items[1].title}
                </h3>
              </div>
              <p className="font-sans text-base md:text-lg text-[#5A5650] font-light leading-relaxed max-w-md">
                {aboutData.principles.items[1].description}
              </p>
            </div>
          </motion.div>

          {/* Principle 03 — Right Column (Offset Down for Asymmetry) */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-6 border-t border-[#161514]/15 pt-8 md:pt-12 pb-6 flex flex-col justify-between lg:translate-y-6"
          >
            <div>
              <div className="flex items-baseline gap-4 mb-4">
                <span className="font-serif text-3xl md:text-4xl text-[#C5A880] font-light">
                  {aboutData.principles.items[2].number}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-light text-[#161514]">
                  {aboutData.principles.items[2].title}
                </h3>
              </div>
              <p className="font-sans text-base md:text-lg text-[#5A5650] font-light leading-relaxed max-w-md">
                {aboutData.principles.items[2].description}
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
