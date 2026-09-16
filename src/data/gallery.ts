export type GalleryCategory = "CELEBRATIONS" | "DETAILS" | "PEOPLE" | "PLACES";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
  title: string;
  caption: string;
  location?: string;
  aspect?: "portrait" | "landscape" | "square";
  spanClass?: string;
}

export type GalleryItem = GalleryImage;

export const GALLERY_CATEGORIES = [
  "ALL",
  "CELEBRATIONS",
  "DETAILS",
  "PEOPLE",
  "PLACES",
] as const;

export const GALLERY_DATA: GalleryImage[] = [
  {
    id: "gallery-01",
    src: "/images/wedding/wedora-gallery-01.jpg",
    alt: "Detailed Indian bridal adornments, jewelry, and heirloom embroidery",
    category: "DETAILS",
    title: "Bridal Adornments",
    caption: "Intimate jewelry and heirloom details before the ceremony.",
    aspect: "portrait",
    spanClass: "lg:col-span-4 lg:row-span-2 aspect-[3/4]",
  },
  {
    id: "gallery-02",
    src: "/images/wedding/wedora-gallery-02.jpg",
    alt: "Golden hour light across heritage palatial courtyards in Rajasthan",
    category: "PLACES",
    title: "Courtyard Architecture",
    caption: "Golden hour across heritage palatial courtyards.",
    aspect: "landscape",
    spanClass: "lg:col-span-8 aspect-[16/10]",
  },
  {
    id: "gallery-03",
    src: "/images/wedding/wedora-gallery-03.jpg",
    alt: "Handwoven marigold garlands and mandap floral design",
    category: "DETAILS",
    title: "Artisan Florals",
    caption: "Handwoven marigolds and bespoke mandap installations.",
    aspect: "landscape",
    spanClass: "lg:col-span-8 aspect-[16/9]",
  },
  {
    id: "gallery-04",
    src: "/images/wedding/wedora-gallery-04.jpg",
    alt: "Candid glances and unscripted emotional moments between family",
    category: "PEOPLE",
    title: "Unscripted Emotion",
    caption: "Quiet glances and candid joy shared between family.",
    aspect: "portrait",
    spanClass: "lg:col-span-4 aspect-[3/4]",
  },
  {
    id: "gallery-05",
    src: "/images/wedding/wedora-gallery-05.jpg",
    alt: "Sunset Pheras ceremony surrounding the sacred fire in Udaipur",
    category: "CELEBRATIONS",
    title: "Pheras Ceremony",
    caption: "Sunset vows surrounding the sacred fire in Udaipur.",
    aspect: "landscape",
    spanClass: "lg:col-span-6 aspect-[16/10]",
  },
  {
    id: "gallery-06",
    src: "/images/wedding/wedora-gallery-06.jpg",
    alt: "Evening illuminations and sitar melodies under open midnight skies",
    category: "CELEBRATIONS",
    title: "Evening Illuminations",
    caption: "Lanterns and sitar melodies under open midnight skies.",
    aspect: "landscape",
    spanClass: "lg:col-span-6 aspect-[16/10]",
  },
];
