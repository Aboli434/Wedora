"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { GALLERY_DATA, GalleryImage } from "@/data/gallery";
import { GalleryFilters } from "./GalleryFilters";
import { GalleryLightbox } from "./GalleryLightbox";
import { Maximize2 } from "lucide-react";

export function GalleryGrid() {
  const shouldReduceMotion = useReducedMotion();
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages = useMemo(() => {
    if (selectedCategory === "ALL") {
      return GALLERY_DATA;
    }
    return GALLERY_DATA.filter((img) => img.category === selectedCategory);
  }, [selectedCategory]);

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev === 0 ? filteredImages.length - 1 : (prev ?? 0) - 1
    );
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev === filteredImages.length - 1 ? 0 : (prev ?? 0) + 1
    );
  };

  return (
    <Section padding="lg" className="bg-[#FAF8F5] text-[#161514]">
      <Container>
        {/* Category Filters */}
        <GalleryFilters
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Asymmetric Editorial Magazine Grid */}
        {filteredImages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            {filteredImages.map((image: GalleryImage, idx: number) => (
              <motion.div
                key={image.id}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.08 }}
                onClick={() => setLightboxIndex(idx)}
                className={`group relative overflow-hidden bg-[#161514] cursor-pointer shadow-sm ${
                  image.spanClass || "lg:col-span-6 aspect-[4/3]"
                }`}
                tabIndex={0}
                role="button"
                aria-label={`View ${image.title}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setLightboxIndex(idx);
                  }
                }}
              >
                {/* Image */}
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-1.04"
                  quality={90}
                />

                {/* Subtle dark backdrop & info reveal on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 text-[#FAF8F5]">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#C5A880] bg-[#161514]/80 px-2.5 py-1">
                      {image.category}
                    </span>
                    <Maximize2 className="w-4 h-4 text-[#FAF8F5]/80" />
                  </div>

                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-light text-[#FAF8F5]">
                      {image.title}
                    </h3>
                    <p className="font-sans text-xs text-[#FAF8F5]/80 font-light mt-1 line-clamp-1">
                      {image.caption}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-20 px-6 text-center border border-[#161514]/10 bg-[#F3EFEA] flex flex-col items-center justify-center space-y-4"
          >
            <h3 className="font-serif text-2xl md:text-3xl font-light text-[#161514]">
              No images found in this category.
            </h3>
            <p className="font-sans text-sm md:text-base text-[#5A5650] font-light max-w-md">
              Explore all photography from Wedora&apos;s archive.
            </p>
            <Button
              variant="outline"
              size="md"
              onClick={() => setSelectedCategory("ALL")}
              className="mt-4 text-[#161514] border-[#161514] hover:bg-[#161514] hover:text-[#FAF8F5]"
            >
              View All Photos
            </Button>
          </motion.div>
        )}

        {/* Lightbox Modal */}
        <GalleryLightbox
          images={filteredImages}
          selectedIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      </Container>
    </Section>
  );
}
