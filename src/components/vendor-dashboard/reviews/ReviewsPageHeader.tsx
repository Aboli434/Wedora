"use client";

import React from "react";
import Link from "next/link";
import { MessageSquarePlus, Users, RefreshCw } from "lucide-react";

interface ReviewsPageHeaderProps {
  onRequestReview: () => void;
  onResetData: () => void;
}

export const ReviewsPageHeader: React.FC<ReviewsPageHeaderProps> = ({
  onRequestReview,
  onResetData,
}) => {
  return (
    <header className="mb-10 pb-8 border-b border-[#161514]/10">
      {/* Breadcrumb Navigation */}
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
            Reviews & Reputation
          </li>
        </ol>
      </nav>

      {/* Main Header Content */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A880] block mb-1 font-sans">
            REPUTATION WORKSPACE
          </span>
          <h1 className="font-serif text-3xl md:text-4xl text-[#161514] font-normal leading-tight">
            Let the work speak for itself.
          </h1>
          <p className="text-[#5A5650] text-sm md:text-base mt-2 max-w-2xl font-sans leading-relaxed">
            Keep client feedback, responses, and the relationships behind every review in one considered workspace.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onRequestReview}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#161514] text-[#FAF8F5] text-xs font-medium tracking-wider uppercase hover:bg-[#2c2927] transition-colors rounded-sm shadow-xs"
          >
            <MessageSquarePlus className="w-4 h-4 text-[#C5A880]" />
            Request a Review
          </button>

          <Link
            href="/vendor/dashboard/clients"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#161514]/20 bg-[#FAF8F5] text-[#161514] text-xs font-medium tracking-wider uppercase hover:bg-[#161514]/5 transition-colors rounded-sm"
          >
            <Users className="w-4 h-4 text-[#5A5650]" />
            View Clients
          </Link>

          <button
            type="button"
            onClick={onResetData}
            title="Reset to original sample review dataset"
            className="p-2.5 border border-[#161514]/15 text-[#5A5650] hover:text-[#161514] hover:bg-[#161514]/5 transition-colors rounded-sm"
            aria-label="Reset Demo Dataset"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Demo Notice */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#C5A880]/10 border border-[#C5A880]/30 rounded-sm text-xs text-[#161514]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse" />
          <span className="font-medium">Demo reputation workspace</span> — review publishing and messaging integrations are not connected yet.
        </div>

        <span className="text-[11px] font-mono text-[#5A5650] bg-white border border-[#161514]/10 px-2.5 py-1 rounded-sm">
          Sample data for The Frame House studio
        </span>
      </div>
    </header>
  );
};
