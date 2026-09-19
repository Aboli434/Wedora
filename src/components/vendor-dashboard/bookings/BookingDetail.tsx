"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import {
  VendorBooking,
  BookingStatus,
  BookingEventStatus,
} from "@/data/vendorBookings";
import { formatIndianCurrency } from "@/lib/vendorBookings";
import { BookingStatusControl } from "./BookingStatusControl";
import { BookingPaymentSnapshot } from "./BookingPaymentSnapshot";
import { BookingEventList } from "./BookingEventList";
import { BookingProgress } from "./BookingProgress";
import { BookingNotes } from "./BookingNotes";
import { BookingActivity } from "./BookingActivity";
import {
  X,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Users,
  Tag,
  Edit,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { ContextualLink } from "@/components/common/ContextualLink";

interface BookingDetailProps {
  booking: VendorBooking | null;
  onClose: () => void;
  onUpdateStatus: (bookingId: string, newStatus: BookingStatus) => void;
  onRecordPayment: (bookingId: string, amount: number) => void;
  onUpdateEventStatus: (
    bookingId: string,
    eventId: string,
    newStatus: BookingEventStatus
  ) => void;
  onSaveNotes: (bookingId: string, notes: string) => void;
  onDeleteNotes: (bookingId: string) => void;
  onOpenEditModal: (booking: VendorBooking) => void;
}

export const BookingDetail: React.FC<BookingDetailProps> = ({
  booking,
  onClose,
  onUpdateStatus,
  onRecordPayment,
  onUpdateEventStatus,
  onSaveNotes,
  onDeleteNotes,
  onOpenEditModal,
}) => {
  // ESC listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!booking) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#161514]/60 backdrop-blur-xs transition-opacity duration-200"
      aria-modal="true"
      role="dialog"
      aria-labelledby="booking-detail-title"
    >
      {/* Click outside to close */}
      <div className="flex-1 hidden md:block cursor-pointer" onClick={onClose} />

      {/* Side Panel Workspace */}
      <div className="w-full max-w-3xl bg-[#FAF8F5] h-full overflow-y-auto border-l border-[#161514]/20 p-6 md:p-8 shadow-2xl flex flex-col justify-between">
        <div>
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#161514]/10">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-semibold tracking-[0.2em] text-[#C5A880] uppercase">
                CONTRACT DOSSIER
              </span>
              <span className="text-xs text-[#161514] font-mono font-semibold px-2 py-0.5 bg-white border border-[#161514]/15">
                {booking.bookingReference}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenEditModal(booking)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#161514]/20 text-xs font-medium hover:bg-white transition-colors text-[#161514]"
              >
                <Edit className="w-3.5 h-3.5 text-[#5A5650]" />
                <span>Edit Dossier</span>
              </button>

              <button
                onClick={onClose}
                className="p-1.5 text-[#161514] hover:bg-[#161514]/10 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
                aria-label="Close dossier"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Couple & Source Banner */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-[#5A5650] uppercase tracking-wider font-semibold">
                SOURCE: {booking.source}
              </span>
              {booking.enquiryReferenceId && (
                <>
                  <span className="text-xs text-[#5A5650]">&bull;</span>
                  <Link
                    href="/vendor/dashboard/enquiries"
                    className="inline-flex items-center gap-1 text-xs text-[#C5A880] hover:underline font-medium"
                  >
                    <span>Created from Enquiry #{booking.enquiryReferenceId}</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </>
              )}
            </div>

            <h2 id="booking-detail-title" className="font-serif text-3xl text-[#161514] font-medium tracking-tight mb-2">
              {booking.coupleName}
              {booking.partnerName ? ` & ${booking.partnerName}` : ""}
            </h2>
          </div>

          {/* Status Control */}
          <BookingStatusControl
            currentStatus={booking.bookingStatus}
            onChangeStatus={(newStatus) => onUpdateStatus(booking.id, newStatus)}
          />

          {/* Key Particulars Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-5 bg-white border border-[#161514]/10 mb-8 text-xs">
            {/* Date */}
            <div>
              <div className="flex items-center gap-1.5 text-[#5A5650] uppercase tracking-wider text-[10px] mb-1 font-semibold">
                <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                Wedding Date
              </div>
              <div className="font-medium text-[#161514]">
                {booking.weddingDate
                  ? new Date(booking.weddingDate).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : "Flexible"}
              </div>
              <div className="text-[10px] text-[#5A5650] capitalize">
                {booking.weddingDateStatus.toLowerCase()}
              </div>
            </div>

            {/* Destination & Venue */}
            <div>
              <div className="flex items-center gap-1.5 text-[#5A5650] uppercase tracking-wider text-[10px] mb-1 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                Location
              </div>
              <div className="font-medium text-[#161514]">{booking.destination}</div>
              <div className="text-[10px] text-[#5A5650] truncate">
                {booking.venue || "Venue pending"}
              </div>
            </div>

            {/* Service & Package */}
            <div>
              <div className="flex items-center gap-1.5 text-[#5A5650] uppercase tracking-wider text-[10px] mb-1 font-semibold">
                <Tag className="w-3.5 h-3.5 text-[#C5A880]" />
                Service & Package
              </div>
              <div className="font-medium text-[#161514] truncate">
                {booking.serviceName}
              </div>
              <div className="text-[10px] text-[#5A5650] truncate">
                {booking.packageName}
              </div>
            </div>

            {/* Guest Count */}
            <div>
              <div className="flex items-center gap-1.5 text-[#5A5650] uppercase tracking-wider text-[10px] mb-1 font-semibold">
                <Users className="w-3.5 h-3.5 text-[#C5A880]" />
                Guest Count
              </div>
              <div className="font-medium text-[#161514]">
                {booking.guestCount ? `${booking.guestCount} Guests` : "Not specified"}
              </div>
            </div>

            {/* Financial Value */}
            <div>
              <div className="flex items-center gap-1.5 text-[#5A5650] uppercase tracking-wider text-[10px] mb-1 font-semibold">
                Total Value
              </div>
              <div className="font-medium text-[#161514] font-serif text-sm">
                {formatIndianCurrency(booking.totalAmount)}
              </div>
            </div>

            {/* Next Action */}
            <div>
              <div className="flex items-center gap-1.5 text-[#5A5650] uppercase tracking-wider text-[10px] mb-1 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                Next Action
              </div>
              <div className="font-medium text-[#161514] line-clamp-1">
                {booking.nextAction || "No pending milestone action"}
              </div>
            </div>
          </div>

          {/* Contact Information Card */}
          <div className="mb-8 p-4 bg-white border border-[#161514]/10 text-xs space-y-2">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#5A5650] mb-2">
              CLIENT CONTACT INFORMATION
            </h4>
            <div className="flex items-center gap-3 text-[#161514]">
              <Mail className="w-3.5 h-3.5 text-[#C5A880]" />
              <a href={`mailto:${booking.email}`} className="hover:underline">
                {booking.email}
              </a>
            </div>
            {booking.phone && (
              <div className="flex items-center gap-3 text-[#161514]">
                <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                <a href={`tel:${booking.phone}`} className="hover:underline">
                  {booking.phone}
                </a>
              </div>
            )}
          </div>

          {/* Related Workspace Records Contextual Links */}
          <div className="mb-8 p-4 bg-white border border-[#161514]/10 text-xs">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#5A5650] mb-3">
              RELATED WORKSPACE RECORDS
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ContextualLink
                label="Client"
                value={booking.coupleName}
                href="/vendor/dashboard/clients"
                linkText="View client profile →"
              />
              <ContextualLink
                label="Calendar"
                value={
                  booking.weddingDate
                    ? new Date(booking.weddingDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "Scheduled"
                }
                href="/vendor/dashboard/calendar"
                linkText="View in calendar →"
              />
              <ContextualLink
                label="Payments"
                value={`${formatIndianCurrency(booking.amountOutstanding)} due`}
                href="/vendor/dashboard/payments"
                linkText="View payment details →"
              />
              {(booking.enquiryReferenceId || (booking as { enquiryId?: string }).enquiryId) && (
                <ContextualLink
                  label="Enquiry"
                  value={`Enquiry #${booking.enquiryReferenceId || (booking as { enquiryId?: string }).enquiryId}`}
                  href="/vendor/dashboard/enquiries"
                  linkText="View original enquiry →"
                />
              )}
            </div>
          </div>

          {/* Financial Snapshot */}
          <BookingPaymentSnapshot
            booking={booking}
            onRecordPayment={(amt) => onRecordPayment(booking.id, amt)}
          />

          {/* Progress Bar */}
          <BookingProgress booking={booking} />

          {/* Events Schedule */}
          <BookingEventList
            events={booking.events}
            onUpdateEventStatus={(evtId, newStatus) =>
              onUpdateEventStatus(booking.id, evtId, newStatus)
            }
          />

          {/* Internal Notes */}
          <BookingNotes
            notes={booking.notes}
            onSaveNotes={(notes) => onSaveNotes(booking.id, notes)}
            onDeleteNotes={() => onDeleteNotes(booking.id)}
          />

          {/* Audit Timeline */}
          <BookingActivity activities={booking.activities} />
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-[#161514]/10 flex items-center justify-between">
          <span className="text-xs text-[#5A5650]">
            Last modified {new Date(booking.updatedAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 border border-[#161514]/20 text-[#161514] bg-white hover:bg-[#161514]/5 text-xs font-medium uppercase tracking-wider rounded-sm transition-colors"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
