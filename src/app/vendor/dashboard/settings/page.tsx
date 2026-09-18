"use client";

import React, { useState } from "react";
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

export default function VendorSettingsPage() {
  const [settings, setSettings] = useState<VendorSettingsData>(
    initialVendorSettingsData
  );
  const [activeSection, setActiveSection] = useState<string>("account");
  const [feedback, setFeedback] = useState<SaveFeedbackState | null>(null);

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

  const handleResetSettings = () => {
    setSettings(initialVendorSettingsData);
    showToast("Settings reset to default demo state.", "notice");
  };

  // Section Save Handlers
  const handleAccountSave = (updatedAccount: VendorAccountProfile) => {
    setSettings((prev) => ({ ...prev, account: updatedAccount }));
    showToast("Account profile changes saved for this session.");
  };

  const handleWorkspaceSave = (updatedWorkspace: WorkspaceType) => {
    setSettings((prev) => ({ ...prev, workspace: updatedWorkspace }));
    showToast("Workspace & studio settings updated.");
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

  return (
    <VendorDashboardShell>
      <div className="max-w-7xl mx-auto pb-16">
        {/* Page Header */}
        <VendorSettingsPageHeader onResetSettings={handleResetSettings} />

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
              onUpdate={handleSecurityUpdate}
              onShowFeedback={(msg) => showToast(msg, "notice")}
            />

            <VendorDangerZone
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
