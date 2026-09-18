"use client";

import React from "react";
import { VendorService } from "@/data/vendorServices";
import { ServiceListItem } from "./ServiceListItem";

interface ServiceListProps {
  services: VendorService[];
  onEdit: (service: VendorService) => void;
  onDuplicate: (service: VendorService) => void;
  onToggleVisibility: (service: VendorService) => void;
  onDelete: (serviceId: string) => void;
}

export function ServiceList({
  services,
  onEdit,
  onDuplicate,
  onToggleVisibility,
  onDelete,
}: ServiceListProps) {
  if (services.length === 0) {
    return (
      <div className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl p-8 text-center space-y-2">
        <p className="font-serif text-lg text-[#2C2A29]">No services match your active filters.</p>
        <p className="text-xs text-[#8C857B]">Try adjusting your search query or reset category &amp; pricing filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Desktop Table Layout */}
      <div className="hidden md:block bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E8E2D9] bg-[#F2ECE4]/60 text-[10px] font-sans tracking-[0.2em] uppercase text-[#8C857B]">
              <th className="py-3 px-4 font-semibold">SERVICE &amp; DESCRIPTION</th>
              <th className="py-3 px-4 font-semibold">CATEGORY</th>
              <th className="py-3 px-4 font-semibold">PRICING</th>
              <th className="py-3 px-4 font-semibold">AVAILABILITY</th>
              <th className="py-3 px-4 font-semibold">VISIBILITY</th>
              <th className="py-3 px-4 font-semibold">STATUS</th>
              <th className="py-3 px-4 font-semibold text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8E2D9]">
            {services.map((service) => (
              <ServiceListItem
                key={service.id}
                service={service}
                onEdit={onEdit}
                onDuplicate={onDuplicate}
                onToggleVisibility={onToggleVisibility}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Card Layout */}
      <div className="md:hidden space-y-4">
        {services.map((service) => (
          <ServiceListItem
            key={service.id}
            service={service}
            onEdit={onEdit}
            onDuplicate={onDuplicate}
            onToggleVisibility={onToggleVisibility}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
