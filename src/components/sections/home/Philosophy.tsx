"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, Variants, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { cn } from "@/lib/utils";

export interface PhilosophyProps {
  imageSrc?: string;
  imageAlt?: string;
}

export function Philosophy({
  imageSrc = "/images/wedding/wedora-philosophy-bride.jpg",
  imageAlt = "Wedora Indian Luxury Wedding Philosophy - Bride in Heritage Corridor",
}: PhilosophyProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Subtle Parallax Scroll Effect for Editorial Image Frame
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageParallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [30, shouldReduceMotion ? 0 : -30]
  );

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
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
    hidden: { opacity: 0, scale: 0.94 },
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
      className="bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-[85svh] flex items-center relative overflow-hidden"
    >
      <Container size="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          {/* Left Editorial Content */}
          <div className="lg:col-span-6 space-y-6 lg:space-y-8">
            {/* Eyebrow */}
            <motion.div variants={itemVariants} className="inline-block">
              <span className="caption tracking-[0.25em] text-[var(--accent-gold)]">
                The Wedora Approach
              </span>
            </motion.div>

            {/* Main Editorial Heading */}
            <motion.div variants={itemVariants}>
              <Heading
                as="h2"
                className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light leading-[1.08] tracking-tight text-[var(--text-primary)]"
              >
                A celebration should feel like yours.
              </Heading>
            </motion.div>

            {/* Supporting Copy */}
            <motion.p
              variants={itemVariants}
              className="body-lg text-[var(--text-secondary)] max-w-xl leading-relaxed font-normal"
            >
              From the first idea to the final farewell, Wedora brings the people,
              details, and decisions behind your wedding into one beautifully
              considered experience.
            </motion.p>

            {/* Subtle Divider Line Accent */}
            <motion.div variants={itemVariants} className="pt-2">
              <div className="w-20 h-[1px] bg-[var(--accent-gold)]/60" />
            </motion.div>
          </div>

          {/* Right Editorial Image Composition with Scroll Parallax */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <motion.div
              style={{ y: imageParallaxY }}
              variants={imageVariants}
              className="relative w-full max-w-md lg:max-w-lg aspect-[3/4] bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-3 lg:p-4 shadow-xs"
            >
              {/* Inner Media Container */}
              <div className="relative w-full h-full overflow-hidden bg-[#F0EBE3]">
                {imageSrc ? (
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-1000 hover:scale-105"
                  />
                ) : (
                  /* High-Fashion Editorial Indian Wedding Visual Graphic Fallback */
                  <div className="w-full h-full bg-gradient-to-tr from-[#E6DFD4] via-[#FAF8F5] to-[#DFD7CA] flex flex-col items-center justify-between p-8 relative">
                    <div className="w-full flex justify-between items-center text-[10px] font-sans tracking-[0.3em] uppercase text-[var(--text-muted)]">
                      <span>Heritage &amp; Craft</span>
                      <span>Vol. 01</span>
                    </div>

                    <div className="my-auto text-center space-y-4">
                      {/* Mandap Silhouette Circle */}
                      <div className="w-20 h-20 rounded-full border border-[var(--accent-gold)]/40 flex items-center justify-center mx-auto bg-[var(--bg-primary)]/80 shadow-xs">
                        <span className="font-serif italic text-3xl text-[var(--accent-gold)] font-light">
                          W
                        </span>
                      </div>
                      <div className="space-y-1">
                        <p className="font-serif italic text-2xl text-[var(--text-primary)]/90 tracking-wide font-light">
                          Intimate Celebrations
                        </p>
                        <p className="caption text-[10px] tracking-[0.25em] text-[var(--text-muted)]">
                          Thoughtfully Curated
                        </p>
                      </div>
                    </div>

                    <div className="w-full text-center text-[9px] font-sans tracking-[0.25em] text-[var(--text-muted)] uppercase border-t border-[var(--border-subtle)] pt-4">
                      Wedora Editorial Portfolio
                    </div>
                  </div>
                )}
              </div>

              {/* Overlapping Micro-label Overlay Badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 1, 0.5, 1] as const }}
                className={cn(
                  "absolute -bottom-5 -left-4 sm:-left-6 z-10",
                  "bg-[var(--bg-card)] border border-[var(--border-subtle)] px-5 py-3 shadow-md"
                )}
              >
                <span className="caption text-[10px] tracking-[0.25em] text-[var(--accent-gold)]">
                  Planned with Intention
                </span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
