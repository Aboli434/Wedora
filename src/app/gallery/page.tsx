import React from "react";
import type { Metadata } from "next";
import {
  GalleryHero,
  GalleryIntro,
  GalleryGrid,
  GalleryCTA,
} from "@/components/sections/gallery";

export const metadata: Metadata = {
  title: "Gallery — Wedora | Luxury Wedding Photography Archive",
  description:
    "A visual collection of celebrations, details, places, and fleeting moments that make every wedding uniquely yours.",
};

export default function GalleryPage() {
  return (
    <article className="min-h-screen bg-[#FAF8F5]">
      <GalleryHero />
      <GalleryIntro />
      <GalleryGrid />
      <GalleryCTA />
    </article>
  );
}
