export type EnquiryStatus =
  | "NEW"
  | "REVIEWING"
  | "RESPONDED"
  | "NEGOTIATING"
  | "ACCEPTED"
  | "DECLINED"
  | "CLOSED";

export type EnquiryPriority = "HIGH" | "NORMAL" | "LOW";

export type EnquirySource = "WEDORA" | "PUBLIC_PROFILE" | "DIRECT";

export type EnquiryContactMethod = "EMAIL" | "PHONE" | "WHATSAPP";

export type EnquiryDateStatus = "CONFIRMED" | "FLEXIBLE" | "NOT_DECIDED";

export interface EnquiryActivity {
  id: string;
  enquiryId: string;
  type:
    | "RECEIVED"
    | "STATUS_CHANGED"
    | "NOTE_ADDED"
    | "RESPONSE_DRAFTED"
    | "RESPONSE_SENT";
  description: string;
  createdAt: string;
}

export interface VendorEnquiry {
  id: string;
  coupleName: string;
  partnerName?: string;
  email: string;
  phone?: string;
  weddingDate?: string;
  dateStatus: EnquiryDateStatus;
  destination: string;
  guestCount?: number;
  eventCount?: number;
  events?: string[];
  serviceRequested: string;
  budgetRange?: string;
  message: string;
  status: EnquiryStatus;
  priority: EnquiryPriority;
  source: EnquirySource;
  receivedAt: string;
  lastUpdatedAt: string;
  responseDueAt?: string;
  preferredContactMethod: EnquiryContactMethod;
  notes?: string;
  unread: boolean;
  draftResponse?: string;
  activities: EnquiryActivity[];
}

export interface VendorEnquiriesSummary {
  total: number;
  newCount: number;
  awaitingResponse: number;
  negotiatingCount: number;
  acceptedCount: number;
  declinedCount: number;
  unreadCount: number;
}

