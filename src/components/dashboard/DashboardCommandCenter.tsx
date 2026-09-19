"use client";

import React from "react";
import Link from "next/link";
import { ClientDashboardData } from "@/data/dashboard";
import { getDashboardNextAction } from "@/lib/dashboardNextAction";
import { Calendar, MapPin, ArrowRight, Sparkles } from "lucide-react";

interface DashboardCommandCenterProps {
  data: ClientDashboardData;
}

export const DashboardCommandCenter: React.FC<DashboardCommandCenterProps> = ({
  data,
}) => {
  const nextAction = getDashboardNextAction(data);
  const hour = new Date().getHours();
  const timeGreeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <section aria-label="Command Center Overview" className="space-y-6">
      {/* Top Greeting & Subtitle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#161514]/10">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A880] block mb-1">
            CLIENT COMMAND CENTER
          </span>
          <h1 className="font-serif text-3xl md:text-5xl text-[#161514] font-normal leading-tight">
            {timeGreeting}, {data.identity.coupleNames}
          </h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#5A5650] mt-2 font-sans">
            <span className="flex items-center gap-1.5 font-medium text-[#161514]">
              <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
              {data.countdown.daysRemaining} days until your celebration
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
              {data.identity.location} ({data.identity.weddingDate})
            </span>
          </div>
        </div>
      </div>

      {/* Prominent Next Step Card */}
      <div className="bg-[#161514] text-[#FAF8F5] rounded-sm p-6 sm:p-8 relative overflow-hidden shadow-md">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C5A880]/15 border border-[#C5A880]/30 rounded-xs text-[10px] uppercase tracking-[0.2em] font-semibold text-[#C5A880]">
              <Sparkles className="w-3 h-3" />
              NEXT RECOMMENDED STEP
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-light leading-snug">
              {nextAction.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#FAF8F5]/80 font-sans leading-relaxed max-w-xl">
              {nextAction.description}
            </p>
          </div>

          <div className="shrink-0 pt-2 md:pt-0">
            <Link
              href={nextAction.ctaHref}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#C5A880] text-[#161514] text-xs font-semibold tracking-widest uppercase hover:bg-[#d4b993] transition-colors rounded-sm shadow-xs group"
            >
              <span>{nextAction.ctaLabel}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
