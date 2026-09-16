"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Activity, Clock } from "lucide-react";
import { ActivityItem } from "@/data/dashboard";

interface RecentActivityProps {
  activities: ActivityItem[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
      className="p-8 bg-[#FAF8F5] border border-[#161514]/15 space-y-6"
    >
      <div className="flex items-center justify-between border-b border-[#161514]/15 pb-4">
        <div className="space-y-0.5">
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C5A880]">
            UPDATE LOG
          </span>
          <h3 className="font-serif text-2xl font-light text-[#161514]">
            Recent Activity
          </h3>
        </div>

        <Activity className="w-5 h-5 text-[#C5A880]" />
      </div>

      <div className="space-y-4">
        {activities.map((act) => (
          <div
            key={act.id}
            className="flex items-start justify-between gap-4 p-3 bg-[#F3EFEA] border border-[#161514]/10"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-semibold tracking-wider uppercase text-[#C5A880] block">
                {act.category}
              </span>
              <p className="text-xs font-sans text-[#161514] font-medium leading-snug">
                {act.title}
              </p>
            </div>

            <div className="flex items-center gap-1 text-[11px] text-[#5A5650] whitespace-nowrap pt-0.5">
              <Clock className="w-3 h-3 text-[#C5A880]" />
              <span>{act.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
