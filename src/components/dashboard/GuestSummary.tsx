"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";
import { GuestSummaryData } from "@/data/dashboard";

interface GuestSummaryProps {
  guests: GuestSummaryData;
}

export function GuestSummary({ guests }: GuestSummaryProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
      className="p-8 bg-[#FAF8F5] border border-[#161514]/15 space-y-6 flex flex-col justify-between"
    >
      <div className="flex items-center justify-between border-b border-[#161514]/15 pb-4">
        <div className="space-y-0.5">
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C5A880]">
            ATTENDANCE
          </span>
          <h3 className="font-serif text-2xl font-light text-[#161514]">
            Guest Summary
          </h3>
        </div>

        <Users className="w-5 h-5 text-[#C5A880]" />
      </div>

      <div className="space-y-4">
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-[#5A5650] block">
            TOTAL GUEST LIST
          </span>
          <span className="font-serif text-4xl font-light text-[#161514]">
            {guests.totalInvited} INVITED
          </span>
        </div>

        {/* 3-Stat Counters */}
        <div className="grid grid-cols-3 gap-3 pt-2 text-center">
          <div className="p-3 bg-[#F3EFEA] border border-[#161514]/10 space-y-1">
            <span className="text-[10px] font-semibold tracking-wider uppercase text-[#5A5650]">
              CONFIRMED
            </span>
            <span className="font-serif text-2xl font-light text-[#161514] block">
              {guests.confirmed}
            </span>
          </div>

          <div className="p-3 bg-[#F3EFEA] border border-[#161514]/10 space-y-1">
            <span className="text-[10px] font-semibold tracking-wider uppercase text-[#5A5650]">
              PENDING
            </span>
            <span className="font-serif text-2xl font-light text-[#C5A880] block">
              {guests.pending}
            </span>
          </div>

          <div className="p-3 bg-[#F3EFEA] border border-[#161514]/10 space-y-1">
            <span className="text-[10px] font-semibold tracking-wider uppercase text-[#5A5650]">
              DECLINED
            </span>
            <span className="font-serif text-2xl font-light text-[#5A5650] block">
              {guests.declined}
            </span>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-[#161514]/15 flex items-center justify-between">
        <Link
          href="/dashboard/guests"
          className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#161514] hover:text-[#C5A880] transition-colors"
        >
          <span>Manage guests</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </motion.div>
  );
}
