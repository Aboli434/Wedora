"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { VendorPortfolioItem } from "@/data/vendorPortfolio";
import { ArrowUpRight, Eye } from "lucide-react";

interface PortfolioPublicPreviewProps {
  items: VendorPortfolioItem[];
  onPreviewImage: (item: VendorPortfolioItem) => void;
}

export function PortfolioPublicPreview({ items, onPreviewImage }: PortfolioPublicPreviewProps) {
  const publicItems = items.filter((i) => i.visibility === "PUBLIC").slice(0, 4);

  return (
    <section className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl p-6 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8E2D9] pb-4">
        <div>
          <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold block">
            PUBLIC PROFILE PREVIEW
          </span>
          <h2 className="font-serif text-2xl text-[#2C2A29]">Live Showcase Preview</h2>
        </div>

        <Link
          href="/vendors/the-frame-house"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2C2A29] hover:text-[#C5A880] transition-colors group self-start sm:self-auto"
        >
          <span>View Full Profile</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A880] group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {publicItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onPreviewImage(item)}
            className="group relative aspect-[4/3] rounded-lg overflow-hidden border border-[#E8E2D9] bg-[#F2ECE4] cursor-pointer"
          >
            <Image
              src={item.imageSrc}
              alt={item.imageAlt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-between">
              <span className="text-[9px] font-mono text-white uppercase tracking-wider">
                {item.location || "Public Work"}
              </span>
              <div className="flex items-center justify-between">
                <span className="text-xs text-white font-serif font-light truncate pr-1">
                  {item.title}
                </span>
                <Eye className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
