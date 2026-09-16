/**
 * CENTRALIZED DEMO / MOCK DATA FOR WEDORA WEDDING CHECKLIST
 * 
 * IMPORTANT FOR DEVELOPERS:
 * All content in this file is illustrative demonstration mock data.
 * The Checklist components receive these typed data objects as props
 * to ensure seamless future backend API / database integration.
 */

export type ChecklistPriority = "LOW" | "MEDIUM" | "HIGH";

export interface ChecklistCategory {
  id: string;
  name: string;
  description: string;
}

export interface ChecklistTask {
  id: string;
  title: string;
  description?: string;
  categoryId: string;
  priority: ChecklistPriority;
  dueDate: string;
  completed: boolean;
  custom?: boolean;
  createdAt?: string;
}

export const CHECKLIST_CATEGORIES: ChecklistCategory[] = [
  { id: "all", name: "ALL", description: "All wedding planning tasks" },
  { id: "venue", name: "VENUE", description: "Location, ceremony setup & accommodation" },
  { id: "vendors", name: "VENDORS", description: "Photographers, decor, catering & music" },
  { id: "guests", name: "GUESTS", description: "Guest list, invitations & RSVPs" },
  { id: "decor", name: "DECOR & DESIGN", description: "Floral themes, lighting & styling" },
  { id: "attire", name: "ATTIRE & BEAUTY", description: "Couture, fittings & hair/makeup trials" },
  { id: "events", name: "EVENTS", description: "Mehndi, Haldi & Reception timelines" },
  { id: "logistics", name: "DOCUMENTS & LOGISTICS", description: "Legal paperwork, transit & emergency contacts" },
];

