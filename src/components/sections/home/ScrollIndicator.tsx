"use client";

import React from "react";
import { motion } from "framer-motion";

export function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.2, ease: [0.25, 1, 0.5, 1] as const }}
      className="flex flex-col items-center space-y-3 select-none"
    >
      <span className="caption text-[10px] tracking-[0.3em] text-[var(--text-light)]/70 uppercase">
        Scroll to Explore
      </span>
      <div className="w-[1px] h-10 bg-[var(--text-light)]/20 relative overflow-hidden">
        <motion.div
          animate={{
            y: ["-100%", "100%"],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.8,
            ease: "easeInOut",
          }}
          className="w-full h-1/2 bg-[var(--accent-gold)]"
        />
      </div>
    </motion.div>
  );
}
