"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const ALLOCATION_ITEMS = [
  { label: "Venue & Hospitality", percentage: 35, color: "bg-[var(--accent-gold)]" },
  { label: "Catering & Culinary", percentage: 25, color: "bg-[#D9C4A9]" },
  { label: "Decor & Production", percentage: 15, color: "bg-[#B8A388]" },
  { label: "Photography & Film", percentage: 10, color: "bg-[#96846C]" },
  { label: "Other & Contingency", percentage: 15, color: "bg-[#6E604F]" },
];

export interface BudgetVisualProps {
  className?: string;
}

export function BudgetVisual({ className }: BudgetVisualProps) {
  const panelVariants: Variants = {
    hidden: { opacity: 0, scale: 0.96 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.9, ease: [0.25, 1, 0.5, 1] as const },
    },
  };

  return (
    <motion.div
      variants={panelVariants}
      className={cn(
        "w-full max-w-lg mx-auto bg-[#1A1817] border border-[var(--border-dark)] p-6 sm:p-8 space-y-6 shadow-xl select-none",
        className
      )}
    >
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-[var(--border-dark)] pb-4">
        <span className="caption text-[9px] tracking-[0.25em] text-[var(--accent-gold)]">
          Illustrative Estimate
        </span>
        <span className="caption text-[9px] tracking-[0.2em] text-[var(--text-muted)]">
          Est. 2026
        </span>
      </div>

      {/* Primary Figure */}
      <div className="space-y-1">
        <span className="caption text-[10px] tracking-[0.2em] text-[var(--text-muted)] block">
          Estimated Starting Point
        </span>
        <div className="font-serif text-4xl sm:text-5xl tracking-tight text-[var(--text-light)] font-light">
          ₹ 18,50,000
        </div>
      </div>

      {/* Allocation Progress Bars */}
      <div className="space-y-4 pt-2">
        <span className="caption text-[9px] tracking-[0.2em] text-[var(--accent-gold)] block">
          Category Allocation Breakdown
        </span>

        <div className="space-y-3">
          {ALLOCATION_ITEMS.map((item) => (
            <div key={item.label} className="space-y-1.5">
              <div className="flex justify-between text-xs font-sans tracking-wider text-[var(--text-light)]/90">
                <span>{item.label}</span>
                <span className="text-[var(--accent-gold)] font-medium">
                  {item.percentage}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#2A2825] rounded-none overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.percentage}%` }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1,
                    delay: 0.2,
                    ease: [0.25, 1, 0.5, 1] as const,
                  }}
                  className={cn("h-full", item.color)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Disclaimer */}
      <div className="pt-4 border-t border-[var(--border-dark)] flex items-center justify-between text-[9px] font-sans tracking-[0.2em] text-[var(--text-muted)] uppercase">
        <span>Example Allocation</span>
        <span>For Planning Clarity</span>
      </div>
    </motion.div>
  );
}
