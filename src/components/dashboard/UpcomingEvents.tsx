"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import { WeddingEvent } from "@/data/dashboard";

interface UpcomingEventsProps {
  events: WeddingEvent[];
}

export function UpcomingEvents({ events }: UpcomingEventsProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
      className="p-8 bg-[#FAF8F5] border border-[#161514]/15 space-y-6"
    >
      <div className="flex items-center justify-between border-b border-[#161514]/15 pb-4">
        <div className="space-y-0.5">
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C5A880] block">
            ITINERARY
          </span>
          <h3 className="font-serif text-2xl font-light text-[#161514]">
            Upcoming Events
          </h3>
        </div>

        <Link
          href="/dashboard/events"
          className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#161514] hover:text-[#C5A880] transition-colors"
        >
          <span>View all</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Timeline List */}
      <div className="space-y-4">
        {events.map((evt, idx) => (
          <div
            key={evt.id}
            className={`p-4 transition-colors border-l-2 ${
              idx === 0
                ? "border-[#C5A880] bg-[#F3EFEA]"
                : "border-[#161514]/20 bg-[#FAF8F5] hover:bg-[#F3EFEA]/50"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-1">
                <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#C5A880]">
                  {evt.status}
                </span>
                <h4 className="font-serif text-lg font-light text-[#161514]">
                  {evt.name}
                </h4>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-[#5A5650]">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>{evt.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>{evt.time}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-[#5A5650] mt-2 pt-2 border-t border-[#161514]/10">
              <MapPin className="w-3 h-3 text-[#C5A880]" />
              <span>{evt.location}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
