"use client";

import React from "react";
import { VendorPortfolioItem } from "@/data/vendorPortfolio";
import { PortfolioItemCard } from "./PortfolioItemCard";

interface PortfolioGridProps {
  items: VendorPortfolioItem[];
  onEdit: (item: VendorPortfolioItem) => void;
  onDuplicate: (item: VendorPortfolioItem) => void;
  onToggleVisibility: (item: VendorPortfolioItem) => void;
  onToggleFeatured: (item: VendorPortfolioItem) => void;
  onDelete: (itemId: string) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onPreviewImage: (item: VendorPortfolioItem) => void;
}

export function PortfolioGrid({
  items,
  onEdit,
  onDuplicate,
  onToggleVisibility,
  onToggleFeatured,
  onDelete,
  onMoveUp,
  onMoveDown,
  onPreviewImage,
}: PortfolioGridProps) {
  if (items.length === 0) {
    return (
      <div className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl p-8 text-center space-y-2">
        <p className="font-serif text-lg text-[#2C2A29]">No portfolio work matches your active filters.</p>
        <p className="text-xs text-[#8C857B]">Try adjusting your search query, category, or visibility filter.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, idx) => (
        <PortfolioItemCard
          key={item.id}
          item={item}
          index={idx}
          totalItems={items.length}
          onEdit={onEdit}
          onDuplicate={onDuplicate}
          onToggleVisibility={onToggleVisibility}
          onToggleFeatured={onToggleFeatured}
          onDelete={onDelete}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
          onPreviewImage={onPreviewImage}
        />
      ))}
    </div>
  );
}
