"use client";

import React from "react";
import Link from "next/link";
import { ClientDashboardData } from "@/data/dashboard";
import { AlertCircle, CheckCircle2, ChevronRight } from "lucide-react";

interface DashboardActionNeededProps {
  data: ClientDashboardData;
}

export interface ActionNeededItem {
  id: string;
  title: string;
  description: string;
  badge: string;
  ctaLabel: string;
  ctaHref: string;
}

export const DashboardActionNeeded: React.FC<DashboardActionNeededProps> = ({
  data,
}) => {
  const actions: ActionNeededItem[] = [];

  if (data.guests.pending > 0) {
    actions.push({
      id: "act-guests-pending",
      title: `${data.guests.pending} guest RSVPs are still pending`,
      description: "Send reminders and follow up before finalizing table seating arrangements.",
      badge: "RSVP Follow-up",
      ctaLabel: "Review Guests",
      ctaHref: "/dashboard/guests",
    });
  }

  if (data.vendors.pendingCount > 0) {
    actions.push({
      id: "act-vendors-pending",
      title: `${data.vendors.pendingCount} vendor shortlist selections pending`,
      description: "Finalize catering and decor design proposals with your lead planners.",
      badge: "Vendor Review",
      ctaLabel: "Review Vendors",
      ctaHref: "/dashboard/vendors",
    });
  }

  if (data.checklist.remaining > 0) {
    actions.push({
      id: "act-checklist-remaining",
      title: `${data.checklist.remaining} checklist items awaiting completion`,
      description: "Review upcoming milestone deadlines scheduled for this month.",
      badge: "Milestones",
      ctaLabel: "View Tasks",
      ctaHref: "/dashboard/checklist",
    });
  }

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
            Nothing needs your urgent attention right now.
          </p>
        </div>
      )}
    </section>
  );
};
