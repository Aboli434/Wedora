export type BlogCategory =
  | "PLANNING"
  | "VENDORS"
  | "INSPIRATION"
  | "DETAILS"
  | "CHECKLISTS";

export interface ArticleSection {
  heading?: string;
  paragraphs: string[];
  quote?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  readTime: string;
  date: string;
  imageSrc: string;
  imageAlt: string;
  featured?: boolean;
  sections: ArticleSection[];
}

export const BLOG_CATEGORIES: ("ALL" | BlogCategory)[] = [
  "ALL",
  "PLANNING",
  "VENDORS",
  "INSPIRATION",
  "DETAILS",
  "CHECKLISTS",
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "post-1",
    slug: "how-to-begin-planning-a-wedding-that-feels-like-yours",
    title: "How to begin planning a wedding that actually feels like yours",
    excerpt:
      "Before timelines, venues, and vendor lists, there is a more important starting point: understanding what you want the celebration to feel like.",
    category: "PLANNING",
    readTime: "08 MIN READ",
    date: "SEP 15, 2026",
    imageSrc: "/images/wedding/wedora-hero-wedding.jpg",
    imageAlt: "Royal heritage wedding courtyard celebration in Rajasthan",
    featured: true,
    sections: [
      {
        heading: "Start with Atmosphere, Not Logistics",
        paragraphs: [
          "Most wedding planning guides tell you to start with spreadsheets, guest lists, and budget breakdowns. While those practical elements are essential later, starting with logistics often leads to an overwhelming sense of obligation.",
          "Instead, begin by asking a simpler question: When your guests step into the room, how do you want them to feel? Do you imagine an intimate candlelit conversation across a long wooden table, or a high-energy evening under open skies filled with sitar music and laughter?",
        ],
        quote:
          "A celebration should feel like an organic extension of your shared life, not a theatrical performance for an audience.",
      },
      {
        heading: "Identify What Matters Most to You Both",
        paragraphs: [
          "Every couple has two or three non-negotiables — elements that anchor the memory of the day. For some, it is exceptional culinary hospitality and rare regional dishes. For others, it is unhurried time with family in a quiet heritage estate.",
          "When you identify these core anchors early, every subsequent decision becomes much clearer. You learn where to dedicate energy and resources, and where you can gracefully step back.",
        ],
        imageSrc: "/images/wedding/wedora-philosophy-bride.jpg",
        imageAlt: "Intimate bride preparation moment with delicate jewelry details",
      },
      {
        heading: "Designing for Presence",
        paragraphs: [
          "Ultimately, good planning is invisible. The highest compliment a wedding can receive is not how lavish it looked, but how present the couple was within it. By structuring your timeline with intentional breathing room, you allow spontaneous, unforgettable moments to happen naturally.",
        ],
      },
    ],
  },
  {
    id: "post-2",
    slug: "questions-to-ask-before-choosing-wedding-venue",
    title: "The questions to ask before choosing your wedding venue",
    excerpt:
      "A venue sets the tone for every event. Beyond aesthetics and capacity, here are the essential considerations for heritage and coastal spaces.",
    category: "PLANNING",
    readTime: "06 MIN READ",
    date: "SEP 12, 2026",
    imageSrc: "/images/wedding/wedora-vendor-courtyard-estate.jpg",
    imageAlt: "Palatial Udaipur courtyard illuminated by evening candles",
    featured: false,
    sections: [
      {
        heading: "Spatial Flow Across Multiple Events",
        paragraphs: [
          "Indian weddings often span several days with distinct rituals. When visiting a venue, look beyond the main ballroom. Does the property offer contrasting spaces so that your Mehendi, Sangeet, and Pheras ceremonies feel visually distinct?",
          "Ensure that guest movement between spaces feels intuitive. A venue with natural transitions between open courtyards and covered pavillions prevents fatigue and maintains excitement.",
        ],
      },
      {
        heading: "Lighting & Acoustic Characteristics",
        paragraphs: [
          "Heritage stone structures and coastal open-air lawns react very differently to light and sound. Inquire about sunset angles during your wedding month and check local noise curfew regulations for evening music.",
        ],
        quote: "The right venue enhances natural light and architectural character, reducing the need for heavy production overlay.",
      },
    ],
  },
  {
    id: "post-3",
    slug: "finding-vendors-whose-work-feels-right",
    title: "Finding vendors whose work feels right for your celebration",
    excerpt:
      "Curating a creative team is about shared sensibilities. Learn how to evaluate photography, floral, and culinary artists beyond portfolio stills.",
    category: "VENDORS",
    readTime: "05 MIN READ",
    date: "SEP 08, 2026",
    imageSrc: "/images/wedding/wedora-service-vendors.jpg",
    imageAlt: "Artisan floral mandap installation and craftsmanship",
    featured: false,
    sections: [
      {
        heading: "Alignment of Style & Temperament",
        paragraphs: [
          "Your vendors will be by your side during some of the most intimate moments of your life. When speaking with photographers or planners, pay attention to their presence and communication style as much as their aesthetic talent.",
          "Seek partners who listen deeply, understand your rhythm, and bring a sense of calm clarity to the planning process.",
        ],
      },
    ],
  },
  {
    id: "post-4",
    slug: "small-details-that-quietly-transform-a-wedding",
    title: "Small details that quietly transform a wedding",
    excerpt:
      "From bespoke stationery motifs to atmospheric lighting, explore how subtle choices create memorable guest experiences.",
    category: "DETAILS",
    readTime: "04 MIN READ",
    date: "SEP 04, 2026",
    imageSrc: "/images/wedding/wedora-gallery-01.jpg",
    imageAlt: "Bridal stationery, heirloom embroidery, and fine jewelry details",
    featured: false,
    sections: [
      {
        heading: "The Power of Tactile Elements",
        paragraphs: [
          "Long after the music fades, guests remember the tactile nuances — handwoven linen napkins, letterpress calligraphy on textured paper, and custom fragrances infused in evening flower garlands.",
        ],
      },
    ],
  },
  {
    id: "post-5",
    slug: "a-calmer-way-to-build-your-wedding-checklist",
    title: "A calmer way to build your wedding checklist",
    excerpt:
      "Replace overwhelming task lists with phased milestone planning that gives every decision room to breathe.",
    category: "CHECKLISTS",
    readTime: "07 MIN READ",
    date: "AUG 28, 2026",
    imageSrc: "/images/wedding/wedora-service-budget.jpg",
    imageAlt: "Planning notebook, checklist, and stationery flat-lay",
    featured: false,
    sections: [
      {
        heading: "Phased Decision Making",
        paragraphs: [
          "Trying to decide on floral varieties, guest favors, and playlist sequences six months in advance creates unnecessary mental fatigue. Group your checklist into distinct phases: Foundation, Curation, and Refinement.",
        ],
      },
    ],
  },
  {
    id: "post-6",
    slug: "from-inspiration-to-direction-making-a-moodboard-useful",
    title: "From inspiration to direction: making a moodboard useful",
    excerpt:
      "How to filter thousands of saved images into a cohesive visual direction for your decor, attire, and stationery designers.",
    category: "INSPIRATION",
    readTime: "05 MIN READ",
    date: "AUG 21, 2026",
    imageSrc: "/images/wedding/wedora-vendor-mitti-marigold.jpg",
    imageAlt: "High-fashion floral decor setup in Jaipur palace",
    featured: false,
    sections: [
      {
        heading: "Curating a Single Palette & Texture Story",
        paragraphs: [
          "A great moodboard is not a collection of everything you like; it is a discipline of editing out what does not belong. Limit your board to 10 images that evoke the texture, lighting, and mood you desire.",
        ],
      },
    ],
  },
  {
    id: "post-7",
    slug: "what-to-consider-when-planning-multiple-events",
    title: "What to consider when planning multiple wedding events",
    excerpt:
      "Balancing pacing, guest comfort, and distinct aesthetics across multi-day Indian celebrations without exhaustion.",
    category: "PLANNING",
    readTime: "06 MIN READ",
    date: "AUG 14, 2026",
    imageSrc: "/images/wedding/wedora-service-events.jpg",
    imageAlt: "Open-air evening guest gathering and courtyard celebration",
    featured: false,
    sections: [
      {
        heading: "Pacing & Buffer Windows",
        paragraphs: [
          "Schedule generous buffer hours between afternoon ceremonies and evening receptions. This allows your family to rest, refresh, and arrive feeling excited rather than rushed.",
        ],
      },
    ],
  },
  {
    id: "post-8",
    slug: "difference-between-beautiful-and-meaningful-design",
    title: "The difference between beautiful and meaningful wedding design",
    excerpt:
      "Why personal story, local heritage, and human connection will always outshine generic decorative trends.",
    category: "INSPIRATION",
    readTime: "05 MIN READ",
    date: "AUG 07, 2026",
    imageSrc: "/images/wedding/wedora-vendor-atelier-noor.jpg",
    imageAlt: "Bespoke bridal couture zardozi embroidery details",
    featured: false,
    sections: [
      {
        heading: "Design with Purpose",
        paragraphs: [
          "Meaningful design tells a story. Whether incorporating family heirlooms into mandap drapes or sourcing regional flowers from local growers, intention creates warmth that guests can truly feel.",
        ],
      },
    ],
  },
];
