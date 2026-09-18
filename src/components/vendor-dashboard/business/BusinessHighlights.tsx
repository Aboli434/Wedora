"use client";

import React, { useState } from "react";
import { X, Plus, Sparkles } from "lucide-react";

interface BusinessHighlightsProps {
  highlights: string[];
  onChange: (updated: string[]) => void;
}

const SUGGESTED_HIGHLIGHTS = [
  "Documentary storytelling",
  "Intimate celebrations",
  "Candid photography",
  "Destination weddings",
  "Thoughtful visual direction",
  "Natural light portraits",
  "Editorial color grading",
];

export function BusinessHighlights({ highlights, onChange }: BusinessHighlightsProps) {
  const [newHighlight, setNewHighlight] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleAddHighlight = (text: string) => {
    setError(null);
    const trimmed = text.trim();
    if (!trimmed) return;

    if (highlights.length >= 5) {
      setError("Maximum 5 studio highlights allowed.");
      return;
    }

    if (highlights.some((h) => h.toLowerCase() === trimmed.toLowerCase())) {
      setError("This highlight is already added.");
      return;
    }

    onChange([...highlights, trimmed]);
    setNewHighlight("");
  };

  const handleRemoveHighlight = (item: string) => {
    setError(null);
    onChange(highlights.filter((h) => h !== item));
  };

  return (
    <section id="highlights" className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl p-6 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8E2D9] pb-5">
        <div>
          <h2 className="font-serif text-2xl text-[#2C2A29]">What defines your studio</h2>
          <p className="text-xs text-[#6E6B65] mt-1">
            Highlight up to 5 core creative pillars or signature traits couples should know about.
          </p>
        </div>
        <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C857B] bg-[#F2ECE4] px-2.5 py-1 rounded border border-[#E5DEC9] self-start sm:self-auto">
          {highlights.length} / 5 Highlights
        </span>
      </div>

      <div className="space-y-6">
        {/* Highlight Chips */}
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2.5">
            {highlights.map((h) => (
              <span
                key={h}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white border border-[#DCD5C9] text-xs font-medium text-[#2C2A29] shadow-2xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{h}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveHighlight(h)}
                  className="text-[#8C857B] hover:text-rose-700 focus:outline-none ml-1"
                  aria-label={`Remove highlight: ${h}`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
          {error && <p className="text-xs text-rose-700 font-medium">{error}</p>}
        </div>

        {/* Suggestions */}
        {highlights.length < 5 && (
          <div className="space-y-2 pt-2 border-t border-[#E8E2D9]">
            <span className="text-[11px] text-[#8C857B] font-medium block">
              Suggested creative pillars:
            </span>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_HIGHLIGHTS.filter(
                (s) => !highlights.some((h) => h.toLowerCase() === s.toLowerCase())
              ).map((sugg) => (
                <button
                  type="button"
                  key={sugg}
                  onClick={() => handleAddHighlight(sugg)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#F2ECE4] hover:bg-[#EAE4DB] border border-[#E5DEC9] text-xs text-[#594B3C] transition-colors"
                >
                  <Plus className="w-3 h-3 text-[#C5A880]" />
                  <span>{sugg}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Form */}
        {highlights.length < 5 && (
          <div className="flex gap-2 max-w-md">
            <input
              type="text"
              value={newHighlight}
              onChange={(e) => setNewHighlight(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddHighlight(newHighlight);
                }
              }}
              placeholder="Add custom highlight..."
              className="flex-1 bg-white border border-[#DCD5C9] rounded-lg px-3.5 py-2 text-sm text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
            />
            <button
              type="button"
              onClick={() => handleAddHighlight(newHighlight)}
              className="px-4 py-2 text-xs font-medium uppercase tracking-wider text-white bg-[#2C2A29] rounded-md hover:bg-[#1A1918]"
            >
              Add
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
