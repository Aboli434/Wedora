"use client";

import React from "react";
import Link from "next/link";
import { FullVendorDashboardData } from "@/data/vendorDashboard";
import { getVendorDashboardNextAction } from "@/lib/vendorDashboardNextAction";
import { Building2, MapPin, ArrowRight, Sparkles, Tag } from "lucide-react";

interface VendorDashboardCommandCenterProps {
  data: FullVendorDashboardData;
}

export const VendorDashboardCommandCenter: React.FC<
  VendorDashboardCommandCenterProps
> = ({ data }) => {
  const nextAction = getVendorDashboardNextAction(data);
  const hour = new Date().getHours();
  const timeGreeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const firstName = data.profile.ownerName.split(" ")[0];

  return (
    <section aria-label="Vendor Command Center Overview" className="space-y-6">
      {/* Header Greeting & Studio Identity Context */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#161514]/10">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A880] block mb-1 font-sans">
            STUDIO COMMAND CENTER
          </span>
          <h1 className="font-serif text-3xl md:text-5xl text-[#161514] font-normal leading-tight">
            {timeGreeting}, {firstName}
          </h1>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#5A5650] mt-2 font-sans">
            <span className="flex items-center gap-1.5 font-medium text-[#161514]">
              <Building2 className="w-3.5 h-3.5 text-[#C5A880]" />
              {data.profile.businessName}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-[#C5A880]" />
              {data.profile.category}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
              {data.profile.location}
            </span>
          </div>
        </div>

        <Link
          href={`/vendors/${data.profile.publicSlug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium uppercase tracking-wider text-[#5A5650] hover:text-[#161514] underline self-start md:self-end"
        >
          View Public Directory Profile →
        </Link>
      </div>

      {/* Prominent Single Next Action Card */}
      <div className="bg-[#161514] text-[#FAF8F5] rounded-sm p-6 sm:p-8 relative overflow-hidden shadow-md">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C5A880]/15 border border-[#C5A880]/30 rounded-xs text-[10px] uppercase tracking-[0.2em] font-semibold text-[#C5A880]">
              <Sparkles className="w-3 h-3" />
              STUDIO NEXT ACTION
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
