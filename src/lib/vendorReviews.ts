import {
  VendorReview,
  ReviewRequest,
  VendorReviewsSummary,
  ReviewStatus,
  ReviewResponseStatus,
  ReviewSource,
  ReviewRating,
  ReviewActionItem,
  RequestStatus,
} from "@/data/vendorReviews";

export interface ReviewFilterState {
  status: ReviewStatus | "ALL";
  rating: ReviewRating | "ALL";
  responseStatus: ReviewResponseStatus | "ALL";
  service: string;
  destination: string;
  source: ReviewSource | "ALL";
  searchQuery: string;
  sortBy: ReviewSortOption;
}

export type ReviewSortOption =
  | "newest"
  | "oldest"
  | "highest_rating"
  | "lowest_rating"
  | "awaiting_response"
  | "most_helpful";

export interface ReviewRequestFilterState {
  status: RequestStatus | "ALL";
  searchQuery: string;
  sortBy: "newest" | "oldest" | "couple_name";
}

/**
 * Formatters
 */
export function formatReviewStatus(status: ReviewStatus): string {
  switch (status) {
    case "PUBLISHED":
      return "Published Review";
    case "PENDING":
      return "Pending Verification";
    case "HIDDEN":
      return "Hidden from Profile";
    case "FLAGGED":
      return "Flagged under Review";
    default:
      return status;
  }
}

export function formatResponseStatus(status: ReviewResponseStatus): string {
  switch (status) {
    case "RESPONDED":
      return "Responded";
    case "NOT_RESPONDED":
      return "Awaiting Response";
    default:
      return status;
  }
}

export function formatReviewSource(source: ReviewSource): string {
  switch (source) {
    case "WEDORA":
      return "Wedora Marketplace";
    case "DIRECT":
      return "Direct Feedback";
    case "BOOKING_FOLLOW_UP":
      return "Post-Event Request";
    default:
      return source;
  }
}

/**
 * Deterministic Financial / Review Calculations
 */
export function calculateAverageRating(reviews: VendorReview[]): number {
  const published = reviews.filter((r) => r.status === "PUBLISHED");
  if (published.length === 0) return 0;
  const sum = published.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / published.length) * 10) / 10;
}

export function calculateRatingDistribution(reviews: VendorReview[]) {
  const published = reviews.filter((r) => r.status === "PUBLISHED");
  return {
    fiveStar: published.filter((r) => r.rating === 5).length,
    fourStar: published.filter((r) => r.rating === 4).length,
    threeStar: published.filter((r) => r.rating === 3).length,
    twoStar: published.filter((r) => r.rating === 2).length,
    oneStar: published.filter((r) => r.rating === 1).length,
  };
}

export function calculateResponseRate(reviews: VendorReview[]): number {
  const published = reviews.filter((r) => r.status === "PUBLISHED");
  if (published.length === 0) return 0;
  const responded = published.filter((r) => r.responseStatus === "RESPONDED").length;
  return Math.round((responded / published.length) * 100);
}

export function calculateHelpfulVotes(reviews: VendorReview[]): number {
  return reviews.reduce((acc, r) => acc + r.helpfulCount, 0);
}

export function calculateReviewsSummary(
  reviews: VendorReview[],
  requests: ReviewRequest[]
): VendorReviewsSummary {
  const published = reviews.filter((r) => r.status === "PUBLISHED");
  const dist = calculateRatingDistribution(reviews);
  const avg = calculateAverageRating(reviews);
  const totalHelpful = calculateHelpfulVotes(reviews);

  const awaitingCount = published.filter((r) => r.responseStatus === "NOT_RESPONDED").length;
  const respondedCount = published.filter((r) => r.responseStatus === "RESPONDED").length;

  const reqCompleted = requests.filter((r) => r.requestStatus === "COMPLETED").length;

  return {
    totalReviews: reviews.length,
    publishedReviews: published.length,
    pendingReviews: reviews.filter((r) => r.status === "PENDING").length,
    respondedReviews: respondedCount,
    awaitingResponse: awaitingCount,
    averageRating: avg,
    fiveStarCount: dist.fiveStar,
    fourStarCount: dist.fourStar,
    threeStarCount: dist.threeStar,
    twoStarCount: dist.twoStar,
    oneStarCount: dist.oneStar,
    totalHelpfulVotes: totalHelpful,
    reviewRequestsSent: requests.length,
    reviewRequestsCompleted: reqCompleted,
  };
}

export function getReviewsNeedingAttention(
  reviews: VendorReview[],
  requests: ReviewRequest[]
): ReviewActionItem[] {
  const items: ReviewActionItem[] = [];

  // Awaiting Response
  reviews.forEach((r) => {
    if (r.status === "PUBLISHED" && r.responseStatus === "NOT_RESPONDED") {
      items.push({
        id: `att_resp_${r.id}`,
        type: "AWAITING_RESPONSE",
        title: `Review Awaiting Response: ${r.coupleName}`,
        description: `Rated ${r.rating}★ for ${r.service}. "${r.title}"`,
        reviewId: r.id,
        rating: r.rating,
        priority: r.rating <= 3 ? "HIGH" : "NORMAL",
      });
    }
  });

  // Flagged or Hidden
  reviews.forEach((r) => {
    if (r.status === "FLAGGED") {
      items.push({
        id: `att_flag_${r.id}`,
        type: "FLAGGED_REVIEW",
        title: `Flagged Review: ${r.coupleName}`,
        description: `Review "${r.title}" is currently flagged for studio review.`,
        reviewId: r.id,
        rating: r.rating,
        priority: "HIGH",
      });
    } else if (r.status === "HIDDEN") {
      items.push({
        id: `att_hide_${r.id}`,
        type: "HIDDEN_REVIEW",
        title: `Hidden Review: ${r.coupleName}`,
        description: `Review is hidden from public profile display.`,
        reviewId: r.id,
        rating: r.rating,
        priority: "LOW",
      });
    }
  });

  // Pending requests
  requests.forEach((req) => {
    if (req.requestStatus === "REQUESTED") {
      items.push({
        id: `att_req_${req.id}`,
        type: "REQUEST_PENDING",
        title: `Review Request Pending: ${req.coupleName}`,
        description: `Review request sent on ${req.requestedAt?.split("T")[0] || "recent date"}.`,
        requestId: req.id,
        priority: "LOW",
      });
    }
  });

  return items;
}

