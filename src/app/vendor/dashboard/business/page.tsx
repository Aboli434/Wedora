"use client";

import React, { useState } from "react";
import { VendorDashboardShell } from "@/components/vendor-dashboard/layout";
import {
  MOCK_VENDOR_BUSINESS_PROFILE,
  VendorBusinessProfile,
} from "@/data/vendorBusiness";
import { calculateBusinessProfileCompletion } from "@/lib/vendorBusiness";
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
  const [profile, setProfile] = useState<VendorBusinessProfile>(
    MOCK_VENDOR_BUSINESS_PROFILE
  );
  const [isGlobalEditing, setIsGlobalEditing] = useState(false);

  // Dynamically calculated completion score
  const completionScore = calculateBusinessProfileCompletion(profile);

  const handleUpdateProfile = (partial: Partial<VendorBusinessProfile>) => {
    setProfile((prev) => ({
      ...prev,
      ...partial,
    }));
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
