"use client";

import React from "react";
import { VendorBooking } from "@/data/vendorBookings";
import { BookingListItem } from "./BookingListItem";

interface BookingListProps {
  bookings: VendorBooking[];
  selectedBookingId?: string;
  onSelectBooking: (booking: VendorBooking) => void;
  onResetFilters: () => void;
}

export const BookingList: React.FC<BookingListProps> = ({
  bookings,
  selectedBookingId,
  onSelectBooking,
  onResetFilters,
}) => {
  if (bookings.length === 0) {
    return (
      <div className="py-12 px-4 border border-dashed border-[#161514]/20 text-center bg-[#FAF8F5]/60">
        <h3 className="font-serif text-lg text-[#161514] mb-2 font-medium">
          No bookings match your active search or filters.
        </h3>
        <p className="text-xs text-[#5A5650] max-w-md mx-auto mb-4">
          Try loosening your filter selections or clearing your search term to see all recorded contract bookings.
        </p>
        <button
          onClick={onResetFilters}
          className="px-4 py-2 bg-[#161514] text-[#FAF8F5] text-xs uppercase tracking-wider font-medium hover:bg-[#161514]/90 transition-colors"
        >
          Reset All Filters
        </button>
      </div>
    );
  }

  return (
    <section className="mb-12">
      {/* Desktop Editorial Data Table */}
      <div className="hidden md:block overflow-x-auto border border-[#161514]/10 bg-[#FAF8F5]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#161514]/15 bg-[#161514]/[0.02]">
              <th className="py-3.5 px-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#5A5650]">
                COUPLE & REFERENCE
              </th>
              <th className="py-3.5 px-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#5A5650]">
                SERVICE & LOCATION
              </th>
              <th className="py-3.5 px-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#5A5650]">
                WEDDING DATE
              </th>
              <th className="py-3.5 px-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#5A5650]">
                STATUS
              </th>
              <th className="py-3.5 px-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#5A5650]">
                FINANCIALS & PAYMENT
              </th>
              <th className="py-3.5 px-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#5A5650] text-right">
                DOSSIER
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <BookingListItem
                key={booking.id}
                booking={booking}
                onSelect={onSelectBooking}
                isSelected={booking.id === selectedBookingId}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List View */}
      <div className="md:hidden space-y-3">
        {bookings.map((booking) => (
          <BookingListItem
            key={booking.id}
            booking={booking}
            onSelect={onSelectBooking}
            isSelected={booking.id === selectedBookingId}
          />
        ))}
      </div>
    </section>
  );
};
