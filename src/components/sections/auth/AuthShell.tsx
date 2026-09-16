"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

interface AuthShellProps {
  children: React.ReactNode;
  visualImage?: string;
  visualQuote?: string;
  visualSubtext?: string;
}

export function AuthShell({
  children,
  visualImage = "/images/wedding/wedora-hero-wedding.jpg",
  visualQuote = "YOUR STORY, BEAUTIFULLY CONSIDERED.",
  visualSubtext = "Bring the people, plans, and details behind your celebration into one place.",
}: AuthShellProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="min-h-screen w-full bg-[#FAF8F5] text-[#161514] flex flex-col lg:flex-row font-sans">
      {/* Visual / Editorial Side */}
      <div className="relative w-full lg:w-1/2 min-h-[320px] lg:min-h-screen bg-[#161514] flex flex-col justify-between p-8 sm:p-12 lg:p-16 overflow-hidden">
        {/* Background Image with Dark Translucent Overlay */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={shouldReduceMotion ? { scale: 1, opacity: 0.75 } : { scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.75 }}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
        >
          <Image
            src={visualImage}
            alt="Wedora Celebration Visual"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
            quality={90}
          />
          <div className="absolute inset-0 bg-[#161514]/60" />
        </motion.div>

        {/* Top Branding Link */}
        <div className="relative z-10">
          <Link
            href="/"
            className="inline-block group focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
          >
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.25em] font-light uppercase text-[#FAF8F5] group-hover:text-[#C5A880] transition-colors">
              WEDORA
            </span>
          </Link>
        </div>

        {/* Bottom Editorial Content */}
        <div className="relative z-10 max-w-lg mt-12 lg:mt-0 space-y-4">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#C5A880] mb-2 block">
              WEDORA STUDIO
            </span>
          </motion.div>

          <motion.h2
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.25, 1, 0.5, 1] }}
            className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-[#FAF8F5] leading-tight tracking-tight uppercase"
          >
            {visualQuote}
          </motion.h2>

          <motion.p
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="font-sans text-sm sm:text-base text-[#FAF8F5]/80 font-light leading-relaxed border-l border-[#C5A880]/50 pl-4"
          >
            {visualSubtext}
          </motion.p>
        </div>
      </div>

      {/* Form / Content Side */}
      <div className="w-full lg:w-1/2 min-h-screen bg-[#FAF8F5] flex flex-col justify-center p-6 sm:p-12 lg:p-16 relative">
        <div className="w-full max-w-md mx-auto py-8 lg:py-12">
          {children}
        </div>
      </div>
    </div>
  );
}
