import {
  WeddingEvent,
  EventType,
  EventStatus,
  EventSummary,
  EventActionItem,
} from "@/data/eventsDashboard";

export interface EventFiltersState {
  search: string;
  type: string; // "ALL" | EventType
  status: string; // "ALL" | EventStatus
  date: string; // "ALL" | "UPCOMING" | "COMPLETED"
  readiness: string; // "ALL" | "NEEDS_ATTENTION" | "ON_TRACK" | "READY"
}

export function calculateEventTaskProgress(event: WeddingEvent): number {
  if (!event.tasks || event.tasks.length === 0) return 100;
  const completed = event.tasks.filter((t) => t.status === "COMPLETED").length;
  return Math.round((completed / event.tasks.length) * 100);
}

export function calculateEventReadiness(event: WeddingEvent): number {
  const taskProgress = calculateEventTaskProgress(event); // 70% weight
  
  let statusScore = 30; // default for PLANNING
  if (event.status === "READY" || event.status === "COMPLETED") {
    statusScore = 100;
  } else if (event.status === "IN_PROGRESS") {
    statusScore = 65;
  }

  const score = Math.round(taskProgress * 0.7 + statusScore * 0.3);
  return Math.min(100, Math.max(0, score));
}

export function calculateOverallEventTaskProgress(events: WeddingEvent[]): number {
  let totalTasks = 0;
  let completedTasks = 0;

  events.forEach((ev) => {
    totalTasks += ev.tasks.length;
    completedTasks += ev.tasks.filter((t) => t.status === "COMPLETED").length;
  });

  if (totalTasks === 0) return 0;
  return Math.round((completedTasks / totalTasks) * 100);
}

export function calculateEventSummary(events: WeddingEvent[]): EventSummary {
  const totalEvents = events.length;
  let upcomingEvents = 0;
  let readyEvents = 0;
  let eventsNeedingAttention = 0;
  let totalTasks = 0;
  let completedTasks = 0;
  let totalExpectedGuests = 0;
  let totalConfirmedGuests = 0;
  let totalReadinessSum = 0;

  events.forEach((ev) => {
    if (ev.status !== "COMPLETED") {
      upcomingEvents++;
    }
    if (ev.status === "READY") {
      readyEvents++;
    }

    const readiness = calculateEventReadiness(ev);
    totalReadinessSum += readiness;

    if (readiness < 75 || ev.vendors.some((v) => v.status === "PENDING")) {
      eventsNeedingAttention++;
    }

    totalTasks += ev.tasks.length;
    completedTasks += ev.tasks.filter((t) => t.status === "COMPLETED").length;

    totalExpectedGuests += ev.expectedGuests;
    totalConfirmedGuests += ev.confirmedGuests;
  });

  const taskCompletionPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const overallReadiness =
    totalEvents > 0 ? Math.round(totalReadinessSum / totalEvents) : 0;

  return {
    totalEvents,
    upcomingEvents,
    readyEvents,
    eventsNeedingAttention,
    totalTasks,
    completedTasks,
    taskCompletionPercentage,
    totalExpectedGuests,
    totalConfirmedGuests,
    overallReadiness,
  };
}

