"use client";

import React, { useState } from "react";
import { VendorAccountProfile } from "@/data/vendorSettings";
import { validateVendorAccountProfile } from "@/lib/vendorSettings";
import { User, Check, AlertCircle, Edit3, X } from "lucide-react";

interface VendorAccountSettingsProps {
  account: VendorAccountProfile;
  onSave: (updatedAccount: VendorAccountProfile) => void;
}

export const VendorAccountSettings: React.FC<VendorAccountSettingsProps> = ({
  account,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<VendorAccountProfile>(account);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof VendorAccountProfile, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateVendorAccountProfile(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    // Deriving initials
    const initials = `${formData.firstName.charAt(0)}${formData.lastName.charAt(0)}`.toUpperCase();
    onSave({ ...formData, profileInitials: initials });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(account);
    setErrors({});
    setIsEditing(false);
  };

  return (
    <div id="account" className="bg-white border border-[#161514]/10 rounded-sm p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#161514]/10 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#C5A880]" />
            <h3 className="font-serif text-xl font-medium text-[#161514]">
              Account & Profile Information
            </h3>
          </div>
          <p className="text-xs text-[#5A5650] mt-1 font-sans">
            Personal contact details for studio ownership and account communication.
          </p>
        </div>

        {!isEditing ? (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center gap-2 px-4 py-2 border border-[#161514]/20 bg-[#FAF8F5] text-[#161514] text-xs font-medium tracking-wider uppercase hover:bg-[#161514]/5 transition-colors rounded-sm self-start"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#5A5650]" />
            Edit Profile
          </button>
        ) : (
          <div className="flex items-center gap-2 self-start">
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#161514]/20 text-[#5A5650] text-xs font-medium uppercase hover:bg-[#161514]/5 transition-colors rounded-sm"
            >
              <X className="w-3.5 h-3.5" />
              Cancel
            </button>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Input Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block text-xs font-medium text-[#161514] mb-1.5">
              First Name <span className="text-red-600">*</span>
            </label>
            <input
              id="firstName"
              type="text"
              disabled={!isEditing}
              value={formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              className={`w-full px-3.5 py-2 text-sm border rounded-sm focus:outline-none focus:ring-1 focus:ring-[#161514] transition-colors ${
                errors.firstName ? "border-red-500 bg-red-50/50" : "border-[#161514]/20 bg-white"
              } disabled:bg-[#FAF8F5] disabled:text-[#5A5650]`}
            />
            {errors.firstName && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.firstName}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block text-xs font-medium text-[#161514] mb-1.5">
              Last Name <span className="text-red-600">*</span>
            </label>
            <input
              id="lastName"
              type="text"
              disabled={!isEditing}
              value={formData.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              className={`w-full px-3.5 py-2 text-sm border rounded-sm focus:outline-none focus:ring-1 focus:ring-[#161514] transition-colors ${
                errors.lastName ? "border-red-500 bg-red-50/50" : "border-[#161514]/20 bg-white"
              } disabled:bg-[#FAF8F5] disabled:text-[#5A5650]`}
            />
            {errors.lastName && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.lastName}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="accountEmail" className="block text-xs font-medium text-[#161514] mb-1.5">
              Account Email <span className="text-red-600">*</span>
            </label>
            <input
              id="accountEmail"
              type="email"
              disabled={!isEditing}
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={`w-full px-3.5 py-2 text-sm border rounded-sm focus:outline-none focus:ring-1 focus:ring-[#161514] transition-colors ${
                errors.email ? "border-red-500 bg-red-50/50" : "border-[#161514]/20 bg-white"
              } disabled:bg-[#FAF8F5] disabled:text-[#5A5650]`}
            />
            {errors.email && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Primary Phone */}
          <div>
            <label htmlFor="accountPhone" className="block text-xs font-medium text-[#161514] mb-1.5">
              Primary Phone <span className="text-red-600">*</span>
            </label>
            <input
              id="accountPhone"
              type="tel"
              disabled={!isEditing}
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className={`w-full px-3.5 py-2 text-sm border rounded-sm focus:outline-none focus:ring-1 focus:ring-[#161514] transition-colors ${
                errors.phone ? "border-red-500 bg-red-50/50" : "border-[#161514]/20 bg-white"
              } disabled:bg-[#FAF8F5] disabled:text-[#5A5650]`}
            />
            {errors.phone && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.phone}
              </p>
            )}
          </div>

          {/* Alternate Phone */}
          <div>
            <label htmlFor="alternatePhone" className="block text-xs font-medium text-[#161514] mb-1.5">
              Alternate Phone <span className="text-[#5A5650] font-normal">(Optional)</span>
            </label>
            <input
              id="alternatePhone"
              type="tel"
              disabled={!isEditing}
              value={formData.alternatePhone || ""}
              onChange={(e) => handleChange("alternatePhone", e.target.value)}
              placeholder="+91 98000 00000"
              className="w-full px-3.5 py-2 text-sm border border-[#161514]/20 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#161514] disabled:bg-[#FAF8F5] disabled:text-[#5A5650]"
            />
          </div>

          {/* Preferred Contact Method */}
          <div>
            <label htmlFor="preferredMethod" className="block text-xs font-medium text-[#161514] mb-1.5">
              Preferred Contact Method <span className="text-red-600">*</span>
            </label>
            <select
              id="preferredMethod"
              disabled={!isEditing}
              value={formData.preferredContactMethod}
              onChange={(e) =>
                handleChange(
                  "preferredContactMethod",
                  e.target.value as "email" | "phone" | "whatsapp"
                )
              }
              className="w-full px-3.5 py-2 text-sm border border-[#161514]/20 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#161514] disabled:bg-[#FAF8F5] disabled:text-[#5A5650]"
            >
              <option value="email">Email Communication</option>
              <option value="phone">Phone Call</option>
              <option value="whatsapp">WhatsApp Direct</option>
            </select>
          </div>
        </div>

        {/* Read-Only Metadata */}
        <div className="pt-4 border-t border-[#161514]/10 bg-[#FAF8F5] p-4 rounded-sm grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#5A5650]">
          <div>
            <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#161514] mb-0.5">
              Account Role
            </span>
            <span>{account.role}</span>
          </div>
          <div>
            <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#161514] mb-0.5">
              Account Created
            </span>
            <span>{account.accountCreatedAt}</span>
          </div>
          <div>
            <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#161514] mb-0.5">
              Last Studio Login
            </span>
            <span>{account.lastLoginAt}</span>
          </div>
        </div>

        {/* Edit Action Footer */}
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
              Save Account Profile
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
