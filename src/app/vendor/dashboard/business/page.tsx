"use client";

import React, { useState, useEffect } from "react";
import { VendorDashboardShell } from "@/components/vendor-dashboard/layout";
import {
  MOCK_VENDOR_BUSINESS_PROFILE,
  VendorBusinessProfile,
} from "@/data/vendorBusiness";
import { calculateBusinessProfileCompletion } from "@/lib/vendorBusiness";
import { useAuthStore } from "@/store/useAuthStore";
import { formatVendorCategory } from "@/lib/vendorCategory";
import { updateCurrentUserApi } from "@/lib/api/endpoints";
import {
  BusinessPageHeader,
  BusinessOverview,
  BusinessCompletion,
  StudioIdentity,
  StudioDescription,
  ServiceAreas,
  BusinessHighlights,
  StudioExperience,
  BusinessContactPreferences,
  BusinessMedia,
  ProfileVisibility,
  PublicProfilePreview,
} from "@/components/vendor-dashboard/business";

export default function VendorBusinessPage() {
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);

  const [profile, setProfile] = useState<VendorBusinessProfile>(
    MOCK_VENDOR_BUSINESS_PROFILE
  );
  const [isGlobalEditing, setIsGlobalEditing] = useState(false);

  // Sync profile dynamically with authenticated vendor details
  useEffect(() => {
    if (!user) return;
    const vp = user.profile as {
      businessName?: string;
      category?: string;
      city?: string;
      description?: string;
      experienceYears?: number | null;
      teamSize?: string | null;
      coverImage?: string | null;
      verified?: boolean;
    } | null;

    setProfile((prev) => ({
      ...prev,
      businessName:
        vp?.businessName ||
        (user.fullName ? `${user.fullName} Studio` : prev.businessName),
      ownerName: user.fullName || prev.ownerName,
      category: vp?.category ? formatVendorCategory(vp.category) : prev.category,
      location: vp?.city || prev.location,
      shortDescription: vp?.description || prev.shortDescription,
      fullDescription: vp?.description || prev.fullDescription,
      yearsInBusiness:
        typeof vp?.experienceYears === "number"
          ? vp.experienceYears
          : prev.yearsInBusiness,
      teamSize: vp?.teamSize
        ? parseInt(vp.teamSize, 10) || prev.teamSize
        : prev.teamSize,
      businessEmail: user.email || prev.businessEmail,
      businessPhone: user.phoneNumber || prev.businessPhone,
      coverImage: vp?.coverImage || prev.coverImage,
      verifiedStatus:
        typeof vp?.verified === "boolean" ? vp.verified : prev.verifiedStatus,
    }));
  }, [user]);

  // Dynamically calculated completion score
  const completionScore = calculateBusinessProfileCompletion(profile);

  const handleUpdateProfile = async (partial: Partial<VendorBusinessProfile>) => {
    setProfile((prev) => ({
      ...prev,
      ...partial,
    }));

    try {
      const apiPayload: Record<string, unknown> = {};
      if (partial.businessName !== undefined) apiPayload.businessName = partial.businessName;
      if (partial.category !== undefined) apiPayload.category = partial.category;
      if (partial.location !== undefined) apiPayload.city = partial.location;
      if (partial.shortDescription !== undefined || partial.fullDescription !== undefined) {
        apiPayload.description = partial.fullDescription || partial.shortDescription;
      }
      if (partial.yearsInBusiness !== undefined) apiPayload.experienceYears = partial.yearsInBusiness;
      if (partial.teamSize !== undefined) apiPayload.teamSize = String(partial.teamSize);
      if (partial.coverImage !== undefined) apiPayload.coverImage = partial.coverImage;

      if (Object.keys(apiPayload).length > 0) {
        const updated = await updateCurrentUserApi(apiPayload);
        if (updated) {
          setUser(updated);
        }
      }
    } catch (err) {
      console.error("Failed to persist vendor profile changes to database:", err);
    }
  };

  const handleToggleGlobalEdit = () => {
    setIsGlobalEditing((prev) => !prev);
  };

  return (
    <VendorDashboardShell>
      <div className="space-y-8 max-w-5xl mx-auto">
        {/* Page Header */}
        <BusinessPageHeader
          isEditing={isGlobalEditing}
          onToggleEdit={handleToggleGlobalEdit}
        />

        {/* Overview & Score Card */}
        <BusinessOverview profile={profile} completionScore={completionScore} />

        {/* Completion Checklist */}
        <BusinessCompletion profile={profile} completionScore={completionScore} />

        {/* Studio Identity */}
        <StudioIdentity
          profile={profile}
          onSave={(updated) => handleUpdateProfile(updated)}
        />

        {/* Studio Description */}
        <StudioDescription
          profile={profile}
          onSave={(updated) => handleUpdateProfile(updated)}
        />

        {/* Where You Work / Service Areas */}
        <ServiceAreas
          profile={profile}
          serviceAreas={profile.serviceAreas}
          onChange={(updatedAreas) => handleUpdateProfile({ serviceAreas: updatedAreas })}
        />

        {/* Core Studio Highlights */}
        <BusinessHighlights
          highlights={profile.highlights}
          onChange={(updatedHighlights) => handleUpdateProfile({ highlights: updatedHighlights })}
        />

        {/* Experience & Team */}
        <StudioExperience
          profile={profile}
          onSave={(updated) => handleUpdateProfile(updated)}
        />

        {/* Contact Preferences */}
        <BusinessContactPreferences
          profile={profile}
          onChange={(updated) => handleUpdateProfile(updated)}
        />

        {/* Studio Media */}
        <BusinessMedia profile={profile} />

        {/* Profile Visibility */}
        <ProfileVisibility
          profile={profile}
          onChange={(isVisible) => handleUpdateProfile({ publicProfileVisible: isVisible })}
        />

        {/* Public Profile Preview */}
        <PublicProfilePreview profile={profile} />
      </div>
    </VendorDashboardShell>
  );
}
