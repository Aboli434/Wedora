"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, RotateCcw, CheckCircle2 } from "lucide-react";

interface AuthSuccessProps {
  type: "login" | "register";
  role?: "CLIENT" | "VENDOR" | null;
  onReset: () => void;
}

export function AuthSuccess({ type, role, onReset }: AuthSuccessProps) {
  const shouldReduceMotion = useReducedMotion();

  const isLogin = type === "login";

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      className="space-y-8 bg-[#FAF8F5] p-8 sm:p-10 border border-[#161514]/15"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-3">
        <CheckCircle2 className="w-6 h-6 text-[#C5A880]" />
        <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C5A880]">
          DEMO MODE
        </span>
      </div>

      <div className="space-y-3">
        <h3 className="font-serif text-3xl sm:text-4xl font-light text-[#161514] leading-snug">
          {isLogin
            ? "Your sign-in flow is ready."
            : "Your Wedora journey is ready to begin."}
        </h3>

        <p className="font-sans text-sm sm:text-base text-[#5A5650] font-light leading-relaxed">
          {isLogin
            ? "Authentication is not connected yet. This frontend is prepared for the future Wedora auth service."
            : `Account registration for ${
                role === "VENDOR" ? "vendors" : "couples"
              } is ready for integration. No real account was created during this demonstration.`}
        </p>
      </div>

      <div className="pt-6 border-t border-[#161514]/15 flex flex-col gap-3">
        <Link
          href="/"
          className="w-full px-6 py-3.5 bg-[#C5A880] text-[#161514] font-semibold text-xs tracking-[0.2em] uppercase inline-flex items-center justify-center hover:bg-[#161514] hover:text-[#FAF8F5] transition-colors"
        >
          <span>Continue Exploring</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>

        {isLogin ? (
          <Link
            href="/register"
            className="w-full px-6 py-3.5 bg-transparent text-[#161514] border border-[#161514]/30 font-semibold text-xs tracking-[0.2em] uppercase inline-flex items-center justify-center hover:bg-[#161514] hover:text-[#FAF8F5] transition-colors"
          >
            <span>Create an Account</span>
          </Link>
        ) : (
          <Link
            href="/login"
            className="w-full px-6 py-3.5 bg-transparent text-[#161514] border border-[#161514]/30 font-semibold text-xs tracking-[0.2em] uppercase inline-flex items-center justify-center hover:bg-[#161514] hover:text-[#FAF8F5] transition-colors"
          >
            <span>Back to Sign In</span>
          </Link>
        )}
      </div>

      <div className="pt-4 border-t border-[#161514]/10 flex items-center justify-between">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-[#161514] hover:text-[#C5A880] transition-colors py-1 focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{isLogin ? "Back to Login" : "Start over"}</span>
        </button>

        <span className="text-[11px] text-[#5A5650] italic">
          Frontend Demonstration Mode
        </span>
      </div>
    </motion.div>
  );
}
