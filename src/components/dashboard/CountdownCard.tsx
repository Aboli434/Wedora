"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Clock } from "lucide-react";
import { CountdownInfo } from "@/data/dashboard";

interface CountdownCardProps {
  countdown: CountdownInfo;
}

export function CountdownCard({ countdown }: CountdownCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
      className="p-8 bg-[#FAF8F5] border border-[#161514]/15 flex flex-col justify-between min-h-[280px]"
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C5A880]">
          COUNTDOWN
        </span>
        <Clock className="w-4 h-4 text-[#C5A880]" />
      </div>

      <div className="my-auto py-6 space-y-1">
        <span className="font-serif text-5xl sm:text-6xl font-light text-[#161514] tracking-tight block">
          {countdown.daysRemaining}{" "}
          <span className="font-serif text-3xl sm:text-4xl text-[#C5A880]">DAYS</span>
        </span>
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#5A5650] block pt-1">
          UNTIL YOUR CELEBRATION
        </span>
      </div>

      <div className="pt-4 border-t border-[#161514]/10">
        <span className="text-[11px] font-sans text-[#5A5650] italic">
          February 14, 2027 • Main Ceremony
        </span>
      </div>
    </motion.div>
  );
}
