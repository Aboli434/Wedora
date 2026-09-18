"use client";

import React from "react";
import { VendorSidebar } from "./VendorSidebar";
import { VendorMobileNav } from "./VendorMobileNav";
import { VendorHeader } from "./VendorHeader";

interface VendorDashboardShellProps {
  children: React.ReactNode;
}

export function VendorDashboardShell({ children }: VendorDashboardShellProps) {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C2A29] flex flex-col lg:flex-row font-sans selection:bg-[#C5A880]/20">
      {/* Desktop Sidebar */}
      <VendorSidebar className="hidden lg:flex shrink-0 fixed inset-y-0 left-0 z-40" />

      {/* Main Container */}
      <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
        {/* Mobile Navigation Header */}
        <VendorMobileNav />

        {/* Top Header */}
        <VendorHeader />

        {/* Main Content Area */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 max-w-7xl w-full mx-auto space-y-8">
          {children}
        </main>
      </div>
    </div>
  );
}
