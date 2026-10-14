"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { VendorSidebar } from "./VendorSidebar";
import { VendorMobileNav } from "./VendorMobileNav";
import { VendorHeader } from "./VendorHeader";
import { useAuth } from "@/hooks/useAuth";
import { ShieldAlert, RefreshCw, LogOut, CheckCircle2, Building2, AlertCircle } from "lucide-react";

interface VendorDashboardShellProps {
  children: React.ReactNode;
}

export function VendorDashboardShell({ children }: VendorDashboardShellProps) {
  const { user, refetchUser, logout } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const isUnverifiedVendor =
    user?.role === "VENDOR" &&
    user.profile &&
    "verified" in user.profile &&
    !user.profile.verified;

  // Auto-verify on mount whenever this review screen is active
  useEffect(() => {
    let active = true;
    if (isUnverifiedVendor && user?.email) {
      refetchUser().then((fresh) => {
        if (!active) return;
        if (fresh?.profile && "verified" in fresh.profile && fresh.profile.verified) {
          setFeedback("Account approved! Entering vendor dashboard...");
        }
      });
    }
    return () => {
      active = false;
    };
  }, [isUnverifiedVendor, user?.email, refetchUser]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setFeedback(null);
    try {
      const updated = await refetchUser();
      const isVerifiedNow =
        updated?.profile &&
        "verified" in updated.profile &&
        Boolean(updated.profile.verified);

      if (isVerifiedNow) {
        setFeedback("Verification confirmed! Loading dashboard...");
      } else {
        setFeedback("Checked database: Your vendor account is still awaiting platform admin approval. Please check back shortly.");
      }
    } catch {
      setFeedback("Unable to check status right now. Please try again in a moment.");
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  if (isUnverifiedVendor) {
    const biz = user.profile && "businessName" in user.profile ? (user.profile.businessName as string) : "Your Studio";
    const category = user.profile && "category" in user.profile ? (user.profile.category as string) : "Wedding Services";
    const city = user.profile && "city" in user.profile ? (user.profile.city as string) : "Mumbai";

    return (
      <div className="min-h-screen bg-[#FAF8F5] text-[#161514] font-sans flex flex-col justify-between">
        {/* Top Minimal Header */}
        <header className="border-b border-[#161514]/10 bg-white/80 backdrop-blur-md px-6 sm:px-10 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-serif text-2xl font-normal tracking-tight text-[#161514]">
              Wedora
            </span>
            <span className="text-[10px] uppercase font-semibold tracking-[0.2em] px-2 py-0.5 bg-amber-50 text-amber-900 border border-amber-200 rounded-xs">
              Vendor Studio
            </span>
          </div>

          <button
            onClick={logout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#5A5650] hover:text-[#161514] hover:bg-[#F3EFEA] rounded-xs transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </header>

        {/* Center Editorial "Profile Under Review" Card */}
        <main className="max-w-3xl mx-auto px-6 py-12 w-full my-auto">
          <div className="bg-white border border-[#161514]/15 rounded-xs p-8 sm:p-12 shadow-sm space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-300/80 flex items-center justify-center text-amber-800">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-amber-800 block">
                  STATUS: PENDING VERIFICATION
                </span>
                <span className="text-xs text-[#5A5650]">
                  Wedora Platform Quality Assurance
                </span>
              </div>
            </div>

            <div className="space-y-3 border-b border-[#161514]/10 pb-6">
              <h1 className="font-serif text-3xl sm:text-4xl font-light text-[#161514]">
                {biz} is Under Review
              </h1>
              <p className="font-sans text-sm text-[#5A5650] font-light leading-relaxed">
                Welcome to Wedora. To maintain an elite directory for couples, all vendor profiles must be reviewed and approved by the platform administrator before account features and client inquiries are unlocked.
              </p>
            </div>

            {/* Profile Snapshot */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-[#FAF8F5] border border-[#161514]/10 rounded-xs text-xs">
              <div>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-[#5A5650] block mb-1">
                  Business Name
                </span>
                <span className="font-serif text-base font-medium text-[#161514] block">
                  {biz}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-[#5A5650] block mb-1">
                  Category & City
                </span>
                <span className="font-sans font-medium text-[#161514] block">
                  {category} • {city}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-[#5A5650] block mb-1">
                  Verification Status
                </span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-amber-100/70 text-amber-900 border border-amber-300 font-bold text-[10px] uppercase tracking-wider rounded-xs">
                  Pending Admin Approval
                </span>
              </div>
            </div>

            {/* Verification Checklist */}
            <div className="space-y-3 pt-2">
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#C5A880] block">
                Verification Pipeline
              </span>
              <ul className="space-y-2.5 text-xs text-[#5A5650]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Studio registered and details submitted to platform</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-amber-600 border-t-transparent animate-spin shrink-0" />
                  <span className="text-[#161514] font-medium">Administrator reviewing credentials in Admin Command Center</span>
                </li>
                <li className="flex items-center gap-2 text-[#5A5650]/60">
                  <div className="w-4 h-4 rounded-full border border-[#161514]/20 shrink-0" />
                  <span>Public publication & client inquiry activation upon approval</span>
                </li>
              </ul>
            </div>

            {feedback && (
              <div className="p-3.5 bg-amber-50 border border-amber-200 text-amber-900 rounded-xs text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>{feedback}</span>
              </div>
            )}

            {/* Actions */}
            <div className="pt-6 border-t border-[#161514]/15 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="w-full sm:w-auto flex-1 px-6 py-3.5 bg-[#161514] hover:bg-[#C5A880] text-[#FAF8F5] hover:text-[#161514] font-semibold text-xs tracking-[0.2em] uppercase rounded-xs transition-colors inline-flex items-center justify-center gap-2"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
                <span>{isRefreshing ? "Checking Status..." : "Refresh Status"}</span>
              </button>

              <Link
                href="/vendors"
                className="w-full sm:w-auto px-6 py-3.5 bg-transparent border border-[#161514]/20 hover:bg-[#FAF8F5] text-[#161514] font-semibold text-xs tracking-[0.2em] uppercase rounded-xs transition-colors text-center"
              >
                Explore Public Directory
              </Link>
            </div>
          </div>
        </main>

        <footer className="text-center py-6 text-[10px] text-[#5A5650] uppercase tracking-widest border-t border-[#161514]/10">
          Wedora • Luxury Wedding Planning & Vendor Network
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C2A29] flex flex-col lg:flex-row font-sans selection:bg-[#C5A880]/20">
      {/* Desktop Sidebar */}
      <VendorSidebar className="hidden lg:flex shrink-0 fixed inset-y-0 left-0 z-40" />

      {/* Main Container */}
      <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
        {/* Mobile Navigation Header */}
        <VendorMobileNav />

        {/* Top Header */}
        <VendorHeader />

        {/* Main Content Area */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 max-w-7xl w-full mx-auto space-y-8">
          {children}
        </main>
      </div>
    </div>
  );
}
