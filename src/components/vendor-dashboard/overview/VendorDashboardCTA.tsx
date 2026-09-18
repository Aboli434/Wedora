"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function VendorDashboardCTA() {
  return (
    <section className="bg-[#161514] text-[#FAF8F5] rounded-xl p-8 md:p-10 space-y-6 relative overflow-hidden border border-[#2C2A28]">
      <div className="space-y-2 max-w-2xl relative z-10">
        <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold block">
          YOUR WORK, YOUR WAY
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-light text-[#FAF8F5] leading-tight">
          Keep your business ready for the next celebration.
        </h2>
        <p className="text-sm text-[#A39C93] leading-relaxed pt-1">
          Keep your profile current, respond thoughtfully, and make it easy for couples to understand what you create.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4 relative z-10 pt-2">
        <Link
          href="/vendor/dashboard/business"
          className="px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-[#161514] bg-[#C5A880] hover:bg-[#d5b991] transition-colors rounded-md shadow-sm"
        >
          Update Profile
        </Link>

        <Link
          href="/vendors/the-frame-house"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-[#EAE6DF] border border-[#A39C93]/30 hover:border-[#EAE6DF] hover:bg-[#242220] transition-all rounded-md"
        >
          <span>View Public Profile</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A880]" />
        </Link>
      </div>
    </section>
  );
}
