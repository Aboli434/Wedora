export type CelebrationStyle = "INTIMATE" | "CLASSIC" | "GRAND";
export type PriorityLevel = "Essential" | "Elevated" | "Signature";

export interface LocationOption {
  name: string;
  multiplier: number;
}

export interface EventOption {
  label: string;
  count: number;
  multiplier: number;
}

export interface StyleOption {
  key: CelebrationStyle;
  label: string;
  description: string;
  multiplier: number;
}

export interface PriorityCategoryConfig {
  key: "venue" | "decor" | "photography" | "catering" | "attire";
  label: string;
}

export const BUDGET_LOCATIONS: LocationOption[] = [
  { name: "Pune", multiplier: 0.95 },
  { name: "Mumbai", multiplier: 1.1 },
  { name: "Delhi", multiplier: 1.05 },
  { name: "Jaipur", multiplier: 1.0 },
  { name: "Udaipur", multiplier: 1.15 },
  { name: "Goa", multiplier: 1.1 },
  { name: "Hyderabad", multiplier: 0.95 },
  { name: "Bengaluru", multiplier: 1.0 },
  { name: "Other / Outside listed cities", multiplier: 1.0 },
];

export const BUDGET_EVENTS: EventOption[] = [
  { label: "1 Event", count: 1, multiplier: 1.0 },
  { label: "2 Events", count: 2, multiplier: 1.25 },
  { label: "3 Events", count: 3, multiplier: 1.45 },
  { label: "4+ Events", count: 4, multiplier: 1.65 },
];

export const BUDGET_STYLES: StyleOption[] = [
  {
    key: "INTIMATE",
    label: "Intimate",
    description: "Focus on close family, quiet luxury, and personal moments.",
    multiplier: 0.9,
  },
  {
    key: "CLASSIC",
    label: "Classic",
    description: "Balanced celebration with traditional ceremony and evening reception.",
    multiplier: 1.0,
  },
  {
    key: "GRAND",
    label: "Grand",
    description: "Expansive multi-day festivities with high-impact spatial design.",
    multiplier: 1.2,
  },
];

export const PRIORITY_CATEGORIES: PriorityCategoryConfig[] = [
  { key: "venue", label: "VENUE" },
  { key: "decor", label: "DECOR & DESIGN" },
  { key: "photography", label: "PHOTOGRAPHY" },
  { key: "catering", label: "FOOD & CATERING" },
  { key: "attire", label: "ATTIRE & BEAUTY" },
];

export const PRIORITY_LEVELS: PriorityLevel[] = [
  "Essential",
  "Elevated",
  "Signature",
];

export const BASE_PER_GUEST = 7000;
