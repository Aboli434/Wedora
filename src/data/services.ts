export interface ServicePillar {
  id: string;
  number: string;
  title: string;
  description: string;
  label: string;
  href: string;
  imageSrc?: string;
  imageAlt?: string;
}

export const SERVICES_DATA: ServicePillar[] = [
  {
    id: "wedding-planning",
    number: "01",
    title: "Wedding Planning",
    description:
      "Shape your wedding journey, from the first idea to the final timeline, with every important decision in one place.",
    label: "PLAN",
    href: "/services",
    imageSrc: "/images/wedding/wedora-service-planning.jpg",
    imageAlt: "Luxury Indian wedding ceremony planning and mandap setup",
  },
  {
    id: "vendor-discovery",
    number: "02",
    title: "Vendor Discovery",
    description:
      "Discover trusted photographers, decorators, venues, caterers, designers, and other professionals for your celebration.",
    label: "DISCOVER",
    href: "/vendors",
    imageSrc: "/images/wedding/wedora-service-vendors.jpg",
    imageAlt: "Artisan Indian wedding floral craftsmanship and details",
  },
  {
    id: "guest-event-management",
    number: "03",
    title: "Guest & Event Management",
    description:
      "Keep guest details, events, schedules, invitations, and important moments organized without the usual chaos.",
    label: "COORDINATE",
    href: "/services",
    imageSrc: "/images/wedding/wedora-service-events.jpg",
    imageAlt: "Heritage courtyard evening celebration and guest gathering",
  },
  {
    id: "budget-checklist",
    number: "04",
    title: "Budget & Checklist Management",
    description:
      "Track your budget, tasks, deadlines, and progress so you always know what needs attention next.",
    label: "MANAGE",
    href: "/services",
    imageSrc: "/images/wedding/wedora-service-budget.jpg",
    imageAlt: "Luxury wedding planning journal, checklist, and stationery details",
  },
];
