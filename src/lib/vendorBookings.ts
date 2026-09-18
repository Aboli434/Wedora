import {
  VendorBooking,
  BookingStatus,
  BookingPaymentStatus,
  VendorBookingsSummary,
  BookingEvent,
} from "@/data/vendorBookings";

export interface BookingFilterState {
  status: BookingStatus | "ALL";
  paymentStatus: BookingPaymentStatus | "ALL";
  service: string;
  destination: string;
  source: string;
  timeframe: "ALL" | "UPCOMING" | "PAST";
  searchQuery: string;
  sortBy:
    | "WEDDING_DATE_SOONEST"
    | "WEDDING_DATE_LATEST"
    | "RECENTLY_UPDATED"
    | "RECENTLY_CREATED"
    | "VALUE_HIGH"
    | "OUTSTANDING_HIGH"
    | "PAYMENT_DUE_SOONEST";
}

export type PaymentDueState =
  | "OVERDUE"
  | "DUE_SOON"
  | "UPCOMING"
  | "PAID"
  | "NO_PAYMENT_DUE";

export function formatIndianCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateAmountOutstanding(booking: VendorBooking): number {
  if (booking.bookingStatus === "CANCELLED") return 0;
  return Math.max(0, booking.totalAmount - booking.amountReceived);
}

export function calculatePaymentProgress(booking: VendorBooking): number {
  if (booking.totalAmount <= 0) return 100;
  if (booking.bookingStatus === "CANCELLED") return 0;
  const pct = Math.round((booking.amountReceived / booking.totalAmount) * 100);
  return Math.min(100, Math.max(0, pct));
}

export function calculateBookingProgress(booking: VendorBooking): number {
  if (booking.bookingStatus === "COMPLETED") return 100;
  if (booking.bookingStatus === "CANCELLED") return 0;

  let progress = 10; // base registered progress

  if (booking.bookingStatus === "CONFIRMED") progress += 20;
  if (booking.bookingStatus === "IN_PROGRESS") progress += 40;

  // Payment weight (up to 30%)
  const payProgress = calculatePaymentProgress(booking);
  progress += Math.round(payProgress * 0.3);

  // Events readiness weight (up to 20%)
  if (booking.events && booking.events.length > 0) {
    const readyOrDone = booking.events.filter(
      (e) => e.status === "READY" || e.status === "COMPLETED"
    ).length;
    const eventPct = readyOrDone / booking.events.length;
    progress += Math.round(eventPct * 20);
  }

  return Math.min(99, Math.max(10, progress));
}

export function getPaymentDueStatus(
  booking: VendorBooking
): { state: PaymentDueState; label: string } {
  if (booking.bookingStatus === "CANCELLED" || booking.paymentStatus === "PAID" || booking.amountOutstanding <= 0) {
    return { state: "PAID", label: "Paid in Full" };
  }

  if (!booking.nextPaymentDue) {
    return { state: "NO_PAYMENT_DUE", label: "No scheduled payment due" };
  }

  // Fixed reference date: 2026-09-18
  const now = new Date("2026-09-18T12:00:00Z").getTime();
  const due = new Date(booking.nextPaymentDue).getTime();
  const diffDays = Math.ceil((due - now) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    const overdueDays = Math.abs(diffDays);
    return {
      state: "OVERDUE",
      label: `Overdue by ${overdueDays} day${overdueDays > 1 ? "s" : ""}`,
    };
  } else if (diffDays <= 7) {
    return {
      state: "DUE_SOON",
      label: diffDays === 0 ? "Due today" : `Due in ${diffDays} days`,
    };
  } else {
    return {
      state: "UPCOMING",
      label: `Due ${new Date(booking.nextPaymentDue).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      })}`,
    };
  }
}

