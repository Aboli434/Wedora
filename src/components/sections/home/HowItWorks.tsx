"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { ProcessStep } from "./ProcessStep";
import { HOW_IT_WORKS_DATA } from "@/data/howItWorks";

export function HowItWorks() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] as const },
    },
  };

  const lineVariants: Variants = {
    hidden: { scaleX: 0 },
    show: {
      scaleX: 1,
      transition: { duration: 1.2, ease: [0.25, 1, 0.5, 1] as const },
    },
  };

  return (
    <Section
      padding="xl"
      className="bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-[90svh] flex items-center relative overflow-hidden"
    >
      <Container size="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-16 lg:space-y-24"
        >
          {/* Section Header */}
          <motion.div variants={headerVariants} className="max-w-3xl space-y-4">
            <span className="caption tracking-[0.25em] text-[var(--accent-gold)]">
              The Wedora Journey
            </span>
            <Heading
              as="h2"
              className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light leading-[1.08] tracking-tight text-[var(--text-primary)]"
            >
              From first idea to final farewell.
            </Heading>
            <p className="body-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl pt-2">
              A thoughtful way to bring your plans, people, places, and priorities together.
            </p>
          </motion.div>

          {/* Desktop & Mobile Timeline Layout */}
          <div className="relative">
            {/* Desktop Horizontal Connecting Line (≥ 1024px) */}
            <div className="hidden lg:block absolute top-[6px] left-0 right-0 h-[1px] bg-[var(--border-subtle)] z-0">
              <motion.div
                variants={lineVariants}
                className="h-full w-full bg-[var(--accent-gold)]/40 origin-left"
              />
            </div>

            {/* Mobile Vertical Connecting Line (< 1024px) */}
            <div className="lg:hidden absolute top-2 bottom-2 left-[5px] w-[1px] bg-[var(--border-subtle)] z-0" />

            {/* Timeline Steps Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-8 relative z-10 pl-6 lg:pl-0">
              {HOW_IT_WORKS_DATA.map((step) => (
                <ProcessStep key={step.id} step={step} />
              ))}
            </div>
          </div>

          {/* Subtle Supporting Editorial Phrase */}
          <motion.div
            variants={headerVariants}
            className="pt-4 flex items-center justify-between border-t border-[var(--border-subtle)] text-xs font-sans tracking-[0.25em] text-[var(--text-muted)] uppercase"
          >
            <span>One Journey. Many Moments.</span>
            <span>Planned With Intention</span>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
