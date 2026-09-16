"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { GALLERY_DATA, GalleryItem } from "@/data/gallery";
import { cn } from "@/lib/utils";

export function Gallery() {
  const shouldReduceMotion = useReducedMotion();

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

  const imageCardVariants: Variants = {
    hidden: { opacity: 0, y: 35, scale: shouldReduceMotion ? 1 : 1.04 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.9, ease: [0.25, 1, 0.5, 1] as const },
    },
  };

  return (
    <Section
      padding="xl"
      className="bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-[100svh] flex items-center relative overflow-hidden"
    >
      <Container size="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-14 lg:space-y-16"
        >
          {/* Header Row: Copy & Action */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <motion.div variants={headerVariants} className="max-w-2xl space-y-4">
              <span className="caption tracking-[0.25em] text-[var(--accent-gold)]">
                The Wedora Gallery
              </span>
              <Heading
                as="h2"
                className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light leading-[1.08] tracking-tight text-[var(--text-primary)]"
              >
                Moments worth remembering.
              </Heading>
              <p className="body-lg text-[var(--text-secondary)] leading-relaxed max-w-xl pt-1">
                A glimpse into the celebrations, details, and fleeting moments that make
                every wedding uniquely yours.
              </p>
            </motion.div>

            <motion.div variants={headerVariants} className="pt-2 md:pt-0 shrink-0">
              <Link href="/gallery">
                <Button variant="outline" size="lg" className="group">
                  <span>View Full Gallery</span>
                  <ArrowUpRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Asymmetric Editorial Masonry CSS Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            {GALLERY_DATA.map((item: GalleryItem) => (
              <motion.div
                key={item.id}
                variants={imageCardVariants}
                className={cn("w-full relative group", item.spanClass)}
              >
                <Link
                  href="/gallery"
                  className="group relative block w-full h-full overflow-hidden bg-[#E8E2D8] border border-[var(--border-subtle)] shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-gold)]"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                    className="object-cover object-center transition-transform duration-1000 ease-[0.25,1,0.5,1] group-hover:scale-[1.04]"
                  />

                  {/* Solid Editorial Overlay */}
                  <div className="absolute inset-0 bg-[#161514]/30 group-hover:bg-[#161514]/50 transition-colors duration-500 pointer-events-none" />

                  {/* Category & Location Badges Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex flex-col justify-end text-white transition-all duration-300 group-hover:translate-y-0">
                    <div className="flex items-center justify-between text-xs font-sans tracking-[0.2em] uppercase">
                      <span className="caption text-[10px] tracking-[0.25em] text-[var(--accent-gold)] bg-[#161514] px-3 py-1 border border-[var(--accent-gold)]/40 shadow-xs">
                        {item.category}
                      </span>
                      {item.location && (
                        <span className="text-[10px] text-[var(--text-light)]/80 tracking-wider">
                          {item.location}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Editorial Footer Note */}
          <motion.div
            variants={headerVariants}
            className="pt-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans tracking-[0.25em] text-[var(--text-muted)] uppercase"
          >
            <span>Wedora Editorial Archive</span>
            <span>Curated Wedding Photography</span>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
