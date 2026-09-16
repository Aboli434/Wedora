export interface ProcessStepItem {
  id: string;
  number: string;
  label: string;
  title: string;
  description: string;
}

export const HOW_IT_WORKS_DATA: ProcessStepItem[] = [
  {
    id: "discover",
    number: "01",
    label: "DISCOVER",
    title: "Start with your vision.",
    description:
      "Tell us what you're imagining, explore ideas, and begin shaping the celebration that feels uniquely yours.",
  },
  {
    id: "plan",
    number: "02",
    label: "PLAN",
    title: "Build the celebration.",
    description:
      "Organize your events, checklist, budget, vendors, and important decisions in one connected space.",
  },
  {
    id: "coordinate",
    number: "03",
    label: "COORDINATE",
    title: "Bring everyone together.",
    description:
      "Keep vendors, guests, schedules, and conversations aligned as the wedding takes shape.",
  },
  {
    id: "celebrate",
    number: "04",
    label: "CELEBRATE",
    title: "Be present for the moment.",
    description:
      "With the details handled and everyone on the same page, you can focus on what the day is really about.",
  },
];
