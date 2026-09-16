import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: "gold" | "outline" | "subtle" | "dark";
}

export function Badge({
  children,
  className,
  variant = "gold",
  ...props
}: BadgeProps) {
  const variantMap = {
    gold: "bg-[var(--accent-gold-muted)] text-[var(--accent-gold-hover)] border border-[var(--accent-gold)]/30",
    outline: "bg-transparent text-[var(--text-secondary)] border border-[var(--border-medium)]",
    subtle: "bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-subtle)]",
    dark: "bg-[var(--bg-dark)] text-[var(--text-light)] border border-[var(--border-dark)]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 text-[10px] font-sans tracking-[0.22em] uppercase font-medium transition-colors duration-300",
        variantMap[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
