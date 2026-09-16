import React from "react";
import type { Metadata } from "next";
import { BLOG_POSTS } from "@/data/blog";
import {
  BlogHero,
  BlogFeatured,
  BlogDirectory,
  BlogCTA,
} from "@/components/sections/blog";

export const metadata: Metadata = {
  title: "Journal — Wedora | Luxury Wedding Essays & Planning Notes",
  description:
    "Planning notes, thoughtful essays, vendor advice, and editorial inspiration for creating a luxury wedding that feels entirely your own.",
};

export default function JournalPage() {
  const featuredPost = BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];

  return (
    <article className="min-h-screen bg-[#FAF8F5]">
      <BlogHero />
      <BlogFeatured post={featuredPost} />
      <BlogDirectory />
      <BlogCTA />
    </article>
  );
}
