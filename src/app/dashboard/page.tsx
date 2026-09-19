import { MOCK_DASHBOARD_DATA } from "@/data/dashboard";
import {
  DashboardShell,
  DashboardCommandCenter,
  DashboardActionNeeded,
  DashboardUpcoming,
  DashboardPlanningProgress,
  RecentActivity,
  QuickActions,
} from "@/components/dashboard";

export const metadata = {
  title: "Client Dashboard Command Center | Wedora",
  description:
    "Action-oriented command center for your luxury wedding planning journey with Wedora.",
};

export default function DashboardPage() {
  const data = MOCK_DASHBOARD_DATA;

  return (
    <DashboardShell>
      <div className="max-w-7xl mx-auto space-y-10 pb-12">
        {/* LEVEL 1 — COMMAND CENTER & NEXT RECOMMENDED STEP */}
        <DashboardCommandCenter data={data} />

        {/* LEVEL 1 — ACTION NEEDED (Immediate Priorities) */}
        <DashboardActionNeeded data={data} />

        {/* LEVEL 2 — UPCOMING (Next Itinerary Events & Deadlines) */}
        <DashboardUpcoming data={data} />

        {/* LEVEL 3 — PLANNING PROGRESS & ESSENTIAL SNAPSHOTS */}
        <DashboardPlanningProgress data={data} />

        {/* LEVEL 4 — RECENT ACTIVITY & QUICK ACTION SHORTCUTS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6 border-t border-[#161514]/10">
          <div className="lg:col-span-7">
            <RecentActivity activities={data.recentActivity} />
          </div>
          <div className="lg:col-span-5">
            <QuickActions actions={data.quickActions} />
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
