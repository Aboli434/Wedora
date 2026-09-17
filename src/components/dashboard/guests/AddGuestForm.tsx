"use client";

import React, { useState, useEffect } from "react";
import {
  Guest,
  GuestGroup,
  GuestStatus,
  MealPreference,
  EventAttendance,
} from "@/data/guests";
import { X, Check } from "lucide-react";

interface AddGuestFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAddGuest: (newGuest: Guest) => void;
}

export function AddGuestForm({
  isOpen,
  onClose,
  onAddGuest,
}: AddGuestFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [group, setGroup] = useState<GuestGroup>("FRIENDS");
  const [status, setStatus] = useState<GuestStatus>("CONFIRMED");
  const [plusOne, setPlusOne] = useState(false);
  const [plusOneName, setPlusOneName] = useState("");
  const [mealPreference, setMealPreference] =
    useState<MealPreference>("VEGETARIAN");
  const [mehendi, setMehendi] = useState<EventAttendance>("YES");
  const [haldi, setHaldi] = useState<EventAttendance>("YES");
  const [wedding, setWedding] = useState<EventAttendance>("YES");
  const [reception, setReception] = useState<EventAttendance>("YES");
  const [notes, setNotes] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState(false);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!name.trim()) {
      errs.name = "Guest full name is required.";
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Please enter a valid email address.";
    }

    if (plusOne && !plusOneName.trim()) {
      errs.plusOneName = "Plus-one companion name is required when enabled.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const newGuest: Guest = {
      id: `gst-custom-${Date.now()}`,
      name: name.trim(),
      email: email.trim() || undefined,
      phone: phone.trim() || undefined,
      group,
      status,
      plusOne,
      plusOneName: plusOne ? plusOneName.trim() : undefined,
      mealPreference,
      events: {
        mehendi,
        haldi,
        wedding,
        reception,
      },
      notes: notes.trim() || undefined,
      invitedAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    };

    onAddGuest(newGuest);
    setSuccessMessage(true);

    setTimeout(() => {
      setSuccessMessage(false);
      // Reset form
      setName("");
      setEmail("");
      setPhone("");
      setGroup("FRIENDS");
      setStatus("CONFIRMED");
      setPlusOne(false);
      setPlusOneName("");
      setMealPreference("VEGETARIAN");
      setMehendi("YES");
      setHaldi("YES");
      setWedding("YES");
      setReception("YES");
      setNotes("");
      setErrors({});
      onClose();
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-guest-title"
    >
      <div className="bg-[#FAF8F5] border border-[#161514]/20 w-full max-w-2xl my-8 p-6 sm:p-8 space-y-6 shadow-2xl relative">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#161514]/15 pb-4">
          <div className="space-y-1">
            <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold">
              NEW INVITATION
            </span>
            <h2 id="add-guest-title" className="font-serif text-2xl text-[#161514] font-light">
              Add New Guest
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1 text-[#5A5650] hover:text-[#161514] transition-colors focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Demo Notice */}
        <div className="p-3 bg-[#161514]/5 border border-[#161514]/10 text-xs font-sans text-[#5A5650]">
          <strong>Note:</strong> Guest details added here update your current session in real-time for demonstration purposes.
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div className="p-3 bg-[#2D4A3E]/10 border border-[#2D4A3E]/30 text-[#2D4A3E] text-xs font-sans flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>Guest successfully added to your celebration list!</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="sm:col-span-2 space-y-1.5">
              <label className="block text-xs font-sans uppercase tracking-wider text-[#161514] font-medium">
                Full Name <span className="text-[#C5A880]">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Vikram & Radhika Malhotra"
                className="w-full px-3 py-2.5 bg-white border border-[#161514]/15 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
              {errors.name && (
                <p className="text-[11px] text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-xs font-sans uppercase tracking-wider text-[#161514] font-medium">
                Email Address (Optional)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="guest@example.com"
                className="w-full px-3 py-2.5 bg-white border border-[#161514]/15 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
              {errors.email && (
                <p className="text-[11px] text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="block text-xs font-sans uppercase tracking-wider text-[#161514] font-medium">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98000 00000"
                className="w-full px-3 py-2.5 bg-white border border-[#161514]/15 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
            </div>

            {/* Group */}
            <div className="space-y-1.5">
              <label className="block text-xs font-sans uppercase tracking-wider text-[#161514] font-medium">
                Guest Group <span className="text-[#C5A880]">*</span>
              </label>
              <select
                value={group}
                onChange={(e) => setGroup(e.target.value as GuestGroup)}
                className="w-full px-3 py-2.5 bg-white border border-[#161514]/15 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              >
                <option value="FAMILY">Family</option>
                <option value="FRIENDS">Friends</option>
                <option value="COLLEAGUES">Colleagues</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            {/* RSVP Status */}
            <div className="space-y-1.5">
              <label className="block text-xs font-sans uppercase tracking-wider text-[#161514] font-medium">
                RSVP Status <span className="text-[#C5A880]">*</span>
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as GuestStatus)}
                className="w-full px-3 py-2.5 bg-white border border-[#161514]/15 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              >
                <option value="CONFIRMED">Confirmed</option>
                <option value="PENDING">Pending</option>
                <option value="INVITED">Invited</option>
                <option value="DECLINED">Declined</option>
              </select>
            </div>
          </div>

          {/* Plus-One Section */}
          <div className="border-t border-[#161514]/10 pt-4 space-y-3">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="plusOneCheckbox"
                checked={plusOne}
                onChange={(e) => setPlusOne(e.target.checked)}
                className="w-4 h-4 accent-[#C5A880]"
              />
              <label htmlFor="plusOneCheckbox" className="text-xs font-sans text-[#161514] font-medium">
                Include Plus-One Companion
              </label>
            </div>

            {plusOne && (
              <div className="space-y-1.5 pl-7">
                <label className="block text-xs font-sans uppercase tracking-wider text-[#161514] font-medium">
                  Plus-One Name <span className="text-[#C5A880]">*</span>
                </label>
                <input
                  type="text"
                  value={plusOneName}
                  onChange={(e) => setPlusOneName(e.target.value)}
                  placeholder="Companion's full name"
                  className="w-full px-3 py-2 bg-white border border-[#161514]/15 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
                />
                {errors.plusOneName && (
                  <p className="text-[11px] text-red-600">{errors.plusOneName}</p>
                )}
              </div>
            )}
          </div>

          {/* Meal Preference */}
          <div className="border-t border-[#161514]/10 pt-4 space-y-1.5">
            <label className="block text-xs font-sans uppercase tracking-wider text-[#161514] font-medium">
              Dietary / Meal Preference
            </label>
            <select
              value={mealPreference}
              onChange={(e) => setMealPreference(e.target.value as MealPreference)}
              className="w-full px-3 py-2.5 bg-white border border-[#161514]/15 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
            >
              <option value="VEGETARIAN">Vegetarian</option>
              <option value="NON_VEGETARIAN">Non-Vegetarian</option>
              <option value="VEGAN">Vegan</option>
              <option value="JAIN">Jain</option>
              <option value="OTHER">Other</option>
              <option value="NOT_SPECIFIED">Not Specified</option>
            </select>
          </div>

          {/* Event Attendance Grid */}
          <div className="border-t border-[#161514]/10 pt-4 space-y-3">
            <span className="block text-xs font-sans uppercase tracking-wider text-[#161514] font-medium">
              Event Attendance
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-sans">
              <div>
                <label className="block text-[10px] text-[#5A5650] uppercase mb-1">
                  Mehendi & Sangeet
                </label>
                <select
                  value={mehendi}
                  onChange={(e) => setMehendi(e.target.value as EventAttendance)}
                  className="w-full p-2 bg-white border border-[#161514]/15 text-xs text-[#161514]"
                >
                  <option value="YES">Yes</option>
                  <option value="NO">No</option>
                  <option value="PENDING">Pending</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] text-[#5A5650] uppercase mb-1">
                  Haldi Celebration
                </label>
                <select
                  value={haldi}
                  onChange={(e) => setHaldi(e.target.value as EventAttendance)}
                  className="w-full p-2 bg-white border border-[#161514]/15 text-xs text-[#161514]"
                >
                  <option value="YES">Yes</option>
                  <option value="NO">No</option>
                  <option value="PENDING">Pending</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] text-[#5A5650] uppercase mb-1">
                  Wedding Ceremony
                </label>
                <select
                  value={wedding}
                  onChange={(e) => setWedding(e.target.value as EventAttendance)}
                  className="w-full p-2 bg-white border border-[#161514]/15 text-xs text-[#161514]"
                >
                  <option value="YES">Yes</option>
                  <option value="NO">No</option>
                  <option value="PENDING">Pending</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] text-[#5A5650] uppercase mb-1">
                  Grand Reception
                </label>
                <select
                  value={reception}
                  onChange={(e) => setReception(e.target.value as EventAttendance)}
                  className="w-full p-2 bg-white border border-[#161514]/15 text-xs text-[#161514]"
                >
                  <option value="YES">Yes</option>
                  <option value="NO">No</option>
                  <option value="PENDING">Pending</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="border-t border-[#161514]/10 pt-4 space-y-1.5">
            <label className="block text-xs font-sans uppercase tracking-wider text-[#161514] font-medium">
              Notes & Special Instructions (Optional)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Staying at Taj Fateh Prakash, ground-floor accessibility required."
              className="w-full px-3 py-2 bg-white border border-[#161514]/15 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
            />
          </div>

          {/* Action Buttons */}
          <div className="border-t border-[#161514]/15 pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-[#161514]/20 text-xs font-sans uppercase tracking-wider text-[#5A5650] hover:text-[#161514] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#161514] text-[#FAF8F5] text-xs font-medium uppercase tracking-[0.15em] hover:bg-[#C5A880] hover:text-[#161514] transition-all duration-300 shadow-sm"
            >
              Save Guest
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
