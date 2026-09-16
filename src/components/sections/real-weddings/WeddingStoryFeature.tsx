"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { WeddingStory } from "@/data/realWeddings";
import { ArrowUpRight } from "lucide-react";

interface WeddingStoryFeatureProps {
  story: WeddingStory;
}

export function WeddingStoryFeature({ story }: WeddingStoryFeatureProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
      className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#FAF8F5] border border-[#161514]/10 p-6 sm:p-10 mb-12 hover:border-[#C5A880]/50 transition-all duration-300"
    >
      {/* Dominant Feature Image */}
      <div className="lg:col-span-7 relative aspect-[16/10] w-full overflow-hidden bg-[#161514]">
        <Image
          src={story.imageSrc}
          alt={story.imageAlt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-1.04"
          quality={90}
        />
        <div className="absolute top-4 left-4 bg-[#161514]/80 text-[#FAF8F5] px-3 py-1 text-[10px] uppercase font-semibold tracking-[0.2em]">
          FEATURED STORY
        </div>
      </div>

      {/* Feature Content */}
      <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
        <div className="flex items-center gap-3 text-xs font-semibold tracking-[0.2em] uppercase text-[#C5A880]">
          <span>{story.setting}</span>
          <span>•</span>
          <span className="text-[#5A5650]">{story.location}</span>
        </div>

        <h3 className="font-serif text-3xl sm:text-4xl font-light text-[#161514] tracking-tight group-hover:text-[#C5A880] transition-colors duration-300 leading-tight">
          {story.couple}
        </h3>

        <p className="font-serif text-xl sm:text-2xl font-light text-[#161514]/85 italic">
          &quot;{story.title}&quot;
        </p>

        <p className="font-sans text-sm md:text-base text-[#5A5650] font-light leading-relaxed">
          {story.description}
        </p>

        <div className="pt-4">
          <Link
            href={`/real-weddings/${story.slug}`}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#161514] hover:text-[#C5A880] transition-colors group/link"
          >
            <span>Read Full Story</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
