export interface FeaturedWedding {
  id: string;
  title: string;
  location: string;
  style: string;
  description: string;
  href: string;
  imageSrc?: string;
  isFeatured?: boolean;
}

export const FEATURED_WEDDINGS_DATA: FeaturedWedding[] = [
  {
    id: "aditi-arjun",
    title: "Aditi & Arjun",
    location: "Udaipur, Rajasthan",
    style: "INTIMATE • HERITAGE",
    description:
      "An intimate celebration shaped by old-world architecture, warm evenings, and thoughtful details.",
    href: "/real-weddings",
    imageSrc: "/images/wedding/wedora-wedding-aditi-arjun.jpg",
    isFeatured: true,
  },
  {
    id: "meera-rohan",
    title: "Meera & Rohan",
    location: "Goa, India",
    style: "COASTAL • MODERN",
    description:
      "A relaxed coastal celebration where contemporary design meets the rhythm of the sea.",
    href: "/real-weddings",
    imageSrc: "/images/wedding/wedora-wedding-meera-rohan.jpg",
    isFeatured: false,
  },
  {
    id: "isha-kunal",
    title: "Isha & Kunal",
    location: "Jaipur, Rajasthan",
    style: "EDITORIAL • TRADITIONAL",
    description:
      "A vibrant celebration balancing timeless traditions with a distinctly modern visual language.",
    href: "/real-weddings",
    imageSrc: "/images/wedding/wedora-wedding-isha-kunal.jpg",
    isFeatured: false,
  },
];
