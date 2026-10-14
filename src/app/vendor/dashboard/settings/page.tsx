"use client";

import React, { useState, useEffect } from "react";
import { VendorDashboardShell } from "@/components/vendor-dashboard/layout/VendorDashboardShell";
import {
  VendorSettingsPageHeader,
  VendorSettingsOverview,
  VendorSettingsNavigation,
  VendorAccountSettings,
  VendorWorkspaceSettings,
  VendorNotificationSettings,
  VendorCommunicationSettings,
  VendorEnquirySettings,
  VendorBookingSettings,
  VendorAvailabilitySettings,
  VendorPrivacySettings,
  VendorSecuritySettings,
  VendorSettingsSaveFeedback,
  VendorDangerZone,
  SaveFeedbackState,
} from "@/components/vendor-dashboard/settings";
import {
  initialVendorSettingsData,
  VendorSettingsData,
  VendorAccountProfile,
  VendorWorkspaceSettings as WorkspaceType,
  VendorNotificationPreferences,
  VendorCommunicationPreferences,
  VendorEnquiryPreferences,
  VendorBookingPreferences,
  VendorAvailabilityPreferences,
  VendorPrivacyPreferences,
  VendorSecurityInfo,
} from "@/data/vendorSettings";
import { useAuthStore } from "@/store/useAuthStore";
import { formatVendorCategory } from "@/lib/vendorCategory";
import { updateCurrentUserApi } from "@/lib/api/endpoints";

