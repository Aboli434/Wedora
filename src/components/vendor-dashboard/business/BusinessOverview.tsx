"use client";

import React from "react";
import { VendorBusinessProfile } from "@/data/vendorBusiness";
import { getProfileCompletionMessage } from "@/lib/vendorBusiness";
import { CheckCircle2 } from "lucide-react";

interface BusinessOverviewProps {
  profile: VendorBusinessProfile;
  completionScore: number;
}

export function BusinessOverview({ profile, completionScore }: BusinessOverviewProps) {
  const completionMessage = getProfileCompletionMessage(completionScore);

  return (
    <section className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl p-6 sm:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#E8E2D9] pb-6">
        {/* Studio Identity Banner */}
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2.5">
            <h2 className="font-serif text-2xl md:text-3xl text-[#2C2A29] font-light">
              {profile.businessName}
            </h2>
            {profile.verifiedStatus && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#F2ECE4] border border-[#E5DEC9] text-[10px] font-mono tracking-wider uppercase text-[#594B3C]">
                <CheckCircle2 className="w-3 h-3 text-[#C5A880]" />
                VERIFIED STUDIO
              </span>
            )}
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-amber-50 border border-amber-200/60 text-[10px] font-mono tracking-wider uppercase text-amber-800 font-medium">
              DEMO PROFILE
            </span>
          </div>

          <p className="text-xs text-[#6E6B65] font-medium">
            {profile.category} &bull; {profile.location} &bull; Owner: {profile.ownerName}
          </p>
        </div>

        {/* Completion Widget */}
        <div className="md:text-right shrink-0 space-y-2">
          <span className="text-[10px] font-sans tracking-widest uppercase text-[#8C857B] font-semibold block">
            PROFILE COMPLETION
          </span>
          <p className="font-serif text-3xl font-light text-[#2C2A29]">
            {completionScore}%
          </p>
        </div>
      </div>

      {/* Progress Bar & Message */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-[#6E6B65]">
          <span>{completionMessage}</span>
          <span className="font-mono text-[11px] text-[#8C857B]">{completionScore} / 100%</span>
        </div>
        <div
          className="w-full h-2 bg-[#E8E2D9] rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={completionScore}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Studio profile completion: ${completionScore} percent`}
        >
          <div
            className="h-full bg-[#C5A880] transition-all duration-500 rounded-full"
            style={{ width: `${completionScore}%` }}
          />
        </div>
      </div>
    </section>
  );
}
