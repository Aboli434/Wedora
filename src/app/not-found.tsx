"use client";

import React from "react";
import Link from "next/link";
import { Compass, Home } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-6 text-[#161514]">
      <div className="max-w-md w-full bg-white border border-[#161514]/15 p-8 sm:p-10 text-center space-y-6 shadow-xl">
        <div className="w-12 h-12 rounded-full bg-[#C5A880]/15 border border-[#C5A880]/30 flex items-center justify-center mx-auto text-[#8C6D3B]">
          <Compass className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold block">
            PAGE NOT FOUND
          </span>
          <h1 className="font-serif text-3xl font-light text-[#161514]">
            404 — Destination Unavailable
          </h1>
          <p className="text-xs font-sans text-[#5A5650] leading-relaxed">
            The celebration page or workspace resource you are looking for could not be located.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#161514] text-[#FAF8F5] text-xs font-medium uppercase tracking-[0.15em] hover:bg-[#C5A880] hover:text-[#161514] transition-all duration-300 focus:outline-none shadow-sm"
          >
            <Home className="w-4 h-4 text-[#C5A880]" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
