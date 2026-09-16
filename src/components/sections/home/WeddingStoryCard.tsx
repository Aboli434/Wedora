"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FeaturedWedding } from "@/data/featuredWeddings";
import { cn } from "@/lib/utils";

export interface WeddingStoryCardProps {
  wedding: FeaturedWedding;
  className?: string;
}

export function WeddingStoryCard({ wedding, className }: WeddingStoryCardProps) {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] as const },
    },
  };

  const isFeatured = wedding.isFeatured;

  return (
    <motion.div variants={cardVariants} className={cn("w-full h-full", className)}>
      <Link
        href={wedding.href}
        className="group relative flex flex-col h-full bg-[var(--bg-dark)] border border-[var(--border-dark)] overflow-hidden focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-gold)]"
      >
        {/* Image Frame Container */}
        <div
          className={cn(
            "relative w-full overflow-hidden bg-[#1D1B18]",
            isFeatured ? "aspect-[16/10] sm:aspect-[16/9]" : "aspect-[4/3]"
          )}
        >
          {wedding.imageSrc ? (
            <Image
              src={wedding.imageSrc}
              alt={`${wedding.title} - ${wedding.location}`}
              fill
              unoptimized
              sizes={
                isFeatured
                  ? "(max-width: 1024px) 100vw, 100vw"
                  : "(max-width: 1024px) 100vw, 50vw"
              }
              className="object-cover object-center transition-transform duration-1000 ease-[0.25,1,0.5,1] group-hover:scale-105"
            />
          ) : (
            /* High-End Architectural Luxury SVG Fallback Texture */
            <div className="w-full h-full bg-gradient-to-br from-[#22201D] via-[#161514] to-[#0D0C0B] flex flex-col justify-between p-6 sm:p-8 relative">
              <div className="flex justify-between items-center text-[10px] font-sans tracking-[0.25em] text-[var(--accent-gold)] uppercase">
                <span>{wedding.style}</span>
                <span>Editorial Case Study</span>
              </div>

              <div className="my-auto space-y-2 text-center">
                <span className="font-serif italic text-3xl sm:text-5xl text-[var(--text-light)]/90 tracking-wide font-light">
                  {wedding.title}
                </span>
                <p className="caption text-[11px] text-[var(--text-muted)] tracking-[0.2em]">
                  {wedding.location}
                </p>
              </div>

              <div className="w-full flex justify-between items-center text-[9px] font-sans tracking-[0.2em] text-[var(--text-muted)] uppercase border-t border-[var(--border-dark)] pt-4">
                <span>Wedora Archives</span>
                <span>View Story ↗</span>
              </div>
            </div>
          )}

          {/* Editorial Gradient Overlay for Hover Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-dark)] via-[var(--bg-dark)]/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none" />
        </div>

        {/* Content Box */}
        <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="caption text-[10px] tracking-[0.25em] text-[var(--accent-gold)]">
                {wedding.style}
              </span>
              <span className="caption text-[11px] text-[var(--text-muted)] tracking-wider">
                {wedding.location}
              </span>
            </div>

            <h3
              className={cn(
                "font-serif font-light text-[var(--text-light)] group-hover:text-[var(--accent-gold)] transition-colors duration-300",
                isFeatured ? "text-3xl sm:text-4xl lg:text-5xl" : "text-2xl sm:text-3xl"
              )}
            >
              {wedding.title}
            </h3>

            <p className="body-sm text-[var(--text-muted)] leading-relaxed max-w-xl">
              {wedding.description}
            </p>
          </div>

          <div className="pt-2 flex items-center space-x-2 text-xs font-sans tracking-[0.2em] uppercase text-[var(--text-light)]/90 group-hover:text-[var(--accent-gold)] transition-colors duration-300">
            <span>View Story</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
