"use client";

import React from "react";
import { Users, UserPlus } from "lucide-react";

interface ClientsEmptyStateProps {
  onAddClient?: () => void;
}

export const ClientsEmptyState: React.FC<ClientsEmptyStateProps> = ({
  onAddClient,
}) => {
  return (
    <div className="py-20 px-6 border border-dashed border-[#161514]/20 text-center bg-[#FAF8F5] my-8 max-w-2xl mx-auto">
      <Users className="w-10 h-10 text-[#C5A880] mx-auto mb-4 stroke-1" />
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C5A880] block mb-2">
        CLIENT DIRECTORY
      </span>
      <h2 className="font-serif text-2xl md:text-3xl text-[#161514] font-medium mb-3">
        Your client relationships will appear here.
      </h2>
      <p className="text-xs md:text-sm text-[#5A5650] max-w-md mx-auto mb-6 leading-relaxed">
        Keep every relationship, conversation, and next step connected to the work you are creating together. Create your first client account to get started.
      </p>
      {onAddClient && (
        <button
          onClick={onAddClient}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#161514] text-[#FAF8F5] text-xs uppercase tracking-wider font-medium hover:bg-[#161514]/90 transition-colors"
        >
          <UserPlus className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>Add Client</span>
        </button>
      )}
    </div>
  );
};
