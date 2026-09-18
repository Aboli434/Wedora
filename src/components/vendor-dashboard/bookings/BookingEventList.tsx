"use client";

import React from "react";
import { BookingEvent, BookingEventStatus } from "@/data/vendorBookings";
import { Calendar, MapPin, Users, Clock, CheckCircle } from "lucide-react";

interface BookingEventListProps {
  events: BookingEvent[];
  onUpdateEventStatus: (eventId: string, newStatus: BookingEventStatus) => void;
}

export const BookingEventList: React.FC<BookingEventListProps> = ({
  events,
  onUpdateEventStatus,
}) => {
  return (
    <div className="bg-white border border-[#161514]/10 p-5 mb-8">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#161514]/10">
        <h3 className="font-serif text-base font-medium text-[#161514]">
          Scheduled Celebration Events ({events.length})
        </h3>
        <span className="text-[10px] uppercase tracking-wider text-[#5A5650]">
          EVENT SCHEDULE
        </span>
      </div>

      {events.length === 0 ? (
        <p className="text-xs text-[#5A5650] italic">
          No specific ceremony events registered for this booking yet.
        </p>
      ) : (
        <div className="space-y-3">
          {events.map((evt) => (
            <div
              key={evt.id}
              className="p-4 bg-[#FAF8F5] border border-[#161514]/10 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <h4 className="font-serif text-base font-medium text-[#161514] mb-1">
                  {evt.name}
                </h4>

                <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-xs text-[#5A5650]">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>
                      {new Date(evt.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  {evt.startTime && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#5A5650]/60" />
                      <span>
                        {evt.startTime} {evt.endTime ? `- ${evt.endTime}` : ""}
                      </span>
                    </div>
                  )}

                  {evt.venue && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#5A5650]/60" />
                      <span>{evt.venue}</span>
                    </div>
                  )}

                  {evt.guestCount && (
                    <div className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#5A5650]/60" />
                      <span>{evt.guestCount} Guests</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Status Selector */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] uppercase tracking-wider text-[#5A5650] font-semibold">
                  STATUS:
                </span>
                <select
                  value={evt.status}
                  onChange={(e) =>
                    onUpdateEventStatus(evt.id, e.target.value as BookingEventStatus)
                  }
                  className="bg-white border border-[#161514]/20 text-xs text-[#161514] px-2.5 py-1 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
                >
                  <option value="PLANNED">Planned</option>
                  <option value="READY">Ready / Confirmed</option>
                  <option value="COMPLETED">Completed</option>
                </select>
                {evt.status === "COMPLETED" && (
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