export function calculateBookingsSummary(
  bookings: VendorBooking[]
): VendorBookingsSummary {
  const activeBookings = bookings.filter((b) => b.bookingStatus !== "CANCELLED");

  let overdueSum = 0;
  activeBookings.forEach((b) => {
    const dueInfo = getPaymentDueStatus(b);
    if (dueInfo.state === "OVERDUE") {
      overdueSum += b.nextPaymentAmount || b.amountOutstanding;
    }
  });

  return {
    totalBookings: bookings.length,
    confirmedBookings: bookings.filter((b) => b.bookingStatus === "CONFIRMED").length,
    upcomingBookings: bookings.filter(
      (b) =>
        b.bookingStatus !== "COMPLETED" &&
        b.bookingStatus !== "CANCELLED" &&
        new Date(b.weddingDate).getTime() >= new Date("2026-09-18").getTime()
    ).length,
    completedBookings: bookings.filter((b) => b.bookingStatus === "COMPLETED").length,
    cancelledBookings: bookings.filter((b) => b.bookingStatus === "CANCELLED").length,
    totalBookedValue: activeBookings.reduce((sum, b) => sum + b.totalAmount, 0),
    totalReceived: activeBookings.reduce((sum, b) => sum + b.amountReceived, 0),
    totalOutstanding: activeBookings.reduce(
      (sum, b) => sum + calculateAmountOutstanding(b),
      0
    ),
    overdueAmount: overdueSum,
  };
}

export function calculateBookingStatusCounts(
  bookings: VendorBooking[]
): Record<BookingStatus, number> {
  const counts: Record<BookingStatus, number> = {
    INQUIRY: 0,
    CONFIRMED: 0,
    IN_PROGRESS: 0,
    COMPLETED: 0,
    CANCELLED: 0,
  };
  bookings.forEach((b) => {
    counts[b.bookingStatus] = (counts[b.bookingStatus] || 0) + 1;
  });
  return counts;
}

export function calculateBookingPaymentStatusCounts(
  bookings: VendorBooking[]
): Record<BookingPaymentStatus, number> {
  const counts: Record<BookingPaymentStatus, number> = {
    NOT_STARTED: 0,
    PARTIALLY_PAID: 0,
    PAID: 0,
    OVERDUE: 0,
  };
  bookings.forEach((b) => {
    counts[b.paymentStatus] = (counts[b.paymentStatus] || 0) + 1;
  });
  return counts;
}

export function calculateUpcomingBookings(
  bookings: VendorBooking[],
  limit = 5
): VendorBooking[] {
  return [...bookings]
    .filter(
      (b) => b.bookingStatus !== "COMPLETED" && b.bookingStatus !== "CANCELLED"
    )
    .sort((a, b) => new Date(a.weddingDate).getTime() - new Date(b.weddingDate).getTime())
    .slice(0, limit);
}

export function calculateBookingsNeedingAttention(
  bookings: VendorBooking[]
): VendorBooking[] {
  return bookings.filter((b) => {
    if (b.bookingStatus === "CANCELLED" || b.bookingStatus === "COMPLETED") return false;

    const dueInfo = getPaymentDueStatus(b);
    const hasOverdue = dueInfo.state === "OVERDUE" || b.paymentStatus === "OVERDUE";
    const hasDueSoon = dueInfo.state === "DUE_SOON";
    const isFlexibleDate = b.weddingDateStatus === "FLEXIBLE";
    const missingVenue = !b.venue || b.venue.trim() === "";
    const isInquiry = b.bookingStatus === "INQUIRY";

    return hasOverdue || hasDueSoon || isFlexibleDate || missingVenue || isInquiry;
  });
}

export function searchVendorBookings(
  bookings: VendorBooking[],
  query: string
): VendorBooking[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return bookings;

  return bookings.filter((b) => {
    const couple = b.coupleName.toLowerCase();
    const partner = (b.partnerName || "").toLowerCase();
    const ref = b.bookingReference.toLowerCase();
    const dest = b.destination.toLowerCase();
    const venue = (b.venue || "").toLowerCase();
    const service = b.serviceName.toLowerCase();
    const pkg = b.packageName.toLowerCase();
    const email = b.email.toLowerCase();

    return (
      couple.includes(trimmed) ||
      partner.includes(trimmed) ||
      ref.includes(trimmed) ||
      dest.includes(trimmed) ||
      venue.includes(trimmed) ||
      service.includes(trimmed) ||
      pkg.includes(trimmed) ||
      email.includes(trimmed)
    );
  });
}

