export interface VendorBusinessProfile {
  id: string;
  businessName: string;
  ownerName: string;
  category: string;
  location: string;
  description: string;
  avatarInitials: string;
  profileCompletion: number;
  verifiedStatus: boolean;
  joinedDate: string;
  publicSlug: string;
}

export interface VendorDashboardSummary {
  activeEnquiries: number;
  awaitingResponseCount: number;
  upcomingBookings: number;
  confirmedBookings: number;
  outstandingPayments: number;
  totalBookedValue: number;
  amountReceived: number;
  monthlyEnquiries: number;
  profileViews: number;
  responseRate: number;
  shortlistedCount: number;
}

export type VendorEnquiryStatus = "NEW" | "REVIEWING" | "RESPONDED" | "SHORTLISTED";

export interface VendorEnquiry {
  id: string;
  coupleNames: string;
  destination: string;
  weddingDate: string;
  serviceRequested: string;
  status: VendorEnquiryStatus;
  receivedDate: string;
}

export interface VendorBooking {
  id: string;
  coupleNames: string;
  eventDate: string;
  location: string;
  servicePackage: string;
  status: "CONFIRMED" | "COMPLETED";
  agreedAmount: number;
}

export interface VendorActionItem {
  id: string;
  type: "ENQUIRY" | "BOOKING" | "PAYMENT" | "PROFILE";
  title: string;
  description: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  dueDate?: string;
  relatedId?: string;
}

export interface VendorActivity {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  type: "ENQUIRY" | "BOOKING" | "PAYMENT" | "PORTFOLIO";
}

export interface FullVendorDashboardData {
  profile: VendorBusinessProfile;
  summary: VendorDashboardSummary;
  enquiries: VendorEnquiry[];
  bookings: VendorBooking[];
  actionItems: VendorActionItem[];
  recentActivities: VendorActivity[];
}

export const MOCK_VENDOR_DASHBOARD_DATA: FullVendorDashboardData = {
  profile: {
    id: "vendor-1",
    businessName: "The Frame House",
    ownerName: "Riya Mehta",
    category: "Photography",
    location: "Mumbai",
    description:
      "A documentary-led photography studio focused on intimate celebrations, honest emotion, and thoughtful visual storytelling.",
    avatarInitials: "RM",
    profileCompletion: 78,
    verifiedStatus: true,
    joinedDate: "January 2024",
    publicSlug: "the-frame-house",
  },
  summary: {
    activeEnquiries: 4,
    awaitingResponseCount: 2,
    upcomingBookings: 3,
    confirmedBookings: 5,
    outstandingPayments: 840000,
    totalBookedValue: 2460000,
    amountReceived: 1620000,
    monthlyEnquiries: 12,
    profileViews: 286,
    responseRate: 92,
    shortlistedCount: 5,
  },
  enquiries: [
    {
      id: "enq-101",
      coupleNames: "Aarav & Naina",
      destination: "Udaipur",
      weddingDate: "18 April 2027",
      serviceRequested: "Full Wedding Photography & Films",
      status: "NEW",
      receivedDate: "16 Sep 2026",
    },
    {
      id: "enq-102",
      coupleNames: "Vikram & Ananya",
      destination: "Jaipur",
      weddingDate: "05 Nov 2026",
      serviceRequested: "Pre-Wedding & Ceremony Coverage",
      status: "REVIEWING",
      receivedDate: "14 Sep 2026",
    },
    {
      id: "enq-103",
      coupleNames: "Kabir & Tara",
      destination: "Goa",
      weddingDate: "22 Jan 2027",
      serviceRequested: "Candid Photography & Teaser Film",
      status: "RESPONDED",
      receivedDate: "10 Sep 2026",
    },
    {
      id: "enq-104",
      coupleNames: "Dev & Radhika",
      destination: "Mumbai",
      weddingDate: "14 Feb 2027",
      serviceRequested: "Multi-Day Editorial Wedding Coverage",
      status: "SHORTLISTED",
      receivedDate: "08 Sep 2026",
    },
  ],
  bookings: [
    {
      id: "book-201",
      coupleNames: "Aditi & Arjun",
      eventDate: "14 February 2027",
      location: "Udaipur",
      servicePackage: "Full Destination Wedding Photography & Film",
      status: "CONFIRMED",
      agreedAmount: 650000,
    },
    {
      id: "book-202",
      coupleNames: "Meera & Rohan",
      eventDate: "12 December 2026",
      location: "Goa",
      servicePackage: "Beachfront Ceremony & Sangeet Coverage",
      status: "CONFIRMED",
      agreedAmount: 520000,
    },
    {
      id: "book-203",
      coupleNames: "Isha & Kunal",
      eventDate: "28 November 2026",
      location: "Mumbai",
      servicePackage: "Pre-Wedding Shoot & Reception Highlights",
      status: "CONFIRMED",
      agreedAmount: 450000,
    },
  ],
  actionItems: [
    {
      id: "act-1",
      type: "ENQUIRY",
      title: "Reply to new enquiry from Aarav & Naina",
      description: "Send initial pricing guide and confirm date availability for April 2027.",
      priority: "HIGH",
      dueDate: "Today",
    },
    {
      id: "act-2",
      type: "BOOKING",
      title: "Review timeline details for Meera & Rohan",
      description: "Confirm sunset lighting schedule for Goa beachfront ceremony.",
      priority: "HIGH",
      dueDate: "In 3 days",
    },
    {
      id: "act-3",
      type: "PAYMENT",
      title: "Follow up on final instalment payment",
      description: "Pending instalment of ₹2,00,000 for upcoming Mumbai celebration.",
      priority: "MEDIUM",
      dueDate: "Next week",
    },
    {
      id: "act-4",
      type: "PROFILE",
      title: "Complete vendor profile details",
      description: "Add high-resolution portfolio images for recent Udaipur weddings.",
      priority: "LOW",
      dueDate: "This month",
    },
  ],
  recentActivities: [
    {
      id: "act-rec-1",
      timestamp: "16 Sep 2026",
      title: "New enquiry received",
      description: "Aarav & Naina requested package details for Udaipur destination wedding.",
      type: "ENQUIRY",
    },
    {
      id: "act-rec-2",
      timestamp: "12 Sep 2026",
      title: "Booking confirmed",
      description: "Meera & Rohan signed agreement for Goa beachfront celebration.",
      type: "BOOKING",
    },
    {
      id: "act-rec-3",
      timestamp: "05 Sep 2026",
      title: "Payment marked received",
      description: "Advance deposit of ₹2,50,000 recorded for Aditi & Arjun.",
      type: "PAYMENT",
    },
    {
      id: "act-rec-4",
      timestamp: "01 Sep 2026",
      title: "Portfolio album updated",
      description: "Added 18 new editorial photographs to 'Royal Palace Weddings'.",
      type: "PORTFOLIO",
    },
  ],
};
