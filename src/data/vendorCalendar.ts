export type CalendarEventType =
  | "BOOKING"
  | "WEDDING_EVENT"
  | "PAYMENT_DUE"
  | "PREPARATION"
  | "REMINDER"
  | "BLOCKED";

export type CalendarEventStatus = "SCHEDULED" | "COMPLETED" | "CANCELLED";

export type CalendarPriority = "HIGH" | "NORMAL" | "LOW";

export type CalendarView = "MONTH" | "WEEK" | "AGENDA";

export interface VendorCalendarEvent {
  id: string;
  title: string;
  description?: string;
  type: CalendarEventType;
  status: CalendarEventStatus;
  priority: CalendarPriority;
  startDate: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD
  startTime?: string; // HH:mm
  endTime?: string; // HH:mm
  allDay?: boolean;
  coupleName?: string;
  bookingId?: string;
  bookingReference?: string;
  eventId?: string;
  venue?: string;
  location?: string;
  category?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface VendorAvailabilityBlock {
  id: string;
  title: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  reason: string;
  notes?: string;
  createdAt: string;
}

export interface VendorCalendarSummary {
  totalEvents: number;
  upcomingEvents: number;
  todayEvents: number;
  bookingEvents: number;
  weddingEvents: number;
  preparationEvents: number;
  paymentDueEvents: number;
  blockedDates: number;
}

// Initial demo dataset for The Frame House (Fixed reference date: 2026-09-18)
export const INITIAL_CALENDAR_EVENTS: VendorCalendarEvent[] = [
  {
    id: "evt-cal-101",
    title: "Aditi & Arjun — Wedding Photography Contract Hold",
    description: "Multi-day Rajasthan destination wedding coverage hold.",
    type: "BOOKING",
    status: "SCHEDULED",
    priority: "HIGH",
    startDate: "2027-02-13",
    endDate: "2027-02-15",
    allDay: true,
    coupleName: "Aditi & Arjun",
    bookingId: "bk-101",
    bookingReference: "WED-2027-101",
    venue: "Jagmandir Island Palace",
    location: "Udaipur",
    createdAt: "2026-09-18T11:00:00Z",
    updatedAt: "2026-09-18T11:00:00Z",
  },
  {
    id: "evt-cal-102",
    title: "Aditi & Arjun — Welcome Dinner & Sangeet",
    description: "Evening coverage on Jagmandir Lawns.",
    type: "WEDDING_EVENT",
    status: "SCHEDULED",
    priority: "HIGH",
    startDate: "2027-02-13",
    startTime: "18:00",
    endTime: "23:30",
    allDay: false,
    coupleName: "Aditi & Arjun",
    bookingId: "bk-101",
    bookingReference: "WED-2027-101",
    eventId: "evt-101-1",
    venue: "Jagmandir Lawns",
    location: "Udaipur",
    createdAt: "2026-09-18T11:00:00Z",
    updatedAt: "2026-09-18T11:00:00Z",
  },
  {
    id: "evt-cal-103",
    title: "Aditi & Arjun — Sunset Pheras & Wedding Ceremony",
    description: "Palace Mandap Deck sunset ceremony shoot.",
    type: "WEDDING_EVENT",
    status: "SCHEDULED",
    priority: "HIGH",
    startDate: "2027-02-14",
    startTime: "16:30",
    endTime: "20:30",
    allDay: false,
    coupleName: "Aditi & Arjun",
    bookingId: "bk-101",
    bookingReference: "WED-2027-101",
    eventId: "evt-101-3",
    venue: "Palace Mandap Deck",
    location: "Udaipur",
    createdAt: "2026-09-18T11:00:00Z",
    updatedAt: "2026-09-18T11:00:00Z",
  },
  {
    id: "evt-cal-104",
    title: "Ananya & Kabir — Overdue Milestone Payment",
    description: "Second milestone payment of ₹15,00,000 for Rambagh Palace Jaipur shoot.",
    type: "PAYMENT_DUE",
    status: "SCHEDULED",
    priority: "HIGH",
    startDate: "2026-09-15",
    allDay: true,
    coupleName: "Ananya & Kabir",
    bookingId: "bk-102",
    bookingReference: "WED-2026-102",
    location: "Jaipur",
    createdAt: "2026-09-10T14:00:00Z",
    updatedAt: "2026-09-17T16:00:00Z",
  },
  {
    id: "evt-cal-105",
    title: "Ananya & Kabir — Sangeet & Cocktail Gala",
    description: "Night coverage at Jaigarh Lawns.",
    type: "WEDDING_EVENT",
    status: "SCHEDULED",
    priority: "HIGH",
    startDate: "2026-12-04",
    startTime: "19:00",
    endTime: "01:00",
    allDay: false,
    coupleName: "Ananya & Kabir",
    bookingId: "bk-102",
    bookingReference: "WED-2026-102",
    eventId: "evt-102-2",
    venue: "Jaigarh Lawns",
    location: "Jaipur",
    createdAt: "2026-09-10T14:00:00Z",
    updatedAt: "2026-09-10T14:00:00Z",
  },
  {
    id: "evt-cal-106",
    title: "Priya & Dev — Send Final Shot List Template",
    description: "Prepare and email shot list customization guide to Priya.",
    type: "PREPARATION",
    status: "SCHEDULED",
    priority: "NORMAL",
    startDate: "2026-10-01",
    startTime: "10:00",
    endTime: "11:30",
    allDay: false,
    coupleName: "Priya & Dev",
    bookingId: "bk-103",
    bookingReference: "WED-2026-103",
    location: "Pune",
    createdAt: "2026-09-14T12:00:00Z",
    updatedAt: "2026-09-14T12:00:00Z",
  },
  {
    id: "evt-cal-107",
    title: "Priya & Dev — Estate Wedding & Reception",
    description: "Intimate estate wedding coverage at Oxford Golf Club.",
    type: "WEDDING_EVENT",
    status: "SCHEDULED",
    priority: "HIGH",
    startDate: "2026-11-20",
    startTime: "09:00",
    endTime: "23:00",
    allDay: false,
    coupleName: "Priya & Dev",
    bookingId: "bk-103",
    bookingReference: "WED-2026-103",
    eventId: "evt-103-1",
    venue: "Oxford Golf & Country Club",
    location: "Pune",
    createdAt: "2026-09-05T09:00:00Z",
    updatedAt: "2026-09-14T12:00:00Z",
  },
  {
    id: "evt-cal-108",
    title: "Meera & Rohan — Confirm Venue Access Hold",
    description: "Verify beachside deck permissions with Alila Diwa Goa resort manager.",
    type: "REMINDER",
    status: "SCHEDULED",
    priority: "NORMAL",
    startDate: "2026-09-25",
    startTime: "14:00",
    endTime: "15:00",
    allDay: false,
    coupleName: "Meera & Rohan",
    bookingId: "bk-104",
    bookingReference: "WED-2027-104",
    venue: "Alila Diwa South Goa",
    location: "Goa",
    createdAt: "2026-09-17T14:20:00Z",
    updatedAt: "2026-09-18T09:00:00Z",
  },
  {
    id: "evt-cal-109",
    title: "Isha & Kunal — Pre-Wedding Permit Check",
    description: "Confirm drone shoot permissions for Asiatic Library and Marine Drive.",
    type: "PREPARATION",
    status: "SCHEDULED",
    priority: "HIGH",
    startDate: "2026-10-05",
    startTime: "11:00",
    endTime: "12:30",
    allDay: false,
    coupleName: "Isha & Kunal",
    bookingId: "bk-107",
    bookingReference: "WED-2027-107",
    location: "Mumbai",
    createdAt: "2026-09-16T16:00:00Z",
    updatedAt: "2026-09-18T10:00:00Z",
  },
  {
    id: "evt-cal-110",
    title: "Isha & Kunal — Milestone Deposit Due",
    description: "Milestone payment of ₹15,00,000 due prior to pre-wedding shoot.",
    type: "PAYMENT_DUE",
    status: "SCHEDULED",
    priority: "HIGH",
    startDate: "2026-10-10",
    allDay: true,
    coupleName: "Isha & Kunal",
    bookingId: "bk-107",
    bookingReference: "WED-2027-107",
    location: "Mumbai",
    createdAt: "2026-09-16T16:00:00Z",
    updatedAt: "2026-09-16T16:00:00Z",
  },
  {
    id: "evt-cal-111",
    title: "Simran & Harpreet — Album Delivery Handover",
    description: "Completed printed fine-art photo album handed over.",
    type: "WEDDING_EVENT",
    status: "COMPLETED",
    priority: "LOW",
    startDate: "2026-08-30",
    allDay: true,
    coupleName: "Simran & Harpreet",
    bookingId: "bk-105",
    bookingReference: "WED-2026-105",
    location: "Mumbai",
    createdAt: "2026-07-01T09:00:00Z",
    updatedAt: "2026-08-30T18:00:00Z",
  },
  {
    id: "evt-cal-112",
    title: "Studio Internal Planning & Equipment Maintenance",
    description: "Quarterly camera sensor cleaning and lens calibration.",
    type: "REMINDER",
    status: "SCHEDULED",
    priority: "NORMAL",
    startDate: "2026-09-18",
    startTime: "10:00",
    endTime: "16:00",
    allDay: false,
    location: "Mumbai Studio",
    createdAt: "2026-09-01T10:00:00Z",
    updatedAt: "2026-09-01T10:00:00Z",
  },
];

export const INITIAL_AVAILABILITY_BLOCKS: VendorAvailabilityBlock[] = [
  {
    id: "blk-01",
    title: "Personal / Family Annual Vacation",
    startDate: "2026-10-20",
    endDate: "2026-10-28",
    reason: "Personal / Unavailable",
    notes: "No new shoot commitments during holiday week.",
    createdAt: "2026-09-01T09:00:00Z",
  },
  {
    id: "blk-02",
    title: "International Travel & Equipment Transit",
    startDate: "2026-12-10",
    endDate: "2026-12-15",
    reason: "Travel",
    notes: "In transit for overseas photography exhibition.",
    createdAt: "2026-09-10T10:00:00Z",
  },
];
