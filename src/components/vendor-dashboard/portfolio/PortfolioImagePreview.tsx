"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { VendorPortfolioItem } from "@/data/vendorPortfolio";
import { formatPortfolioCategory, formatPortfolioVisibility } from "@/lib/vendorPortfolio";
import { X, ChevronLeft, ChevronRight, MapPin, Sparkles } from "lucide-react";

interface PortfolioImagePreviewProps {
  item: VendorPortfolioItem | null;
  items: VendorPortfolioItem[];
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: VendorPortfolioItem) => void;
}

export function PortfolioImagePreview({
  item,
  items,
  isOpen,
  onClose,
  onSelect,
}: PortfolioImagePreviewProps) {
  const currentIndex = item ? items.findIndex((i) => i.id === item.id) : -1;

  // Body scroll lock & Keyboard navigation (Escape, ArrowLeft, ArrowRight)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || currentIndex === -1) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        const prevIdx = (currentIndex - 1 + items.length) % items.length;
        onSelect(items[prevIdx]);
      } else if (e.key === "ArrowRight") {
        const nextIdx = (currentIndex + 1) % items.length;
        onSelect(items[nextIdx]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, currentIndex, items, onClose, onSelect]);

  if (!isOpen || !item) return null;

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + items.length) % items.length;
    onSelect(items[prevIdx]);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % items.length;
    onSelect(items[nextIdx]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6">
      {/* Close Button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close image lightbox preview"
        className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev / Next Controls */}
      {items.length > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next image"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Main Lightbox Container */}
      <div
        className="relative max-w-5xl w-full max-h-[90vh] flex flex-col lg:flex-row rounded-xl overflow-hidden bg-[#161514] border border-[#2C2A28] shadow-2xl z-40"
        role="dialog"
        aria-modal="true"
        aria-label={`Preview: ${item.title}`}
      >
        {/* Large Image Showcase Area */}
        <div className="relative flex-1 min-h-[300px] sm:min-h-[450px] lg:min-h-[560px] bg-black">
          <Image
            src={item.imageSrc}
            alt={item.imageAlt}
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Sidebar Metadata Panel */}
        <div className="w-full lg:w-80 p-6 bg-[#161514] text-[#FAF8F5] flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#2C2A28] space-y-6 shrink-0">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#2C2A28] pb-3">
              <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#C5A880] font-semibold">
                {formatPortfolioCategory(item.category)}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-[#242220] text-[#A39C93] border border-[#3A3734]">
                  {formatPortfolioVisibility(item.visibility)}
                </span>
                {item.featured && (
                  <span title="Featured Work">
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                  </span>
                )}
              </div>
            </div>

            <h3 className="font-serif text-2xl text-[#FAF8F5] font-light leading-snug">
              {item.title}
            </h3>

            {item.location && (
              <div className="flex items-center gap-1.5 text-xs text-[#A39C93]">
                <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{item.location}</span>
              </div>
            )}

            {item.description && (
              <p className="text-xs text-[#A39C93] leading-relaxed pt-1 border-t border-[#2C2A28]">
                {item.description}
              </p>
            )}

            <div className="space-y-1.5 text-xs text-[#8C857B] pt-2">
              {item.coupleName && <p><strong className="text-[#A39C93]">Couple:</strong> {item.coupleName}</p>}
              {item.eventType && <p><strong className="text-[#A39C93]">Event Type:</strong> {item.eventType}</p>}
              {item.year && <p><strong className="text-[#A39C93]">Year:</strong> {item.year}</p>}
            </div>
          </div>

          <div className="pt-4 border-t border-[#2C2A28] text-center">
            <span className="text-[11px] font-mono text-[#8C857B]">
              Image {currentIndex + 1} of {items.length} &bull; Use &larr; &rarr; to navigate
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
