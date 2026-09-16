"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { aboutData } from "@/data/about";

export function AboutFourPillars() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section padding="lg" className="bg-[#FAF8F5] text-[#161514]">
      <Container>
        {/* Section Heading */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C5A880] mb-4 block">
              ONE BEAUTIFULLY CONSIDERED PLACE
            </span>
          </motion.div>

          <motion.h2
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#161514] leading-[1.14] tracking-tight"
          >
            {aboutData.fourPillars.heading}
          </motion.h2>
        </div>

        {/* Editorial Numbered Rows */}
        <div className="border-t border-[#161514]/15 divide-y divide-[#161514]/15">
          {aboutData.fourPillars.items.map((item, index) => (
            <motion.div
              key={item.number}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group py-8 md:py-12 transition-colors duration-300 hover:bg-[#161514]/[0.02]"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline">
                {/* Number & Accent Line */}
                <div className="md:col-span-3 flex items-center gap-4">
                  <span className="font-serif text-2xl md:text-3xl text-[#C5A880] font-light tracking-wider">
                    {item.number}
                  </span>
                  <div className="h-[1px] w-0 group-hover:w-8 transition-all duration-300 bg-[#C5A880]" />
                  <h3 className="font-serif text-2xl md:text-3xl font-light tracking-wide text-[#161514] group-hover:text-[#C5A880] transition-colors duration-300">
                    {item.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="md:col-span-9">
                  <p className="font-sans text-base md:text-lg text-[#5A5650] font-light leading-relaxed max-w-2xl">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
