"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, RotateCcw, CheckCircle2 } from "lucide-react";

interface AuthSuccessProps {
  type: "login" | "register";
  role?: "CLIENT" | "VENDOR" | "ADMIN" | null;
  businessName?: string;
  onReset: () => void;
}

export function AuthSuccess({ type, role, businessName, onReset }: AuthSuccessProps) {
  const shouldReduceMotion = useReducedMotion();

  const isLogin = type === "login";
  const isVendorRegister = !isLogin && role === "VENDOR";

  const dashboardHref =
    role === "ADMIN"
      ? "/admin/dashboard"
      : role === "VENDOR"
      ? "/vendor/dashboard"
      : "/dashboard";

  if (isVendorRegister) {
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
          <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-amber-800" />
          </div>
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-amber-800">
            SUBMITTED • PROFILE UNDER REVIEW
          </span>
        </div>

        <div className="space-y-3">
          <h3 className="font-serif text-3xl sm:text-4xl font-light text-[#161514] leading-snug">
            {businessName ? `${businessName} is Under Review.` : "Your Profile is Under Review."}
          </h3>

          <p className="font-sans text-sm sm:text-base text-[#5A5650] font-light leading-relaxed">
            Your vendor registration has been received. To maintain an elite directory of verified wedding artisans, each vendor account must be verified and approved by the Wedora Admin before login access is activated.
          </p>
        </div>

        {/* Verification Status Card */}
        <div className="p-4 bg-white border border-[#161514]/10 rounded-xs space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-semibold uppercase tracking-wider text-[10px] text-[#5A5650]">
              Status
            </span>
            <span className="px-2.5 py-0.5 bg-amber-50 text-amber-900 border border-amber-200 text-[10px] font-bold uppercase tracking-wider rounded-xs">
              Pending Admin Verification
            </span>
          </div>
          <p className="text-[11px] text-[#5A5650]">
            The platform administrator will review your business credentials in the Admin Console. Once approved, your account will be activated and you can sign in.
          </p>
        </div>

        <div className="pt-6 border-t border-[#161514]/15 flex flex-col gap-3">
          <Link
            href="/login"
            style={{ color: "#FAF8F5" }}
            className="w-full px-6 py-3.5 bg-[#161514] hover:bg-[#C5A880] !text-[#FAF8F5] hover:!text-[#161514] font-semibold text-xs tracking-[0.2em] uppercase inline-flex items-center justify-center gap-2 transition-colors rounded-xs shadow-xs"
          >
            <span style={{ color: "#FAF8F5" }} className="!text-[#FAF8F5] font-sans">
              Go to Sign In
            </span>
            <ArrowRight className="w-4 h-4 !text-[#FAF8F5]" />
          </Link>

          <Link
            href="/vendors"
            className="w-full px-6 py-3.5 bg-transparent text-[#161514] border border-[#161514]/30 font-semibold text-xs tracking-[0.2em] uppercase inline-flex items-center justify-center hover:bg-[#FAF8F5] transition-colors rounded-xs"
          >
            <span>Explore Public Directory</span>
          </Link>
        </div>

        <div className="pt-4 border-t border-[#161514]/10 flex items-center justify-between">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-[#161514] hover:text-[#C5A880] transition-colors py-1 focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Create another registration</span>
          </button>
        </div>
      </motion.div>
    );
  }

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
          {isLogin ? "AUTHENTICATED" : "ACCOUNT CREATED"}
        </span>
      </div>

      <div className="space-y-3">
        <h3 className="font-serif text-3xl sm:text-4xl font-light text-[#161514] leading-snug">
          {isLogin
            ? "Welcome back to Wedora."
            : "Your Wedora journey is ready to begin."}
        </h3>

        <p className="font-sans text-sm sm:text-base text-[#5A5650] font-light leading-relaxed">
          {isLogin
            ? "You have been successfully authenticated. Click below to continue to your dashboard."
            : `Your ${
                role === "VENDOR" ? "vendor studio" : "planning"
              } account has been created. You can now access your dashboard or sign in.`}
        </p>
      </div>

      <div className="pt-6 border-t border-[#161514]/15 flex flex-col gap-3">
        <Link
          href={dashboardHref}
          className="w-full px-6 py-3.5 bg-[#C5A880] text-[#161514] font-semibold text-xs tracking-[0.2em] uppercase inline-flex items-center justify-center hover:bg-[#161514] hover:text-[#FAF8F5] transition-colors"
        >
          <span>
            Go to{" "}
            {role === "ADMIN"
              ? "Admin Command Center"
              : role === "VENDOR"
              ? "Vendor Dashboard"
              : "Dashboard"}
          </span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>

        {isLogin ? (
          <Link
            href="/register"
            className="w-full px-6 py-3.5 bg-transparent text-[#161514] border border-[#161514]/30 font-semibold text-xs tracking-[0.2em] uppercase inline-flex items-center justify-center hover:bg-[#161514] hover:text-[#FAF8F5] transition-colors"
          >
            <span>Create another account</span>
          </Link>
        ) : (
          <Link
            href="/login"
            className="w-full px-6 py-3.5 bg-transparent text-[#161514] border border-[#161514]/30 font-semibold text-xs tracking-[0.2em] uppercase inline-flex items-center justify-center hover:bg-[#161514] hover:text-[#FAF8F5] transition-colors"
          >
            <span>Sign In to Account</span>
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
      </div>
    </motion.div>
  );
}
