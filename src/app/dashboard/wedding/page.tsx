import { MOCK_WEDDING_PROFILE } from "@/data/wedding";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import {
  WeddingPageHeader,
  WeddingProfileHero,
  WeddingDetails,
  WeddingEventsOverview,
  WeddingPlanningStatus,
  WeddingPageCTA,
} from "@/components/dashboard/wedding";

export const metadata = {
  title: "My Wedding | Wedora Dashboard",
  description:
    "Manage your wedding profile, celebration details, event itinerary, and planning progress with Wedora.",
};

export default function MyWeddingPage() {
  const profile = MOCK_WEDDING_PROFILE;

  return (
    <DashboardShell>
      <WeddingPageHeader />

      <div className="space-y-8">
        <WeddingProfileHero profile={profile} />
        <WeddingDetails profile={profile} />
        <WeddingEventsOverview events={profile.events} />
        <WeddingPlanningStatus summary={profile.statusSummary} />
        <WeddingPageCTA />
      </div>
    </DashboardShell>
  );
}
