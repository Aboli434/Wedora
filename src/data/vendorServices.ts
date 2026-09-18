export type PricingType = "STARTING_FROM" | "FIXED" | "CUSTOM_QUOTE";
export type ServiceAvailabilityType = "AVAILABLE" | "LIMITED" | "UNAVAILABLE";
export type ServiceVisibilityType = "PUBLIC" | "PRIVATE";

export interface VendorAddOn {
  id: string;
  name: string;
  description?: string;
  pricingType: "FIXED" | "CUSTOM_QUOTE";
  price?: number;
  availability: "AVAILABLE" | "UNAVAILABLE";
}

export interface VendorService {
  id: string;
  name: string;
  category: string;
  shortDescription: string;
  description: string;
  pricingType: PricingType;
  price?: number;
  currency: "INR";
  duration?: string;
  delivery?: string;
  inclusions: string[];
  addOns: VendorAddOn[];
  availability: ServiceAvailabilityType;
  visibility: ServiceVisibilityType;
  featured?: boolean;
  updatedAt: string;
}

export interface VendorServicesSummary {
  totalServices: number;
  publicServices: number;
  availableServices: number;
  startingPrice?: number;
}

export const MOCK_VENDOR_SERVICES: VendorService[] = [
  {
    id: "srv-101",
    name: "The Full Celebration",
    category: "Wedding Photography",
    shortDescription: "Comprehensive multi-event documentary coverage for destination and luxury celebrations.",
    description:
      "Our signature multi-day experience. The Frame House team documents your entire celebration from intimate pre-wedding rituals to the final farewell with an editorial, unobtrusive eye.",
    pricingType: "STARTING_FROM",
    price: 240000,
    currency: "INR",
    duration: "3 Days / Up to 28 Hours",
    delivery: "Edited Digital Gallery (4-6 Weeks) + Signature Fine Art Album",
    inclusions: [
      "Lead Photographer & Senior Associate Photographer",
      "Full coverage of Sangeet, Mehendi, Haldi, & Wedding Ceremony",
      "800+ color-corrected, high-resolution digital photographs",
      "Private online gallery with full resolution downloads & sharing",
      "Pre-wedding creative alignment & lighting consultation",
      "Curated highlights slideshow within 72 hours of wedding",
    ],
    addOns: [
      {
        id: "addon-1",
        name: "Handcrafted Heritage Leather Album",
        description: "30-page flush mount luxury album printed on archival matte paper.",
        pricingType: "FIXED",
        price: 35000,
        availability: "AVAILABLE",
      },
      {
        id: "addon-2",
        name: "Same-Day Preview Gallery",
        description: "First 40 edited frames delivered before the reception dinner.",
        pricingType: "FIXED",
        price: 18000,
        availability: "AVAILABLE",
      },
    ],
    availability: "AVAILABLE",
    visibility: "PUBLIC",
    featured: true,
    updatedAt: "16 Sep 2026",
  },
  {
    id: "srv-102",
    name: "The Essential Story",
    category: "Wedding Photography",
    shortDescription: "Single-day focused documentary coverage for classic wedding ceremonies and receptions.",
    description:
      "Designed for couples desiring thoughtful, honest documentation of their primary wedding day without multi-day commitments.",
    pricingType: "STARTING_FROM",
    price: 120000,
    currency: "INR",
    duration: "1 Day / Up to 10 Hours",
    delivery: "Edited Digital Gallery (3-4 Weeks)",
    inclusions: [
      "Lead Photographer (Riya Mehta) + Associate Photographer",
      "Ceremony, Family Portraits, & Evening Reception Coverage",
      "400+ hand-edited high-resolution digital photographs",
      "Online password-protected viewing & download portal",
      "Pre-wedding timeline planning session",
    ],
    addOns: [
      {
        id: "addon-3",
        name: "Second Senior Photographer",
        description: "Full dual-angle coverage for large guest counts (>250 guests).",
        pricingType: "FIXED",
        price: 25000,
        availability: "AVAILABLE",
      },
      {
        id: "addon-4",
        name: "Parent Mini Albums (Set of 2)",
        description: "Compact 20-page duplicate albums for parents.",
        pricingType: "FIXED",
        price: 22000,
        availability: "AVAILABLE",
      },
    ],
    availability: "AVAILABLE",
    visibility: "PUBLIC",
    featured: false,
    updatedAt: "14 Sep 2026",
  },
  {
    id: "srv-103",
    name: "Pre-Wedding Editorial Session",
    category: "Pre-Wedding",
    shortDescription: "Relaxed portrait session in Mumbai or destination location prior to the wedding festivities.",
    description:
      "A cinematic portrait session designed to capture candid connection in meaningful spaces before the fast-paced wedding week begins.",
    pricingType: "FIXED",
    price: 65000,
    currency: "INR",
    duration: "4 Hours / 2 Locations",
    delivery: "Digital Gallery (2 Weeks)",
    inclusions: [
      "2 wardrobe changes & location styling guidance",
      "60+ retouched high-resolution images",
      "High-res print release",
      "Travel within Mumbai included",
    ],
    addOns: [
      {
        id: "addon-5",
        name: "Stylist & Hair/Makeup Package",
        description: "On-location hair, makeup, and wardrobe styling.",
        pricingType: "CUSTOM_QUOTE",
        availability: "AVAILABLE",
      },
    ],
    availability: "LIMITED",
    visibility: "PUBLIC",
    featured: false,
    updatedAt: "10 Sep 2026",
  },
  {
    id: "srv-104",
    name: "Intimate Celebrations & Elopements",
    category: "Events",
    shortDescription: "Tailored photography service for small gatherings under 75 guests.",
    description:
      "Bespoke coverage crafted specifically for micro-weddings, court marriages, and intimate backyard celebrations.",
    pricingType: "CUSTOM_QUOTE",
    currency: "INR",
    duration: "Custom Hours",
    delivery: "Custom Timeline",
    inclusions: [
      "Customized photographer presence based on event scale",
      "Full digital delivery with print permissions",
      "Personalized shot list consultation",
    ],
    addOns: [],
    availability: "AVAILABLE",
    visibility: "PRIVATE",
    featured: false,
    updatedAt: "05 Sep 2026",
  },
];
