export type ReviewStatus = "PENDING" | "PUBLISHED" | "HIDDEN" | "FLAGGED";

export type ReviewResponseStatus = "NOT_RESPONDED" | "RESPONDED";

export type ReviewSource = "WEDORA" | "DIRECT" | "BOOKING_FOLLOW_UP";

export type ReviewRating = 1 | 2 | 3 | 4 | 5;

export type RequestStatus = "NOT_REQUESTED" | "REQUESTED" | "COMPLETED";

export interface VendorReview {
  id: string;
  reviewReference: string;
  clientReference: string;
  bookingId: string;
  coupleName: string;
  reviewerName: string;
  reviewerInitials: string;
  service: string;
  packageName: string;
  destination: string;
  weddingDate: string;
  rating: ReviewRating;
  title: string;
  review: string;
  status: ReviewStatus;
  responseStatus: ReviewResponseStatus;
  response?: string;
  respondedAt?: string;
  source: ReviewSource;
  createdAt: string;
  updatedAt: string;
  helpfulCount: number;
  privateNote?: string;
}

export interface ReviewActivity {
  id: string;
  reviewId: string;
  type:
    | "REVIEW_RECEIVED"
    | "REVIEW_VIEWED"
    | "RESPONSE_STARTED"
    | "RESPONSE_SENT"
    | "REVIEW_HIDDEN"
    | "REVIEW_FLAGGED"
    | "NOTE_ADDED";
  description: string;
  timestamp: string;
}

export interface ReviewRequest {
  id: string;
  clientReference: string;
  bookingId: string;
  coupleName: string;
  weddingDate: string;
  service: string;
  requestStatus: RequestStatus;
  requestedAt?: string;
  completedAt?: string;
  notes?: string;
}

export interface VendorReviewsSummary {
  totalReviews: number;
  publishedReviews: number;
  pendingReviews: number;
  respondedReviews: number;
  awaitingResponse: number;
  averageRating: number;
  fiveStarCount: number;
  fourStarCount: number;
  threeStarCount: number;
  twoStarCount: number;
  oneStarCount: number;
  totalHelpfulVotes: number;
  reviewRequestsSent: number;
  reviewRequestsCompleted: number;
}

export interface ReviewActionItem {
  id: string;
  type: "AWAITING_RESPONSE" | "FLAGGED_REVIEW" | "HIDDEN_REVIEW" | "REQUEST_PENDING";
  title: string;
  description: string;
  reviewId?: string;
  requestId?: string;
  rating?: number;
  priority: "HIGH" | "NORMAL" | "LOW";
}

