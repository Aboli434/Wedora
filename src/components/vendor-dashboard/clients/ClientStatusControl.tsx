"use client";

import React, { useState } from "react";
import { ClientRelationshipStatus } from "@/data/vendorClients";
import { formatClientStatus } from "@/lib/vendorClients";

interface ClientStatusControlProps {
  currentStatus: ClientRelationshipStatus;
  onChangeStatus: (newStatus: ClientRelationshipStatus) => void;
}

export const ClientStatusControl: React.FC<ClientStatusControlProps> = ({
  currentStatus,
  onChangeStatus,
}) => {
  const [showConfirm, setShowConfirm] = useState<ClientRelationshipStatus | null>(null);

  const allStatuses: ClientRelationshipStatus[] = [
    "LEAD",
    "ACTIVE",
    "UPCOMING",
    "COMPLETED",
    "INACTIVE",
  ];

  const handleSelect = (target: ClientRelationshipStatus) => {
    if (target === currentStatus) return;

    if (target === "INACTIVE") {
      setShowConfirm(target);
    } else {
      onChangeStatus(target);
    }
  };

  return (
    <div className="bg-white border border-[#161514]/10 p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#5A5650]">
          RELATIONSHIP STAGE
        </span>
        <span className="text-xs font-serif italic text-[#161514]">
          Current: <strong>{formatClientStatus(currentStatus)}</strong>
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {allStatuses.map((status) => {
          const isCurrent = status === currentStatus;

          return (
            <button
              key={status}
              onClick={() => handleSelect(status)}
              className={`px-3 py-1.5 text-xs font-medium transition-all ${
                isCurrent
                  ? "bg-[#161514] text-[#FAF8F5] border border-[#161514]"
                  : "bg-[#FAF8F5] text-[#161514] border border-[#161514]/20 hover:border-[#161514] hover:bg-white"
              }`}
            >
              {formatClientStatus(status)}
              {isCurrent && " ✓"}
            </button>
          );
        })}
      </div>

      {/* Confirmation Dialog for INACTIVE */}
      {showConfirm && (
        <div className="mt-4 p-3 bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-center justify-between gap-3">
          <div>
            <strong>Mark relationship as INACTIVE?</strong> This will categorize the client under inactive archives.
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                onChangeStatus(showConfirm);
                setShowConfirm(null);
              }}
              className="px-2.5 py-1 bg-rose-800 text-white text-[11px] font-semibold uppercase tracking-wider"
            >
              Confirm
            </button>
            <button
              onClick={() => setShowConfirm(null)}
              className="px-2.5 py-1 border border-[#161514]/20 text-[#161514] text-[11px] font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
