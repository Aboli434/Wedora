"use client";

import React, { useState, useMemo } from "react";
import { VendorDashboardShell } from "@/components/vendor-dashboard/layout";
import {
  MOCK_VENDOR_PORTFOLIO,
  VendorPortfolioItem,
} from "@/data/vendorPortfolio";
import {
  calculatePortfolioSummary,
  filterPortfolioItems,
  sortPortfolioItems,
  getFeaturedPortfolioItems,
  PortfolioFiltersState,
} from "@/lib/vendorPortfolio";
import {
  PortfolioPageHeader,
  PortfolioOverview,
  FeaturedPortfolio,
  PortfolioNeedsAttention,
  PortfolioFilters,
  PortfolioGrid,
  PortfolioItemEditor,
  PortfolioImagePreview,
  PortfolioCategoryBreakdown,
  PortfolioPublicPreview,
  PortfolioMediaNotice,
  PortfolioEmptyState,
} from "@/components/vendor-dashboard/portfolio";
import { Info } from "lucide-react";

export default function VendorPortfolioPage() {
  const [items, setItems] = useState<VendorPortfolioItem[]>(MOCK_VENDOR_PORTFOLIO);
  const [filters, setFilters] = useState<PortfolioFiltersState>({
    search: "",
    category: "ALL",
    visibility: "ALL",
    featured: "ALL",
    sortBy: "featured",
  });

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<VendorPortfolioItem | null>(null);

  const [lightboxItem, setLightboxItem] = useState<VendorPortfolioItem | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const [sessionNotice, setSessionNotice] = useState<string | null>(null);

  // Derived Summary
  const summary = useMemo(() => calculatePortfolioSummary(items), [items]);

  // Derived Featured Items
  const featuredItems = useMemo(() => getFeaturedPortfolioItems(items), [items]);

  // Derived Filtered & Sorted Items
  const filteredItems = useMemo(() => {
    const filtered = filterPortfolioItems(items, filters);
    return sortPortfolioItems(filtered, filters.sortBy);
  }, [items, filters]);

  // Handlers
  const handleOpenAddModal = () => {
    setEditingItem(null);
    setIsEditorOpen(true);
  };

  const handleEditItem = (item: VendorPortfolioItem) => {
    setEditingItem(item);
    setIsEditorOpen(true);
  };

  const handleSaveItem = (savedItem: VendorPortfolioItem) => {
    setItems((prev) => {
      const exists = prev.some((i) => i.id === savedItem.id);
      if (exists) {
        return prev.map((i) => (i.id === savedItem.id ? savedItem : i));
      }
      return [savedItem, ...prev];
    });

    setSessionNotice(`Portfolio work "${savedItem.title}" saved for this session.`);
    setTimeout(() => setSessionNotice(null), 5000);
  };

  const handleDuplicateItem = (itemToDuplicate: VendorPortfolioItem) => {
    const duplicated: VendorPortfolioItem = {
      ...itemToDuplicate,
      id: `port-${Date.now()}`,
      title: `${itemToDuplicate.title} (Copy)`,
      featured: false,
      sortOrder: itemToDuplicate.sortOrder + 1,
      updatedAt: "Just now",
    };

    setItems((prev) => [duplicated, ...prev]);
    setSessionNotice(`Duplicated "${itemToDuplicate.title}".`);
    setTimeout(() => setSessionNotice(null), 4000);
  };

  const handleToggleVisibility = (item: VendorPortfolioItem) => {
    const nextVis = item.visibility === "PUBLIC" ? "PRIVATE" : "PUBLIC";
    setItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, visibility: nextVis } : i))
    );
    setSessionNotice(`"${item.title}" marked as ${nextVis.toLowerCase()}.`);
    setTimeout(() => setSessionNotice(null), 4000);
  };

  const handleToggleFeatured = (item: VendorPortfolioItem) => {
    setItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, featured: !i.featured } : i))
    );
    setSessionNotice(
      `"${item.title}" ${!item.featured ? "added to featured work" : "removed from featured"}.`
    );
    setTimeout(() => setSessionNotice(null), 4000);
  };

  const handleDeleteItem = (itemId: string) => {
    const target = items.find((i) => i.id === itemId);
    setItems((prev) => prev.filter((i) => i.id !== itemId));
    if (target) {
      setSessionNotice(`Deleted "${target.title}".`);
      setTimeout(() => setSessionNotice(null), 4000);
    }
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    setItems((prev) => {
      const updated = [...prev];
      const temp = updated[index].sortOrder;
      updated[index].sortOrder = updated[index - 1].sortOrder;
      updated[index - 1].sortOrder = temp;
      const [moved] = updated.splice(index, 1);
      updated.splice(index - 1, 0, moved);
      return updated;
    });
  };

  const handleMoveDown = (index: number) => {
    if (index === items.length - 1) return;
    setItems((prev) => {
      const updated = [...prev];
      const temp = updated[index].sortOrder;
      updated[index].sortOrder = updated[index + 1].sortOrder;
      updated[index + 1].sortOrder = temp;
      const [moved] = updated.splice(index, 1);
      updated.splice(index + 1, 0, moved);
      return updated;
    });
  };

  const handleOpenLightbox = (item: VendorPortfolioItem) => {
    setLightboxItem(item);
    setIsLightboxOpen(true);
  };

  return (
    <VendorDashboardShell>
      <div className="space-y-8 max-w-6xl mx-auto">
        {/* Page Header */}
        <PortfolioPageHeader onAddWork={handleOpenAddModal} />

        {/* Overview Metrics */}
        <PortfolioOverview summary={summary} />

        {/* Demo Media Notice */}
        <PortfolioMediaNotice />

        {/* Session Notice */}
        {sessionNotice && (
          <div className="flex items-center gap-2.5 px-4 py-3 rounded-lg bg-[#F2ECE4] border border-[#E5DEC9] text-xs text-[#594B3C]">
            <Info className="w-4 h-4 text-[#C5A880] shrink-0" />
            <span>{sessionNotice}</span>
          </div>
        )}

        {/* Featured Signature Work */}
        {featuredItems.length > 0 && (
          <FeaturedPortfolio
            items={featuredItems}
            onEdit={handleEditItem}
            onPreviewImage={handleOpenLightbox}
          />
        )}

        {/* Needs Attention items */}
        {items.length > 0 && (
          <PortfolioNeedsAttention
            items={items}
            onSelectWork={handleEditItem}
          />
        )}

        {/* Filters & Search Bar */}
        {items.length > 0 && (
          <PortfolioFilters filters={filters} onChange={setFilters} />
        )}

        {/* Portfolio Masonry Grid or Empty State */}
        {items.length === 0 ? (
          <PortfolioEmptyState onAddWork={handleOpenAddModal} />
        ) : (
          <PortfolioGrid
            items={filteredItems}
            onEdit={handleEditItem}
            onDuplicate={handleDuplicateItem}
            onToggleVisibility={handleToggleVisibility}
            onToggleFeatured={handleToggleFeatured}
            onDelete={handleDeleteItem}
            onMoveUp={handleMoveUp}
            onMoveDown={handleMoveDown}
            onPreviewImage={handleOpenLightbox}
          />
        )}

        {/* Category Breakdown */}
        {items.length > 0 && <PortfolioCategoryBreakdown items={items} />}

        {/* Public Profile Preview */}
        {items.length > 0 && (
          <PortfolioPublicPreview
            items={items}
            onPreviewImage={handleOpenLightbox}
          />
        )}

        {/* Portfolio Editor Modal */}
        <PortfolioItemEditor
          item={editingItem}
          isOpen={isEditorOpen}
          onClose={() => setIsEditorOpen(false)}
          onSave={handleSaveItem}
        />

        {/* Image Preview Lightbox */}
        <PortfolioImagePreview
          item={lightboxItem}
          items={filteredItems.length > 0 ? filteredItems : items}
          isOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
          onSelect={setLightboxItem}
        />
      </div>
    </VendorDashboardShell>
  );
}
