import {
  VendorCalendarEvent,
  VendorAvailabilityBlock,
  VendorCalendarSummary,
  CalendarEventType,
  CalendarEventStatus,
  CalendarPriority,
} from "@/data/vendorCalendar";

export interface CalendarFilterState {
  type: CalendarEventType | "ALL";
  priority: CalendarPriority | "ALL";
  status: CalendarEventStatus | "ALL";
  bookingId: string;
  searchQuery: string;
  sortBy: "DATE_ASC" | "DATE_DESC" | "PRIORITY" | "RECENTLY_UPDATED" | "TYPE";
}

export interface CalendarConflict {
  id: string;
  type: "BLOCKED_OVERLAP" | "SAME_TIME_EVENT";
  title: string;
  description: string;
  severity: "HIGH" | "NORMAL";
  eventIds: string[];
}

export const FIXED_TODAY_DATE = "2026-09-18";

export function formatCalendarDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatCalendarTime(timeStr?: string): string {
  if (!timeStr) return "All day";
  return timeStr;
}

export function calculateEventDuration(event: VendorCalendarEvent): string {
  if (event.allDay || !event.startTime || !event.endTime) return "All day";
  return `${event.startTime} - ${event.endTime}`;
}

export function isDateBlocked(
  blocks: VendorAvailabilityBlock[],
  dateStr: string
): boolean {
  const target = new Date(dateStr).getTime();
  return blocks.some((b) => {
    const start = new Date(b.startDate).getTime();
    const end = new Date(b.endDate).getTime();
    return target >= start && target <= end;
  });
}

export function getAvailabilityForDate(
  blocks: VendorAvailabilityBlock[],
  dateStr: string
): VendorAvailabilityBlock | undefined {
  const target = new Date(dateStr).getTime();
  return blocks.find((b) => {
    const start = new Date(b.startDate).getTime();
    const end = new Date(b.endDate).getTime();
    return target >= start && target <= end;
  });
}

export function getEventsForDate(
  events: VendorCalendarEvent[],
  dateStr: string
): VendorCalendarEvent[] {
  return events.filter((e) => {
    if (e.startDate === dateStr) return true;
    if (e.endDate) {
      const start = new Date(e.startDate).getTime();
      const end = new Date(e.endDate).getTime();
      const target = new Date(dateStr).getTime();
      return target >= start && target <= end;
    }
    return false;
  });
}

export function getEventsForMonth(
  events: VendorCalendarEvent[],
  year: number,
  month: number // 0-indexed (0 = Jan)
): VendorCalendarEvent[] {
  return events.filter((e) => {
    const d = new Date(e.startDate);
    return d.getFullYear() === year && d.getMonth() === month;
  });
}

export function getEventsForWeek(
  events: VendorCalendarEvent[],
  startDateStr: string
): VendorCalendarEvent[] {
  const start = new Date(startDateStr).getTime();
  const end = start + 7 * 24 * 60 * 60 * 1000;
  return events.filter((e) => {
    const d = new Date(e.startDate).getTime();
    return d >= start && d < end;
  });
}

export function getTodayCalendarEvents(
  events: VendorCalendarEvent[]
): VendorCalendarEvent[] {
  return getEventsForDate(events, FIXED_TODAY_DATE);
}

export function getUpcomingCalendarEvents(
  events: VendorCalendarEvent[],
  limit = 5
): VendorCalendarEvent[] {
  const todayTime = new Date(FIXED_TODAY_DATE).getTime();
  return [...events]
    .filter(
      (e) =>
        e.status !== "CANCELLED" &&
        new Date(e.startDate).getTime() >= todayTime
    )
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, limit);
}

export function calculateCalendarSummary(
  events: VendorCalendarEvent[],
  blocks: VendorAvailabilityBlock[]
): VendorCalendarSummary {
  const todayTime = new Date(FIXED_TODAY_DATE).getTime();
  const activeEvents = events.filter((e) => e.status !== "CANCELLED");

  let totalBlockedDays = 0;
  blocks.forEach((b) => {
    const start = new Date(b.startDate).getTime();
    const end = new Date(b.endDate).getTime();
    const days = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1);
    totalBlockedDays += days;
  });

  return {
    totalEvents: events.length,
    upcomingEvents: activeEvents.filter(
      (e) => new Date(e.startDate).getTime() >= todayTime
    ).length,
    todayEvents: getTodayCalendarEvents(events).length,
    bookingEvents: events.filter((e) => e.type === "BOOKING").length,
    weddingEvents: events.filter((e) => e.type === "WEDDING_EVENT").length,
    preparationEvents: events.filter((e) => e.type === "PREPARATION").length,
    paymentDueEvents: events.filter((e) => e.type === "PAYMENT_DUE").length,
    blockedDates: totalBlockedDays,
  };
}

export function getCalendarEventsNeedingAttention(
  events: VendorCalendarEvent[],
  blocks: VendorAvailabilityBlock[]
): VendorCalendarEvent[] {
  const todayTime = new Date(FIXED_TODAY_DATE).getTime();

  return events.filter((e) => {
    if (e.status === "CANCELLED" || e.status === "COMPLETED") return false;

    const isHighPriority = e.priority === "HIGH";
    const isPaymentDue = e.type === "PAYMENT_DUE";
    const isConflict = isDateBlocked(blocks, e.startDate);
    const isSoon =
      new Date(e.startDate).getTime() >= todayTime &&
      new Date(e.startDate).getTime() <= todayTime + 14 * 24 * 60 * 60 * 1000;

    return isHighPriority || isPaymentDue || isConflict || (isSoon && e.type === "PREPARATION");
  });
}

