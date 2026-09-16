export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: string;
  location?: string;
  aspectRatio?: string;
  spanClass?: string;
}

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: "gallery-01",
    src: "/images/wedding/wedora-gallery-01.jpg",
    alt: "Indian bride and groom sharing a candid wedding moment",
    category: "MOMENTS",
    location: "Udaipur, Rajasthan",
    spanClass: "lg:col-span-7 lg:row-span-2 aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/11]",
  },
  {
    id: "gallery-02",
    src: "/images/wedding/wedora-gallery-02.jpg",
    alt: "Elegant Indian wedding ceremony beneath a floral mandap",
    category: "CEREMONY",
    location: "Jaipur, Rajasthan",
    spanClass: "lg:col-span-5 aspect-[4/3]",
  },
  {
    id: "gallery-03",
    src: "/images/wedding/wedora-gallery-03.jpg",
    alt: "Detailed bridal jewellery and embroidered wedding attire",
    category: "COUTURE",
    location: "Delhi, India",
    spanClass: "lg:col-span-5 lg:row-span-2 aspect-[3/4]",
  },
  {
    id: "gallery-04",
    src: "/images/wedding/wedora-gallery-04.jpg",
    alt: "Luxury Indian wedding tablescape with candlelight and flowers",
    category: "DETAILS",
    location: "Goa, India",
    spanClass: "lg:col-span-7 aspect-[16/9]",
  },
  {
    id: "gallery-05",
    src: "/images/wedding/wedora-gallery-05.jpg",
    alt: "Guests celebrating at a warm evening wedding reception",
    category: "CELEBRATION",
    location: "Pune, Maharashtra",
    spanClass: "lg:col-span-6 aspect-[4/3]",
  },
  {
    id: "gallery-06",
    src: "/images/wedding/wedora-gallery-06.jpg",
    alt: "Heritage Indian palace courtyard prepared for a wedding celebration",
    category: "ARCHITECTURE",
    location: "Udaipur, Rajasthan",
    spanClass: "lg:col-span-6 aspect-[4/3]",
  },
];
