export type ClientRelationshipStatus =
  | "LEAD"
  | "ACTIVE"
  | "UPCOMING"
  | "COMPLETED"
  | "INACTIVE";

export type ClientPriority = "HIGH" | "NORMAL" | "LOW";

export type ClientSource =
  | "WEDORA"
  | "ENQUIRY"
  | "BOOKING"
  | "DIRECT"
  | "PUBLIC_PROFILE";

export type ClientContactPreference = "EMAIL" | "PHONE" | "WHATSAPP";

export type ClientWeddingStatus =
  | "PLANNING"
  | "UPCOMING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "DATE_FLEXIBLE";

export interface ClientEvent {
  id: string;
  name: string;
  date: string;
  startTime?: string;
  endTime?: string;
  venue?: string;
  status: "PLANNED" | "READY" | "COMPLETED";
  guestCount?: number;
}

export type ClientActivityType =
  | "CLIENT_ADDED"
  | "ENQUIRY_RECEIVED"
  | "RESPONSE_SENT"
  | "BOOKING_CREATED"
  | "BOOKING_UPDATED"
  | "EVENT_UPDATED"
  | "NOTE_ADDED"
  | "CONTACTED"
  | "STATUS_CHANGED";

export interface ClientActivity {
  id: string;
  type: ClientActivityType;
  description: string;
  timestamp: string;
}

export interface VendorClient {
  id: string;
  clientReference: string;
  coupleName: string;
  partnerName?: string;
  email: string;
  phone?: string;
  alternatePhone?: string;
  preferredContactMethod: ClientContactPreference;
  destination: string;
  venue?: string;
  weddingDate?: string;
  weddingDateStatus: "CONFIRMED" | "FLEXIBLE";
  guestCount?: number;
  relationshipStatus: ClientRelationshipStatus;
  priority: ClientPriority;
  source: ClientSource;
  avatarInitials: string;
  enquiryId?: string;
  bookingIds: string[];
  serviceIds: string[];
  services: string[];
  notes?: string;
  nextAction?: string;
  nextActionDate?: string;
  lastContactedAt?: string;
  createdAt: string;
  updatedAt: string;
  weddingStatus: ClientWeddingStatus;
  events: ClientEvent[];
  activities: ClientActivity[];
}

export interface VendorClientsSummary {
  totalClients: number;
  activeClients: number;
  upcomingClients: number;
  leadClients: number;
  completedClients: number;
  clientsNeedingAttention: number;
  recentlyContacted: number;
  totalBookings: number;
  upcomingEvents: number;
}