export default function VendorSettingsPage() {
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);

  const [settings, setSettings] = useState<VendorSettingsData>(
    initialVendorSettingsData
  );
  const [activeSection, setActiveSection] = useState<string>("account");
  const [feedback, setFeedback] = useState<SaveFeedbackState | null>(null);

  // Sync settings with authenticated vendor profile
  useEffect(() => {
    if (!user) return;
    const vp = user.profile as {
      businessName?: string;
      category?: string;
      city?: string;
      slug?: string;
      experienceYears?: number | null;
      teamSize?: string | null;
      website?: string | null;
      instagram?: string | null;
      description?: string | null;
    } | null;

    const names = (user.fullName || "").trim().split(" ");
    const firstName = names[0] || "Studio";
    const lastName = names.slice(1).join(" ") || "Owner";
    const initials = (vp?.businessName || user.fullName || "ST")
      .split(" ")
      .map((w) => w[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase();

    const formattedCategory = vp?.category ? formatVendorCategory(vp.category) : "Choreography";

    setSettings((prev) => ({
      ...prev,
      account: {
        ...prev.account,
        firstName: firstName,
        lastName: lastName,
        email: user.email || prev.account.email,
        phone: user.phoneNumber || prev.account.phone,
        profileInitials: initials,
        role: `${formattedCategory} Studio Founder`,
      },
      workspace: {
        ...prev.workspace,
        businessName: vp?.businessName || (user.fullName ? `${user.fullName} Studio` : prev.workspace.businessName),
        category: formattedCategory,
        businessLocation: vp?.city ? `${vp.city}, India` : prev.workspace.businessLocation,
        yearsExperience: typeof vp?.experienceYears === "number" ? vp.experienceYears : prev.workspace.yearsExperience,
        teamSize: vp?.teamSize ? parseInt(vp.teamSize, 10) || prev.workspace.teamSize : prev.workspace.teamSize,
        website: vp?.website || prev.workspace.website,
        instagram: vp?.instagram || prev.workspace.instagram,
      },
    }));
  }, [user]);

  const showToast = (message: string, type: SaveFeedbackState["type"] = "success") => {
    setFeedback({
      message,
      type,
      id: Date.now(),
    });
  };

  const handleSelectSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Section Save Handlers with persistent database update
  const handleAccountSave = async (updatedAccount: VendorAccountProfile) => {
    setSettings((prev) => ({ ...prev, account: updatedAccount }));
    showToast("Account profile changes saved.");
    try {
      const updated = await updateCurrentUserApi({
        fullName: `${updatedAccount.firstName} ${updatedAccount.lastName}`.trim(),
        phoneNumber: updatedAccount.phone,
      });
      if (updated) setUser(updated);
    } catch {
      // Keep optimistic update
    }
  };

  const handleWorkspaceSave = async (updatedWorkspace: WorkspaceType) => {
    setSettings((prev) => ({ ...prev, workspace: updatedWorkspace }));
    showToast("Workspace & studio settings updated.");
    try {
      const updated = await updateCurrentUserApi({
        businessName: updatedWorkspace.businessName,
        category: updatedWorkspace.category,
        city: updatedWorkspace.businessLocation.split(",")[0].trim(),
        experienceYears: updatedWorkspace.yearsExperience,
        teamSize: String(updatedWorkspace.teamSize),
      });
      if (updated) setUser(updated);
    } catch {
      // Keep optimistic update
    }
  };

  const handleNotificationsUpdate = (
    updatedNotifications: VendorNotificationPreferences
  ) => {
    setSettings((prev) => ({ ...prev, notifications: updatedNotifications }));
    showToast("Notification preferences updated.");
  };

  const handleCommunicationUpdate = (
    updatedComms: VendorCommunicationPreferences
  ) => {
    setSettings((prev) => ({ ...prev, communications: updatedComms }));
    showToast("Communication channels updated.");
  };

  const handleEnquiriesUpdate = (
    updatedEnquiries: VendorEnquiryPreferences
  ) => {
    setSettings((prev) => ({ ...prev, enquiries: updatedEnquiries }));
    showToast("Enquiry intake rules saved.");
  };

  const handleBookingsUpdate = (updatedBookings: VendorBookingPreferences) => {
    setSettings((prev) => ({ ...prev, bookings: updatedBookings }));
    showToast("Booking & deposit rules updated.");
  };

  const handleAvailabilityUpdate = (
    updatedAvailability: VendorAvailabilityPreferences
  ) => {
    setSettings((prev) => ({ ...prev, availability: updatedAvailability }));
    showToast("Studio availability & operating hours saved.");
  };

  const handlePrivacyUpdate = (updatedPrivacy: VendorPrivacyPreferences) => {
    setSettings((prev) => ({ ...prev, privacy: updatedPrivacy }));
    showToast("Privacy controls updated.");
  };

  const handleSecurityUpdate = (updatedSecurity: VendorSecurityInfo) => {
    setSettings((prev) => ({ ...prev, security: updatedSecurity }));
  };

  const vendorSlug = (user?.profile as { slug?: string } | null)?.slug;
  const publicProfileUrl = vendorSlug ? `/vendors/${vendorSlug}` : "/vendors";

  return (
    <VendorDashboardShell>
      <div className="max-w-7xl mx-auto pb-16">
        {/* Page Header */}
        <VendorSettingsPageHeader publicProfileUrl={publicProfileUrl} />

        {/* Overview Banner */}
        <VendorSettingsOverview
          settings={settings}
          onNavigateToSection={handleSelectSection}
        />

        {/* Layout Grid: Sidebar Navigation + Main Forms */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Settings Side Navigation */}
          <VendorSettingsNavigation
            activeSection={activeSection}
            onSelectSection={handleSelectSection}
          />

          {/* Settings Section Components */}
          <main className="flex-1 w-full space-y-8">
            <VendorAccountSettings
              account={settings.account}
              onSave={handleAccountSave}
            />

            <VendorWorkspaceSettings
              workspace={settings.workspace}
              publicProfileUrl={publicProfileUrl}
              onSave={handleWorkspaceSave}
            />

            <VendorNotificationSettings
              notifications={settings.notifications}
              onUpdate={handleNotificationsUpdate}
            />

            <VendorCommunicationSettings
              communications={settings.communications}
              onUpdate={handleCommunicationUpdate}
            />

            <VendorEnquirySettings
              enquiries={settings.enquiries}
              onUpdate={handleEnquiriesUpdate}
            />

            <VendorBookingSettings
              bookings={settings.bookings}
              onUpdate={handleBookingsUpdate}
            />

            <VendorAvailabilitySettings
              availability={settings.availability}
              onUpdate={handleAvailabilityUpdate}
            />

            <VendorPrivacySettings
              privacy={settings.privacy}
              onUpdate={handlePrivacyUpdate}
            />

            <VendorSecuritySettings
              security={settings.security}
              businessName={settings.workspace.businessName}
              onUpdate={handleSecurityUpdate}
              onShowFeedback={(msg) => showToast(msg, "notice")}
            />

            <VendorDangerZone
              businessName={settings.workspace.businessName}
              onShowFeedback={(msg) => showToast(msg, "warning")}
            />
          </main>
        </div>

        {/* Save Feedback Toast */}
        <VendorSettingsSaveFeedback
          feedback={feedback}
          onDismiss={() => setFeedback(null)}
        />
      </div>
    </VendorDashboardShell>
  );
}
