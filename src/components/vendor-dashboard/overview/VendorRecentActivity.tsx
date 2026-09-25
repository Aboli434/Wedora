"use client";

import React, { useState, useEffect } from "react";
import { VendorActivity } from "@/data/vendorDashboard";
import { getActivityLogsApi } from "@/lib/api/endpoints";
import { formatActivityAction, formatActivityCategory } from "@/lib/utils/formatActivity";

interface VendorRecentActivityProps {
  activities?: VendorActivity[];
}

export function VendorRecentActivity({ activities: fallbackActivities }: VendorRecentActivityProps) {
  const [realActivities, setRealActivities] = useState<VendorActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadActivity() {
      try {
        const res = await getActivityLogsApi(1, 5);
        if (res.data && res.data.length > 0) {
          const mapped: VendorActivity[] = res.data.map((item) => ({
            id: item.id,
            title: formatActivityAction(item.action, item.metadata),
            description: `Category: ${formatActivityCategory(item.entityType)}`,
            timestamp: new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: "ENQUIRY",
          }));
          setRealActivities(mapped);
        }
      } catch {
        // Fallback
      } finally {
        setLoading(false);
      }
    }
    loadActivity();
  }, []);

  const displayActivities = realActivities.length > 0 ? realActivities : fallbackActivities || [];

  return (
    <section className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl p-6 md:p-8 space-y-6">
      <div className="border-b border-[#E8E2D9] pb-4">
        <h2 className="font-serif text-2xl text-[#2C2A29]">Recent activity</h2>
        <p className="text-xs text-[#6E6B65] mt-0.5">
          Chronological record of recent studio events and updates.
        </p>
      </div>

      {loading ? (
        <p className="text-xs text-[#6E6B65] py-4">Loading activity stream...</p>
      ) : displayActivities.length === 0 ? (
        <p className="text-xs text-[#6E6B65] py-4">No recent activity.</p>
      ) : (
        <div className="relative border-l border-[#E8E2D9] ml-3 pl-6 space-y-6">
          {displayActivities.map((act) => (
            <div key={act.id} className="relative space-y-1">
              {/* Timeline Dot */}
              <span className="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full bg-[#C5A880] ring-4 ring-[#FAF8F5]" />

              <div className="flex items-center justify-between gap-4">
                <h3 className="text-sm font-medium text-[#2C2A29]">{act.title}</h3>
                <span className="text-[11px] font-mono text-[#8C857B] shrink-0">
                  {act.timestamp}
                </span>
              </div>

              <p className="text-xs text-[#6E6B65] leading-relaxed">{act.description}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
