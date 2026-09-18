"use client";

import React from "react";
import { VendorClient } from "@/data/vendorClients";
import { formatClientStatus } from "@/lib/vendorClients";
import { AlertCircle, Clock, ArrowRight, CheckCircle2 } from "lucide-react";

interface ClientsNeedsAttentionProps {
  clientsNeedingAttention: VendorClient[];
  onSelectClient: (client: VendorClient) => void;
}

export const ClientsNeedsAttention: React.FC<ClientsNeedsAttentionProps> = ({
  clientsNeedingAttention,
  onSelectClient,
}) => {
  const count = clientsNeedingAttention.length;

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#161514]/10">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-[#C5A880]" />
          <h2 className="font-serif text-lg font-medium text-[#161514]">
            Relationship Follow-up Items
          </h2>
        </div>
        <span className="text-xs uppercase tracking-widest text-[#5A5650]">
          {count > 0 ? `${count} ACTIONABLE` : "ALL CAUGHT UP"}
        </span>
      </div>

      {count === 0 ? (
        <div className="p-8 border border-dashed border-[#161514]/15 text-center bg-[#FAF8F5]/50">
          <CheckCircle2 className="w-8 h-8 text-[#C5A880] mx-auto mb-2 opacity-80" />
          <h3 className="font-serif text-base text-[#161514] font-medium mb-1">
            You&apos;re all caught up.
          </h3>
          <p className="text-xs text-[#5A5650]">
            No pending relationship follow-ups, date holds, or high-priority client actions.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clientsNeedingAttention.map((client) => {
            const isHighPriority = client.priority === "HIGH";
            const isFlexibleDate = client.weddingDateStatus === "FLEXIBLE";
            const isLead = client.relationshipStatus === "LEAD";
            const hasNextAction = !!client.nextAction;

            let urgencyLabel = "Follow-up Required";
            let urgencyBg = "bg-[#161514]/5 text-[#161514]";

            if (isHighPriority) {
              urgencyLabel = "High Priority Account";
              urgencyBg = "bg-[#C5A880]/15 text-[#161514] border border-[#C5A880]/30";
            } else if (isFlexibleDate) {
              urgencyLabel = "Dates Flexible / Pending";
              urgencyBg = "bg-blue-50 text-blue-800 border border-blue-200";
            } else if (isLead) {
              urgencyLabel = "New Lead Discovery";
              urgencyBg = "bg-amber-50 text-amber-800 border border-amber-200";
            } else if (hasNextAction) {
              urgencyLabel = "Milestone Action Due";
              urgencyBg = "bg-[#161514] text-[#FAF8F5]";
            }

            return (
              <div
                key={client.id}
                onClick={() => onSelectClient(client)}
                className="group relative p-5 bg-[#FAF8F5] border border-[#161514]/10 hover:border-[#161514]/30 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 gap-2">
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 ${urgencyBg}`}
                    >
                      {urgencyLabel}
                    </span>
                    <span className="text-[11px] font-medium text-[#5A5650] uppercase tracking-wider">
                      {formatClientStatus(client.relationshipStatus)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-[#161514] text-[#FAF8F5] flex items-center justify-center font-serif text-xs font-medium shrink-0">
                      {client.avatarInitials}
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-medium text-[#161514] group-hover:text-[#C5A880] transition-colors leading-tight">
                        {client.coupleName}
                        {client.partnerName ? ` & ${client.partnerName}` : ""}
                      </h3>
                      <p className="text-[11px] text-[#5A5650]">{client.destination}</p>
                    </div>
                  </div>

                  {client.nextAction && (
                    <p className="text-xs text-[#161514] font-medium mb-3 line-clamp-2 bg-white p-2 border border-[#161514]/10">
                      Next: {client.nextAction}
                    </p>
                  )}

                  <div className="flex items-center gap-2 text-xs text-[#5A5650]/80">
                    <Clock className="w-3.5 h-3.5 text-[#5A5650]/60 shrink-0" />
                    <span>
                      {client.weddingDate
                        ? new Date(client.weddingDate).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "Flexible Dates"}
                    </span>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-[#161514]/10 flex items-center justify-between text-xs font-medium text-[#161514] group-hover:translate-x-0.5 transition-transform">
                  <span>Open Client Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
