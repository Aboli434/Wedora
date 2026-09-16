export interface FeaturedVendor {
  id: string;
  number: string;
  name: string;
  category: string;
  location: string;
  description: string;
  href: string;
  imageSrc?: string;
}

export const FEATURED_VENDORS_DATA: FeaturedVendor[] = [
  {
    id: "the-frame-house",
    number: "01",
    name: "The Frame House",
    category: "PHOTOGRAPHY",
    location: "Mumbai, Maharashtra",
    description: "Documentary wedding photography with a quiet, cinematic eye.",
    href: "/vendors",
    imageSrc: "/images/wedding/wedora-vendor-frame-house.jpg",
  },
  {
    id: "mitti-marigold",
    number: "02",
    name: "Mitti & Marigold",
    category: "DECOR & DESIGN",
    location: "Jaipur, Rajasthan",
    description: "Thoughtful floral and spatial design rooted in Indian craft.",
    href: "/vendors",
    imageSrc: "/images/wedding/wedora-vendor-mitti-marigold.jpg",
  },
  {
    id: "house-of-vows",
    number: "03",
    name: "House of Vows",
    category: "PLANNING",
    location: "Pune, Maharashtra",
    description: "Full-service wedding planning shaped around your story and pace.",
    href: "/vendors",
    imageSrc: "/images/wedding/wedora-vendor-house-of-vows.jpg",
  },
  {
    id: "the-courtyard-estate",
    number: "04",
    name: "The Courtyard Estate",
    category: "VENUE",
    location: "Udaipur, Rajasthan",
    description:
      "A heritage setting for intimate celebrations and unforgettable evenings.",
    href: "/vendors",
    imageSrc: "/images/wedding/wedora-vendor-courtyard-estate.jpg",
  },
  {
    id: "saffron-table",
    number: "05",
    name: "Saffron Table",
    category: "CATERING",
    location: "Goa, India",
    description:
      "Seasonal menus and thoughtful hospitality for celebrations of every scale.",
    href: "/vendors",
    imageSrc: "/images/wedding/wedora-vendor-saffron-table.jpg",
  },
  {
    id: "atelier-noor",
    number: "06",
    name: "Atelier Noor",
    category: "BRIDAL & COUTURE",
    location: "Delhi, India",
    description:
      "Contemporary bridalwear balancing tradition, texture, and individuality.",
    href: "/vendors",
    imageSrc: "/images/wedding/wedora-vendor-atelier-noor.jpg",
  },
];
