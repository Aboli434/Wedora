"use client";

import React, { useState } from "react";
import { ClientProfile } from "@/data/settings";
import { validateClientProfile } from "@/lib/settings";
import { SettingsSaveFeedback } from "./SettingsSaveFeedback";
import { Edit2 } from "lucide-react";

interface ProfileSettingsProps {
  profile: ClientProfile;
  onSaveProfile?: (updated: ClientProfile) => void;
  onSave?: (updated: ClientProfile) => void;
}

export function ProfileSettings({
  profile,
  onSaveProfile,
  onSave,
}: ProfileSettingsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const initials =
      (firstName.charAt(0) + lastName.charAt(0)).toUpperCase() || "AS";

    const updatedProfile: ClientProfile = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      avatarInitials: initials,
    };

    const validation = validateClientProfile(updatedProfile);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    if (onSaveProfile) onSaveProfile(updatedProfile);
    if (onSave) onSave(updatedProfile);
    setIsEditing(false);
    setFeedback("Profile details updated for this session.");

    setTimeout(() => {
      setFeedback(null);
    }, 4000);
  };

  const handleCancel = () => {
    setFirstName(profile.firstName);
    setLastName(profile.lastName);
    setEmail(profile.email);
    setPhone(profile.phone);
    setErrors({});
    setIsEditing(false);
  };

  return (
    <section id="profile" className="bg-[#FAF8F5] border border-[#161514]/15 p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-[#161514]/10 pb-4">
        <div className="space-y-1">
          <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold">
            CLIENT PROFILE
          </span>
          <h2 className="font-serif text-2xl text-[#161514] font-light">
            Your Profile
          </h2>
          <p className="text-xs font-sans text-[#5A5650]">
            These details help keep your Wedora experience connected to you.
          </p>
        </div>

        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 border border-[#161514]/20 text-xs font-sans uppercase tracking-wider text-[#161514] hover:bg-[#161514]/5 transition-colors"
          >
            <Edit2 className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Edit Profile</span>
          </button>
        )}
      </div>

      {feedback && (
        <SettingsSaveFeedback type="success" message={feedback} />
      )}

      {/* Avatar Initials & Basic Info */}
      <div className="flex items-center gap-4 p-4 bg-white/60 border border-[#161514]/10">
        <div className="w-14 h-14 rounded-full bg-[#161514] text-[#FAF8F5] font-serif text-xl flex items-center justify-center tracking-widest border border-[#C5A880]/40 shadow-sm">
          {profile.avatarInitials}
        </div>
        <div>
          <h3 className="font-serif text-lg text-[#161514] font-medium">
            {profile.firstName} {profile.lastName}
          </h3>
          <span className="text-xs font-sans text-[#5A5650]">
            Demo Client Account
          </span>
        </div>
      </div>

      {/* Form Details */}
      <form onSubmit={handleSave} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* First Name */}
          <div className="space-y-1.5">
            <label className="block text-xs font-sans uppercase tracking-wider text-[#161514] font-medium">
              First Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#161514]/15 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
            ) : (
              <p className="text-sm font-serif text-[#161514] py-1">
                {profile.firstName}
              </p>
            )}
            {errors.firstName && (
              <p className="text-[11px] text-red-600">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div className="space-y-1.5">
            <label className="block text-xs font-sans uppercase tracking-wider text-[#161514] font-medium">
              Last Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#161514]/15 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
            ) : (
              <p className="text-sm font-serif text-[#161514] py-1">
                {profile.lastName}
              </p>
            )}
            {errors.lastName && (
              <p className="text-[11px] text-red-600">{errors.lastName}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="block text-xs font-sans uppercase tracking-wider text-[#161514] font-medium">
              Email Address
            </label>
            {isEditing ? (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#161514]/15 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
            ) : (
              <p className="text-sm font-sans text-[#161514] py-1">
                {profile.email}
              </p>
            )}
            {errors.email && (
              <p className="text-[11px] text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <label className="block text-xs font-sans uppercase tracking-wider text-[#161514] font-medium">
              Phone Number
            </label>
            {isEditing ? (
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#161514]/15 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
            ) : (
              <p className="text-sm font-sans text-[#161514] py-1">
                {profile.phone}
              </p>
            )}
            {errors.phone && (
              <p className="text-[11px] text-red-600">{errors.phone}</p>
            )}
          </div>
        </div>

        {/* Demo Disclaimer & Save Actions */}
        <div className="pt-2 border-t border-[#161514]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-[11px] font-sans text-[#5A5650] italic">
            Demo only — profile changes reset after page refresh.
          </span>

          {isEditing && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-[#161514]/20 text-xs font-sans uppercase tracking-wider text-[#5A5650] hover:text-[#161514]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#161514] text-[#FAF8F5] text-xs font-medium uppercase tracking-[0.15em] hover:bg-[#C5A880] hover:text-[#161514] transition-all"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </form>
    </section>
  );
}
