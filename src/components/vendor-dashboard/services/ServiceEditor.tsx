"use client";

import React, { useState, useEffect } from "react";
import {
  VendorService,
  PricingType,
  ServiceAvailabilityType,
  ServiceVisibilityType,
  VendorAddOn,
} from "@/data/vendorServices";
import { validateVendorService } from "@/lib/vendorServices";
import { ServiceInclusions } from "./ServiceInclusions";
import { ServiceAddOns } from "./ServiceAddOns";
import { ServiceAvailability } from "./ServiceAvailability";
import { ServiceVisibility } from "./ServiceVisibility";
import { ServiceCompletion } from "./ServiceCompletion";
import { X, Sparkles } from "lucide-react";

interface ServiceEditorProps {
  service?: VendorService | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (service: VendorService) => void;
}

const CATEGORIES = [
  "Wedding Photography",
  "Pre-Wedding",
  "Engagement",
  "Events",
  "Other Services",
];

export function ServiceEditor({ service, isOpen, onClose, onSave }: ServiceEditorProps) {
  const [formData, setFormData] = useState<Partial<VendorService>>({
    name: "",
    category: "Wedding Photography",
    shortDescription: "",
    description: "",
    pricingType: "STARTING_FROM",
    price: 150000,
    currency: "INR",
    duration: "1 Day / Up to 10 Hours",
    delivery: "Edited Digital Gallery (3-4 Weeks)",
    inclusions: ["Lead Photographer", "Digital Gallery Delivery"],
    addOns: [],
    availability: "AVAILABLE",
    visibility: "PUBLIC",
    featured: false,
  });

  const [prevService, setPrevService] = useState<VendorService | null | undefined>(undefined);
  const [prevIsOpen, setPrevIsOpen] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (service !== prevService || isOpen !== prevIsOpen) {
    setPrevService(service);
    setPrevIsOpen(isOpen);
    if (isOpen) {
      if (service) {
        setFormData(service);
      } else {
        setFormData({
          name: "",
          category: "Wedding Photography",
          shortDescription: "",
          description: "",
          pricingType: "STARTING_FROM",
          price: 150000,
          currency: "INR",
          duration: "1 Day / Up to 10 Hours",
          delivery: "Edited Digital Gallery (3-4 Weeks)",
          inclusions: ["Lead Photographer", "Digital Gallery Delivery"],
          addOns: [],
          availability: "AVAILABLE",
          visibility: "PUBLIC",
          featured: false,
        });
      }
      setErrors({});
    }
  }

  // Handle Escape key close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateVendorService(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const finalService: VendorService = {
      id: service?.id || `srv-${Date.now()}`,
      name: formData.name || "Untitled Service",
      category: formData.category || "Wedding Photography",
      shortDescription: formData.shortDescription || "",
      description: formData.description || "",
      pricingType: (formData.pricingType as PricingType) || "STARTING_FROM",
      price: formData.pricingType === "CUSTOM_QUOTE" ? undefined : Number(formData.price) || 0,
      currency: "INR",
      duration: formData.duration || "",
      delivery: formData.delivery || "",
      inclusions: formData.inclusions || [],
      addOns: formData.addOns || [],
      availability: (formData.availability as ServiceAvailabilityType) || "AVAILABLE",
      visibility: (formData.visibility as ServiceVisibilityType) || "PUBLIC",
      featured: Boolean(formData.featured),
      updatedAt: "Today",
    };

    onSave(finalService);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
      <div
        className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl relative my-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="editor-title"
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-[#E8E2D9] flex items-center justify-between shrink-0 bg-[#F2ECE4]/50">
          <div>
            <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#C5A880] font-semibold block">
              SERVICE EDITOR
            </span>
            <h2 id="editor-title" className="font-serif text-2xl text-[#2C2A29]">
              {service ? "Edit Service Offering" : "Add New Service Offering"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 text-[#8C857B] hover:text-[#2C2A29] rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
          {/* Dynamic Completion Widget */}
          <ServiceCompletion service={formData as VendorService} />

          {/* Section 1: Basic Info */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-wider text-[#8C857B] font-semibold border-b border-[#E8E2D9] pb-2">
              1. Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="serviceName" className="text-xs uppercase tracking-wider text-[#2C2A29] font-medium block mb-1">
                  Service Name *
                </label>
                <input
                  id="serviceName"
                  type="text"
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. The Full Celebration"
                  className="w-full bg-white border border-[#DCD5C9] rounded-lg px-3.5 py-2 text-xs text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
                />
                {errors.name && <p className="text-xs text-rose-700 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="serviceCategory" className="text-xs uppercase tracking-wider text-[#2C2A29] font-medium block mb-1">
                  Category *
                </label>
                <select
                  id="serviceCategory"
                  value={formData.category || "Wedding Photography"}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-white border border-[#DCD5C9] rounded-lg px-3.5 py-2 text-xs text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && <p className="text-xs text-rose-700 mt-1">{errors.category}</p>}
              </div>
            </div>

            {/* Tagline / Short Description */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="shortDescription" className="text-xs uppercase tracking-wider text-[#2C2A29] font-medium">
                  Short Description (Tagline) *
                </label>
                <span className="text-[11px] font-mono text-[#8C857B]">
                  {(formData.shortDescription || "").length}/180
                </span>
              </div>
              <input
                id="shortDescription"
                type="text"
                maxLength={180}
                value={formData.shortDescription || ""}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                placeholder="Comprehensive multi-event documentary coverage..."
                className="w-full bg-white border border-[#DCD5C9] rounded-lg px-3.5 py-2 text-xs text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
              {errors.shortDescription && (
                <p className="text-xs text-rose-700 mt-1">{errors.shortDescription}</p>
              )}
            </div>

            {/* Full Description */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="fullDescription" className="text-xs uppercase tracking-wider text-[#2C2A29] font-medium">
                  Full Description
                </label>
                <span className="text-[11px] font-mono text-[#8C857B]">
                  {(formData.description || "").length}/800
                </span>
              </div>
              <textarea
                id="fullDescription"
                rows={4}
                maxLength={800}
                value={formData.description || ""}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe what makes this service special, how you approach the day..."
                className="w-full bg-white border border-[#DCD5C9] rounded-lg p-3 text-xs text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
            </div>
          </div>

          {/* Section 2: Pricing & Logistics */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-wider text-[#8C857B] font-semibold border-b border-[#E8E2D9] pb-2">
              2. Pricing &amp; Logistics
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="pricingType" className="text-xs uppercase tracking-wider text-[#2C2A29] font-medium block mb-1">
                  Pricing Structure
                </label>
                <select
                  id="pricingType"
                  value={formData.pricingType || "STARTING_FROM"}
                  onChange={(e) =>
                    setFormData({ ...formData, pricingType: e.target.value as PricingType })
                  }
                  className="w-full bg-white border border-[#DCD5C9] rounded-lg px-3.5 py-2 text-xs text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
                >
                  <option value="STARTING_FROM">Starting From</option>
                  <option value="FIXED">Fixed Price</option>
                  <option value="CUSTOM_QUOTE">Custom Quote</option>
                </select>
              </div>

              {formData.pricingType !== "CUSTOM_QUOTE" && (
                <div>
                  <label htmlFor="priceAmount" className="text-xs uppercase tracking-wider text-[#2C2A29] font-medium block mb-1">
                    Price (INR ₹) *
                  </label>
                  <input
                    id="priceAmount"
                    type="number"
                    min="0"
                    value={formData.price !== undefined ? formData.price : ""}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    placeholder="e.g. 150000"
                    className="w-full bg-white border border-[#DCD5C9] rounded-lg px-3.5 py-2 text-xs text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
                  />
                  {errors.price && <p className="text-xs text-rose-700 mt-1">{errors.price}</p>}
                </div>
              )}

              <div>
                <label htmlFor="duration" className="text-xs uppercase tracking-wider text-[#2C2A29] font-medium block mb-1">
                  Duration / Coverage
                </label>
                <input
                  id="duration"
                  type="text"
                  value={formData.duration || ""}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="e.g. 3 Days / Up to 28 Hours"
                  className="w-full bg-white border border-[#DCD5C9] rounded-lg px-3.5 py-2 text-xs text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="delivery" className="text-xs uppercase tracking-wider text-[#2C2A29] font-medium block mb-1">
                Gallery &amp; Deliverables Timeline
              </label>
              <input
                id="delivery"
                type="text"
                value={formData.delivery || ""}
                onChange={(e) => setFormData({ ...formData, delivery: e.target.value })}
                placeholder="e.g. Edited Digital Gallery (4-6 Weeks) + Signature Fine Art Album"
                className="w-full bg-white border border-[#DCD5C9] rounded-lg px-3.5 py-2 text-xs text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
            </div>
          </div>

          {/* Section 3: Inclusions & Add-Ons */}
          <div className="space-y-6">
            <h3 className="text-xs uppercase tracking-wider text-[#8C857B] font-semibold border-b border-[#E8E2D9] pb-2">
              3. Inclusions &amp; Add-Ons
            </h3>

            <ServiceInclusions
              inclusions={formData.inclusions || []}
              onChange={(updated) => setFormData({ ...formData, inclusions: updated })}
            />

            <ServiceAddOns
              addOns={(formData.addOns as VendorAddOn[]) || []}
              onChange={(updated) => setFormData({ ...formData, addOns: updated })}
            />
          </div>

          {/* Section 4: Settings & Visibility */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-wider text-[#8C857B] font-semibold border-b border-[#E8E2D9] pb-2">
              4. Availability, Visibility &amp; Featuring
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ServiceAvailability
                availability={(formData.availability as ServiceAvailabilityType) || "AVAILABLE"}
                onChange={(status) => setFormData({ ...formData, availability: status })}
              />

              <ServiceVisibility
                visibility={(formData.visibility as ServiceVisibilityType) || "PUBLIC"}
                onChange={(status) => setFormData({ ...formData, visibility: status })}
              />
            </div>

            {/* Featured Checkbox */}
            <div className="pt-2 flex items-center gap-3 p-3 rounded-lg bg-white border border-[#E8E2D9]">
              <input
                id="featuredToggle"
                type="checkbox"
                checked={Boolean(formData.featured)}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="rounded border-[#DCD5C9] text-[#2C2A29] focus:ring-[#C5A880]"
              />
              <label htmlFor="featuredToggle" className="text-xs text-[#2C2A29] font-medium cursor-pointer flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Feature this service prominently at the top of your studio dashboard &amp; directory listing</span>
              </label>
            </div>
          </div>
        </form>

        {/* Modal Footer */}
        <div className="p-4 md:p-6 border-t border-[#E8E2D9] flex items-center justify-between shrink-0 bg-[#F2ECE4]/50">
          <span className="text-xs text-[#8C857B] italic">
            Session edits reset on hard page refresh.
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium uppercase tracking-wider text-[#6E6B65] hover:text-[#2C2A29]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-5 py-2 text-xs font-medium uppercase tracking-wider text-white bg-[#2C2A29] rounded-md hover:bg-[#1A1918] shadow-xs"
            >
              Save Service
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
