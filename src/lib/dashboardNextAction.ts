import { ClientDashboardData } from "../data/dashboard";

export interface NextActionItem {
  id: string;
  category: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

export function getDashboardNextAction(data: ClientDashboardData): NextActionItem {
  if (!data.upcomingEvents || data.upcomingEvents.length === 0) {
    return {
      id: "action-events",
      category: "WEDDING FOUNDATION",
      title: "Set up your wedding events",
      description: "Your ceremony schedule is the foundation for the rest of your planning.",
      ctaLabel: "Set Up Events →",
      ctaHref: "/dashboard/events",
    };
  }

  if (!data.budget.totalEstimated || data.budget.percentageSpent === 0) {
    return {
      id: "action-budget",
      category: "FINANCIAL PLANNING",
      title: "Set your wedding budget",
      description: "Define target spending allocations for venues, decor, photography, and attire.",
      ctaLabel: "Set Budget →",
      ctaHref: "/dashboard/budget",
    };
  }

  if (data.vendors.bookedCount === 0) {
    return {
      id: "action-vendors",
      category: "VENDOR SELECTION",
      title: "Start building your vendor shortlist",
      description: "Discover luxury venues, photographers, and planners that match your vision.",
      ctaLabel: "Explore Vendors →",
      ctaHref: "/dashboard/vendors",
    };
  }

  if (data.guests.totalInvited === 0) {
    return {
      id: "action-guests",
      category: "GUEST MANAGEMENT",
      title: "Start your guestlist",
      description: "Add family and friends, organize seating groups, and track RSVPs.",
      ctaLabel: "Manage Guests →",
      ctaHref: "/dashboard/guests",
    };
  }

  return {
    id: "action-checklist",
    category: "MILESTONE TRACKING",
    title: "Continue your checklist",
    description: `You have ${data.checklist.remaining} checklist milestones remaining before your celebration.`,
    ctaLabel: "Review Checklist →",
    ctaHref: "/dashboard/checklist",
  };
}
