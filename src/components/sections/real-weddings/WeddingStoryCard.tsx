"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { WeddingStory } from "@/data/realWeddings";
import { ArrowUpRight } from "lucide-react";

interface WeddingStoryCardProps {
  story: WeddingStory;
}

export function WeddingStoryCard({ story }: WeddingStoryCardProps) {
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
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#161514]">
          <Image
            src={story.imageSrc}
            alt={story.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-1.05"
            quality={90}
          />
          <div className="absolute top-4 left-4 bg-[#161514]/80 text-[#FAF8F5] px-3 py-1 text-[10px] uppercase font-semibold tracking-[0.2em]">
            {story.setting}
          </div>
        </div>

        {/* Content Details */}
        <div className="p-6 sm:p-8 flex flex-col space-y-3">
          <div className="flex items-baseline justify-between">
            <h3 className="font-serif text-2xl font-light text-[#161514] tracking-tight group-hover:text-[#C5A880] transition-colors duration-300">
              {story.couple}
            </h3>
            <span className="text-xs font-sans tracking-widest text-[#5A5650] uppercase">
              {story.location}
            </span>
          </div>

          <p className="font-serif text-lg font-light text-[#161514]/85 italic leading-snug">
            &quot;{story.title}&quot;
          </p>

          <p className="font-sans text-sm text-[#5A5650] font-light leading-relaxed line-clamp-3">
            {story.description}
          </p>
        </div>
      </div>

      {/* Footer Link */}
      <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-2">
        <Link
          href={`/real-weddings/${story.slug}`}
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#161514] hover:text-[#C5A880] transition-colors group/link"
        >
          <span>Read Story</span>
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
        </Link>
      </div>
    </motion.div>
  );
}
