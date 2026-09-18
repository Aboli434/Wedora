import { VendorBusinessProfile } from "@/data/vendorBusiness";

export interface BusinessValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateBusinessProfile(
  profile: VendorBusinessProfile
): BusinessValidationResult {
  const errors: Record<string, string> = {};

  if (!profile.businessName || profile.businessName.trim() === "") {
    errors.businessName = "Business name is required.";
  }

  if (!profile.ownerName || profile.ownerName.trim() === "") {
    errors.ownerName = "Owner / primary contact name is required.";
  }

  if (!profile.category || profile.category.trim() === "") {
    errors.category = "Category is required.";
  }

  if (!profile.location || profile.location.trim() === "") {
    errors.location = "Primary location is required.";
  }

  if (!profile.shortDescription || profile.shortDescription.trim() === "") {
    errors.shortDescription = "Short description is required.";
  } else if (profile.shortDescription.length > 180) {
    errors.shortDescription = "Short description cannot exceed 180 characters.";
  }

  if (!profile.fullDescription || profile.fullDescription.trim() === "") {
    errors.fullDescription = "Full description is required.";
  } else if (profile.fullDescription.length > 800) {
    errors.fullDescription = "Full description cannot exceed 800 characters.";
  }

  if (profile.yearsInBusiness === undefined || profile.yearsInBusiness < 0) {
    errors.yearsInBusiness = "Years in business must be 0 or greater.";
  }

  if (profile.teamSize === undefined || profile.teamSize < 1) {
    errors.teamSize = "Team size must be at least 1.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function calculateBusinessProfileCompletion(
  profile: VendorBusinessProfile
): number {
  let totalPoints = 0;
  let earnedPoints = 0;

  // 1. Business identity (4 fields)
  totalPoints += 4;
  if (profile.businessName?.trim()) earnedPoints++;
  if (profile.ownerName?.trim()) earnedPoints++;
  if (profile.category?.trim()) earnedPoints++;
  if (profile.location?.trim()) earnedPoints++;

  // 2. Descriptions (2 fields)
  totalPoints += 2;
  if (profile.shortDescription?.trim()) earnedPoints++;
  if (profile.fullDescription?.trim()) earnedPoints++;

  // 3. Service Areas (1 point if >= 1)
  totalPoints += 1;
  if (profile.serviceAreas && profile.serviceAreas.length > 0) earnedPoints++;

  // 4. Business Highlights (1 point if >= 1)
  totalPoints += 1;
  if (profile.highlights && profile.highlights.length > 0) earnedPoints++;

  // 5. Experience (2 fields)
  totalPoints += 2;
  if (profile.yearsInBusiness !== undefined && profile.yearsInBusiness >= 0) earnedPoints++;
  if (profile.teamSize !== undefined && profile.teamSize >= 1) earnedPoints++;

  // 6. Contact & Media (2 points)
  totalPoints += 2;
  if (profile.preferredContactMethod) earnedPoints++;
  if (profile.profileImage || profile.coverImage) earnedPoints++;

  return Math.round((earnedPoints / totalPoints) * 100);
}

export function getProfileCompletionMessage(completion: number): string {
  if (completion >= 95) {
    return "Your studio profile is complete and ready to be discovered.";
  }
  if (completion >= 80) {
    return "Your studio profile is nearly ready.";
  }
  if (completion >= 60) {
    return "Your profile is taking shape nicely.";
  }
  return "Complete a few more studio details to help couples find you.";
}

export function getBusinessDisplayLocation(profile: VendorBusinessProfile): string {
  if (!profile.serviceAreas || profile.serviceAreas.length === 0) {
    return profile.location;
  }
  return `${profile.location} (${profile.serviceAreas.join(", ")})`;
}

export function formatServiceAreas(serviceAreas: string[]): string {
  if (!serviceAreas || serviceAreas.length === 0) return "Not specified";
  return serviceAreas.join(" • ");
}

export function calculateBusinessHighlights(profile: VendorBusinessProfile): string[] {
  return profile.highlights || [];
}
