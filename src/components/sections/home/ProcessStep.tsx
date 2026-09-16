"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { ProcessStepItem } from "@/data/howItWorks";
import { cn } from "@/lib/utils";

export interface ProcessStepProps {
  step: ProcessStepItem;
  className?: string;
}

export function ProcessStep({ step, className }: ProcessStepProps) {
  const stepVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] as const },
    },
  };

  return (
    <motion.div
      variants={stepVariants}
      className={cn("group relative flex flex-col justify-between h-full select-none", className)}
    >
      {/* Step Header (Number + Label) */}
      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          {/* Node Marker Dot (for mobile/desktop alignment) */}
          <div className="w-3 h-3 rounded-full border border-[var(--border-medium)] bg-[var(--bg-primary)] group-hover:border-[var(--accent-gold)] group-hover:bg-[var(--accent-gold)] transition-colors duration-300 shadow-xs" />
          <span className="font-sans text-xs tracking-[0.3em] font-semibold text-[var(--text-muted)] group-hover:text-[var(--accent-gold)] transition-colors duration-300">
            {step.number}
          </span>
        </div>

        <span className="caption text-[10px] tracking-[0.25em] text-[var(--accent-gold)] block">
          {step.label}
        </span>
      </div>

      {/* Step Content Box */}
      <div className="pt-4 lg:pt-6 space-y-3">
        <h3 className="font-serif text-2xl lg:text-3xl font-light text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-all duration-300 group-hover:translate-x-1 leading-snug">
          {step.title}
        </h3>
        <p className="body-sm text-[var(--text-secondary)] leading-relaxed">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}
