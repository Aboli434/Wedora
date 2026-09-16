"use client";

import React, { useState, useMemo } from "react";
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

export function VendorDirectory() {
  const shouldReduceMotion = useReducedMotion();

  // Filter & Search states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [sortBy, setSortBy] = useState("Featured");

  // Client-side filtering & sorting logic
  const filteredVendors = useMemo(() => {
    let result = [...VENDORS_DATA];

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
    }

    return result;
  }, [searchTerm, selectedCategory, selectedLocation, sortBy]);

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
    <Section padding="lg" className="bg-[#FAF8F5] text-[#161514]">
      <Container>
        {/* Discovery Control Panel */}
        <div className="mb-12 p-6 sm:p-8 bg-[#F3EFEA] border border-[#161514]/10 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <label htmlFor="vendor-search" className="sr-only">
                Search vendors, services, or locations
              </label>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#161514]/50 pointer-events-none" />
              <input
                id="vendor-search"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search vendors, services, or locations..."
                className="w-full bg-[#FAF8F5] border border-[#161514]/15 text-[#161514] pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-[#C5A880] transition-colors"
              />
            </div>

            {/* Category Select */}
            <div className="md:col-span-3">
              <label htmlFor="category-filter" className="sr-only">
                Filter by category
              </label>
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#161514]/15 text-[#161514] px-4 py-3 text-sm focus:outline-none focus:border-[#C5A880] transition-colors cursor-pointer"
              >
                {VENDOR_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Select */}
            <div className="md:col-span-3">
              <label htmlFor="location-filter" className="sr-only">
                Filter by location
              </label>
              <select
                id="location-filter"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#161514]/15 text-[#161514] px-4 py-3 text-sm focus:outline-none focus:border-[#C5A880] transition-colors cursor-pointer"
              >
                {VENDOR_LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Secondary Controls Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-[#161514]/10 text-xs text-[#5A5650]">
            <div className="flex items-center gap-2">
              <span className="font-semibold uppercase tracking-wider text-[#161514]">
                Sort by:
              </span>
              <div className="flex gap-2">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSortBy(opt)}
                    className={`px-3 py-1 uppercase tracking-widest text-[10px] transition-colors cursor-pointer ${
                      sortBy === opt
                        ? "bg-[#161514] text-[#FAF8F5]"
                        : "bg-[#FAF8F5] text-[#161514] hover:bg-[#161514]/10"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {isFiltered && (
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 text-xs text-[#C5A880] hover:underline uppercase tracking-wider font-semibold cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Directory Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <motion.span
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C5A880] mb-2 block"
            >
              EXPLORE THE DIRECTORY
            </motion.span>
            <motion.h2
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-3xl sm:text-4xl font-light text-[#161514]"
            >
              People worth discovering.
            </motion.h2>
          </div>

          <p className="text-xs font-sans tracking-widest text-[#5A5650] uppercase">
            Showing {filteredVendors.length} {filteredVendors.length === 1 ? "Vendor" : "Vendors"}
          </p>
        </div>

        {/* Directory Results Grid or Empty State */}
        {filteredVendors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVendors.map((vendor: Vendor) => (
              <VendorDirectoryCard key={vendor.id} vendor={vendor} />
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
              No vendors found.
            </h3>
            <p className="font-sans text-sm md:text-base text-[#5A5650] font-light max-w-md">
              Try a different service, location, or search term.
            </p>
            <Button
              variant="outline"
              size="md"
              onClick={handleResetFilters}
              className="mt-4 text-[#161514] border-[#161514] hover:bg-[#161514] hover:text-[#FAF8F5]"
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </Container>
    </Section>
  );
}
