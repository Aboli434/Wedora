"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Zap } from "lucide-react";
import { QuickActionItem } from "@/data/dashboard";

interface QuickActionsProps {
  actions: QuickActionItem[];
}

export function QuickActions({ actions }: QuickActionsProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.45, ease: [0.25, 1, 0.5, 1] }}
      className="p-8 bg-[#FAF8F5] border border-[#161514]/15 space-y-6"
    >
      <div className="flex items-center justify-between border-b border-[#161514]/15 pb-4">
        <div className="space-y-0.5">
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C5A880]">
            SHORTCUTS
          </span>
          <h3 className="font-serif text-2xl font-light text-[#161514]">
            Quick Actions
          </h3>
        </div>

        <Zap className="w-5 h-5 text-[#C5A880]" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {actions.map((act) => (
          <Link
            key={act.id}
            href={act.href}
            className="flex items-center justify-between p-4 bg-[#F3EFEA] border border-[#161514]/15 text-xs font-semibold tracking-wider uppercase text-[#161514] hover:bg-[#161514] hover:text-[#FAF8F5] transition-colors group"
          >
            <span>{act.label}</span>
            <ArrowUpRight className="w-4 h-4 text-[#C5A880] group-hover:text-[#FAF8F5] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
