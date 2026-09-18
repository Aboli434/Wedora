"use client";

import React from "react";
import Link from "next/link";
import { VendorBooking } from "@/data/vendorDashboard";
import { ArrowRight, Calendar, MapPin } from "lucide-react";

interface VendorBookingsSnapshotProps {
  bookings: VendorBooking[];
}

export function VendorBookingsSnapshot({ bookings }: VendorBookingsSnapshotProps) {
  return (
    <section className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl p-6 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8E2D9] pb-4">
        <div>
          <h2 className="font-serif text-2xl text-[#2C2A29]">Upcoming bookings</h2>
          <p className="text-xs text-[#6E6B65] mt-0.5">
            Your next confirmed celebrations.
          </p>
        </div>
        <Link
          href="/vendor/dashboard/bookings"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2C2A29] hover:text-[#C5A880] transition-colors group self-start sm:self-auto"
        >
          <span>View bookings</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#C5A880] group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {bookings.map((book) => (
          <div
            key={book.id}
            className="p-5 rounded-lg bg-white border border-[#E8E2D9] space-y-3 flex flex-col justify-between hover:border-[#DCD5C9] transition-colors"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono tracking-wider uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-900 border border-emerald-200">
                  {book.status}
                </span>
                <span className="text-xs font-mono text-[#8C857B]">
                  ₹{(book.agreedAmount / 100000).toFixed(2)} Lakh
                </span>
              </div>

              <h3 className="font-serif text-xl text-[#2C2A29] font-light">
                {book.coupleNames}
              </h3>

              <p className="text-xs text-[#6E6B65] line-clamp-2">
                {book.servicePackage}
              </p>
            </div>

            <div className="pt-3 border-t border-[#E8E2D9] text-xs text-[#5A5650] space-y-1">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{book.eventDate}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{book.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