export const INITIAL_VENDOR_CLIENTS: VendorClient[] = [
  {
    id: "cli-101",
    clientReference: "CLI-2027-101",
    coupleName: "Aditi Sharma",
    partnerName: "Arjun Kapoor",
    email: "aditi.arjun@weddingdemo.in",
    phone: "+91 98201 11223",
    preferredContactMethod: "EMAIL",
    destination: "Udaipur",
    venue: "Jagmandir Island Palace",
    weddingDate: "2027-02-14",
    weddingDateStatus: "CONFIRMED",
    guestCount: 150,
    relationshipStatus: "ACTIVE",
    priority: "HIGH",
    source: "ENQUIRY",
    avatarInitials: "AA",
    enquiryId: "enq-001",
    bookingIds: ["bk-101"],
    serviceIds: ["srv-01"],
    services: [
      "Wedding Photography & Cinematography",
      "Drone Coverage Add-on",
    ],
    notes:
      "High-value Udaipur destination relationship. Requested 4 senior cinematographers and 2 drone pilots.",
    nextAction: "Confirm island boat crew transport permissions",
    nextActionDate: "2026-10-15",
    lastContactedAt: "2026-09-18T11:15:00Z",
    createdAt: "2026-09-18T10:30:00Z",
    updatedAt: "2026-09-18T11:30:00Z",
    weddingStatus: "UPCOMING",
    events: [
      {
        id: "evt-cli-101-1",
        name: "Welcome Dinner & Sangeet",
        date: "2027-02-13",
        startTime: "18:00",
        endTime: "23:30",
        venue: "Jagmandir Lawns",
        status: "PLANNED",
        guestCount: 150,
      },
      {
        id: "evt-cli-101-2",
        name: "Sunset Pheras & Wedding Ceremony",
        date: "2027-02-14",
        startTime: "16:30",
        endTime: "20:30",
        venue: "Palace Mandap Deck",
        status: "READY",
        guestCount: 150,
      },
    ],
    activities: [
      {
        id: "act-cli-101-1",
        type: "ENQUIRY_RECEIVED",
        description: "Enquiry received via Wedora Direct Connect.",
        timestamp: "2026-09-18T10:30:00Z",
      },
      {
        id: "act-cli-101-2",
        type: "BOOKING_CREATED",
        description: "Booking contract #WED-2027-101 created.",
        timestamp: "2026-09-18T11:00:00Z",
      },
      {
        id: "act-cli-101-3",
        type: "CONTACTED",
        description: "Phone consultation with Aditi regarding crew logistics.",
        timestamp: "2026-09-18T11:15:00Z",
      },
    ],
  },
  {
    id: "cli-102",
    clientReference: "CLI-2026-102",
    coupleName: "Ananya Roy",
    partnerName: "Kabir Verma",
    email: "ananya.kabir@weddingdemo.in",
    phone: "+91 98311 22334",
    preferredContactMethod: "PHONE",
    destination: "Jaipur",
    venue: "Rambagh Palace",
    weddingDate: "2026-12-05",
    weddingDateStatus: "CONFIRMED",
    guestCount: 200,
    relationshipStatus: "ACTIVE",
    priority: "HIGH",
    source: "DIRECT",
    avatarInitials: "AK",
    bookingIds: ["bk-102"],
    serviceIds: ["srv-02"],
    services: ["Editorial Destination Package"],
    notes:
      "Second milestone payment of ₹15,00,000 is overdue since 15 September 2026. Kabir promised payment update.",
    nextAction: "Follow up with Kabir regarding milestone payment",
    nextActionDate: "2026-09-20",
    lastContactedAt: "2026-09-17T16:00:00Z",
    createdAt: "2026-09-10T14:00:00Z",
    updatedAt: "2026-09-17T16:00:00Z",
    weddingStatus: "IN_PROGRESS",
    events: [
      {
        id: "evt-cli-102-1",
        name: "Pre-Wedding Shoot in Old City",
        date: "2026-12-04",
        startTime: "06:30",
        endTime: "11:00",
        venue: "Hawa Mahal & Amer Fort",
        status: "READY",
        guestCount: 2,
      },
      {
        id: "evt-cli-102-2",
        name: "Pheras & Wedding",
        date: "2026-12-05",
        startTime: "17:00",
        endTime: "22:00",
        venue: "Rambagh Garden Mandap",
        status: "READY",
        guestCount: 200,
      },
    ],
    activities: [
      {
        id: "act-cli-102-1",
        type: "CLIENT_ADDED",
        description: "Client added via direct referral.",
        timestamp: "2026-09-10T14:00:00Z",
      },
      {
        id: "act-cli-102-2",
        type: "CONTACTED",
        description: "Call with Kabir regarding milestone payment follow-up.",
        timestamp: "2026-09-17T16:00:00Z",
      },
    ],
  },
  {
    id: "cli-103",
    clientReference: "CLI-2026-103",
    coupleName: "Priya Varma",
    partnerName: "Dev Khanna",
    email: "priya.dev@weddingdemo.in",
    phone: "+91 97112 33445",
    preferredContactMethod: "EMAIL",
    destination: "Pune",
    venue: "Oxford Golf & Country Club",
    weddingDate: "2026-11-20",
    weddingDateStatus: "CONFIRMED",
    guestCount: 180,
    relationshipStatus: "UPCOMING",
    priority: "NORMAL",
    source: "WEDORA",
    avatarInitials: "PD",
    bookingIds: ["bk-103"],
    serviceIds: ["srv-03"],
    services: ["Signature Wedding Storytelling"],
    notes:
      "Full payment received upfront. Shot list guide to be e-mailed in October.",
    nextAction: "Email shot list template to Priya",
    nextActionDate: "2026-10-01",
    lastContactedAt: "2026-09-14T12:00:00Z",
    createdAt: "2026-09-05T09:00:00Z",
    updatedAt: "2026-09-14T12:00:00Z",
    weddingStatus: "PLANNING",
    events: [
      {
        id: "evt-cli-103-1",
        name: "Morning Mandap Ceremony",
        date: "2026-11-20",
        startTime: "09:00",
        endTime: "13:00",
        venue: "Hilltop Amphitheatre",
        status: "READY",
        guestCount: 180,
      },
    ],
    activities: [
      {
        id: "act-cli-103-1",
        type: "CLIENT_ADDED",
        description: "Client account created.",
        timestamp: "2026-09-05T09:00:00Z",
      },
      {
        id: "act-cli-103-2",
        type: "CONTACTED",
        description: "Sent preliminary briefing deck.",
        timestamp: "2026-09-14T12:00:00Z",
      },
    ],
  },
  {
    id: "cli-104",
    clientReference: "CLI-2027-104",
    coupleName: "Meera Nair",
    partnerName: "Rohan Deshmukh",
    email: "meera.rohan@weddingdemo.in",
    phone: "+91 98765 43210",
    preferredContactMethod: "WHATSAPP",
    destination: "Goa",
    venue: "Alila Diwa South Goa",
    weddingDate: "2027-04-18",
    weddingDateStatus: "FLEXIBLE",
    guestCount: 220,
    relationshipStatus: "LEAD",
    priority: "NORMAL",
    source: "PUBLIC_PROFILE",
    avatarInitials: "MR",
    enquiryId: "enq-002",
    bookingIds: ["bk-104"],
    serviceIds: ["srv-04"],
    services: ["Luxury Wedding Storytelling"],
    notes:
      "Awaiting final date confirmation from venue management between 16 and 19 April 2027.",
    nextAction: "Check beach deck availability hold with resort",
    nextActionDate: "2026-09-25",
    lastContactedAt: "2026-09-18T09:00:00Z",
    createdAt: "2026-09-17T14:20:00Z",
    updatedAt: "2026-09-18T09:00:00Z",
    weddingStatus: "DATE_FLEXIBLE",
    events: [
      {
        id: "evt-cli-104-1",
        name: "Sunset Welcome Party",
        date: "2027-04-17",
        startTime: "17:00",
        endTime: "21:00",
        venue: "Majorda Beach Deck",
        status: "PLANNED",
        guestCount: 200,
      },
    ],
    activities: [
      {
        id: "act-cli-104-1",
        type: "ENQUIRY_RECEIVED",
        description: "Public profile enquiry received.",
        timestamp: "2026-09-17T14:20:00Z",
      },
      {
        id: "act-cli-104-2",
        type: "CONTACTED",
        description: "Sent proposal draft via email.",
        timestamp: "2026-09-18T09:00:00Z",
      },
    ],
  },
  {
    id: "cli-105",
    clientReference: "CLI-2026-105",
    coupleName: "Simran Kaur",
    partnerName: "Harpreet Singh",
    email: "simran.harpreet@weddingdemo.in",
    phone: "+91 98199 77665",
    preferredContactMethod: "WHATSAPP",
    destination: "Mumbai",
    venue: "JW Marriott Juhu",
    weddingDate: "2026-08-12",
    weddingDateStatus: "CONFIRMED",
    guestCount: 120,
    relationshipStatus: "COMPLETED",
    priority: "LOW",
    source: "WEDORA",
    avatarInitials: "SH",
    enquiryId: "enq-007",
    bookingIds: ["bk-105"],
    serviceIds: ["srv-03"],
    services: ["Signature Wedding Storytelling", "Printed Photo Album"],
    notes:
      "Project completed. Deliverables handed over in August 2026. Positive 5-star review received.",
    createdAt: "2026-07-01T09:00:00Z",
    updatedAt: "2026-08-30T18:00:00Z",
    lastContactedAt: "2026-08-30T18:00:00Z",
    weddingStatus: "COMPLETED",
    events: [
      {
        id: "evt-cli-105-1",
        name: "Anand Karaj Ceremony",
        date: "2026-08-12",
        startTime: "08:00",
        endTime: "12:00",
        venue: "Gurudwara Dhan Pothohar",
        status: "COMPLETED",
        guestCount: 120,
      },
    ],
    activities: [
      {
        id: "act-cli-105-1",
        type: "CLIENT_ADDED",
        description: "Client relationship created.",
        timestamp: "2026-07-01T09:00:00Z",
      },
      {
        id: "act-cli-105-2",
        type: "STATUS_CHANGED",
        description: "Relationship status updated to COMPLETED.",
        timestamp: "2026-08-30T18:00:00Z",
      },
    ],
  },
  {
    id: "cli-106",
    clientReference: "CLI-2026-106",
    coupleName: "Tanvi Saxena",
    partnerName: "Siddharth Joshi",
    email: "tanvi.sid@weddingdemo.in",
    phone: "+91 99200 44556",
    preferredContactMethod: "EMAIL",
    destination: "Delhi",
    venue: "The Leela Palace",
    weddingDate: "2026-10-15",
    weddingDateStatus: "CONFIRMED",
    guestCount: 500,
    relationshipStatus: "INACTIVE",
    priority: "LOW",
    source: "PUBLIC_PROFILE",
    avatarInitials: "TS",
    enquiryId: "enq-006",
    bookingIds: ["bk-106"],
    serviceIds: ["srv-05"],
    services: ["Complete Wedding & Pre-Wedding Experience"],
    notes: "Cancelled booking due to change in wedding destination to overseas.",
    createdAt: "2026-09-01T15:00:00Z",
    updatedAt: "2026-09-03T10:00:00Z",
    lastContactedAt: "2026-09-02T10:00:00Z",
    weddingStatus: "PLANNING",
    events: [],
    activities: [
      {
        id: "act-cli-106-1",
        type: "CLIENT_ADDED",
        description: "Client created.",
        timestamp: "2026-09-01T15:00:00Z",
      },
      {
        id: "act-cli-106-2",
        type: "STATUS_CHANGED",
        description: "Status changed to INACTIVE following cancellation.",
        timestamp: "2026-09-03T10:00:00Z",
      },
    ],
  },
  {
    id: "cli-107",
    clientReference: "CLI-2027-107",
    coupleName: "Isha Malhotra",
    partnerName: "Kunal Singhania",
    email: "isha.kunal@weddingdemo.in",
    phone: "+91 99100 88776",
    preferredContactMethod: "EMAIL",
    destination: "Mumbai",
    venue: "The St. Regis Mumbai",
    weddingDate: "2027-01-10",
    weddingDateStatus: "CONFIRMED",
    guestCount: 350,
    relationshipStatus: "ACTIVE",
    priority: "HIGH",
    source: "WEDORA",
    avatarInitials: "IK",
    enquiryId: "enq-003",
    bookingIds: ["bk-107"],
    serviceIds: ["srv-01"],
    services: ["Pre-Wedding & Main Ceremony Coverage"],
    notes:
      "Pre-wedding shoot planned for South Mumbai heritage locations in December.",
    nextAction: "Confirm Marine Drive permit guidelines",
    nextActionDate: "2026-10-05",
    lastContactedAt: "2026-09-16T15:45:00Z",
    createdAt: "2026-09-15T09:00:00Z",
    updatedAt: "2026-09-18T10:00:00Z",
    weddingStatus: "UPCOMING",
    events: [
      {
        id: "evt-cli-107-1",
        name: "Cocktail Gala",
        date: "2027-01-09",
        startTime: "20:00",
        endTime: "02:00",
        venue: "St. Regis Astor Ballroom",
        status: "PLANNED",
        guestCount: 300,
      },
      {
        id: "evt-cli-107-2",
        name: "Wedding Pheras",
        date: "2027-01-10",
        startTime: "16:00",
        endTime: "21:00",
        venue: "St. Regis Terrace Lawn",
        status: "READY",
        guestCount: 350,
      },
    ],
    activities: [
      {
        id: "act-cli-107-1",
        type: "ENQUIRY_RECEIVED",
        description: "Received enquiry via Wedora platform.",
        timestamp: "2026-09-15T09:00:00Z",
      },
      {
        id: "act-cli-107-2",
        type: "BOOKING_CREATED",
        description: "Booking #WED-2027-107 registered.",
        timestamp: "2026-09-16T16:00:00Z",
      },
    ],
  },
];
