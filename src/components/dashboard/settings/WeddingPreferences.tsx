"use client";

import React, { useState } from "react";
import { WeddingPreferences as WeddingPreferencesType, WeddingStyle } from "@/data/settings";
import { validateWeddingPreferences } from "@/lib/settings";
import { SettingsSaveFeedback } from "./SettingsSaveFeedback";

interface WeddingPreferencesProps {
  preferences: WeddingPreferencesType;
  onSave: (updated: WeddingPreferencesType) => void;
}

const STYLES: WeddingStyle[] = ["Intimate", "Classic", "Grand", "Editorial", "Traditional", "Modern"];
const DESTINATIONS = ["Udaipur", "Jaipur", "Goa", "Mumbai", "Pune", "Delhi", "Other"];
const EVENTS_OPTIONS = ["1", "2", "3", "4+"];
const VISIBILITY_OPTIONS = ["Private", "Shared with Wedora team"] as const;

export function WeddingPreferences({ preferences, onSave }: WeddingPreferencesProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<WeddingPreferencesType>(preferences);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleEditToggle = () => {
    setIsEditing(true);
    setFormData(preferences);
    setErrors({});
    setFeedback(null);
  };

  const handleReset = () => {
    setFormData(preferences);
    setErrors({});
    setFeedback("Preferences reset to current values.");
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateWeddingPreferences(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    onSave(formData);
    setIsEditing(false);
    setErrors({});
    setFeedback("Wedding preferences updated for this session.");
  };

  return (
    <section id="wedding-preferences" className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl p-6 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E2D9] pb-5">
        <div>
          <h2 className="font-serif text-2xl text-[#2C2A29]">Wedding preferences</h2>
          <p className="text-sm text-[#6E6B65] mt-1">
            Shape the planning experience around the celebration you&apos;re creating.
          </p>
        </div>
        {!isEditing && (
          <button
            type="button"
            onClick={handleEditToggle}
            className="self-start sm:self-auto px-4 py-2 text-xs font-medium uppercase tracking-wider text-[#2C2A29] border border-[#2C2A29]/20 rounded-md hover:bg-[#F2ECE4] transition-colors"
          >
            Edit Preferences
          </button>
        )}
      </div>

      {feedback && (
        <SettingsSaveFeedback type="info" message={feedback} />
      )}

      {!isEditing ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-xs uppercase tracking-wider text-[#8C857B] font-medium block">
              Wedding Style
            </label>
            <p className="text-sm font-medium text-[#2C2A29] mt-1">{preferences.weddingStyle}</p>
          </div>

          <div>
            <label className="text-xs uppercase tracking-wider text-[#8C857B] font-medium block">
              Destination
            </label>
            <p className="text-sm font-medium text-[#2C2A29] mt-1">{preferences.destination}</p>
          </div>

          <div>
            <label className="text-xs uppercase tracking-wider text-[#8C857B] font-medium block">
              Guest Target
            </label>
            <p className="text-sm font-medium text-[#2C2A29] mt-1">{preferences.guestTarget} guests</p>
          </div>

          <div>
            <label className="text-xs uppercase tracking-wider text-[#8C857B] font-medium block">
              Number of Events
            </label>
            <p className="text-sm font-medium text-[#2C2A29] mt-1">{preferences.numberOfEvents} functions</p>
          </div>

          <div className="md:col-span-2">
            <label className="text-xs uppercase tracking-wider text-[#8C857B] font-medium block">
              Planning Visibility
            </label>
            <p className="text-sm font-medium text-[#2C2A29] mt-1">{preferences.planningVisibility}</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="weddingStyle" className="text-xs uppercase tracking-wider text-[#2C2A29] font-medium block mb-2">
                Wedding Style
              </label>
              <select
                id="weddingStyle"
                value={formData.weddingStyle}
                onChange={(e) => setFormData({ ...formData, weddingStyle: e.target.value as WeddingStyle })}
                className="w-full bg-white border border-[#DCD5C9] rounded-lg px-3.5 py-2.5 text-sm text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              >
                {STYLES.map((style) => (
                  <option key={style} value={style}>
                    {style}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="destination" className="text-xs uppercase tracking-wider text-[#2C2A29] font-medium block mb-2">
                Destination
              </label>
              <select
                id="destination"
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                className="w-full bg-white border border-[#DCD5C9] rounded-lg px-3.5 py-2.5 text-sm text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              >
                {DESTINATIONS.map((dest) => (
                  <option key={dest} value={dest}>
                    {dest}
                  </option>
                ))}
              </select>
              {errors.destination && <p className="text-xs text-rose-700 mt-1">{errors.destination}</p>}
            </div>

            <div>
              <label htmlFor="guestTarget" className="text-xs uppercase tracking-wider text-[#2C2A29] font-medium block mb-2">
                Guest Target
              </label>
              <input
                id="guestTarget"
                type="number"
                min="0"
                value={formData.guestTarget}
                onChange={(e) => setFormData({ ...formData, guestTarget: parseInt(e.target.value) || 0 })}
                className="w-full bg-white border border-[#DCD5C9] rounded-lg px-3.5 py-2.5 text-sm text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
              {errors.guestTarget && <p className="text-xs text-rose-700 mt-1">{errors.guestTarget}</p>}
            </div>

            <div>
              <label htmlFor="numberOfEvents" className="text-xs uppercase tracking-wider text-[#2C2A29] font-medium block mb-2">
                Number of Events
              </label>
              <select
                id="numberOfEvents"
                value={formData.numberOfEvents}
                onChange={(e) => setFormData({ ...formData, numberOfEvents: e.target.value })}
                className="w-full bg-white border border-[#DCD5C9] rounded-lg px-3.5 py-2.5 text-sm text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              >
                {EVENTS_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="planningVisibility" className="text-xs uppercase tracking-wider text-[#2C2A29] font-medium block mb-2">
                Planning Visibility
              </label>
              <select
                id="planningVisibility"
                value={formData.planningVisibility}
                onChange={(e) => setFormData({ ...formData, planningVisibility: e.target.value as "Private" | "Shared with Wedora team" })}
                className="w-full bg-white border border-[#DCD5C9] rounded-lg px-3.5 py-2.5 text-sm text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              >
                {VISIBILITY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-2 border-t border-[#E8E2D9] flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-[#8C857B] italic">
              Demo only — changes are not saved after refresh.
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 text-xs font-medium uppercase tracking-wider text-[#6E6B65] hover:text-[#2C2A29] transition-colors"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setFormData(preferences);
                }}
                className="px-4 py-2 text-xs font-medium uppercase tracking-wider text-[#6E6B65] hover:text-[#2C2A29] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-medium uppercase tracking-wider text-white bg-[#2C2A29] rounded-md hover:bg-[#1A1918] transition-colors shadow-sm"
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
