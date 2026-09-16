"use client";

import React, { useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { REAL_WEDDINGS_DATA, WeddingStory } from "@/data/realWeddings";
import { StoryFilters } from "./StoryFilters";
import { WeddingStoryFeature } from "./WeddingStoryFeature";
import { WeddingStoryCard } from "./WeddingStoryCard";

export function RealWeddingsDirectory() {
  const shouldReduceMotion = useReducedMotion();
  const [selectedTag, setSelectedTag] = useState("All");

  const filteredStories = useMemo(() => {
    if (selectedTag === "All") {
      return REAL_WEDDINGS_DATA;
    }
    return REAL_WEDDINGS_DATA.filter((story) =>
      story.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase())
    );
  }, [selectedTag]);

  // Separate featured story from remaining stories when available
  const featuredStory = filteredStories.find((s) => s.featured) || filteredStories[0];
  const secondaryStories = filteredStories.filter((s) => s.id !== featuredStory?.id);

  return (
    <Section padding="lg" className="bg-[#FAF8F5] text-[#161514]">
      <Container>
        {/* Directory Header & Filters */}
        <div className="mb-8">
          <motion.span
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C5A880] mb-2 block"
          >
            THE ARCHIVE
          </motion.span>
          <motion.h2
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#161514]"
          >
            Curated wedding stories.
          </motion.h2>

          <StoryFilters selectedTag={selectedTag} onSelectTag={setSelectedTag} />
        </div>

        {/* Story Layout Grid or Empty State */}
        {filteredStories.length > 0 ? (
          <div>
            {/* Dominant Featured Story */}
            {featuredStory && <WeddingStoryFeature story={featuredStory} />}

            {/* Secondary Stories Grid */}
            {secondaryStories.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {secondaryStories.map((story: WeddingStory) => (
                  <WeddingStoryCard key={story.id} story={story} />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Empty Search State */
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-20 px-6 text-center border border-[#161514]/10 bg-[#F3EFEA] flex flex-col items-center justify-center space-y-4"
          >
            <h3 className="font-serif text-2xl md:text-3xl font-light text-[#161514]">
              No stories found.
            </h3>
            <p className="font-sans text-sm md:text-base text-[#5A5650] font-light max-w-md">
              Try another style or explore all celebrations.
            </p>
            <Button
              variant="outline"
              size="md"
              onClick={() => setSelectedTag("All")}
              className="mt-4 text-[#161514] border-[#161514] hover:bg-[#161514] hover:text-[#FAF8F5]"
            >
              View All Stories
            </Button>
          </motion.div>
        )}
      </Container>
    </Section>
  );
}
