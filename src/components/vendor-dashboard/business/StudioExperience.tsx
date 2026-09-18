"use client";

import React, { useState } from "react";
import { VendorBusinessProfile } from "@/data/vendorBusiness";
import { BusinessSaveFeedback } from "./BusinessSaveFeedback";

interface StudioExperienceProps {
  profile: VendorBusinessProfile;
  onSave: (updated: Partial<VendorBusinessProfile>) => void;
}

export function StudioExperience({ profile, onSave }: StudioExperienceProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [years, setYears] = useState(profile.yearsInBusiness);
  const [teamSize, setTeamSize] = useState(profile.teamSize);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleEditToggle = () => {
    setIsEditing(true);
    setYears(profile.yearsInBusiness);
    setTeamSize(profile.teamSize);
    setErrors({});
    setFeedback(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (years === undefined || years < 0) {
      newErrors.years = "Years in business must be 0 or greater.";
    }

    if (teamSize === undefined || teamSize < 1) {
      newErrors.teamSize = "Team size must be at least 1.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      yearsInBusiness: years,
      teamSize,
    });
    setIsEditing(false);
    setErrors({});
    setFeedback("Experience details updated for this session.");
  };

  return (
    <section id="experience" className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl p-6 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E2D9] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-2xl text-[#2C2A29]">Experience &amp; team</h2>
            <span className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200">
              ILLUSTRATIVE DEMO
            </span>
          </div>
          <p className="text-xs text-[#6E6B65] mt-1">
            Studio operational history and core team capacity.
          </p>
        </div>
        {!isEditing && (
          <button
            type="button"
            onClick={handleEditToggle}
            className="self-start sm:self-auto px-4 py-2 text-xs font-medium uppercase tracking-wider text-[#2C2A29] border border-[#2C2A29]/20 rounded-md hover:bg-[#F2ECE4] transition-colors"
          >
            Edit Details
          </button>
        )}
      </div>

      {feedback && <BusinessSaveFeedback type="info" message={feedback} />}

      {!isEditing ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 rounded-lg bg-white border border-[#E8E2D9]">
            <span className="text-xs uppercase tracking-wider text-[#8C857B] font-medium block">
              Years in Business
            </span>
            <p className="font-serif text-3xl font-light text-[#2C2A29] mt-1">
              {profile.yearsInBusiness} {profile.yearsInBusiness === 1 ? "Year" : "Years"}
            </p>
            <p className="text-xs text-[#6E6B65] mt-1">Established studio experience</p>
          </div>

          <div className="p-4 rounded-lg bg-white border border-[#E8E2D9]">
            <span className="text-xs uppercase tracking-wider text-[#8C857B] font-medium block">
              Team Size
            </span>
            <p className="font-serif text-3xl font-light text-[#2C2A29] mt-1">
              {profile.teamSize} {profile.teamSize === 1 ? "Member" : "Members"}
            </p>
            <p className="text-xs text-[#6E6B65] mt-1">Photographers, cinematographers &amp; editors</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="yearsInBusiness" className="text-xs uppercase tracking-wider text-[#2C2A29] font-medium block mb-2">
                Years in Business
              </label>
              <input
                id="yearsInBusiness"
                type="number"
                min="0"
                value={years}
                onChange={(e) => setYears(parseInt(e.target.value) || 0)}
                className="w-full bg-white border border-[#DCD5C9] rounded-lg px-3.5 py-2.5 text-sm text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
              {errors.years && <p className="text-xs text-rose-700 mt-1">{errors.years}</p>}
            </div>

            <div>
              <label htmlFor="teamSize" className="text-xs uppercase tracking-wider text-[#2C2A29] font-medium block mb-2">
                Team Size
              </label>
              <input
                id="teamSize"
                type="number"
                min="1"
                value={teamSize}
                onChange={(e) => setTeamSize(parseInt(e.target.value) || 1)}
                className="w-full bg-white border border-[#DCD5C9] rounded-lg px-3.5 py-2.5 text-sm text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
              {errors.teamSize && <p className="text-xs text-rose-700 mt-1">{errors.teamSize}</p>}
            </div>
          </div>

          <div className="pt-2 border-t border-[#E8E2D9] flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-[#8C857B] italic">
              Illustrative demo data — changes reset after refresh.
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-xs font-medium uppercase tracking-wider text-[#6E6B65] hover:text-[#2C2A29]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-medium uppercase tracking-wider text-white bg-[#2C2A29] rounded-md hover:bg-[#1A1918]"
              >
                Save Experience
              </button>
            </div>
          </div>
        </form>
      )}
    </section>
  );
}
