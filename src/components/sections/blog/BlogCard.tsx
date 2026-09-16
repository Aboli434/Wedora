"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { BlogPost } from "@/data/blog";
import { ArrowUpRight } from "lucide-react";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
      className="group flex flex-col justify-between border border-[#161514]/10 bg-[#FAF8F5] overflow-hidden transition-all duration-300 hover:border-[#C5A880]/50 hover:shadow-md"
    >
      <div>
        {/* Image Container */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#161514]">
          <Image
            src={post.imageSrc}
            alt={post.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-1.04"
            quality={90}
          />
          <div className="absolute top-4 left-4 bg-[#161514]/80 text-[#FAF8F5] px-3 py-1 text-[10px] uppercase font-semibold tracking-[0.2em]">
            {post.category}
          </div>
        </div>

        {/* Content Details */}
        <div className="p-6 sm:p-8 flex flex-col space-y-3">
          <div className="flex items-center justify-between text-xs text-[#5A5650] font-sans tracking-widest uppercase">
            <span>{post.date}</span>
            <span>{post.readTime}</span>
          </div>

          <h3 className="font-serif text-2xl font-light text-[#161514] tracking-tight group-hover:text-[#C5A880] transition-colors duration-300 leading-snug">
            {post.title}
          </h3>

          <p className="font-sans text-sm text-[#5A5650] font-light leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* Footer Link */}
      <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-2">
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#161514] hover:text-[#C5A880] transition-colors group/link"
        >
          <span>Read Article</span>
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
        </Link>
      </div>
    </motion.div>
  );
}
