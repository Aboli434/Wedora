"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { BudgetVisual } from "./BudgetVisual";

export function BudgetCTA() {
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

  return (
    <Section
      padding="xl"
      className="bg-[var(--bg-dark)] text-[var(--text-light)] min-h-[80svh] flex items-center relative overflow-hidden"
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
          <div className="lg:col-span-6 space-y-6 lg:space-y-8">
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
                  <Button
                    variant="primary"
                    size="lg"
                    className="bg-[var(--accent-gold)] text-black hover:bg-white hover:text-black border-transparent shadow-md"
                  >
                    Explore the Budget Calculator
                  </Button>
                </Link>
              </div>

              <p className="caption text-[10px] tracking-[0.2em] text-[var(--text-muted)] lowercase italic pt-1">
                A starting point, not a final quote.
              </p>
            </motion.div>
          </div>

          {/* Right Column: Illustrative Budget Visual Panel */}
          <div className="lg:col-span-6 w-full flex justify-center lg:justify-end">
            <BudgetVisual />
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
