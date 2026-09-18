"use client";

import React from "react";
import Link from "next/link";
import { Plus, Image as ImageIcon, MessageSquare, Calendar } from "lucide-react";

const ACTIONS = [
  {
    title: "Add Service",
    description: "Create new package offering",
    href: "/vendor/dashboard/services",
    icon: Plus,
  },
  {
    title: "Update Portfolio",
    description: "Upload recent wedding photos",
    href: "/vendor/dashboard/portfolio",
    icon: ImageIcon,
  },
  {
    title: "Review Enquiries",
    description: "Respond to incoming couples",
    href: "/vendor/dashboard/enquiries",
    icon: MessageSquare,
  },
  {
    title: "View Calendar",
    description: "Manage blackout dates",
    href: "/vendor/dashboard/calendar",
    icon: Calendar,
  },
];

export function VendorQuickActions() {
  return (
    <section className="space-y-3">
      <h2 className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#8C857B]">
        Quick Studio Actions
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {ACTIONS.map((act) => {
          const Icon = act.icon;
          return (
            <Link
              key={act.title}
              href={act.href}
              className="p-5 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9] hover:border-[#2C2A29]/30 transition-all flex flex-col justify-between space-y-3 group"
            >
              <div className="w-9 h-9 rounded-lg bg-[#F2ECE4] border border-[#E5DEC9] flex items-center justify-center text-[#2C2A29] group-hover:bg-[#2C2A29] group-hover:text-[#FAF8F5] transition-colors">
                <Icon className="w-4 h-4" />
              </div>

              <div>
                <h3 className="text-sm font-medium text-[#2C2A29] group-hover:text-[#C5A880] transition-colors">
                  {act.title}
                </h3>
                <p className="text-xs text-[#6E6B65] mt-0.5">{act.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
