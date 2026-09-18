"use client";

import React from "react";
import { VendorBusinessProfile } from "@/data/vendorBusiness";
import { Check, ArrowDown } from "lucide-react";

interface BusinessCompletionProps {
  profile: VendorBusinessProfile;
  completionScore: number;
}

interface ChecklistItem {
  id: string;
  label: string;
  isComplete: boolean;
  anchorId: string;
}

export function BusinessCompletion({ profile, completionScore }: BusinessCompletionProps) {
  const checklistItems: ChecklistItem[] = [
    {
      id: "chk-identity",
      label: "Business identity (name, owner, category, location)",
      isComplete: Boolean(
        profile.businessName?.trim() &&
          profile.ownerName?.trim() &&
          profile.category?.trim() &&
          profile.location?.trim()
      ),
      anchorId: "#identity",
    },
    {
      id: "chk-description",
      label: "Studio description (short tagline & full story)",
      isComplete: Boolean(
        profile.shortDescription?.trim() && profile.fullDescription?.trim()
      ),
      anchorId: "#description",
    },
    {
      id: "chk-service-areas",
      label: "Destination service areas",
      isComplete: Boolean(profile.serviceAreas && profile.serviceAreas.length > 0),
      anchorId: "#service-areas",
    },
    {
      id: "chk-highlights",
      label: "Studio highlights (up to 5 creative pillars)",
      isComplete: Boolean(profile.highlights && profile.highlights.length > 0),
      anchorId: "#highlights",
    },
    {
      id: "chk-experience",
      label: "Experience & team capacity",
      isComplete: Boolean(
        profile.yearsInBusiness !== undefined &&
          profile.yearsInBusiness >= 0 &&
          profile.teamSize !== undefined &&
          profile.teamSize >= 1
      ),
      anchorId: "#experience",
    },
    {
      id: "chk-contact",
      label: "Contact preferences & inquiry channels",
      isComplete: Boolean(profile.preferredContactMethod),
      anchorId: "#contact",
    },
    {
      id: "chk-media",
      label: "Studio imagery (cover photo & avatar)",
      isComplete: Boolean(profile.profileImage || profile.coverImage),
      anchorId: "#media",
    },
  ];

  const handleScrollToSection = (anchorId: string) => {
    const target = document.querySelector(anchorId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl p-6 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E2D9] pb-4">
        <div>
          <h2 className="font-serif text-2xl text-[#2C2A29]">Profile completion checklist</h2>
          <p className="text-xs text-[#6E6B65] mt-0.5">
            Key sections required for maximum couple discovery on Wedora.
          </p>
        </div>
        <span className="text-xs font-mono font-medium text-[#2C2A29] bg-[#F2ECE4] border border-[#E5DEC9] px-3 py-1 rounded-full self-start sm:self-auto">
          {completionScore}% Complete
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {checklistItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-3.5 rounded-lg bg-white border border-[#E8E2D9] text-xs"
          >
            <div className="flex items-center gap-2.5 pr-2">
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 ${
                  item.isComplete
                    ? "bg-[#2C2A29] text-white"
                    : "bg-[#F2ECE4] text-[#8C857B] border border-[#E5DEC9]"
                }`}
              >
                {item.isComplete ? <Check className="w-3 h-3 text-[#C5A880]" /> : "•"}
              </span>
              <span className={`font-medium ${item.isComplete ? "text-[#2C2A29]" : "text-[#6E6B65]"}`}>
                {item.label}
              </span>
            </div>

            <button
              type="button"
              onClick={() => handleScrollToSection(item.anchorId)}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-[#C5A880] hover:text-[#2C2A29] transition-colors shrink-0"
            >
              <span>{item.isComplete ? "Review" : "Complete"}</span>
              <ArrowDown className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
