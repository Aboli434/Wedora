"use client";

import React from "react";
import Image from "next/image";
import { BlogPost } from "@/data/blog";

interface BlogArticleBodyProps {
  post: BlogPost;
}

export function BlogArticleBody({ post }: BlogArticleBodyProps) {
  return (
    <div className="max-w-3xl mx-auto space-y-12 my-12 md:my-16">
      {post.sections.map((sec, idx) => (
        <section key={idx} className="space-y-6">
          {sec.heading && (
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#161514] tracking-tight border-b border-[#161514]/15 pb-3">
              {sec.heading}
            </h2>
          )}

          {sec.paragraphs.map((para, pIdx) => (
            <p
              key={pIdx}
              className="font-sans text-base sm:text-lg text-[#5A5650] font-light leading-relaxed"
            >
              {para}
            </p>
          ))}

          {sec.quote && (
            <blockquote className="my-8 border-l-2 border-[#C5A880] pl-6 py-2">
              <p className="font-serif text-xl sm:text-2xl font-light italic text-[#161514] leading-relaxed">
                &ldquo;{sec.quote}&rdquo;
              </p>
            </blockquote>
          )}

          {sec.imageSrc && (
            <div className="relative aspect-[16/10] w-full overflow-hidden my-8 shadow-sm">
              <Image
                src={sec.imageSrc}
                alt={sec.imageAlt || sec.heading || "Article visual detail"}
                fill
                sizes="(max-width: 1024px) 100vw, 70vw"
                className="object-cover object-center"
                quality={90}
              />
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
