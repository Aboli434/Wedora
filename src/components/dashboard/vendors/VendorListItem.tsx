"use client";

import React from "react";
import { DashboardVendor } from "@/data/vendorsDashboard";
import {
  formatVendorCategory,
  formatVendorStatus,
  formatPaymentStatus,
  formatVendorEvent,
  formatIndianCurrency,
} from "@/lib/vendorsDashboard";
import { ChevronRight, Calendar } from "lucide-react";

interface VendorListItemProps {
  vendor: DashboardVendor;
  onSelect: (vendor: DashboardVendor) => void;
}

export function VendorTableRow({ vendor, onSelect }: VendorListItemProps) {
  const statusInfo = formatVendorStatus(vendor.status);
  const paymentInfo = formatPaymentStatus(vendor.paymentStatus);

  return (
    <tr
      onClick={() => onSelect(vendor)}
      className="border-b border-[#161514]/10 hover:bg-[#161514]/[0.02] cursor-pointer transition-colors group"
    >
      {/* Vendor Name & Location */}
      <td className="py-4 px-4 align-middle">
        <div className="space-y-0.5">
          <span className="font-serif text-base text-[#161514] font-medium block group-hover:text-[#C5A880] transition-colors">
            {vendor.name}
          </span>
          <span className="text-xs font-sans text-[#5A5650] block">
            {vendor.location}
          </span>
        </div>
      </td>

      {/* Category */}
      <td className="py-4 px-4 align-middle">
        <span className="text-xs font-sans uppercase tracking-wider text-[#5A5650]">
          {formatVendorCategory(vendor.category)}
        </span>
      </td>

      {/* Event Association */}
      <td className="py-4 px-4 align-middle text-xs font-sans text-[#5A5650]">
        <span className="inline-flex items-center gap-1 bg-[#161514]/5 px-2 py-0.5 text-[11px]">
          <Calendar className="w-3 h-3 text-[#C5A880]" />
          {formatVendorEvent(vendor.event)}
        </span>
      </td>

      {/* Booking Status */}
      <td className="py-4 px-4 align-middle">
        <span
          className={`inline-block px-2.5 py-1 border text-[10px] font-sans uppercase tracking-wider ${statusInfo.badgeClass}`}
        >
          {statusInfo.label}
        </span>
      </td>

      {/* Payment Status */}
      <td className="py-4 px-4 align-middle">
        <div className="space-y-0.5">
          <span
            className={`inline-block px-2 py-0.5 border text-[10px] font-sans uppercase tracking-wider ${paymentInfo.badgeClass}`}
          >
            {paymentInfo.label}
          </span>
          {vendor.amount ? (
            <span className="text-[11px] font-sans text-[#5A5650] block">
              {formatIndianCurrency(vendor.amount)}
            </span>
          ) : null}
        </div>
      </td>

      {/* Next Action */}
      <td className="py-4 px-4 align-middle text-xs font-sans text-[#5A5650] max-w-xs truncate">
        {vendor.nextAction || "No action recorded"}
      </td>

      {/* Arrow Action */}
      <td className="py-4 px-4 align-middle text-right">
        <ChevronRight className="w-4 h-4 text-[#5A5650] group-hover:text-[#161514] group-hover:translate-x-0.5 transition-all inline-block" />
      </td>
    </tr>
  );
}

export function VendorCard({ vendor, onSelect }: VendorListItemProps) {
  const statusInfo = formatVendorStatus(vendor.status);
  const paymentInfo = formatPaymentStatus(vendor.paymentStatus);

  return (
    <div
      onClick={() => onSelect(vendor)}
      className="bg-white border border-[#161514]/15 p-4 space-y-3 cursor-pointer hover:border-[#C5A880] transition-colors"
    >
      <div className="flex items-start justify-between gap-3 border-b border-[#161514]/10 pb-2.5">
        <div>
          <h3 className="font-serif text-lg text-[#161514] font-medium">
            {vendor.name}
          </h3>
          <span className="text-xs font-sans uppercase tracking-wider text-[#5A5650]">
            {formatVendorCategory(vendor.category)} • {vendor.location}
          </span>
        </div>

        <span
          className={`inline-block px-2.5 py-1 border text-[10px] font-sans uppercase tracking-wider ${statusInfo.badgeClass}`}
        >
          {statusInfo.label}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs font-sans text-[#5A5650]">
        <div>
          <span className="block text-[10px] uppercase tracking-wider text-[#5A5650]/70">
            Event Function
          </span>
          <span className="text-[#161514]">
            {formatVendorEvent(vendor.event)}
          </span>
        </div>

        <div>
          <span className="block text-[10px] uppercase tracking-wider text-[#5A5650]/70">
            Payment Status
          </span>
          <span
            className={`inline-block px-2 py-0.5 border text-[10px] font-sans uppercase tracking-wider ${paymentInfo.badgeClass}`}
          >
            {paymentInfo.label}
          </span>
        </div>
      </div>

      {vendor.nextAction && (
        <div className="pt-2 border-t border-[#161514]/10 text-xs font-sans">
          <span className="block text-[10px] text-[#5A5650] uppercase">Next Step</span>
          <p className="text-[#161514] font-medium truncate">{vendor.nextAction}</p>
        </div>
      )}

      <div className="flex items-center justify-between pt-2 border-t border-[#161514]/10 text-xs font-sans">
        <span className="text-[#5A5650]">
          {vendor.amount ? formatIndianCurrency(vendor.amount) : "No fee set"}
        </span>
        <span className="inline-flex items-center gap-1 text-[#161514] font-medium uppercase tracking-wider text-[11px]">
          View Vendor
          <ChevronRight className="w-3.5 h-3.5 text-[#C5A880]" />
        </span>
      </div>
    </div>
  );
}

export const VendorListItem = VendorTableRow;
