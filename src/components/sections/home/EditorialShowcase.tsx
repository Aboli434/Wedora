"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, MapPin, Tag } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { REAL_WEDDINGS_DATA } from "@/data/realWeddings";

export function EditorialShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Filter only the first two stories for a restrained editorial layout: Aditi & Arjun, Meera & Rohan
  const showcaseStories = REAL_WEDDINGS_DATA.slice(0, 2);

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
        staggerChildren: 0.16,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] as const },
    },
  };

  return (
    <Section
      ref={sectionRef}
      padding="xl"
      className="bg-[var(--bg-primary)] text-[var(--text-primary)] relative overflow-hidden border-t border-[var(--border-subtle)]"
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
          <motion.div variants={itemVariants} className="max-w-3xl space-y-4">
            <span className="caption tracking-[0.25em] text-[var(--accent-gold)]">
              EXPLORE WEDORA
            </span>
            <Heading
              as="h2"
              className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light leading-[1.08] tracking-tight text-[var(--text-primary)]"
            >
              Stories, places, and people worth discovering.
            </Heading>
            <p className="body-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl pt-2">
              Step inside celebrations that inspire, and discover the creative partners who help bring them to life.
            </p>
          </motion.div>

          {/* Part A: Two Featured Wedding Stories Editorial Composition */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
            {showcaseStories.map((story) => (
              <motion.article
                key={story.id}
                variants={itemVariants}
                className="group flex flex-col justify-between space-y-6 bg-white border border-[var(--border-subtle)] p-4 sm:p-6 shadow-xs hover:shadow-md transition-shadow duration-300"
              >
                {/* Image Frame */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#F0EBE3]">
                  <Image
                    src={story.imageSrc}
                    alt={story.imageAlt}
                    fill
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  
                  {/* Setting Tag Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="caption text-[10px] tracking-[0.2em] text-[#FAF8F5] bg-[#161514]/80 px-3 py-1 border border-[#FAF8F5]/20 backdrop-blur-xs">
                      {story.setting}
                    </span>
                  </div>
                </div>

                {/* Story Content */}
                <div className="space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                      <span className="flex items-center gap-1 font-sans">
                        <MapPin className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                        {story.location}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 font-sans">
                        <Tag className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                        {story.style}
                      </span>
                    </div>

                    <h3 className="font-serif text-3xl font-light text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors">
                      {story.couple}
                    </h3>
                    
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-sans line-clamp-2">
                      {story.description}
                    </p>
                  </div>

                  {/* Story CTA Link */}
                  <div className="pt-4 border-t border-[var(--border-subtle)]">
                    <Link
                      href={`/real-weddings/${story.slug}`}
                      className="inline-flex items-center text-xs uppercase tracking-[0.2em] font-sans font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors"
                    >
                      <span>View story</span>
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Part B: Subtle Vendor Discovery Prompt Block */}
          <motion.div
            style={{ y: parallaxY }}
            variants={itemVariants}
            className="p-8 sm:p-12 bg-[#FAF8F5] border border-[var(--border-subtle)] relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8"
          >
            <div className="space-y-3 max-w-2xl">
              <span className="caption text-[10px] tracking-[0.25em] text-[var(--accent-gold)] uppercase block font-semibold">
                CURATED CREATIVE PARTNERS
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-light text-[var(--text-primary)]">
                Looking for the people behind the celebration?
              </h3>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] font-sans leading-relaxed">
                Explore photographers, planners, designers, venues, caterers, and more who share Wedora&apos;s commitment to craft and intention.
              </p>
            </div>

            <div className="shrink-0">
              <Link
                href="/vendors"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#161514] text-[#FAF8F5] text-xs font-medium tracking-widest uppercase hover:bg-[#2c2927] transition-colors rounded-sm shadow-xs group"
              >
                <span>Explore the vendor directory</span>
                <ArrowRight className="w-4 h-4 text-[var(--accent-gold)] transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
