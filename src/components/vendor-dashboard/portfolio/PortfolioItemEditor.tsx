"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  VendorPortfolioItem,
  PortfolioCategory,
  PortfolioVisibility,
} from "@/data/vendorPortfolio";
import { validatePortfolioItem } from "@/lib/vendorPortfolio";
import { X, Camera, Sparkles } from "lucide-react";

interface PortfolioItemEditorProps {
  item?: VendorPortfolioItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: VendorPortfolioItem) => void;
}

const CATEGORIES: { value: PortfolioCategory; label: string }[] = [
  { value: "WEDDINGS", label: "Weddings" },
  { value: "PRE_WEDDING", label: "Pre-Wedding" },
  { value: "PORTRAITS", label: "Portraits" },
  { value: "DETAILS", label: "Details" },
  { value: "DECOR", label: "Decor & Floral" },
  { value: "EVENTS", label: "Events & Parties" },
  { value: "OTHER", label: "Other Work" },
];

const DEMO_IMAGE_ASSETS = [
  { src: "/images/wedding/wedora-wedding-aditi-arjun.jpg", alt: "Aditi & Arjun Heritage Wedding" },
  { src: "/images/wedding/wedora-wedding-meera-rohan.jpg", alt: "Meera & Rohan Coastal Wedding" },
  { src: "/images/wedding/wedora-wedding-isha-kunal.jpg", alt: "Isha & Kunal Editorial Wedding" },
  { src: "/images/wedding/wedora-vendor-courtyard-estate.jpg", alt: "Udaipur Palatial Courtyard" },
  { src: "/images/wedding/wedora-gallery-01.jpg", alt: "Bridal Adornments & Jewelry" },
  { src: "/images/wedding/wedora-gallery-03.jpg", alt: "Marigold Floral Installation" },
  { src: "/images/wedding/wedora-service-events.jpg", alt: "Coastal Reception Event" },
  { src: "/images/wedding/wedora-gallery-05.jpg", alt: "Sunset Pheras Sacred Fire" },
];

