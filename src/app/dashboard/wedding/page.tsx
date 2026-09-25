"use client";

import React, { useState, useEffect } from "react";
import { MOCK_WEDDING_PROFILE, WeddingProfile } from "@/data/wedding";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import {
  WeddingPageHeader,
  WeddingProfileHero,
  WeddingDetails,
  WeddingEventsOverview,
  WeddingPlanningStatus,
  WeddingPageCTA,
} from "@/components/dashboard/wedding";
import { getWeddingsApi, getWeddingEventsApi } from "@/lib/api/endpoints";

export default function MyWeddingPage() {
  const [profile, setProfile] = useState<WeddingProfile>(MOCK_WEDDING_PROFILE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadWeddingData() {
      try {
        setLoading(true);
        const weddings = await getWeddingsApi();
        if (weddings && weddings.length > 0) {
          const w = weddings[0];
          const events = await getWeddingEventsApi(w.id);

          if (isMounted) {
            setProfile((prev) => ({
              ...prev,
              couple: {
                name1: w.partner1Name,
                name2: w.partner2Name,
                coupleNames: `${w.partner1Name} & ${w.partner2Name}`,
              },
              weddingDate: w.weddingDate ? new Date(w.weddingDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : prev.weddingDate,
              rawDate: w.weddingDate || prev.rawDate,
              destination: w.location,
              events: events.length > 0
                ? events.map((e, idx) => ({
                    number: `0${idx + 1}`,
                    name: e.name,
                    date: new Date(e.date).toLocaleDateString(),
                    time: e.startTime ? `${e.startTime} - ${e.endTime || ""}` : "All Day",
                    location: e.venue || w.location,
                  }))
                : prev.events,
            }));
          }
        }
      } catch {
        // Fallback to mock profile
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadWeddingData();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <DashboardShell>
      <WeddingPageHeader />

      {loading ? (
        <div className="p-8 text-center text-xs text-[#5A5650] font-sans">Loading celebration details...</div>
      ) : (
        <div className="space-y-8">
          <WeddingProfileHero profile={profile} />
          <WeddingDetails profile={profile} />
          <WeddingEventsOverview events={profile.events} />
          <WeddingPlanningStatus summary={profile.statusSummary} />
          <WeddingPageCTA />
        </div>
      )}
    </DashboardShell>
  );
}
