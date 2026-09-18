export type PortfolioCategory =
  | "WEDDINGS"
  | "PRE_WEDDING"
  | "DETAILS"
  | "PORTRAITS"
  | "DECOR"
  | "EVENTS"
  | "OTHER";

export type PortfolioVisibility = "PUBLIC" | "PRIVATE";

export interface VendorPortfolioItem {
  id: string;
  title: string;
  description?: string;
  category: PortfolioCategory;
  imageSrc: string;
  imageAlt: string;
  location?: string;
  eventType?: string;
  coupleName?: string;
  year?: number;
  featured: boolean;
  visibility: PortfolioVisibility;
  sortOrder: number;
  updatedAt: string;
}

export interface VendorPortfolioSummary {
  totalItems: number;
  publicItems: number;
  featuredItems: number;
  categoryCount: number;
  portfolioCompletion: number;
}

export const MOCK_VENDOR_PORTFOLIO: VendorPortfolioItem[] = [
  {
    id: "port-101",
    title: "Aditi & Arjun — Heritage Celebration",
    description: "Intimate lakefront vows framed by centuries-old Rajasthan stone arches and candlelight.",
    category: "WEDDINGS",
    imageSrc: "/images/wedding/wedora-wedding-aditi-arjun.jpg",
    imageAlt: "Aditi & Arjun intimate heritage wedding portrait in Udaipur",
    location: "Udaipur, Rajasthan",
    eventType: "Pheras & Main Ceremony",
    coupleName: "Aditi & Arjun",
    year: 2026,
    featured: true,
    visibility: "PUBLIC",
    sortOrder: 1,
    updatedAt: "16 Sep 2026",
  },
  {
    id: "port-102",
    title: "Meera & Rohan — Coastal Sunset Vows",
    description: "Open-air beachside ceremony on the Goa coastline with golden hour ocean reflections.",
    category: "WEDDINGS",
    imageSrc: "/images/wedding/wedora-wedding-meera-rohan.jpg",
    imageAlt: "Meera & Rohan coastal sunset wedding celebration in Goa",
    location: "Goa",
    eventType: "Beachfront Pheras",
    coupleName: "Meera & Rohan",
    year: 2026,
    featured: true,
    visibility: "PUBLIC",
    sortOrder: 2,
    updatedAt: "14 Sep 2026",
  },
  {
    id: "port-103",
    title: "Isha & Kunal — Pink City Editorial",
    description: "High-contrast traditional wedding portraiture set against a historic royal palace estate.",
    category: "WEDDINGS",
    imageSrc: "/images/wedding/wedora-wedding-isha-kunal.jpg",
    imageAlt: "Isha & Kunal editorial wedding portrait in Jaipur",
    location: "Jaipur, Rajasthan",
    eventType: "Editorial Portrait Session",
    coupleName: "Isha & Kunal",
    year: 2026,
    featured: true,
    visibility: "PUBLIC",
    sortOrder: 3,
    updatedAt: "12 Sep 2026",
  },
  {
    id: "port-104",
    title: "Courtyard Golden Hour Portrait",
    description: "Quiet, unscripted moment captured in the palatial arches during late afternoon light.",
    category: "PORTRAITS",
    imageSrc: "/images/wedding/wedora-vendor-courtyard-estate.jpg",
    imageAlt: "Palatial Udaipur courtyard illuminated with late afternoon light",
    location: "Udaipur",
    eventType: "Pre-Pheras Portrait",
    year: 2026,
    featured: false,
    visibility: "PUBLIC",
    sortOrder: 4,
    updatedAt: "10 Sep 2026",
  },
  {
    id: "port-105",
    title: "Heirloom Bridal Jewelry & Embroidery",
    description: "Intimate close-up study of handwoven zardozi embroidery and antique kundan jewels.",
    category: "DETAILS",
    imageSrc: "/images/wedding/wedora-gallery-01.jpg",
    imageAlt: "Detailed Indian bridal adornments, jewelry, and heirloom embroidery",
    location: "Mumbai",
    eventType: "Bridal Preparation",
    year: 2026,
    featured: false,
    visibility: "PUBLIC",
    sortOrder: 5,
    updatedAt: "08 Sep 2026",
  },
  {
    id: "port-106",
    title: "Artisan Marigold Mandap Installation",
    description: "Handcrafted yellow marigold floral garlands draping an open-air ceremonial mandap.",
    category: "DECOR",
    imageSrc: "/images/wedding/wedora-gallery-03.jpg",
    imageAlt: "Handwoven marigold garlands and mandap floral design",
    location: "Goa",
    eventType: "Mandap Setup",
    year: 2026,
    featured: false,
    visibility: "PUBLIC",
    sortOrder: 6,
    updatedAt: "05 Sep 2026",
  },
  {
    id: "port-107",
    title: "Coastal Sunset Reception Dinner",
    description: "Lantern-lit open-air coastal dining setup with sitar music by the sea breeze.",
    category: "EVENTS",
    imageSrc: "/images/wedding/wedora-service-events.jpg",
    imageAlt: "Open air evening coastal reception celebration",
    location: "Goa",
    eventType: "Reception Dinner",
    year: 2026,
    featured: false,
    visibility: "PUBLIC",
    sortOrder: 7,
    updatedAt: "02 Sep 2026",
  },
  {
    id: "port-108",
    title: "Sunset Pheras Sacred Fire Study",
    description: "Private study of sacred fire flames and evening shadows during wedding vows.",
    category: "WEDDINGS",
    imageSrc: "/images/wedding/wedora-gallery-05.jpg",
    imageAlt: "Sunset Pheras ceremony surrounding the sacred fire in Udaipur",
    location: "Udaipur",
    eventType: "Pheras Ceremony",
    year: 2026,
    featured: false,
    visibility: "PRIVATE",
    sortOrder: 8,
    updatedAt: "01 Sep 2026",
  },
];
