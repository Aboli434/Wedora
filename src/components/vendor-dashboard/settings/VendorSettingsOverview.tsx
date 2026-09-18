"use client";

import React from "react";
import { VendorSettingsData } from "@/data/vendorSettings";
import {
  calculateVendorProfileCompletion,
  calculateEnabledNotificationCount,
  calculateEnabledCommunicationCount,
  formatVisibility,
  getSettingsCompletionMessage,
} from "@/lib/vendorSettings";
import {
  Building2,
  MapPin,
  Tag,
  CheckCircle2,
  Bell,
  MessageSquare,
  Globe,
  ChevronRight,
} from "lucide-react";

interface VendorSettingsOverviewProps {
  settings: VendorSettingsData;
  onNavigateToSection: (sectionId: string) => void;
}

export const VendorSettingsOverview: React.FC<VendorSettingsOverviewProps> = ({
  settings,
  onNavigateToSection,
}) => {
  const completionPercentage = calculateVendorProfileCompletion(settings);
  const notificationsCount = calculateEnabledNotificationCount(settings.notifications);
  const commsCount = calculateEnabledCommunicationCount(settings.communications);
  const isPublic = settings.workspace.publicProfileVisibility === "public";
  const completionMessage = getSettingsCompletionMessage(completionPercentage);

  return (
    <section
      aria-label="Settings Summary Overview"
      className="mb-10 bg-white border border-[#161514]/10 rounded-sm p-6 shadow-xs"
    >
      {/* Studio Banner Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 mb-6 border-b border-[#161514]/10 gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-sm bg-[#161514] text-[#FAF8F5] font-serif text-xl flex items-center justify-center font-normal tracking-wide shrink-0">
            {settings.account.profileInitials || "FH"}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-2xl text-[#161514] font-medium">
                {settings.workspace.businessName}
              </h2>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 bg-[#C5A880]/15 text-[#161514] border border-[#C5A880]/30 rounded-sm">
                Verified Studio
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#5A5650] mt-1">
              <span className="flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-[#C5A880]" />
                {settings.workspace.category}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                {settings.workspace.businessLocation}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-[#C5A880]" />
                {settings.account.role}
              </span>
            </div>
          </div>
        </div>

        {/* Completion Message */}
        <div className="lg:max-w-xs text-xs text-[#5A5650] bg-[#FAF8F5] p-3 rounded-sm border border-[#161514]/5">
          <span className="font-medium text-[#161514] block mb-0.5">Studio Readiness</span>
          {completionMessage}
        </div>
      </div>

      {/* Overview Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Profile Completion */}
        <button
          type="button"
          onClick={() => onNavigateToSection("workspace")}
          className="p-4 bg-[#FAF8F5] hover:bg-[#161514]/5 transition-colors border border-[#161514]/10 rounded-sm text-left group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#5A5650]">
                Profile Completion
              </span>
              <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />
            </div>
            <div className="font-serif text-3xl font-medium text-[#161514]">
              {completionPercentage}%
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-[#161514]/5 flex items-center justify-between text-xs text-[#5A5650] group-hover:text-[#161514]">
            <span>Workspace Profile</span>
            <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </div>
        </button>

        {/* Metric 2: Notifications Enabled */}
        <button
          type="button"
          onClick={() => onNavigateToSection("notifications")}
          className="p-4 bg-[#FAF8F5] hover:bg-[#161514]/5 transition-colors border border-[#161514]/10 rounded-sm text-left group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#5A5650]">
                Notifications Enabled
              </span>
              <Bell className="w-4 h-4 text-[#C5A880]" />
            </div>
            <div className="font-serif text-3xl font-medium text-[#161514]">
              {notificationsCount.enabled} <span className="text-base text-[#5A5650] font-sans font-normal">/ {notificationsCount.total}</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-[#161514]/5 flex items-center justify-between text-xs text-[#5A5650] group-hover:text-[#161514]">
            <span>Alert Preferences</span>
            <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </div>
        </button>

        {/* Metric 3: Communication Channels */}
        <button
          type="button"
          onClick={() => onNavigateToSection("communication")}
          className="p-4 bg-[#FAF8F5] hover:bg-[#161514]/5 transition-colors border border-[#161514]/10 rounded-sm text-left group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#5A5650]">
                Active Channels
              </span>
              <MessageSquare className="w-4 h-4 text-[#C5A880]" />
            </div>
            <div className="font-serif text-3xl font-medium text-[#161514]">
              {commsCount.enabled} <span className="text-base text-[#5A5650] font-sans font-normal">/ {commsCount.total}</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-[#161514]/5 flex items-center justify-between text-xs text-[#5A5650] group-hover:text-[#161514]">
            <span>Preferred: {settings.communications.preferredContactMethod}</span>
            <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </div>
        </button>

        {/* Metric 4: Public Profile State */}
        <button
          type="button"
          onClick={() => onNavigateToSection("privacy")}
          className="p-4 bg-[#FAF8F5] hover:bg-[#161514]/5 transition-colors border border-[#161514]/10 rounded-sm text-left group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#5A5650]">
                Public Presence
              </span>
              <Globe className="w-4 h-4 text-[#C5A880]" />
            </div>
            <div className="font-serif text-2xl font-medium text-[#161514] truncate">
              {isPublic ? "Visible" : "Hidden"}
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-[#161514]/5 flex items-center justify-between text-xs text-[#5A5650] group-hover:text-[#161514]">
            <span className="truncate">{formatVisibility(settings.workspace.publicProfileVisibility)}</span>
            <ChevronRight className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
          </div>
        </button>
      </div>
    </section>
  );
};