export function PortfolioItemEditor({ item, isOpen, onClose, onSave }: PortfolioItemEditorProps) {
  const [formData, setFormData] = useState<Partial<VendorPortfolioItem>>({
    title: "",
    description: "",
    category: "WEDDINGS",
    imageSrc: "/images/wedding/wedora-wedding-aditi-arjun.jpg",
    imageAlt: "Aditi & Arjun intimate heritage wedding portrait in Udaipur",
    location: "Udaipur, Rajasthan",
    eventType: "Wedding Ceremony",
    coupleName: "Aditi & Arjun",
    year: 2026,
    featured: false,
    visibility: "PUBLIC",
  });

  const [prevItem, setPrevItem] = useState<VendorPortfolioItem | null | undefined>(undefined);
  const [prevIsOpen, setPrevIsOpen] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showImageSelector, setShowImageSelector] = useState(false);

  // Sync state during render when props change
  if (item !== prevItem || isOpen !== prevIsOpen) {
    setPrevItem(item);
    setPrevIsOpen(isOpen);
    if (isOpen) {
      if (item) {
        setFormData(item);
      } else {
        setFormData({
          title: "",
          description: "",
          category: "WEDDINGS",
          imageSrc: "/images/wedding/wedora-wedding-aditi-arjun.jpg",
          imageAlt: "Aditi & Arjun intimate heritage wedding portrait in Udaipur",
          location: "Udaipur, Rajasthan",
          eventType: "Wedding Ceremony",
          coupleName: "Aditi & Arjun",
          year: 2026,
          featured: false,
          visibility: "PUBLIC",
        });
      }
      setErrors({});
      setShowImageSelector(false);
    }
  }

  // Handle Escape key close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        if (showImageSelector) {
          setShowImageSelector(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, showImageSelector, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validatePortfolioItem(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const finalItem: VendorPortfolioItem = {
      id: item?.id || `port-${Date.now()}`,
      title: formData.title || "Untitled Portfolio Work",
      description: formData.description || "",
      category: (formData.category as PortfolioCategory) || "WEDDINGS",
      imageSrc: formData.imageSrc || "/images/wedding/wedora-wedding-aditi-arjun.jpg",
      imageAlt: formData.imageAlt || "Portfolio image",
      location: formData.location || "",
      eventType: formData.eventType || "",
      coupleName: formData.coupleName || "",
      year: formData.year || 2026,
      featured: Boolean(formData.featured),
      visibility: (formData.visibility as PortfolioVisibility) || "PUBLIC",
      sortOrder: item?.sortOrder || Date.now(),
      updatedAt: "Today",
    };

    onSave(finalItem);
    onClose();
  };

  const handleSelectDemoAsset = (asset: { src: string; alt: string }) => {
    setFormData({
      ...formData,
      imageSrc: asset.src,
      imageAlt: asset.alt,
    });
    setShowImageSelector(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
      <div
        className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl relative my-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="portfolio-editor-title"
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-[#E8E2D9] flex items-center justify-between shrink-0 bg-[#F2ECE4]/50">
          <div>
            <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#C5A880] font-semibold block">
              PORTFOLIO EDITOR
            </span>
            <h2 id="portfolio-editor-title" className="font-serif text-2xl text-[#2C2A29]">
              {item ? "Edit Portfolio Work" : "Add Portfolio Work"}
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

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Image Selection Preview */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs uppercase tracking-wider text-[#2C2A29] font-medium block">
                Portfolio Artwork / Image *
              </label>
              <button
                type="button"
                onClick={() => setShowImageSelector(true)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#C5A880] hover:text-[#2C2A29]"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Replace Image (Demo Selector)</span>
              </button>
            </div>

            <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden border border-[#E8E2D9] bg-[#F2ECE4]">
              <Image
                src={formData.imageSrc || "/images/wedding/wedora-wedding-aditi-arjun.jpg"}
                alt={formData.imageAlt || "Portfolio image preview"}
                fill
                className="object-cover"
              />
            </div>
            {errors.imageSrc && <p className="text-xs text-rose-700">{errors.imageSrc}</p>}
          </div>

          {/* Title & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="portTitle" className="text-xs uppercase tracking-wider text-[#2C2A29] font-medium block mb-1">
                Title *
              </label>
              <input
                id="portTitle"
                type="text"
                value={formData.title || ""}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Aditi & Arjun — Heritage Celebration"
                className="w-full bg-white border border-[#DCD5C9] rounded-lg px-3.5 py-2 text-xs text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
              {errors.title && <p className="text-xs text-rose-700 mt-1">{errors.title}</p>}
            </div>

            <div>
              <label htmlFor="portCategory" className="text-xs uppercase tracking-wider text-[#2C2A29] font-medium block mb-1">
                Category *
              </label>
              <select
                id="portCategory"
                value={formData.category || "WEDDINGS"}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value as PortfolioCategory })
                }
                className="w-full bg-white border border-[#DCD5C9] rounded-lg px-3.5 py-2 text-xs text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
              {errors.category && <p className="text-xs text-rose-700 mt-1">{errors.category}</p>}
            </div>
          </div>

          {/* Image Alt Text */}
          <div>
            <label htmlFor="portImageAlt" className="text-xs uppercase tracking-wider text-[#2C2A29] font-medium block mb-1">
              Accessibility Image Alt Text *
            </label>
            <input
              id="portImageAlt"
              type="text"
              value={formData.imageAlt || ""}
              onChange={(e) => setFormData({ ...formData, imageAlt: e.target.value })}
              placeholder="Detailed description of what is depicted in the photograph..."
              className="w-full bg-white border border-[#DCD5C9] rounded-lg px-3.5 py-2 text-xs text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
            />
            {errors.imageAlt && <p className="text-xs text-rose-700 mt-1">{errors.imageAlt}</p>}
          </div>

          {/* Caption / Description */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="portDescription" className="text-xs uppercase tracking-wider text-[#2C2A29] font-medium">
                Story Caption / Description
              </label>
              <span className="text-[11px] font-mono text-[#8C857B]">
                {(formData.description || "").length}/300
              </span>
            </div>
            <textarea
              id="portDescription"
              rows={3}
              maxLength={300}
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the moment, atmosphere, lighting, or story behind this photograph..."
              className="w-full bg-white border border-[#DCD5C9] rounded-lg p-3 text-xs text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
            />
          </div>

          {/* Metadata Row: Location, Event Type, Couple, Year */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label htmlFor="portLocation" className="text-[10px] uppercase tracking-wider text-[#8C857B] font-medium block mb-1">
                Location
              </label>
              <input
                id="portLocation"
                type="text"
                value={formData.location || ""}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Udaipur"
                className="w-full bg-white border border-[#DCD5C9] rounded px-3 py-1.5 text-xs text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
            </div>

            <div>
              <label htmlFor="portEventType" className="text-[10px] uppercase tracking-wider text-[#8C857B] font-medium block mb-1">
                Event Type
              </label>
              <input
                id="portEventType"
                type="text"
                value={formData.eventType || ""}
                onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                placeholder="e.g. Pheras Ceremony"
                className="w-full bg-white border border-[#DCD5C9] rounded px-3 py-1.5 text-xs text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
            </div>

            <div>
              <label htmlFor="portCouple" className="text-[10px] uppercase tracking-wider text-[#8C857B] font-medium block mb-1">
                Couple / Story Name
              </label>
              <input
                id="portCouple"
                type="text"
                value={formData.coupleName || ""}
                onChange={(e) => setFormData({ ...formData, coupleName: e.target.value })}
                placeholder="e.g. Aditi & Arjun"
                className="w-full bg-white border border-[#DCD5C9] rounded px-3 py-1.5 text-xs text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
            </div>

            <div>
              <label htmlFor="portYear" className="text-[10px] uppercase tracking-wider text-[#8C857B] font-medium block mb-1">
                Year
              </label>
              <input
                id="portYear"
                type="number"
                value={formData.year || 2026}
                onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                className="w-full bg-white border border-[#DCD5C9] rounded px-3 py-1.5 text-xs text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
            </div>
          </div>

          {/* Toggles: Visibility & Featured */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#E8E2D9]">
            <div>
              <label htmlFor="portVisibilitySelect" className="text-xs uppercase tracking-wider text-[#2C2A29] font-medium block mb-1">
                Directory Visibility
              </label>
              <select
                id="portVisibilitySelect"
                value={formData.visibility || "PUBLIC"}
                onChange={(e) =>
                  setFormData({ ...formData, visibility: e.target.value as PortfolioVisibility })
                }
                className="w-full bg-white border border-[#DCD5C9] rounded-lg px-3 py-2 text-xs text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              >
                <option value="PUBLIC">Public (Visible to couples)</option>
                <option value="PRIVATE">Private (Studio internal only)</option>
              </select>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-white border border-[#E8E2D9] self-end">
              <input
                id="portFeaturedToggle"
                type="checkbox"
                checked={Boolean(formData.featured)}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="rounded border-[#DCD5C9] text-[#2C2A29] focus:ring-[#C5A880]"
              />
              <label htmlFor="portFeaturedToggle" className="text-xs text-[#2C2A29] font-medium cursor-pointer flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Mark as Featured Signature Work</span>
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
              Save Portfolio Item
            </button>
          </div>
        </div>
      </div>

      {/* Demo Image Selector Modal */}
      {showImageSelector && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E8E2D9] pb-3">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-[#C5A880]" />
                <h3 className="font-serif text-lg text-[#2C2A29]">Select Demo Image Asset</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowImageSelector(false)}
                className="text-[#8C857B] hover:text-[#2C2A29] text-lg"
              >
                &times;
              </button>
            </div>

            <p className="text-xs text-[#6E6B65]">
              Image uploads will be connected when the vendor media service is added. Choose an existing studio asset for this demo session:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-64 overflow-y-auto p-1">
              {DEMO_IMAGE_ASSETS.map((asset, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => handleSelectDemoAsset(asset)}
                  className="relative aspect-[4/3] rounded-lg overflow-hidden border border-[#DCD5C9] hover:border-[#2C2A29] hover:scale-105 transition-all group text-left"
                >
                  <Image src={asset.src} alt={asset.alt} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity p-1 text-[9px] text-white font-medium flex items-end">
                    {asset.alt}
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-[#E8E2D9] flex justify-end">
              <button
                type="button"
                onClick={() => setShowImageSelector(false)}
                className="px-4 py-1.5 text-xs text-[#6E6B65] hover:text-[#2C2A29]"
              >
                Close Selector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
