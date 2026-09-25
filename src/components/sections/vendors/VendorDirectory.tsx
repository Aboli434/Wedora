"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import {
  VENDORS_DATA,
  VENDOR_CATEGORIES,
  VENDOR_LOCATIONS,
  SORT_OPTIONS,
  Vendor,
} from "@/data/vendors";
import { VendorDirectoryCard } from "./VendorDirectoryCard";
import { Search, RotateCcw } from "lucide-react";
import { getPublicVendorsApi } from "@/lib/api/endpoints";

export function VendorDirectory() {
  const shouldReduceMotion = useReducedMotion();

  // Filter & Search states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [sortBy, setSortBy] = useState("Featured");
  const [vendorsList, setVendorsList] = useState<Vendor[]>(VENDORS_DATA);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadPublicVendors() {
      try {
        setLoading(true);
        const res = await getPublicVendorsApi({ pageSize: 20 });
        if (res.data && res.data.length > 0 && isMounted) {
          const mapped: Vendor[] = res.data.map((v) => ({
            id: v.id,
            slug: v.slug || v.id,
            name: v.businessName,
            category: v.category,
            location: v.city,
            description: v.description || "Premier wedding artisan partner.",
            imageSrc: v.coverImage || "/images/wedding/wedora-hero-wedding.jpg",
            imageAlt: `${v.businessName} wedding portfolio portrait`,
            featured: v.featured,
          }));
          setVendorsList(mapped);
        }
      } catch {
        // Fallback
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadPublicVendors();
    return () => {
      isMounted = false;
    };
  }, []);

  // Client-side filtering & sorting logic
  const filteredVendors = useMemo(() => {
    let result = [...vendorsList];

    // Search filter
    if (searchTerm.trim() !== "") {
      const query = searchTerm.toLowerCase().trim();
      result = result.filter(
        (v) =>
          v.name.toLowerCase().includes(query) ||
          v.category.toLowerCase().includes(query) ||
          v.location.toLowerCase().includes(query) ||
          v.description.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== "All Categories") {
      result = result.filter(
        (v) => v.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Location filter
    if (selectedLocation !== "All Locations") {
      result = result.filter((v) =>
        v.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    // Sort logic
    if (sortBy === "Name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "Location") {
      result.sort((a, b) => a.location.localeCompare(b.location));
    } else if (sortBy === "Featured") {
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [vendorsList, searchTerm, selectedCategory, selectedLocation, sortBy]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All Categories");
    setSelectedLocation("All Locations");
    setSortBy("Featured");
  };

  const isFiltered =
    searchTerm !== "" ||
    selectedCategory !== "All Categories" ||
    selectedLocation !== "All Locations" ||
    sortBy !== "Featured";

  return (
    <Section className="py-16 md:py-24 bg-[#FAF8F5]">
      <Container>
        {/* Search & Filter Toolbar */}
        <div className="bg-[#F3EFEA] p-6 rounded-none border border-[#161514]/10 mb-12 shadow-xs space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5A5650] w-5 h-5 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by vendor name, category, or city..."
              className="w-full bg-[#FAF8F5] border border-[#161514]/15 py-3.5 pl-12 pr-4 font-sans text-sm text-[#161514] placeholder-[#5A5650]/60 focus:outline-none focus:border-[#C5A880] transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-sans font-semibold tracking-wider text-[#C5A880] uppercase block">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#161514]/15 py-2.5 px-3 font-sans text-xs text-[#161514] focus:outline-none focus:border-[#C5A880]"
              >
                {VENDOR_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-sans font-semibold tracking-wider text-[#C5A880] uppercase block">
                Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#161514]/15 py-2.5 px-3 font-sans text-xs text-[#161514] focus:outline-none focus:border-[#C5A880]"
              >
                {VENDOR_LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-sans font-semibold tracking-wider text-[#C5A880] uppercase block">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#161514]/15 py-2.5 px-3 font-sans text-xs text-[#161514] focus:outline-none focus:border-[#C5A880]"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              {isFiltered && (
                <Button
                  variant="outline"
                  onClick={handleResetFilters}
                  className="w-full py-2.5 text-xs flex items-center justify-center gap-2 border-[#161514]/20 hover:border-[#C5A880]"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#C5A880]" />
                  Reset Filters
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Directory Results Grid */}
        {loading ? (
          <div className="text-center py-16 text-xs font-sans text-[#5A5650]">
            Loading artisan directory...
          </div>
        ) : filteredVendors.length === 0 ? (
          <div className="text-center py-20 bg-[#F3EFEA]/50 border border-[#161514]/10 p-8 space-y-4">
            <h3 className="font-serif text-2xl text-[#161514] font-light">
              No Artisans Found
            </h3>
            <p className="font-sans text-xs text-[#5A5650] max-w-md mx-auto">
              We couldn&apos;t find any vendors matching your active search criteria. Try resetting your filters to view our full collection.
            </p>
            <Button
              variant="outline"
              onClick={handleResetFilters}
              className="mt-4 text-xs tracking-wider"
            >
              Clear All Filters
            </Button>
          </div>
        ) : (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredVendors.map((vendor) => (
              <VendorDirectoryCard key={vendor.id} vendor={vendor} />
            ))}
          </motion.div>
        )}
      </Container>
    </Section>
  );
}
