/**
 * CENTRALIZED DEMO / MOCK DATA FOR WEDORA CLIENT BUDGET MANAGEMENT
 * 
 * IMPORTANT FOR DEVELOPERS:
 * All content in this file is illustrative demonstration mock data.
 * Total budget: ₹35,00,000 (matching Wedora starting estimate).
 * Planned total: ₹35,00,000 across 8 categories.
 * Spent total: ₹18,50,000 across 16 coherent demo expenses.
 */

export type ExpenseStatus = "PLANNED" | "CONFIRMED" | "PAID";
export type PaymentStatus = "PENDING" | "PARTIAL" | "PAID";

export interface BudgetCategory {
  id: string;
  name: string;
  description: string;
  plannedAmount: number;
}

export interface BudgetExpense {
  id: string;
  title: string;
  categoryId: string;
  vendorName?: string;
  amount: number;
  date: string;
  status: ExpenseStatus;
  paymentStatus: PaymentStatus;
  notes?: string;
  custom?: boolean;
  createdAt?: string;
}

export const INITIAL_TOTAL_BUDGET = 3500000; // ₹35,00,000

export const BUDGET_CATEGORIES: BudgetCategory[] = [
  {
    id: "venue",
    name: "Venue",
    description: "Palace grounds, courtyards & room blocks",
    plannedAmount: 1000000, // ₹10,00,000
  },
  {
    id: "catering",
    name: "Food & Catering",
    description: "Royal banquets, live counters & beverage service",
    plannedAmount: 800000, // ₹8,00,000
  },
  {
    id: "decor",
    name: "Decor & Design",
    description: "Stage, mandap, floral themes & ambient lighting",
    plannedAmount: 600000, // ₹6,00,000
  },
  {
    id: "photography",
    name: "Photography",
    description: "Cinematic film, candid photography & drone coverage",
    plannedAmount: 350000, // ₹3,50,000
  },
  {
    id: "attire",
    name: "Attire & Beauty",
    description: "Bridal couture, groom sherwani & hair/makeup trials",
    plannedAmount: 300000, // ₹3,00,000
  },
  {
    id: "music",
    name: "Music & Entertainment",
    description: "Folk singers, DJ, acoustic band & sound production",
    plannedAmount: 200000, // ₹2,00,000
  },
  {
    id: "travel",
    name: "Travel & Accommodation",
    description: "Guest shuttle buses, vintage car & logistics",
    plannedAmount: 150000, // ₹1,50,000
  },
  {
    id: "other",
    name: "Other",
    description: "Stationery, favours, emergency pool & permits",
    plannedAmount: 100000, // ₹1,00,000
  },
];

