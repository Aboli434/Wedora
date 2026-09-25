"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, Home } from "lucide-react";

export default function GlobalErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error internally if needed, avoiding console credentials
    console.error("Wedora Application Error:", error.message);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-6 text-[#161514]">
      <div className="max-w-md w-full bg-white border border-[#161514]/15 p-8 text-center space-y-6 shadow-xl">
        <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto text-rose-700">
          <AlertCircle className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold block">
            SOMETHING WENT WRONG
          </span>
          <h1 className="font-serif text-2xl font-light text-[#161514]">
            An unexpected error occurred.
          </h1>
          <p className="text-xs font-sans text-[#5A5650] leading-relaxed">
            We encountered a temporary issue loading this workspace view. You can try refreshing the page or return to the main dashboard.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#161514] text-[#FAF8F5] text-xs font-medium uppercase tracking-[0.15em] hover:bg-[#C5A880] hover:text-[#161514] transition-all duration-300 focus:outline-none"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-[#161514]/20 text-[#161514] text-xs font-medium uppercase tracking-[0.15em] hover:bg-[#161514]/5 transition-all duration-300 focus:outline-none"
          >
            <Home className="w-3.5 h-3.5 text-[#5A5650]" />
            <span>Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
