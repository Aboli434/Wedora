"use client";

import React from "react";
import { VendorBooking } from "@/data/vendorBookings";
import { getPaymentDueStatus, formatIndianCurrency, formatBookingStatus } from "@/lib/vendorBookings";
import { AlertCircle, Clock, ArrowRight, CheckCircle2 } from "lucide-react";

interface BookingsNeedsAttentionProps {
  bookingsNeedingAttention: VendorBooking[];
  onSelectBooking: (booking: VendorBooking) => void;
}

export const BookingsNeedsAttention: React.FC<BookingsNeedsAttentionProps> = ({
  bookingsNeedingAttention,
  onSelectBooking,
}) => {
  const count = bookingsNeedingAttention.length;

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#161514]/10">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-[#C5A880]" />
          <h2 className="font-serif text-lg font-medium text-[#161514]">
            Action & Attention Items
          </h2>
        </div>
        <span className="text-xs uppercase tracking-widest text-[#5A5650]">
          {count > 0 ? `${count} ACTIONABLE` : "ALL CAUGHT UP"}
        </span>
      </div>

      {count === 0 ? (
        <div className="p-8 border border-dashed border-[#161514]/15 text-center bg-[#FAF8F5]/50">
          <CheckCircle2 className="w-8 h-8 text-[#C5A880] mx-auto mb-2 opacity-80" />
          <h3 className="font-serif text-base text-[#161514] font-medium mb-1">
            You&apos;re all caught up.
          </h3>
          <p className="text-xs text-[#5A5650]">
            No overdue payments, pending date confirmations, or urgent milestone actions.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookingsNeedingAttention.map((booking) => {
            const dueInfo = getPaymentDueStatus(booking);
            const isOverdue = dueInfo.state === "OVERDUE" || booking.paymentStatus === "OVERDUE";
            const isDueSoon = dueInfo.state === "DUE_SOON";
            const isFlexible = booking.weddingDateStatus === "FLEXIBLE";
            const isInquiry = booking.bookingStatus === "INQUIRY";
            const missingVenue = !booking.venue || booking.venue.trim() === "";

            let urgencyLabel = "Attention Required";
            let urgencyBg = "bg-[#161514]/5 text-[#161514]";

            if (isOverdue) {
              urgencyLabel = `Overdue: ${formatIndianCurrency(booking.nextPaymentAmount || booking.amountOutstanding)}`;
              urgencyBg = "bg-rose-50 text-rose-800 border border-rose-200";
            } else if (isDueSoon) {
              urgencyLabel = dueInfo.label;
              urgencyBg = "bg-amber-50 text-amber-800 border border-amber-200";
            } else if (isInquiry) {
              urgencyLabel = "Pending Hold Confirmation";
              urgencyBg = "bg-[#C5A880]/15 text-[#161514] border border-[#C5A880]/30";
            } else if (isFlexible) {
              urgencyLabel = "Flexible Date Hold";
              urgencyBg = "bg-blue-50 text-blue-800 border border-blue-200";
            } else if (missingVenue) {
              urgencyLabel = "Missing Venue Particulars";
              urgencyBg = "bg-purple-50 text-purple-800 border border-purple-200";
            }

            return (
              <div
                key={booking.id}
                onClick={() => onSelectBooking(booking)}
                className="group relative p-5 bg-[#FAF8F5] border border-[#161514]/10 hover:border-[#161514]/30 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 gap-2">
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 ${urgencyBg}`}
                    >
                      {urgencyLabel}
                    </span>
                    <span className="text-[11px] font-medium text-[#5A5650] uppercase tracking-wider">
                      {formatBookingStatus(booking.bookingStatus)}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-medium text-[#161514] group-hover:text-[#C5A880] transition-colors mb-1">
                    {booking.coupleName}
                    {booking.partnerName ? ` & ${booking.partnerName}` : ""}
                  </h3>

                  <p className="text-xs text-[#5A5650] mb-3 line-clamp-1">
                    {booking.serviceName} &bull; {booking.destination}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-[#5A5650]/80">
                    <Clock className="w-3.5 h-3.5 text-[#5A5650]/60 shrink-0" />
                    <span>
                      {booking.weddingDate
                        ? new Date(booking.weddingDate).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "Flexible Dates"}
                    </span>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-[#161514]/10 flex items-center justify-between text-xs font-medium text-[#161514] group-hover:translate-x-0.5 transition-transform">
                  <span>Open Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
