"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink, Sparkles, Filter } from "lucide-react";

interface EnquiriesPageHeaderProps {
  onFilterNew: () => void;
}

export const EnquiriesPageHeader: React.FC<EnquiriesPageHeaderProps> = ({
  onFilterNew,
}) => {
  return (
    <header className="mb-10 pb-8 border-b border-[#161514]/10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex items-center space-x-2 text-xs uppercase tracking-widest text-[#5A5650]">
          <li>
            <Link
              href="/vendor/dashboard"
              className="hover:text-[#161514] transition-colors"
            >
              Vendor Studio
            </Link>
          </li>
          <li>/</li>
          <li className="font-semibold text-[#161514]" aria-current="page">
            Enquiries
          </li>
        </ol>
      </nav>

      {/* Header main content */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A880] block mb-1">
            ENQUIRIES
          </span>
          <h1 className="font-serif text-3xl md:text-4xl text-[#161514] font-medium tracking-tight mb-2">
            Turn interest into conversations.
          </h1>
          <p className="text-[#5A5650] max-w-2xl text-sm md:text-base leading-relaxed">
            Keep every couple, date, question, and next step in one considered workspace.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          <button
            onClick={onFilterNew}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#161514] text-[#FAF8F5] text-xs uppercase tracking-wider font-medium hover:bg-[#161514]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:ring-offset-2"
          >
            <Filter className="w-3.5 h-3.5 text-[#C5A880]" />
            View New Enquiries
          </button>
          <Link
            href="/vendors/the-frame-house"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#161514]/20 text-[#161514] text-xs uppercase tracking-wider font-medium hover:bg-[#161514]/5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:ring-offset-2"
          >
            View Public Profile
            <ExternalLink className="w-3.5 h-3.5 text-[#5A5650]" />
          </Link>
        </div>
      </div>

      {/* Subtle demo notice */}
      <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 bg-[#C5A880]/10 border border-[#C5A880]/20 text-[#161514] text-xs">
        <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
        <span>
          <strong>Demo workspace</strong> — enquiry messaging will connect to the backend later.
        </span>
      </div>
    </header>
  );
};