export const MOCK_BUDGET_EXPENSES: BudgetExpense[] = [
  // VENUE (Planned: ₹10,00,000 | Spent: ₹6,50,000)
  {
    id: "exp-v1",
    title: "Palace Courtyard & Mandap Venue Advance",
    categoryId: "venue",
    vendorName: "The Oberoi Udaivilas",
    amount: 500000,
    date: "2026-08-15",
    status: "CONFIRMED",
    paymentStatus: "PARTIAL",
    notes: "First installment paid for Palace Grounds booking",
    createdAt: "2026-06-01",
  },
  {
    id: "exp-v2",
    title: "Lakeside Lawns Booking Fee",
    categoryId: "venue",
    vendorName: "The Oberoi Udaivilas",
    amount: 150000,
    date: "2026-09-01",
    status: "CONFIRMED",
    paymentStatus: "PAID",
    notes: "Haldi ceremony venue confirmation deposit",
    createdAt: "2026-06-10",
  },

  // FOOD & CATERING (Planned: ₹8,00,000 | Spent: ₹4,00,000)
  {
    id: "exp-c1",
    title: "Royal Banquet Catering Booking Deposit",
    categoryId: "catering",
    vendorName: "Shahi Rasoi Caterers",
    amount: 400000,
    date: "2026-09-05",
    status: "CONFIRMED",
    paymentStatus: "PARTIAL",
    notes: "Covers 150 guests across 4 main meals",
    createdAt: "2026-07-01",
  },

  // DECOR & DESIGN (Planned: ₹6,00,000 | Spent: ₹3,50,000)
  {
    id: "exp-d1",
    title: "Mandap Floral Installation & Lighting Advance",
    categoryId: "decor",
    vendorName: "Mitti & Marigold",
    amount: 250000,
    date: "2026-09-02",
    status: "CONFIRMED",
    paymentStatus: "PARTIAL",
    notes: "Heritage marigold & jasmine floral styling",
    createdAt: "2026-07-15",
  },
  {
    id: "exp-d2",
    title: "Sangeet Canopy Lighting & Lanterns",
    categoryId: "decor",
    vendorName: "Mitti & Marigold",
    amount: 100000,
    date: "2026-09-10",
    status: "CONFIRMED",
    paymentStatus: "PAID",
    notes: "Vintage brass lanterns & string lights setup",
    createdAt: "2026-08-01",
  },

  // PHOTOGRAPHY (Planned: ₹3,50,000 | Spent: ₹2,10,000)
  {
    id: "exp-p1",
    title: "Cinematic Film & Photography Retainer",
    categoryId: "photography",
    vendorName: "The Frame House",
    amount: 160000,
    date: "2026-08-20",
    status: "CONFIRMED",
    paymentStatus: "PARTIAL",
    notes: "4-day full coverage including drone cinematography",
    createdAt: "2026-06-15",
  },
  {
    id: "exp-p2",
    title: "Pre-wedding Portrait Shoot Booking",
    categoryId: "photography",
    vendorName: "The Frame House",
    amount: 50000,
    date: "2026-09-08",
    status: "PAID",
    paymentStatus: "PAID",
    notes: "Outdoor portrait session in Udaipur old city",
    createdAt: "2026-07-20",
  },

  // ATTIRE & BEAUTY (Planned: ₹3,00,000 | Spent: ₹1,50,000)
  {
    id: "exp-a1",
    title: "Bridal Ceremony Lehenga Deposit",
    categoryId: "attire",
    vendorName: "House of Vows",
    amount: 100000,
    date: "2026-08-10",
    status: "CONFIRMED",
    paymentStatus: "PARTIAL",
    notes: "Zardozi hand-embroidered custom lehenga",
    createdAt: "2026-05-20",
  },
  {
    id: "exp-a2",
    title: "Bridal Makeup & Hair Package Booking",
    categoryId: "attire",
    vendorName: "Glitz & Glamour Studio",
    amount: 50000,
    date: "2026-09-04",
    status: "CONFIRMED",
    paymentStatus: "PAID",
    notes: "Covers 3 event looks including trial session",
    createdAt: "2026-07-25",
  },

  // MUSIC & ENTERTAINMENT (Planned: ₹2,00,000 | Spent: ₹50,000)
  {
    id: "exp-m1",
    title: "Sangeet Acoustic Band Booking Fee",
    categoryId: "music",
    vendorName: "Symphony Beats",
    amount: 50000,
    date: "2026-09-12",
    status: "CONFIRMED",
    paymentStatus: "PARTIAL",
    notes: "Live Rajasthani folk fusion group",
    createdAt: "2026-08-10",
  },

  // TRAVEL & ACCOMMODATION (Planned: ₹1,50,000 | Spent: ₹20,000)
  {
    id: "exp-t1",
    title: "Baraat Vintage Luxury Car Rental",
    categoryId: "travel",
    vendorName: "Heritage Wheels Udaipur",
    amount: 20000,
    date: "2026-09-14",
    status: "PLANNED",
    paymentStatus: "PENDING",
    notes: "Vintage convertible for groom baraat entry",
    createdAt: "2026-08-25",
  },

  // OTHER (Planned: ₹1,00,000 | Spent: ₹20,000)
  {
    id: "exp-o1",
    title: "Bespoke Calligraphy Invitations & favours",
    categoryId: "other",
    vendorName: "Artisan Craft Cards",
    amount: 20000,
    date: "2026-09-15",
    status: "PAID",
    paymentStatus: "PAID",
    notes: "Handmade cotton deckle-edge paper stationery",
    createdAt: "2026-08-30",
  },
];
