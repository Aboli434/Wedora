"use client";

import React, { useMemo } from "react";
import { VendorDashboardShell } from "@/components/vendor-dashboard/layout";
import { MOCK_VENDOR_DASHBOARD_DATA } from "@/data/vendorDashboard";
import { useAuth } from "@/hooks/useAuth";
import { formatVendorCategory, getCategoryDefinition } from "@/lib/vendorCategory";
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
  const { user } = useAuth();
  const vendorProfile = user?.profile as {
    businessName?: string;
    category?: string;
    city?: string;
    slug?: string;
  } | null;

  const data = useMemo(() => {
    const raw = MOCK_VENDOR_DASHBOARD_DATA;
    const cat = vendorProfile?.category || raw.profile.category;
    const catDef = getCategoryDefinition(cat);

    return {
      ...raw,
      profile: {
        ...raw.profile,
        businessName:
          vendorProfile?.businessName ||
          (user?.fullName ? `${user.fullName} Studio` : raw.profile.businessName),
        ownerName: user?.fullName || raw.profile.ownerName,
        category: formatVendorCategory(cat),
        location: vendorProfile?.city || raw.profile.location,
        publicSlug: vendorProfile?.slug || raw.profile.publicSlug,
      },
      enquiries: raw.enquiries.map((e, idx) => ({
        ...e,
        serviceRequested:
          idx === 0
            ? catDef.sampleEnquiryService
            : `${catDef.label} Consultation`,
      })),
      bookings: raw.bookings.map((b, idx) => ({
        ...b,
        servicePackage:
          idx === 0
            ? catDef.sampleBookingPackage
            : `${catDef.label} Package`,
      })),
    };
  }, [user, vendorProfile]);

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
