"use client";

import React from "react";
import { VendorBooking } from "@/data/vendorBookings";
import {
  formatBookingStatus,
  formatPaymentStatus,
  formatIndianCurrency,
  calculateAmountOutstanding,
} from "@/lib/vendorBookings";
import { MapPin, Calendar, ArrowUpRight } from "lucide-react";

interface BookingListItemProps {
  booking: VendorBooking;
  onSelect: (booking: VendorBooking) => void;
  isSelected?: boolean;
}

export const BookingListItem: React.FC<BookingListItemProps> = ({
  booking,
  onSelect,
  isSelected = false,
}) => {
  const outstanding = calculateAmountOutstanding(booking);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "INQUIRY":
        return "bg-amber-100 text-amber-900 border border-amber-300";
      case "CONFIRMED":
        return "bg-[#161514] text-[#FAF8F5]";
      case "IN_PROGRESS":
        return "bg-[#C5A880]/20 text-[#161514] border border-[#C5A880]/40";
      case "COMPLETED":
        return "bg-emerald-100 text-emerald-800 border border-emerald-300";
      case "CANCELLED":
        return "bg-rose-100 text-rose-800 line-through opacity-70";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case "PAID":
        return "text-emerald-700 font-semibold";
      case "OVERDUE":
        return "text-rose-700 font-semibold";
      case "PARTIALLY_PAID":
        return "text-amber-800 font-medium";
      case "NOT_STARTED":
      default:
        return "text-slate-600";
    }
  };

  return (
    <>
      {/* Desktop Table Row */}
      <tr
        onClick={() => onSelect(booking)}
        className={`hidden md:table-row border-b border-[#161514]/10 cursor-pointer transition-colors group ${
          isSelected
            ? "bg-[#161514]/5"
            : "hover:bg-[#161514]/[0.02]"
        }`}
      >
        {/* Couple & Ref */}
        <td className="py-4 px-4 text-xs">
          <div>
            <div className="font-serif text-base text-[#161514] font-medium group-hover:text-[#C5A880] transition-colors">
              {booking.coupleName}
              {booking.partnerName ? ` & ${booking.partnerName}` : ""}
            </div>
            <div className="text-[10px] font-mono text-[#5A5650] mt-0.5">
              {booking.bookingReference} &bull; {booking.source}
            </div>
          </div>
        </td>

        {/* Location & Service */}
        <td className="py-4 px-4 text-xs text-[#161514]">
          <div className="line-clamp-1 max-w-[200px] font-medium">{booking.serviceName}</div>
          <div className="text-[11px] text-[#5A5650] flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3 text-[#5A5650]/60 shrink-0" />
            <span className="line-clamp-1">
              {booking.destination}
              {booking.venue ? ` (${booking.venue})` : ""}
            </span>
          </div>
        </td>

        {/* Wedding Date */}
        <td className="py-4 px-4 text-xs text-[#161514]">
          <div className="flex items-center gap-1.5 font-medium">
            <Calendar className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
            <span>
              {booking.weddingDate
                ? new Date(booking.weddingDate).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "Flexible"}
            </span>
          </div>
          <div className="text-[10px] text-[#5A5650] capitalize mt-0.5">
            {booking.weddingDateStatus.toLowerCase()}
          </div>
        </td>

        {/* Status */}
        <td className="py-4 px-4 text-xs">
          <span
            className={`inline-block text-[10px] uppercase font-semibold tracking-wider px-2.5 py-1 ${getStatusBadge(
              booking.bookingStatus
            )}`}
          >
            {formatBookingStatus(booking.bookingStatus)}
          </span>
        </td>

        {/* Financials & Payment */}
        <td className="py-4 px-4 text-xs">
          <div className="font-medium text-[#161514]">
            {formatIndianCurrency(booking.totalAmount)}
          </div>
          <div className={`text-[11px] ${getPaymentBadge(booking.paymentStatus)}`}>
            {formatPaymentStatus(booking.paymentStatus)}
            {outstanding > 0 && ` (${formatIndianCurrency(outstanding)} pending)`}
          </div>
        </td>

        {/* Action button */}
        <td className="py-4 px-4 text-xs text-right">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(booking);
            }}
            className="inline-flex items-center gap-1 text-xs text-[#161514] font-medium hover:text-[#C5A880] transition-colors"
          >
            <span>Dossier</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </td>
      </tr>

      {/* Mobile Stacked Card View */}
      <div
        onClick={() => onSelect(booking)}
        className="md:hidden p-4 border border-[#161514]/10 mb-3 bg-[#FAF8F5] cursor-pointer hover:border-[#161514]/30 transition-all"
      >
        <div className="flex items-center justify-between mb-2">
          <span
            className={`text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 ${getStatusBadge(
              booking.bookingStatus
            )}`}
          >
            {formatBookingStatus(booking.bookingStatus)}
          </span>
          <span className="text-[10px] font-mono text-[#5A5650]">
            {booking.bookingReference}
          </span>
        </div>

        <h3 className="font-serif text-lg font-medium text-[#161514] mb-1">
          {booking.coupleName}
          {booking.partnerName ? ` & ${booking.partnerName}` : ""}
        </h3>

        <p className="text-xs text-[#5A5650] mb-2">{booking.serviceName}</p>

        <div className="flex items-center justify-between text-xs text-[#5A5650] pt-2 border-t border-[#161514]/10">
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#5A5650]/70" />
            <span>{booking.destination}</span>
          </div>
          <div className="font-semibold text-[#161514]">
            {formatIndianCurrency(booking.totalAmount)}
          </div>
        </div>
      </div>
    </>
  );
};
