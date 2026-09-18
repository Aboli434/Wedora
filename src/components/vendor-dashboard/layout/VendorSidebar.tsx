"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Tag,
  Image as ImageIcon,
  MessageSquare,
  CalendarCheck,
  Calendar,
  Users,
  CreditCard,
  Star,
  Settings,
  ArrowLeft,
} from "lucide-react";

interface NavGroup {
  label: string;
  items: {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    label: "OVERVIEW",
    items: [
      { name: "Dashboard", href: "/vendor/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "BUSINESS",
    items: [
      { name: "My Business", href: "/vendor/dashboard/business", icon: Building2 },
      { name: "Services & Pricing", href: "/vendor/dashboard/services", icon: Tag },
      { name: "Portfolio", href: "/vendor/dashboard/portfolio", icon: ImageIcon },
    ],
  },
  {
    label: "WORK",
    items: [
      { name: "Enquiries", href: "/vendor/dashboard/enquiries", icon: MessageSquare },
      { name: "Bookings", href: "/vendor/dashboard/bookings", icon: CalendarCheck },
      { name: "Calendar", href: "/vendor/dashboard/calendar", icon: Calendar },
      { name: "Clients", href: "/vendor/dashboard/clients", icon: Users },
    ],
  },
  {
    label: "FINANCE",
    items: [
      { name: "Payments", href: "/vendor/dashboard/payments", icon: CreditCard },
    ],
  },
  {
    label: "REPUTATION",
    items: [
      { name: "Reviews", href: "/vendor/dashboard/reviews", icon: Star },
    ],
  },
  {
    label: "ACCOUNT",
    items: [
      { name: "Settings", href: "/vendor/dashboard/settings", icon: Settings },
    ],
  },
];

interface VendorSidebarProps {
  onNavClick?: () => void;
  className?: string;
}

export function VendorSidebar({ onNavClick, className = "" }: VendorSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`w-64 bg-[#161514] text-[#EAE6DF] flex flex-col justify-between border-r border-[#2C2A28] min-h-screen ${className}`}
    >
      <div className="p-6 space-y-8 overflow-y-auto">
        {/* Brand Header */}
        <div className="space-y-1 border-b border-[#2C2A28] pb-5">
          <Link
            href="/"
            onClick={onNavClick}
            className="font-serif text-xl tracking-wider text-[#FAF8F5] block font-light hover:text-[#C5A880] transition-colors"
          >
            WEDORA
          </Link>
          <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A880] font-medium block">
            VENDOR STUDIO
          </span>
        </div>

        {/* Navigation Groups */}
        <nav className="space-y-6">
          {NAV_GROUPS.map((group) => (
            <div key={group.label} className="space-y-2">
              <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#8C857B] font-semibold block px-2">
                {group.label}
              </span>
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/vendor/dashboard" && pathname?.startsWith(item.href));
                  const Icon = item.icon;

                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        onClick={onNavClick}
                        className={`group flex items-center justify-between px-3 py-2 text-xs rounded-md transition-all duration-200 ${
                          isActive
                            ? "bg-[#242220] text-[#FAF8F5] font-medium border-l-2 border-[#C5A880] pl-2.5"
                            : "text-[#A39C93] hover:text-[#FAF8F5] hover:bg-[#1E1C1A]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon
                            className={`w-4 h-4 transition-colors ${
                              isActive ? "text-[#C5A880]" : "text-[#7A746B] group-hover:text-[#A39C93]"
                            }`}
                          />
                          <span>{item.name}</span>
                        </div>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* Footer Link */}
      <div className="p-6 border-t border-[#2C2A28]">
        <Link
          href="/"
          onClick={onNavClick}
          className="flex items-center gap-2 text-xs text-[#8C857B] hover:text-[#FAF8F5] transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#8C857B] group-hover:text-[#C5A880] transition-colors" />
          <span>Back to Wedora</span>
        </Link>
      </div>
    </aside>
  );
}
