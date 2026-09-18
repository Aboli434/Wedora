"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { VendorBusinessProfile } from "@/data/vendorBusiness";
import { Camera } from "lucide-react";

interface BusinessMediaProps {
  profile: VendorBusinessProfile;
}

export function BusinessMedia({ profile }: BusinessMediaProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetType, setTargetType] = useState<"profile" | "cover">("profile");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  const handleOpenModal = (type: "profile" | "cover") => {
    setTargetType(type);
    setIsModalOpen(true);
  };

  return (
    <section id="media" className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl p-6 md:p-8 space-y-6">
      <div className="border-b border-[#E8E2D9] pb-5">
        <h2 className="font-serif text-2xl text-[#2C2A29]">Studio imagery</h2>
        <p className="text-xs text-[#6E6B65] mt-1">
          Profile avatar and hero cover image featured on your public directory listing.
        </p>
      </div>

      <div className="space-y-6">
        {/* Cover Image Preview */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs uppercase tracking-wider text-[#8C857B] font-medium">
              Hero Cover Image
            </label>
            <button
              type="button"
              onClick={() => handleOpenModal("cover")}
              className="text-xs font-medium text-[#2C2A29] hover:text-[#C5A880] transition-colors"
            >
              Replace Cover
            </button>
          </div>
          <div className="relative h-44 sm:h-52 w-full rounded-lg overflow-hidden border border-[#E8E2D9] bg-[#F2ECE4]">
            <Image
              src={profile.coverImage}
              alt={`${profile.businessName} cover photo`}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Profile Avatar Image Preview */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs uppercase tracking-wider text-[#8C857B] font-medium">
              Studio Avatar Photo
            </label>
            <button
              type="button"
              onClick={() => handleOpenModal("profile")}
              className="text-xs font-medium text-[#2C2A29] hover:text-[#C5A880] transition-colors"
            >
              Replace Avatar
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#C5A880]/50 bg-[#F2ECE4] shrink-0 shadow-sm">
              <Image
                src={profile.profileImage}
                alt={`${profile.businessName} profile picture`}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-xs font-medium text-[#2C2A29]">{profile.businessName} Logo / Avatar</p>
              <p className="text-[11px] text-[#6E6B65] mt-0.5">Recommended 400x400 square format.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Informational Media Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div
            className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl max-w-md w-full p-6 space-y-5 shadow-2xl relative"
            role="dialog"
            aria-modal="true"
            aria-labelledby="media-modal-title"
          >
            <div className="flex items-center justify-between border-b border-[#E8E2D9] pb-3">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-[#C5A880]" />
                <h3 id="media-modal-title" className="font-serif text-lg text-[#2C2A29]">
                  {targetType === "cover" ? "Replace Cover Image" : "Replace Profile Avatar"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-[#8C857B] hover:text-[#2C2A29] text-lg font-light leading-none"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            <p className="text-xs text-[#5A5650] leading-relaxed">
              Image uploads will be connected when the vendor media service is added.
            </p>

            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900">
              This is a frontend demo environment. Actual media management will be enabled in Phase 3.
            </div>

            <div className="pt-2 border-t border-[#E8E2D9] flex justify-end">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-xs font-medium uppercase tracking-wider text-white bg-[#2C2A29] rounded-md hover:bg-[#1A1918]"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
