"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function ContactCTA() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section padding="none" className="relative bg-[#161514] text-[#FAF8F5] overflow-hidden py-24 md:py-32">
      {/* Background Image with Dark Overlay */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={shouldReduceMotion ? { opacity: 0.3 } : { opacity: 0.15, scale: 1.03 }}
        whileInView={{ opacity: 0.3, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
      >
        <Image
          src="/images/wedding/wedora-hero-wedding.jpg"
          alt="Wedora Closing CTA Background"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#161514]/70" />
      </motion.div>

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <motion.span
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#C5A880] block"
          >
            STILL EXPLORING?
          </motion.span>

          <motion.h2
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#FAF8F5] leading-[1.14] tracking-tight"
          >
            See what Wedora can bring together.
          </motion.h2>

          <motion.p
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-sans text-base sm:text-lg text-[#FAF8F5]/80 font-light leading-relaxed max-w-xl mx-auto"
          >
            From planning and vendors to budgets and the little details, explore the experience before you begin.
          </motion.p>

          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/services"
              className="w-full sm:w-auto px-8 py-4 bg-[#C5A880] text-[#161514] font-semibold text-xs tracking-[0.2em] uppercase inline-flex items-center justify-center hover:bg-white transition-colors"
            >
              <span>Explore Services</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>

            <Link
              href="/real-weddings"
              className="w-full sm:w-auto px-8 py-4 bg-transparent text-[#FAF8F5] border border-[#FAF8F5]/30 text-xs tracking-[0.2em] uppercase inline-flex items-center justify-center hover:border-[#C5A880] hover:text-[#C5A880] transition-colors"
            >
              <span>Explore Weddings</span>
            </Link>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