export function filterVendorBookings(
  bookings: VendorBooking[],
  filters: BookingFilterState
): VendorBooking[] {
  let result = searchVendorBookings(bookings, filters.searchQuery);

  if (filters.status !== "ALL") {
    result = result.filter((b) => b.bookingStatus === filters.status);
  }

  if (filters.paymentStatus !== "ALL") {
    result = result.filter((b) => b.paymentStatus === filters.paymentStatus);
  }

  if (filters.service !== "ALL") {
    result = result.filter((b) =>
      b.serviceName.toLowerCase().includes(filters.service.toLowerCase())
    );
  }

  if (filters.destination !== "ALL") {
    result = result.filter((b) =>
      b.destination.toLowerCase().includes(filters.destination.toLowerCase())
    );
  }

  if (filters.source !== "ALL") {
    result = result.filter((b) => b.source === filters.source);
  }

  if (filters.timeframe === "UPCOMING") {
    result = result.filter(
      (b) =>
        b.bookingStatus !== "COMPLETED" &&
        b.bookingStatus !== "CANCELLED" &&
        new Date(b.weddingDate).getTime() >= new Date("2026-09-18").getTime()
    );
  } else if (filters.timeframe === "PAST") {
    result = result.filter(
      (b) =>
        b.bookingStatus === "COMPLETED" ||
        new Date(b.weddingDate).getTime() < new Date("2026-09-18").getTime()
    );
  }

  return sortVendorBookings(result, filters.sortBy);
}

export function sortVendorBookings(
  bookings: VendorBooking[],
  sortBy: BookingFilterState["sortBy"]
): VendorBooking[] {
  return [...bookings].sort((a, b) => {
    switch (sortBy) {
      case "WEDDING_DATE_SOONEST":
        return new Date(a.weddingDate).getTime() - new Date(b.weddingDate).getTime();
      case "WEDDING_DATE_LATEST":
        return new Date(b.weddingDate).getTime() - new Date(a.weddingDate).getTime();
      case "RECENTLY_UPDATED":
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      case "RECENTLY_CREATED":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "VALUE_HIGH":
        return b.totalAmount - a.totalAmount;
      case "OUTSTANDING_HIGH":
        return calculateAmountOutstanding(b) - calculateAmountOutstanding(a);
      case "PAYMENT_DUE_SOONEST": {
        const dueA = a.nextPaymentDue ? new Date(a.nextPaymentDue).getTime() : Infinity;
        const dueB = b.nextPaymentDue ? new Date(b.nextPaymentDue).getTime() : Infinity;
        return dueA - dueB;
      }
      default:
        return 0;
    }
  });
}

export function formatBookingStatus(status: BookingStatus): string {
  switch (status) {
    case "INQUIRY":
      return "Hold / Inquiry";
    case "CONFIRMED":
      return "Confirmed Booking";
    case "IN_PROGRESS":
      return "In Progress";
    case "COMPLETED":
      return "Completed";
    case "CANCELLED":
      return "Cancelled";
  }
}

export function formatPaymentStatus(status: BookingPaymentStatus): string {
  switch (status) {
    case "NOT_STARTED":
      return "Unpaid / Pending Deposit";
    case "PARTIALLY_PAID":
      return "Partially Paid";
    case "PAID":
      return "Paid in Full";
    case "OVERDUE":
      return "Overdue Payment";
  }
}

export function canTransitionBookingStatus(
  current: BookingStatus,
  target: BookingStatus
): boolean {
  if (current === target) return true;

  const allowed: Record<BookingStatus, BookingStatus[]> = {
    INQUIRY: ["CONFIRMED", "CANCELLED"],
    CONFIRMED: ["IN_PROGRESS", "COMPLETED", "CANCELLED"],
    IN_PROGRESS: ["COMPLETED", "CANCELLED"],
    COMPLETED: ["CONFIRMED"], // Reopen if needed
    CANCELLED: ["INQUIRY", "CONFIRMED"],
  };

  return allowed[current]?.includes(target) ?? false;
}

export function validateBookingNotes(notes: string): { valid: boolean; error?: string } {
  if (notes.length > 1500) {
    return { valid: false, error: "Notes cannot exceed 1500 characters." };
  }
  return { valid: true };
}

export function validatePaymentAmount(
  amount: number,
  outstanding: number
): { valid: boolean; error?: string } {
  if (amount <= 0) {
    return { valid: false, error: "Payment amount must be greater than ₹0." };
  }
  if (amount > outstanding) {
    return {
      valid: false,
      error: `Payment amount cannot exceed outstanding balance of ${formatIndianCurrency(
        outstanding
      )}.`,
    };
  }
  return { valid: true };
}

export function validateEventDetails(
  event: Partial<BookingEvent>
): { valid: boolean; error?: string } {
  if (!event.name || event.name.trim().length === 0) {
    return { valid: false, error: "Event name is required." };
  }
  if (!event.date || event.date.trim().length === 0) {
    return { valid: false, error: "Event date is required." };
  }
  return { valid: true };
}
