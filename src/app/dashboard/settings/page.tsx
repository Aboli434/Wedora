"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/dashboard";
import {
  MOCK_SETTINGS_DATA,
  ClientProfile,
  WeddingPreferences as WeddingPreferencesType,
  NotificationPreferences,
  CommunicationPreferences,
  PrivacyPreferences,
} from "@/data/settings";
import {
  SettingsPageHeader,
  SettingsOverview,
  SettingsNavigation,
  ProfileSettings,
  WeddingPreferences,
  NotificationSettings,
  CommunicationSettings,
  PrivacySettings,
  AccountSettings,
  DangerZone,
} from "@/components/dashboard/settings";

export default function SettingsPage() {
  const [profile, setProfile] = useState<ClientProfile>(MOCK_SETTINGS_DATA.profile);
  const [weddingPreferences, setWeddingPreferences] = useState<WeddingPreferencesType>(
    MOCK_SETTINGS_DATA.weddingPreferences
  );
  const [notificationPreferences, setNotificationPreferences] = useState<NotificationPreferences>(
    MOCK_SETTINGS_DATA.notificationPreferences
  );
  const [communicationPreferences, setCommunicationPreferences] = useState<CommunicationPreferences>(
    MOCK_SETTINGS_DATA.communicationPreferences
  );
  const [privacyPreferences, setPrivacyPreferences] = useState<PrivacyPreferences>(
    MOCK_SETTINGS_DATA.privacyPreferences
  );

  return (
    <DashboardShell>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <SettingsPageHeader />

        {/* Overview Metric Cards */}
        <SettingsOverview
          profile={profile}
          weddingPreferences={weddingPreferences}
          notificationPreferences={notificationPreferences}
          communicationPreferences={communicationPreferences}
          privacyPreferences={privacyPreferences}
        />

        {/* Content Layout with Navigation Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Settings Navigation */}
          <div className="lg:col-span-1 lg:sticky lg:top-24">
            <SettingsNavigation />
          </div>

          {/* Settings Forms Stack */}
          <div className="lg:col-span-3 space-y-10">
            <ProfileSettings profile={profile} onSave={setProfile} />

            <WeddingPreferences
              preferences={weddingPreferences}
              onSave={setWeddingPreferences}
            />

            <NotificationSettings
              notifications={notificationPreferences}
              onChange={setNotificationPreferences}
            />

            <CommunicationSettings
              communications={communicationPreferences}
              onChange={setCommunicationPreferences}
            />

            <PrivacySettings
              privacy={privacyPreferences}
              onChange={setPrivacyPreferences}
            />

            <AccountSettings email={profile.email} />

            <DangerZone />
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
