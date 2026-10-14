import { CategoryType } from "@prisma/client";

export interface VendorCategoryInfo {
  type: CategoryType;
  label: string;
  description: string;
  defaultServiceName: string;
  sampleEnquiryService: string;
  sampleBookingPackage: string;
  unitTerm: string; // e.g. "Event", "Shoot", "Performance", "Session"
}

export const VENDOR_CATEGORY_DEFINITIONS: Record<CategoryType, VendorCategoryInfo> = {
  CHOREOGRAPHY: {
    type: "CHOREOGRAPHY",
    label: "Dance & Choreography",
    description: "Sangeet choreography, couple dance rehearsals, and stage direction",
    defaultServiceName: "Sangeet & Couple Dance Choreography",
    sampleEnquiryService: "Full Sangeet Dance & Stage Choreography",
    sampleBookingPackage: "Complete Sangeet Direction & 10 Rehearsal Sessions",
    unitTerm: "Performance",
  },
  DJ_SOUND: {
    type: "DJ_SOUND",
    label: "DJ & Music Entertainment",
    description: "Live wedding DJs, sound engineering, acoustic artists, and afterparty music",
    defaultServiceName: "Live DJ & Afterparty Sound Production",
    sampleEnquiryService: "Sangeet & Reception DJ Live Set",
    sampleBookingPackage: "Full Sound Rig, Lights & 6-Hour DJ Performance",
    unitTerm: "Gig",
  },
  PHOTOGRAPHY: {
    type: "PHOTOGRAPHY",
    label: "Photography",
    description: "Fine art, candid documentary, and traditional wedding photography",
    defaultServiceName: "Full Wedding Photography & Candid Coverage",
    sampleEnquiryService: "Full Wedding Photography & Candid Portraits",
    sampleBookingPackage: "3-Day Destination Candid Photography Coverage",
    unitTerm: "Shoot",
  },
  VIDEOGRAPHY: {
    type: "VIDEOGRAPHY",
    label: "Videography & Cinema",
    description: "Cinematic wedding films, teasers, and drone aerial cinematography",
    defaultServiceName: "Cinematic Wedding Film & Teaser",
    sampleEnquiryService: "Multi-Day Wedding Film & Drone Coverage",
    sampleBookingPackage: "Full Feature 4K Film + 60s Instagram Teaser",
    unitTerm: "Film",
  },
  PLANNERS: {
    type: "PLANNERS",
    label: "Wedding Planning",
    description: "Full-service wedding planning, luxury logistics, and hospitality coordination",
    defaultServiceName: "Full-Service Luxury Wedding Planning",
    sampleEnquiryService: "Complete Destination Wedding Planning & Hospitality",
    sampleBookingPackage: "Turnkey 3-Day Wedding Planning & Vendor Management",
    unitTerm: "Event",
  },
  DECOR: {
    type: "DECOR",
    label: "Decor & Design",
    description: "Floral installations, mandap styling, and immersive event scapes",
    defaultServiceName: "Mandap Design & Floral Event Styling",
    sampleEnquiryService: "Bespoke Royal Mandap & Sangeet Stage Decor",
    sampleBookingPackage: "Multi-Day Spatial Design, Lighting & Floral Scapes",
    unitTerm: "Setup",
  },
  VENUE: {
    type: "VENUE",
    label: "Venues",
    description: "Heritage palaces, luxury resorts, and bespoke banquet spaces",
    defaultServiceName: "Heritage Courtyard & Banquet Rental",
    sampleEnquiryService: "Palace Lakeside Courtyard Booking",
    sampleBookingPackage: "3-Day Heritage Palace & Royal Banquet Grounds",
    unitTerm: "Booking",
  },
  CATERING: {
    type: "CATERING",
    label: "Catering",
    description: "Gourmet wedding catering, live culinary stations, and royal feasts",
    defaultServiceName: "Gourmet Wedding Feast & Live Food Stations",
    sampleEnquiryService: "Multi-Cuisine Royal Banquet Catering (500 Guests)",
    sampleBookingPackage: "3-Day Wedding Feast with 8 Live Global Counters",
    unitTerm: "Feast",
  },
  MAKEUP: {
    type: "MAKEUP",
    label: "Makeup & Hair",
    description: "Bridal glam, hairstyling, and multi-occasion beauty curation",
    defaultServiceName: "Bridal HD/Airbrush Makeup & Hair Styling",
    sampleEnquiryService: "Bridal Sangeet & Pheras Glam Package",
    sampleBookingPackage: "Complete 3-Look Bridal Transformation & Hair Art",
    unitTerm: "Session",
  },
  MEHNDI: {
    type: "MEHNDI",
    label: "Mehndi Artist",
    description: "Bridal henna, traditional Marwari patterns, and organic dark stain mehndi",
    defaultServiceName: "Bespoke Bridal Henna & Figure Work",
    sampleEnquiryService: "Intricate Bridal Arms & Feet Henna",
    sampleBookingPackage: "Bridal Signature Henna + 20 Guest Applications",
    unitTerm: "Session",
  },
  INVITATIONS: {
    type: "INVITATIONS",
    label: "Invitations & Stationery",
    description: "Digital invites, wax-sealed stationery, and luxury wedding hampers",
    defaultServiceName: "Bespoke Wax-Sealed Invitations & Digital Suite",
    sampleEnquiryService: "Custom Heritage Boxed Invitations (200 Sets)",
    sampleBookingPackage: "Complete Invitation Suite, RSVP Website & Luggage Tags",
    unitTerm: "Order",
  },
  ATTIRE: {
    type: "ATTIRE",
    label: "Bridal & Couture",
    description: "Designer bridal lehengas, sherwanis, and luxury wedding couture",
    defaultServiceName: "Custom Handcrafted Bridal Couture & Styling",
    sampleEnquiryService: "Bespoke Hand-Embroidered Velvet Zardozi Lehenga",
    sampleBookingPackage: "Custom Couple Couture: Bridal Lehenga & Groom Sherwani",
    unitTerm: "Piece",
  },
  GIFTS: {
    type: "GIFTS",
    label: "Favors & Gifts",
    description: "Curated return gifts, welcome hampers, and bridal party boxes",
    defaultServiceName: "Artisanal Curated Wedding Welcome Boxes",
    sampleEnquiryService: "Luxury Guest Welcome Hampers (150 Boxes)",
    sampleBookingPackage: "Customized Artisanal Favors with Monogrammed Keepsakes",
    unitTerm: "Order",
  },
  OTHER: {
    type: "OTHER",
    label: "Other Wedding Services",
    description: "Specialty wedding experiences, entertainment, and artisanal services",
    defaultServiceName: "Specialized Wedding Experience Service",
    sampleEnquiryService: "Custom Wedding Entertainment & Performance",
    sampleBookingPackage: "Full Wedding Weekend Artisanal Service",
    unitTerm: "Service",
  },
};

