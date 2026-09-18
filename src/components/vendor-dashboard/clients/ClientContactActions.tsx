"use client";

import React, { useState } from "react";
import { VendorClient } from "@/data/vendorClients";
import { Mail, Phone, MessageSquare, Sparkles } from "lucide-react";

interface ClientContactActionsProps {
  client: VendorClient;
}

export const ClientContactActions: React.FC<ClientContactActionsProps> = ({
  client,
}) => {
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleAction = (type: string) => {
    setFeedback(`Demo action: ${type} outreach triggered for ${client.coupleName}. Real messaging connects in Phase 10+.`);
    setTimeout(() => setFeedback(null), 4000);
  };

  return (
    <div className="bg-[#FAF8F5] border border-[#161514]/15 p-5 mb-8">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#161514]/10">
        <h3 className="font-serif text-base font-medium text-[#161514]">
          Quick Communication Actions
        </h3>
        <span className="text-[10px] uppercase tracking-wider text-[#5A5650]">
          DIRECT OUTREACH
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
        <button
          onClick={() => handleAction("Email")}
          className="inline-flex items-center justify-center gap-2 p-3 bg-white border border-[#161514]/20 text-xs font-medium text-[#161514] hover:bg-[#161514]/5 transition-colors"
        >
          <Mail className="w-4 h-4 text-[#C5A880]" />
          <span>Email Couple</span>
        </button>

        <button
          onClick={() => handleAction("Phone")}
          className="inline-flex items-center justify-center gap-2 p-3 bg-white border border-[#161514]/20 text-xs font-medium text-[#161514] hover:bg-[#161514]/5 transition-colors"
        >
          <Phone className="w-4 h-4 text-[#C5A880]" />
          <span>Call Phone</span>
        </button>

        <button
          onClick={() => handleAction("WhatsApp")}
          className="inline-flex items-center justify-center gap-2 p-3 bg-white border border-[#161514]/20 text-xs font-medium text-[#161514] hover:bg-[#161514]/5 transition-colors"
        >
          <MessageSquare className="w-4 h-4 text-[#C5A880]" />
          <span>WhatsApp Chat</span>
        </button>
      </div>

      {feedback && (
        <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-[#C5A880] shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      <div className="flex items-center gap-1.5 text-[11px] text-[#5A5650]">
        <Sparkles className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
        <span>Demo action — communication will be connected when messaging integrations are implemented.</span>
      </div>
    </div>
  );
};