export const MOCK_CHECKLIST_TASKS: ChecklistTask[] = [
  // VENUE (4 tasks: 3 completed, 1 pending)
  {
    id: "chk-v1",
    title: "Finalize wedding venue in Udaipur",
    description: "Confirm contract with The Oberoi Udaivilas for Palace grounds",
    categoryId: "venue",
    priority: "HIGH",
    dueDate: "2026-08-15",
    completed: true,
    createdAt: "2026-06-01",
  },
  {
    id: "chk-v2",
    title: "Confirm guest accommodation blocks",
    description: "Reserve 45 luxury suite blocks for out-of-town guests",
    categoryId: "venue",
    priority: "HIGH",
    dueDate: "2026-09-01",
    completed: true,
    createdAt: "2026-06-10",
  },
  {
    id: "chk-v3",
    title: "Review venue sound & curfew restrictions",
    description: "Verify outdoor acoustic guidelines for Sangeet night",
    categoryId: "venue",
    priority: "MEDIUM",
    dueDate: "2026-09-10",
    completed: true,
    createdAt: "2026-07-05",
  },
  {
    id: "chk-v4",
    title: "Schedule final venue walkthrough",
    description: "Walkthrough with event coordinator and decor team",
    categoryId: "venue",
    priority: "MEDIUM",
    dueDate: "2026-10-01",
    completed: false,
    createdAt: "2026-08-20",
  },

  // VENDORS (4 tasks: 3 completed, 1 pending)
  {
    id: "chk-vnd1",
    title: "Shortlist & book lead wedding photographer",
    description: "Finalized contract with The Frame House photography team",
    categoryId: "vendors",
    priority: "HIGH",
    dueDate: "2026-08-30",
    completed: true,
    createdAt: "2026-06-15",
  },
  {
    id: "chk-vnd2",
    title: "Confirm floral design & decor partner",
    description: "Mitti & Marigold selected for heritage floral installations",
    categoryId: "vendors",
    priority: "HIGH",
    dueDate: "2026-09-05",
    completed: true,
    createdAt: "2026-07-01",
  },
  {
    id: "chk-vnd3",
    title: "Sample and finalize royal banquet catering menu",
    description: "Curate Rajasthani royal thali and international live stations",
    categoryId: "vendors",
    priority: "HIGH",
    dueDate: "2026-09-12",
    completed: true,
    createdAt: "2026-07-15",
  },
  {
    id: "chk-vnd4",
    title: "Select live acoustic band & DJ for Reception",
    description: "Review performance recordings and negotiate rider terms",
    categoryId: "vendors",
    priority: "MEDIUM",
    dueDate: "2026-09-22",
    completed: false,
    createdAt: "2026-08-25",
  },

  // GUESTS (4 tasks: 2 completed, 2 pending)
  {
    id: "chk-gst1",
    title: "Prepare initial guest master list",
    description: "Compile addresses and family contact details for 150 guests",
    categoryId: "guests",
    priority: "HIGH",
    dueDate: "2026-07-30",
    completed: true,
    createdAt: "2026-05-20",
  },
  {
    id: "chk-gst2",
    title: "Send out digital Save-the-Date announcements",
    description: "Dispatch bespoke digital invites to international guests",
    categoryId: "guests",
    priority: "HIGH",
    dueDate: "2026-08-20",
    completed: true,
    createdAt: "2026-07-01",
  },
  {
    id: "chk-gst3",
    title: "Track & follow up on RSVP confirmations",
    description: "Follow up with pending family groups before final headcount",
    categoryId: "guests",
    priority: "HIGH",
    dueDate: "2026-09-14",
    completed: false, // OVERDUE / DUE TODAY
    createdAt: "2026-08-01",
  },
  {
    id: "chk-gst4",
    title: "Finalize airport transfer schedule for guests",
    description: "Coordinate shuttle timings between Maharana Pratap Airport and venue",
    categoryId: "guests",
    priority: "LOW",
    dueDate: "2026-10-15",
    completed: false,
    createdAt: "2026-08-28",
  },

  // DECOR & DESIGN (3 tasks: 2 completed, 1 pending)
  {
    id: "chk-dec1",
    title: "Approve color palette & moodboard for Mandap setup",
    description: "Marigold, ivory lace, and muted gold heritage elements",
    categoryId: "decor",
    priority: "HIGH",
    dueDate: "2026-08-25",
    completed: true,
    createdAt: "2026-07-10",
  },
  {
    id: "chk-dec2",
    title: "Review lighting design for Sangeet courtyard",
    description: "Fairytale canopy lights and vintage brass lanterns",
    categoryId: "decor",
    priority: "MEDIUM",
    dueDate: "2026-09-08",
    completed: true,
    createdAt: "2026-08-05",
  },
  {
    id: "chk-dec3",
    title: "Finalize table stationery & menu cards",
    description: "Calligraphy printed on handmade cotton deckle-edge paper",
    categoryId: "decor",
    priority: "LOW",
    dueDate: "2026-09-20",
    completed: false,
    createdAt: "2026-08-30",
  },

  // ATTIRE & BEAUTY (3 tasks: 2 completed, 1 pending)
  {
    id: "chk-att1",
    title: "Finalize bridal lehenga & couture fittings",
    description: "Hand-embroidered zardozi ensemble for main ceremony",
    categoryId: "attire",
    priority: "HIGH",
    dueDate: "2026-08-10",
    completed: true,
    createdAt: "2026-05-15",
  },
  {
    id: "chk-att2",
    title: "Schedule groom sherwani fitting & accessories",
    description: "Custom silk sherwani with antique gold kalgi",
    categoryId: "attire",
    priority: "HIGH",
    dueDate: "2026-09-02",
    completed: true,
    createdAt: "2026-06-20",
  },
  {
    id: "chk-att3",
    title: "Book hair & makeup artist trial session",
    description: "Confirm trial appointment for Mehndi and Ceremony looks",
    categoryId: "attire",
    priority: "MEDIUM",
    dueDate: "2026-09-18",
    completed: false, // DUE SOON
    createdAt: "2026-08-15",
  },

  // EVENTS (4 tasks: 3 completed, 1 pending)
  {
    id: "chk-evt1",
    title: "Finalize Mehndi ceremony music playlist & artist timeline",
    description: "Folk singers and acoustic tabla performance schedule",
    categoryId: "events",
    priority: "MEDIUM",
    dueDate: "2026-08-28",
    completed: true,
    createdAt: "2026-07-20",
  },
  {
    id: "chk-evt2",
    title: "Plan Haldi activity schedule & phoolon ki holi arrangements",
    description: "Order fresh rose petals and marigold flowers",
    categoryId: "events",
    priority: "MEDIUM",
    dueDate: "2026-09-04",
    completed: true,
    createdAt: "2026-07-25",
  },
  {
    id: "chk-evt3",
    title: "Confirm Pheras ceremony timeline & panditji guidelines",
    description: "Coordinate auspicious mahurat timing with priest",
    categoryId: "events",
    priority: "HIGH",
    dueDate: "2026-09-09",
    completed: true,
    createdAt: "2026-08-01",
  },
  {
    id: "chk-evt4",
    title: "Finalize Reception speech & Toast schedule",
    description: "Confirm sequence of family toasts and first dance track",
    categoryId: "events",
    priority: "LOW",
    dueDate: "2026-09-25",
    completed: false,
    createdAt: "2026-09-01",
  },

  // DOCUMENTS & LOGISTICS (3 tasks: 2 completed, 1 pending)
  {
    id: "chk-log1",
    title: "Review marriage registration documents & affidavits",
    description: "Verify identity proofs and special marriage act paperwork",
    categoryId: "logistics",
    priority: "HIGH",
    dueDate: "2026-08-18",
    completed: true,
    createdAt: "2026-06-05",
  },
  {
    id: "chk-log2",
    title: "Prepare vendor emergency contact directory",
    description: "Compile contact details of all on-site wedding managers",
    categoryId: "logistics",
    priority: "MEDIUM",
    dueDate: "2026-09-07",
    completed: true,
    createdAt: "2026-08-10",
  },
  {
    id: "chk-log3",
    title: "Arrange luxury car transit for couple & immediate family",
    description: "Vintage Car booking for baraat and airport pick-ups",
    categoryId: "logistics",
    priority: "HIGH",
    dueDate: "2026-09-15",
    completed: false, // OVERDUE / DUE TODAY
    createdAt: "2026-08-22",
  },
];
