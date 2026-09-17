export type EventStatus = "PLANNING" | "IN_PROGRESS" | "READY" | "COMPLETED";

export type EventType = "MEHENDI" | "HALDI" | "WEDDING" | "RECEPTION" | "OTHER";

export type AttendanceStatus = "YES" | "NO" | "PENDING";

export type EventTaskStatus = "TODO" | "IN_PROGRESS" | "COMPLETED";

export interface EventVendor {
  id: string;
  vendorId: string;
  vendorName: string;
  category: string;
  status: "CONFIRMED" | "PENDING";
}

export interface EventTask {
  id: string;
  title: string;
  status: EventTaskStatus;
  priority: "LOW" | "MEDIUM" | "HIGH";
  dueDate?: string;
}

export interface WeddingEvent {
  id: string;
  slug: string;
  name: string;
  type: EventType;
  date: string; // YYYY-MM-DD
  startTime: string; // e.g. "06:00 PM"
  endTime: string; // e.g. "10:00 PM"
  venue: string;
  city: string;
  description: string;
  status: EventStatus;
  expectedGuests: number;
  confirmedGuests: number;
  pendingGuests: number;
  vendors: EventVendor[];
  tasks: EventTask[];
  notes?: string;
  updatedAt?: string;
}

export interface EventSummary {
  totalEvents: number;
  upcomingEvents: number;
  readyEvents: number;
  eventsNeedingAttention: number;
  totalTasks: number;
  completedTasks: number;
  taskCompletionPercentage: number;
  totalExpectedGuests: number;
  totalConfirmedGuests: number;
  overallReadiness: number;
}

export interface EventActionItem {
  id: string;
  eventId: string;
  eventName: string;
  issue: string;
  date: string;
  status: EventStatus;
}

