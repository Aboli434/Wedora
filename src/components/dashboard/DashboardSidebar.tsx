"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Heart,
  CheckSquare,
  Wallet,
  Users,
  Store,
  Calendar,
  Settings,
  ArrowLeft,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const DASHBOARD_NAV_ITEMS: NavItem[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Wedding", href: "/dashboard/wedding", icon: Heart },
  { label: "Checklist", href: "/dashboard/checklist", icon: CheckSquare },
  { label: "Budget", href: "/dashboard/budget", icon: Wallet },
  { label: "Guests", href: "/dashboard/guests", icon: Users },
  { label: "Vendors", href: "/dashboard/vendors", icon: Store },
  { label: "Events", href: "/dashboard/events", icon: Calendar },
];

export const DASHBOARD_SECONDARY_ITEMS: NavItem[] = [
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 xl:w-72 bg-[#FAF8F5] border-r border-[#161514]/15 min-h-screen fixed top-0 left-0 bottom-0 z-30 p-8 justify-between">
      <div className="space-y-10">
        {/* Branding Header */}
        <div>
          <Link href="/" className="group block focus:outline-none focus:ring-1 focus:ring-[#C5A880]">
            <span className="font-serif text-2xl font-light uppercase tracking-[0.2em] text-[#161514] group-hover:text-[#C5A880] transition-colors">
              Wedora
            </span>
            <span className="block text-[9px] font-sans tracking-[0.35em] uppercase text-[#C5A880] -mt-0.5">
              Wedding Planning
            </span>
          </Link>
        </div>

        {/* Main Navigation */}
        <nav className="space-y-1" aria-label="Dashboard Navigation">
          <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#5A5650] block mb-3 px-3">
            PLANNING HUB
          </span>

          <ul className="space-y-1">
            {DASHBOARD_NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 text-xs font-medium tracking-wider uppercase transition-colors relative group ${
                      isActive
                        ? "text-[#161514] font-semibold"
                        : "text-[#5A5650] hover:text-[#161514]"
                    }`}
                  >
                    {/* Active Accent Indicator */}
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#C5A880]" />
                    )}

                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isActive ? "text-[#C5A880]" : "text-[#5A5650] group-hover:text-[#161514]"
                      }`}
                    />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Secondary & Back to Wedora Navigation */}
      <div className="pt-8 border-t border-[#161514]/15 space-y-4">
        <ul className="space-y-1">
          {DASHBOARD_SECONDARY_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 text-xs font-medium tracking-wider uppercase transition-colors ${
                    isActive ? "text-[#C5A880] font-semibold" : "text-[#5A5650] hover:text-[#161514]"
                  }`}
                >
                  <Icon className="w-4 h-4 text-[#5A5650]" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}

          <li>
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2 text-xs font-medium tracking-wider uppercase text-[#5A5650] hover:text-[#C5A880] transition-colors mt-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Wedora</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
