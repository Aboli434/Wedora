"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface VendorSettingsPageHeaderProps {
  publicProfileUrl?: string;
  onResetSettings?: () => void;
}

export const VendorSettingsPageHeader: React.FC<VendorSettingsPageHeaderProps> = ({
  publicProfileUrl,
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
            href={publicProfileUrl || "/vendors"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#161514] text-[#FAF8F5] text-xs font-medium tracking-wider uppercase hover:bg-[#2c2927] transition-colors rounded-sm shadow-xs"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#C5A880]" />
            View Public Profile
          </Link>
        </div>
      </div>
    </header>
  );
};
