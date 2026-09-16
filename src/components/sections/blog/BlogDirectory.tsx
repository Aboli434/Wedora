"use client";

import React, { useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { BLOG_POSTS, BlogPost } from "@/data/blog";
import { BlogFilters } from "./BlogFilters";
import { BlogCard } from "./BlogCard";
import { Search, RotateCcw } from "lucide-react";

export function BlogDirectory() {
  const shouldReduceMotion = useReducedMotion();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const filteredPosts = useMemo(() => {
    let result = [...BLOG_POSTS];

    // Category filter
    if (selectedCategory !== "ALL") {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Search query filter
    if (searchTerm.trim() !== "") {
      const query = searchTerm.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.excerpt.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    return result;
  }, [searchTerm, selectedCategory]);

  const handleReset = () => {
    setSearchTerm("");
    setSelectedCategory("ALL");
  };

  const isFiltered = searchTerm !== "" || selectedCategory !== "ALL";

  return (
    <Section padding="lg" className="bg-[#FAF8F5] text-[#161514]">
      <Container>
        {/* Controls Bar: Search & Category Filters */}
        <div className="mb-12 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C5A880] mb-2 block">
                EXPLORE ARTICLES
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#161514]">
                Planning notes &amp; essays.
              </h2>
            </div>

            {/* Search Field */}
            <div className="relative w-full md:w-80">
              <label htmlFor="journal-search" className="sr-only">
                Search the journal
              </label>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#161514]/50 pointer-events-none" />
              <input
                id="journal-search"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search the journal..."
                className="w-full bg-[#F3EFEA] border border-[#161514]/15 text-[#161514] pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-[#C5A880] transition-colors"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs uppercase text-[#5A5650] hover:text-[#161514]"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Category Filters */}
          <BlogFilters
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {/* Article Grid or Empty Search State */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post: BlogPost) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          /* Tasteful Empty Search State */
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-20 px-6 text-center border border-[#161514]/10 bg-[#F3EFEA] flex flex-col items-center justify-center space-y-4"
          >
            <h3 className="font-serif text-2xl md:text-3xl font-light text-[#161514]">
              No stories found.
            </h3>
            <p className="font-sans text-sm md:text-base text-[#5A5650] font-light max-w-md">
              Try another search or explore a different category.
            </p>
            {isFiltered && (
              <Button
                variant="outline"
                size="md"
                onClick={handleReset}
                className="mt-4 text-[#161514] border-[#161514] hover:bg-[#161514] hover:text-[#FAF8F5] inline-flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Filters</span>
              </Button>
            )}
          </motion.div>
        )}
      </Container>
    </Section>
  );
}
