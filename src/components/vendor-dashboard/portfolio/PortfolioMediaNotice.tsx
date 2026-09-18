"use client";

import React from "react";
import { Info } from "lucide-react";

export function PortfolioMediaNotice() {
  return (
    <div className="flex items-center gap-3 p-4 rounded-xl bg-[#F2ECE4] border border-[#E5DEC9] text-xs text-[#594B3C]">
      <Info className="w-4 h-4 text-[#C5A880] shrink-0" />
      <p className="leading-relaxed">
        Portfolio uploads are currently in demo mode. Media storage and cloud image uploads will be connected when the vendor media service is added.
      </p>
    </div>
  );
}