export const INITIAL_VENDOR_ENQUIRIES: VendorEnquiry[] = [
  {
    id: "enq-001",
    coupleName: "Aditi Sharma",
    partnerName: "Arjun Kapoor",
    email: "aditi.arjun@weddingdemo.in",
    phone: "+91 98201 11223",
    weddingDate: "2027-02-14",
    dateStatus: "CONFIRMED",
    destination: "Udaipur",
    guestCount: 150,
    eventCount: 4,
    events: ["Mehendi & Sangeet", "Haldi", "Wedding Ceremony", "Reception"],
    serviceRequested: "Wedding Photography & Cinematography",
    budgetRange: "₹4,50,00,000 - ₹6,00,00,000",
    message:
      "Hi Riya, we loved your editorial documentary style for Rajasthan destination weddings! We are hosting a 3-day celebration at Jagmandir Island Palace in Udaipur. We would love to check your availability and discuss complete multi-day coverage including drone footage.",
    status: "NEW",
    priority: "HIGH",
    source: "WEDORA",
    receivedAt: "2026-09-18T10:30:00Z",
    lastUpdatedAt: "2026-09-18T10:30:00Z",
    responseDueAt: "2026-09-19T10:30:00Z",
    preferredContactMethod: "EMAIL",
    unread: true,
    notes: "High-value Udaipur destination booking. Need to confirm crew logistics for island transport.",
    activities: [
      {
        id: "act-001-1",
        enquiryId: "enq-001",
        type: "RECEIVED",
        description: "Enquiry received via Wedora Direct Connect.",
        createdAt: "2026-09-18T10:30:00Z",
      },
      {
        id: "act-001-2",
        enquiryId: "enq-001",
        type: "NOTE_ADDED",
        description: "Added note: High-value Udaipur destination booking.",
        createdAt: "2026-09-18T11:15:00Z",
      },
    ],
  },
  {
    id: "enq-002",
    coupleName: "Meera Nair",
    partnerName: "Rohan Deshmukh",
    email: "meera.rohan@weddingdemo.in",
    phone: "+91 98765 43210",
    weddingDate: "2027-04-18",
    dateStatus: "CONFIRMED",
    destination: "Goa",
    guestCount: 220,
    eventCount: 3,
    events: ["Sunset Welcome Party", "Traditional Pheras", "Beachside Reception"],
    serviceRequested: "Luxury Wedding Storytelling",
    budgetRange: "₹3,50,00,000 - ₹5,00,00,000",
    message:
      "Hello The Frame House team! We saw your recent portfolio featuring South Goa sunset ceremonies. We want candid, unposed captures of our beachside wedding. Please let us know if you have availability for mid-April 2027.",
    status: "REVIEWING",
    priority: "NORMAL",
    source: "PUBLIC_PROFILE",
    receivedAt: "2026-09-17T14:20:00Z",
    lastUpdatedAt: "2026-09-18T09:00:00Z",
    responseDueAt: "2026-09-18T18:00:00Z",
    preferredContactMethod: "WHATSAPP",
    unread: false,
    draftResponse: "Hi Meera and Rohan, thank you for reaching out! Mid-April 2027 is currently open on our calendar. I would love to hop on a quick video call to discuss your Goa timeline.",
    activities: [
      {
        id: "act-002-1",
        enquiryId: "enq-002",
        type: "RECEIVED",
        description: "Enquiry received from Public Profile.",
        createdAt: "2026-09-17T14:20:00Z",
      },
      {
        id: "act-002-2",
        enquiryId: "enq-002",
        type: "STATUS_CHANGED",
        description: "Status changed from NEW to REVIEWING.",
        createdAt: "2026-09-18T08:30:00Z",
      },
      {
        id: "act-002-3",
        enquiryId: "enq-002",
        type: "RESPONSE_DRAFTED",
        description: "Drafted response for Meera & Rohan.",
        createdAt: "2026-09-18T09:00:00Z",
      },
    ],
  },
  {
    id: "enq-003",
    coupleName: "Isha Malhotra",
    partnerName: "Kunal Singhania",
    email: "isha.kunal@weddingdemo.in",
    phone: "+91 99100 88776",
    weddingDate: "2027-01-10",
    dateStatus: "CONFIRMED",
    destination: "Mumbai",
    guestCount: 350,
    eventCount: 3,
    events: ["Cocktail Night", "Wedding", "Grand Gala"],
    serviceRequested: "Pre-Wedding & Main Ceremony Coverage",
    budgetRange: "₹4,00,00,000 - ₹5,50,00,000",
    message:
      "Dear Riya, we are organizing our wedding at The St. Regis Mumbai in January 2027. We reviewed your signature package details. Could you share details regarding your team size and deliverable timelines?",
    status: "RESPONDED",
    priority: "HIGH",
    source: "WEDORA",
    receivedAt: "2026-09-15T09:00:00Z",
    lastUpdatedAt: "2026-09-16T15:45:00Z",
    responseDueAt: "2026-09-16T09:00:00Z",
    preferredContactMethod: "EMAIL",
    unread: false,
    notes: "Sent preliminary pricing deck and team structure details. Awaiting their feedback on videography add-ons.",
    activities: [
      {
        id: "act-003-1",
        enquiryId: "enq-003",
        type: "RECEIVED",
        description: "Enquiry received via Wedora.",
        createdAt: "2026-09-15T09:00:00Z",
      },
      {
        id: "act-003-2",
        enquiryId: "enq-003",
        type: "RESPONSE_SENT",
        description: "Sent comprehensive proposal and team availability.",
        createdAt: "2026-09-16T15:45:00Z",
      },
      {
        id: "act-003-3",
        enquiryId: "enq-003",
        type: "STATUS_CHANGED",
        description: "Status changed to RESPONDED.",
        createdAt: "2026-09-16T15:45:00Z",
      },
    ],
  },
  {
    id: "enq-004",
    coupleName: "Ananya Roy",
    partnerName: "Kabir Verma",
    email: "ananya.kabir@weddingdemo.in",
    phone: "+91 98311 22334",
    weddingDate: "2026-12-05",
    dateStatus: "CONFIRMED",
    destination: "Jaipur",
    guestCount: 200,
    eventCount: 4,
    events: ["Sangeet", "Haldi", "Royal Wedding", "Reception"],
    serviceRequested: "Editorial Destination Package",
    budgetRange: "₹5,00,00,000 - ₹7,00,00,000",
    message:
      "We are finalizing our photography team for Rambagh Palace Jaipur. We love your signature warm tones and black-and-white portraits. Can we discuss a custom package with extra drone coverage?",
    status: "NEGOTIATING",
    priority: "HIGH",
    source: "DIRECT",
    receivedAt: "2026-09-10T11:00:00Z",
    lastUpdatedAt: "2026-09-17T16:30:00Z",
    responseDueAt: "2026-09-18T12:00:00Z",
    preferredContactMethod: "PHONE",
    unread: false,
    notes: "Customizing proposal with 2 senior cinematographers + complimentary drone operator.",
    activities: [
      {
        id: "act-004-1",
        enquiryId: "enq-004",
        type: "RECEIVED",
        description: "Direct enquiry received via email referral.",
        createdAt: "2026-09-10T11:00:00Z",
      },
      {
        id: "act-004-2",
        enquiryId: "enq-004",
        type: "STATUS_CHANGED",
        description: "Status updated to NEGOTIATING after discovery call.",
        createdAt: "2026-09-17T16:30:00Z",
      },
    ],
  },
  {
    id: "enq-005",
    coupleName: "Priya Varma",
    partnerName: "Dev Khanna",
    email: "priya.dev@weddingdemo.in",
    phone: "+91 97112 33445",
    weddingDate: "2026-11-20",
    dateStatus: "CONFIRMED",
    destination: "Pune",
    guestCount: 180,
    eventCount: 2,
    events: ["Wedding Ceremony", "Evening Reception"],
    serviceRequested: "Signature Wedding Storytelling",
    budgetRange: "₹2,50,00,000 - ₹3,50,00,000",
    message:
      "Hi Riya, we would love to book your team for our intimate estate wedding near Pune! We have reviewed the quote and accept all terms.",
    status: "ACCEPTED",
    priority: "NORMAL",
    source: "WEDORA",
    receivedAt: "2026-09-05T08:00:00Z",
    lastUpdatedAt: "2026-09-14T12:00:00Z",
    preferredContactMethod: "EMAIL",
    unread: false,
    notes: "Couple accepted proposal. Awaiting contract signing and retainer payment schedule.",
    activities: [
      {
        id: "act-005-1",
        enquiryId: "enq-005",
        type: "RECEIVED",
        description: "Enquiry received.",
        createdAt: "2026-09-05T08:00:00Z",
      },
      {
        id: "act-005-2",
        enquiryId: "enq-005",
        type: "STATUS_CHANGED",
        description: "Status updated to ACCEPTED.",
        createdAt: "2026-09-14T12:00:00Z",
      },
    ],
  },
  {
    id: "enq-006",
    coupleName: "Tanvi Saxena",
    partnerName: "Siddharth Joshi",
    email: "tanvi.sid@weddingdemo.in",
    phone: "+91 99200 44556",
    weddingDate: "2026-10-15",
    dateStatus: "FLEXIBLE",
    destination: "Delhi",
    guestCount: 500,
    eventCount: 5,
    events: ["Mehndi", "Sangeet", "Haldi", "Wedding", "Reception"],
    serviceRequested: "Complete Wedding & Pre-Wedding Experience",
    budgetRange: "₹1,50,00,000 - ₹2,00,00,000",
    message:
      "Looking for complete 5-day wedding photography in Delhi. Please share your rates.",
    status: "DECLINED",
    priority: "LOW",
    source: "PUBLIC_PROFILE",
    receivedAt: "2026-09-01T15:00:00Z",
    lastUpdatedAt: "2026-09-02T10:00:00Z",
    preferredContactMethod: "EMAIL",
    unread: false,
    notes: "Budget constraint did not match our minimum multi-day destination coverage threshold.",
    activities: [
      {
        id: "act-006-1",
        enquiryId: "enq-006",
        type: "RECEIVED",
        description: "Enquiry received.",
        createdAt: "2026-09-01T15:00:00Z",
      },
      {
        id: "act-006-2",
        enquiryId: "enq-006",
        type: "STATUS_CHANGED",
        description: "Status updated to DECLINED.",
        createdAt: "2026-09-02T10:00:00Z",
      },
    ],
  },
  {
    id: "enq-007",
    coupleName: "Simran Kaur",
    partnerName: "Harpreet Singh",
    email: "simran.harpreet@weddingdemo.in",
    phone: "+91 98199 77665",
    weddingDate: "2026-08-12",
    dateStatus: "CONFIRMED",
    destination: "Mumbai",
    guestCount: 120,
    eventCount: 2,
    events: ["Anand Karaj", "Reception"],
    serviceRequested: "Signature Wedding Storytelling",
    budgetRange: "₹2,80,00,000 - ₹3,50,00,000",
    message:
      "Thank you Riya! We had a wonderful experience talking to you. The wedding was executed smoothly and deliverables are complete.",
    status: "CLOSED",
    priority: "LOW",
    source: "WEDORA",
    receivedAt: "2026-07-01T09:00:00Z",
    lastUpdatedAt: "2026-08-30T18:00:00Z",
    preferredContactMethod: "WHATSAPP",
    unread: false,
    notes: "Archived past project. Album delivered and positive review received.",
    activities: [
      {
        id: "act-007-1",
        enquiryId: "enq-007",
        type: "RECEIVED",
        description: "Enquiry received.",
        createdAt: "2026-07-01T09:00:00Z",
      },
      {
        id: "act-007-2",
        enquiryId: "enq-007",
        type: "STATUS_CHANGED",
        description: "Status updated to CLOSED.",
        createdAt: "2026-08-30T18:00:00Z",
      },
    ],
  },
];
