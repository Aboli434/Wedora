import { MOCK_DASHBOARD_DATA } from "@/data/dashboard";
import {
  DashboardShell,
  DashboardHeader,
  WeddingOverview,
  CountdownCard,
  UpcomingEvents,
  BudgetSnapshot,
  ChecklistProgress,
  GuestSummary,
  VendorSummary,
  RecentActivity,
  QuickActions,
} from "@/components/dashboard";

export const metadata = {
  title: "Client Dashboard | Wedora",
  description:
    "Overview of your wedding planning journey, itinerary, budget, guest list, and vendor curation with Wedora.",
};

export default function DashboardPage() {
  const data = MOCK_DASHBOARD_DATA;

  return (
    <DashboardShell>
      {/* Dashboard Header */}
      <DashboardHeader greetingName="ADITI" />

      {/* Editorial Dashboard Grid Layout */}
      <div className="space-y-8">
        {/* Row 1: Wedding Overview (8 cols) + Countdown Card (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-8 flex">
            <div className="w-full">
              <WeddingOverview identity={data.identity} />
            </div>
          </div>
          <div className="lg:col-span-4 flex">
            <div className="w-full">
              <CountdownCard countdown={data.countdown} />
            </div>
          </div>
        </div>

        {/* Row 2: Upcoming Events (6 cols) + Recent Activity & Quick Actions (6 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6">
            <UpcomingEvents events={data.upcomingEvents} />
          </div>
          <div className="lg:col-span-6 space-y-8">
            <QuickActions actions={data.quickActions} />
            <RecentActivity activities={data.recentActivity} />
          </div>
        </div>

        {/* Row 3: Budget Snapshot (6 cols) + Checklist Progress (6 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-6 flex">
            <div className="w-full">
              <BudgetSnapshot budget={data.budget} />
            </div>
          </div>
          <div className="lg:col-span-6 flex">
            <div className="w-full">
              <ChecklistProgress checklist={data.checklist} />
            </div>
          </div>
        </div>

        {/* Row 4: Guest Summary (6 cols) + Vendor Curation (6 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-6 flex">
            <div className="w-full">
              <GuestSummary guests={data.guests} />
            </div>
          </div>
          <div className="lg:col-span-6 flex">
            <div className="w-full">
              <VendorSummary vendors={data.vendors} />
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
