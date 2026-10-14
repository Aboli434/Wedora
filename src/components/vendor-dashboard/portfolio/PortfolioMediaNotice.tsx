"use client";

import React from "react";
import { Info } from "lucide-react";

export function PortfolioMediaNotice() {
  return (
    <div className="flex items-center gap-3 p-4 rounded-xl bg-[#F2ECE4] border border-[#E5DEC9] text-xs text-[#594B3C]">
      <Info className="w-4 h-4 text-[#C5A880] shrink-0" />
      <p className="leading-relaxed">
        Tip: Upload high-resolution imagery (minimum 1600px width) in JPG or WebP format to showcase your work with pristine editorial clarity.
      </p>
    </div>
  );
}
