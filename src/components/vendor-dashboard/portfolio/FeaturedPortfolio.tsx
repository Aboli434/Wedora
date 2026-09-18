"use client";

import React from "react";
import Image from "next/image";
import { VendorPortfolioItem } from "@/data/vendorPortfolio";
import { formatPortfolioCategory } from "@/lib/vendorPortfolio";
import { Sparkles, Edit2, MapPin, Eye } from "lucide-react";

interface FeaturedPortfolioProps {
  items: VendorPortfolioItem[];
  onEdit: (item: VendorPortfolioItem) => void;
  onPreviewImage: (item: VendorPortfolioItem) => void;
}

export function FeaturedPortfolio({ items, onEdit, onPreviewImage }: FeaturedPortfolioProps) {
  if (items.length === 0) return null;

  const heroItem = items[0];
  const supportingItems = items.slice(1, 3);

  return (
    <section className="bg-[#161514] text-[#FAF8F5] rounded-xl p-6 sm:p-8 space-y-6 border border-[#2C2A28] relative overflow-hidden">
      {/* Accent Background Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#C5A880]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Tag */}
      <div className="flex items-center justify-between border-b border-[#2C2A28] pb-4 relative z-10">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#C5A880]" />
          <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold">
            FEATURED SIGNATURE WORK
          </span>
        </div>
        <span className="text-[10px] font-mono text-[#8C857B]">{items.length} Featured Items</span>
      </div>

      {/* Asymmetric Composition Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        {/* Dominant Hero Item (8 Cols) */}
        <div className="lg:col-span-8 group relative rounded-lg overflow-hidden border border-[#2C2A28] bg-[#242220] flex flex-col justify-end min-h-[360px] sm:min-h-[440px]">
          <Image
            src={heroItem.imageSrc}
            alt={heroItem.imageAlt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

          {/* Top Floating Controls */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
            <button
              type="button"
              onClick={() => onPreviewImage(heroItem)}
              className="p-2 rounded-full bg-black/60 backdrop-blur-xs text-white hover:text-[#C5A880] transition-colors"
              title="View Full Image"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onEdit(heroItem)}
              className="p-2 rounded-full bg-black/60 backdrop-blur-xs text-white hover:text-[#C5A880] transition-colors"
              title="Edit Item"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom Information */}
          <div className="relative z-20 p-6 space-y-2 transform transition-transform duration-300 group-hover:-translate-y-1">
            <div className="flex items-center gap-2 text-xs text-[#C5A880] font-mono">
              <span>{formatPortfolioCategory(heroItem.category)}</span>
              {heroItem.location && (
                <>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1 text-[#A39C93]">
                    <MapPin className="w-3 h-3 text-[#C5A880]" />
                    {heroItem.location}
                  </span>
                </>
              )}
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF8F5] font-light">
              {heroItem.title}
            </h3>

            {heroItem.description && (
              <p className="text-xs text-[#A39C93] line-clamp-2 max-w-xl font-sans">
                {heroItem.description}
              </p>
            )}
          </div>
        </div>

        {/* Supporting Items Column (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6 justify-between">
          {supportingItems.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-lg overflow-hidden border border-[#2C2A28] bg-[#242220] flex flex-col justify-end h-[210px]"
            >
              <Image
                src={item.imageSrc}
                alt={item.imageAlt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-85 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

              <div className="absolute top-3 right-3 flex items-center gap-1.5 z-20">
                <button
                  type="button"
                  onClick={() => onPreviewImage(item)}
                  className="p-1.5 rounded-full bg-black/60 backdrop-blur-xs text-white hover:text-[#C5A880]"
                  title="Preview"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onEdit(item)}
                  className="p-1.5 rounded-full bg-black/60 backdrop-blur-xs text-white hover:text-[#C5A880]"
                  title="Edit"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="relative z-20 p-4 space-y-1 transform transition-transform duration-300 group-hover:-translate-y-0.5">
                <span className="text-[10px] font-mono text-[#C5A880] uppercase">
                  {formatPortfolioCategory(item.category)}
                </span>
                <h4 className="font-serif text-lg text-[#FAF8F5] font-light leading-snug line-clamp-1">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