export const MOCK_EVENTS: WeddingEvent[] = [
  {
    id: "evt-001",
    slug: "mehendi-and-sangeet",
    name: "Mehendi & Sangeet Night",
    type: "MEHENDI",
    date: "2027-02-12",
    startTime: "06:00 PM",
    endTime: "10:30 PM",
    venue: "The Gulab Courtyard",
    city: "Udaipur",
    description: "An evening of traditional marigold decor, live henna artists, folk percussion, and celebratory family dances.",
    status: "IN_PROGRESS",
    expectedGuests: 120,
    confirmedGuests: 95,
    pendingGuests: 25,
    vendors: [
      {
        id: "ev-v-001",
        vendorId: "v-002",
        vendorName: "Mitti & Marigold",
        category: "Decor & Design",
        status: "CONFIRMED",
      },
      {
        id: "ev-v-002",
        vendorId: "v-004",
        vendorName: "The Frame House",
        category: "Photography",
        status: "CONFIRMED",
      },
      {
        id: "ev-v-003",
        vendorId: "v-008",
        vendorName: "Rhythm & Raag DJ Crew",
        category: "Music & Entertainment",
        status: "PENDING",
      },
      {
        id: "ev-v-004",
        vendorId: "v-005",
        vendorName: "Saffron Table",
        category: "Catering",
        status: "CONFIRMED",
      },
    ],
    tasks: [
      {
        id: "tsk-101",
        title: "Finalize Sangeet dance sequence & music tracklist",
        status: "COMPLETED",
        priority: "HIGH",
        dueDate: "2026-12-01",
      },
      {
        id: "tsk-102",
        title: "Confirm mehendi artist seating & floral cushions layout",
        status: "IN_PROGRESS",
        priority: "HIGH",
        dueDate: "2026-12-10",
      },
      {
        id: "tsk-103",
        title: "Review DJ technical sound check schedule",
        status: "TODO",
        priority: "MEDIUM",
        dueDate: "2026-12-20",
      },
      {
        id: "tsk-104",
        title: "Arrange welcome drinks & chaat live counters",
        status: "COMPLETED",
        priority: "MEDIUM",
        dueDate: "2026-11-25",
      },
    ],
    notes: "Lakeside courtyard venue booked. Henna artists arriving at 4:30 PM for bridal prep.",
    updatedAt: "2026-11-20",
  },
  {
    id: "evt-002",
    slug: "haldi-celebration",
    name: "Haldi Celebration",
    type: "HALDI",
    date: "2027-02-13",
    startTime: "10:00 AM",
    endTime: "01:30 PM",
    venue: "The Heritage Haveli",
    city: "Udaipur",
    description: "A joyful morning turmeric ceremony filled with yellow floral showers, dhol beats, and traditional music.",
    status: "READY",
    expectedGuests: 100,
    confirmedGuests: 88,
    pendingGuests: 12,
    vendors: [
      {
        id: "ev-v-005",
        vendorId: "v-002",
        vendorName: "Mitti & Marigold",
        category: "Decor & Design",
        status: "CONFIRMED",
      },
      {
        id: "ev-v-006",
        vendorId: "v-004",
        vendorName: "The Frame House",
        category: "Photography",
        status: "CONFIRMED",
      },
      {
        id: "ev-v-007",
        vendorId: "v-003",
        vendorName: "House of Vows",
        category: "Wedding Planning",
        status: "CONFIRMED",
      },
    ],
    tasks: [
      {
        id: "tsk-201",
        title: "Order organic turmeric paste & brass urli vessels",
        status: "COMPLETED",
        priority: "HIGH",
        dueDate: "2026-11-15",
      },
      {
        id: "tsk-202",
        title: "Confirm fresh yellow marigold petal floral shower supply",
        status: "COMPLETED",
        priority: "HIGH",
        dueDate: "2026-11-20",
      },
      {
        id: "tsk-203",
        title: "Coordinate change-of-clothes area for guests",
        status: "COMPLETED",
        priority: "MEDIUM",
        dueDate: "2026-12-05",
      },
    ],
    notes: "Sunlit central courtyard setting. Traditional dhol players booked for entry.",
    updatedAt: "2026-11-22",
  },
  {
    id: "evt-003",
    slug: "wedding-ceremony",
    name: "Wedding Ceremony (Pheras)",
    type: "WEDDING",
    date: "2027-02-14",
    startTime: "11:00 AM",
    endTime: "03:30 PM",
    venue: "The Lake Pavilion",
    city: "Udaipur",
    description: "The main sacred Vedic wedding ritual and royal lakefront Pheras under a bespoke heritage mandap.",
    status: "IN_PROGRESS",
    expectedGuests: 150,
    confirmedGuests: 128,
    pendingGuests: 22,
    vendors: [
      {
        id: "ev-v-008",
        vendorId: "v-001",
        vendorName: "The Courtyard Estate",
        category: "Venue",
        status: "CONFIRMED",
      },
      {
        id: "ev-v-009",
        vendorId: "v-002",
        vendorName: "Mitti & Marigold",
        category: "Decor & Design",
        status: "CONFIRMED",
      },
      {
        id: "ev-v-010",
        vendorId: "v-006",
        vendorName: "Atelier Noor",
        category: "Bridal & Couture",
        status: "CONFIRMED",
      },
      {
        id: "ev-v-011",
        vendorId: "v-004",
        vendorName: "The Frame House",
        category: "Photography",
        status: "CONFIRMED",
      },
      {
        id: "ev-v-012",
        vendorId: "v-009",
        vendorName: "Kiran Makeup & Hair Artistry",
        category: "Makeup & Hair",
        status: "PENDING",
      },
    ],
    tasks: [
      {
        id: "tsk-301",
        title: "Finalize Panditji ceremony rituals & pooja samagri list",
        status: "COMPLETED",
        priority: "HIGH",
        dueDate: "2026-11-10",
      },
      {
        id: "tsk-302",
        title: "Confirm lakefront mandap structural safety & floral canopy",
        status: "IN_PROGRESS",
        priority: "HIGH",
        dueDate: "2026-12-15",
      },
      {
        id: "tsk-303",
        title: "Finalize Baraat procession route & vintage car rental",
        status: "IN_PROGRESS",
        priority: "HIGH",
        dueDate: "2026-12-10",
      },
      {
        id: "tsk-304",
        title: "Coordinate royal Varmala floral garlands delivery",
        status: "TODO",
        priority: "MEDIUM",
        dueDate: "2026-12-25",
      },
    ],
    notes: "Baraat assembly at 10:30 AM at Lake Gate. Pheras scheduled at auspicious Muhurat 12:15 PM.",
    updatedAt: "2026-11-25",
  },
  {
    id: "evt-004",
    slug: "grand-reception",
    name: "Grand Reception",
    type: "RECEPTION",
    date: "2027-02-14",
    startTime: "07:30 PM",
    endTime: "11:30 PM",
    venue: "The Courtyard Estate",
    city: "Udaipur",
    description: "An elegant black-tie evening banquet under candlelit pavilion arches featuring live acoustic folk music.",
    status: "PLANNING",
    expectedGuests: 180,
    confirmedGuests: 142,
    pendingGuests: 38,
    vendors: [
      {
        id: "ev-v-013",
        vendorId: "v-001",
        vendorName: "The Courtyard Estate",
        category: "Venue",
        status: "CONFIRMED",
      },
      {
        id: "ev-v-014",
        vendorId: "v-005",
        vendorName: "Saffron Table",
        category: "Catering",
        status: "CONFIRMED",
      },
      {
        id: "ev-v-015",
        vendorId: "v-007",
        vendorName: "Swara Heritage Ensemble",
        category: "Music & Entertainment",
        status: "PENDING",
      },
      {
        id: "ev-v-016",
        vendorId: "v-003",
        vendorName: "House of Vows",
        category: "Wedding Planning",
        status: "CONFIRMED",
      },
    ],
    tasks: [
      {
        id: "tsk-401",
        title: "Finalize seating chart & royal dining table place-cards",
        status: "IN_PROGRESS",
        priority: "HIGH",
        dueDate: "2026-12-20",
      },
      {
        id: "tsk-402",
        title: "Review 7-course gourmet dinner menu & dessert station",
        status: "IN_PROGRESS",
        priority: "HIGH",
        dueDate: "2026-12-15",
      },
      {
        id: "tsk-403",
        title: "Confirm stage lighting & acoustic sound check for live band",
        status: "TODO",
        priority: "MEDIUM",
        dueDate: "2026-12-28",
      },
      {
        id: "tsk-404",
        title: "Coordinate thank-you favor boxes for departing guests",
        status: "TODO",
        priority: "LOW",
        dueDate: "2027-01-05",
      },
    ],
    notes: "Black-tie gala reception. Live Santoor & Sitar prelude during cocktail hour.",
    updatedAt: "2026-11-18",
  },
];