export function calculateCalendarConflicts(
  events: VendorCalendarEvent[],
  blocks: VendorAvailabilityBlock[]
): CalendarConflict[] {
  const conflicts: CalendarConflict[] = [];

  // Check 1: Events overlapping blocked dates
  events.forEach((evt) => {
    if (evt.status === "CANCELLED") return;
    const block = getAvailabilityForDate(blocks, evt.startDate);
    if (block) {
      conflicts.push({
        id: `cnf-blk-${evt.id}`,
        type: "BLOCKED_OVERLAP",
        title: `Conflict: ${evt.title} on Blocked Period`,
        description: `Event coincides with blocked availability range "${block.title}" (${block.reason}).`,
        severity: evt.priority === "HIGH" ? "HIGH" : "NORMAL",
        eventIds: [evt.id],
      });
    }
  });

  // Check 2: Multiple wedding events on same day
  const dateMap: Record<string, VendorCalendarEvent[]> = {};
  events.forEach((evt) => {
    if (evt.status === "CANCELLED" || evt.type !== "WEDDING_EVENT") return;
    dateMap[evt.startDate] = dateMap[evt.startDate] || [];
    dateMap[evt.startDate].push(evt);
  });

  Object.entries(dateMap).forEach(([dateStr, evtList]) => {
    if (evtList.length > 1) {
      conflicts.push({
        id: `cnf-[#C5A880]-${dateStr}`,
        type: "SAME_TIME_EVENT",
        title: `Multiple Ceremony Events on ${formatCalendarDate(dateStr)}`,
        description: `${evtList.length} wedding events scheduled on the same day (${evtList
          .map((e) => e.coupleName || e.title)
          .join(", ")}). Ensure crew deployment logistics are aligned.`,
        severity: "HIGH",
        eventIds: evtList.map((e) => e.id),
      });
    }
  });

  return conflicts;
}

export function searchCalendarEvents(
  events: VendorCalendarEvent[],
  query: string
): VendorCalendarEvent[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return events;

  return events.filter((e) => {
    const title = e.title.toLowerCase();
    const desc = (e.description || "").toLowerCase();
    const couple = (e.coupleName || "").toLowerCase();
    const ref = (e.bookingReference || "").toLowerCase();
    const venue = (e.venue || "").toLowerCase();
    const loc = (e.location || "").toLowerCase();
    const notes = (e.notes || "").toLowerCase();

    return (
      title.includes(trimmed) ||
      desc.includes(trimmed) ||
      couple.includes(trimmed) ||
      ref.includes(trimmed) ||
      venue.includes(trimmed) ||
      loc.includes(trimmed) ||
      notes.includes(trimmed)
    );
  });
}

export function filterCalendarEvents(
  events: VendorCalendarEvent[],
  filters: CalendarFilterState
): VendorCalendarEvent[] {
  let result = searchCalendarEvents(events, filters.searchQuery);

  if (filters.type !== "ALL") {
    result = result.filter((e) => e.type === filters.type);
  }

  if (filters.priority !== "ALL") {
    result = result.filter((e) => e.priority === filters.priority);
  }

  if (filters.status !== "ALL") {
    result = result.filter((e) => e.status === filters.status);
  }

  if (filters.bookingId !== "ALL") {
    result = result.filter((e) => e.bookingId === filters.bookingId);
  }

  return sortCalendarEvents(result, filters.sortBy);
}

export function sortCalendarEvents(
  events: VendorCalendarEvent[],
  sortBy: CalendarFilterState["sortBy"]
): VendorCalendarEvent[] {
  const priorityOrder: Record<CalendarPriority, number> = {
    HIGH: 3,
    NORMAL: 2,
    LOW: 1,
  };

  return [...events].sort((a, b) => {
    switch (sortBy) {
      case "DATE_ASC":
        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
      case "DATE_DESC":
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
      case "PRIORITY":
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      case "RECENTLY_UPDATED":
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      case "TYPE":
        return a.type.localeCompare(b.type);
      default:
        return 0;
    }
  });
}

export function groupEventsByDate(
  events: VendorCalendarEvent[]
): Record<string, VendorCalendarEvent[]> {
  const groups: Record<string, VendorCalendarEvent[]> = {};
  events.forEach((e) => {
    groups[e.startDate] = groups[e.startDate] || [];
    groups[e.startDate].push(e);
  });
  return groups;
}

export function formatCalendarEventType(type: CalendarEventType): string {
  switch (type) {
    case "BOOKING":
      return "Booking Contract Hold";
    case "WEDDING_EVENT":
      return "Wedding Event";
    case "PAYMENT_DUE":
      return "Payment Milestone";
    case "PREPARATION":
      return "Preparation / Logistics";
    case "REMINDER":
      return "Reminder";
    case "BLOCKED":
      return "Blocked Dates";
  }
}

export function formatCalendarEventStatus(status: CalendarEventStatus): string {
  switch (status) {
    case "SCHEDULED":
      return "Scheduled";
    case "COMPLETED":
      return "Completed";
    case "CANCELLED":
      return "Cancelled";
  }
}

export function formatCalendarPriority(priority: CalendarPriority): string {
  switch (priority) {
    case "HIGH":
      return "High Priority";
    case "NORMAL":
      return "Normal Priority";
    case "LOW":
      return "Low Priority";
  }
}
