import {
  Guest,
  GuestGroup,
  GuestStatus,
  MealPreference,
  GuestSummary,
  EventAttendance,
} from "@/data/guests";

export interface GuestFiltersState {
  search: string;
  group: string; // "ALL" | GuestGroup
  status: string; // "ALL" | GuestStatus
  mealPreference: string; // "ALL" | MealPreference
  plusOne: string; // "ALL" | "WITH_PLUS_ONE" | "WITHOUT_PLUS_ONE"
  event: string; // "ALL" | "mehendi" | "haldi" | "wedding" | "reception"
}

export interface NeedsAttentionItem {
  id: string;
  guestId: string;
  guestName: string;
  reason: string;
  type: "rsvp" | "meal" | "plus_one" | "event";
  status: GuestStatus;
}

export function calculateGuestSummary(guests: Guest[]): GuestSummary {
  const totalInvited = guests.length;
  let confirmed = 0;
  let pending = 0;
  let declined = 0;
  let plusOnes = 0;

  guests.forEach((g) => {
    if (g.status === "CONFIRMED") confirmed++;
    else if (g.status === "PENDING" || g.status === "INVITED") pending++;
    else if (g.status === "DECLINED") declined++;

    if (g.plusOne) plusOnes++;
  });

  const responseRate = calculateResponseRate(confirmed, declined, totalInvited);

  return {
    totalInvited,
    confirmed,
    pending,
    declined,
    plusOnes,
    responseRate,
  };
}

export function calculateResponseRate(
  confirmed: number,
  declined: number,
  totalInvited: number
): number {
  if (totalInvited === 0) return 0;
  const responded = confirmed + declined;
  return Math.round((responded / totalInvited) * 100);
}

export function calculateGroupCounts(guests: Guest[]) {
  const groups: Record<GuestGroup, { count: number; percentage: number }> = {
    FAMILY: { count: 0, percentage: 0 },
    FRIENDS: { count: 0, percentage: 0 },
    COLLEAGUES: { count: 0, percentage: 0 },
    OTHER: { count: 0, percentage: 0 },
  };

  const total = guests.length;
  if (total === 0) return groups;

  guests.forEach((g) => {
    if (groups[g.group]) {
      groups[g.group].count++;
    }
  });

  (Object.keys(groups) as GuestGroup[]).forEach((key) => {
    groups[key].percentage = Math.round((groups[key].count / total) * 100);
  });

  return groups;
}

export function calculateMealPreferenceCounts(guests: Guest[]) {
  const preferences: Record<MealPreference, number> = {
    VEGETARIAN: 0,
    NON_VEGETARIAN: 0,
    VEGAN: 0,
    JAIN: 0,
    OTHER: 0,
    NOT_SPECIFIED: 0,
  };

  guests.forEach((g) => {
    if (preferences[g.mealPreference] !== undefined) {
      preferences[g.mealPreference]++;
    }
  });

  return preferences;
}

export function calculateEventAttendance(guests: Guest[]) {
  const events = {
    mehendi: { yes: 0, no: 0, pending: 0 },
    haldi: { yes: 0, no: 0, pending: 0 },
    wedding: { yes: 0, no: 0, pending: 0 },
    reception: { yes: 0, no: 0, pending: 0 },
  };

  guests.forEach((g) => {
    (["mehendi", "haldi", "wedding", "reception"] as const).forEach((ev) => {
      const status: EventAttendance = g.events[ev];
      if (status === "YES") events[ev].yes++;
      else if (status === "NO") events[ev].no++;
      else events[ev].pending++;
    });
  });

  return events;
}

export function getGuestsNeedingAttention(guests: Guest[]): NeedsAttentionItem[] {
  const items: NeedsAttentionItem[] = [];

  guests.forEach((g) => {
    // 1. Pending RSVP
    if (g.status === "PENDING" || g.status === "INVITED") {
      items.push({
        id: `att-rsvp-${g.id}`,
        guestId: g.id,
        guestName: g.name,
        reason: "RSVP response pending confirmation",
        type: "rsvp",
        status: g.status,
      });
    }

    // 2. Plus-One enabled but name missing
    if (g.plusOne && (!g.plusOneName || g.plusOneName.trim() === "")) {
      items.push({
        id: `att-plusone-${g.id}`,
        guestId: g.id,
        guestName: g.name,
        reason: "Plus-one companion name missing",
        type: "plus_one",
        status: g.status,
      });
    }

    // 3. Meal preference not specified for confirmed guests
    if (g.status === "CONFIRMED" && (g.mealPreference === "NOT_SPECIFIED" || !g.mealPreference)) {
      items.push({
        id: `att-meal-${g.id}`,
        guestId: g.id,
        guestName: g.name,
        reason: "Dietary & meal preference not selected",
        type: "meal",
        status: g.status,
      });
    }

    // 4. Confirmed guest with pending event attendance
    if (
      g.status === "CONFIRMED" &&
      (g.events.mehendi === "PENDING" ||
        g.events.haldi === "PENDING" ||
        g.events.wedding === "PENDING" ||
        g.events.reception === "PENDING")
    ) {
      items.push({
        id: `att-event-${g.id}`,
        guestId: g.id,
        guestName: g.name,
        reason: "Individual event attendance unconfirmed",
        type: "event",
        status: g.status,
      });
    }
  });

  return items;
}

