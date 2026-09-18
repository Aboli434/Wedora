"use client";

import React from "react";
import { VendorEnquiry } from "@/data/vendorEnquiries";
import { calculateResponseDueStatus, formatEnquiryStatus } from "@/lib/vendorEnquiries";
import { AlertCircle, Clock, ArrowRight, CheckCircle2 } from "lucide-react";

interface EnquiriesNeedsAttentionProps {
  enquiriesNeedingAttention: VendorEnquiry[];
  onSelectEnquiry: (enquiry: VendorEnquiry) => void;
}

export const EnquiriesNeedsAttention: React.FC<EnquiriesNeedsAttentionProps> = ({
  enquiriesNeedingAttention,
  onSelectEnquiry,
}) => {
  const count = enquiriesNeedingAttention.length;

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#161514]/10">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-[#C5A880]" />
          <h2 className="font-serif text-lg font-medium text-[#161514]">
            Needs Attention
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
            No pending responses or high-priority items require immediate action.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {enquiriesNeedingAttention.map((enquiry) => {
            const dueInfo = calculateResponseDueStatus(enquiry);
            const isHighPriority = enquiry.priority === "HIGH";
            const isUnread = enquiry.unread;

            let urgencyLabel = "Requires Action";
            let urgencyBg = "bg-[#161514]/5 text-[#161514]";

            if (dueInfo.state === "OVERDUE") {
              urgencyLabel = dueInfo.label;
              urgencyBg = "bg-rose-50 text-rose-800 border border-rose-200";
            } else if (dueInfo.state === "DUE_SOON") {
              urgencyLabel = dueInfo.label;
              urgencyBg = "bg-amber-50 text-amber-800 border border-amber-200";
            } else if (isHighPriority) {
              urgencyLabel = "High Priority";
              urgencyBg = "bg-[#C5A880]/15 text-[#161514] border border-[#C5A880]/30";
            } else if (isUnread) {
              urgencyLabel = "New & Unread";
              urgencyBg = "bg-[#161514] text-[#FAF8F5]";
            }

            return (
              <div
                key={enquiry.id}
                onClick={() => onSelectEnquiry(enquiry)}
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
                      {formatEnquiryStatus(enquiry.status)}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-medium text-[#161514] group-hover:text-[#C5A880] transition-colors mb-1">
                    {enquiry.coupleName}
                    {enquiry.partnerName ? ` & ${enquiry.partnerName}` : ""}
                  </h3>

                  <p className="text-xs text-[#5A5650] mb-3 line-clamp-1">
                    {enquiry.serviceRequested} &bull; {enquiry.destination}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-[#5A5650]/80">
                    <Clock className="w-3.5 h-3.5 text-[#5A5650]/60 shrink-0" />
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
                </div>

                <div className="mt-5 pt-3 border-t border-[#161514]/10 flex items-center justify-between text-xs font-medium text-[#161514] group-hover:translate-x-0.5 transition-transform">
                  <span>Review & Respond</span>
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
