export interface StorySection {
  title: string;
  subtitle?: string;
  content: string;
  imageSrc?: string;
  imageAlt?: string;
}

export interface WeddingStory {
  id: string;
  slug: string;
  couple: string;
  title: string;
  location: string;
  setting: string;
  style: string;
  tags: string[];
  description: string;
  imageSrc: string;
  imageAlt: string;
  featured?: boolean;
  sections?: StorySection[];
}

export const REAL_WEDDINGS_DATA: WeddingStory[] = [
  {
    id: "aditi-arjun",
    slug: "aditi-and-arjun",
    couple: "Aditi & Arjun",
    title: "An intimate celebration rooted in heritage.",
    location: "Udaipur, Rajasthan",
    setting: "INTIMATE • HERITAGE",
    style: "Heritage",
    tags: ["Heritage", "Intimate"],
    description:
      "A quiet celebration shaped by old-world architecture, warm details, and the people closest to them.",
    imageSrc: "/images/wedding/wedora-wedding-aditi-arjun.jpg",
    imageAlt: "Aditi & Arjun intimate heritage wedding portrait in Udaipur",
    featured: true,
    sections: [
      {
        title: "THE SETTING",
        subtitle: "A Heritage Sanctuary by Lake Pichola",
        content:
          "Set amidst centuries-old stone arches, hand-carved pillars, and the quiet waters of Udaipur, Aditi and Arjun chose a place that felt timeless. Rather than overwhelming the venue with heavy production, every floral touch and candle alcove was designed to complement the natural grandeur of the courtyard.",
        imageSrc: "/images/wedding/wedora-vendor-courtyard-estate.jpg",
        imageAlt: "Palatial Udaipur courtyard illuminated with candlelight",
      },
      {
        title: "THE FEELING",
        subtitle: "Unhurried Moments & Intimate Gatherings",
        content:
          "The three-day celebration unfolded at an unhurried pace. From a serene sunset Pheras ceremony to an evening under open skies filled with traditional sitar melodies, guests were invited to experience the heritage of Rajasthan through warmth, conversation, and quiet elegance.",
      },
      {
        title: "THE DETAILS",
        subtitle: "Crafted with Intention and Memory",
        content:
          "Custom letterpress stationery adorned with local block-print motifs, handwoven marigold garlands, and a curated menu of regal Mewari recipes ensured that every touchpoint reflected the couple's appreciation for craftsmanship and family heritage.",
        imageSrc: "/images/wedding/wedora-service-planning.jpg",
        imageAlt: "Intimate wedding mandap and floral details",
      },
    ],
  },
  {
    id: "meera-rohan",
    slug: "meera-and-rohan",
    couple: "Meera & Rohan",
    title: "A coastal celebration with a modern rhythm.",
    location: "Goa, India",
    setting: "COASTAL • MODERN",
    style: "Coastal",
    tags: ["Coastal", "Modern"],
    description:
      "An easygoing celebration where ocean light, contemporary details, and a close-knit gathering came together naturally.",
    imageSrc: "/images/wedding/wedora-wedding-meera-rohan.jpg",
    imageAlt: "Meera & Rohan coastal sunset wedding celebration in Goa",
    featured: false,
    sections: [
      {
        title: "THE SETTING",
        subtitle: "Where Ocean Light Meets Minimal Design",
        content:
          "Overlooking the Arabian Sea, Meera and Rohan’s celebration embraced the natural beauty of Goa’s coastline. Open-air wooden structures, muted ivory drapery, and subtle rattan accents allowed the sea breeze and golden evening light to take center stage.",
        imageSrc: "/images/wedding/wedora-vendor-saffron-table.jpg",
        imageAlt: "Coastal dining setup by the sea",
      },
      {
        title: "THE FEELING",
        subtitle: "Effortless Warmth & Contemporary Joy",
        content:
          "Designed for relaxation and togetherness, the celebration stripped away formal rigidity in favor of bare-foot luxury, barefoot dancing on the sand, and acoustic melodies echoing into the night.",
      },
      {
        title: "THE DETAILS",
        subtitle: "Artisanal Textures & Coastal Flavors",
        content:
          "From a seafood-infused fusion menu to handwritten linen place cards and minimalist white floral arrangements, every detail was chosen to feel light, organic, and deeply personal.",
        imageSrc: "/images/wedding/wedora-service-events.jpg",
        imageAlt: "Open air evening celebration details",
      },
    ],
  },
  {
    id: "isha-kunal",
    slug: "isha-and-kunal",
    couple: "Isha & Kunal",
    title: "Tradition, interpreted through an editorial lens.",
    location: "Jaipur, Rajasthan",
    setting: "EDITORIAL • TRADITIONAL",
    style: "Editorial",
    tags: ["Traditional", "Editorial"],
    description:
      "A celebration balancing familiar traditions with considered design, intimate moments, and a distinctly modern visual language.",
    imageSrc: "/images/wedding/wedora-wedding-isha-kunal.jpg",
    imageAlt: "Isha & Kunal editorial wedding portrait in Jaipur",
    featured: false,
    sections: [
      {
        title: "THE SETTING",
        subtitle: "A Grand Palace Reframed for Today",
        content:
          "Staged within a royal Pink City estate, Isha and Kunal’s wedding brought rich Indian wedding traditions together with sharp graphic layouts, monochromatic floral color blocks, and editorial lighting techniques.",
        imageSrc: "/images/wedding/wedora-vendor-mitti-marigold.jpg",
        imageAlt: "High fashion floral installation in Jaipur palace",
      },
      {
        title: "THE FEELING",
        subtitle: "High Drama Meets Quiet Intimacy",
        content:
          "The celebration struck a perfect balance between grand royal scale and private emotional moments. High-energy Baraat processions gave way to quiet, candlelit vow exchanges in private courtyards.",
      },
      {
        title: "THE DETAILS",
        subtitle: "High Couture & Considered Aesthetics",
        content:
          "Custom zardozi attire by master artisans, editorial photo portrait stations, and elevated royal dining created an unforgettable sensory experience for every guest.",
        imageSrc: "/images/wedding/wedora-vendor-atelier-noor.jpg",
        imageAlt: "Bespoke bridal couture and embroidery details",
      },
    ],
  },
];

export const WEDDING_FILTER_TAGS = [
  "All",
  "Heritage",
  "Coastal",
  "Modern",
  "Traditional",
  "Intimate",
  "Editorial",
];