export function searchGuests(guests: Guest[], query: string): Guest[] {
  if (!query || query.trim() === "") return guests;
  const q = query.toLowerCase().trim();

  return guests.filter((g) => {
    const matchName = g.name.toLowerCase().includes(q);
    const matchGroup = g.group.toLowerCase().includes(q);
    const matchEmail = g.email ? g.email.toLowerCase().includes(q) : false;
    const matchNotes = g.notes ? g.notes.toLowerCase().includes(q) : false;
    const matchPlusOne = g.plusOneName ? g.plusOneName.toLowerCase().includes(q) : false;

    return matchName || matchGroup || matchEmail || matchNotes || matchPlusOne;
  });
}

export function filterGuests(guests: Guest[], filters: GuestFiltersState): Guest[] {
  let result = searchGuests(guests, filters.search);

  // Group filter
  if (filters.group && filters.group !== "ALL") {
    result = result.filter((g) => g.group === filters.group);
  }

  // RSVP Status filter
  if (filters.status && filters.status !== "ALL") {
    result = result.filter((g) => g.status === filters.status);
  }

  // Meal Preference filter
  if (filters.mealPreference && filters.mealPreference !== "ALL") {
    result = result.filter((g) => g.mealPreference === filters.mealPreference);
  }

  // Plus-One filter
  if (filters.plusOne && filters.plusOne !== "ALL") {
    if (filters.plusOne === "WITH_PLUS_ONE") {
      result = result.filter((g) => g.plusOne);
    } else if (filters.plusOne === "WITHOUT_PLUS_ONE") {
      result = result.filter((g) => !g.plusOne);
    }
  }

  // Event filter
  if (filters.event && filters.event !== "ALL") {
    const evKey = filters.event as keyof Guest["events"];
    result = result.filter((g) => g.events[evKey] === "YES");
  }

  return result;
}

export function sortGuests(guests: Guest[], sortBy: string): Guest[] {
  const list = [...guests];

  switch (sortBy) {
    case "name_asc":
      return list.sort((a, b) => a.name.localeCompare(b.name));
    case "name_desc":
      return list.sort((a, b) => b.name.localeCompare(a.name));
    case "updated":
      return list.sort((a, b) => {
        const dateA = a.updatedAt || a.invitedAt;
        const dateB = b.updatedAt || b.invitedAt;
        return new Date(dateB).getTime() - new Date(dateA).getTime();
      });
    case "status":
      const order: Record<GuestStatus, number> = {
        CONFIRMED: 1,
        PENDING: 2,
        INVITED: 3,
        DECLINED: 4,
      };
      return list.sort((a, b) => order[a.status] - order[b.status]);
    default:
      return list;
  }
}

export function formatGuestStatus(status: GuestStatus): {
  label: string;
  badgeClass: string;
} {
  switch (status) {
    case "CONFIRMED":
      return {
        label: "Confirmed",
        badgeClass: "bg-[#2D4A3E]/10 text-[#2D4A3E] border-[#2D4A3E]/20",
      };
    case "PENDING":
      return {
        label: "Pending",
        badgeClass: "bg-[#C5A880]/15 text-[#8C6D3B] border-[#C5A880]/30",
      };
    case "DECLINED":
      return {
        label: "Declined",
        badgeClass: "bg-[#161514]/10 text-[#5A5650] border-[#161514]/20",
      };
    case "INVITED":
      return {
        label: "Invited",
        badgeClass: "bg-[#161514]/5 text-[#5A5650] border-[#161514]/15",
      };
    default:
      return {
        label: status,
        badgeClass: "bg-gray-100 text-gray-700 border-gray-200",
      };
  }
}

export function formatMealPreference(meal: MealPreference): string {
  switch (meal) {
    case "VEGETARIAN":
      return "Vegetarian";
    case "NON_VEGETARIAN":
      return "Non-Vegetarian";
    case "VEGAN":
      return "Vegan";
    case "JAIN":
      return "Jain";
    case "OTHER":
      return "Other";
    case "NOT_SPECIFIED":
      return "Not specified";
    default:
      return meal;
  }
}