export const INITIAL_VENDOR_REVIEWS: VendorReview[] = [
  {
    id: "rev_1",
    reviewReference: "REV-2026-001",
    clientReference: "CLI-2026-001",
    bookingId: "BK-2026-001",
    coupleName: "Aditi & Arjun",
    reviewerName: "Aditi Sharma",
    reviewerInitials: "AS",
    service: "Full Wedding Photography & Cinematography",
    packageName: "Royal Heritage Collection",
    destination: "Udaipur",
    weddingDate: "2026-11-15",
    rating: 5,
    title: "Unmatched artistry and calm elegance at Jagmandir Palace",
    review:
      "Riya and The Frame House team captured our 3-day Udaipur celebration with sheer poetry. They managed to be everywhere without ever intruding. The teaser film brought our families to tears. Truly the best investment we made for our wedding.",
    status: "PUBLISHED",
    responseStatus: "RESPONDED",
    response:
      "Aditi & Arjun, hearing this fills our entire team with immense joy. Capturing your sunset pheras at Jagmandir Island Palace was an absolute honor. Thank you for placing your trust in our vision.",
    respondedAt: "2026-08-20T14:30:00Z",
    source: "WEDORA",
    createdAt: "2026-08-18T10:15:00Z",
    updatedAt: "2026-08-20T14:30:00Z",
    helpfulCount: 14,
    privateNote: "Sent physical framed print gift to Mumbai residence.",
  },
  {
    id: "rev_2",
    reviewReference: "REV-2026-002",
    clientReference: "CLI-2026-002",
    bookingId: "BK-2026-002",
    coupleName: "Meera & Rohan",
    reviewerName: "Meera Kapoor",
    reviewerInitials: "MK",
    service: "Candid Photography & Teaser Film",
    packageName: "Palace Elegance Package",
    destination: "Jaipur",
    weddingDate: "2026-12-04",
    rating: 5,
    title: "Timeless portraiture and incredibly warm team",
    review:
      "Every single photograph feels like a painting. They handled our large family portraits effortlessly and kept everyone smiling despite the winter chill in Jaipur. Cannot recommend them enough!",
    status: "PUBLISHED",
    responseStatus: "NOT_RESPONDED",
    source: "BOOKING_FOLLOW_UP",
    createdAt: "2026-09-02T16:40:00Z",
    updatedAt: "2026-09-02T16:40:00Z",
    helpfulCount: 8,
    privateNote: "Draft response prepared. Awaiting vendor final signoff.",
  },
  {
    id: "rev_3",
    reviewReference: "REV-2026-003",
    clientReference: "CLI-2026-003",
    bookingId: "BK-2026-003",
    coupleName: "Isha & Kunal",
    reviewerName: "Kunal Merchant",
    reviewerInitials: "KM",
    service: "Pre-Wedding & Destination Wedding Film",
    packageName: "Coastal Sunset Package",
    destination: "Goa",
    weddingDate: "2026-11-28",
    rating: 4,
    title: "Gorgeous ocean imagery and cinematic drone shots",
    review:
      "The pre-wedding shoot on South Goa beaches was dreamlike. Frame House was very professional and accommodating with date adjustments. Teaser delivery took slightly longer than anticipated, but the final quality made it worth the wait.",
    status: "PUBLISHED",
    responseStatus: "RESPONDED",
    response:
      "Thank you Kunal! We appreciated your patience while we crafted the custom color grade for your beach footage. It was a pleasure working with you both in Goa.",
    respondedAt: "2026-07-15T11:20:00Z",
    source: "WEDORA",
    createdAt: "2026-07-10T09:00:00Z",
    updatedAt: "2026-07-15T11:20:00Z",
    helpfulCount: 6,
  },
  {
    id: "rev_4",
    reviewReference: "REV-2026-004",
    clientReference: "CLI-2026-004",
    bookingId: "BK-2026-004",
    coupleName: "Ananya & Kabir",
    reviewerName: "Ananya Deshmukh",
    reviewerInitials: "AD",
    service: "Traditional Wedding Photography",
    packageName: "Grand Classic Package",
    destination: "Mumbai",
    weddingDate: "2026-08-20",
    rating: 5,
    title: "Captured the emotion and tradition beautifully",
    review:
      "From the candid tears during Vidaai to the high-energy Sangeet dances, The Frame House captured every detail. The physical coffee table album quality is superior to anything we have seen.",
    status: "PUBLISHED",
    responseStatus: "RESPONDED",
    response:
      "Thank you Ananya! We loved preserving your family heritage and traditions. Wishing you and Kabir a lifetime of happiness.",
    respondedAt: "2026-08-28T18:00:00Z",
    source: "DIRECT",
    createdAt: "2026-08-25T14:10:00Z",
    updatedAt: "2026-08-28T18:00:00Z",
    helpfulCount: 11,
  },
  {
    id: "rev_5",
    reviewReference: "REV-2026-005",
    clientReference: "CLI-2026-005",
    bookingId: "BK-2026-005",
    coupleName: "Priya & Dev",
    reviewerName: "Dev Singhania",
    reviewerInitials: "DS",
    service: "Luxury Wedding Film & Fine Art Album",
    packageName: "Bespoke Luxury Collection",
    destination: "Jaipur",
    weddingDate: "2027-01-10",
    rating: 3,
    title: "Stunning visual quality but album proofing was delayed",
    review:
      "The photography and video coverage are undoubtedly top-tier. However, the initial digital album layout required two revision cycles and took longer than the projected timeline.",
    status: "PUBLISHED",
    responseStatus: "NOT_RESPONDED",
    source: "BOOKING_FOLLOW_UP",
    createdAt: "2026-09-10T11:00:00Z",
    updatedAt: "2026-09-10T11:00:00Z",
    helpfulCount: 3,
    privateNote: "Need to respond gracefully explaining our archival proofing standards.",
  },
  {
    id: "rev_6",
    reviewReference: "REV-2026-006",
    clientReference: "CLI-2026-006",
    bookingId: "BK-2026-001",
    coupleName: "Tanvi & Siddharth",
    reviewerName: "Tanvi Mehta",
    reviewerInitials: "TM",
    service: "Full Wedding Photography & Cinematography",
    packageName: "Royal Heritage Collection",
    destination: "Udaipur",
    weddingDate: "2026-10-18",
    rating: 5,
    title: "The highlight of our wedding vendor team",
    review:
      "Working with Riya was the easiest part of our wedding planning. Extremely organized, punctual, and artistic. Our wedding reel gained so much love from friends and family!",
    status: "PUBLISHED",
    responseStatus: "RESPONDED",
    response:
      "Tanvi & Siddharth, thank you so much! It was a delight filming your celebrations in Udaipur.",
    respondedAt: "2026-06-20T09:15:00Z",
    source: "WEDORA",
    createdAt: "2026-06-18T12:00:00Z",
    updatedAt: "2026-06-20T09:15:00Z",
    helpfulCount: 19,
  },
  {
    id: "rev_7",
    reviewReference: "REV-2026-007",
    clientReference: "CLI-2026-007",
    bookingId: "BK-2026-002",
    coupleName: "Simran & Harpreet",
    reviewerName: "Harpreet Singh",
    reviewerInitials: "HS",
    service: "Candid Photography & Teaser Film",
    packageName: "Palace Elegance Package",
    destination: "Jaipur",
    weddingDate: "2026-09-05",
    rating: 2,
    title: "Demo review entry - Schedule misunderstanding note",
    review:
      "This is a demo sample entry illustrating a flagged or lower-rated feedback scenario regarding ceremony schedule timing.",
    status: "FLAGGED",
    responseStatus: "NOT_RESPONDED",
    source: "DIRECT",
    createdAt: "2026-09-12T08:30:00Z",
    updatedAt: "2026-09-12T08:30:00Z",
    helpfulCount: 0,
    privateNote: "Under review with studio manager. Flagged for internal discussion.",
  },
];

