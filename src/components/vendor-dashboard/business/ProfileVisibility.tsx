"use client";

import React from "react";
import { VendorBusinessProfile } from "@/data/vendorBusiness";

interface ProfileVisibilityProps {
  profile: VendorBusinessProfile;
  onChange: (isVisible: boolean) => void;
}

export function ProfileVisibility({ profile, onChange }: ProfileVisibilityProps) {
  const isVisible = profile.publicProfileVisible;

  return (
    <section id="visibility" className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl p-6 md:p-8 space-y-6">
      <div className="border-b border-[#E8E2D9] pb-5">
        <h2 className="font-serif text-2xl text-[#2C2A29]">Public profile visibility</h2>
        <p className="text-xs text-[#6E6B65] mt-1">
          Control whether your studio appears in public Wedora vendor directory searches.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => onChange(true)}
            className={`p-4 rounded-lg border text-left transition-all ${
              isVisible
                ? "bg-[#2C2A29] text-white border-[#2C2A29] shadow-sm"
                : "bg-white text-[#2C2A29] border-[#DCD5C9] hover:bg-[#F7F4EF]"
            }`}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Visible to couples</p>
              {isVisible && <span className="w-2.5 h-2.5 rounded-full bg-[#C5A880]" />}
            </div>
            <p className={`text-xs mt-1 ${isVisible ? "text-neutral-300" : "text-[#6E6B65]"}`}>
              Your studio can appear in vendor discovery.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onChange(false)}
            className={`p-4 rounded-lg border text-left transition-all ${
              !isVisible
                ? "bg-[#2C2A29] text-white border-[#2C2A29] shadow-sm"
                : "bg-white text-[#2C2A29] border-[#DCD5C9] hover:bg-[#F7F4EF]"
            }`}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Hidden from directory</p>
              {!isVisible && <span className="w-2.5 h-2.5 rounded-full bg-[#C5A880]" />}
            </div>
            <p className={`text-xs mt-1 ${!isVisible ? "text-neutral-300" : "text-[#6E6B65]"}`}>
              Your studio will not appear in public vendor discovery.
            </p>
          </button>
        </div>

        <div className="p-3.5 rounded-lg bg-[#F2ECE4] border border-[#E5DEC9] text-xs text-[#594B3C]">
          {isVisible
            ? "Your studio listing is live in the Wedora directory demonstration."
            : "Your studio listing is currently hidden from public search previews."}
        </div>
      </div>
    </section>
  );
}
