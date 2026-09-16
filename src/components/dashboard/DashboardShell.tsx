"use client";

import React from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardMobileNav } from "./DashboardMobileNav";

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#161514] font-sans">
      {/* Desktop Fixed Sidebar (>= 1024px) */}
      <DashboardSidebar />

      {/* Mobile Top Header Navigation (< 1024px) */}
      <DashboardMobileNav />

      {/* Main Content Area */}
      <div className="lg:pl-64 xl:pl-72 flex flex-col min-h-screen">
        <main className="flex-1 p-6 sm:p-10 lg:p-12 max-w-7xl w-full mx-auto space-y-10">
          {children}
        </main>
      </div>
    </div>
  );
}
