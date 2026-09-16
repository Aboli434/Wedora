"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { VendorCard } from "./VendorCard";
import { FEATURED_VENDORS_DATA } from "@/data/featuredVendors";

export function FeaturedVendors() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
              The People Behind the Details
            </span>
            <Heading
              as="h2"
              className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light leading-[1.08] tracking-tight text-[var(--text-primary)]"
            >
              Meet the makers of your celebration.
            </Heading>
            <p className="body-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl pt-2">
              From photographers and planners to florists, designers, and venues,
              discover professionals who can bring your vision to life.
            </p>
          </motion.div>

          {/* 2-Column Editorial Directory Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {FEATURED_VENDORS_DATA.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
