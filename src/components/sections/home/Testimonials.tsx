"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, Variants, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { TESTIMONIALS_DATA, Testimonial } from "@/data/testimonials";

export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Subtle Parallax Scroll Effect for Dominant Image
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageParallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [25, shouldReduceMotion ? 0 : -25]
  );

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

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] as const },
    },
  };

  const dominantTestimonial = TESTIMONIALS_DATA.find((t) => t.isDominant) || TESTIMONIALS_DATA[0];
  const supportingTestimonials = TESTIMONIALS_DATA.filter((t) => !t.isDominant);

  return (
    <Section
      ref={sectionRef}
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
              Words From The Journey
            </span>
            <Heading
              as="h2"
              className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light leading-[1.08] tracking-tight text-[var(--text-light)]"
            >
              Made for the moments that matter.
            </Heading>
            <p className="body-lg text-[var(--text-muted)] leading-relaxed max-w-2xl pt-2">
              Because the best planning experience is the one that lets you be present
              for the celebration itself.
            </p>
          </motion.div>

          {/* Asymmetric Editorial Layout */}
          <div className="space-y-12 lg:space-y-16">
            {/* Dominant Featured Testimonial Case Feature */}
            {dominantTestimonial && (
              <motion.div
                variants={cardVariants}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#181615] border border-[var(--border-dark)] p-8 sm:p-10 lg:p-12 shadow-2xl"
              >
                {/* Left Quote & Meta */}
                <div className="lg:col-span-7 space-y-6 lg:space-y-8">
                  <div className="space-y-2">
                    <span className="caption text-[10px] tracking-[0.25em] text-[var(--accent-gold)] block">
                      Featured Couple
                    </span>
                    <blockquote className="font-serif italic text-2xl sm:text-3xl lg:text-4xl text-[var(--text-light)]/95 font-light leading-relaxed tracking-wide">
                      &ldquo;{dominantTestimonial.quote}&rdquo;
                    </blockquote>
                  </div>

                  <div className="pt-2 border-t border-[var(--border-dark)] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-sans tracking-[0.2em] text-[var(--text-muted)] uppercase">
                    <div>
                      <span className="font-serif text-lg font-light text-[var(--accent-gold)] capitalize tracking-wide block sm:inline mr-2">
                        {dominantTestimonial.names}
                      </span>
                      <span className="text-[11px] text-[var(--text-muted)]">
                        • {dominantTestimonial.wedding}
                      </span>
                    </div>
                    <span className="text-[10px] text-[var(--accent-gold)]/80">
                      {dominantTestimonial.location}
                    </span>
                  </div>
                </div>

                {/* Right Dominant Editorial Photo Frame */}
                <div className="lg:col-span-5 w-full">
                  <motion.div
                    style={{ y: imageParallaxY }}
                    className="relative w-full aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-[#1D1B18] border border-[var(--border-dark)] shadow-md group"
                  >
                    <Image
                      src={dominantTestimonial.imageSrc}
                      alt={dominantTestimonial.imageAlt}
                      fill
                      unoptimized
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover object-center transition-transform duration-1000 ease-[0.25,1,0.5,1] group-hover:scale-105 filter brightness-[0.95]"
                    />
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Supporting Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {supportingTestimonials.map((testimonial: Testimonial) => (
                <motion.div
                  key={testimonial.id}
                  variants={cardVariants}
                  className="bg-[#181615] border border-[var(--border-dark)] p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-md group hover:border-[var(--accent-gold)]/40 transition-colors duration-500"
                >
                  <div className="space-y-4">
                    <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#1D1B18] border border-[var(--border-dark)]">
                      <Image
                        src={testimonial.imageSrc}
                        alt={testimonial.imageAlt}
                        fill
                        unoptimized
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-center transition-transform duration-1000 ease-[0.25,1,0.5,1] group-hover:scale-105 filter brightness-[0.95]"
                      />
                    </div>

                    <blockquote className="font-serif italic text-lg sm:text-xl text-[var(--text-light)]/90 font-light leading-relaxed">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                  </div>

                  <div className="pt-4 border-t border-[var(--border-dark)] flex items-center justify-between text-xs font-sans tracking-[0.2em] uppercase text-[var(--text-muted)]">
                    <div>
                      <span className="font-serif text-base font-light text-[var(--accent-gold)] capitalize tracking-wide block">
                        {testimonial.names}
                      </span>
                      <span className="text-[10px] text-[var(--text-muted)]">
                        {testimonial.location}
                      </span>
                    </div>
                    <span className="caption text-[9px] tracking-[0.2em] text-[var(--text-muted)]">
                      {testimonial.wedding}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Editorial Footer Note */}
          <motion.div
            variants={headerVariants}
            className="pt-6 border-t border-[var(--border-dark)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans tracking-[0.25em] text-[var(--text-muted)] uppercase"
          >
            <span>Wedora Editorial Stories</span>
            <span>Real Couple Experiences</span>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
