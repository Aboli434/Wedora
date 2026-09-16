"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export function VendorCTA() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section padding="lg" className="bg-[#161514] text-[#FAF8F5]">
      <Container className="text-center flex flex-col items-center">
        {/* Eyebrow */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#C5A880] mb-4 block">
            FOR CREATIVE PARTNERS
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
          Your work deserves to be discovered.
        </motion.h2>

        {/* Supporting Copy */}
        <motion.p
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="font-sans text-base sm:text-lg md:text-xl text-[#FAF8F5]/80 font-light max-w-2xl mt-6 leading-relaxed"
        >
          Join a growing network of people and businesses helping couples create celebrations that feel like their own.
        </motion.p>

        {/* Action Button */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10"
        >
          <Link href="/register">
            <Button variant="primary" size="lg">
              Become a Vendor
            </Button>
          </Link>
        </motion.div>
      </Container>
    </Section>
  );
}
