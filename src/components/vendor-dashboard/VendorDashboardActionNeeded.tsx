"use client";

import React from "react";
import Link from "next/link";
import { FullVendorDashboardData } from "@/data/vendorDashboard";
import { AlertCircle, CheckCircle2, ChevronRight } from "lucide-react";

interface VendorDashboardActionNeededProps {
  data: FullVendorDashboardData;
}

export interface VendorActionCard {
  id: string;
  badge: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

export const VendorDashboardActionNeeded: React.FC<
  VendorDashboardActionNeededProps
> = ({ data }) => {
  const actions: VendorActionCard[] = [];

  // Check for new enquiry
  const newEnquiry = data.enquiries.find((e) => e.status === "NEW");
  if (newEnquiry) {
    actions.push({
      id: "act-new-enquiry",
      badge: "New Enquiry",
      title: `New enquiry from ${newEnquiry.coupleNames}`,
      description: `Requested ${newEnquiry.serviceRequested} for ${newEnquiry.destination} on ${newEnquiry.weddingDate}.`,
      ctaLabel: "Review Enquiry",
      ctaHref: "/vendor/dashboard/enquiries",
    });
  }

  // Check for action items from dataset
  data.actionItems.forEach((item) => {
    if (actions.length >= 3) return;
    const exists = actions.some((a) => a.title.includes(item.title));
    if (!exists) {
      let href = "/vendor/dashboard/enquiries";
      if (item.type === "BOOKING") href = "/vendor/dashboard/bookings";
      if (item.type === "PAYMENT") href = "/vendor/dashboard/payments";
      if (item.type === "PROFILE") href = "/vendor/dashboard/business";

      actions.push({
        id: item.id,
        badge: item.type,
        title: item.title,
        description: item.description,
        ctaLabel: item.type === "PAYMENT" ? "Review Payment" : item.type === "BOOKING" ? "Review Booking" : "View Action",
        ctaHref: href,
      });
    }
  });

  const displayActions = actions.slice(0, 3);

  return (
    <section aria-label="Action Needed" className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#161514] flex items-center gap-2 font-sans">
          <AlertCircle className="w-4 h-4 text-[#C5A880]" />
          ACTION NEEDED
        </h3>
        <span className="text-[11px] text-[#5A5650] font-mono">
          {displayActions.length} item{displayActions.length === 1 ? "" : "s"} require attention
        </span>
      </div>

      {displayActions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {displayActions.map((action) => (
            <div
              key={action.id}
              className="bg-white border border-[#161514]/10 rounded-sm p-4 space-y-3 flex flex-col justify-between hover:border-[#161514]/30 transition-colors shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C5A880] px-2 py-0.5 bg-[#C5A880]/10 border border-[#C5A880]/20 rounded-xs">
                    {action.badge}
                  </span>
                </div>
                <h4 className="font-serif text-lg font-medium text-[#161514]">
                  {action.title}
                </h4>
                <p className="text-xs text-[#5A5650] mt-1 font-sans leading-relaxed">
                  {action.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#161514]/5">
                <Link
                  href={action.ctaHref}
                  className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-[#161514] hover:text-[#C5A880] transition-colors group"
                >
                  <span>{action.ctaLabel}</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-[#161514]/10 rounded-sm p-6 text-center space-y-2">
          <CheckCircle2 className="w-6 h-6 text-[#C5A880] mx-auto" />
          <h4 className="font-serif text-lg font-normal text-[#161514]">
            You&apos;re all caught up.
          </h4>
          <p className="text-xs text-[#5A5650] font-sans">
            Your studio has no urgent actions right now.
          </p>
        </div>
      )}
    </section>
  );
};
