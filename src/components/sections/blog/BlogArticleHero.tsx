"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/data/blog";
import { ArrowLeft, Clock, Calendar } from "lucide-react";

interface BlogArticleHeroProps {
  post: BlogPost;
}

export function BlogArticleHero({ post }: BlogArticleHeroProps) {
  return (
    <header className="max-w-4xl mx-auto space-y-6">
      {/* Back Button */}
      <div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#161514] hover:text-[#C5A880] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Journal</span>
        </Link>
      </div>

      {/* Category & Metadata */}
      <div className="flex items-center gap-4 text-xs font-semibold tracking-[0.2em] uppercase text-[#C5A880]">
        <span>{post.category}</span>
        <span>•</span>
        <span className="flex items-center gap-1 text-[#5A5650]">
          <Calendar className="w-3.5 h-3.5" />
          {post.date}
        </span>
        <span>•</span>
        <span className="flex items-center gap-1 text-[#5A5650]">
          <Clock className="w-3.5 h-3.5" />
          {post.readTime}
        </span>
      </div>

      {/* Main Title */}
      <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-[#161514] leading-[1.14] tracking-tight">
        {post.title}
      </h1>

      {/* Excerpt Lead */}
      <p className="font-serif text-xl sm:text-2xl font-light text-[#5A5650] italic leading-relaxed">
        {post.excerpt}
      </p>

      {/* Cover Image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#161514] mt-8 shadow-md">
        <Image
          src={post.imageSrc}
          alt={post.imageAlt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 80vw"
          className="object-cover object-center"
          quality={90}
        />
      </div>
    </header>
  );
}
