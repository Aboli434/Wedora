"use client";

import React from "react";
import { SlidersHorizontal, RefreshCw } from "lucide-react";

interface VendorSettingsEmptyStateProps {
  onReset: () => void;
}

export const VendorSettingsEmptyState: React.FC<VendorSettingsEmptyStateProps> = ({
  onReset,
}) => {
  return (
    <div className="bg-white border border-[#161514]/10 rounded-sm p-10 text-center space-y-4 my-6">
      <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#161514]/10 text-[#C5A880] flex items-center justify-center mx-auto">
        <SlidersHorizontal className="w-6 h-6" />
      </div>
      <h3 className="font-serif text-2xl font-normal text-[#161514]">
        No Settings Selected
      </h3>
      <p className="text-xs text-[#5A5650] max-w-sm mx-auto font-sans leading-relaxed">
        Select a section from the navigation menu to review and edit your studio configuration.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center gap-2 px-4 py-2 bg-[#161514] text-[#FAF8F5] text-xs font-medium uppercase tracking-wider hover:bg-[#2c2927] transition-colors rounded-sm"
      >
        <RefreshCw className="w-3.5 h-3.5 text-[#C5A880]" />
        Reset All Settings
      </button>
    </div>
  );
};
