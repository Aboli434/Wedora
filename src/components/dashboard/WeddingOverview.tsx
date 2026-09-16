"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Calendar, Sparkles } from "lucide-react";
import { WeddingIdentity } from "@/data/dashboard";

interface WeddingOverviewProps {
  identity: WeddingIdentity;
}

export function WeddingOverview({ identity }: WeddingOverviewProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      className="relative overflow-hidden bg-[#161514] text-[#FAF8F5] p-8 sm:p-10 border border-[#161514]/20 flex flex-col justify-between min-h-[280px]"
    >
      {/* Background Image with Translucent Dark Overlay */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Image
          src={identity.coverImage}
          alt={identity.coupleNames}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#161514]/65" />
      </div>

      {/* Top Meta Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
        <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C5A880]">
          WEDDING OVERVIEW
        </span>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF8F5]/10 border border-[#C5A880]/40 text-[10px] font-semibold tracking-[0.2em] uppercase text-[#C5A880]">
          <Sparkles className="w-3 h-3" />
          <span>{identity.style}</span>
        </span>
      </div>

      {/* Main Editorial Content */}
      <div className="relative z-10 my-6 space-y-2">
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#FAF8F5]">
          {identity.coupleNames}
        </h2>

        <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-sans text-[#FAF8F5]/80">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>{identity.weddingDate}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>{identity.location}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
