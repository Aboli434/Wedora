"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ScaleInProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  initialScale?: number;
  once?: boolean;
}

export function ScaleIn({
  children,
  delay = 0,
  duration = 0.6,
  initialScale = 0.95,
  once = true,
  className,
  ...props
}: ScaleInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: initialScale }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once }}
      transition={{ duration, delay, ease: [0.25, 1, 0.5, 1] as const }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
