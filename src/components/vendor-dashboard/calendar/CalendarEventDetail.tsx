"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  VendorCalendarEvent,
  CalendarEventStatus,
} from "@/data/vendorCalendar";
import {
  formatCalendarDate,
  formatCalendarEventType,
  calculateEventDuration,
  formatCalendarPriority,
} from "@/lib/vendorCalendar";
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Tag,
  Edit,
  CheckCircle,
  ExternalLink,
  Trash2,
} from "lucide-react";

interface CalendarEventDetailProps {
  event: VendorCalendarEvent | null;
  onClose: () => void;
  onUpdateStatus: (eventId: string, newStatus: CalendarEventStatus) => void;
  onDeleteEvent: (eventId: string) => void;
  onOpenEditModal: (event: VendorCalendarEvent) => void;
}

export const CalendarEventDetail: React.FC<CalendarEventDetailProps> = ({
  event,
  onClose,
  onUpdateStatus,
  onDeleteEvent,
  onOpenEditModal,
}) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  // ESC key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!event) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#161514]/60 backdrop-blur-xs transition-opacity duration-200"
      aria-modal="true"
      role="dialog"
      aria-labelledby="calendar-event-detail-title"
    >
      {/* Click outside to close */}
      <div className="flex-1 hidden md:block cursor-pointer" onClick={onClose} />

      {/* Side Panel Workspace */}
      <div className="w-full max-w-2xl bg-[#FAF8F5] h-full overflow-y-auto border-l border-[#161514]/20 p-6 md:p-8 shadow-2xl flex flex-col justify-between">
        <div>
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#161514]/10">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-semibold tracking-[0.2em] text-[#C5A880] uppercase">
                CALENDAR ITEM DOSSIER
              </span>
              <span className="text-xs text-[#5A5650] font-mono">
                #{event.id}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenEditModal(event)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#161514]/20 text-xs font-medium hover:bg-white transition-colors text-[#161514]"
              >
                <Edit className="w-3.5 h-3.5 text-[#5A5650]" />
                <span>Edit</span>
              </button>

              <button
                onClick={onClose}
                className="p-1.5 text-[#161514] hover:bg-[#161514]/10 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
                aria-label="Close event detail"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Title & Type Banner */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 bg-[#161514] text-[#FAF8F5]">
                {formatCalendarEventType(event.type)}
              </span>
              <span className="text-xs text-[#5A5650]">&bull;</span>
              <span className="text-xs text-[#5A5650] font-medium">
                {formatCalendarPriority(event.priority)}
              </span>
            </div>

            <h2 id="calendar-event-detail-title" className="font-serif text-2xl md:text-3xl text-[#161514] font-medium tracking-tight mb-2">
              {event.title}
            </h2>
          </div>

          {/* Quick Actions (Mark Completed / Cancel) */}
          <div className="flex items-center gap-2 mb-6 p-3 bg-white border border-[#161514]/10">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] shrink-0">
              STATUS ACTION:
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => onUpdateStatus(event.id, "COMPLETED")}
                disabled={event.status === "COMPLETED"}
                className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium transition-colors ${
                  event.status === "COMPLETED"
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                    : "bg-[#FAF8F5] border border-[#161514]/20 hover:bg-white text-[#161514]"
                }`}
              >
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Mark Completed</span>
              </button>

              <button
                onClick={() => onUpdateStatus(event.id, "CANCELLED")}
                disabled={event.status === "CANCELLED"}
                className={`px-3 py-1 text-xs font-medium transition-colors ${
                  event.status === "CANCELLED"
                    ? "bg-rose-100 text-rose-800 border border-rose-300 line-through"
                    : "bg-[#FAF8F5] border border-[#161514]/20 hover:bg-white text-rose-700"
                }`}
              >
                Cancel Event
              </button>
            </div>
          </div>

          {/* Particulars Grid */}
          <div className="grid grid-cols-2 gap-4 p-5 bg-white border border-[#161514]/10 mb-6 text-xs">
            {/* Date */}
            <div>
              <div className="flex items-center gap-1.5 text-[#5A5650] uppercase tracking-wider text-[10px] mb-1 font-semibold">
                <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                Event Date
              </div>
              <div className="font-medium text-[#161514]">
                {formatCalendarDate(event.startDate)}
              </div>
            </div>

            {/* Time / Duration */}
            <div>
              <div className="flex items-center gap-1.5 text-[#5A5650] uppercase tracking-wider text-[10px] mb-1 font-semibold">
                <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                Timing & Duration
              </div>
              <div className="font-medium text-[#161514]">
                {calculateEventDuration(event)}
              </div>
            </div>

            {/* Venue / Location */}
            {(event.venue || event.location) && (
              <div>
                <div className="flex items-center gap-1.5 text-[#5A5650] uppercase tracking-wider text-[10px] mb-1 font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                  Venue / Location
                </div>
                <div className="font-medium text-[#161514]">
                  {event.venue || event.location}
                </div>
              </div>
            )}

            {/* Couple Particular */}
            {event.coupleName && (
              <div>
                <div className="flex items-center gap-1.5 text-[#5A5650] uppercase tracking-wider text-[10px] mb-1 font-semibold">
                  <Tag className="w-3.5 h-3.5 text-[#C5A880]" />
                  Couple Particular
                </div>
                <div className="font-medium text-[#161514]">
                  {event.coupleName}
                </div>
              </div>
            )}
          </div>

          {/* Booking Connection */}
          {event.bookingReference && (
            <div className="p-4 bg-white border border-[#161514]/10 mb-6 text-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] block mb-0.5">
                  LINKED CONTRACT BOOKING
                </span>
                <span className="font-serif text-base font-medium text-[#161514]">
                  Reference #{event.bookingReference}
                </span>
              </div>
              <Link
                href="/vendor/dashboard/bookings"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#161514] text-[#FAF8F5] text-xs uppercase tracking-wider font-medium hover:bg-[#161514]/90"
              >
                <span>View Booking</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#C5A880]" />
              </Link>
            </div>
          )}

          {/* Description & Notes */}
          {event.description && (
            <div className="mb-6">
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#5A5650] mb-2">
                DESCRIPTION
              </h4>
              <div className="p-4 bg-white border border-[#161514]/10 text-xs text-[#161514] leading-relaxed">
                {event.description}
              </div>
            </div>
          )}

          {event.notes && (
            <div className="mb-6">
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#5A5650] mb-2">
                INTERNAL NOTES
              </h4>
              <div className="p-4 bg-white border border-[#161514]/10 text-xs text-[#161514] leading-relaxed italic">
                {event.notes}
              </div>
            </div>
          )}

          {/* Delete Option */}
          <div className="pt-4 border-t border-[#161514]/10 flex items-center justify-between">
            <button
              onClick={() => setShowConfirmDelete(true)}
              className="inline-flex items-center gap-1 text-xs text-rose-700 hover:text-rose-900 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Demo Event</span>
            </button>

            {showConfirmDelete && (
              <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-center gap-2">
                <span>Confirm deletion?</span>
                <button
                  onClick={() => onDeleteEvent(event.id)}
                  className="px-2 py-0.5 bg-rose-800 text-white font-semibold text-[10px] uppercase"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowConfirmDelete(false)}
                  className="px-2 py-0.5 border border-rose-300 text-rose-900 text-[10px]"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-[#161514]/10 flex items-center justify-between">
          <span className="text-xs text-[#5A5650]">
            Last updated {new Date(event.updatedAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#161514] text-[#FAF8F5] text-xs font-medium uppercase tracking-wider"
          >
            Close Item
          </button>
        </div>
      </div>
    </div>
  );
};
