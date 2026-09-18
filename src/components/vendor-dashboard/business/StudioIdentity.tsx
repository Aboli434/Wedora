"use client";

import React, { useState } from "react";
import { VendorBusinessProfile } from "@/data/vendorBusiness";
import { BusinessSaveFeedback } from "./BusinessSaveFeedback";

interface StudioIdentityProps {
  profile: VendorBusinessProfile;
  onSave: (updated: Partial<VendorBusinessProfile>) => void;
}

const CATEGORY_OPTIONS = [
  "Photography",
  "Videography",
  "Bridal Wear",
  "Groom Wear",
  "Makeup & Hair",
  "Decor & Design",
  "Wedding Planning",
  "Venues",
  "Catering",
  "Music & DJ",
];

export function StudioIdentity({ profile, onSave }: StudioIdentityProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    businessName: profile.businessName,
    ownerName: profile.ownerName,
    category: profile.category,
    subcategory: profile.subcategory,
    location: profile.location,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleEditToggle = () => {
    setIsEditing(true);
    setFormData({
      businessName: profile.businessName,
      ownerName: profile.ownerName,
      category: profile.category,
      subcategory: profile.subcategory,
      location: profile.location,
    });
    setErrors({});
    setFeedback(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.businessName.trim()) {
      newErrors.businessName = "Business name is required.";
    }
    if (!formData.ownerName.trim()) {
      newErrors.ownerName = "Owner / primary contact is required.";
    }
    if (!formData.category.trim()) {
      newErrors.category = "Category is required.";
    }
    if (!formData.location.trim()) {
      newErrors.location = "Location is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave(formData);
    setIsEditing(false);
    setErrors({});
    setFeedback("Business identity updated for this session.");
  };

  return (
    <section id="identity" className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl p-6 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E2D9] pb-5">
        <div>
          <h2 className="font-serif text-2xl text-[#2C2A29]">Studio identity</h2>
          <p className="text-xs text-[#6E6B65] mt-1">
            Primary details that define your business across Wedora discovery.
          </p>
        </div>
        {!isEditing && (
          <button
            type="button"
            onClick={handleEditToggle}
            className="self-start sm:self-auto px-4 py-2 text-xs font-medium uppercase tracking-wider text-[#2C2A29] border border-[#2C2A29]/20 rounded-md hover:bg-[#F2ECE4] transition-colors"
          >
            Edit Identity
          </button>
        )}
      </div>

      {feedback && (
        <BusinessSaveFeedback type="info" message={feedback} />
      )}

      {!isEditing ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-xs uppercase tracking-wider text-[#8C857B] font-medium block">
              Business Name
            </label>
            <p className="text-sm font-medium text-[#2C2A29] mt-1">{profile.businessName}</p>
          </div>

          <div>
            <label className="text-xs uppercase tracking-wider text-[#8C857B] font-medium block">
              Owner / Primary Contact
            </label>
            <p className="text-sm font-medium text-[#2C2A29] mt-1">{profile.ownerName}</p>
          </div>

          <div>
            <label className="text-xs uppercase tracking-wider text-[#8C857B] font-medium block">
              Category
            </label>
            <p className="text-sm font-medium text-[#2C2A29] mt-1">{profile.category}</p>
          </div>

          <div>
            <label className="text-xs uppercase tracking-wider text-[#8C857B] font-medium block">
              Subcategory
            </label>
            <p className="text-sm font-medium text-[#2C2A29] mt-1">{profile.subcategory || "N/A"}</p>
          </div>

          <div className="md:col-span-2">
            <label className="text-xs uppercase tracking-wider text-[#8C857B] font-medium block">
              Primary Location
            </label>
            <p className="text-sm font-medium text-[#2C2A29] mt-1">{profile.location}</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="businessName" className="text-xs uppercase tracking-wider text-[#2C2A29] font-medium block mb-2">
                Business Name
              </label>
              <input
                id="businessName"
                type="text"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                className="w-full bg-white border border-[#DCD5C9] rounded-lg px-3.5 py-2.5 text-sm text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
              {errors.businessName && <p className="text-xs text-rose-700 mt-1">{errors.businessName}</p>}
            </div>

            <div>
              <label htmlFor="ownerName" className="text-xs uppercase tracking-wider text-[#2C2A29] font-medium block mb-2">
                Owner / Primary Contact
              </label>
              <input
                id="ownerName"
                type="text"
                value={formData.ownerName}
                onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                className="w-full bg-white border border-[#DCD5C9] rounded-lg px-3.5 py-2.5 text-sm text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
              {errors.ownerName && <p className="text-xs text-rose-700 mt-1">{errors.ownerName}</p>}
            </div>

            <div>
              <label htmlFor="category" className="text-xs uppercase tracking-wider text-[#2C2A29] font-medium block mb-2">
                Category
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-white border border-[#DCD5C9] rounded-lg px-3.5 py-2.5 text-sm text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              >
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && <p className="text-xs text-rose-700 mt-1">{errors.category}</p>}
            </div>

            <div>
              <label htmlFor="subcategory" className="text-xs uppercase tracking-wider text-[#2C2A29] font-medium block mb-2">
                Subcategory / Specialty
              </label>
              <input
                id="subcategory"
                type="text"
                value={formData.subcategory}
                onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                className="w-full bg-white border border-[#DCD5C9] rounded-lg px-3.5 py-2.5 text-sm text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
                placeholder="e.g. Wedding & Portrait Studio"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="location" className="text-xs uppercase tracking-wider text-[#2C2A29] font-medium block mb-2">
                Primary Location
              </label>
              <input
                id="location"
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-white border border-[#DCD5C9] rounded-lg px-3.5 py-2.5 text-sm text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
                placeholder="e.g. Mumbai"
              />
              {errors.location && <p className="text-xs text-rose-700 mt-1">{errors.location}</p>}
            </div>
          </div>

          <div className="pt-2 border-t border-[#E8E2D9] flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-[#8C857B] italic">
              Demo only — changes reset after refresh.
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
                Save Changes
              </button>
            </div>
          </div>
        </form>
      )}
    </section>
  );
}
