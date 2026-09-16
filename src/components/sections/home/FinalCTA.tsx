"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";

export function FinalCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Subtle Parallax Scroll Effect on Background Image
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(
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
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 1.06 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.2, ease: [0.25, 1, 0.5, 1] as const },
    },
  };

  return (
    <Section
      ref={sectionRef}
      padding="xl"
      className="relative w-full min-h-[85svh] flex items-center justify-center overflow-hidden text-[var(--text-light)] bg-[#141312] border-t border-[var(--border-dark)]"
    >
      {/* Background Full-Bleed Photography Asset */}
      <motion.div
        style={{ y: parallaxY }}
        variants={imageVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="absolute inset-0 w-full h-[112%] select-none"
      >
        <Image
          src="/images/wedding/wedora-final-cta-wedding.jpg"
          alt="Indian couple walking through a warmly lit heritage wedding venue after their celebration"
          fill
          unoptimized
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.85] contrast-[1.05]"
        />
        {/* Restrained Solid Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-[#141312]/65 pointer-events-none" />
      </motion.div>

      {/* Foreground Content Container */}
      <Container size="md" className="relative z-10 text-center space-y-8 py-12 sm:py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-8 max-w-2xl mx-auto"
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="inline-block">
            <span className="caption tracking-[0.3em] text-[var(--accent-gold)] bg-black/50 px-4 py-1.5 border border-[var(--accent-gold)]/40 shadow-xs">
              Your Celebration Starts Here
            </span>
          </motion.div>

          {/* Heading */}
          <motion.div variants={itemVariants}>
            <Heading
              as="h2"
              className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light leading-[1.04] tracking-tight text-white"
            >
              Let&apos;s make it yours.
            </Heading>
          </motion.div>

          {/* Supporting Copy */}
          <motion.p
            variants={itemVariants}
            className="body-lg text-[var(--text-light)]/90 max-w-xl mx-auto font-normal leading-relaxed tracking-wide"
          >
            Bring your vision, your people, and all the little details together in one
            beautifully considered place.
          </motion.p>

          {/* Actions: Primary CTA & Secondary Link */}
          <motion.div
            variants={itemVariants}
            className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link href="/register">
              <Button variant="primary" size="lg">
                Plan Your Wedding
              </Button>
            </Link>

            <Link
              href="/about"
              className="group inline-flex items-center text-xs uppercase tracking-[0.2em] font-sans font-medium text-[var(--text-light)] hover:text-[var(--accent-gold)] transition-colors duration-300 py-2 border-b border-transparent hover:border-[var(--accent-gold)]"
            >
              <span>Explore the Wedora Journey</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
