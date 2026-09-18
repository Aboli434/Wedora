"use client";

import React from "react";
import Link from "next/link";
import { VendorBusinessProfile } from "@/data/vendorDashboard";
import { CheckCircle2, ArrowRight } from "lucide-react";

interface VendorProfileSnapshotProps {
  profile: VendorBusinessProfile;
}

export function VendorProfileSnapshot({ profile }: VendorProfileSnapshotProps) {
  return (
    <section className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl p-6 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        {/* Left Profile Identity */}
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-full bg-[#2C2A29] text-[#FAF8F5] flex items-center justify-center font-serif text-lg font-medium tracking-widest border border-[#C5A880]/40 shrink-0 shadow-md">
            {profile.avatarInitials}
          </div>

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
              <span className="inline-flex items-center px-2 py-0.5 rounded bg-amber-50 border border-amber-200/60 text-[10px] font-mono tracking-wider uppercase text-amber-800">
                DEMO PROFILE
              </span>
            </div>

            <p className="text-xs text-[#6E6B65] font-medium">
              {profile.category} &bull; {profile.location} &bull; Owned by {profile.ownerName}
            </p>

            <p className="text-sm text-[#5A5650] max-w-2xl pt-1 leading-relaxed">
              {profile.description}
            </p>
          </div>
        </div>

        {/* Right Completion Metric & Action */}
        <div className="md:text-right shrink-0 space-y-3 pt-4 md:pt-0 border-t md:border-t-0 border-[#E8E2D9]">
          <div>
            <span className="text-[10px] font-sans tracking-widest uppercase text-[#8C857B] font-semibold block">
              PROFILE COMPLETION
            </span>
            <p className="font-serif text-3xl font-light text-[#2C2A29]">
              {profile.profileCompletion}%
            </p>
          </div>

          <div className="w-full md:w-36 h-1.5 bg-[#E8E2D9] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#C5A880] transition-all duration-500 rounded-full"
              style={{ width: `${profile.profileCompletion}%` }}
              role="progressbar"
              aria-valuenow={profile.profileCompletion}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Profile completion: ${profile.profileCompletion} percent`}
            />
          </div>

          <Link
            href="/vendor/dashboard/business"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2C2A29] hover:text-[#C5A880] transition-colors group"
          >
            <span>Complete your profile</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C5A880] group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
