"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Calendar, MapPin, Sparkles } from "lucide-react";
import { WeddingProfile } from "@/data/wedding";

interface WeddingProfileHeroProps {
  profile: WeddingProfile;
}

export function WeddingProfileHero({ profile }: WeddingProfileHeroProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      className="bg-[#FAF8F5] border border-[#161514]/15 overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch"
    >
      {/* Image Side (55% desktop width) */}
      <div className="relative lg:col-span-7 min-h-[260px] sm:min-h-[320px] bg-[#161514] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={shouldReduceMotion ? { scale: 1, opacity: 0.9 } : { scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.9 }}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
        >
          <Image
            src={profile.coverImage}
            alt={profile.couple.coupleNames}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#161514]/40" />
        </motion.div>
      </div>

      {/* Content Side (45% desktop width) */}
      <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6 bg-[#FAF8F5]">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C5A880]">
              WEDDING PROFILE
            </span>

            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F3EFEA] border border-[#161514]/10 text-[9px] font-semibold tracking-[0.2em] uppercase text-[#C5A880]">
              <Sparkles className="w-3 h-3" />
              <span>{profile.style}</span>
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#161514] tracking-tight leading-[1.12]">
            {profile.couple.coupleNames}
          </h2>

          <p className="font-sans text-xs sm:text-sm text-[#5A5650] font-light leading-relaxed">
            A celebration of heritage and quiet luxury in Rajasthan.
          </p>
        </div>

        {/* Date & Location Footnote */}
        <div className="pt-6 border-t border-[#161514]/15 space-y-2.5 text-xs font-sans text-[#161514]">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#C5A880]" />
            <span className="font-medium">{profile.weddingDate}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#C5A880]" />
            <span className="font-medium">{profile.destination}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
