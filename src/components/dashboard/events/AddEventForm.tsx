"use client";

import React, { useState, useEffect } from "react";
import {
  WeddingEvent,
  EventType,
  EventStatus,
} from "@/data/eventsDashboard";
import { X, Check } from "lucide-react";

interface AddEventFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (newEvent: WeddingEvent) => void;
  initialData?: WeddingEvent | null; // Supports editing existing event if provided
}

export function AddEventForm({
  isOpen,
  onClose,
  onAddEvent,
  initialData,
}: AddEventFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [type, setType] = useState<EventType>(initialData?.type || "MEHENDI");
  const [date, setDate] = useState(initialData?.date || "2027-02-12");
  const [startTime, setStartTime] = useState(initialData?.startTime || "06:00 PM");
  const [endTime, setEndTime] = useState(initialData?.endTime || "10:00 PM");
  const [venue, setVenue] = useState(initialData?.venue || "The Gulab Courtyard");
  const [city, setCity] = useState(initialData?.city || "Udaipur");
  const [description, setDescription] = useState(initialData?.description || "");
  const [status, setStatus] = useState<EventStatus>(initialData?.status || "IN_PROGRESS");
  const [expectedGuestsStr, setExpectedGuestsStr] = useState(
    initialData?.expectedGuests?.toString() || "100"
  );
  const [notes, setNotes] = useState(initialData?.notes || "");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState(false);

  // Close on Escape key
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

    if (!name.trim()) errs.name = "Event function name is required.";
    if (!date) errs.date = "Event date is required.";
    if (!startTime.trim()) errs.startTime = "Start time is required.";
    if (!endTime.trim()) errs.endTime = "End time is required.";
    if (!venue.trim()) errs.venue = "Venue name is required.";
    if (!city.trim()) errs.city = "City location is required.";

    const guests = parseInt(expectedGuestsStr, 10);
    if (isNaN(guests) || guests < 0) {
      errs.expectedGuests = "Expected guest count must be a non-negative number.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const guests = parseInt(expectedGuestsStr, 10) || 100;

    const eventRecord: WeddingEvent = {
      id: initialData ? initialData.id : `evt-custom-${Date.now()}`,
      slug: slug || "custom-event",
      name: name.trim(),
      type,
      date,
      startTime: startTime.trim(),
      endTime: endTime.trim(),
      venue: venue.trim(),
      city: city.trim(),
      description: description.trim() || `${name} celebration function in ${city.trim()}.`,
      status,
      expectedGuests: guests,
      confirmedGuests: initialData ? initialData.confirmedGuests : Math.round(guests * 0.8),
      pendingGuests: initialData ? initialData.pendingGuests : Math.round(guests * 0.2),
      vendors: initialData ? initialData.vendors : [],
      tasks: initialData ? initialData.tasks : [
        {
          id: `tsk-init-${Date.now()}-1`,
          title: "Confirm venue seating & stage arrangement",
          status: "IN_PROGRESS",
          priority: "HIGH",
          dueDate: date,
        },
        {
          id: `tsk-init-${Date.now()}-2`,
          title: "Finalize catering menu & beverage setup",
          status: "TODO",
          priority: "MEDIUM",
          dueDate: date,
        },
      ],
      notes: notes.trim() || undefined,
      updatedAt: new Date().toISOString().split("T")[0],
    };

    onAddEvent(eventRecord);
    setSuccessMessage(true);

    setTimeout(() => {
      setSuccessMessage(false);
      onClose();
    }, 500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-event-title"
    >
      <div className="bg-[#FAF8F5] border border-[#161514]/20 w-full max-w-2xl my-8 p-6 sm:p-8 space-y-6 shadow-2xl relative">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#161514]/15 pb-4">
          <div className="space-y-1">
            <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold">
              {initialData ? "EDIT FUNCTION" : "NEW CELEBRATION FUNCTION"}
            </span>
            <h2 id="add-event-title" className="font-serif text-2xl text-[#161514] font-light">
              {initialData ? "Edit Event Details" : "Add Wedding Function"}
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
          <strong>Note:</strong> Function details update your local demo workspace in real-time.
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div className="p-3 bg-[#2D4A3E]/10 border border-[#2D4A3E]/30 text-[#2D4A3E] text-xs font-sans flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>Event function successfully saved to your celebration timeline!</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Event Name */}
            <div className="sm:col-span-2 space-y-1.5">
              <label className="block text-xs font-sans uppercase tracking-wider text-[#161514] font-medium">
                Function Name <span className="text-[#C5A880]">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Royal Welcome Dinner"
                className="w-full px-3 py-2.5 bg-white border border-[#161514]/15 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
              {errors.name && (
                <p className="text-[11px] text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Event Type */}
            <div className="space-y-1.5">
              <label className="block text-xs font-sans uppercase tracking-wider text-[#161514] font-medium">
                Function Category <span className="text-[#C5A880]">*</span>
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as EventType)}
                className="w-full px-3 py-2.5 bg-white border border-[#161514]/15 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              >
                <option value="MEHENDI">Mehendi & Sangeet</option>
                <option value="HALDI">Haldi Celebration</option>
                <option value="WEDDING">Wedding Ceremony</option>
                <option value="RECEPTION">Grand Reception</option>
                <option value="OTHER">Other Function</option>
              </select>
            </div>

            {/* Event Date */}
            <div className="space-y-1.5">
              <label className="block text-xs font-sans uppercase tracking-wider text-[#161514] font-medium">
                Date <span className="text-[#C5A880]">*</span>
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-[#161514]/15 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
              {errors.date && (
                <p className="text-[11px] text-red-600">{errors.date}</p>
              )}
            </div>

            {/* Start Time */}
            <div className="space-y-1.5">
              <label className="block text-xs font-sans uppercase tracking-wider text-[#161514] font-medium">
                Start Time <span className="text-[#C5A880]">*</span>
              </label>
              <input
                type="text"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                placeholder="e.g. 06:00 PM"
                className="w-full px-3 py-2.5 bg-white border border-[#161514]/15 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
              {errors.startTime && (
                <p className="text-[11px] text-red-600">{errors.startTime}</p>
              )}
            </div>

            {/* End Time */}
            <div className="space-y-1.5">
              <label className="block text-xs font-sans uppercase tracking-wider text-[#161514] font-medium">
                End Time <span className="text-[#C5A880]">*</span>
              </label>
              <input
                type="text"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                placeholder="e.g. 10:30 PM"
                className="w-full px-3 py-2.5 bg-white border border-[#161514]/15 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
              {errors.endTime && (
                <p className="text-[11px] text-red-600">{errors.endTime}</p>
              )}
            </div>

            {/* Venue */}
            <div className="space-y-1.5">
              <label className="block text-xs font-sans uppercase tracking-wider text-[#161514] font-medium">
                Venue <span className="text-[#C5A880]">*</span>
              </label>
              <input
                type="text"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="e.g. The Lake Pavilion"
                className="w-full px-3 py-2.5 bg-white border border-[#161514]/15 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
              {errors.venue && (
                <p className="text-[11px] text-red-600">{errors.venue}</p>
              )}
            </div>

            {/* City */}
            <div className="space-y-1.5">
              <label className="block text-xs font-sans uppercase tracking-wider text-[#161514] font-medium">
                City <span className="text-[#C5A880]">*</span>
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Udaipur"
                className="w-full px-3 py-2.5 bg-white border border-[#161514]/15 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
              {errors.city && (
                <p className="text-[11px] text-red-600">{errors.city}</p>
              )}
            </div>

            {/* Status */}
            <div className="space-y-1.5">
              <label className="block text-xs font-sans uppercase tracking-wider text-[#161514] font-medium">
                Planning Status <span className="text-[#C5A880]">*</span>
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as EventStatus)}
                className="w-full px-3 py-2.5 bg-white border border-[#161514]/15 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              >
                <option value="IN_PROGRESS">In Planning</option>
                <option value="READY">Ready</option>
                <option value="PLANNING">Initial Setup</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>

            {/* Expected Guests */}
            <div className="space-y-1.5">
              <label className="block text-xs font-sans uppercase tracking-wider text-[#161514] font-medium">
                Expected Guests <span className="text-[#C5A880]">*</span>
              </label>
              <input
                type="number"
                value={expectedGuestsStr}
                onChange={(e) => setExpectedGuestsStr(e.target.value)}
                placeholder="e.g. 150"
                className="w-full px-3 py-2.5 bg-white border border-[#161514]/15 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
              {errors.expectedGuests && (
                <p className="text-[11px] text-red-600">{errors.expectedGuests}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="border-t border-[#161514]/10 pt-4 space-y-1.5">
            <label className="block text-xs font-sans uppercase tracking-wider text-[#161514] font-medium">
              Event Description & Theme (Optional)
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the event theme, ambiance, or dress code."
              className="w-full px-3 py-2 bg-white border border-[#161514]/15 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
            />
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <label className="block text-xs font-sans uppercase tracking-wider text-[#161514] font-medium">
              Notes & Special Instructions (Optional)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Acoustic soundcheck at 4 PM. Pandits arriving at 10 AM."
              className="w-full px-3 py-2 bg-white border border-[#161514]/15 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
            />
          </div>

          {/* Buttons */}
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
              Save Event Function
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
