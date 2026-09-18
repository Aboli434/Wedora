"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { VendorBusinessProfile } from "@/data/vendorBusiness";
import { ArrowUpRight, MapPin, Sparkles } from "lucide-react";

interface PublicProfilePreviewProps {
  profile: VendorBusinessProfile;
}

export function PublicProfilePreview({ profile }: PublicProfilePreviewProps) {
  return (
    <section id="preview" className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl p-6 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8E2D9] pb-4">
        <div>
          <h2 className="font-serif text-2xl text-[#2C2A29]">How couples see your studio</h2>
          <p className="text-xs text-[#6E6B65] mt-0.5">
            Compact preview matching the Wedora public directory card layout.
          </p>
        </div>
        <Link
          href="/vendors/the-frame-house"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2C2A29] hover:text-[#C5A880] transition-colors group self-start sm:self-auto"
        >
          <span>View full public profile</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A880] group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Card Preview */}
      <div className="max-w-md mx-auto bg-white border border-[#E8E2D9] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        {/* Cover Photo */}
        <div className="relative h-44 w-full bg-[#F2ECE4]">
          <Image
            src={profile.coverImage}
            alt={profile.businessName}
            fill
            className="object-cover"
          />
          <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono tracking-wider uppercase">
            {profile.category}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-4">
          <div className="flex items-start gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#C5A880]/50 shrink-0 bg-[#F2ECE4] -mt-8 shadow-sm">
              <Image
                src={profile.profileImage}
                alt={profile.businessName}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-serif text-xl text-[#2C2A29] font-medium leading-snug">
                {profile.businessName}
              </h3>
              <div className="flex items-center gap-1 text-xs text-[#6E6B65] mt-0.5">
                <MapPin className="w-3 h-3 text-[#C5A880]" />
                <span>{profile.location}</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-[#5A5650] line-clamp-2 leading-relaxed italic">
            &ldquo;{profile.shortDescription}&rdquo;
          </p>

          {/* Highlights */}
          {profile.highlights && profile.highlights.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {profile.highlights.slice(0, 3).map((h) => (
                <span
                  key={h}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#F2ECE4] border border-[#E5DEC9] text-[10px] font-medium text-[#594B3C]"
                >
                  <Sparkles className="w-2.5 h-2.5 text-[#C5A880]" />
                  <span>{h}</span>
                </span>
              ))}
              {profile.highlights.length > 3 && (
                <span className="text-[10px] text-[#8C857B] font-mono self-center">
                  +{profile.highlights.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
