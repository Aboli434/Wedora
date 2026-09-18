"use client";

import React from "react";
import { CheckCircle, Info, AlertCircle, X } from "lucide-react";

export interface SaveFeedbackState {
  message: string;
  type?: "success" | "notice" | "warning" | "error";
  id?: number;
}

interface VendorSettingsSaveFeedbackProps {
  feedback: SaveFeedbackState | null;
  onDismiss: () => void;
}

export const VendorSettingsSaveFeedback: React.FC<
  VendorSettingsSaveFeedbackProps
> = ({ feedback, onDismiss }) => {
  if (!feedback) return null;

  const type = feedback.type || "success";

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 max-w-md animate-in slide-in-from-bottom-5 duration-200"
    >
      <div
        className={`p-4 rounded-sm border shadow-xl flex items-start gap-3 text-xs ${
          type === "success"
            ? "bg-[#161514] text-[#FAF8F5] border-[#161514]"
            : type === "warning"
            ? "bg-amber-900 text-amber-50 border-amber-800"
            : type === "error"
            ? "bg-red-950 text-red-50 border-red-900"
            : "bg-[#FAF8F5] text-[#161514] border-[#161514]/20"
        }`}
      >
        {type === "success" && <CheckCircle className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />}
        {type === "notice" && <Info className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />}
        {(type === "warning" || type === "error") && <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />}

        <div className="flex-1 pr-2">
          <div className="font-semibold">{feedback.message}</div>
          <div className="text-[11px] opacity-80 mt-0.5 font-sans">
            Demo only — changes will reset after page refresh.
          </div>
        </div>

        <button
          type="button"
          onClick={onDismiss}
          className="opacity-70 hover:opacity-100 transition-opacity p-0.5"
          aria-label="Dismiss Notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
