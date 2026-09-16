export interface DetailedService {
  id: string;
  number: string;
  label: string;
  title: string;
  description: string;
  features: string[];
  imageSrc: string;
  imageAlt: string;
  alignment: "image-left" | "content-left";
}

export const SERVICES_PAGE_DATA = {
  hero: {
    eyebrow: "OUR SERVICES",
    heading: "Everything your celebration needs, thoughtfully brought together.",
    supporting:
      "From the first idea to the final farewell, Wedora brings planning, people, details, and decisions into one beautifully considered experience.",
    imageSrc: "/images/wedding/wedora-hero-wedding.jpg",
  },
  intro: {
    eyebrow: "THE WEDORA APPROACH",
    heading: "Plan less from scattered places. Experience more of the celebration.",
    supporting:
      "Wedding planning can quickly become a collection of spreadsheets, messages, calls, lists, and loose ends. Wedora brings those moving parts together so the experience feels clearer from the beginning.",
    imageSrc: "/images/wedding/wedora-process-celebration.jpg",
    imageAlt: "Intimate Indian wedding celebration and evening mandap details",
  },
  detailedServices: [
    {
      id: "wedding-planning",
      number: "01",
      label: "PLAN",
      title: "Wedding Planning",
      description:
        "Build your celebration around a clear vision, timeline, and plan that keeps every important detail moving in the right direction.",
      features: [
        "Wedding timeline",
        "Event planning",
        "Task & checklist management",
        "Planning milestones",
        "Celebration overview",
      ],
      imageSrc: "/images/wedding/wedora-service-planning.jpg",
      imageAlt: "Luxury Indian wedding ceremony planning and mandap setup",
      alignment: "image-left",
    },
    {
      id: "vendor-discovery",
      number: "02",
      label: "DISCOVER",
      title: "Vendor Discovery",
      description:
        "Find the people and businesses behind the celebration, compare what matters, and keep every vendor relationship organized in one place.",
      features: [
        "Vendor discovery",
        "Vendor profiles",
        "Service categories",
        "Location-based discovery",
        "Vendor shortlist",
      ],
      imageSrc: "/images/wedding/wedora-service-vendors.jpg",
      imageAlt: "Artisan Indian wedding floral craftsmanship and vendor details",
      alignment: "content-left",
    },
    {
      id: "guest-event-management",
      number: "03",
      label: "COORDINATE",
      title: "Guest & Event Management",
      description:
        "Keep guest details, events, schedules, and important information connected so everyone knows where they need to be and when.",
      features: [
        "Guest management",
        "Event schedules",
        "RSVP tracking",
        "Event-wise coordination",
        "Important updates",
      ],
      imageSrc: "/images/wedding/wedora-service-events.jpg",
      imageAlt: "Heritage courtyard evening celebration and guest gathering",
      alignment: "image-left",
    },
    {
      id: "budget-checklist",
      number: "04",
      label: "MANAGE",
      title: "Budget & Checklist Management",
      description:
        "Understand where your wedding budget is going and keep the small tasks moving without losing sight of the bigger celebration.",
      features: [
        "Budget planning",
        "Expense tracking",
        "Category-wise allocation",
        "Checklist management",
        "Planning progress",
      ],
      imageSrc: "/images/wedding/wedora-service-budget.jpg",
      imageAlt: "Luxury wedding planning journal, checklist, and stationery details",
      alignment: "content-left",
    },
  ] as DetailedService[],
  flow: {
    eyebrow: "ONE CONNECTED EXPERIENCE",
    heading: "Planning is easier when everything speaks to everything else.",
    explanation:
      "Wedora connects planning, vendors, guests, events, budget and checklists rather than treating them as isolated tools. Every detail feeds seamlessly into the next step of your journey.",
    steps: [
      { step: "01", title: "YOUR VISION", subtitle: "Define your style & moments" },
      { step: "02", title: "YOUR PLAN", subtitle: "Structure timelines & budget" },
      { step: "03", title: "YOUR PEOPLE", subtitle: "Coordinate guests & vendors" },
      { step: "04", title: "YOUR CELEBRATION", subtitle: "Be present in every moment" },
    ],
  },
  cta: {
    eyebrow: "READY WHEN YOU ARE",
    heading: "Let's bring your celebration together.",
    supporting: "Start with your vision. We'll help bring the details into focus.",
    primaryCtaText: "Plan Your Wedding",
    primaryCtaHref: "/register",
    secondaryCtaText: "Explore Real Weddings",
    secondaryCtaHref: "/real-weddings",
    imageSrc: "/images/wedding/wedora-final-cta-wedding.jpg",
  },
};
