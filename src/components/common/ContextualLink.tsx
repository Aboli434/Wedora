"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ContextualLinkProps {
  label: string;
  value?: string;
  href: string;
  linkText?: string;
  actionLabel?: string;
  className?: string;
}

export function ContextualLink({
  label,
  value,
  href,
  linkText,
  actionLabel,
  className = "",
}: ContextualLinkProps) {
  const actionText = actionLabel || linkText || `View ${label.toLowerCase()}`;
  return (
    <div className={`space-y-1 ${className}`}>
      <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#C5A880] font-semibold block">
        {label}
      </span>
      {value && (
        <p className="text-xs font-serif text-[#161514] font-normal truncate">
          {value}
        </p>
      )}
      <Link
        href={href}
        className="inline-flex items-center gap-1 text-xs font-sans text-[#161514] font-medium hover:text-[#C5A880] transition-colors py-1 group focus:outline-none focus:ring-1 focus:ring-[#C5A880] rounded-xs"
      >
        <span>{actionText}</span>
        <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A880] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </Link>
    </div>
  );
}
