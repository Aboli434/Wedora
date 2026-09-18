"use client";

import React, { useState } from "react";
import { VendorService } from "@/data/vendorServices";
import {
  formatIndianCurrency,
  formatPricingType,
  formatAvailability,
  formatVisibility,
  calculateServiceCompletion,
} from "@/lib/vendorServices";
import { Edit2, Copy, Eye, EyeOff, Trash2, Sparkles, AlertTriangle } from "lucide-react";

interface ServiceListItemProps {
  service: VendorService;
  onEdit: (service: VendorService) => void;
  onDuplicate: (service: VendorService) => void;
  onToggleVisibility: (service: VendorService) => void;
  onDelete: (serviceId: string) => void;
}

export function ServiceListItem({
  service,
  onEdit,
  onDuplicate,
  onToggleVisibility,
  onDelete,
}: ServiceListItemProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const formattedPrice =
    service.pricingType === "CUSTOM_QUOTE"
      ? "Custom Quote"
      : formatIndianCurrency(service.price);

  const completion = calculateServiceCompletion(service);

  const handleDeleteConfirm = () => {
    onDelete(service.id);
    setShowDeleteModal(false);
  };

  return (
    <>
      {/* Desktop Table Row */}
      <tr className="hidden md:table-row border-b border-[#E8E2D9] hover:bg-[#F9F7F4] transition-colors group">
        {/* Service Name & Description */}
        <td className="py-4 px-4 align-top">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {service.featured && (
                <span title="Featured Signature Service">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                </span>
              )}
              <span className="font-serif text-base text-[#2C2A29] font-medium group-hover:text-[#C5A880] transition-colors">
                {service.name}
              </span>
            </div>
            <p className="text-xs text-[#6E6B65] line-clamp-1 max-w-sm">
              {service.shortDescription}
            </p>
          </div>
        </td>

        {/* Category */}
        <td className="py-4 px-4 align-top text-xs text-[#5A5650] font-medium">
          {service.category}
        </td>

        {/* Pricing */}
        <td className="py-4 px-4 align-top">
          <div className="space-y-0.5">
            <p className="text-sm font-serif font-medium text-[#2C2A29]">{formattedPrice}</p>
            <span className="text-[10px] font-mono text-[#8C857B] block">
              {formatPricingType(service.pricingType)}
            </span>
          </div>
        </td>

        {/* Availability */}
        <td className="py-4 px-4 align-top">
          <span
            className={`text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border ${
              service.availability === "AVAILABLE"
                ? "bg-emerald-50 text-emerald-900 border-emerald-200"
                : service.availability === "LIMITED"
                ? "bg-amber-50 text-amber-900 border-amber-200"
                : "bg-neutral-100 text-neutral-600 border-neutral-200"
            }`}
          >
            {formatAvailability(service.availability)}
          </span>
        </td>

        {/* Visibility */}
        <td className="py-4 px-4 align-top">
          <span
            className={`text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border ${
              service.visibility === "PUBLIC"
                ? "bg-[#F2ECE4] text-[#594B3C] border-[#E5DEC9]"
                : "bg-neutral-100 text-neutral-600 border-neutral-200"
            }`}
          >
            {formatVisibility(service.visibility)}
          </span>
        </td>

        {/* Completion / Updated */}
        <td className="py-4 px-4 align-top text-xs text-[#8C857B] font-mono">
          <div>
            <span>{completion}% complete</span>
            <span className="block text-[10px] text-[#A39C93]">Updated {service.updatedAt}</span>
          </div>
        </td>

        {/* Actions */}
        <td className="py-4 px-4 align-top text-right">
          <div className="flex items-center justify-end gap-1.5">
            <button
              type="button"
              onClick={() => onToggleVisibility(service)}
              className="p-1.5 text-[#8C857B] hover:text-[#2C2A29] rounded hover:bg-[#F2ECE4] transition-colors"
              title={service.visibility === "PUBLIC" ? "Make Private" : "Make Public"}
            >
              {service.visibility === "PUBLIC" ? (
                <EyeOff className="w-3.5 h-3.5" />
              ) : (
                <Eye className="w-3.5 h-3.5 text-[#C5A880]" />
              )}
            </button>

            <button
              type="button"
              onClick={() => onDuplicate(service)}
              className="p-1.5 text-[#8C857B] hover:text-[#2C2A29] rounded hover:bg-[#F2ECE4] transition-colors"
              title="Duplicate Service"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => onEdit(service)}
              className="p-1.5 text-[#8C857B] hover:text-[#2C2A29] rounded hover:bg-[#F2ECE4] transition-colors"
              title="Edit Service"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="p-1.5 text-[#8C857B] hover:text-rose-700 rounded hover:bg-rose-50 transition-colors"
              title="Delete Service"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </td>
      </tr>

      {/* Mobile Stacked Card */}
      <div className="md:hidden bg-white border border-[#E8E2D9] rounded-xl p-5 space-y-4 shadow-2xs">
        <div className="flex items-start justify-between gap-3 border-b border-[#E8E2D9] pb-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {service.featured && <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />}
              <h3 className="font-serif text-xl text-[#2C2A29] font-medium">{service.name}</h3>
            </div>
            <span className="text-xs font-mono text-[#8C857B] block">{service.category}</span>
          </div>

          <div className="text-right">
            <p className="font-serif text-lg font-light text-[#2C2A29]">{formattedPrice}</p>
            <span className="text-[10px] font-mono text-[#8C857B]">
              {formatPricingType(service.pricingType)}
            </span>
          </div>
        </div>

        <p className="text-xs text-[#5A5650] leading-relaxed">{service.shortDescription}</p>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#E8E2D9] text-xs">
          <div className="flex items-center gap-2">
            <span
              className={`text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border ${
                service.availability === "AVAILABLE"
                  ? "bg-emerald-50 text-emerald-900 border-emerald-200"
                  : "bg-amber-50 text-amber-900 border-amber-200"
              }`}
            >
              {formatAvailability(service.availability)}
            </span>
            <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#F2ECE4] border border-[#E5DEC9] text-[#594B3C]">
              {formatVisibility(service.visibility)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onToggleVisibility(service)}
              className="p-2 text-[#8C857B] hover:text-[#2C2A29] border border-[#DCD5C9] rounded"
            >
              {service.visibility === "PUBLIC" ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4 text-[#C5A880]" />}
            </button>

            <button
              type="button"
              onClick={() => onEdit(service)}
              className="px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-white bg-[#2C2A29] rounded"
            >
              Edit
            </button>

            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="p-2 text-rose-700 border border-rose-200 rounded hover:bg-rose-50"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div
            className="bg-[#FAF8F5] border border-rose-200 rounded-xl max-w-md w-full p-6 space-y-5 shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`delete-title-${service.id}`}
          >
            <div className="flex items-center gap-3 border-b border-[#E8E2D9] pb-3">
              <AlertTriangle className="w-5 h-5 text-rose-700 shrink-0" />
              <h4 id={`delete-title-${service.id}`} className="font-serif text-lg text-rose-950 font-medium">
                Delete Service Offering?
              </h4>
            </div>

            <p className="text-xs text-[#5A5650] leading-relaxed">
              Are you sure you want to delete <strong className="text-[#2C2A29]">&ldquo;{service.name}&rdquo;</strong>? This action cannot be undone for this session.
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
