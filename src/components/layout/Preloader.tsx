"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [isLoading, setIsLoading] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return !sessionStorage.getItem("wedora_preloaded");
    }
    return false;
  });
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (!isLoading) return;

    const duration = 1000;
    const intervalTime = 20;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev + increment >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsLoading(false);
            if (typeof window !== "undefined") {
              sessionStorage.setItem("wedora_preloaded", "true");
            }
          }, 250);
          return 100;
        }
        return Math.floor(prev + increment);
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-[var(--bg-dark)] text-[var(--text-light)] py-16 px-6 select-none"
        >
          <div className="w-full flex justify-between items-center max-w-7xl px-4 text-xs font-sans tracking-[0.25em] text-[var(--text-muted)] uppercase">
            <span>Wedora Platform</span>
            <span>2026 Collection</span>
          </div>

          <div className="flex flex-col items-center text-center space-y-4 my-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] as const }}
              className="font-serif text-4xl sm:text-6xl tracking-[0.25em] font-light uppercase text-[var(--accent-gold)]"
            >
              Wedora
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.15,
                ease: [0.25, 1, 0.5, 1] as const,
              }}
              className="font-serif italic text-base sm:text-xl text-[var(--text-light)]/80 tracking-wide"
            >
              Your Story. Our Celebration.
            </motion.p>
          </div>

          <div className="flex items-center space-x-3 text-xs font-sans tracking-[0.3em] text-[var(--accent-gold)]">
            <span className="w-12 text-right">{Math.min(100, Math.floor(progress))}</span>
            <span className="text-[var(--text-muted)]">—</span>
            <span className="text-[var(--text-muted)]">100</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
