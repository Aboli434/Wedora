"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export interface HeroMediaProps {
  desktopVideoSrc?: string;
  mobileImageSrc?: string;
  fallbackImageSrc?: string;
}

export function HeroMedia({
  desktopVideoSrc,
  mobileImageSrc = "/images/wedding/wedora-hero-wedding.jpg",
  fallbackImageSrc = "/images/wedding/wedora-hero-wedding.jpg",
}: HeroMediaProps) {
  const [videoError, setVideoError] = useState<boolean>(false);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const shouldReduceMotion = useReducedMotion();

  // Subtle Parallax Effect on Scroll
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 800], [0, shouldReduceMotion ? 0 : 120]);

  const showVideo = Boolean(desktopVideoSrc) && !videoError && !isMobile;
  const activeImageSrc = isMobile && mobileImageSrc ? mobileImageSrc : fallbackImageSrc;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none">
      {/* Media Background with scale entrance & scroll parallax */}
      <motion.div
        style={{ y: parallaxY }}
        initial={{ scale: shouldReduceMotion ? 1 : 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] as const }}
        className="relative w-full h-[115%]"
      >
        {showVideo ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            onError={() => setVideoError(true)}
            className="w-full h-full object-cover object-center"
          >
            <source src={desktopVideoSrc} type="video/mp4" />
          </video>
        ) : (
          <div className="w-full h-full relative bg-[#141312]">
            {activeImageSrc ? (
              <Image
                src={activeImageSrc}
                alt="Wedora Indian Luxury Wedding Celebration"
                fill
                priority
                unoptimized
                className="object-cover object-center"
              />
            ) : (
              /* High-End Indian Wedding Editorial Graphic Fallback Texture */
              <div className="w-full h-full bg-gradient-to-br from-[#221f1b] via-[#161514] to-[#0d0c0b] flex items-center justify-center relative">
                {/* Mandap / Heritage Architectural Pattern Backdrop */}
                <svg
                  className="w-full h-full opacity-25 text-[var(--accent-gold)]"
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                >
                  <defs>
                    <pattern
                      id="hero-heritage-grid"
                      width="100"
                      height="100"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 50 0 L 100 50 L 50 100 L 0 50 Z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="0.5"
                      />
                      <circle cx="50" cy="50" r="3" fill="currentColor" opacity="0.4" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#hero-heritage-grid)" />
                </svg>

                {/* Subtle Central Editorial Stamp */}
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2 pointer-events-none">
                  <span className="caption text-[10px] tracking-[0.4em] text-[var(--accent-gold)]/60 uppercase">
                    Wedora Production
                  </span>
                  <span className="font-serif italic text-3xl sm:text-4xl text-[var(--accent-gold)]/20 font-light">
                    The Art of Celebration
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* Editorial Dark Solid Overlay for Visual Balance & Readability */}
      <div className="absolute inset-0 bg-[#141312]/60 pointer-events-none" />
    </div>
  );
}
