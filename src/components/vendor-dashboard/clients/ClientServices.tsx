"use client";

import React from "react";
import Link from "next/link";
import { Tag, ArrowUpRight } from "lucide-react";

interface ClientServicesProps {
  services: string[];
}

export const ClientServices: React.FC<ClientServicesProps> = ({ services }) => {
  return (
    <div className="bg-white border border-[#161514]/10 p-5 mb-8">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#161514]/10">
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-[#C5A880]" />
          <h3 className="font-serif text-base font-medium text-[#161514]">
            Associated Services ({services.length})
          </h3>
        </div>
        <Link
          href="/vendor/dashboard/services"
          className="text-xs text-[#C5A880] hover:underline flex items-center gap-1 font-medium"
        >
          <span>Services Catalogue</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {services.length === 0 ? (
        <p className="text-xs text-[#5A5650] italic">
          No services associated with this client profile.
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {services.map((srv, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 bg-[#FAF8F5] border border-[#161514]/15 text-xs text-[#161514] font-medium"
            >
              {srv}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
