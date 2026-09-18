import {
  VendorEnquiry,
  EnquiryStatus,
  EnquiryPriority,
  EnquirySource,
  EnquiryDateStatus,
  VendorEnquiriesSummary,
} from "@/data/vendorEnquiries";

export interface EnquiryFilterState {
  status: EnquiryStatus | "ALL";
  priority: EnquiryPriority | "ALL";
  service: string;
  destination: string;
  contactMethod: string;
  unread: "ALL" | "UNREAD" | "READ";
  searchQuery: string;
  sortBy: "NEWEST" | "OLDEST" | "WEDDING_DATE" | "RESPONSE_DUE" | "PRIORITY";
}

export type ResponseDueState = "OVERDUE" | "DUE_SOON" | "ON_TIME" | "NO_DEADLINE";

export function calculateEnquiriesSummary(
  enquiries: VendorEnquiry[]
): VendorEnquiriesSummary {
  return {
    total: enquiries.length,
    newCount: enquiries.filter((e) => e.status === "NEW").length,
    awaitingResponse: calculateAwaitingResponseCount(enquiries),
    negotiatingCount: enquiries.filter((e) => e.status === "NEGOTIATING").length,
    acceptedCount: enquiries.filter((e) => e.status === "ACCEPTED").length,
    declinedCount: enquiries.filter((e) => e.status === "DECLINED").length,
    unreadCount: calculateUnreadCount(enquiries),
  };
}

export function calculateAwaitingResponseCount(
  enquiries: VendorEnquiry[]
): number {
  return enquiries.filter(
    (e) => e.status === "NEW" || e.status === "REVIEWING"
  ).length;
}

export function calculateUnreadCount(enquiries: VendorEnquiry[]): number {
  return enquiries.filter((e) => e.unread).length;
}

export function calculateStatusCounts(
  enquiries: VendorEnquiry[]
): Record<EnquiryStatus, number> {
  const counts: Record<EnquiryStatus, number> = {
    NEW: 0,
    REVIEWING: 0,
    RESPONDED: 0,
    NEGOTIATING: 0,
    ACCEPTED: 0,
    DECLINED: 0,
    CLOSED: 0,
  };
  enquiries.forEach((e) => {
    counts[e.status] = (counts[e.status] || 0) + 1;
  });
  return counts;
}

export function calculatePriorityCounts(
  enquiries: VendorEnquiry[]
): Record<EnquiryPriority, number> {
  const counts: Record<EnquiryPriority, number> = {
    HIGH: 0,
    NORMAL: 0,
    LOW: 0,
  };
  enquiries.forEach((e) => {
    counts[e.priority] = (counts[e.priority] || 0) + 1;
  });
  return counts;
}

export function calculateResponseDueStatus(
  enquiry: VendorEnquiry
): { state: ResponseDueState; label: string; daysRemaining?: number } {
  if (!enquiry.responseDueAt || enquiry.status === "RESPONDED" || enquiry.status === "ACCEPTED" || enquiry.status === "DECLINED" || enquiry.status === "CLOSED") {
    return { state: "NO_DEADLINE", label: "No response due" };
  }

  const now = new Date("2026-09-18T12:00:00Z").getTime();
  const due = new Date(enquiry.responseDueAt).getTime();
  const diffHours = (due - now) / (1000 * 60 * 60);

  if (diffHours < 0) {
    const overdueHours = Math.abs(Math.floor(diffHours));
    return {
      state: "OVERDUE",
      label: overdueHours > 24 ? `Overdue by ${Math.floor(overdueHours / 24)}d` : `Overdue by ${overdueHours}h`,
    };
  } else if (diffHours <= 24) {
    return { state: "DUE_SOON", label: "Due today" };
  } else if (diffHours <= 48) {
    return { state: "DUE_SOON", label: "Due tomorrow" };
  } else {
    const days = Math.ceil(diffHours / 24);
    return { state: "ON_TIME", label: `Due in ${days} days`, daysRemaining: days };
  }
}

export function getEnquiriesNeedingAttention(
  enquiries: VendorEnquiry[]
): VendorEnquiry[] {
  return enquiries.filter((e) => {
    if (e.status === "CLOSED" || e.status === "DECLINED") return false;
    const dueInfo = calculateResponseDueStatus(e);
    return (
      e.status === "NEW" ||
      e.unread ||
      e.priority === "HIGH" ||
      dueInfo.state === "OVERDUE" ||
      dueInfo.state === "DUE_SOON" ||
      e.status === "NEGOTIATING"
    );
  });
}

export function getRecentEnquiries(
  enquiries: VendorEnquiry[],
  limit = 5
): VendorEnquiry[] {
  return [...enquiries]
    .sort(
      (a, b) =>
        new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime()
    )
    .slice(0, limit);
}

export function getUpcomingEnquiries(
  enquiries: VendorEnquiry[],
  limit = 5
): VendorEnquiry[] {
  return [...enquiries]
    .filter((e) => e.weddingDate && e.status !== "DECLINED" && e.status !== "CLOSED")
    .sort((a, b) => {
      const dateA = a.weddingDate ? new Date(a.weddingDate).getTime() : Infinity;
      const dateB = b.weddingDate ? new Date(b.weddingDate).getTime() : Infinity;
      return dateA - dateB;
    })
    .slice(0, limit);
}

