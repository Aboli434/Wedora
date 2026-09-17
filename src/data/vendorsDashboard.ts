export type VendorCategory =
  | "PLANNING"
  | "PHOTOGRAPHY"
  | "DECOR"
  | "VENUE"
  | "CATERING"
  | "MUSIC"
  | "BRIDAL"
  | "MAKEUP"
  | "TRAVEL"
  | "OTHER";

export type VendorStatus =
  | "SHORTLISTED"
  | "ENQUIRY_SENT"
  | "NEGOTIATING"
  | "BOOKED"
  | "COMPLETED"
  | "CANCELLED";

export type PaymentStatus = "NOT_STARTED" | "PARTIAL" | "PAID" | "DUE";

export type VendorEvent =
  | "MEHENDI"
  | "HALDI"
  | "WEDDING"
  | "RECEPTION"
  | "ALL_EVENTS";

export interface DashboardVendor {
  id: string;
  slug: string;
  name: string;
  category: VendorCategory;
  location: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  status: VendorStatus;
  paymentStatus: PaymentStatus;
  event: VendorEvent;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  bookingDate?: string;
  nextAction?: string;
  nextActionDate?: string;
  notes?: string;
  amount?: number;
  amountPaid?: number;
  enquirySentAt?: string;
  updatedAt?: string;
}

export interface VendorSummary {
  totalVendors: number;
  bookedVendors: number;
  pendingEnquiries: number;
  shortlistedVendors: number;
  needingAction: number;
  totalCommitted: number;
  totalPaid: number;
  totalOutstanding: number;
}

export interface VendorPaymentSummary {
  totalCommitted: number;
  totalPaid: number;
  totalOutstanding: number;
  vendorsWithPayments: number;
}

export interface VendorActionItem {
  id: string;
  vendorId: string;
  vendorName: string;
  category: VendorCategory;
  reason: string;
  status: VendorStatus;
  nextAction?: string;
  nextActionDate?: string;
}

