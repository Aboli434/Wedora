"use client";

import React from "react";
import {
  ClientProfile,
  WeddingPreferences,
  NotificationPreferences,
  CommunicationPreferences,
  PrivacyPreferences,
} from "@/data/settings";
import {
  calculateProfileCompletion,
  getEnabledNotificationCount,
} from "@/lib/settings";

interface SettingsOverviewProps {
  profile: ClientProfile;
  weddingPreferences: WeddingPreferences;
  notificationPreferences: NotificationPreferences;
  communicationPreferences: CommunicationPreferences;
  privacyPreferences: PrivacyPreferences;
}

export function SettingsOverview({
  profile,
  weddingPreferences,
  notificationPreferences,
  communicationPreferences,
  privacyPreferences,
}: SettingsOverviewProps) {
  const completionPercentage = calculateProfileCompletion(
    profile,
    weddingPreferences,
    notificationPreferences,
    communicationPreferences,
    privacyPreferences
  );

  const enabledNotifications = getEnabledNotificationCount(notificationPreferences);

  let statusText = "Your profile is partially configured.";
  if (completionPercentage >= 90) {
    statusText = "Your profile is fully ready.";
  } else if (completionPercentage >= 75) {
    statusText = "Your profile is mostly ready.";
  }

  return (
    <section className="bg-[#FAF8F5] border border-[#161514]/15 p-6 sm:p-8 space-y-6">
      {/* Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#161514]/10 pb-4">
        <div>
          <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold block">
            SETTINGS SUMMARY
          </span>
          <h2 className="font-serif text-2xl text-[#161514] font-light">
            Workspace Configuration
          </h2>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#161514]/5 border border-[#161514]/15 text-[10px] font-mono tracking-widest uppercase text-[#5A5650]">
          DEMO WORKSPACE
        </span>
      </div>

      {/* Grid of Key Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {/* Completion Percentage */}
        <div className="space-y-1">
          <span className="text-[10px] font-sans uppercase tracking-wider text-[#5A5650]">
            Profile Completion
          </span>
          <p className="font-serif text-3xl sm:text-4xl font-light text-[#161514]">
            {completionPercentage}%
          </p>
          <span className="text-[11px] font-sans text-[#2D4A3E] font-medium block">
            {statusText}
          </span>
        </div>

        {/* Notifications Enabled */}
        <div className="space-y-1">
          <span className="text-[10px] font-sans uppercase tracking-wider text-[#5A5650]">
            Active Alerts
          </span>
          <p className="font-serif text-3xl sm:text-4xl font-light text-[#161514]">
            {enabledNotifications} / 6
          </p>
          <span className="text-[11px] font-sans text-[#5A5650] block">
            Planning notification channels
          </span>
        </div>

        {/* Preferred Contact */}
        <div className="space-y-1">
          <span className="text-[10px] font-sans uppercase tracking-wider text-[#5A5650]">
            Preferred Channel
          </span>
          <p className="font-serif text-2xl sm:text-3xl font-light text-[#161514]">
            {communicationPreferences.preferredContactMethod}
          </p>
          <span className="text-[11px] font-sans text-[#5A5650] block">
            Primary update method
          </span>
        </div>

        {/* Destination */}
        <div className="space-y-1">
          <span className="text-[10px] font-sans uppercase tracking-wider text-[#5A5650]">
            Wedding Destination
          </span>
          <p className="font-serif text-2xl sm:text-3xl font-light text-[#161514]">
            {weddingPreferences.destination}
          </p>
          <span className="text-[11px] font-sans text-[#5A5650] block">
            {weddingPreferences.weddingStyle} Style
          </span>
        </div>
      </div>

      {/* Progress Indicator Bar */}
      <div className="pt-2 space-y-1.5">
        <div
          className="w-full h-1.5 bg-[#161514]/10 overflow-hidden"
          role="progressbar"
          aria-valuenow={completionPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Profile completion: ${completionPercentage} percent.`}
        >
          <div
            className="h-full bg-[#C5A880] transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>
    </section>
  );
}
