"use client";

import React, { useEffect } from "react";
import { VendorEnquiry, EnquiryStatus, EnquiryPriority } from "@/data/vendorEnquiries";
import {
  formatEnquirySource,
  formatDateStatus,
} from "@/lib/vendorEnquiries";
import { EnquiryStatusControl } from "./EnquiryStatusControl";
import { EnquiryResponseDue } from "./EnquiryResponseDue";
import { EnquiryResponseComposer } from "./EnquiryResponseComposer";
import { EnquiryNotes } from "./EnquiryNotes";
import { EnquiryActivity } from "./EnquiryActivity";
import { EnquiryBookingCTA } from "./EnquiryBookingCTA";
import {
  X,
  Mail,
  Phone,
  MessageSquare,
  Calendar,
  MapPin,
  Users,
  Tag,
  Eye,
  EyeOff,
} from "lucide-react";

interface EnquiryDetailProps {
  enquiry: VendorEnquiry | null;
  onClose: () => void;
  onUpdateStatus: (enquiryId: string, newStatus: EnquiryStatus) => void;
  onUpdatePriority: (enquiryId: string, priority: EnquiryPriority) => void;
  onToggleUnread: (enquiryId: string) => void;
  onSaveDraft: (enquiryId: string, draft: string) => void;
  onMarkResponseSent: (enquiryId: string, message: string) => void;
  onSaveNotes: (enquiryId: string, notes: string) => void;
  onDeleteNotes: (enquiryId: string) => void;
}

