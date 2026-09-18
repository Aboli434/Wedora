"use client";

import React from "react";
import { VendorService } from "@/data/vendorServices";
import {
  formatIndianCurrency,
  formatPricingType,
  formatAvailability,
  formatVisibility,
} from "@/lib/vendorServices";
import { Sparkles, Edit2, Copy, Eye, EyeOff, CheckCircle2 } from "lucide-react";

interface FeaturedServiceProps {
  service: VendorService;
  onEdit: (service: VendorService) => void;
  onDuplicate: (service: VendorService) => void;
  onToggleVisibility: (service: VendorService) => void;
}

export function FeaturedService({
  service,
  onEdit,
  onDuplicate,
  onToggleVisibility,
}: FeaturedServiceProps) {
  const formattedPrice =
    service.pricingType === "CUSTOM_QUOTE"
      ? "Custom Quote"
      : formatIndianCurrency(service.price);

  return (
    <section className="bg-[#161514] text-[#FAF8F5] rounded-xl p-6 sm:p-8 space-y-6 border border-[#2C2A28] relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A880]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Tag */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#2C2A28] pb-4 relative z-10">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#C5A880]" />
          <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold">
            FEATURED SIGNATURE OFFERING
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`text-[9px] font-mono tracking-wider uppercase px-2.5 py-0.5 rounded border ${
              service.visibility === "PUBLIC"
                ? "bg-emerald-950/60 text-emerald-300 border-emerald-800"
                : "bg-neutral-800 text-neutral-400 border-neutral-700"
            }`}
          >
            {formatVisibility(service.visibility)}
          </span>
          <span className="text-[9px] font-mono tracking-wider uppercase px-2.5 py-0.5 rounded bg-[#242220] border border-[#3A3734] text-[#C5A880]">
            {formatAvailability(service.availability)}
          </span>
        </div>
      </div>

      {/* Main Title & Price Block */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
        <div className="space-y-2 max-w-2xl">
          <span className="text-xs font-mono uppercase text-[#A39C93]">{service.category}</span>
          <h3 className="font-serif text-3xl sm:text-4xl text-[#FAF8F5] font-light">
            {service.name}
          </h3>
          <p className="text-sm text-[#A39C93] leading-relaxed pt-1">
            {service.description}
          </p>
        </div>

        <div className="md:text-right shrink-0 space-y-1">
          <span className="text-[10px] font-sans uppercase tracking-widest text-[#8C857B] block">
            {formatPricingType(service.pricingType)}
          </span>
          <p className="font-serif text-3xl sm:text-4xl text-[#C5A880] font-light">
            {formattedPrice}
          </p>
          {service.duration && (
            <p className="text-xs text-[#A39C93] font-mono pt-1">{service.duration}</p>
          )}
        </div>
      </div>

      {/* Key Inclusions Snapshot */}
      {service.inclusions && service.inclusions.length > 0 && (
        <div className="space-y-3 pt-2 relative z-10 border-t border-[#2C2A28]">
          <span className="text-[10px] font-sans tracking-widest uppercase text-[#8C857B] font-semibold block">
            PACKAGE INCLUSIONS
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {service.inclusions.map((inc, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-[#EAE6DF]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880] shrink-0 mt-0.5" />
                <span>{inc}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer Actions */}
      <div className="pt-4 border-t border-[#2C2A28] flex flex-wrap items-center justify-between gap-4 relative z-10">
        <span className="text-xs text-[#8C857B] font-mono">
          Delivery: {service.delivery || "Standard delivery terms"}
        </span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onToggleVisibility(service)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#EAE6DF] border border-[#3A3734] rounded hover:bg-[#242220] transition-colors"
          >
            {service.visibility === "PUBLIC" ? (
              <>
                <EyeOff className="w-3.5 h-3.5 text-[#8C857B]" />
                <span>Make Private</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Make Public</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => onDuplicate(service)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#EAE6DF] border border-[#3A3734] rounded hover:bg-[#242220] transition-colors"
          >
            <Copy className="w-3.5 h-3.5 text-[#8C857B]" />
            <span>Duplicate</span>
          </button>

          <button
            type="button"
            onClick={() => onEdit(service)}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-[#161514] bg-[#C5A880] hover:bg-[#d5b991] transition-colors rounded shadow-xs"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>Edit Offering</span>
          </button>
        </div>
      </div>
    </section>
  );
}