export const INITIAL_REVIEW_REQUESTS: ReviewRequest[] = [
  {
    id: "req_1",
    clientReference: "CLI-2026-002",
    bookingId: "BK-2026-002",
    coupleName: "Meera & Rohan",
    weddingDate: "2026-12-04",
    service: "Candid Photography & Teaser Film",
    requestStatus: "COMPLETED",
    requestedAt: "2026-08-30T10:00:00Z",
    completedAt: "2026-09-02T16:40:00Z",
    notes: "Review submitted on Sept 2.",
  },
  {
    id: "req_2",
    clientReference: "CLI-2026-005",
    bookingId: "BK-2026-005",
    coupleName: "Priya & Dev",
    weddingDate: "2027-01-10",
    service: "Luxury Wedding Film & Fine Art Album",
    requestStatus: "COMPLETED",
    requestedAt: "2026-09-05T14:00:00Z",
    completedAt: "2026-09-10T11:00:00Z",
    notes: "Review submitted on Sept 10.",
  },
  {
    id: "req_3",
    clientReference: "CLI-2026-004",
    bookingId: "BK-2026-004",
    coupleName: "Ananya & Kabir",
    weddingDate: "2026-08-20",
    service: "Traditional Wedding Photography",
    requestStatus: "REQUESTED",
    requestedAt: "2026-09-15T09:30:00Z",
    notes: "Follow-up email sent after physical album delivery.",
  },
];
