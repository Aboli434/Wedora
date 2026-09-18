"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Tag } from "lucide-react";

export const CalendarPageCTA: React.FC = () => {
  return (
    <section className="mt-16 py-12 px-8 bg-[#161514] text-[#FAF8F5] text-center border border-[#161514]">
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C5A880] block mb-2">
        KEEP THE NEXT CELEBRATION IN SIGHT
      </span>
      <h2 className="font-serif text-2xl md:text-3xl font-medium tracking-tight mb-3">
        From first preparation to final delivery, keep every important moment visible.
      </h2>
      <p className="text-xs md:text-sm text-[#FAF8F5]/70 max-w-xl mx-auto mb-6 leading-relaxed">
        Review active contract dossiers or update your available service packages.
      </p>

      <div className="flex items-center justify-center gap-4 flex-wrap">
        <Link
          href="/vendor/dashboard/bookings"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#C5A880] text-[#161514] text-xs uppercase tracking-wider font-medium hover:bg-[#C5A880]/90 transition-colors"
        >
          <span>View Bookings</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          href="/vendor/dashboard/services"
          className="inline-flex items-center gap-2 px-6 py-3 border border-[#FAF8F5]/30 text-[#FAF8F5] text-xs uppercase tracking-wider font-medium hover:bg-[#FAF8F5]/10 transition-colors"
        >
          <Tag className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>Manage Services</span>
        </Link>
      </div>
    </section>
  );
};
