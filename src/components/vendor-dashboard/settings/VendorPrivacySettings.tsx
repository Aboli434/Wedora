"use client";

import React from "react";
import { VendorPrivacyPreferences } from "@/data/vendorSettings";
import { calculateEnabledPrivacyCount } from "@/lib/vendorSettings";
import { Shield, Eye, AlertCircle } from "lucide-react";

interface VendorPrivacySettingsProps {
  privacy: VendorPrivacyPreferences;
  onUpdate: (updatedPrivacy: VendorPrivacyPreferences) => void;
}

export const VendorPrivacySettings: React.FC<VendorPrivacySettingsProps> = ({
  privacy,
  onUpdate,
}) => {
  const { enabled, total } = calculateEnabledPrivacyCount(privacy);

  const handleToggle = (key: keyof VendorPrivacyPreferences) => {
    onUpdate({
      ...privacy,
      [key]: !privacy[key],
    });
  };

  return (
    <div id="privacy" className="bg-white border border-[#161514]/10 rounded-sm p-6 space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-[#161514]/10">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#C5A880]" />
          <h3 className="font-serif text-xl font-medium text-[#161514]">
            Privacy & Data Exposure Controls
          </h3>
        </div>
        <p className="text-xs text-[#5A5650] mt-1 font-sans">
          Control which studio details and personal contact information are exposed to public search crawlers and site visitors.
        </p>
      </div>

      {/* Summary Banner */}
      <div className="flex items-center justify-between p-3.5 bg-[#FAF8F5] border border-[#161514]/10 rounded-sm text-xs">
        <span className="font-medium text-[#161514]">
          {enabled} of {total} privacy options exposed to public view
        </span>
        <span className="text-[11px] font-mono text-[#5A5650]">
          {total - enabled} details restricted
        </span>
      </div>

      {/* Privacy Toggles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {[
          { key: "profileSearchable", title: "Index Profile in External Search Engines", desc: "Allow Google and Bing to index your studio page" },
          { key: "showBusinessEmail", title: "Display Public Studio Email", desc: "Show riya@framehouse.example on public directory header" },
          { key: "showBusinessPhone", title: "Display Public Studio Phone Number", desc: "Show studio phone number directly to unverified visitors" },
          { key: "showLocation", title: "Display HQ Base Address", desc: "Show detailed studio street address in Mumbai" },
          { key: "showTeamInformation", title: "Display Team & Lead Photographers", desc: "Show crew list, experience years, and team size on profile" },
          { key: "allowProfileAnalytics", title: "Allow Anonymous Studio Analytics", desc: "Track profile page views, impression counts, and inquiry conversion" },
        ].map((item) => {
          const val = privacy[item.key as keyof VendorPrivacyPreferences] as boolean;
          return (
            <div
              key={item.key}
              onClick={() => handleToggle(item.key as keyof VendorPrivacyPreferences)}
              className="flex items-start justify-between p-3.5 bg-white hover:bg-[#FAF8F5] border border-[#161514]/10 rounded-sm cursor-pointer transition-colors"
            >
              <div>
                <span className="text-xs font-medium text-[#161514] block">
                  {item.title}
                </span>
                <span className="text-[11px] text-[#5A5650] block mt-0.5 font-sans leading-relaxed">
                  {item.desc}
                </span>
              </div>

              <div
                className={`w-9 h-5 rounded-full transition-colors p-0.5 shrink-0 ${
                  val ? "bg-[#161514]" : "bg-[#161514]/20"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-[#FAF8F5] transition-transform ${
                    val ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Distinction Note */}
      <div className="p-4 bg-[#FAF8F5] border border-[#161514]/10 rounded-sm space-y-2 text-xs text-[#5A5650]">
        <div className="flex items-center gap-2 font-medium text-[#161514]">
          <Eye className="w-4 h-4 text-[#C5A880]" />
          <span>Understanding Directory Visibility vs Field Privacy</span>
        </div>
        <p className="leading-relaxed">
          <strong className="text-[#161514]">Public Profile Visibility</strong> controls whether your studio appears in the Wedora vendor directory catalog or requires a direct URL.
          <strong className="text-[#161514]"> Privacy Controls</strong> determine which granular details (such as phone numbers or team lists) are displayed once a user visits your studio page.
        </p>
      </div>

      {/* Disclaimer */}
      <div className="text-[11px] text-[#5A5650] flex items-center gap-2">
        <AlertCircle className="w-3.5 h-3.5 text-[#5A5650] shrink-0" />
        <span>
          Demo Privacy Controls — changes update UI presentation only. Does not replace statutory legal or GDPR compliance notices.
        </span>
      </div>
    </div>
  );
};