export function searchVendorEnquiries(
  enquiries: VendorEnquiry[],
  query: string
): VendorEnquiry[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return enquiries;

  return enquiries.filter((e) => {
    const couple = e.coupleName.toLowerCase();
    const partner = (e.partnerName || "").toLowerCase();
    const dest = e.destination.toLowerCase();
    const service = e.serviceRequested.toLowerCase();
    const message = e.message.toLowerCase();
    const email = e.email.toLowerCase();

    return (
      couple.includes(trimmed) ||
      partner.includes(trimmed) ||
      dest.includes(trimmed) ||
      service.includes(trimmed) ||
      message.includes(trimmed) ||
      email.includes(trimmed)
    );
  });
}

export function filterVendorEnquiries(
  enquiries: VendorEnquiry[],
  filters: EnquiryFilterState
): VendorEnquiry[] {
  let result = searchVendorEnquiries(enquiries, filters.searchQuery);

  if (filters.status !== "ALL") {
    result = result.filter((e) => e.status === filters.status);
  }

  if (filters.priority !== "ALL") {
    result = result.filter((e) => e.priority === filters.priority);
  }

  if (filters.service !== "ALL") {
    result = result.filter((e) =>
      e.serviceRequested.toLowerCase().includes(filters.service.toLowerCase())
    );
  }

  if (filters.destination !== "ALL") {
    result = result.filter((e) =>
      e.destination.toLowerCase().includes(filters.destination.toLowerCase())
    );
  }

  if (filters.contactMethod !== "ALL") {
    result = result.filter((e) => e.preferredContactMethod === filters.contactMethod);
  }

  if (filters.unread === "UNREAD") {
    result = result.filter((e) => e.unread);
  } else if (filters.unread === "READ") {
    result = result.filter((e) => !e.unread);
  }

  return sortVendorEnquiries(result, filters.sortBy);
}

export function sortVendorEnquiries(
  enquiries: VendorEnquiry[],
  sortBy: EnquiryFilterState["sortBy"]
): VendorEnquiry[] {
  const priorityOrder: Record<EnquiryPriority, number> = {
    HIGH: 3,
    NORMAL: 2,
    LOW: 1,
  };

  return [...enquiries].sort((a, b) => {
    switch (sortBy) {
      case "NEWEST":
        return new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime();
      case "OLDEST":
        return new Date(a.receivedAt).getTime() - new Date(b.receivedAt).getTime();
      case "WEDDING_DATE": {
        const dA = a.weddingDate ? new Date(a.weddingDate).getTime() : Infinity;
        const dB = b.weddingDate ? new Date(b.weddingDate).getTime() : Infinity;
        return dA - dB;
      }
      case "RESPONSE_DUE": {
        const rA = a.responseDueAt ? new Date(a.responseDueAt).getTime() : Infinity;
        const rB = b.responseDueAt ? new Date(b.responseDueAt).getTime() : Infinity;
        return rA - rB;
      }
      case "PRIORITY":
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      default:
        return 0;
    }
  });
}

export function formatEnquiryStatus(status: EnquiryStatus): string {
  switch (status) {
    case "NEW":
      return "New Enquiry";
    case "REVIEWING":
      return "In Review";
    case "RESPONDED":
      return "Responded";
    case "NEGOTIATING":
      return "Negotiating";
    case "ACCEPTED":
      return "Accepted";
    case "DECLINED":
      return "Declined";
    case "CLOSED":
      return "Closed";
  }
}

export function formatEnquiryPriority(priority: EnquiryPriority): string {
  switch (priority) {
    case "HIGH":
      return "High Priority";
    case "NORMAL":
      return "Normal Priority";
    case "LOW":
      return "Low Priority";
  }
}

export function formatEnquirySource(source: EnquirySource): string {
  switch (source) {
    case "WEDORA":
      return "Wedora Network";
    case "PUBLIC_PROFILE":
      return "Public Profile";
    case "DIRECT":
      return "Direct Enquiry";
  }
}

export function formatDateStatus(status: EnquiryDateStatus): string {
  switch (status) {
    case "CONFIRMED":
      return "Confirmed Date";
    case "FLEXIBLE":
      return "Flexible Dates";
    case "NOT_DECIDED":
      return "Date TBD";
  }
}

export function validateEnquiryResponse(message: string): { valid: boolean; error?: string } {
  const trimmed = message.trim();
  if (!trimmed) {
    return { valid: false, error: "Response message cannot be empty." };
  }
  if (trimmed.length < 10) {
    return { valid: false, error: "Response message must be at least 10 characters long." };
  }
  if (trimmed.length > 3000) {
    return { valid: false, error: "Response message must not exceed 3000 characters." };
  }
  return { valid: true };
}

export function validateEnquiryNotes(notes: string): { valid: boolean; error?: string } {
  const trimmed = notes.trim();
  if (trimmed.length > 1000) {
    return { valid: false, error: "Notes must not exceed 1000 characters." };
  }
  return { valid: true };
}

export function canTransitionStatus(
  current: EnquiryStatus,
  target: EnquiryStatus
): boolean {
  if (current === target) return true;

  const allowedTransitions: Record<EnquiryStatus, EnquiryStatus[]> = {
    NEW: ["REVIEWING", "RESPONDED", "DECLINED"],
    REVIEWING: ["RESPONDED", "DECLINED"],
    RESPONDED: ["NEGOTIATING", "ACCEPTED", "DECLINED", "CLOSED"],
    NEGOTIATING: ["ACCEPTED", "DECLINED", "CLOSED"],
    ACCEPTED: ["CLOSED"],
    DECLINED: ["CLOSED"],
    CLOSED: ["NEW", "REVIEWING"], // intentional reopening
  };

  return allowedTransitions[current]?.includes(target) ?? false;
}
