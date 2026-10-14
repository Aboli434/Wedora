export interface VendorBusinessProfile {
  id: string;
  vendorId: string;
  businessName: string;
  ownerName: string;
  category: string;
  subcategory: string;
  location: string;
  serviceAreas: string[];
  shortDescription: string;
  fullDescription: string;
  yearsInBusiness: number;
  teamSize: number;
  businessEmail: string;
  businessPhone: string;
  website: string;
  instagram: string;
  profileImage: string;
  coverImage: string;
  profileCompletion: number;
  verifiedStatus: boolean;
  publicProfileVisible: boolean;
  preferredContactMethod: "Email" | "Phone" | "WhatsApp";
  allowWedoraEnquiries: boolean;
  showPublicContactDetails: boolean;
  highlights: string[];
}

export const MOCK_VENDOR_BUSINESS_PROFILE: VendorBusinessProfile = {
  id: "vb-101",
  vendorId: "vendor-1",
  businessName: "Wedora Wedding Studio",
  ownerName: "Studio Director",
  category: "Creative Services",
  subcategory: "Wedding & Celebration Studio",
  location: "Bengaluru",
  serviceAreas: ["Bengaluru", "Mumbai", "Pune", "Udaipur", "Goa"],
  shortDescription:
    "Curated luxury experiences for intimate celebrations and grand wedding events.",
  fullDescription:
    "We approach wedding celebrations as timeless artistic storytelling. Our studio focuses on honest emotion, thoughtful coordination, and the small details that make each celebration memorable.",
  yearsInBusiness: 6,
  teamSize: 5,
  businessEmail: "studio@wedora.example.com",
  businessPhone: "+91 98200 99887",
  website: "https://studio.wedora.in",
  instagram: "@wedora_studio",
  profileImage: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80&w=600",
  coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200",
  profileCompletion: 88,
  verifiedStatus: true,
  publicProfileVisible: true,
  preferredContactMethod: "WhatsApp",
  allowWedoraEnquiries: true,
  showPublicContactDetails: true,
  highlights: [
    "Luxury curation",
    "Intimate celebrations",
    "Artistic direction",
    "Destination weddings",
    "Bespoke experience",
  ],
};
