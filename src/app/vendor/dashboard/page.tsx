"use client";

import React from "react";
import { VendorDashboardShell } from "@/components/vendor-dashboard/layout";
import { MOCK_VENDOR_DASHBOARD_DATA } from "@/data/vendorDashboard";
import { VendorDashboardCommandCenter } from "@/components/vendor-dashboard/VendorDashboardCommandCenter";
import { VendorDashboardReadiness } from "@/components/vendor-dashboard/VendorDashboardReadiness";
import { VendorDashboardActionNeeded } from "@/components/vendor-dashboard/VendorDashboardActionNeeded";
import { VendorDashboardUpcomingWork } from "@/components/vendor-dashboard/VendorDashboardUpcomingWork";
import { VendorDashboardBusinessHealth } from "@/components/vendor-dashboard/VendorDashboardBusinessHealth";
import { VendorDashboardPerformance } from "@/components/vendor-dashboard/VendorDashboardPerformance";
import {
  VendorRecentActivity,
  VendorQuickActions,
} from "@/components/vendor-dashboard/overview";

export default function VendorDashboardPage() {
  const data = MOCK_VENDOR_DASHBOARD_DATA;

  return (
    <VendorDashboardShell>
      <div className="max-w-7xl mx-auto space-y-10 pb-12">
        {/* LEVEL 1 — VENDOR COMMAND CENTER HERO & NEXT ACTION */}
        <VendorDashboardCommandCenter data={data} />

        {/* LEVEL 1 — STUDIO READINESS CHECKLIST */}
        <VendorDashboardReadiness data={data} />

        {/* LEVEL 1 — ACTION NEEDED (Immediate Studio Priorities) */}
        <VendorDashboardActionNeeded data={data} />

        {/* LEVEL 2 — UPCOMING WORK (Next Confirmed Shoot Dates) */}
        <VendorDashboardUpcomingWork data={data} />

        {/* LEVEL 2 — BUSINESS HEALTH SNAPSHOT */}
        <VendorDashboardBusinessHealth data={data} />

        {/* LEVEL 3 — PERFORMANCE, RECENT ACTIVITY & QUICK ACTION SHORTCUTS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6 border-t border-[#161514]/10">
          <div className="lg:col-span-7 space-y-8">
            <VendorDashboardPerformance data={data} />
            <VendorRecentActivity activities={data.recentActivities} />
          </div>
          <div className="lg:col-span-5">
            <VendorQuickActions />
          </div>
        </div>
      </div>
    </VendorDashboardShell>
  );
}
