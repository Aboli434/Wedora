"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function ContactIntro() {
  const shouldReduceMotion = useReducedMotion();

  const steps = [
    { num: "01", text: "Your celebration" },
    { num: "02", text: "Your priorities" },
    { num: "03", text: "Your questions" },
    { num: "04", text: "Your next step" },
  ];

  return (
    <Section padding="lg" className="bg-[#FAF8F5] text-[#161514] border-b border-[#161514]/10">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7">
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C5A880] mb-4 block">
                YOUR STORY, FIRST
              </span>
            </motion.div>

            <motion.h2
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#161514] leading-[1.16] tracking-tight"
            >
              A few details help us understand the celebration you&apos;re planning.
            </motion.h2>

            <motion.p
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="font-sans text-base md:text-lg text-[#5A5650] font-light leading-relaxed mt-6 max-w-xl"
            >
              Share only what you know right now. You don&apos;t need to have every decision figured out before reaching out.
            </motion.p>
          </div>

          {/* Right Column: Numbered Minimal List */}
          <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-[#161514]/15 pt-8 lg:pt-0 lg:pl-12">
            <div className="space-y-6">
              {steps.map((item, idx) => (
                <motion.div
                  key={item.num}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="flex items-baseline gap-4 group"
                >
                  <span className="font-serif text-2xl text-[#C5A880] font-light">
                    {item.num}
                  </span>
                  <span className="font-sans text-base text-[#161514] font-light tracking-wide group-hover:text-[#C5A880] transition-colors">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
