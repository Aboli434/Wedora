"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/lib/utils";
import { useScrollPosition } from "@/hooks/useScrollPosition";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Vendors", href: "/vendors" },
  { label: "Weddings", href: "/real-weddings" },
  { label: "Gallery", href: "/gallery" },
  { label: "Journal", href: "/blog" },
];

export function Navbar() {
  const pathname = usePathname();
  const scrollY = useScrollPosition();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [prevPathname, setPrevPathname] = useState<string>(pathname);

  // Close mobile menu when pathname changes during render
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsMobileMenuOpen(false);
  }

  const isScrolled = scrollY > 40;

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  const navContainerVariants: Variants = {
    hidden: { opacity: 0, y: -15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.08,
        ease: [0.25, 1, 0.5, 1] as const,
      },
    },
  };

  const navItemVariants: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] as const },
    },
  };

  const mobileOverlayVariants: Variants = {
    closed: {
      opacity: 0,
      clipPath: "circle(30px at calc(100% - 40px) 40px)",
      transition: { duration: 0.35, ease: [0.76, 0, 0.24, 1] as const },
    },
    open: {
      opacity: 1,
      clipPath: "circle(150% at calc(100% - 40px) 40px)",
      transition: { duration: 0.45, ease: [0.25, 1, 0.5, 1] as const },
    },
  };

  const mobileListVariants: Variants = {
    closed: {},
    open: {
      transition: { staggerChildren: 0.06, delayChildren: 0.1 },
    },
  };

  const mobileItemVariants: Variants = {
    closed: { opacity: 0, y: 20 },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: [0.25, 1, 0.5, 1] as const },
    },
  };

  return (
    <>
      <motion.header
        initial="hidden"
        animate="visible"
        variants={navContainerVariants}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ease-out",
          isScrolled
            ? "h-16 bg-[var(--bg-primary)]/95 backdrop-blur-md border-b border-[var(--border-subtle)] shadow-xs text-[var(--text-primary)]"
            : "h-24 bg-gradient-to-b from-black/70 via-black/30 to-transparent border-b border-transparent text-[var(--text-light)]"
        )}
      >
        <Container size="lg" className="h-full">
          <div className="flex items-center justify-between h-full">
            {/* Brand Logo & Subtitle */}
            <motion.div variants={navItemVariants}>
              <Link
                href="/"
                className="group flex flex-col focus-visible:outline-none"
                aria-label="Wedora Home"
              >
                <span
                  className={cn(
                    "font-serif text-2xl lg:text-3xl tracking-[0.2em] font-light uppercase transition-colors duration-300",
                    isScrolled
                      ? "text-[var(--text-primary)] group-hover:text-[var(--accent-gold)]"
                      : "text-[var(--text-light)] group-hover:text-[var(--accent-gold)]"
                  )}
                >
                  Wedora
                </span>
                <span
                  className={cn(
                    "caption text-[9px] tracking-[0.35em] -mt-1 transition-colors duration-300",
                    isScrolled
                      ? "text-[var(--text-muted)] group-hover:text-[var(--accent-gold)]"
                      : "text-[var(--text-light)]/70 group-hover:text-[var(--accent-gold)]"
                  )}
                >
                  Wedding Planning
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation Links (>= 1024px) */}
            <motion.nav
              variants={navItemVariants}
              aria-label="Main Navigation"
              className="hidden lg:flex items-center space-x-8"
            >
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative py-1 text-xs uppercase tracking-[0.2em] font-sans font-medium transition-colors duration-300",
                      isActive
                        ? isScrolled
                          ? "text-[var(--text-primary)] font-semibold"
                          : "text-white font-semibold"
                        : isScrolled
                        ? "text-[var(--text-secondary)] hover:text-[var(--accent-gold)]"
                        : "text-[var(--text-light)]/85 hover:text-[var(--accent-gold)]"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[var(--accent-gold)]"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </motion.nav>

            {/* Desktop Action Buttons (>= 1024px) */}
            <motion.div
              variants={navItemVariants}
              className="hidden lg:flex items-center space-x-4"
            >
              <Link href="/register">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "tracking-wider transition-colors duration-300",
                    isScrolled
                      ? "text-[var(--text-primary)] hover:text-[var(--accent-gold)]"
                      : "text-[var(--text-light)] hover:text-[var(--accent-gold)]"
                  )}
                >
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  variant="primary"
                  size="sm"
                  className={cn(
                    isScrolled
                      ? "bg-[var(--text-primary)] text-[var(--bg-primary)] hover:bg-[var(--accent-gold)] hover:text-white"
                      : "bg-[var(--accent-gold)] !text-black border-transparent hover:bg-white hover:!text-black shadow-md"
                  )}
                >
                  Plan Your Wedding
                </Button>
              </Link>
            </motion.div>

            {/* Mobile Menu Trigger (< 1024px) */}
            <div className="flex lg:hidden items-center">
              <IconButton
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-navigation-overlay"
                variant="ghost"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X
                    className={cn(
                      "w-6 h-6",
                      isScrolled ? "text-[var(--text-primary)]" : "text-[var(--text-light)]"
                    )}
                  />
                ) : (
                  <Menu
                    className={cn(
                      "w-6 h-6",
                      isScrolled ? "text-[var(--text-primary)]" : "text-[var(--text-light)]"
                    )}
                  />
                )}
              </IconButton>
            </div>
          </div>
        </Container>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-navigation-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileOverlayVariants}
            className="fixed inset-0 z-40 bg-[var(--bg-primary)] flex flex-col justify-between pt-28 pb-12 px-8 lg:hidden overflow-y-auto"
          >
            <motion.nav
              variants={mobileListVariants}
              className="flex flex-col space-y-6 my-auto text-center"
            >
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <motion.div key={link.href} variants={mobileItemVariants}>
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "font-serif text-3xl sm:text-4xl tracking-[0.15em] uppercase transition-colors duration-300 block py-1",
                        isActive
                          ? "text-[var(--accent-gold)] font-medium"
                          : "text-[var(--text-primary)] hover:text-[var(--accent-gold)]"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                variants={mobileItemVariants}
                className="pt-8 flex flex-col space-y-4 max-w-xs mx-auto w-full"
              >
                <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="primary" size="lg" className="w-full bg-[var(--accent-gold)] !text-black hover:bg-white hover:!text-black">
                    Plan Your Wedding
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" size="md" className="w-full">
                    Login
                  </Button>
                </Link>
              </motion.div>
            </motion.nav>

            <div className="text-center pt-8 text-xs font-sans tracking-[0.2em] text-[var(--text-muted)] uppercase">
              Wedora • Luxury Wedding Planning
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
