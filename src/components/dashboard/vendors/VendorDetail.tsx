"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { DashboardVendor } from "@/data/vendorsDashboard";
import {
  formatVendorCategory,
  formatVendorStatus,
  formatPaymentStatus,
  formatVendorEvent,
  formatIndianCurrency,
  calculatePaymentProgress,
} from "@/lib/vendorsDashboard";
import { X, ExternalLink, Mail, Phone, MapPin, CreditCard, Clock } from "lucide-react";

interface VendorDetailProps {
  vendor: DashboardVendor | null;
  onClose: () => void;
}

export function VendorDetail({ vendor, onClose }: VendorDetailProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && vendor) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [vendor, onClose]);

  if (!vendor) return null;

  const statusInfo = formatVendorStatus(vendor.status);
  const paymentInfo = formatPaymentStatus(vendor.paymentStatus);
  const progress = calculatePaymentProgress(vendor);
  const amount = vendor.amount || 0;
  const paid = vendor.amountPaid || 0;
  const outstanding = Math.max(0, amount - paid);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="vendor-detail-title"
    >
      <div className="bg-[#FAF8F5] border border-[#161514]/20 w-full max-w-xl my-8 p-6 sm:p-8 space-y-6 shadow-2xl relative">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#161514]/15 pb-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold">
                VENDOR DOSSIER
              </span>
              <span
                className={`inline-block px-2 py-0.5 border text-[10px] font-sans uppercase tracking-wider ${statusInfo.badgeClass}`}
              >
                {statusInfo.label}
              </span>
            </div>
            <h2 id="vendor-detail-title" className="font-serif text-2xl text-[#161514] font-medium">
              {vendor.name}
            </h2>
            <div className="flex items-center gap-3 text-xs font-sans text-[#5A5650]">
              <span className="uppercase tracking-wider font-medium text-[#161514]">
                {formatVendorCategory(vendor.category)}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#C5A880]" />
                {vendor.location}
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

        {/* Description */}
        <p className="text-xs font-sans text-[#5A5650] leading-relaxed italic bg-white/60 p-3 border border-[#161514]/10">
          &ldquo;{vendor.description}&rdquo;
        </p>

        {/* Content Body */}
        <div className="space-y-5 text-xs font-sans text-[#161514]">
          {/* Function & Booking Date Grid */}
          <div className="grid grid-cols-2 gap-4 border-b border-[#161514]/10 pb-4">
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-[#5A5650] font-semibold mb-1">
                Assigned Event Function
              </span>
              <span className="font-serif text-base text-[#161514]">
                {formatVendorEvent(vendor.event)}
              </span>
            </div>

            <div>
              <span className="block text-[10px] uppercase tracking-wider text-[#5A5650] font-semibold mb-1">
                Booking Date
              </span>
              <span className="font-serif text-base text-[#161514]">
                {vendor.bookingDate || "Pending confirmation"}
              </span>
            </div>
          </div>

          {/* Next Action Milestone */}
          {vendor.nextAction && (
            <div className="p-3 bg-[#C5A880]/10 border border-[#C5A880]/20 space-y-1">
              <span className="block text-[10px] uppercase tracking-wider text-[#8C6D3B] font-semibold flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#C5A880]" />
                Next Milestone & Action
              </span>
              <p className="font-serif text-base text-[#161514] font-medium">
                {vendor.nextAction}
              </p>
              {vendor.nextActionDate && (
                <span className="text-[11px] font-sans text-[#5A5650] block">
                  Target completion date: {vendor.nextActionDate}
                </span>
              )}
            </div>
          )}

          {/* Financial Breakdown Section */}
          <div className="space-y-3 border-b border-[#161514]/10 pb-4">
            <div className="flex items-center justify-between">
              <span className="block text-[10px] uppercase tracking-wider text-[#5A5650] font-semibold flex items-center gap-1">
                <CreditCard className="w-3 h-3 text-[#C5A880]" />
                Financial Schedule & Payments
              </span>
              <span
                className={`inline-block px-2 py-0.5 border text-[10px] font-sans uppercase tracking-wider ${paymentInfo.badgeClass}`}
              >
                {paymentInfo.label}
              </span>
            </div>

            {amount > 0 ? (
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-3 p-3 bg-white/60 border border-[#161514]/10 text-center">
                  <div>
                    <span className="block text-[10px] text-[#5A5650] uppercase">Total Fee</span>
                    <span className="font-serif text-base font-light text-[#161514]">
                      {formatIndianCurrency(amount)}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#2D4A3E] uppercase">Paid</span>
                    <span className="font-serif text-base font-light text-[#2D4A3E]">
                      {formatIndianCurrency(paid)}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#8C6D3B] uppercase">Due</span>
                    <span className="font-serif text-base font-light text-[#8C6D3B]">
                      {formatIndianCurrency(outstanding)}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-sans">
                    <span className="text-[#5A5650]">Payment Completion</span>
                    <span className="font-medium text-[#161514]">{progress}%</span>
                  </div>
                  <div
                    className="w-full h-1.5 bg-[#161514]/10 overflow-hidden"
                    role="progressbar"
                    aria-valuenow={progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${vendor.name} payment completion: ${progress} percent.`}
                  >
                    <div
                      className="h-full bg-[#C5A880] transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs font-sans text-[#5A5650]">
                No financial contract amount recorded yet.
              </p>
            )}
          </div>

          {/* Contact Details */}
          <div className="space-y-2 border-b border-[#161514]/10 pb-4">
            <span className="block text-[10px] uppercase tracking-wider text-[#5A5650] font-semibold">
              Contact Information
            </span>
            <div className="space-y-1.5 text-xs">
              {vendor.contactName && (
                <span className="text-[#161514] font-medium block">
                  Primary Contact: {vendor.contactName}
                </span>
              )}
              <div className="flex items-center gap-2 text-[#5A5650]">
                <Mail className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{vendor.contactEmail || "No contact email recorded"}</span>
              </div>
              <div className="flex items-center gap-2 text-[#5A5650]">
                <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{vendor.contactPhone || "No contact phone recorded"}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {vendor.notes && (
            <div className="space-y-1">
              <span className="block text-[10px] uppercase tracking-wider text-[#5A5650] font-semibold">
                Notes & Reminders
              </span>
              <p className="text-xs font-sans text-[#5A5650] leading-relaxed bg-white/60 p-3 border border-[#161514]/10">
                {vendor.notes}
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="border-t border-[#161514]/15 pt-4 flex items-center justify-between gap-3">
          {vendor.slug ? (
            <Link
              href={`/vendors/${vendor.slug}`}
              className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-wider text-[#161514] hover:text-[#C5A880] font-medium transition-colors"
            >
              <span>View Public Profile</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#C5A880]" />
            </Link>
          ) : (
            <span />
          )}

          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#161514] text-[#FAF8F5] text-xs font-medium uppercase tracking-[0.15em] hover:bg-[#C5A880] hover:text-[#161514] transition-all"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
}
