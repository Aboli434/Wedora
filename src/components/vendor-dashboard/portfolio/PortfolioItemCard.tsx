"use client";

import React, { useState } from "react";
import Image from "next/image";
import { VendorPortfolioItem } from "@/data/vendorPortfolio";
import {
  formatPortfolioCategory,
  formatPortfolioVisibility,
} from "@/lib/vendorPortfolio";
import {
  Edit2,
  Copy,
  Eye,
  EyeOff,
  Trash2,
  Sparkles,
  MapPin,
  ChevronUp,
  ChevronDown,
  AlertTriangle,
  ZoomIn,
} from "lucide-react";

interface PortfolioItemCardProps {
  item: VendorPortfolioItem;
  index: number;
  totalItems: number;
  onEdit: (item: VendorPortfolioItem) => void;
  onDuplicate: (item: VendorPortfolioItem) => void;
  onToggleVisibility: (item: VendorPortfolioItem) => void;
  onToggleFeatured: (item: VendorPortfolioItem) => void;
  onDelete: (itemId: string) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onPreviewImage: (item: VendorPortfolioItem) => void;
}

export function PortfolioItemCard({
  item,
  index,
  totalItems,
  onEdit,
  onDuplicate,
  onToggleVisibility,
  onToggleFeatured,
  onDelete,
  onMoveUp,
  onMoveDown,
  onPreviewImage,
}: PortfolioItemCardProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteConfirm = () => {
    onDelete(item.id);
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl overflow-hidden shadow-2xs hover:border-[#2C2A29]/30 transition-all flex flex-col justify-between group">
        {/* Image Container with Zoom Trigger */}
        <div className="relative aspect-[4/3] w-full bg-[#F2ECE4] overflow-hidden">
          <Image
            src={item.imageSrc}
            alt={item.imageAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
            onClick={() => onPreviewImage(item)}
          />

          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10 pointer-events-none">
            <span
              className={`text-[9px] font-mono tracking-wider uppercase px-2 py-0.5 rounded border ${
                item.visibility === "PUBLIC"
                  ? "bg-white/90 text-[#2C2A29] border-[#DCD5C9] backdrop-blur-xs"
                  : "bg-neutral-900/80 text-white border-neutral-700 backdrop-blur-xs"
              }`}
            >
              {formatPortfolioVisibility(item.visibility)}
            </span>

            {item.featured && (
              <span className="inline-flex items-center gap-1 text-[9px] font-mono tracking-wider uppercase px-2 py-0.5 rounded bg-[#2C2A29] text-[#FAF8F5] border border-[#C5A880]">
                <Sparkles className="w-2.5 h-2.5 text-[#C5A880]" />
                FEATURED
              </span>
            )}
          </div>

          {/* Zoom Overlay Button */}
          <button
            type="button"
            onClick={() => onPreviewImage(item)}
            className="absolute bottom-3 right-3 p-2 rounded-full bg-black/60 backdrop-blur-xs text-white opacity-0 group-hover:opacity-100 transition-opacity hover:text-[#C5A880]"
            title="Expand Full Preview"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>

        {/* Card Content Body */}
        <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-mono uppercase text-[#C5A880] tracking-wider font-semibold">
                {formatPortfolioCategory(item.category)}
              </span>
              {item.location && (
                <span className="inline-flex items-center gap-1 text-[11px] text-[#8C857B]">
                  <MapPin className="w-3 h-3 text-[#C5A880]" />
                  {item.location}
                </span>
              )}
            </div>

            <h3 className="font-serif text-xl text-[#2C2A29] font-medium leading-snug group-hover:text-[#C5A880] transition-colors">
              {item.title}
            </h3>

            {item.description && (
              <p className="text-xs text-[#6E6B65] line-clamp-2 leading-relaxed">
                {item.description}
              </p>
            )}
          </div>

          {/* Footer Controls & Manual Ordering */}
          <div className="pt-3 border-t border-[#E8E2D9] flex items-center justify-between gap-2 text-xs">
            {/* Manual Order Arrows */}
            <div className="flex items-center gap-0.5 bg-[#F2ECE4] border border-[#E5DEC9] rounded p-0.5">
              <button
                type="button"
                disabled={index === 0}
                onClick={() => onMoveUp(index)}
                className={`p-1 rounded ${
                  index === 0 ? "text-[#C8C2B7] cursor-not-allowed" : "text-[#594B3C] hover:bg-white"
                }`}
                title="Move Up in Gallery Order"
              >
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                disabled={index === totalItems - 1}
                onClick={() => onMoveDown(index)}
                className={`p-1 rounded ${
                  index === totalItems - 1 ? "text-[#C8C2B7] cursor-not-allowed" : "text-[#594B3C] hover:bg-white"
                }`}
                title="Move Down in Gallery Order"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => onToggleFeatured(item)}
                className={`p-1.5 rounded transition-colors ${
                  item.featured ? "text-[#C5A880] hover:bg-[#F2ECE4]" : "text-[#8C857B] hover:text-[#2C2A29] hover:bg-[#F2ECE4]"
                }`}
                title={item.featured ? "Unmark Featured" : "Mark as Featured"}
              >
                <Sparkles className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => onToggleVisibility(item)}
                className="p-1.5 text-[#8C857B] hover:text-[#2C2A29] rounded hover:bg-[#F2ECE4] transition-colors"
                title={item.visibility === "PUBLIC" ? "Make Private" : "Make Public"}
              >
                {item.visibility === "PUBLIC" ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-[#C5A880]" />}
              </button>

              <button
                type="button"
                onClick={() => onDuplicate(item)}
                className="p-1.5 text-[#8C857B] hover:text-[#2C2A29] rounded hover:bg-[#F2ECE4] transition-colors"
                title="Duplicate Work"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => onEdit(item)}
                className="p-1.5 text-[#8C857B] hover:text-[#2C2A29] rounded hover:bg-[#F2ECE4] transition-colors"
                title="Edit Work Details"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className="p-1.5 text-[#8C857B] hover:text-rose-700 rounded hover:bg-rose-50 transition-colors"
                title="Delete Portfolio Item"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div
            className="bg-[#FAF8F5] border border-rose-200 rounded-xl max-w-md w-full p-6 space-y-5 shadow-2xl relative"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`delete-port-title-${item.id}`}
          >
            <div className="flex items-center gap-3 border-b border-[#E8E2D9] pb-3">
              <AlertTriangle className="w-5 h-5 text-rose-700 shrink-0" />
              <h4 id={`delete-port-title-${item.id}`} className="font-serif text-lg text-rose-950 font-medium">
                Delete Portfolio Work?
              </h4>
            </div>

            <p className="text-xs text-[#5A5650] leading-relaxed">
              Are you sure you want to remove <strong className="text-[#2C2A29]">&ldquo;{item.title}&rdquo;</strong> from your portfolio? This action cannot be undone for this session.
            </p>

            <div className="pt-2 border-t border-[#E8E2D9] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-xs font-medium uppercase tracking-wider text-[#6E6B65] hover:text-[#2C2A29]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="px-5 py-2 text-xs font-medium uppercase tracking-wider text-white bg-rose-900 hover:bg-rose-950 rounded shadow-xs"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
