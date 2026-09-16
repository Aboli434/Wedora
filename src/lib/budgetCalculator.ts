import {
  CelebrationStyle,
  PriorityLevel,
  BUDGET_LOCATIONS,
  BUDGET_EVENTS,
  BUDGET_STYLES,
  BASE_PER_GUEST,
} from "@/data/budget";

export interface BudgetInputs {
  guestCount: number;
  eventCount: number;
  celebrationStyle: CelebrationStyle;
  location: string;
  priorities: {
    venue: PriorityLevel;
    decor: PriorityLevel;
    photography: PriorityLevel;
    catering: PriorityLevel;
    attire: PriorityLevel;
  };
}

export interface BudgetCategoryBreakdown {
  key: string;
  label: string;
  percentage: number;
  amount: number;
}

export interface BudgetResultData {
  totalEstimate: number;
  formattedTotal: string;
  breakdown: BudgetCategoryBreakdown[];
}

const LEVEL_MULTIPLIERS: Record<PriorityLevel, number> = {
  Essential: 0.7,
  Elevated: 1.0,
  Signature: 1.35,
};

// Format currency in Indian numbering system (e.g., ₹18,50,000)
export function formatIndianRupees(amount: number): string {
  const rounded = Math.round(amount);
  return `₹${rounded.toLocaleString("en-IN")}`;
}

export function calculateBudget(inputs: BudgetInputs): BudgetResultData {
  // Validate and clamp guest count safely
  const guests = Math.max(20, Math.min(1000, inputs.guestCount || 150));

  // Find multipliers
  const locObj =
    BUDGET_LOCATIONS.find((l) => l.name === inputs.location) ||
    BUDGET_LOCATIONS[3]; // Default Jaipur
  const eventObj =
    BUDGET_EVENTS.find((e) => e.count === inputs.eventCount) ||
    BUDGET_EVENTS[1]; // Default 2 Events
  const styleObj =
    BUDGET_STYLES.find((s) => s.key === inputs.celebrationStyle) ||
    BUDGET_STYLES[1]; // Default Classic

  const rawBase = guests * BASE_PER_GUEST;
  const rawTotal =
    rawBase * locObj.multiplier * eventObj.multiplier * styleObj.multiplier;

  // Round final total to nearest ₹10,000 to prevent false precision
  const totalEstimate = Math.round(rawTotal / 10000) * 10000;

  // Initial base percentage allocations
  const baseCategoryWeights = {
    venue: 25 * LEVEL_MULTIPLIERS[inputs.priorities.venue],
    decor: 20 * LEVEL_MULTIPLIERS[inputs.priorities.decor],
    photography: 15 * LEVEL_MULTIPLIERS[inputs.priorities.photography],
    catering: 22 * LEVEL_MULTIPLIERS[inputs.priorities.catering],
    attire: 10 * LEVEL_MULTIPLIERS[inputs.priorities.attire],
    planning: 5,
    other: 3,
  };

  const sumWeights = Object.values(baseCategoryWeights).reduce((a, b) => a + b, 0);

  // Normalize percentages to sum to 100%
  const venuePct = Math.round((baseCategoryWeights.venue / sumWeights) * 100);
  const decorPct = Math.round((baseCategoryWeights.decor / sumWeights) * 100);
  const photoPct = Math.round((baseCategoryWeights.photography / sumWeights) * 100);
  const caterPct = Math.round((baseCategoryWeights.catering / sumWeights) * 100);
  const attirePct = Math.round((baseCategoryWeights.attire / sumWeights) * 100);
  const planPct = Math.round((baseCategoryWeights.planning / sumWeights) * 100);
  const otherPct = Math.max(
    1,
    100 - (venuePct + decorPct + photoPct + caterPct + attirePct + planPct)
  );

  const breakdown: BudgetCategoryBreakdown[] = [
    {
      key: "venue",
      label: "Venue & Estate",
      percentage: venuePct,
      amount: Math.round((totalEstimate * venuePct) / 100),
    },
    {
      key: "decor",
      label: "Decor & Spatial Design",
      percentage: decorPct,
      amount: Math.round((totalEstimate * decorPct) / 100),
    },
    {
      key: "photography",
      label: "Photography & Cinematography",
      percentage: photoPct,
      amount: Math.round((totalEstimate * photoPct) / 100),
    },
    {
      key: "catering",
      label: "Food & Culinary Experience",
      percentage: caterPct,
      amount: Math.round((totalEstimate * caterPct) / 100),
    },
    {
      key: "attire",
      label: "Attire, Styling & Beauty",
      percentage: attirePct,
      amount: Math.round((totalEstimate * attirePct) / 100),
    },
    {
      key: "planning",
      label: "Planning & Coordination",
      percentage: planPct,
      amount: Math.round((totalEstimate * planPct) / 100),
    },
    {
      key: "other",
      label: "Logistics & Hospitality",
      percentage: otherPct,
      amount: Math.round((totalEstimate * otherPct) / 100),
    },
  ];

  return {
    totalEstimate,
    formattedTotal: formatIndianRupees(totalEstimate),
    breakdown,
  };
}
