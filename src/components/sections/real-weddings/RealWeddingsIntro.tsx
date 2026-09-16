"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function RealWeddingsIntro() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section padding="lg" className="bg-[#FAF8F5] text-[#161514] overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Typography Column */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C5A880] mb-4">
                THE STORIES
              </span>
            </motion.div>

            <motion.h2
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#161514] leading-[1.16] tracking-tight"
            >
              No two celebrations look the same.
            </motion.h2>

            <motion.p
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="font-sans text-base md:text-lg text-[#5A5650] font-light leading-relaxed mt-6 md:mt-8 max-w-xl"
            >
              Every wedding carries its own rhythm — from the place it happens to the people who make it meaningful. Explore a few of the celebrations that inspire the way Wedora thinks about planning.
            </motion.p>
          </div>

          {/* Supporting Image Column */}
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
                src="/images/wedding/wedora-philosophy-bride.jpg"
                alt="Wedora Real Weddings Philosophy — Bride in heritage attire"
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
