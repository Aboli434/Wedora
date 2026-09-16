export interface Pillar {
  number: string;
  title: string;
  description: string;
}

export interface Principle {
  number: string;
  title: string;
  description: string;
}

export const aboutData = {
  hero: {
    eyebrow: "ABOUT WEDORA",
    heading: "Wedding planning, with room to breathe.",
    supporting:
      "Wedora brings the people, plans, details, and decisions behind a wedding into one beautifully considered experience.",
    image: "/images/wedding/wedora-about-hero.jpg",
  },
  philosophy: {
    eyebrow: "OUR PHILOSOPHY",
    heading: "A celebration should feel like yours.",
    supporting:
      "Every wedding has its own rhythm, its own people, and its own little details. Wedora is designed to bring structure to that complexity without taking away the personality that makes the celebration yours.",
    microLabel: "PLANNED WITH INTENTION",
    image: "/images/wedding/wedora-about-philosophy.jpg",
  },
  problem: {
    eyebrow: "THE REALITY",
    heading: "Too many details. Too many places. One very important day.",
    paragraph1:
      "Guest lists live in one place. Vendor conversations in another. Budgets shift in spreadsheets. Timelines sit in messages. Important decisions get scattered across people, platforms, and notebooks.",
    paragraph2: "Wedora was imagined to bring those moving pieces together.",
    image: "/images/wedding/wedora-about-planning.jpg",
  },
  fourPillars: {
    heading: "Everything behind the celebration, together.",
    items: [
      {
        number: "01",
        title: "PLAN",
        description: "Build your wedding around the moments that matter.",
      },
      {
        number: "02",
        title: "PEOPLE",
        description: "Keep couples, families, vendors, and guests connected.",
      },
      {
        number: "03",
        title: "DETAILS",
        description:
          "Bring budgets, checklists, events, documents, and decisions into one place.",
      },
      {
        number: "04",
        title: "CELEBRATE",
        description: "Spend less time chasing details and more time being present.",
      },
    ] as Pillar[],
  },
  principles: {
    eyebrow: "THE WEDORA WAY",
    heading: "Structure without losing the feeling.",
    supporting:
      "Good planning should create clarity, not noise. Every part of Wedora is designed around that idea — giving couples the structure they need while leaving space for the moments that cannot be planned.",
    items: [
      {
        number: "01",
        title: "CLARITY",
        description: "Know what needs attention, when it matters, and who is involved.",
      },
      {
        number: "02",
        title: "CONNECTION",
        description: "Keep the people behind the celebration moving together.",
      },
      {
        number: "03",
        title: "INTENTION",
        description: "Make decisions around what feels meaningful to you.",
      },
    ] as Principle[],
  },
  closing: {
    eyebrow: "YOUR STORY",
    heading: "Because the best-planned weddings still feel effortless.",
    supporting:
      "Wedora is built to help you take care of what is behind the celebration — so you can be present for what happens within it.",
    primaryCta: "Plan Your Wedding",
    secondaryCta: "Explore Our Services",
    image: "/images/wedding/wedora-about-closing.jpg",
  },
};
