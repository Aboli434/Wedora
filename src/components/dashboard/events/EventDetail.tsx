"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { WeddingEvent } from "@/data/eventsDashboard";
import {
  formatEventStatus,
  formatEventType,
  calculateEventReadiness,
  calculateEventDuration,
} from "@/lib/eventsDashboard";
import { EventVendorList } from "./EventVendorList";
import { EventTaskList } from "./EventTaskList";
import { EventGuestSummary } from "./EventGuestSummary";
import { ContextualLink } from "@/components/common/ContextualLink";
import { X, Edit, MapPin, ExternalLink, Calendar } from "lucide-react";

interface EventDetailProps {
  event: WeddingEvent | null;
  onClose: () => void;
  onEdit: (event: WeddingEvent) => void;
  onToggleTask: (eventId: string, taskId: string) => void;
}

export function EventDetail({
  event,
  onClose,
  onEdit,
  onToggleTask,
}: EventDetailProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && event) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [event, onClose]);

  if (!event) return null;

  const statusInfo = formatEventStatus(event.status);
  const readiness = calculateEventReadiness(event);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-detail-title"
    >
      <div className="bg-[#FAF8F5] border border-[#161514]/20 w-full max-w-2xl my-8 p-6 sm:p-8 space-y-6 shadow-2xl relative">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#161514]/15 pb-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold">
                EVENT DOSSIER
              </span>
              <span
                className={`inline-block px-2 py-0.5 border text-[10px] font-sans uppercase tracking-wider ${statusInfo.badgeClass}`}
              >
                {statusInfo.label}
              </span>
            </div>
            <h2 id="event-detail-title" className="font-serif text-2xl text-[#161514] font-medium">
              {event.name}
            </h2>
            <div className="flex items-center gap-3 text-xs font-sans text-[#5A5650]">
              <span className="uppercase tracking-wider font-medium text-[#161514]">
                {formatEventType(event.type)}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#C5A880]" />
                {event.venue}, {event.city}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1 text-[#5A5650] hover:text-[#161514] transition-colors focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Date & Readiness Bar */}
        <div className="p-4 bg-white/60 border border-[#161514]/10 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-sans">
            <div className="flex items-center gap-1.5 text-[#161514] font-medium">
              <Calendar className="w-4 h-4 text-[#C5A880]" />
              <span>{event.date}</span>
              <span className="text-[#5A5650]">({calculateEventDuration(event)})</span>
            </div>
            <span className="text-xs font-serif text-[#161514] font-medium">
              Readiness: {readiness}% Prepared
            </span>
          </div>

          <div
            className="w-full h-1.5 bg-[#161514]/10 overflow-hidden"
            role="progressbar"
            aria-valuenow={readiness}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${event.name} readiness: ${readiness} percent.`}
          >
            <div
              className="h-full bg-[#C5A880] transition-all duration-500"
              style={{ width: `${readiness}%` }}
            />
          </div>
        </div>

        {/* Description */}
        <p className="text-xs font-sans text-[#5A5650] leading-relaxed italic bg-white/40 p-3 border border-[#161514]/10">
          &ldquo;{event.description}&rdquo;
        </p>

        {/* Guest Attendance Breakdown */}
        <EventGuestSummary
          expected={event.expectedGuests}
          confirmed={event.confirmedGuests}
          pending={event.pendingGuests}
        />

        {/* Vendors Section */}
        <EventVendorList vendors={event.vendors} />

        {/* Tasks Checklist Section */}
        <EventTaskList
          tasks={event.tasks}
          onToggleTask={(taskId) => onToggleTask(event.id, taskId)}
        />

        {/* Cross-Module Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ContextualLink
            label="Guest Roster"
            value={`${event.confirmedGuests} Confirmed / ${event.expectedGuests} Expected`}
            href="/dashboard/guests"
            actionLabel="View guest roster"
          />
          <ContextualLink
            label="Master Checklist"
            value={`${event.tasks.filter((t) => t.status === "COMPLETED").length}/${event.tasks.length} Completed`}
            href="/dashboard/checklist"
            actionLabel="View master checklist"
          />
        </div>

        {/* Notes */}
        {event.notes && (
          <div className="space-y-1">
            <span className="block text-[10px] uppercase tracking-wider text-[#5A5650] font-semibold">
              Notes & Special Instructions
            </span>
            <p className="text-xs font-sans text-[#5A5650] leading-relaxed bg-white/60 p-3 border border-[#161514]/10">
              {event.notes}
            </p>
          </div>
        )}

        {/* Footer Actions */}
        <div className="border-t border-[#161514]/15 pt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onEdit(event)}
              className="inline-flex items-center gap-1.5 px-4 py-2 border border-[#161514]/20 text-xs font-sans uppercase tracking-wider text-[#161514] hover:bg-[#161514]/5 transition-colors"
            >
              <Edit className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Edit Event</span>
            </button>

            <Link
              href="/dashboard/vendors"
              className="inline-flex items-center gap-1 text-[11px] font-sans uppercase tracking-wider text-[#5A5650] hover:text-[#161514] transition-colors"
            >
              <span>View Vendors</span>
              <ExternalLink className="w-3 h-3 text-[#C5A880]" />
            </Link>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#161514] text-[#FAF8F5] text-xs font-medium uppercase tracking-[0.15em] hover:bg-[#C5A880] hover:text-[#161514] transition-all"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
}
