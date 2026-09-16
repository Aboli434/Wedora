"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

export interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  duration?: number;
  className?: string;
}

export function Reveal({
  children,
  width = "fit-content",
  delay = 0,
  duration = 0.6,
  className,
}: RevealProps) {
  const revealVariants: Variants = {
    hidden: { opacity: 0, y: 75 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div
      style={{ position: "relative", width, overflow: "hidden" }}
      className={cn(className)}
    >
      <motion.div
        variants={revealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration, delay, ease: [0.25, 1, 0.5, 1] as const }}
      >
        {children}
      </motion.div>
    </div>
  );
}