export const MOCK_DASHBOARD_VENDORS: DashboardVendor[] = [
  {
    id: "v-001",
    slug: "the-courtyard-estate",
    name: "The Courtyard Estate",
    category: "VENUE",
    location: "Udaipur",
    description: "Royal lakeside heritage estate with traditional courtyards and private palace ghats.",
    imageSrc: "/images/wedding/wedora-vendor-courtyard-estate.jpg",
    imageAlt: "The Courtyard Estate Udaipur luxury wedding venue",
    status: "BOOKED",
    paymentStatus: "PAID",
    event: "ALL_EVENTS",
    contactName: "Ranvijay Singh",
    contactEmail: "reservations@demo-courtyard-estate.com",
    contactPhone: "+91 98000 22001",
    bookingDate: "2026-08-15",
    nextAction: "Confirm final room inventory block for outstation guests",
    nextActionDate: "2026-12-10",
    notes: "Exclusive 3-day estate booking secured. All lakefront suites reserved.",
    amount: 1250000,
    amountPaid: 1250000,
    enquirySentAt: "2026-07-20",
    updatedAt: "2026-11-01",
  },
  {
    id: "v-002",
    slug: "mitti-and-marigold",
    name: "Mitti & Marigold",
    category: "DECOR",
    location: "Jaipur",
    description: "Thoughtful floral and spatial design rooted in Indian craft and heritage mandap scapes.",
    imageSrc: "/images/wedding/wedora-vendor-mitti-marigold.jpg",
    imageAlt: "Mitti & Marigold artisan floral decor and mandap design",
    status: "BOOKED",
    paymentStatus: "PARTIAL",
    event: "ALL_EVENTS",
    contactName: "Ananya Shekhawat",
    contactEmail: "design@demo-[#161514].com",
    contactPhone: "+91 98000 22002",
    bookingDate: "2026-09-10",
    nextAction: "Finalize mandap floral moodboard and lighting layout",
    nextActionDate: "2026-12-15",
    notes: "50% advance deposit paid. Second installment due 15 Jan 2027.",
    amount: 800000,
    amountPaid: 400000,
    enquirySentAt: "2026-08-01",
    updatedAt: "2026-11-12",
  },
  {
    id: "v-003",
    slug: "house-of-vows",
    name: "House of Vows",
    category: "PLANNING",
    location: "Pune",
    description: "Full-service wedding planning, luxury logistics, and calm execution shaped around your story.",
    imageSrc: "/images/wedding/wedora-vendor-house-of-vows.jpg",
    imageAlt: "House of Vows luxury wedding planning team",
    status: "BOOKED",
    paymentStatus: "PARTIAL",
    event: "ALL_EVENTS",
    contactName: "Devika & Rohan Merchant",
    contactEmail: "planning@demo-houseofvows.com",
    contactPhone: "+91 98000 22003",
    bookingDate: "2026-07-10",
    nextAction: "Bi-weekly vendor alignment call and hospitality check",
    nextActionDate: "2026-12-05",
    notes: "Lead planning agency managing on-site execution in Udaipur.",
    amount: 600000,
    amountPaid: 300000,
    enquirySentAt: "2026-06-15",
    updatedAt: "2026-11-20",
  },
  {
    id: "v-004",
    slug: "the-frame-house",
    name: "The Frame House",
    category: "PHOTOGRAPHY",
    location: "Mumbai",
    description: "Documentary wedding photography with a quiet cinematic eye, capturing raw emotions.",
    imageSrc: "/images/wedding/wedora-vendor-frame-house.jpg",
    imageAlt: "The Frame House luxury wedding photography portrait",
    status: "BOOKED",
    paymentStatus: "PARTIAL",
    event: "ALL_EVENTS",
    contactName: "Karan Johar",
    contactEmail: "studio@demo-framehouse.com",
    contactPhone: "+91 98000 22004",
    bookingDate: "2026-09-01",
    nextAction: "Share detailed event timeline & portrait shot list",
    nextActionDate: "2026-12-20",
    notes: "Includes 4-person photo team, drone operator, and heritage album.",
    amount: 450000,
    amountPaid: 225000,
    enquirySentAt: "2026-08-10",
    updatedAt: "2026-11-15",
  },
  {
    id: "v-005",
    slug: "saffron-table",
    name: "Saffron Table",
    category: "CATERING",
    location: "Goa",
    description: "Seasonal menus, royal Indian feasts, and thoughtful hospitality for celebrations of every scale.",
    imageSrc: "/images/wedding/wedora-vendor-saffron-table.jpg",
    imageAlt: "Saffron Table luxury wedding catering spread",
    status: "BOOKED",
    paymentStatus: "DUE",
    event: "ALL_EVENTS",
    contactName: "Chef Tarun Kapoor",
    contactEmail: "feasts@demo-saffrontable.com",
    contactPhone: "+91 98000 22005",
    bookingDate: "2026-09-25",
    nextAction: "Pay second catering installment & confirm live live-counters",
    nextActionDate: "2026-12-01",
    notes: "Second deposit of ₹1,75,000 currently due.",
    amount: 750000,
    amountPaid: 200000,
    enquirySentAt: "2026-08-15",
    updatedAt: "2026-11-25",
  },
  {
    id: "v-006",
    slug: "atelier-noor",
    name: "Atelier Noor",
    category: "BRIDAL",
    location: "Delhi",
    description: "Contemporary bridalwear, royal zardozi embroidery, and timeless bespoke wedding attire.",
    imageSrc: "/images/wedding/wedora-vendor-atelier-noor.jpg",
    imageAlt: "Atelier Noor bridal couture and embroidery details",
    status: "BOOKED",
    paymentStatus: "PAID",
    event: "WEDDING",
    contactName: "Noor Jahan",
    contactEmail: "couture@demo-ateliernoor.com",
    contactPhone: "+91 98000 22006",
    bookingDate: "2026-08-30",
    nextAction: "Final bridal lehenga trial fitting in Delhi studio",
    nextActionDate: "2027-01-10",
    notes: "Custom crimson velvet lehenga with antique gold zardozi. Fully paid.",
    amount: 350000,
    amountPaid: 350000,
    enquirySentAt: "2026-07-28",
    updatedAt: "2026-11-05",
  },
  {
    id: "v-007",
    slug: "swara-heritage-ensemble",
    name: "Swara Heritage Ensemble",
    category: "MUSIC",
    location: "Udaipur",
    description: "Classical Rajasthani folk musicians and live Santoor & Sitar acoustic ensemble.",
    imageSrc: "/images/wedding/wedora-vendor-frame-house.jpg",
    imageAlt: "Swara Heritage Ensemble traditional musicians",
    status: "NEGOTIATING",
    paymentStatus: "NOT_STARTED",
    event: "RECEPTION",
    contactName: "Ustad Ghulam Khan",
    contactEmail: "music@demo-swaraensemble.com",
    contactPhone: "+91 98000 22007",
    nextAction: "Review technical acoustic rider and finalize performance contract",
    nextActionDate: "2026-12-08",
    notes: "Quotative estimate received for 6-member acoustic group during Sunset Reception.",
    amount: 180000,
    amountPaid: 0,
    enquirySentAt: "2026-10-10",
    updatedAt: "2026-11-18",
  },
  {
    id: "v-008",
    slug: "rhythm-and-raag",
    name: "Rhythm & Raag DJ Crew",
    category: "MUSIC",
    location: "Jaipur",
    description: "High-energy fusion DJ and percussionist set for Mehendi & Sangeet night.",
    imageSrc: "/images/wedding/wedora-vendor-house-of-vows.jpg",
    imageAlt: "Rhythm & Raag DJ performance set",
    status: "ENQUIRY_SENT",
    paymentStatus: "NOT_STARTED",
    event: "MEHENDI",
    contactName: "DJ Rohan Varma",
    contactEmail: "booking@demo-rhythmraag.com",
    contactPhone: "+91 98000 22008",
    nextAction: "Awaiting formal quote and availability confirmation for 12 Feb",
    nextActionDate: "2026-12-03",
    notes: "Enquiry submitted via Wedora portal on 15 Nov.",
    amount: 120000,
    amountPaid: 0,
    enquirySentAt: "2026-11-15",
    updatedAt: "2026-11-15",
  },
  {
    id: "v-009",
    slug: "kiran-makeup-artistry",
    name: "Kiran Makeup & Hair Artistry",
    category: "MAKEUP",
    location: "Mumbai",
    description: "High-fashion bridal makeup artist specializing in glowing, editorial aesthetic.",
    imageSrc: "/images/wedding/wedora-vendor-atelier-noor.jpg",
    imageAlt: "Kiran Makeup & Hair Artistry bridal look",
    status: "SHORTLISTED",
    paymentStatus: "NOT_STARTED",
    event: "WEDDING",
    contactName: "Kiran Sharma",
    contactEmail: "kiran@demo-kiranmakeup.com",
    contactPhone: "+91 98000 22009",
    nextAction: "Send official enquiry for 14 Feb Udaipur booking",
    nextActionDate: "2026-12-05",
    notes: "Shortlisted from public directory after reviewing portfolio.",
    amount: 90000,
    amountPaid: 0,
    updatedAt: "2026-11-22",
  },
];
