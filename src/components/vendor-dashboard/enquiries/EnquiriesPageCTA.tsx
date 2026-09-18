"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export const EnquiriesPageCTA: React.FC = () => {
  return (
    <section className="mt-16 py-12 px-8 bg-[#161514] text-[#FAF8F5] text-center border border-[#161514]">
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C5A880] block mb-2">
        READY FOR THE NEXT CONVERSATION
      </span>
      <h2 className="font-serif text-2xl md:text-3xl font-medium tracking-tight mb-3">
        Make every enquiry feel considered.
      </h2>
      <p className="text-xs md:text-sm text-[#FAF8F5]/70 max-w-xl mx-auto mb-6 leading-relaxed">
        Keep the details close, respond thoughtfully, and turn the right conversations into lasting work.
      </p>
      <Link
        href="/vendors/the-frame-house"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 bg-[#C5A880] text-[#161514] text-xs uppercase tracking-wider font-medium hover:bg-[#C5A880]/90 transition-colors"
      >
        <span>View Public Profile</span>
        <ExternalLink className="w-3.5 h-3.5" />
      </Link>
    </section>
  );
};
