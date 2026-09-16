"use client";

import React from "react";
import { Check } from "lucide-react";
import { UserRole } from "@/data/auth";

interface RoleSelectorProps {
  selectedRole: UserRole | null;
  onSelectRole: (role: UserRole) => void;
  error?: string;
}

export function RoleSelector({
  selectedRole,
  onSelectRole,
  error,
}: RoleSelectorProps) {
  const roles: {
    id: UserRole;
    title: string;
    subtitle: string;
    description: string;
  }[] = [
    {
      id: "CLIENT",
      title: "Plan your wedding",
      subtitle: "FOR COUPLES & FAMILIES",
      description:
        "Bring your celebration, people, budget, and details together in one place.",
    },
    {
      id: "VENDOR",
      title: "Grow your wedding business",
      subtitle: "FOR WEDDING PROFESSIONALS",
      description:
        "Showcase your work, manage enquiries, and connect with couples planning their celebration.",
    },
  ];

  return (
    <div className="space-y-4">
      <span className="block text-xs font-semibold tracking-wider uppercase text-[#161514]">
        Choose your role <span className="text-[#C5A880]">*</span>
      </span>

      <div className="grid grid-cols-1 gap-4" role="radiogroup" aria-label="Registration role selection">
        {roles.map((role) => {
          const isSelected = selectedRole === role.id;
          return (
            <button
              key={role.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelectRole(role.id)}
              className={`w-full text-left p-6 transition-all border ${
                isSelected
                  ? "bg-[#F3EFEA] border-[#C5A880] ring-1 ring-[#C5A880]"
                  : "bg-[#FAF8F5] border-[#161514]/15 hover:border-[#161514]/40"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#C5A880] block">
                    {role.subtitle}
                  </span>
                  <h4 className="font-serif text-xl font-light text-[#161514]">
                    {role.title}
                  </h4>
                  <p className="font-sans text-xs text-[#5A5650] font-light leading-relaxed pt-1">
                    {role.description}
                  </p>
                </div>

                <div
                  className={`w-5 h-5 flex-shrink-0 border flex items-center justify-center transition-colors mt-1 ${
                    isSelected
                      ? "border-[#C5A880] bg-[#C5A880] text-[#161514]"
                      : "border-[#161514]/30 bg-transparent"
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {error && (
        <p className="text-xs text-red-700 font-sans mt-1">{error}</p>
      )}
    </div>
  );
}
