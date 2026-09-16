"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { GalleryImage } from "@/data/gallery";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryLightboxProps {
  images: GalleryImage[];
  selectedIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function GalleryLightbox({
  images,
  selectedIndex,
  onClose,
  onPrev,
  onNext,
}: GalleryLightboxProps) {
  const isOpen = selectedIndex !== null && selectedIndex >= 0 && selectedIndex < images.length;
  const currentImage = isOpen ? images[selectedIndex] : null;

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        onPrev();
      } else if (e.key === "ArrowRight") {
        onNext();
      }
    },
    [isOpen, onClose, onPrev, onNext]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen || !currentImage) return null;

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Gallery Lightbox Image Viewer"
        className="fixed inset-0 z-[110] flex items-center justify-center bg-[#161514]/95 select-none"
      >
        {/* Backdrop click to close */}
        <div className="absolute inset-0 z-0" onClick={onClose} />

        {/* Top Header Controls */}
        <div className="absolute top-6 left-6 right-6 z-20 flex items-center justify-between text-[#FAF8F5]">
          <div className="flex items-center gap-3 text-xs font-sans tracking-[0.2em] text-[#C5A880] uppercase">
            <span>{currentImage.category}</span>
            <span>•</span>
            <span className="text-[#FAF8F5]/70">
              {selectedIndex + 1} / {images.length}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Lightbox"
            className="p-2.5 rounded-full bg-[#FAF8F5]/10 text-[#FAF8F5] hover:bg-[#FAF8F5]/20 hover:text-[#C5A880] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Prev / Next Nav Buttons */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Previous Image"
          className="absolute left-4 sm:left-8 z-20 p-3 rounded-full bg-[#FAF8F5]/10 text-[#FAF8F5] hover:bg-[#FAF8F5]/20 hover:text-[#C5A880] transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next Image"
          className="absolute right-4 sm:right-8 z-20 p-3 rounded-full bg-[#FAF8F5]/10 text-[#FAF8F5] hover:bg-[#FAF8F5]/20 hover:text-[#C5A880] transition-colors cursor-pointer"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Main Image Container */}
        <motion.div
          key={currentImage.id}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
          className="relative z-10 max-w-5xl max-h-[75vh] w-[90vw] h-[75vh] flex flex-col items-center justify-center p-2"
        >
          <div className="relative w-full h-full max-h-[65vh]">
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              fill
              priority
              sizes="90vw"
              className="object-contain object-center"
              quality={95}
            />
          </div>

          {/* Caption & Title */}
          <div className="mt-4 text-center space-y-1 max-w-xl">
            <h3 className="font-serif text-xl sm:text-2xl font-light text-[#FAF8F5]">
              {currentImage.title}
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#FAF8F5]/75 font-light">
              {currentImage.caption}
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
