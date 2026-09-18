"use client";

import React from "react";
import {
  User,
  Building2,
  Bell,
  MessageSquare,
  Inbox,
  CalendarCheck,
  Clock,
  Shield,
  Lock,
  AlertTriangle,
} from "lucide-react";

export interface SettingsNavItem {
  id: string;
  label: string;
  group: "PROFILE" | "COMMUNICATION" | "WORKFLOW" | "PRIVACY" | "SECURITY" | "DANGER";
  icon: React.ComponentType<{ className?: string }>;
}

export const SETTINGS_NAV_ITEMS: SettingsNavItem[] = [
  { id: "account", label: "Account Information", group: "PROFILE", icon: User },
  { id: "workspace", label: "Workspace & Profile", group: "PROFILE", icon: Building2 },
  { id: "notifications", label: "Notification Preferences", group: "COMMUNICATION", icon: Bell },
  { id: "communication", label: "Communication Channels", group: "COMMUNICATION", icon: MessageSquare },
  { id: "enquiries", label: "Enquiry Workflow", group: "WORKFLOW", icon: Inbox },
  { id: "bookings", label: "Booking Rules", group: "WORKFLOW", icon: CalendarCheck },
  { id: "availability", label: "Availability & Hours", group: "WORKFLOW", icon: Clock },
  { id: "privacy", label: "Privacy & Visibility", group: "PRIVACY", icon: Shield },
  { id: "security", label: "Security & Sessions", group: "SECURITY", icon: Lock },
  { id: "danger", label: "Danger Zone", group: "DANGER", icon: AlertTriangle },
];

interface VendorSettingsNavigationProps {
  activeSection: string;
  onSelectSection: (sectionId: string) => void;
}

export const VendorSettingsNavigation: React.FC<VendorSettingsNavigationProps> = ({
  activeSection,
  onSelectSection,
}) => {
  const groups: ("PROFILE" | "COMMUNICATION" | "WORKFLOW" | "PRIVACY" | "SECURITY" | "DANGER")[] = [
    "PROFILE",
    "COMMUNICATION",
    "WORKFLOW",
    "PRIVACY",
    "SECURITY",
    "DANGER",
  ];

  return (
    <>
      {/* Mobile Horizontal Navigation */}
      <nav
        aria-label="Settings Mobile Navigation"
        className="lg:hidden mb-6 overflow-x-auto no-scrollbar border-b border-[#161514]/10 pb-2 -mx-4 px-4 flex items-center space-x-2"
      >
        {SETTINGS_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectSection(item.id)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-sm whitespace-nowrap transition-colors border ${
                isActive
                  ? "bg-[#161514] text-[#FAF8F5] border-[#161514]"
                  : "bg-white text-[#5A5650] hover:text-[#161514] border-[#161514]/10 hover:border-[#161514]/20"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#C5A880]" : "text-[#5A5650]"}`} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Desktop Sticky Side Navigation */}
      <aside aria-label="Settings Navigation" className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-8 bg-white border border-[#161514]/10 rounded-sm p-4 space-y-6">
          <div className="pb-3 border-b border-[#161514]/10">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C5A880] block">
              SETTINGS CATEGORIES
            </span>
          </div>

          {groups.map((group) => {
            const groupItems = SETTINGS_NAV_ITEMS.filter((item) => item.group === group);
            return (
              <div key={group} className="space-y-1">
                <div className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-[#5A5650]/80">
                  {group}
                </div>
                {groupItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  const isDanger = item.group === "DANGER";

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onSelectSection(item.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-sm transition-colors text-left ${
                        isActive
                          ? isDanger
                            ? "bg-red-950/10 text-red-700 border-l-2 border-red-700"
                            : "bg-[#161514] text-[#FAF8F5]"
                          : isDanger
                          ? "text-red-600 hover:bg-red-50"
                          : "text-[#5A5650] hover:text-[#161514] hover:bg-[#FAF8F5]"
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 shrink-0 ${
                          isActive
                            ? isDanger
                              ? "text-red-700"
                              : "text-[#C5A880]"
                            : isDanger
                            ? "text-red-500"
                            : "text-[#5A5650]"
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
};