/**
 * Standard category options for UI dropdowns
 */
export const VENDOR_CATEGORY_OPTIONS = Object.values(VENDOR_CATEGORY_DEFINITIONS).map((def) => ({
  value: def.type,
  label: def.label,
  description: def.description,
}));

/**
 * Human-readable category label from enum or raw string
 */
export function formatVendorCategory(category?: string | null): string {
  if (!category) return "Wedding Services";

  const upper = category.toUpperCase().trim();
  if (upper in VENDOR_CATEGORY_DEFINITIONS) {
    return VENDOR_CATEGORY_DEFINITIONS[upper as CategoryType].label;
  }

  // Check if string matches any known label or alias
  const parsed = parseVendorCategory(category);
  return VENDOR_CATEGORY_DEFINITIONS[parsed]?.label || category;
}

/**
 * Robust parser converting arbitrary category text/alias into standard Prisma CategoryType
 */
export function parseVendorCategory(input?: string | null): CategoryType {
  if (!input) return CategoryType.OTHER;

  const normalized = input.trim().toLowerCase();

  // 1. Exact enum match
  const upper = input.trim().toUpperCase();
  if (Object.values(CategoryType).includes(upper as CategoryType)) {
    return upper as CategoryType;
  }

  // 2. Dance & Choreography
  if (
    normalized.includes("dance") ||
    normalized.includes("choreo") ||
    normalized.includes("sangeet") ||
    normalized.includes("dancing") ||
    normalized.includes("troupe") ||
    (normalized.includes("entertainment") && !normalized.includes("dj") && !normalized.includes("music"))
  ) {
    return CategoryType.CHOREOGRAPHY;
  }

  // 3. DJ & Music Entertainment
  if (
    normalized.includes("dj") ||
    normalized.includes("music") ||
    normalized.includes("sound") ||
    normalized.includes("band") ||
    normalized.includes("acoustic") ||
    normalized.includes("singer") ||
    normalized.includes("orchestra")
  ) {
    return CategoryType.DJ_SOUND;
  }

  // 4. Photography
  if (
    normalized.includes("photo") ||
    normalized.includes("candid") ||
    normalized.includes("photographer") ||
    normalized.includes("portrait")
  ) {
    return CategoryType.PHOTOGRAPHY;
  }

  // 5. Videography & Cinema
  if (
    normalized.includes("video") ||
    normalized.includes("cinema") ||
    normalized.includes("film") ||
    normalized.includes("drone")
  ) {
    return CategoryType.VIDEOGRAPHY;
  }

  // 6. Planners
  if (
    normalized.includes("plan") ||
    normalized.includes("event management") ||
    normalized.includes("coordinator") ||
    normalized.includes("curator")
  ) {
    return CategoryType.PLANNERS;
  }

  // 7. Decor & Design
  if (
    normalized.includes("decor") ||
    normalized.includes("design") ||
    normalized.includes("mandap") ||
    normalized.includes("floral") ||
    normalized.includes("flower")
  ) {
    return CategoryType.DECOR;
  }

  // 8. Venues
  if (
    normalized.includes("venue") ||
    normalized.includes("palace") ||
    normalized.includes("resort") ||
    normalized.includes("banquet") ||
    normalized.includes("hotel") ||
    normalized.includes("lawn") ||
    normalized.includes("hall")
  ) {
    return CategoryType.VENUE;
  }

  // 9. Catering
  if (
    normalized.includes("cater") ||
    normalized.includes("food") ||
    normalized.includes("beverage") ||
    normalized.includes("culinary") ||
    normalized.includes("feast") ||
    normalized.includes("chef")
  ) {
    return CategoryType.CATERING;
  }

  // 10. Makeup & Hair
  if (
    normalized.includes("makeup") ||
    normalized.includes("hair") ||
    normalized.includes("mua") ||
    normalized.includes("beauty") ||
    normalized.includes("glam") ||
    normalized.includes("salon")
  ) {
    return CategoryType.MAKEUP;
  }

  // 11. Mehndi
  if (
    normalized.includes("mehndi") ||
    normalized.includes("mehendi") ||
    normalized.includes("henna")
  ) {
    return CategoryType.MEHNDI;
  }

  // 12. Invitations
  if (
    normalized.includes("invit") ||
    normalized.includes("card") ||
    normalized.includes("stationery") ||
    normalized.includes("e-invite")
  ) {
    return CategoryType.INVITATIONS;
  }

  // 13. Attire / Bridal
  if (
    normalized.includes("bridal") ||
    normalized.includes("couture") ||
    normalized.includes("attire") ||
    normalized.includes("lehenga") ||
    normalized.includes("sherwani") ||
    normalized.includes("wardrobe") ||
    normalized.includes("groom") ||
    normalized.includes("wear")
  ) {
    return CategoryType.ATTIRE;
  }

  // 14. Gifts / Favors
  if (
    normalized.includes("gift") ||
    normalized.includes("favor") ||
    normalized.includes("hamper")
  ) {
    return CategoryType.GIFTS;
  }

  return CategoryType.OTHER;
}

/**
 * Returns tailored category definitions for dynamic dashboard display
 */
export function getCategoryDefinition(category?: string | null): VendorCategoryInfo {
  const parsed = parseVendorCategory(category);
  return VENDOR_CATEGORY_DEFINITIONS[parsed] || VENDOR_CATEGORY_DEFINITIONS.OTHER;
}
