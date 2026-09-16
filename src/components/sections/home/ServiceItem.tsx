"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ServicePillar } from "@/data/services";
import { cn } from "@/lib/utils";

export interface ServiceItemProps {
  service: ServicePillar;
  isFirst?: boolean;
}

export function ServiceItem({ service, isFirst = false }: ServiceItemProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const rowVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] as const },
    },
  };

  return (
    <motion.div variants={rowVariants}>
      <Link
        href={service.href}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          "group relative block w-full py-8 sm:py-10 md:py-12 transition-all duration-500",
          "border-b border-[var(--border-subtle)] hover:bg-[var(--bg-primary)]/60 focus-visible:outline-none focus-visible:bg-[var(--bg-primary)]/80",
          isFirst && "border-t border-[var(--border-subtle)]",
          isFocused && "border-[var(--accent-gold)] bg-[var(--bg-primary)]/80"
        )}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
          {/* Column 1: Number (md:col-span-2) */}
          <div className="md:col-span-2 flex items-center justify-between md:block">
            <span className="font-sans text-xs sm:text-sm tracking-[0.3em] font-semibold text-[var(--text-muted)] group-hover:text-[var(--accent-gold)] group-focus:text-[var(--accent-gold)] transition-colors duration-300">
              {service.number}
            </span>
            <div className="md:hidden text-[var(--text-muted)] group-hover:text-[var(--accent-gold)] transition-colors duration-300">
              <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </div>

          {/* Column 2: Title & Description (md:col-span-6 lg:col-span-7) */}
          <div className="md:col-span-6 lg:col-span-7 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] group-focus:text-[var(--accent-gold)] transition-all duration-300 group-hover:translate-x-1">
                {service.title}
              </h3>
              <Badge variant="subtle" className="text-[9px] tracking-[0.2em] opacity-80">
                {service.label}
              </Badge>
            </div>
            <p className="body-md text-[var(--text-secondary)] max-w-2xl leading-relaxed">
              {service.description}
            </p>

            {/* Mobile Visual Preview (Visible on screens < 768px) */}
            {service.imageSrc && (
              <div className="mt-4 md:hidden relative w-full h-48 overflow-hidden bg-[#E8E2D8] border border-[var(--border-subtle)] shadow-xs">
                <Image
                  src={service.imageSrc}
                  alt={service.imageAlt || service.title}
                  fill
                  unoptimized
                  sizes="(max-width: 767px) 100vw, 300px"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            )}
          </div>

          {/* Column 3: Interactive Visual Preview & Arrow (md:col-span-4 lg:col-span-3) */}
          <div className="hidden md:flex md:col-span-4 lg:col-span-3 justify-end items-center space-x-4">
            {/* Visual Hover/Focus Image Preview Box */}
            <div className="relative w-40 h-24 overflow-hidden bg-[#E8E2D8] border border-[var(--border-subtle)] shadow-xs opacity-85 group-hover:opacity-100 transition-all duration-500 group-hover:border-[var(--accent-gold)]">
              {service.imageSrc ? (
                <Image
                  src={service.imageSrc}
                  alt={service.imageAlt || service.title}
                  fill
                  unoptimized
                  sizes="160px"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                /* High-End Architectural Graphic Fallback */
                <div className="w-full h-full bg-gradient-to-br from-[#E6E0D4] via-[#FAF8F5] to-[#DDD6C8] flex flex-col items-center justify-center p-2 text-center">
                  <span className="font-serif italic text-sm text-[var(--text-primary)]/80 font-light">
                    {service.label}
                  </span>
                  <span className="caption text-[7px] tracking-[0.2em] text-[var(--accent-gold)] uppercase mt-0.5">
                    Wedora Pillar
                  </span>
                </div>
              )}
            </div>

            {/* Desktop Arrow Indicator Circle */}
            <div className="w-12 h-12 rounded-full border border-[var(--border-subtle)] group-hover:border-[var(--accent-gold)] group-focus:border-[var(--accent-gold)] flex items-center justify-center text-[var(--text-secondary)] group-hover:text-[var(--accent-gold)] transition-all duration-300 group-hover:bg-[var(--bg-primary)]">
              <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
