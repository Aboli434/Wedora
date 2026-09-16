"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowLeft } from "lucide-react";
import { DASHBOARD_NAV_ITEMS, DASHBOARD_SECONDARY_ITEMS } from "./DashboardSidebar";

export function DashboardMobileNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Close drawer on pathname change
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <div className="lg:hidden sticky top-0 z-40 bg-[#FAF8F5] border-b border-[#161514]/15 px-6 py-4 flex items-center justify-between">
      {/* Brand Header */}
      <Link href="/" className="group block focus:outline-none">
        <span className="font-serif text-xl font-light uppercase tracking-[0.2em] text-[#161514]">
          Wedora
        </span>
        <span className="block text-[8px] font-sans tracking-[0.3em] uppercase text-[#C5A880] -mt-0.5">
          Dashboard
        </span>
      </Link>

      {/* Menu Toggle */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close dashboard menu" : "Open dashboard menu"}
        aria-expanded={isOpen}
        className="p-2 text-[#161514] hover:text-[#C5A880] transition-colors focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Dashboard Navigation Drawer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[65px] z-50 bg-[#FAF8F5] flex flex-col justify-between p-6 overflow-y-auto"
          >
            <div className="space-y-6">
              <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#5A5650] block">
                PLANNING MENU
              </span>

              <nav className="space-y-2">
                {DASHBOARD_NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    item.href === "/dashboard"
                      ? pathname === "/dashboard"
                      : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 text-sm font-medium tracking-wider uppercase border-l-2 transition-colors ${
                        isActive
                          ? "border-[#C5A880] bg-[#F3EFEA] text-[#161514] font-semibold"
                          : "border-transparent text-[#5A5650] hover:text-[#161514]"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          isActive ? "text-[#C5A880]" : "text-[#5A5650]"
                        }`}
                      />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-[#161514]/15 space-y-3">
              {DASHBOARD_SECONDARY_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-xs font-medium tracking-wider uppercase text-[#5A5650] hover:text-[#161514]"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-xs font-medium tracking-wider uppercase text-[#5A5650] hover:text-[#C5A880]"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Wedora Public Site</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
