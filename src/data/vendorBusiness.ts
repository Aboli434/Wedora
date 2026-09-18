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
  businessName: "The Frame House",
  ownerName: "Riya Mehta",
  category: "Photography",
  subcategory: "Wedding & Portrait Studio",
  location: "Mumbai",
  serviceAreas: ["Mumbai", "Pune", "Udaipur", "Jaipur", "Goa"],
  shortDescription:
    "Documentary-led photography for intimate celebrations and honest moments.",
  fullDescription:
    "The Frame House approaches wedding photography as visual storytelling rather than a checklist of poses. The studio focuses on honest emotion, thoughtful compositions, and the small details that make each celebration feel personal.",
  yearsInBusiness: 8,
  teamSize: 6,
  businessEmail: "riya@demo-theframehouse.com",
  businessPhone: "+91 98200 99887",
  website: "https://demo-theframehouse.com",
  instagram: "@demo_theframehouse",
  profileImage: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80&w=600",
  coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200",
  profileCompletion: 88,
  verifiedStatus: true,
  publicProfileVisible: true,
  preferredContactMethod: "WhatsApp",
  allowWedoraEnquiries: true,
  showPublicContactDetails: true,
  highlights: [
    "Documentary storytelling",
    "Intimate celebrations",
    "Candid photography",
    "Destination weddings",
    "Thoughtful visual direction",
  ],
};
