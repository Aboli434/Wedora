"use client";

import React from "react";
import { CheckCircle2, Info, AlertTriangle } from "lucide-react";

interface SettingsSaveFeedbackProps {
  type: "success" | "info" | "warning";
  message: string;
}

export function SettingsSaveFeedback({
  type,
  message,
}: SettingsSaveFeedbackProps) {
  if (type === "success") {
    return (
      <div className="p-3 bg-[#2D4A3E]/10 border border-[#2D4A3E]/30 text-[#2D4A3E] text-xs font-sans flex items-center gap-2">
        <CheckCircle2 className="w-4 h-4 text-[#2D4A3E]" />
        <span>{message}</span>
      </div>
    );
  }

  if (type === "warning") {
    return (
      <div className="p-3 bg-[#8C6D3B]/10 border border-[#8C6D3B]/30 text-[#8C6D3B] text-xs font-sans flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-[#8C6D3B]" />
        <span>{message}</span>
      </div>
    );
  }

  return (
    <div className="p-3 bg-[#161514]/5 border border-[#161514]/15 text-[#5A5650] text-xs font-sans flex items-center gap-2">
      <Info className="w-4 h-4 text-[#C5A880]" />
      <span>{message}</span>
    </div>
  );
}