export function getUpcomingEvents(events: WeddingEvent[]): WeddingEvent[] {
  return [...events].sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.startTime}`).getTime();
    const dateB = new Date(`${b.date} ${b.startTime}`).getTime();
    return dateA - dateB;
  });
}

export function getEventsNeedingAttention(events: WeddingEvent[]): EventActionItem[] {
  const items: EventActionItem[] = [];

  events.forEach((ev) => {
    const readiness = calculateEventReadiness(ev);
    const pendingVendors = ev.vendors.filter((v) => v.status === "PENDING");
    const pendingTasks = ev.tasks.filter((t) => t.status !== "COMPLETED");

    if (readiness < 75) {
      items.push({
        id: `att-readiness-${ev.id}`,
        eventId: ev.id,
        eventName: ev.name,
        issue: `Event readiness at ${readiness}%. ${pendingTasks.length} pending planning tasks.`,
        date: ev.date,
        status: ev.status,
      });
    }

    if (pendingVendors.length > 0) {
      items.push({
        id: `att-vendor-${ev.id}`,
        eventId: ev.id,
        eventName: ev.name,
        issue: `${pendingVendors.length} key vendor confirmation pending (${pendingVendors.map((v) => v.vendorName).join(", ")}).`,
        date: ev.date,
        status: ev.status,
      });
    }
  });

  return items;
}

export function filterEvents(
  events: WeddingEvent[],
  filters: EventFiltersState
): WeddingEvent[] {
  return events.filter((ev) => {
    // Search
    if (filters.search && filters.search.trim() !== "") {
      const q = filters.search.toLowerCase().trim();
      const matchName = ev.name.toLowerCase().includes(q);
      const matchVenue = ev.venue.toLowerCase().includes(q);
      const matchCity = ev.city.toLowerCase().includes(q);
      const matchDesc = ev.description.toLowerCase().includes(q);
      const matchType = formatEventType(ev.type).toLowerCase().includes(q);
      if (!matchName && !matchVenue && !matchCity && !matchDesc && !matchType) {
        return false;
      }
    }

    // Type filter
    if (filters.type && filters.type !== "ALL" && ev.type !== filters.type) {
      return false;
    }

    // Status filter
    if (filters.status && filters.status !== "ALL" && ev.status !== filters.status) {
      return false;
    }

    // Date filter
    if (filters.date && filters.date !== "ALL") {
      if (filters.date === "UPCOMING" && ev.status === "COMPLETED") return false;
      if (filters.date === "COMPLETED" && ev.status !== "COMPLETED") return false;
    }

    // Readiness filter
    if (filters.readiness && filters.readiness !== "ALL") {
      const readiness = calculateEventReadiness(ev);
      if (filters.readiness === "NEEDS_ATTENTION" && readiness >= 75) return false;
      if (filters.readiness === "ON_TRACK" && (readiness < 75 || readiness >= 90)) return false;
      if (filters.readiness === "READY" && readiness < 90) return false;
    }

    return true;
  });
}

export function sortEvents(events: WeddingEvent[], sortBy: string): WeddingEvent[] {
  const list = [...events];

  switch (sortBy) {
    case "date_asc":
      return list.sort(
        (a, b) =>
          new Date(`${a.date} ${a.startTime}`).getTime() -
          new Date(`${b.date} ${b.startTime}`).getTime()
      );
    case "date_desc":
      return list.sort(
        (a, b) =>
          new Date(`${b.date} ${b.startTime}`).getTime() -
          new Date(`${a.date} ${a.startTime}`).getTime()
      );
    case "name_asc":
      return list.sort((a, b) => a.name.localeCompare(b.name));
    case "readiness":
      return list.sort(
        (a, b) => calculateEventReadiness(a) - calculateEventReadiness(b)
      );
    case "updated":
      return list.sort((a, b) => {
        const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
        const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
        return dateB - dateA;
      });
    default:
      return list;
  }
}

export function calculateEventDuration(event: WeddingEvent): string {
  // Simple representation for display
  return `${event.startTime} — ${event.endTime}`;
}

export function formatEventStatus(status: EventStatus): {
  label: string;
  badgeClass: string;
} {
  switch (status) {
    case "READY":
      return {
        label: "Ready",
        badgeClass: "bg-[#2D4A3E]/10 text-[#2D4A3E] border-[#2D4A3E]/20",
      };
    case "IN_PROGRESS":
      return {
        label: "In Planning",
        badgeClass: "bg-[#C5A880]/15 text-[#8C6D3B] border-[#C5A880]/30",
      };
    case "PLANNING":
      return {
        label: "Initial Setup",
        badgeClass: "bg-[#161514]/5 text-[#5A5650] border-[#161514]/15",
      };
    case "COMPLETED":
      return {
        label: "Completed",
        badgeClass: "bg-[#2D4A3E]/5 text-[#2D4A3E] border-[#2D4A3E]/15",
      };
    default:
      return {
        label: status,
        badgeClass: "bg-gray-100 text-gray-700 border-gray-200",
      };
  }
}

export function formatEventType(type: EventType): string {
  switch (type) {
    case "MEHENDI":
      return "Mehendi & Sangeet";
    case "HALDI":
      return "Haldi Celebration";
    case "WEDDING":
      return "Wedding Ceremony";
    case "RECEPTION":
      return "Grand Reception";
    case "OTHER":
      return "Other Function";
    default:
      return type;
  }
}
