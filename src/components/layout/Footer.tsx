"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";

export function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/dashboard")) {
    return null;
  }
  return (
    <footer className="w-full bg-[var(--bg-dark)] text-[var(--text-light)] pt-24 pb-12">
      <Container size="lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16">
          {/* Brand Column */}
          <div className="space-y-4 lg:col-span-2">
            <Link href="/" className="inline-block">
              <span className="font-serif text-3xl tracking-[0.2em] font-light uppercase text-[var(--accent-gold)]">
                Wedora
              </span>
            </Link>
            <p className="font-serif italic text-lg text-[var(--text-light)]/80">
              Your Story. Our Celebration.
            </p>
            <p className="body-sm text-[var(--text-muted)] max-w-sm">
              An elite luxury wedding planning, editorial showcase, and vendor curation experience for extraordinary global celebrations.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <span className="caption text-[var(--accent-gold)]">Navigation</span>
            <ul className="space-y-3 body-sm">
              <li>
                <Link href="/about" className="hover:text-[var(--accent-gold)] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[var(--accent-gold)] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/vendors" className="hover:text-[var(--accent-gold)] transition-colors">
                  Vendors
                </Link>
              </li>
              <li>
                <Link href="/real-weddings" className="hover:text-[var(--accent-gold)] transition-colors">
                  Real Weddings
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[var(--accent-gold)] transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[var(--accent-gold)] transition-colors">
                  Journal
                </Link>
              </li>
            </ul>
          </div>

          {/* Planning Resources */}
          <div className="space-y-4">
            <span className="caption text-[var(--accent-gold)]">Planning</span>
            <ul className="space-y-3 body-sm">
              <li>
                <Link href="/register" className="hover:text-[var(--accent-gold)] transition-colors">
                  Plan Your Wedding
                </Link>
              </li>
              <li>
                <Link href="/budget-calculator" className="hover:text-[var(--accent-gold)] transition-colors">
                  Budget Calculator
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[var(--accent-gold)] transition-colors">
                  Concierge &amp; Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <span className="caption text-[var(--accent-gold)]">Social</span>
            <ul className="space-y-3 body-sm">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--accent-gold)] transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--accent-gold)] transition-colors"
                >
                  Pinterest
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Divider variant="gold" className="opacity-20 mb-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center text-[var(--text-muted)] text-xs font-sans tracking-widest gap-4">
          <p>© 2026 Wedora. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/privacy-policy" className="hover:text-[var(--accent-gold)] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-[var(--accent-gold)] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
