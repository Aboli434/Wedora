"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { WeddingStoryCard } from "./WeddingStoryCard";
import { FEATURED_WEDDINGS_DATA } from "@/data/featuredWeddings";

export function FeaturedWeddings() {
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

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] as const },
    },
  };

  const featuredStory = FEATURED_WEDDINGS_DATA.find((w) => w.isFeatured);
  const supportingStories = FEATURED_WEDDINGS_DATA.filter((w) => !w.isFeatured);

  return (
    <Section
      padding="xl"
      className="bg-[var(--bg-dark)] text-[var(--text-light)] min-h-[100svh] flex items-center relative overflow-hidden"
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
              Selected Celebrations
            </span>
            <Heading
              as="h2"
              className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light leading-[1.08] tracking-tight text-[var(--text-light)]"
            >
              Stories worth remembering.
            </Heading>
            <p className="body-lg text-[var(--text-muted)] leading-relaxed max-w-2xl pt-2">
              Every celebration has its own rhythm, atmosphere, and meaning. Explore a few
              of the stories we&apos;ve helped bring together.
            </p>
          </motion.div>

          {/* Asymmetric Editorial Grid */}
          <div className="space-y-10 lg:space-y-12">
            {/* Dominant Featured Story */}
            {featuredStory && (
              <div className="w-full">
                <WeddingStoryCard wedding={featuredStory} />
              </div>
            )}

            {/* Supporting Stories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {supportingStories.map((wedding) => (
                <WeddingStoryCard key={wedding.id} wedding={wedding} />
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
