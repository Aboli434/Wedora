"use client";

import React, { useState } from "react";
import { MessageSquare, Edit, Send } from "lucide-react";

interface ReviewResponseComposerProps {
  existingResponse?: string;
  onSubmitResponse: (responseText: string) => void;
}

export const ReviewResponseComposer: React.FC<ReviewResponseComposerProps> = ({
  existingResponse,
  onSubmitResponse,
}) => {
  const [isEditing, setIsEditing] = useState(!existingResponse);
  const [responseText, setResponseText] = useState(existingResponse || "");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!responseText.trim()) {
      setError("Response text cannot be empty.");
      return;
    }
    setError(null);
    onSubmitResponse(responseText.trim());
    setIsEditing(false);
  };

  return (
    <div className="space-y-3 pt-4 border-t border-[#161514]/10 font-sans">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[#161514]">
          <MessageSquare className="w-4 h-4 text-[#C5A880]" />
          <h4 className="font-serif text-base font-medium">
            Vendor Public Response
          </h4>
        </div>

        {existingResponse && !isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="text-xs text-[#5A5650] hover:text-[#161514] font-medium flex items-center gap-1"
          >
            <Edit className="w-3.5 h-3.5" />
            Edit Official Response
          </button>
        )}
      </div>

      {/* Existing Published Response */}
      {!isEditing && existingResponse && (
        <div className="p-4 bg-white border border-[#161514]/10 rounded-sm space-y-2">
          <p className="text-xs text-[#161514] leading-relaxed">
            {existingResponse}
          </p>
          <span className="text-[10px] text-[#5A5650] block font-mono">
            PUBLISHED VENDOR RESPONSE
          </span>
        </div>
      )}

      {/* Editing / Creating Form */}
      {isEditing && (
        <form onSubmit={handleSubmit} className="space-y-3">
          {error && (
            <p className="text-xs text-rose-700 bg-rose-50 p-2 rounded-xs">
              {error}
            </p>
          )}

          <textarea
            rows={4}
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
            placeholder="Write a warm, professional response acknowledging the couple's feedback..."
            className="w-full p-3 bg-white border border-[#161514]/20 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880] rounded-sm font-sans"
          />

          <div className="p-2.5 bg-[#FAF8F5] border border-[#161514]/10 rounded-sm text-[11px] text-[#5A5650]">
            <strong>Demo Notice:</strong> Demo only — this response has not been published to a real review platform or external channel.
          </div>

          <div className="flex items-center justify-end gap-2">
            {existingResponse && (
              <button
                type="button"
                onClick={() => {
                  setResponseText(existingResponse);
                  setIsEditing(false);
                }}
                className="px-3.5 py-1.5 bg-white border border-[#161514]/20 text-xs text-[#161514] rounded-sm"
              >
                Cancel
              </button>
            )}

            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#161514] text-[#FAF8F5] text-xs font-medium uppercase tracking-wider rounded-sm hover:bg-[#2c2927] transition-colors"
            >
              <Send className="w-3.5 h-3.5 text-[#C5A880]" />
              Save Response
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
