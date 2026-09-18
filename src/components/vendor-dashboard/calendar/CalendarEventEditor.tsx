"use client";

import React, { useState } from "react";
import {
  VendorCalendarEvent,
  CalendarEventType,
  CalendarEventStatus,
  CalendarPriority,
} from "@/data/vendorCalendar";
import { X, Check } from "lucide-react";

interface CalendarEventEditorProps {
  isOpen: boolean;
  onClose: () => void;
  eventToEdit?: VendorCalendarEvent | null;
  onSave: (event: Partial<VendorCalendarEvent>) => void;
}

export const CalendarEventEditor: React.FC<CalendarEventEditorProps> = ({
  isOpen,
  onClose,
  eventToEdit,
  onSave,
}) => {
  const isEdit = !!eventToEdit;

  const [title, setTitle] = useState(eventToEdit?.title || "");
  const [description, setDescription] = useState(eventToEdit?.description || "");
  const [type, setType] = useState<CalendarEventType>(eventToEdit?.type || "PREPARATION");
  const [status, setStatus] = useState<CalendarEventStatus>(eventToEdit?.status || "SCHEDULED");
  const [priority, setPriority] = useState<CalendarPriority>(eventToEdit?.priority || "NORMAL");
  const [startDate, setStartDate] = useState(eventToEdit?.startDate || "2026-09-20");
  const [endDate, setEndDate] = useState(eventToEdit?.endDate || "");
  const [startTime, setStartTime] = useState(eventToEdit?.startTime || "10:00");
  const [endTime, setEndTime] = useState(eventToEdit?.endTime || "12:00");
  const [allDay, setAllDay] = useState(eventToEdit?.allDay || false);
  const [coupleName, setCoupleName] = useState(eventToEdit?.coupleName || "");
  const [venue, setVenue] = useState(eventToEdit?.venue || "");
  const [location, setLocation] = useState(eventToEdit?.location || "Mumbai");
  const [notes, setNotes] = useState(eventToEdit?.notes || "");

  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Event title is required.");
      return;
    }
    if (endDate && new Date(endDate).getTime() < new Date(startDate).getTime()) {
      setError("End date cannot precede start date.");
      return;
    }

    setError(null);
    onSave({
      id: eventToEdit?.id,
      title,
      description,
      type,
      status,
      priority,
      startDate,
      endDate: endDate || undefined,
      startTime: allDay ? undefined : startTime,
      endTime: allDay ? undefined : endTime,
      allDay,
      coupleName,
      venue,
      location,
      notes,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#161514]/60 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-[#FAF8F5] border border-[#161514]/20 max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#161514]/10">
          <div>
            <span className="text-[10px] font-semibold tracking-[0.2em] text-[#C5A880] uppercase">
              {isEdit ? "EDIT CALENDAR ITEM" : "NEW CALENDAR ENTRY"}
            </span>
            <h3 className="font-serif text-2xl font-medium text-[#161514]">
              {isEdit ? `Edit ${eventToEdit.title}` : "Create Event / Reminder"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#161514] hover:bg-[#161514]/10 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Title */}
          <div>
            <label htmlFor="calendar-event-title" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
              Event Title *
            </label>
            <input
              id="calendar-event-title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Finalize Aditi & Arjun shot list"
              className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
            />
          </div>

          {/* Status, Type & Priority */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label htmlFor="calendar-event-type" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                Event Type
              </label>
              <select
                id="calendar-event-type"
                value={type}
                onChange={(e) => setType(e.target.value as CalendarEventType)}
                className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              >
                <option value="PREPARATION">Preparation / Logistics</option>
                <option value="REMINDER">Reminder</option>
                <option value="PAYMENT_DUE">Payment Milestone</option>
                <option value="WEDDING_EVENT">Wedding Event</option>
                <option value="BOOKING">Booking Contract Hold</option>
              </select>
            </div>
            <div>
              <label htmlFor="calendar-event-status" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                Status
              </label>
              <select
                id="calendar-event-status"
                value={status}
                onChange={(e) => setStatus(e.target.value as CalendarEventStatus)}
                className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              >
                <option value="SCHEDULED">Scheduled</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
            <div>
              <label htmlFor="calendar-event-priority" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                Priority
              </label>
              <select
                id="calendar-event-priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as CalendarPriority)}
                className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              >
                <option value="NORMAL">Normal Priority</option>
                <option value="HIGH">High Priority</option>
                <option value="LOW">Low Priority</option>
              </select>
            </div>
          </div>

          {/* Date & All Day Toggle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="calendar-start-date" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                Start Date *
              </label>
              <input
                id="calendar-start-date"
                type="date"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
            </div>
            <div>
              <label htmlFor="calendar-end-date" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                End Date (Optional)
              </label>
              <input
                id="calendar-end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="allDayCheckbox"
              checked={allDay}
              onChange={(e) => setAllDay(e.target.checked)}
              className="accent-[#161514]"
            />
            <label htmlFor="allDayCheckbox" className="text-xs text-[#161514] font-medium">
              All-Day Event (no specific start/end time)
            </label>
          </div>

          {!allDay && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-white border border-[#161514]/10">
              <div>
                <label htmlFor="calendar-start-time" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                  Start Time
                </label>
                <input
                  id="calendar-start-time"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full p-2 bg-[#FAF8F5] border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
                />
              </div>
              <div>
                <label htmlFor="calendar-end-time" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                  End Time
                </label>
                <input
                  id="calendar-end-time"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full p-2 bg-[#FAF8F5] border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
                />
              </div>
            </div>
          )}

          {/* Couple & Venue */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="calendar-couple-name" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                Couple Name (Optional)
              </label>
              <input
                id="calendar-couple-name"
                type="text"
                value={coupleName}
                onChange={(e) => setCoupleName(e.target.value)}
                placeholder="e.g. Aditi & Arjun"
                className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
            </div>
            <div>
              <label htmlFor="calendar-location" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                Location / City
              </label>
              <input
                id="calendar-location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Mumbai"
                className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="calendar-venue" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
              Venue Name
            </label>
            <input
              id="calendar-venue"
              type="text"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              placeholder="e.g. The St. Regis Mumbai"
              className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
            />
          </div>

          {/* Description & Notes */}
          <div>
            <label htmlFor="calendar-description" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
              Description
            </label>
            <textarea
              id="calendar-description"
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Details or operational objective..."
              className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
            />
          </div>

          <div>
            <label htmlFor="calendar-notes" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
              Internal Operations Notes
            </label>
            <textarea
              id="calendar-notes"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Private vendor notes..."
              className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
            />
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#161514]/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#161514]/20 text-[#161514]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#161514] text-[#FAF8F5] font-medium uppercase tracking-wider"
            >
              <Check className="w-4 h-4 text-[#C5A880]" />
              {isEdit ? "Update Entry" : "Save Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