export const EnquiryDetail: React.FC<EnquiryDetailProps> = ({
  enquiry,
  onClose,
  onUpdateStatus,
  onUpdatePriority,
  onToggleUnread,
  onSaveDraft,
  onMarkResponseSent,
  onSaveNotes,
  onDeleteNotes,
}) => {
  // ESC key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!enquiry) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#161514]/60 backdrop-blur-xs transition-opacity duration-200"
      aria-modal="true"
      role="dialog"
      aria-labelledby="enquiry-detail-title"
    >
      {/* Click outside to close */}
      <div className="flex-1 hidden md:block cursor-pointer" onClick={onClose} />

      {/* Side Panel Container */}
      <div className="w-full max-w-3xl bg-[#FAF8F5] h-full overflow-y-auto border-l border-[#161514]/20 p-6 md:p-8 shadow-2xl flex flex-col justify-between">
        <div>
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#161514]/10">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-semibold tracking-[0.2em] text-[#C5A880] uppercase">
                ENQUIRY DETAILS
              </span>
              <span className="text-xs text-[#5A5650] font-mono">
                #{enquiry.id}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Mark Read/Unread */}
              <button
                onClick={() => onToggleUnread(enquiry.id)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#161514]/20 text-xs font-medium hover:bg-white transition-colors"
                title={enquiry.unread ? "Mark as read" : "Mark as unread"}
              >
                {enquiry.unread ? (
                  <>
                    <Eye className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Mark Read</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3.5 h-3.5 text-[#5A5650]" />
                    <span>Mark Unread</span>
                  </>
                )}
              </button>

              <button
                onClick={onClose}
                className="p-1.5 text-[#161514] hover:bg-[#161514]/10 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
                aria-label="Close detail panel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Couple Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-[#5A5650] uppercase tracking-wider font-semibold">
                {formatEnquirySource(enquiry.source)}
              </span>
              <span className="text-xs text-[#5A5650]">&bull;</span>
              <span className="text-xs text-[#5A5650]">
                Received {new Date(enquiry.receivedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
              </span>
            </div>

            <h2 id="enquiry-detail-title" className="font-serif text-3xl text-[#161514] font-medium tracking-tight mb-2">
              {enquiry.coupleName}
              {enquiry.partnerName ? ` & ${enquiry.partnerName}` : ""}
            </h2>
          </div>

          {/* Status & Priority Controls */}
          <EnquiryStatusControl
            currentStatus={enquiry.status}
            onChangeStatus={(newStatus) => onUpdateStatus(enquiry.id, newStatus)}
          />

          <div className="flex items-center justify-between mb-6 p-3 bg-white border border-[#161514]/10 text-xs">
            <span className="font-semibold uppercase tracking-wider text-[#5A5650]">
              PRIORITY LEVEL:
            </span>
            <div className="flex items-center gap-2">
              {(["HIGH", "NORMAL", "LOW"] as EnquiryPriority[]).map((p) => (
                <button
                  key={p}
                  onClick={() => onUpdatePriority(enquiry.id, p)}
                  className={`px-3 py-1 text-[11px] font-medium transition-colors ${
                    enquiry.priority === p
                      ? "bg-[#161514] text-[#FAF8F5]"
                      : "bg-[#FAF8F5] text-[#5A5650] border border-[#161514]/15 hover:bg-white"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Response Due Status */}
          <EnquiryResponseDue enquiry={enquiry} />

          {/* Key Particulars Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-5 bg-white border border-[#161514]/10 mb-8 text-xs">
            {/* Date */}
            <div>
              <div className="flex items-center gap-1.5 text-[#5A5650] uppercase tracking-wider text-[10px] mb-1 font-semibold">
                <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                Wedding Date
              </div>
              <div className="font-medium text-[#161514]">
                {enquiry.weddingDate
                  ? new Date(enquiry.weddingDate).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : "Date TBD"}
              </div>
              <div className="text-[10px] text-[#5A5650]">
                {formatDateStatus(enquiry.dateStatus)}
              </div>
            </div>

            {/* Destination */}
            <div>
              <div className="flex items-center gap-1.5 text-[#5A5650] uppercase tracking-wider text-[10px] mb-1 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                Destination
              </div>
              <div className="font-medium text-[#161514]">{enquiry.destination}</div>
            </div>

            {/* Service */}
            <div>
              <div className="flex items-center gap-1.5 text-[#5A5650] uppercase tracking-wider text-[10px] mb-1 font-semibold">
                <Tag className="w-3.5 h-3.5 text-[#C5A880]" />
                Requested Service
              </div>
              <div className="font-medium text-[#161514] line-clamp-1">
                {enquiry.serviceRequested}
              </div>
            </div>

            {/* Guest Count */}
            <div>
              <div className="flex items-center gap-1.5 text-[#5A5650] uppercase tracking-wider text-[10px] mb-1 font-semibold">
                <Users className="w-3.5 h-3.5 text-[#C5A880]" />
                Guest Count
              </div>
              <div className="font-medium text-[#161514]">
                {enquiry.guestCount ? `${enquiry.guestCount} Guests` : "Flexible"}
              </div>
            </div>

            {/* Budget */}
            <div>
              <div className="flex items-center gap-1.5 text-[#5A5650] uppercase tracking-wider text-[10px] mb-1 font-semibold">
                Budget Range
              </div>
              <div className="font-medium text-[#161514]">
                {enquiry.budgetRange || "Standard Deck"}
              </div>
            </div>

            {/* Preferred Contact */}
            <div>
              <div className="flex items-center gap-1.5 text-[#5A5650] uppercase tracking-wider text-[10px] mb-1 font-semibold">
                Preferred Channel
              </div>
              <div className="font-medium text-[#161514] uppercase">
                {enquiry.preferredContactMethod}
              </div>
            </div>
          </div>

          {/* Requested Events List */}
          {enquiry.events && enquiry.events.length > 0 && (
            <div className="mb-8">
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#5A5650] mb-2">
                COVERAGE EVENTS
              </h4>
              <div className="flex flex-wrap gap-2">
                {enquiry.events.map((event, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-white border border-[#161514]/15 text-xs text-[#161514]"
                  >
                    {event}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Couple Contact Card */}
          <div className="mb-8 p-4 bg-white border border-[#161514]/10 text-xs space-y-2">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#5A5650] mb-2">
              CONTACT INFORMATION
            </h4>
            <div className="flex items-center gap-3 text-[#161514]">
              <Mail className="w-3.5 h-3.5 text-[#C5A880]" />
              <a href={`mailto:${enquiry.email}`} className="hover:underline">
                {enquiry.email}
              </a>
            </div>
            {enquiry.phone && (
              <div className="flex items-center gap-3 text-[#161514]">
                <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                <a href={`tel:${enquiry.phone}`} className="hover:underline">
                  {enquiry.phone}
                </a>
              </div>
            )}
            <div className="flex items-center gap-3 text-[#161514]">
              <MessageSquare className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Preferred: {enquiry.preferredContactMethod}</span>
            </div>
          </div>

          {/* Original Message */}
          <div className="mb-8">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#5A5650] mb-2">
              ORIGINAL COUPLE MESSAGE
            </h4>
            <div className="p-4 bg-white border border-[#161514]/15 text-xs text-[#161514] leading-relaxed italic">
              &ldquo;{enquiry.message}&rdquo;
            </div>
          </div>

          {/* Response Composer */}
          <EnquiryResponseComposer
            enquiry={enquiry}
            onSaveDraft={(draft) => onSaveDraft(enquiry.id, draft)}
            onMarkResponseSent={(message) => onMarkResponseSent(enquiry.id, message)}
          />

          {/* Booking CTA */}
          <EnquiryBookingCTA
            status={enquiry.status}
            coupleName={enquiry.coupleName}
          />

          {/* Internal Notes */}
          <EnquiryNotes
            notes={enquiry.notes}
            onSaveNotes={(notes) => onSaveNotes(enquiry.id, notes)}
            onDeleteNotes={() => onDeleteNotes(enquiry.id)}
          />

          {/* Activity Audit Timeline */}
          <EnquiryActivity activities={enquiry.activities} />
        </div>

        {/* Footer actions */}
        <div className="pt-6 border-t border-[#161514]/10 flex items-center justify-between">
          <span className="text-xs text-[#5A5650]">
            Last updated {new Date(enquiry.lastUpdatedAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#161514] text-[#FAF8F5] text-xs font-medium uppercase tracking-wider"
          >
            Close Workspace
          </button>
        </div>
      </div>
    </div>
  );
};
