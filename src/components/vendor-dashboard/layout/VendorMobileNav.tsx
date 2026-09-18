"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { VendorSidebar } from "./VendorSidebar";

export function VendorMobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  // Body scroll lock & Escape key handling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <header className="lg:hidden bg-[#161514] border-b border-[#2C2A28] px-4 py-3 flex items-center justify-between sticky top-0 z-40">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <Link href="/vendor/dashboard" className="font-serif text-lg text-[#FAF8F5] tracking-wider">
          WEDORA
        </Link>
        <span className="text-[9px] font-sans tracking-[0.2em] uppercase text-[#C5A880] font-semibold border-l border-[#2C2A28] pl-3 py-0.5">
          VENDOR STUDIO
        </span>
      </div>

      {/* Hamburger Toggle */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        className="p-2 text-[#EAE6DF] hover:text-[#C5A880] focus:outline-none focus:ring-2 focus:ring-[#C5A880] rounded-md"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Drawer Backdrop & Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Content */}
          <div
            className="relative z-10 w-72 max-w-[80vw] bg-[#161514] h-full shadow-2xl flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Vendor Studio Navigation"
          >
            <div className="p-4 flex items-center justify-between border-b border-[#2C2A28]">
              <span className="text-xs font-sans tracking-[0.2em] uppercase text-[#C5A880] font-semibold">
                VENDOR STUDIO MENU
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close navigation"
                className="p-1 text-[#8C857B] hover:text-[#FAF8F5]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <VendorSidebar onNavClick={() => setIsOpen(false)} className="w-full min-h-0 border-r-0" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
