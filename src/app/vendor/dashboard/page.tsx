"use client";

import React from "react";
import { VendorDashboardShell } from "@/components/vendor-dashboard/layout";
import { MOCK_VENDOR_DASHBOARD_DATA } from "@/data/vendorDashboard";
import {
  VendorProfileSnapshot,
  VendorOverviewMetrics,
  VendorNeedsAttention,
  VendorEnquiriesSnapshot,
  VendorBookingsSnapshot,
  VendorPaymentSnapshot,
  VendorPerformance,
  VendorRecentActivity,
  VendorQuickActions,
  VendorDashboardCTA,
} from "@/components/vendor-dashboard/overview";

export default function VendorDashboardPage() {
  const {
    profile,
    summary,
    enquiries,
    bookings,
    actionItems,
    recentActivities,
  } = MOCK_VENDOR_DASHBOARD_DATA;

  return (
    <VendorDashboardShell>
      <div className="space-y-8">
        {/* Profile Snapshot Banner */}
        <VendorProfileSnapshot profile={profile} />

        {/* Primary Metrics Grid */}
        <VendorOverviewMetrics summary={summary} />

        {/* Needs Attention / Action Items */}
        <VendorNeedsAttention items={actionItems} />

        {/* Recent Enquiries & Bookings Snapshot */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <VendorEnquiriesSnapshot enquiries={enquiries} />
          <VendorPaymentSnapshot summary={summary} />
        </div>

        {/* Upcoming Bookings */}
        <VendorBookingsSnapshot bookings={bookings} />

        {/* Performance & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <VendorPerformance summary={summary} />
          <VendorRecentActivity activities={recentActivities} />
        </div>

        {/* Quick Studio Actions */}
        <VendorQuickActions />

        {/* Closing CTA */}
        <VendorDashboardCTA />
      </div>
    </VendorDashboardShell>
  );
}
