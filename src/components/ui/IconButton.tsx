"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface IconButtonProps
  extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
  "aria-label": string;
  variant?: "ghost" | "outline" | "secondary";
  size?: "sm" | "md" | "lg";
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      children,
      className,
      "aria-label": ariaLabel,
      variant = "ghost",
      size = "md",
      type = "button",
      ...props
    },
    ref
  ) => {
    const sizeMap = {
      sm: "w-8 h-8 p-1.5 text-xs",
      md: "w-10 h-10 p-2 text-sm",
      lg: "w-12 h-12 p-3 text-base",
    };

    const variantMap = {
      ghost: "text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--accent-gold)]",
      outline: "text-[var(--text-primary)] border border-[var(--border-medium)] hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)]",
      secondary: "bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--accent-gold-muted)]",
    };

    return (
      <motion.button
        ref={ref}
        type={type}
        aria-label={ariaLabel}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "inline-flex items-center justify-center transition-colors duration-300 focus-visible:outline-none cursor-pointer",
          sizeMap[size],
          variantMap[variant],
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

IconButton.displayName = "IconButton";
