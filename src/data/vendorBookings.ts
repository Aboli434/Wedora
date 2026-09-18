export type BookingStatus =
  | "INQUIRY"
  | "CONFIRMED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export type BookingPaymentStatus =
  | "NOT_STARTED"
  | "PARTIALLY_PAID"
  | "PAID"
  | "OVERDUE";

export type BookingSource = "WEDORA" | "PUBLIC_PROFILE" | "DIRECT" | "ENQUIRY";

export type BookingDateStatus = "CONFIRMED" | "FLEXIBLE";

export type BookingEventStatus = "PLANNED" | "READY" | "COMPLETED";

export interface BookingEvent {
  id: string;
  name: string;
  date: string;
  startTime?: string;
  endTime?: string;
  venue?: string;
  status: BookingEventStatus;
  guestCount?: number;
}

export interface BookingActivity {
  id: string;
  type:
    | "CREATED"
    | "CONFIRMED"
    | "STATUS_CHANGED"
    | "PAYMENT_RECEIVED"
    | "EVENT_UPDATED"
    | "NOTE_UPDATED"
    | "COMPLETED"
    | "CANCELLED";
  description: string;
  timestamp: string;
}

export interface VendorBooking {
  id: string;
  bookingReference: string;
  coupleName: string;
  partnerName?: string;
  email: string;
  phone?: string;
  weddingDate: string;
  weddingDateStatus: BookingDateStatus;
  destination: string;
  venue?: string;
  guestCount?: number;
  serviceId?: string;
  serviceName: string;
  packageName: string;
  bookingStatus: BookingStatus;
  paymentStatus: BookingPaymentStatus;
  source: BookingSource;
  totalAmount: number;
  amountReceived: number;
  amountOutstanding: number;
  nextPaymentDue?: string;
  nextPaymentAmount?: number;
  events: BookingEvent[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
  nextAction?: string;
  nextActionDate?: string;
  activities: BookingActivity[];
  enquiryReferenceId?: string;
}

export interface VendorBookingsSummary {
  totalBookings: number;
  confirmedBookings: number;
  upcomingBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  totalBookedValue: number;
  totalReceived: number;
  totalOutstanding: number;
  overdueAmount: number;
}

export const INITIAL_VENDOR_BOOKINGS: VendorBooking[] = [
  {
    id: "bk-101",
    bookingReference: "WED-2027-101",
    coupleName: "Aditi Sharma",
    partnerName: "Arjun Kapoor",
    email: "aditi.arjun@weddingdemo.in",
    phone: "+91 98201 11223",
    weddingDate: "2027-02-14",
    weddingDateStatus: "CONFIRMED",
    destination: "Udaipur",
    venue: "Jagmandir Island Palace",
    guestCount: 150,
    serviceId: "srv-01",
    serviceName: "Wedding Photography & Cinematography",
    packageName: "Royal Destination Signature Package",
    bookingStatus: "CONFIRMED",
    paymentStatus: "PARTIALLY_PAID",
    source: "ENQUIRY",
    enquiryReferenceId: "enq-001",
    totalAmount: 5500000,
    amountReceived: 2000000,
    amountOutstanding: 3500000,
    nextPaymentDue: "2026-11-01",
    nextPaymentAmount: 2000000,
    notes: "High-value Udaipur destination booking. Requires 4 senior cinematographers and 2 drone pilots.",
    createdAt: "2026-09-18T11:00:00Z",
    updatedAt: "2026-09-18T11:00:00Z",
    nextAction: "Finalize crew travel & island boat logistics",
    nextActionDate: "2026-10-15",
    events: [
      {
        id: "evt-101-1",
        name: "Welcome Dinner & Sangeet",
        date: "2027-02-13",
        startTime: "18:00",
        endTime: "23:30",
        venue: "Jagmandir Lawns",
        status: "PLANNED",
        guestCount: 150,
      },
      {
        id: "evt-101-2",
        name: "Haldi & Poolside Lunch",
        date: "2027-02-14",
        startTime: "10:00",
        endTime: "14:00",
        venue: "Courtyard Deck",
        status: "PLANNED",
        guestCount: 120,
      },
      {
        id: "evt-101-3",
        name: "Sunset Wedding Ceremony (Pheras)",
        date: "2027-02-14",
        startTime: "16:30",
        endTime: "20:30",
        venue: "Palace Mandap Deck",
        status: "READY",
        guestCount: 150,
      },
      {
        id: "evt-101-4",
        name: "Grand Royal Reception",
        date: "2027-02-15",
        startTime: "19:00",
        endTime: "00:00",
        venue: "Grand Ballroom",
        status: "PLANNED",
        guestCount: 200,
      },
    ],
    activities: [
      {
        id: "act-bk-101-1",
        type: "CREATED",
        description: "Booking created from accepted Enquiry #enq-001.",
        timestamp: "2026-09-18T11:00:00Z",
      },
      {
        id: "act-bk-101-2",
        type: "CONFIRMED",
        description: "Booking status confirmed upon retainer deposit receipt.",
        timestamp: "2026-09-18T11:30:00Z",
      },
      {
        id: "act-bk-101-3",
        type: "PAYMENT_RECEIVED",
        description: "Received ₹20,00,000 initial booking deposit.",
        timestamp: "2026-09-18T11:30:00Z",
      },
    ],
  },
  {
    id: "bk-102",
    bookingReference: "WED-2026-102",
    coupleName: "Ananya Roy",
    partnerName: "Kabir Verma",
    email: "ananya.kabir@weddingdemo.in",
    phone: "+91 98311 22334",
    weddingDate: "2026-12-05",
    weddingDateStatus: "CONFIRMED",
    destination: "Jaipur",
    venue: "Rambagh Palace",
    guestCount: 200,
    serviceId: "srv-02",
    serviceName: "Editorial Destination Package",
    packageName: "Heritage Palace Fine-Art Collection",
    bookingStatus: "IN_PROGRESS",
    paymentStatus: "OVERDUE",
    source: "DIRECT",
    totalAmount: 6000000,
    amountReceived: 2500000,
    amountOutstanding: 3500000,
    nextPaymentDue: "2026-09-15",
    nextPaymentAmount: 1500000,
    notes: "Second milestone payment of ₹15,00,000 was due on 15 September 2026. Followed up with Kabir on phone.",
    createdAt: "2026-09-10T14:00:00Z",
    updatedAt: "2026-09-17T16:00:00Z",
    nextAction: "Collect overdue milestone payment",
    nextActionDate: "2026-09-20",
    events: [
      {
        id: "evt-102-1",
        name: "Pre-Wedding Shoot in Old City",
        date: "2026-12-04",
        startTime: "06:30",
        endTime: "11:00",
        venue: "Hawa Mahal & Amer Fort",
        status: "READY",
        guestCount: 2,
      },
      {
        id: "evt-102-2",
        name: "Sangeet & Cocktail Gala",
        date: "2026-12-04",
        startTime: "19:00",
        endTime: "01:00",
        venue: "Jaigarh Lawns",
        status: "PLANNED",
        guestCount: 200,
      },
      {
        id: "evt-102-3",
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
        id: "act-bk-102-1",
        type: "CREATED",
        description: "Direct booking agreement signed.",
        timestamp: "2026-09-10T14:00:00Z",
      },
      {
        id: "act-bk-102-2",
        type: "STATUS_CHANGED",
        description: "Status advanced to IN_PROGRESS for pre-production scouting.",
        timestamp: "2026-09-12T10:00:00Z",
      },
    ],
  },
  {
    id: "bk-103",
    bookingReference: "WED-2026-103",
    coupleName: "Priya Varma",
    partnerName: "Dev Khanna",
    email: "priya.dev@weddingdemo.in",
    phone: "+91 97112 33445",
    weddingDate: "2026-11-20",
    weddingDateStatus: "CONFIRMED",
    destination: "Pune",
    venue: "Oxford Golf & Country Club",
    guestCount: 180,
    serviceId: "srv-03",
    serviceName: "Signature Wedding Storytelling",
    packageName: "Intimate Estate Package",
    bookingStatus: "CONFIRMED",
    paymentStatus: "PAID",
    source: "WEDORA",
    totalAmount: 3000000,
    amountReceived: 3000000,
    amountOutstanding: 0,
    notes: "100% full payment received upfront. All team briefing notes prepared.",
    createdAt: "2026-09-05T09:00:00Z",
    updatedAt: "2026-09-14T12:00:00Z",
    nextAction: "Send shot list template to couple",
    nextActionDate: "2026-10-01",
    events: [
      {
        id: "evt-103-1",
        name: "Morning Mandap Ceremony",
        date: "2026-11-20",
        startTime: "09:00",
        endTime: "13:00",
        venue: "Hilltop Amphitheatre",
        status: "READY",
        guestCount: 180,
      },
      {
        id: "evt-103-2",
        name: "Evening Reception",
        date: "2026-11-20",
        startTime: "19:00",
        endTime: "23:00",
        venue: "Golf Club Pavilion",
        status: "READY",
        guestCount: 220,
      },
    ],
    activities: [
      {
        id: "act-bk-103-1",
        type: "CREATED",
        description: "Booking registered via Wedora platform.",
        timestamp: "2026-09-05T09:00:00Z",
      },
      {
        id: "act-bk-103-2",
        type: "PAYMENT_RECEIVED",
        description: "Received full payment ₹30,00,000.",
        timestamp: "2026-09-14T12:00:00Z",
      },
    ],
  },
  {
    id: "bk-104",
    bookingReference: "WED-2027-104",
    coupleName: "Meera Nair",
    partnerName: "Rohan Deshmukh",
    email: "meera.rohan@weddingdemo.in",
    phone: "+91 98765 43210",
    weddingDate: "2027-04-18",
    weddingDateStatus: "FLEXIBLE",
    destination: "Goa",
    venue: "Alila Diwa South Goa",
    guestCount: 220,
    serviceId: "srv-04",
    serviceName: "Luxury Wedding Storytelling",
    packageName: "Coastal Horizon Package",
    bookingStatus: "INQUIRY",
    paymentStatus: "NOT_STARTED",
    source: "PUBLIC_PROFILE",
    totalAmount: 4200000,
    amountReceived: 0,
    amountOutstanding: 4200000,
    nextPaymentDue: "2026-10-15",
    nextPaymentAmount: 1000000,
    notes: "Couple is confirming exact date between 16 and 19 April 2027 based on venue hold.",
    createdAt: "2026-09-17T14:20:00Z",
    updatedAt: "2026-09-18T09:00:00Z",
    nextAction: "Confirm exact date hold with venue manager",
    nextActionDate: "2026-09-25",
    events: [
      {
        id: "evt-104-1",
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
        id: "act-bk-104-1",
        type: "CREATED",
        description: "Initial booking hold recorded.",
        timestamp: "2026-09-17T14:20:00Z",
      },
    ],
  },
  {
    id: "bk-105",
    bookingReference: "WED-2026-105",
    coupleName: "Simran Kaur",
    partnerName: "Harpreet Singh",
    email: "simran.harpreet@weddingdemo.in",
    phone: "+91 98199 77665",
    weddingDate: "2026-08-12",
    weddingDateStatus: "CONFIRMED",
    destination: "Mumbai",
    venue: "JW Marriott Juhu",
    guestCount: 120,
    serviceId: "srv-03",
    serviceName: "Signature Wedding Storytelling",
    packageName: "Metropolitan Deluxe Package",
    bookingStatus: "COMPLETED",
    paymentStatus: "PAID",
    source: "WEDORA",
    totalAmount: 3200000,
    amountReceived: 3200000,
    amountOutstanding: 0,
    notes: "Deliverables complete: 800 retouched photos + 15 min cinematic film delivered on USB drive and cloud link.",
    createdAt: "2026-07-01T09:00:00Z",
    updatedAt: "2026-08-30T18:00:00Z",
    events: [
      {
        id: "evt-105-1",
        name: "Anand Karaj Ceremony",
        date: "2026-08-12",
        startTime: "08:00",
        endTime: "12:00",
        venue: "Gurudwara Dhan Pothohar",
        status: "COMPLETED",
        guestCount: 120,
      },
      {
        id: "evt-105-2",
        name: "Grand Reception",
        date: "2026-08-12",
        startTime: "19:30",
        endTime: "23:30",
        venue: "JW Marriott Ballroom",
        status: "COMPLETED",
        guestCount: 250,
      },
    ],
    activities: [
      {
        id: "act-bk-105-1",
        type: "CREATED",
        description: "Booking initiated.",
        timestamp: "2026-07-01T09:00:00Z",
      },
      {
        id: "act-bk-105-2",
        type: "COMPLETED",
        description: "All photo & film deliverables handed over.",
        timestamp: "2026-08-30T18:00:00Z",
      },
    ],
  },
  {
    id: "bk-106",
    bookingReference: "WED-2026-106",
    coupleName: "Tanvi Saxena",
    partnerName: "Siddharth Joshi",
    email: "tanvi.sid@weddingdemo.in",
    phone: "+91 99200 44556",
    weddingDate: "2026-10-15",
    weddingDateStatus: "CONFIRMED",
    destination: "Delhi",
    venue: "The Leela Palace",
    guestCount: 500,
    serviceId: "srv-05",
    serviceName: "Complete Wedding & Pre-Wedding Experience",
    packageName: "Grand Deluxe 5-Day Collection",
    bookingStatus: "CANCELLED",
    paymentStatus: "NOT_STARTED",
    source: "PUBLIC_PROFILE",
    totalAmount: 7500000,
    amountReceived: 0,
    amountOutstanding: 0,
    notes: "Cancelled by couple due to change in wedding venue city location to overseas.",
    createdAt: "2026-09-01T15:00:00Z",
    updatedAt: "2026-09-03T10:00:00Z",
    events: [
      {
        id: "evt-106-1",
        name: "5-Day Delhi Celebrations",
        date: "2026-10-15",
        venue: "The Leela Palace",
        status: "PLANNED",
        guestCount: 500,
      },
    ],
    activities: [
      {
        id: "act-bk-106-1",
        type: "CREATED",
        description: "Initial booking hold recorded.",
        timestamp: "2026-09-01T15:00:00Z",
      },
      {
        id: "act-bk-106-2",
        type: "CANCELLED",
        description: "Booking cancelled upon couple request.",
        timestamp: "2026-09-03T10:00:00Z",
      },
    ],
  },
  {
    id: "bk-107",
    bookingReference: "WED-2027-107",
    coupleName: "Isha Malhotra",
    partnerName: "Kunal Singhania",
    email: "isha.kunal@weddingdemo.in",
    phone: "+91 99100 88776",
    weddingDate: "2027-01-10",
    weddingDateStatus: "CONFIRMED",
    destination: "Mumbai",
    venue: "The St. Regis Mumbai",
    guestCount: 350,
    serviceId: "srv-01",
    serviceName: "Pre-Wedding & Main Ceremony Coverage",
    packageName: "Metropolitan Elite Collection",
    bookingStatus: "CONFIRMED",
    paymentStatus: "PARTIALLY_PAID",
    source: "WEDORA",
    enquiryReferenceId: "enq-003",
    totalAmount: 4800000,
    amountReceived: 1800000,
    amountOutstanding: 3000000,
    nextPaymentDue: "2026-10-10",
    nextPaymentAmount: 1500000,
    notes: "Pre-wedding shoot date finalized for Marine Drive & Asiatic Library in December.",
    createdAt: "2026-09-16T16:00:00Z",
    updatedAt: "2026-09-18T10:00:00Z",
    nextAction: "Confirm pre-wedding permissions for South Mumbai locations",
    nextActionDate: "2026-10-05",
    events: [
      {
        id: "evt-107-1",
        name: "Cocktail Gala",
        date: "2027-01-09",
        startTime: "20:00",
        endTime: "02:00",
        venue: "St. Regis Astor Ballroom",
        status: "PLANNED",
        guestCount: 300,
      },
      {
        id: "evt-107-2",
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
        id: "act-bk-107-1",
        type: "CREATED",
        description: "Booking registered from Enquiry #enq-003.",
        timestamp: "2026-09-16T16:00:00Z",
      },
      {
        id: "act-bk-107-2",
        type: "PAYMENT_RECEIVED",
        description: "Received token deposit ₹18,00,000.",
        timestamp: "2026-09-16T17:00:00Z",
      },
    ],
  },
];
