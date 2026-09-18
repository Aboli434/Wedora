"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink, RefreshCw, SlidersHorizontal } from "lucide-react";

interface VendorSettingsPageHeaderProps {
  onResetSettings: () => void;
}

export const VendorSettingsPageHeader: React.FC<VendorSettingsPageHeaderProps> = ({
  onResetSettings,
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
            Settings
          </li>
        </ol>
      </nav>

      {/* Main Heading Content */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A880] block mb-1 font-sans">
            ACCOUNT
          </span>
          <h1 className="font-serif text-3xl md:text-4xl text-[#161514] font-normal leading-tight">
            Set the workspace up to work the way you do.
          </h1>
          <p className="text-[#5A5650] text-sm md:text-base mt-2 max-w-2xl font-sans leading-relaxed">
            Manage your studio information, communication preferences, availability, and public presence from one place.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/vendors/the-frame-house"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#161514] text-[#FAF8F5] text-xs font-medium tracking-wider uppercase hover:bg-[#2c2927] transition-colors rounded-sm shadow-xs"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#C5A880]" />
            View Public Profile
          </Link>

          <button
            type="button"
            onClick={onResetSettings}
            title="Reset all settings to initial demo state"
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#161514]/20 bg-[#FAF8F5] text-[#161514] text-xs font-medium tracking-wider uppercase hover:bg-[#161514]/5 transition-colors rounded-sm"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#5A5650]" />
            Reset Demo State
          </button>
        </div>
      </div>

      {/* Demo Notice */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#C5A880]/10 border border-[#C5A880]/30 rounded-sm text-xs text-[#161514]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse" />
          <span className="font-medium">Session-only demo</span> — Changes made here are temporary and reset when the page is refreshed.
        </div>

        <span className="text-[11px] font-mono text-[#5A5650] bg-white border border-[#161514]/10 px-2.5 py-1 rounded-sm flex items-center gap-1.5">
          <SlidersHorizontal className="w-3 h-3 text-[#C5A880]" />
          The Frame House Studio Settings
        </span>
      </div>
    </header>
  );
};
