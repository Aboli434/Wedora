"use client";

import React, { useState } from "react";
import { VendorBusinessProfile } from "@/data/vendorBusiness";
import { BusinessSaveFeedback } from "./BusinessSaveFeedback";

interface StudioDescriptionProps {
  profile: VendorBusinessProfile;
  onSave: (updated: Partial<VendorBusinessProfile>) => void;
}

export function StudioDescription({ profile, onSave }: StudioDescriptionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [shortDesc, setShortDesc] = useState(profile.shortDescription);
  const [fullDesc, setFullDesc] = useState(profile.fullDescription);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleEditToggle = () => {
    setIsEditing(true);
    setShortDesc(profile.shortDescription);
    setFullDesc(profile.fullDescription);
    setErrors({});
    setFeedback(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!shortDesc.trim()) {
      newErrors.shortDesc = "Short description is required.";
    } else if (shortDesc.length > 180) {
      newErrors.shortDesc = "Short description cannot exceed 180 characters.";
    }

    if (!fullDesc.trim()) {
      newErrors.fullDesc = "Full description is required.";
    } else if (fullDesc.length > 800) {
      newErrors.fullDesc = "Full description cannot exceed 800 characters.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      shortDescription: shortDesc,
      fullDescription: fullDesc,
    });
    setIsEditing(false);
    setErrors({});
    setFeedback("Studio descriptions updated for this session.");
  };

  return (
    <section id="description" className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl p-6 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E2D9] pb-5">
        <div>
          <h2 className="font-serif text-2xl text-[#2C2A29]">About your studio</h2>
          <p className="text-xs text-[#6E6B65] mt-1">
            Describe your creative approach, philosophy, and visual style for inquiring couples.
          </p>
        </div>
        {!isEditing && (
          <button
            type="button"
            onClick={handleEditToggle}
            className="self-start sm:self-auto px-4 py-2 text-xs font-medium uppercase tracking-wider text-[#2C2A29] border border-[#2C2A29]/20 rounded-md hover:bg-[#F2ECE4] transition-colors"
          >
            Edit About
          </button>
        )}
      </div>

      {feedback && <BusinessSaveFeedback type="info" message={feedback} />}

      {!isEditing ? (
        <div className="space-y-6">
          <div>
            <label className="text-xs uppercase tracking-wider text-[#8C857B] font-medium block">
              Short Description (Tagline)
            </label>
            <p className="text-sm font-medium text-[#2C2A29] mt-1 italic">
              &ldquo;{profile.shortDescription}&rdquo;
            </p>
          </div>

          <div>
            <label className="text-xs uppercase tracking-wider text-[#8C857B] font-medium block">
              Full Studio Description
            </label>
            <p className="text-sm text-[#5A5650] mt-1 leading-relaxed whitespace-pre-line">
              {profile.fullDescription}
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="shortDesc" className="text-xs uppercase tracking-wider text-[#2C2A29] font-medium">
                Short Description (Tagline)
              </label>
              <span className={`text-[11px] font-mono ${shortDesc.length > 180 ? "text-rose-700" : "text-[#8C857B]"}`}>
                {shortDesc.length} / 180 chars
              </span>
            </div>
            <input
              id="shortDesc"
              type="text"
              maxLength={180}
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              className="w-full bg-white border border-[#DCD5C9] rounded-lg px-3.5 py-2.5 text-sm text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              placeholder="e.g. Documentary-led photography for intimate celebrations and honest moments."
            />
            {errors.shortDesc && <p className="text-xs text-rose-700 mt-1">{errors.shortDesc}</p>}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="fullDesc" className="text-xs uppercase tracking-wider text-[#2C2A29] font-medium">
                Full Studio Description
              </label>
              <span className={`text-[11px] font-mono ${fullDesc.length > 800 ? "text-rose-700" : "text-[#8C857B]"}`}>
                {fullDesc.length} / 800 chars
              </span>
            </div>
            <textarea
              id="fullDesc"
              rows={5}
              maxLength={800}
              value={fullDesc}
              onChange={(e) => setFullDesc(e.target.value)}
              className="w-full bg-white border border-[#DCD5C9] rounded-lg p-3.5 text-sm text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              placeholder="Describe your studio's story, vision, working process, and style..."
            />
            {errors.fullDesc && <p className="text-xs text-rose-700 mt-1">{errors.fullDesc}</p>}
          </div>

          <div className="pt-2 border-t border-[#E8E2D9] flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-[#8C857B] italic">
              Demo copy — changes reset after refresh.
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
                Save Description
              </button>
            </div>
          </div>
        </form>
      )}
    </section>
  );
}
