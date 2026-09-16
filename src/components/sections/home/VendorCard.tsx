"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { FeaturedVendor } from "@/data/featuredVendors";
import { cn } from "@/lib/utils";

export interface VendorCardProps {
  vendor: FeaturedVendor;
  className?: string;
}

export function VendorCard({ vendor, className }: VendorCardProps) {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] as const },
    },
  };

  return (
    <motion.div variants={cardVariants} className={cn("w-full", className)}>
      <Link
        href={vendor.href}
        className={cn(
          "group relative block w-full p-6 sm:p-8 bg-[var(--bg-primary)] border border-[var(--border-subtle)]",
          "transition-all duration-500 hover:border-[var(--accent-gold)]/50 hover:shadow-xs",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-gold)]"
        )}
      >
        <div className="flex flex-col justify-between h-full space-y-6">
          {/* Header Row: Number + Category Badge + Arrow */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="font-sans text-xs tracking-[0.3em] font-semibold text-[var(--text-muted)] group-hover:text-[var(--accent-gold)] transition-colors duration-300">
                {vendor.number}
              </span>
              <Badge variant="subtle" className="text-[9px] tracking-[0.2em]">
                {vendor.category}
              </Badge>
            </div>

            <div className="w-9 h-9 rounded-full border border-[var(--border-subtle)] group-hover:border-[var(--accent-gold)] flex items-center justify-center text-[var(--text-secondary)] group-hover:text-[var(--accent-gold)] transition-all duration-300">
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </div>

          {/* Main Visual / SVG Fallback Texture */}
          <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-[#EFECE6] border border-[var(--border-subtle)]/50">
            {vendor.imageSrc ? (
              <Image
                src={vendor.imageSrc}
                alt={`${vendor.name} - ${vendor.category}`}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 ease-[0.25,1,0.5,1] group-hover:scale-105"
              />
            ) : (
              /* High-End Architectural Luxury SVG Fallback Texture */
              <div className="w-full h-full bg-gradient-to-tr from-[#E6E0D6] via-[#FAF8F5] to-[#DFD8CC] flex flex-col justify-between p-5 relative">
                <div className="flex justify-between items-center text-[9px] font-sans tracking-[0.25em] text-[var(--text-muted)] uppercase">
                  <span>Wedora Directory</span>
                  <span>{vendor.location}</span>
                </div>

                <div className="my-auto text-center space-y-1">
                  <span className="font-serif italic text-2xl text-[var(--text-primary)]/80">
                    {vendor.name}
                  </span>
                </div>

                <div className="w-full flex justify-between items-center text-[8px] font-sans tracking-[0.2em] text-[var(--accent-gold)] uppercase border-t border-[var(--border-subtle)] pt-2">
                  <span>{vendor.category}</span>
                  <span>View Profile ↗</span>
                </div>
              </div>
            )}
          </div>

          {/* Vendor Details */}
          <div className="space-y-2 pt-2">
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-all duration-300 group-hover:translate-x-1">
                {vendor.name}
              </h3>
            </div>
            <p className="caption text-[10px] tracking-[0.2em] text-[var(--accent-gold)]">
              {vendor.location}
            </p>
            <p className="body-sm text-[var(--text-secondary)] leading-relaxed pt-1">
              {vendor.description}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
