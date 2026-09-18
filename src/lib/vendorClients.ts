import {
  VendorClient,
  ClientRelationshipStatus,
  ClientPriority,
  ClientWeddingStatus,
  ClientContactPreference,
  VendorClientsSummary,
  ClientEvent,
} from "@/data/vendorClients";

export interface ClientFilterState {
  relationshipStatus: ClientRelationshipStatus | "ALL";
  priority: ClientPriority | "ALL";
  weddingStatus: ClientWeddingStatus | "ALL";
  service: string;
  destination: string;
  searchQuery: string;
  sortBy:
    | "RECENTLY_UPDATED"
    | "NAME_ASC"
    | "NAME_DESC"
    | "WEDDING_DATE_SOONEST"
    | "WEDDING_DATE_LATEST"
    | "RECENTLY_CONTACTED"
    | "PRIORITY";
}

export const FIXED_TODAY_DATE = "2026-09-18";

export function calculateClientCompletion(client: VendorClient): number {
  let score = 0;
  const totalWeight = 100;

  if (client.coupleName) score += 15;
  if (client.email) score += 15;
  if (client.phone) score += 15;
  if (client.destination) score += 10;
  if (client.venue) score += 10;
  if (client.weddingDate) score += 15;
  if (client.services && client.services.length > 0) score += 10;
  if (client.nextAction) score += 10;

  return Math.min(totalWeight, score);
}

export function calculateClientsSummary(
  clients: VendorClient[]
): VendorClientsSummary {
  const activeClients = clients.filter(
    (c) => c.relationshipStatus === "ACTIVE" || c.relationshipStatus === "UPCOMING"
  );

  let totalBookings = 0;
  clients.forEach((c) => {
    totalBookings += c.bookingIds.length;
  });

  let totalUpcomingEvents = 0;
  activeClients.forEach((c) => {
    totalUpcomingEvents += c.events.filter(
      (e) => e.status !== "COMPLETED"
    ).length;
  });

  const needingAttention = getClientsNeedingAttention(clients);

  const recentlyContacted = [...clients]
    .filter((c) => c.lastContactedAt)
    .sort(
      (a, b) =>
        new Date(b.lastContactedAt || 0).getTime() -
        new Date(a.lastContactedAt || 0).getTime()
    )
    .slice(0, 5);

  return {
    totalClients: clients.length,
    activeClients: clients.filter((c) => c.relationshipStatus === "ACTIVE").length,
    upcomingClients: clients.filter((c) => c.relationshipStatus === "UPCOMING").length,
    leadClients: clients.filter((c) => c.relationshipStatus === "LEAD").length,
    completedClients: clients.filter((c) => c.relationshipStatus === "COMPLETED").length,
    clientsNeedingAttention: needingAttention.length,
    recentlyContacted: recentlyContacted.length,
    totalBookings,
    upcomingEvents: totalUpcomingEvents,
  };
}

export function calculateClientStatusCounts(
  clients: VendorClient[]
): Record<ClientRelationshipStatus, number> {
  const counts: Record<ClientRelationshipStatus, number> = {
    LEAD: 0,
    ACTIVE: 0,
    UPCOMING: 0,
    COMPLETED: 0,
    INACTIVE: 0,
  };
  clients.forEach((c) => {
    counts[c.relationshipStatus] = (counts[c.relationshipStatus] || 0) + 1;
  });
  return counts;
}

export function calculateClientPriorityCounts(
  clients: VendorClient[]
): Record<ClientPriority, number> {
  const counts: Record<ClientPriority, number> = {
    HIGH: 0,
    NORMAL: 0,
    LOW: 0,
  };
  clients.forEach((c) => {
    counts[c.priority] = (counts[c.priority] || 0) + 1;
  });
  return counts;
}

export function calculateClientWeddingStatusCounts(
  clients: VendorClient[]
): Record<ClientWeddingStatus, number> {
  const counts: Record<ClientWeddingStatus, number> = {
    PLANNING: 0,
    UPCOMING: 0,
    IN_PROGRESS: 0,
    COMPLETED: 0,
    DATE_FLEXIBLE: 0,
  };
  clients.forEach((c) => {
    counts[c.weddingStatus] = (counts[c.weddingStatus] || 0) + 1;
  });
  return counts;
}

export function getClientsNeedingAttention(
  clients: VendorClient[]
): VendorClient[] {
  return clients.filter((c) => {
    if (c.relationshipStatus === "COMPLETED" || c.relationshipStatus === "INACTIVE")
      return false;

    const isHighPriority = c.priority === "HIGH";
    const isFlexibleDate = c.weddingDateStatus === "FLEXIBLE";
    const missingVenue = !c.venue || c.venue.trim() === "";
    const isLead = c.relationshipStatus === "LEAD";
    const hasPendingNextAction = !!c.nextAction;

    return (
      isHighPriority ||
      isFlexibleDate ||
      missingVenue ||
      isLead ||
      hasPendingNextAction
    );
  });
}

export function getUpcomingClients(
  clients: VendorClient[],
  limit = 5
): VendorClient[] {
  return [...clients]
    .filter(
      (c) =>
        c.relationshipStatus !== "COMPLETED" &&
        c.relationshipStatus !== "INACTIVE" &&
        c.weddingDate
    )
    .sort((a, b) => {
      const dA = a.weddingDate ? new Date(a.weddingDate).getTime() : Infinity;
      const dB = b.weddingDate ? new Date(b.weddingDate).getTime() : Infinity;
      return dA - dB;
    })
    .slice(0, limit);
}

