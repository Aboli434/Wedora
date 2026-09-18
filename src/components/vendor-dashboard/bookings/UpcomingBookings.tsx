"use client";

import React from "react";
import { VendorBooking } from "@/data/vendorBookings";
import {
  formatBookingStatus,
  formatPaymentStatus,
  getPaymentDueStatus,
} from "@/lib/vendorBookings";
import { Calendar, MapPin, ArrowUpRight, Sparkles } from "lucide-react";

interface UpcomingBookingsProps {
  upcomingBookings: VendorBooking[];
  onSelectBooking: (booking: VendorBooking) => void;
}

export const UpcomingBookings: React.FC<UpcomingBookingsProps> = ({
  upcomingBookings,
  onSelectBooking,
}) => {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#161514]/10">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#C5A880]" />
          <h2 className="font-serif text-lg font-medium text-[#161514]">
            Upcoming Celebrations Timeline
          </h2>
        </div>
        <span className="text-xs uppercase tracking-widest text-[#5A5650]">
          CHRONOLOGICAL ORDER
        </span>
      </div>

      {upcomingBookings.length === 0 ? (
        <div className="p-6 border border-dashed border-[#161514]/15 bg-[#FAF8F5] text-center text-xs text-[#5A5650]">
          No upcoming celebrations scheduled in the immediate horizon.
        </div>
      ) : (
        <div className="space-y-3">
          {upcomingBookings.map((booking) => {
            const dueInfo = getPaymentDueStatus(booking);

            return (
              <div
                key={booking.id}
                onClick={() => onSelectBooking(booking)}
                className="group p-5 bg-[#FAF8F5] border border-[#161514]/10 hover:border-[#161514]/30 transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Couple & Location */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono font-medium text-[#5A5650] uppercase tracking-wider">
                      {booking.bookingReference}
                    </span>
                    <span className="text-xs text-[#5A5650]">&bull;</span>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#C5A880]">
                      {booking.source}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-medium text-[#161514] group-hover:text-[#C5A880] transition-colors mb-1">
                    {booking.coupleName}
                    {booking.partnerName ? ` & ${booking.partnerName}` : ""}
                  </h3>

                  <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-xs text-[#5A5650]">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#5A5650]/60 shrink-0" />
                      <span>
                        {booking.destination}
                        {booking.venue ? ` (${booking.venue})` : ""}
                      </span>
                    </div>
                    <span>&bull;</span>
                    <span>{booking.serviceName}</span>
                  </div>
                </div>

                {/* Date & Next Action */}
                <div className="flex flex-col md:items-end justify-center text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-serif text-base text-[#161514] font-medium">
                    <Calendar className="w-4 h-4 text-[#C5A880]" />
                    <span>
                      {new Date(booking.weddingDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  {booking.nextAction && (
                    <div className="text-[11px] text-[#5A5650] flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#C5A880] shrink-0" />
                      <span className="line-clamp-1">{booking.nextAction}</span>
                    </div>
                  )}
                </div>

                {/* Status Badges & Trigger */}
                <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-[#161514]/10">
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] uppercase font-semibold tracking-wider px-2.5 py-0.5 bg-[#161514] text-[#FAF8F5]">
                      {formatBookingStatus(booking.bookingStatus)}
                    </span>
                    <span
                      className={`text-[10px] font-medium ${
                        dueInfo.state === "OVERDUE"
                          ? "text-rose-700 font-semibold"
                          : dueInfo.state === "DUE_SOON"
                          ? "text-amber-700 font-medium"
                          : "text-[#5A5650]"
                      }`}
                    >
                      {formatPaymentStatus(booking.paymentStatus)}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectBooking(booking);
                    }}
                    className="p-2 text-[#161514] hover:text-[#C5A880] transition-colors"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
