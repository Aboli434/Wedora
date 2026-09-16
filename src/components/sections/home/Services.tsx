"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { ServiceItem } from "./ServiceItem";
import { SERVICES_DATA } from "@/data/services";

export function Services() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
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

  const lineDrawVariants: Variants = {
    hidden: { scaleX: 0 },
    show: {
      scaleX: 1,
      transition: { duration: 1.1, ease: [0.25, 1, 0.5, 1] as const },
    },
  };

  return (
    <Section
      padding="xl"
      className="bg-[var(--bg-secondary)] text-[var(--text-primary)] min-h-[100svh] flex items-center relative overflow-hidden"
    >
      <Container size="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-16 lg:space-y-20"
        >
          {/* Section Header */}
          <motion.div variants={headerVariants} className="max-w-3xl space-y-4">
            <span className="caption tracking-[0.25em] text-[var(--accent-gold)]">
              What We Bring to the Table
            </span>
            <Heading
              as="h2"
              className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light leading-[1.08] tracking-tight text-[var(--text-primary)]"
            >
              Everything your celebration needs.
            </Heading>
            <p className="body-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl pt-2">
              From planning the big picture to keeping track of the smallest details,
              Wedora keeps your entire wedding journey beautifully organized.
            </p>
          </motion.div>

          {/* Animated Horizontal Header Accent Rule */}
          <div className="w-full h-[1px] bg-[var(--border-subtle)] relative overflow-hidden">
            <motion.div
              variants={lineDrawVariants}
              className="w-full h-full bg-[var(--accent-gold)]/50 origin-left"
            />
          </div>

          {/* Large Vertical Editorial Service Rows */}
          <div className="w-full">
            {SERVICES_DATA.map((service, index) => (
              <ServiceItem
                key={service.id}
                service={service}
                isFirst={index === 0}
              />
            ))}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