export function getRecentReviews(reviews: VendorReview[], limit = 4): VendorReview[] {
  return [...reviews]
    .filter((r) => r.status === "PUBLISHED")
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

export function searchVendorReviews(
  reviews: VendorReview[],
  query: string
): VendorReview[] {
  const q = query.trim().toLowerCase();
  if (!q) return reviews;

  return reviews.filter((r) => {
    return (
      r.coupleName.toLowerCase().includes(q) ||
      r.reviewerName.toLowerCase().includes(q) ||
      r.reviewReference.toLowerCase().includes(q) ||
      r.clientReference.toLowerCase().includes(q) ||
      r.service.toLowerCase().includes(q) ||
      r.destination.toLowerCase().includes(q) ||
      r.title.toLowerCase().includes(q) ||
      r.review.toLowerCase().includes(q) ||
      (r.response || "").toLowerCase().includes(q)
    );
  });
}

export function filterVendorReviews(
  reviews: VendorReview[],
  filters: ReviewFilterState
): VendorReview[] {
  let result = searchVendorReviews(reviews, filters.searchQuery);

  if (filters.status !== "ALL") {
    result = result.filter((r) => r.status === filters.status);
  }

  if (filters.rating !== "ALL") {
    result = result.filter((r) => r.rating === filters.rating);
  }

  if (filters.responseStatus !== "ALL") {
    result = result.filter((r) => r.responseStatus === filters.responseStatus);
  }

  if (filters.service !== "ALL") {
    result = result.filter((r) =>
      r.service.toLowerCase().includes(filters.service.toLowerCase())
    );
  }

  if (filters.destination !== "ALL") {
    result = result.filter(
      (r) => r.destination.toLowerCase() === filters.destination.toLowerCase()
    );
  }

  if (filters.source !== "ALL") {
    result = result.filter((r) => r.source === filters.source);
  }

  return sortVendorReviews(result, filters.sortBy);
}

export function sortVendorReviews(
  reviews: VendorReview[],
  sortBy: ReviewSortOption
): VendorReview[] {
  const copy = [...reviews];

  switch (sortBy) {
    case "newest":
      return copy.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    case "oldest":
      return copy.sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    case "highest_rating":
      return copy.sort((a, b) => b.rating - a.rating);
    case "lowest_rating":
      return copy.sort((a, b) => a.rating - b.rating);
    case "awaiting_response":
      return copy.sort((a, b) => {
        if (a.responseStatus === "NOT_RESPONDED" && b.responseStatus !== "NOT_RESPONDED") return -1;
        if (a.responseStatus !== "NOT_RESPONDED" && b.responseStatus === "NOT_RESPONDED") return 1;
        return 0;
      });
    case "most_helpful":
      return copy.sort((a, b) => b.helpfulCount - a.helpfulCount);
    default:
      return copy;
  }
}

/**
 * Review Request Filters
 */
export function filterReviewRequests(
  requests: ReviewRequest[],
  filters: ReviewRequestFilterState
): ReviewRequest[] {
  const q = filters.searchQuery.trim().toLowerCase();

  const result = requests.filter((req) => {
    if (q) {
      const match =
        req.coupleName.toLowerCase().includes(q) ||
        req.clientReference.toLowerCase().includes(q) ||
        req.bookingId.toLowerCase().includes(q) ||
        req.service.toLowerCase().includes(q);
      if (!match) return false;
    }

    if (filters.status !== "ALL" && req.requestStatus !== filters.status) return false;
    return true;
  });

  return sortReviewRequests(result, filters.sortBy);
}

export function sortReviewRequests(
  requests: ReviewRequest[],
  sortBy: ReviewRequestFilterState["sortBy"]
): ReviewRequest[] {
  const copy = [...requests];

  switch (sortBy) {
    case "newest":
      return copy.sort((a, b) => {
        const dateA = a.requestedAt || "2026-01-01";
        const dateB = b.requestedAt || "2026-01-01";
        return new Date(dateB).getTime() - new Date(dateA).getTime();
      });
    case "oldest":
      return copy.sort((a, b) => {
        const dateA = a.requestedAt || "2026-01-01";
        const dateB = b.requestedAt || "2026-01-01";
        return new Date(dateA).getTime() - new Date(dateB).getTime();
      });
    case "couple_name":
      return copy.sort((a, b) => a.coupleName.localeCompare(b.coupleName));
    default:
      return copy;
  }
}

export function canTransitionReviewStatus(
  current: ReviewStatus,
  target: ReviewStatus
): boolean {
  if (current === target) return false;
  if (current === "FLAGGED" && target === "PENDING") return false;
  return true;
}

export function calculateReviewCompletion(review: VendorReview): number {
  let score = 50;
  if (review.responseStatus === "RESPONDED") score += 30;
  if (review.privateNote) score += 20;
  return score;
}
