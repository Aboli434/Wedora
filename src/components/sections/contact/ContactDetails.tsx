"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Mail, MessageSquare } from "lucide-react";

export function ContactDetails() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
      className="space-y-10 p-8 bg-[#F3EFEA] border border-[#161514]/15"
    >
      <div>
        <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C5A880] mb-3 block">
          THE WEDORA WAY
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#161514] leading-snug">
          Bring the questions. We&apos;ll make space for the details.
        </h3>
        <p className="font-sans text-sm text-[#5A5650] font-light leading-relaxed mt-4">
          Your first conversation doesn&apos;t need to have everything figured out. Start with what matters to you.
        </p>
      </div>

      {/* Enquiries Placeholder */}
      <div className="pt-6 border-t border-[#161514]/15 space-y-2">
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#161514]">
          GENERAL ENQUIRIES
        </span>
        <div className="flex items-center gap-2 text-sm text-[#5A5650] font-sans">
          <Mail className="w-4 h-4 text-[#C5A880]" />
          <span>hello@wedora.example</span>
        </div>
        <p className="text-[11px] text-[#5A5650]/80 italic">
          Portfolio &amp; demonstration contact point
        </p>
      </div>

      {/* Quick Start Navigation */}
      <div className="pt-6 border-t border-[#161514]/15 space-y-4">
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#161514]">
          QUICK START
        </span>

        <ul className="space-y-3 text-xs font-semibold tracking-[0.18em] uppercase">
          <li>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-[#161514] hover:text-[#C5A880] transition-colors group"
            >
              <span>Explore our services</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </li>
          <li>
            <Link
              href="/budget-calculator"
              className="inline-flex items-center gap-2 text-[#161514] hover:text-[#C5A880] transition-colors group"
            >
              <span>Estimate your budget</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </li>
        </ul>
      </div>

      {/* WhatsApp CTA Placeholder */}
      <div className="pt-6 border-t border-[#161514]/15 space-y-3">
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#161514]">
          INSTANT INQUIRY
        </span>
        <button
          type="button"
          disabled
          aria-disabled="true"
          className="w-full py-3 px-4 bg-[#161514]/10 text-[#161514]/50 border border-[#161514]/20 text-xs font-semibold tracking-[0.18em] uppercase inline-flex items-center justify-center gap-2 cursor-not-allowed select-none"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Continue on WhatsApp (Coming Soon)</span>
        </button>
      </div>
    </motion.div>
  );
}
