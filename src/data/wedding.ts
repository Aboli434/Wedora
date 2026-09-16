/**
 * CENTRALIZED DEMO / MOCK DATA FOR WEDORA MY WEDDING PROFILE
 * 
 * IMPORTANT FOR DEVELOPERS:
 * All content in this file is illustrative demonstration mock data.
 * The My Wedding components receive these typed data objects as props
 * to ensure seamless future backend API / database integration.
 */

export interface Couple {
  name1: string;
  name2: string;
  coupleNames: string;
}

export interface WeddingEventSummary {
  number: string;
  name: string;
  date: string;
  time: string;
  location: string;
}

export interface WeddingPlanningStatusSummary {
  checklistPercent: number;
  checklistText: string;
  budgetAmount: string;
  isBudgetIllustrative: boolean;
  guestCountInvited: number;
  guestCountConfirmed: number;
}

export interface WeddingProfile {
  couple: Couple;
  weddingDate: string;
  rawDate: string;
  destination: string;
  style: string;
  coverImage: string;
  guestTarget: string;
  eventCountText: string;
  planningStatus: string;
  events: WeddingEventSummary[];
  statusSummary: WeddingPlanningStatusSummary;
}

export const MOCK_WEDDING_PROFILE: WeddingProfile = {
  couple: {
    name1: "Aditi",
    name2: "Arjun",
    coupleNames: "Aditi & Arjun",
  },
  weddingDate: "14 February 2027",
  rawDate: "2027-02-14",
  destination: "Udaipur, Rajasthan",
  style: "INTIMATE • HERITAGE",
  coverImage: "/images/wedding/wedora-service-planning.jpg",
  guestTarget: "150 guests",
  eventCountText: "4 events",
  planningStatus: "In progress",
  events: [
    {
      number: "01",
      name: "MEHENDI & SANGEET",
      date: "12 February 2027",
      time: "6:00 PM onwards",
      location: "Courtyard, Manek Chowk",
    },
    {
      number: "02",
      name: "HALDI CELEBRATION",
      date: "13 February 2027",
      time: "10:30 AM",
      location: "Lakeside Lawns",
    },
    {
      number: "03",
      name: "WEDDING CEREMONY",
      date: "14 February 2027",
      time: "5:00 PM",
      location: "Royal Palace Pavilion",
    },
    {
      number: "04",
      name: "GRAND RECEPTION",
      date: "15 February 2027",
      time: "7:30 PM",
      location: "Zenana Mahal Ball Room",
    },
  ],
  statusSummary: {
    checklistPercent: 68,
    checklistText: "34 of 50 tasks completed",
    budgetAmount: "₹35,00,000",
    isBudgetIllustrative: true,
    guestCountInvited: 128,
    guestCountConfirmed: 86,
  },
};
