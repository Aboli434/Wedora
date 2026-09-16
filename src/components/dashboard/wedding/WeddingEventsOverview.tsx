"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Calendar, MapPin, Clock } from "lucide-react";
import { WeddingEventSummary } from "@/data/wedding";

interface WeddingEventsOverviewProps {
  events: WeddingEventSummary[];
}

export function WeddingEventsOverview({ events }: WeddingEventsOverviewProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
      className="p-8 bg-[#FAF8F5] border border-[#161514]/15 space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#161514]/15 pb-4">
        <div className="space-y-0.5">
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C5A880]">
            YOUR CELEBRATION
          </span>
          <h3 className="font-serif text-2xl font-light text-[#161514]">
            Four moments, thoughtfully brought together.
          </h3>
        </div>

        <Link
          href="/dashboard/events"
          className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#161514] hover:text-[#C5A880] transition-colors self-start sm:self-auto"
        >
          <span>View all events</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Editorial Timeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((evt) => (
          <div
            key={evt.number}
            className="p-5 bg-[#F3EFEA] border border-[#161514]/12 flex flex-col justify-between space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="font-serif text-2xl text-[#C5A880] font-light">
                {evt.number}
              </span>
              <h4 className="font-serif text-xl font-light text-[#161514] text-right">
                {evt.name}
              </h4>
            </div>

            <div className="pt-2 border-t border-[#161514]/10 space-y-1.5 text-xs font-sans text-[#5A5650]">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{evt.date}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{evt.time}</span>
              </div>

              <div className="flex items-center gap-2 pt-0.5">
                <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{evt.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
