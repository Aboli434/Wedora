"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { BudgetVisual } from "./BudgetVisual";

export function BudgetCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Subtle Parallax Scroll Effect for Image
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageParallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [20, shouldReduceMotion ? 0 : -20]
  );

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] as const },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 1.06 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.1, ease: [0.25, 1, 0.5, 1] as const },
    },
  };

  return (
    <Section
      ref={sectionRef}
      padding="xl"
      className="bg-[var(--bg-dark)] text-[var(--text-light)] min-h-[90svh] flex items-center relative overflow-hidden"
    >
      <Container size="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          {/* Left Column: Text & Action */}
          <div className="lg:col-span-5 space-y-6 lg:space-y-8">
            <motion.div variants={itemVariants} className="inline-block">
              <span className="caption tracking-[0.25em] text-[var(--accent-gold)]">
                Plan With Clarity
              </span>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Heading
                as="h2"
                className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light leading-[1.08] tracking-tight text-[var(--text-light)]"
              >
                What might your celebration cost?
              </Heading>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="body-lg text-[var(--text-muted)] max-w-xl leading-relaxed font-normal"
            >
              Get a thoughtful starting estimate based on your guest count, location,
              events, and priorities — before the numbers start adding up.
            </motion.p>

            <motion.div variants={itemVariants} className="pt-2 space-y-3">
              <div>
                <Link href="/budget-calculator">
                  <Button variant="primary" size="lg">
                    Explore the Budget Calculator
                  </Button>
                </Link>
              </div>

              <p className="caption text-[10px] tracking-[0.2em] text-[var(--text-muted)] lowercase italic pt-1">
                A starting point, not a final quote.
              </p>
            </motion.div>
          </div>

          {/* Right Column: Editorial Wedding Photography + Overlaid Budget Panel */}
          <div className="lg:col-span-7 w-full">
            <div className="relative w-full">
              {/* Main Premium AI Wedding Photography Frame */}
              <motion.div
                style={{ y: imageParallaxY }}
                variants={imageVariants}
                className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-[#161514] border border-[var(--border-dark)] shadow-2xl group"
              >
                <Image
                  src="/images/wedding/wedora-budget-celebration.jpg"
                  alt="Elegant Indian wedding reception table with warm candlelight and floral details"
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center transition-transform duration-1000 ease-[0.25,1,0.5,1] group-hover:scale-[1.03] filter brightness-[0.95]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141312] via-transparent to-transparent opacity-70 pointer-events-none" />
              </motion.div>

              {/* Overlaid Secondary Budget Allocation Card Panel */}
              <div className="mt-6 lg:mt-0 lg:absolute lg:-bottom-8 lg:-left-10 lg:w-[88%] z-10">
                <BudgetVisual />
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
