"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "children"> {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "md",
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-sans tracking-widest uppercase transition-all duration-300 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer";

    const variants = {
      primary:
        "bg-[#C5A880] text-[#161514] font-semibold hover:bg-white hover:text-[#161514] shadow-md border border-[#C5A880] hover:border-white",
      secondary:
        "bg-[#F3EFEA] text-[#1C1B18] hover:bg-[#F2ECDF] border border-[#E6E1DA]",
      outline:
        "bg-transparent text-white border border-white/50 hover:bg-white hover:text-[#161514]",
      ghost:
        "bg-transparent text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--accent-gold)]",
      link: "bg-transparent text-[var(--text-primary)] underline-offset-8 hover:underline hover:text-[var(--accent-gold)] p-0 h-auto tracking-widest border-none",
    };

    const sizes = {
      sm: "text-[11px] px-4 py-2 tracking-[0.18em]",
      md: "text-xs px-6 py-3 tracking-[0.2em]",
      lg: "text-xs px-8 py-4 tracking-[0.22em]",
    };

    return (
      <motion.button
        ref={ref}
        type={type}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        disabled={disabled}
        className={cn(
          baseStyles,
          variants[variant],
          variant !== "link" && sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
