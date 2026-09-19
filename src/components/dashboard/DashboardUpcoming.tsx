"use client";

import React from "react";
import Link from "next/link";
import { ClientDashboardData } from "@/data/dashboard";
import { Calendar, Clock, ChevronRight } from "lucide-react";

interface DashboardUpcomingProps {
  data: ClientDashboardData;
}

export const DashboardUpcoming: React.FC<DashboardUpcomingProps> = ({ data }) => {
  // Select top 3 upcoming events/milestones
  const events = data.upcomingEvents.slice(0, 3);

  return (
    <section aria-label="Upcoming Events & Milestones" className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#161514] flex items-center gap-2 font-sans">
          <Calendar className="w-4 h-4 text-[#C5A880]" />
          UP NEXT ON YOUR ITINERARY
        </h3>
        <Link
          href="/dashboard/events"
          className="text-xs font-medium uppercase tracking-wider text-[#5A5650] hover:text-[#161514] flex items-center gap-1 transition-colors"
        >
          <span>View All Events ({data.upcomingEvents.length})</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {events.map((evt) => (
          <div
            key={evt.id}
            className="bg-white border border-[#161514]/10 rounded-sm p-4 space-y-3 flex flex-col justify-between hover:border-[#161514]/30 transition-colors shadow-xs"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-wider font-semibold text-[#5A5650]">
                <span>{evt.status}</span>
                <span className="text-[#C5A880]">{evt.date}</span>
              </div>
              <h4 className="font-serif text-xl font-medium text-[#161514]">
                {evt.name}
              </h4>
              <p className="text-xs text-[#5A5650] font-sans flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#C5A880]" />
                {evt.time} • {evt.location}
              </p>
            </div>

            <div className="pt-3 border-t border-[#161514]/5">
              <Link
                href="/dashboard/events"
                className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-[#161514] hover:text-[#C5A880] transition-colors group"
              >
                <span>View Event</span>
                <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
