"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { BlogPost } from "@/data/blog";
import { ArrowUpRight } from "lucide-react";

interface BlogFeaturedProps {
  post: BlogPost;
}

export function BlogFeatured({ post }: BlogFeaturedProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section padding="lg" className="bg-[#FAF8F5] text-[#161514] border-b border-[#161514]/10">
      <Container>
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        >
          {/* Large Image Column */}
          <div className="lg:col-span-7 relative aspect-[16/10] w-full overflow-hidden bg-[#161514] shadow-md">
            <Image
              src={post.imageSrc}
              alt={post.imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-1.04"
              quality={90}
            />
            <div className="absolute top-4 left-4 bg-[#161514]/80 text-[#FAF8F5] px-3 py-1 text-[10px] uppercase font-semibold tracking-[0.2em]">
              FEATURED ESSAY
            </div>
          </div>

          {/* Typography Column */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
            <div className="flex items-center gap-3 text-xs font-semibold tracking-[0.2em] uppercase text-[#C5A880]">
              <span>{post.category}</span>
              <span>•</span>
              <span className="text-[#5A5650]">{post.readTime}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#161514] leading-[1.16] tracking-tight group-hover:text-[#C5A880] transition-colors duration-300">
              {post.title}
            </h2>

            <p className="font-sans text-base md:text-lg text-[#5A5650] font-light leading-relaxed">
              {post.excerpt}
            </p>

            <div className="pt-4">
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#161514] hover:text-[#C5A880] transition-colors group/link"
              >
                <span>Read the story</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
