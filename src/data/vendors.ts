export interface Vendor {
  id: string;
  slug: string;
  name: string;
  category: string;
  location: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  featured?: boolean;
}

export const VENDORS_DATA: Vendor[] = [
  {
    id: "the-frame-house",
    slug: "the-frame-house",
    name: "The Frame House",
    category: "Photography",
    location: "Mumbai",
    description:
      "Documentary wedding photography with a quiet, cinematic eye, capturing raw emotions and royal heritage moments.",
    imageSrc: "/images/wedding/wedora-vendor-frame-house.jpg",
    imageAlt: "The Frame House luxury wedding photography portrait",
    featured: true,
  },
  {
    id: "mitti-marigold",
    slug: "mitti-and-marigold",
    name: "Mitti & Marigold",
    category: "Decor & Design",
    location: "Jaipur",
    description:
      "Thoughtful floral and spatial design rooted in Indian craft, heritage mandap design, and immersive scapes.",
    imageSrc: "/images/wedding/wedora-vendor-mitti-marigold.jpg",
    imageAlt: "Mitti & Marigold artisan floral decor and mandap design",
    featured: true,
  },
  {
    id: "house-of-vows",
    slug: "house-of-vows",
    name: "House of Vows",
    category: "Wedding Planning",
    location: "Pune",
    description:
      "Full-service wedding planning, luxury logistics, and calm execution shaped around your story and pace.",
    imageSrc: "/images/wedding/wedora-vendor-house-of-vows.jpg",
    imageAlt: "House of Vows luxury wedding planning team",
    featured: true,
  },
  {
    id: "the-courtyard-estate",
    slug: "the-courtyard-estate",
    name: "The Courtyard Estate",
    category: "Venue",
    location: "Udaipur",
    description:
      "A heritage setting for intimate celebrations and unforgettable evenings with royal lakeside courtyards.",
    imageSrc: "/images/wedding/wedora-vendor-courtyard-estate.jpg",
    imageAlt: "The Courtyard Estate Udaipur luxury wedding venue",
    featured: true,
  },
  {
    id: "saffron-table",
    slug: "saffron-table",
    name: "Saffron Table",
    category: "Catering",
    location: "Goa",
    description:
      "Seasonal menus, royal Indian feasts, and thoughtful hospitality for celebrations of every scale.",
    imageSrc: "/images/wedding/wedora-vendor-saffron-table.jpg",
    imageAlt: "Saffron Table luxury wedding catering spread",
    featured: true,
  },
  {
    id: "atelier-noor",
    slug: "atelier-noor",
    name: "Atelier Noor",
    category: "Bridal & Couture",
    location: "Delhi",
    description:
      "Contemporary bridalwear, royal zardozi embroidery, and timeless bespoke wedding attire.",
    imageSrc: "/images/wedding/wedora-vendor-atelier-noor.jpg",
    imageAlt: "Atelier Noor bridal couture and embroidery details",
    featured: true,
  },
];

export const VENDOR_CATEGORIES = [
  "All Categories",
  "Wedding Planning",
  "Photography",
  "Decor & Design",
  "Venue",
  "Catering",
  "Bridal & Couture",
  "Music & Entertainment",
  "Makeup & Hair",
];

export const VENDOR_LOCATIONS = [
  "All Locations",
  "Mumbai",
  "Pune",
  "Jaipur",
  "Udaipur",
  "Goa",
  "Delhi",
];

export const SORT_OPTIONS = ["Featured", "Name", "Location"];
