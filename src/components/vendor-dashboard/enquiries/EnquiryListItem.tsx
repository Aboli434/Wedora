"use client";

import React from "react";
import { VendorEnquiry } from "@/data/vendorEnquiries";
import {
  formatEnquiryStatus,
  formatEnquiryPriority,
  calculateResponseDueStatus,
} from "@/lib/vendorEnquiries";
import { MapPin, Calendar, ArrowUpRight } from "lucide-react";

interface EnquiryListItemProps {
  enquiry: VendorEnquiry;
  onSelect: (enquiry: VendorEnquiry) => void;
  isSelected?: boolean;
}

export const EnquiryListItem: React.FC<EnquiryListItemProps> = ({
  enquiry,
  onSelect,
  isSelected = false,
}) => {
  const dueInfo = calculateResponseDueStatus(enquiry);

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return "bg-rose-50 text-rose-800 border-rose-200";
      case "NORMAL":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "LOW":
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "NEW":
        return "bg-[#161514] text-[#FAF8F5]";
      case "REVIEWING":
        return "bg-[#C5A880]/20 text-[#161514] border border-[#C5A880]/40";
      case "RESPONDED":
        return "bg-emerald-50 text-emerald-800 border border-emerald-200";
      case "NEGOTIATING":
        return "bg-indigo-50 text-indigo-800 border border-indigo-200";
      case "ACCEPTED":
        return "bg-[#C5A880] text-[#161514] font-medium";
      case "DECLINED":
        return "bg-rose-100 text-rose-800 line-through opacity-70";
      case "CLOSED":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      {/* Desktop Table Row */}
      <tr
        onClick={() => onSelect(enquiry)}
        className={`hidden md:table-row border-b border-[#161514]/10 cursor-pointer transition-colors group ${
          isSelected
            ? "bg-[#161514]/5"
            : enquiry.unread
            ? "bg-[#FAF8F5] font-medium hover:bg-[#161514]/[0.03]"
            : "hover:bg-[#161514]/[0.02]"
        }`}
      >
        {/* Couple Column */}
        <td className="py-4 px-4 text-xs">
          <div className="flex items-center gap-2.5">
            {enquiry.unread && (
              <span className="w-2 h-2 rounded-full bg-[#C5A880] shrink-0" title="Unread enquiry" />
            )}
            <div>
              <div className="font-serif text-base text-[#161514] font-medium group-hover:text-[#C5A880] transition-colors flex items-center gap-1.5">
                {enquiry.coupleName}
                {enquiry.partnerName ? ` & ${enquiry.partnerName}` : ""}
              </div>
              <div className="text-[11px] text-[#5A5650] flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-[#5A5650]/60 shrink-0" />
                <span>{enquiry.destination}</span>
              </div>
            </div>
          </div>
        </td>

        {/* Service Requested */}
        <td className="py-4 px-4 text-xs text-[#161514]">
          <div className="line-clamp-1 max-w-[200px]">{enquiry.serviceRequested}</div>
          <div className="text-[11px] text-[#5A5650]">{enquiry.budgetRange || "Standard Package"}</div>
        </td>

        {/* Wedding Date */}
        <td className="py-4 px-4 text-xs text-[#161514]">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#5A5650]/70 shrink-0" />
            <span>
              {enquiry.weddingDate
                ? new Date(enquiry.weddingDate).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "Date TBD"}
            </span>
          </div>
          <div className="text-[10px] text-[#5A5650] capitalize mt-0.5">
            {enquiry.dateStatus.toLowerCase()}
          </div>
        </td>

        {/* Status */}
        <td className="py-4 px-4 text-xs">
          <span
            className={`inline-block text-[10px] uppercase font-semibold tracking-wider px-2.5 py-1 ${getStatusStyle(
              enquiry.status
            )}`}
          >
            {formatEnquiryStatus(enquiry.status)}
          </span>
        </td>

        {/* Priority & Due */}
        <td className="py-4 px-4 text-xs">
          <div className="flex flex-col gap-1 items-start">
            <span
              className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 border ${getPriorityStyle(
                enquiry.priority
              )}`}
            >
              {formatEnquiryPriority(enquiry.priority)}
            </span>
            {dueInfo.state !== "NO_DEADLINE" && (
              <span
                className={`text-[10px] ${
                  dueInfo.state === "OVERDUE"
                    ? "text-rose-700 font-semibold"
                    : dueInfo.state === "DUE_SOON"
                    ? "text-amber-700 font-medium"
                    : "text-[#5A5650]"
                }`}
              >
                {dueInfo.label}
              </span>
            )}
          </div>
        </td>

        {/* Received Date */}
        <td className="py-4 px-4 text-xs text-[#5A5650]">
          {new Date(enquiry.receivedAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
          })}
        </td>

        {/* Action */}
        <td className="py-4 px-4 text-xs text-right">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(enquiry);
            }}
            className="inline-flex items-center gap-1 text-xs text-[#161514] font-medium hover:text-[#C5A880] transition-colors"
          >
            <span>View</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </td>
      </tr>

      {/* Mobile Stacked Card View */}
      <div
        onClick={() => onSelect(enquiry)}
        className={`md:hidden p-4 border border-[#161514]/10 mb-3 bg-[#FAF8F5] cursor-pointer hover:border-[#161514]/30 transition-all ${
          enquiry.unread ? "border-l-4 border-l-[#C5A880]" : ""
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <span
            className={`text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 ${getStatusStyle(
              enquiry.status
            )}`}
          >
            {formatEnquiryStatus(enquiry.status)}
          </span>
          <span className="text-[10px] text-[#5A5650]">
            {new Date(enquiry.receivedAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
            })}
          </span>
        </div>

        <h3 className="font-serif text-lg font-medium text-[#161514] mb-1">
          {enquiry.coupleName}
          {enquiry.partnerName ? ` & ${enquiry.partnerName}` : ""}
        </h3>

        <p className="text-xs text-[#5A5650] mb-2">{enquiry.serviceRequested}</p>

        <div className="flex items-center justify-between text-xs text-[#5A5650] pt-2 border-t border-[#161514]/10">
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#5A5650]/70" />
            <span>{enquiry.destination}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-[#5A5650]/70" />
            <span>
              {enquiry.weddingDate
                ? new Date(enquiry.weddingDate).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                  })
                : "TBD"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
