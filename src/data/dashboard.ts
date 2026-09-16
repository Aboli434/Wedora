/**
 * CENTRALIZED DEMO / MOCK DATA FOR WEDORA CLIENT DASHBOARD
 * 
 * IMPORTANT FOR DEVELOPERS:
 * All content in this file is illustrative demonstration mock data.
 * The Dashboard components receive these typed data objects as props
 * to ensure seamless future backend API / database integration.
 */

export interface WeddingIdentity {
  coupleNames: string;
  weddingDate: string;
  rawDate: string;
  location: string;
  style: string;
  coverImage: string;
}

export interface CountdownInfo {
  daysRemaining: number;
  label: string;
}

export interface WeddingEvent {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  status: "Upcoming" | "Confirmed" | "Planning";
}

export interface BudgetSummaryData {
  totalEstimated: string;
  planned: string;
  spent: string;
  remaining: string;
  percentageSpent: number;
}

export interface ChecklistSummaryData {
  completed: number;
  remaining: number;
  total: number;
  percentageComplete: number;
}

export interface GuestSummaryData {
  totalInvited: number;
  confirmed: number;
  pending: number;
  declined: number;
}

export interface VendorCategoryItem {
  category: string;
  vendorName: string;
  status: "Booked" | "Pending" | "In Contact";
}

export interface VendorSummaryData {
  bookedCount: number;
  pendingCount: number;
  featuredVendors: VendorCategoryItem[];
}

export interface ActivityItem {
  id: string;
  title: string;
  category: string;
  timestamp: string;
}

export interface QuickActionItem {
  id: string;
  label: string;
  href: string;
  isExternalLink?: boolean;
}

export interface ClientDashboardData {
  identity: WeddingIdentity;
  countdown: CountdownInfo;
  upcomingEvents: WeddingEvent[];
  budget: BudgetSummaryData;
  checklist: ChecklistSummaryData;
  guests: GuestSummaryData;
  vendors: VendorSummaryData;
  recentActivity: ActivityItem[];
  quickActions: QuickActionItem[];
}

export const MOCK_DASHBOARD_DATA: ClientDashboardData = {
  identity: {
    coupleNames: "Aditi & Arjun",
    weddingDate: "14 February 2027",
    rawDate: "2027-02-14",
    location: "Udaipur, Rajasthan",
    style: "Intimate • Heritage",
    coverImage: "/images/wedding/wedora-hero-wedding.jpg",
  },
  countdown: {
    daysRemaining: 151,
    label: "Days until your celebration",
  },
  upcomingEvents: [
    {
      id: "evt-1",
      name: "Mehndi & Sangeet Evening",
      date: "12 Feb 2027",
      time: "6:00 PM onwards",
      location: "Courtyard, Manek Chowk",
      status: "Confirmed",
    },
    {
      id: "evt-2",
      name: "Haldi & Phoolon Ki Holi",
      date: "13 Feb 2027",
      time: "10:30 AM",
      location: "Lakeside Lawns",
      status: "Confirmed",
    },
    {
      id: "evt-3",
      name: "Sacred Wedding Ceremony",
      date: "14 Feb 2027",
      time: "5:00 PM",
      location: "Royal Palace Pavilion",
      status: "Upcoming",
    },
    {
      id: "evt-4",
      name: "Grand Royal Reception",
      date: "15 Feb 2027",
      time: "7:30 PM",
      location: "Zenana Mahal Ball Room",
      status: "Upcoming",
    },
  ],
  budget: {
    totalEstimated: "₹35,00,000",
    planned: "₹35,00,000",
    spent: "₹18,50,000",
    remaining: "₹16,50,000",
    percentageSpent: 53,
  },
  checklist: {
    completed: 34,
    remaining: 16,
    total: 50,
    percentageComplete: 68,
  },
  guests: {
    totalInvited: 128,
    confirmed: 86,
    pending: 32,
    declined: 10,
  },
  vendors: {
    bookedCount: 8,
    pendingCount: 2,
    featuredVendors: [
      {
        category: "Venue",
        vendorName: "The Oberoi Udaivilas",
        status: "Booked",
      },
      {
        category: "Photography",
        vendorName: "The Frame House",
        status: "Booked",
      },
      {
        category: "Decor & Design",
        vendorName: "Mitti & Marigold",
        status: "Booked",
      },
      {
        category: "Catering",
        vendorName: "Shortlist Phase",
        status: "Pending",
      },
    ],
  },
  recentActivity: [
    {
      id: "act-1",
      title: "Photography contract finalized with The Frame House",
      category: "Vendors",
      timestamp: "2 hours ago",
    },
    {
      id: "act-2",
      title: "Venue booking confirmed for Lakeside Lawns",
      category: "Venue",
      timestamp: "Yesterday",
    },
    {
      id: "act-3",
      title: "Completed checklist item: Send out save-the-date cards",
      category: "Checklist",
      timestamp: "2 days ago",
    },
    {
      id: "act-4",
      title: "Updated guest list: 12 new confirmations received",
      category: "Guests",
      timestamp: "3 days ago",
    },
    {
      id: "act-5",
      title: "Shortlisted 3 floral design vendors for Sangeet night",
      category: "Decor",
      timestamp: "4 days ago",
    },
  ],
  quickActions: [
    {
      id: "qa-1",
      label: "Add Checklist Item",
      href: "/dashboard/checklist",
    },
    {
      id: "qa-2",
      label: "Add Guest",
      href: "/dashboard/guests",
    },
    {
      id: "qa-3",
      label: "Explore Vendors",
      href: "/vendors",
      isExternalLink: false,
    },
    {
      id: "qa-4",
      label: "Add Event",
      href: "/dashboard/events",
    },
  ],
};
