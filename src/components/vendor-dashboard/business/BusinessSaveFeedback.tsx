"use client";

import React from "react";
import { CheckCircle2, Info, AlertTriangle } from "lucide-react";

interface BusinessSaveFeedbackProps {
  type?: "success" | "info" | "warning";
  message: string;
}

export function BusinessSaveFeedback({ type = "info", message }: BusinessSaveFeedbackProps) {
  const styles = {
    success: "bg-emerald-50/90 border-emerald-200 text-emerald-950",
    info: "bg-[#F2ECE4] border-[#E5DEC9] text-[#594B3C]",
    warning: "bg-amber-50/90 border-amber-200 text-amber-950",
  };

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />,
    info: <Info className="w-4 h-4 text-[#C5A880] shrink-0" />,
    warning: <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />,
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex items-center gap-2.5 px-4 py-3 rounded-lg border text-xs font-medium transition-all ${styles[type]}`}
    >
      {icons[type]}
      <span>{message}</span>
    </div>
  );
}
