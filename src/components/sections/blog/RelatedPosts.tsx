"use client";

import React from "react";
import { BlogPost } from "@/data/blog";
import { BlogCard } from "./BlogCard";

interface RelatedPostsProps {
  currentPostId: string;
  allPosts: BlogPost[];
}

export function RelatedPosts({ currentPostId, allPosts }: RelatedPostsProps) {
  const related = allPosts
    .filter((p) => p.id !== currentPostId)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div className="border-t border-[#161514]/15 pt-16 mt-16 max-w-6xl mx-auto">
      <div className="mb-10 text-center">
        <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C5A880] mb-2 block">
          CONTINUE READING
        </span>
        <h2 className="font-serif text-3xl font-light text-[#161514]">
          Related Essays &amp; Notes
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {related.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
