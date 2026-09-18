"use client";

import React from "react";
import Link from "next/link";
import { ClientEvent } from "@/data/vendorClients";
import { Calendar, Clock, MapPin, ArrowUpRight } from "lucide-react";

interface ClientUpcomingEventsProps {
  events: ClientEvent[];
}

export const ClientUpcomingEvents: React.FC<ClientUpcomingEventsProps> = ({
  events,
}) => {
  return (
    <div className="bg-white border border-[#161514]/10 p-5 mb-8">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#161514]/10">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#C5A880]" />
          <h3 className="font-serif text-base font-medium text-[#161514]">
            Ceremony Events Schedule ({events.length})
          </h3>
        </div>
        <Link
          href="/vendor/dashboard/calendar"
          className="text-xs text-[#C5A880] hover:underline flex items-center gap-1 font-medium"
        >
          <span>Open Calendar</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {events.length === 0 ? (
        <p className="text-xs text-[#5A5650] italic">
          No ceremony events scheduled for this client yet.
        </p>
      ) : (
        <div className="space-y-3 text-xs">
          {events.map((evt) => (
            <div
              key={evt.id}
              className="p-3 bg-[#FAF8F5] border border-[#161514]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div>
                <div className="font-serif text-base font-medium text-[#161514]">
                  {evt.name}
                </div>
                <div className="flex items-center gap-3 text-[#5A5650] text-[11px] mt-0.5">
                  <span>
                    {new Date(evt.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  {evt.startTime && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#5A5650]/60" />
                      <span>{evt.startTime} - {evt.endTime}</span>
                    </div>
                  )}
                  {evt.venue && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#5A5650]/60" />
                      <span>{evt.venue}</span>
                    </div>
                  )}
                </div>
              </div>

              <span
                className={`text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 self-start sm:self-center ${
                  evt.status === "COMPLETED"
                    ? "bg-emerald-100 text-emerald-800"
                    : evt.status === "READY"
                    ? "bg-[#161514] text-[#FAF8F5]"
                    : "bg-amber-100 text-amber-900"
                }`}
              >
                {evt.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
