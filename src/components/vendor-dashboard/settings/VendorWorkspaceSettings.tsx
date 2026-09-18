"use client";

import React, { useState } from "react";
import Link from "next/link";
import { VendorWorkspaceSettings as WorkspaceType } from "@/data/vendorSettings";
import { validateWorkspaceSettings } from "@/lib/vendorSettings";
import { Building2, ExternalLink, Check, AlertCircle, Edit3, X, Eye } from "lucide-react";

interface VendorWorkspaceSettingsProps {
  workspace: WorkspaceType;
  onSave: (updatedWorkspace: WorkspaceType) => void;
}

export const VendorWorkspaceSettings: React.FC<VendorWorkspaceSettingsProps> = ({
  workspace,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<WorkspaceType>(workspace);
  const [serviceAreaInput, setServiceAreaInput] = useState(workspace.serviceAreas.join(", "));
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof WorkspaceType, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleToggle = (field: keyof WorkspaceType) => {
    if (!isEditing) return;
    setFormData((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const areas = serviceAreaInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const updated = { ...formData, serviceAreas: areas };
    const validation = validateWorkspaceSettings(updated);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    onSave(updated);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(workspace);
    setServiceAreaInput(workspace.serviceAreas.join(", "));
    setErrors({});
    setIsEditing(false);
  };

  return (
    <div id="workspace" className="bg-white border border-[#161514]/10 rounded-sm p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#161514]/10 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#C5A880]" />
            <h3 className="font-serif text-xl font-medium text-[#161514]">
              Workspace & Studio Identity
            </h3>
          </div>
          <p className="text-xs text-[#5A5650] mt-1 font-sans">
            Manage your brand details, service regions, and how couples see your studio.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start">
          <Link
            href="/vendors/the-frame-house"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#161514]/20 bg-[#FAF8F5] text-[#161514] text-xs font-medium uppercase hover:bg-[#161514]/5 transition-colors rounded-sm"
          >
            <Eye className="w-3.5 h-3.5 text-[#C5A880]" />
            Preview Public Profile
            <ExternalLink className="w-3 h-3 text-[#5A5650]" />
          </Link>

          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-2 px-4 py-2 border border-[#161514]/20 bg-[#FAF8F5] text-[#161514] text-xs font-medium tracking-wider uppercase hover:bg-[#161514]/5 transition-colors rounded-sm"
            >
              <Edit3 className="w-3.5 h-3.5 text-[#5A5650]" />
              Edit Studio Details
            </button>
          ) : (
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#161514]/20 text-[#5A5650] text-xs font-medium uppercase hover:bg-[#161514]/5 transition-colors rounded-sm"
            >
              <X className="w-3.5 h-3.5" />
              Cancel
            </button>
          )}
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Core Business Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Business Name */}
          <div>
            <label htmlFor="businessName" className="block text-xs font-medium text-[#161514] mb-1.5">
              Business / Studio Name <span className="text-red-600">*</span>
            </label>
            <input
              id="businessName"
              type="text"
              disabled={!isEditing}
              value={formData.businessName}
              onChange={(e) => handleChange("businessName", e.target.value)}
              className={`w-full px-3.5 py-2 text-sm border rounded-sm focus:outline-none focus:ring-1 focus:ring-[#161514] transition-colors ${
                errors.businessName ? "border-red-500 bg-red-50/50" : "border-[#161514]/20 bg-white"
              } disabled:bg-[#FAF8F5] disabled:text-[#5A5650]`}
            />
            {errors.businessName && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.businessName}
              </p>
            )}
          </div>

          {/* Primary Category */}
          <div>
            <label htmlFor="category" className="block text-xs font-medium text-[#161514] mb-1.5">
              Primary Business Category <span className="text-red-600">*</span>
            </label>
            <input
              id="category"
              type="text"
              disabled={!isEditing}
              value={formData.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className={`w-full px-3.5 py-2 text-sm border rounded-sm focus:outline-none focus:ring-1 focus:ring-[#161514] transition-colors ${
                errors.category ? "border-red-500 bg-red-50/50" : "border-[#161514]/20 bg-white"
              } disabled:bg-[#FAF8F5] disabled:text-[#5A5650]`}
            />
            {errors.category && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.category}
              </p>
            )}
          </div>

          {/* Business Location */}
          <div>
            <label htmlFor="businessLocation" className="block text-xs font-medium text-[#161514] mb-1.5">
              Base Location / HQ <span className="text-red-600">*</span>
            </label>
            <input
              id="businessLocation"
              type="text"
              disabled={!isEditing}
              value={formData.businessLocation}
              onChange={(e) => handleChange("businessLocation", e.target.value)}
              className={`w-full px-3.5 py-2 text-sm border rounded-sm focus:outline-none focus:ring-1 focus:ring-[#161514] transition-colors ${
                errors.businessLocation ? "border-red-500 bg-red-50/50" : "border-[#161514]/20 bg-white"
              } disabled:bg-[#FAF8F5] disabled:text-[#5A5650]`}
            />
            {errors.businessLocation && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.businessLocation}
              </p>
            )}
          </div>

          {/* Service Areas */}
          <div>
            <label htmlFor="serviceAreas" className="block text-xs font-medium text-[#161514] mb-1.5">
              Service Areas <span className="text-[#5A5650] font-normal">(Comma separated)</span>
            </label>
            <input
              id="serviceAreas"
              type="text"
              disabled={!isEditing}
              value={serviceAreaInput}
              onChange={(e) => setServiceAreaInput(e.target.value)}
              className="w-full px-3.5 py-2 text-sm border border-[#161514]/20 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#161514] disabled:bg-[#FAF8F5] disabled:text-[#5A5650]"
            />
          </div>

          {/* Years Experience */}
          <div>
            <label htmlFor="yearsExp" className="block text-xs font-medium text-[#161514] mb-1.5">
              Years of Experience
            </label>
            <input
              id="yearsExp"
              type="number"
              min={0}
              disabled={!isEditing}
              value={formData.yearsExperience}
              onChange={(e) => handleChange("yearsExperience", parseInt(e.target.value, 10) || 0)}
              className="w-full px-3.5 py-2 text-sm border border-[#161514]/20 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#161514] disabled:bg-[#FAF8F5] disabled:text-[#5A5650]"
            />
          </div>

          {/* Team Size */}
          <div>
            <label htmlFor="teamSize" className="block text-xs font-medium text-[#161514] mb-1.5">
              Core Team Size
            </label>
            <input
              id="teamSize"
              type="number"
              min={1}
              disabled={!isEditing}
              value={formData.teamSize}
              onChange={(e) => handleChange("teamSize", parseInt(e.target.value, 10) || 1)}
              className="w-full px-3.5 py-2 text-sm border border-[#161514]/20 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#161514] disabled:bg-[#FAF8F5] disabled:text-[#5A5650]"
            />
          </div>

          {/* Website */}
          <div>
            <label htmlFor="website" className="block text-xs font-medium text-[#161514] mb-1.5">
              Website URL
            </label>
            <input
              id="website"
              type="url"
              disabled={!isEditing}
              value={formData.website || ""}
              onChange={(e) => handleChange("website", e.target.value)}
              placeholder="https://yourstudio.com"
              className="w-full px-3.5 py-2 text-sm border border-[#161514]/20 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#161514] disabled:bg-[#FAF8F5] disabled:text-[#5A5650]"
            />
          </div>

          {/* Instagram */}
          <div>
            <label htmlFor="instagram" className="block text-xs font-medium text-[#161514] mb-1.5">
              Instagram Handle
            </label>
            <input
              id="instagram"
              type="text"
              disabled={!isEditing}
              value={formData.instagram || ""}
              onChange={(e) => handleChange("instagram", e.target.value)}
              placeholder="@yourstudio"
              className="w-full px-3.5 py-2 text-sm border border-[#161514]/20 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#161514] disabled:bg-[#FAF8F5] disabled:text-[#5A5650]"
            />
          </div>
        </div>

        {/* Public Profile Visibility Selector */}
        <div className="pt-4 border-t border-[#161514]/10 space-y-3">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#161514]">
            Directory Profile Visibility
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                id: "public",
                title: "Public Directory",
                desc: "Listed on Wedora search and discovery",
              },
              {
                id: "unlisted",
                title: "Unlisted Profile",
                desc: "Accessible only via direct profile URL link",
              },
              {
                id: "private",
                title: "Private Studio",
                desc: "Hidden from public search and links",
              },
            ].map((option) => (
              <button
                key={option.id}
                type="button"
                disabled={!isEditing}
                onClick={() =>
                  handleChange(
                    "publicProfileVisibility",
                    option.id as "public" | "unlisted" | "private"
                  )
                }
                className={`p-3.5 rounded-sm border text-left transition-colors ${
                  formData.publicProfileVisibility === option.id
                    ? "bg-[#161514] text-[#FAF8F5] border-[#161514]"
                    : "bg-[#FAF8F5] text-[#161514] border-[#161514]/15 hover:border-[#161514]/30"
                } disabled:opacity-85`}
              >
                <div className="text-xs font-medium">{option.title}</div>
                <div
                  className={`text-[11px] mt-1 ${
                    formData.publicProfileVisibility === option.id
                      ? "text-[#FAF8F5]/80"
                      : "text-[#5A5650]"
                  }`}
                >
                  {option.desc}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Public Display Section Controls */}
        <div className="pt-4 border-t border-[#161514]/10 space-y-3">
          <span className="block text-xs font-semibold uppercase tracking-wider text-[#161514]">
            Public Profile Display Controls
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { key: "allowPublicEnquiries", label: "Allow Public Enquiries", desc: "Accept direct booking lead forms on public profile" },
              { key: "showStartingPrice", label: "Show Starting Packages", desc: "Display starting package costs on profile header" },
              { key: "showServiceAreas", label: "Show Service Regions", desc: "Display covered destination cities and regions" },
              { key: "showPortfolio", label: "Show Visual Portfolio", desc: "Display gallery photos and video highlight reels" },
              { key: "showReviews", label: "Show Client Reviews", desc: "Display client feedback, ratings and responses" },
            ].map((toggle) => {
              const val = formData[toggle.key as keyof WorkspaceType] as boolean;
              return (
                <div
                  key={toggle.key}
                  onClick={() => handleToggle(toggle.key as keyof WorkspaceType)}
                  className={`flex items-start justify-between p-3.5 rounded-sm border transition-colors ${
                    isEditing ? "cursor-pointer hover:bg-[#FAF8F5]" : "bg-[#FAF8F5]/50 cursor-not-allowed"
                  } border-[#161514]/10`}
                >
                  <div>
                    <span className="text-xs font-medium text-[#161514] block">
                      {toggle.label}
                    </span>
                    <span className="text-[11px] text-[#5A5650] block mt-0.5 font-sans">
                      {toggle.desc}
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
        </div>

        {/* Save Footer */}
        {isEditing && (
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border border-[#161514]/20 text-[#5A5650] text-xs font-medium tracking-wider uppercase hover:bg-[#161514]/5 transition-colors rounded-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#161514] text-[#FAF8F5] text-xs font-medium tracking-wider uppercase hover:bg-[#2c2927] transition-colors rounded-sm"
            >
              <Check className="w-3.5 h-3.5 text-[#C5A880]" />
              Save Workspace Settings
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