export function getRecentlyContactedClients(
  clients: VendorClient[],
  limit = 5
): VendorClient[] {
  return [...clients]
    .filter((c) => c.lastContactedAt)
    .sort(
      (a, b) =>
        new Date(b.lastContactedAt || 0).getTime() -
        new Date(a.lastContactedAt || 0).getTime()
    )
    .slice(0, limit);
}

export function getClientUpcomingEvents(client: VendorClient): ClientEvent[] {
  return client.events.filter((e) => e.status !== "COMPLETED");
}

export function searchVendorClients(
  clients: VendorClient[],
  query: string
): VendorClient[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return clients;

  return clients.filter((c) => {
    const couple = c.coupleName.toLowerCase();
    const partner = (c.partnerName || "").toLowerCase();
    const email = c.email.toLowerCase();
    const phone = (c.phone || "").toLowerCase();
    const ref = c.clientReference.toLowerCase();
    const dest = c.destination.toLowerCase();
    const venue = (c.venue || "").toLowerCase();
    const services = c.services.join(" ").toLowerCase();
    const notes = (c.notes || "").toLowerCase();
    const nextAct = (c.nextAction || "").toLowerCase();

    return (
      couple.includes(trimmed) ||
      partner.includes(trimmed) ||
      email.includes(trimmed) ||
      phone.includes(trimmed) ||
      ref.includes(trimmed) ||
      dest.includes(trimmed) ||
      venue.includes(trimmed) ||
      services.includes(trimmed) ||
      notes.includes(trimmed) ||
      nextAct.includes(trimmed)
    );
  });
}

export function filterVendorClients(
  clients: VendorClient[],
  filters: ClientFilterState
): VendorClient[] {
  let result = searchVendorClients(clients, filters.searchQuery);

  if (filters.relationshipStatus !== "ALL") {
    result = result.filter(
      (c) => c.relationshipStatus === filters.relationshipStatus
    );
  }

  if (filters.priority !== "ALL") {
    result = result.filter((c) => c.priority === filters.priority);
  }

  if (filters.weddingStatus !== "ALL") {
    result = result.filter((c) => c.weddingStatus === filters.weddingStatus);
  }

  if (filters.service !== "ALL") {
    result = result.filter((c) =>
      c.services.some((s) =>
        s.toLowerCase().includes(filters.service.toLowerCase())
      )
    );
  }

  if (filters.destination !== "ALL") {
    result = result.filter((c) =>
      c.destination.toLowerCase().includes(filters.destination.toLowerCase())
    );
  }

  return sortVendorClients(result, filters.sortBy);
}

export function sortVendorClients(
  clients: VendorClient[],
  sortBy: ClientFilterState["sortBy"]
): VendorClient[] {
  const priorityOrder: Record<ClientPriority, number> = {
    HIGH: 3,
    NORMAL: 2,
    LOW: 1,
  };

  return [...clients].sort((a, b) => {
    switch (sortBy) {
      case "RECENTLY_UPDATED":
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      case "NAME_ASC":
        return a.coupleName.localeCompare(b.coupleName);
      case "NAME_DESC":
        return b.coupleName.localeCompare(a.coupleName);
      case "WEDDING_DATE_SOONEST": {
        const dA = a.weddingDate ? new Date(a.weddingDate).getTime() : Infinity;
        const dB = b.weddingDate ? new Date(b.weddingDate).getTime() : Infinity;
        return dA - dB;
      }
      case "WEDDING_DATE_LATEST": {
        const dA = a.weddingDate ? new Date(a.weddingDate).getTime() : -Infinity;
        const dB = b.weddingDate ? new Date(b.weddingDate).getTime() : -Infinity;
        return dB - dA;
      }
      case "RECENTLY_CONTACTED": {
        const cA = a.lastContactedAt ? new Date(a.lastContactedAt).getTime() : 0;
        const cB = b.lastContactedAt ? new Date(b.lastContactedAt).getTime() : 0;
        return cB - cA;
      }
      case "PRIORITY":
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      default:
        return 0;
    }
  });
}

export function formatClientStatus(status: ClientRelationshipStatus): string {
  switch (status) {
    case "LEAD":
      return "Lead / Discovery";
    case "ACTIVE":
      return "Active Client";
    case "UPCOMING":
      return "Upcoming Celebration";
    case "COMPLETED":
      return "Completed Account";
    case "INACTIVE":
      return "Inactive / Closed";
  }
}

export function formatClientPriority(priority: ClientPriority): string {
  switch (priority) {
    case "HIGH":
      return "High Priority";
    case "NORMAL":
      return "Normal Priority";
    case "LOW":
      return "Low Priority";
  }
}

export function formatContactPreference(
  pref: ClientContactPreference
): string {
  switch (pref) {
    case "EMAIL":
      return "Email";
    case "PHONE":
      return "Phone Call";
    case "WHATSAPP":
      return "WhatsApp";
  }
}

export function formatWeddingStatus(status: ClientWeddingStatus): string {
  switch (status) {
    case "PLANNING":
      return "In Planning";
    case "UPCOMING":
      return "Upcoming Wedding";
    case "IN_PROGRESS":
      return "Active Wedding Week";
    case "COMPLETED":
      return "Wedding Concluded";
    case "DATE_FLEXIBLE":
      return "Dates Flexible";
  }
}

export function canTransitionClientStatus(
  current: ClientRelationshipStatus,
  target: ClientRelationshipStatus
): boolean {
  if (current === target) return true;
  return true; // Manual vendor override permitted across all relationship stages
}
