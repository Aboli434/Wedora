"use client";

import React, { useState } from "react";
import { Plus, X, CheckCircle2 } from "lucide-react";

interface ServiceInclusionsProps {
  inclusions: string[];
  onChange: (updated: string[]) => void;
}

export function ServiceInclusions({ inclusions, onChange }: ServiceInclusionsProps) {
  const [newInput, setNewInput] = useState("");

  const handleAdd = () => {
    const trimmed = newInput.trim();
    if (!trimmed) return;
    onChange([...inclusions, trimmed]);
    setNewInput("");
  };

  const handleRemove = (index: number) => {
    onChange(inclusions.filter((_, i) => i !== index));
  };

  const handleUpdate = (index: number, val: string) => {
    const updated = [...inclusions];
    updated[index] = val;
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-[#E8E2D9] pb-2">
        <label className="text-xs uppercase tracking-wider text-[#2C2A29] font-medium">
          Package Inclusions ({inclusions.length})
        </label>
        <span className="text-[11px] font-mono text-[#8C857B]">Key features included in price</span>
      </div>

      {inclusions.length === 0 ? (
        <p className="text-xs text-[#8C857B] italic">No inclusions added yet. Add at least one item.</p>
      ) : (
        <div className="space-y-2">
          {inclusions.map((inc, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0" />
              <input
                type="text"
                value={inc}
                onChange={(e) => handleUpdate(index, e.target.value)}
                className="flex-1 bg-white border border-[#DCD5C9] rounded px-3 py-1.5 text-xs text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="p-1.5 text-[#8C857B] hover:text-rose-700 focus:outline-none"
                title="Remove inclusion"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add Inclusion Form */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newInput}
          onChange={(e) => setNewInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAdd();
            }
          }}
          placeholder="Add new inclusion (e.g., 2 Senior Photographers)..."
          className="flex-1 bg-white border border-[#DCD5C9] rounded-md px-3 py-2 text-xs text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1 px-3.5 py-2 text-xs font-medium uppercase tracking-wider text-white bg-[#2C2A29] rounded-md hover:bg-[#1A1918]"
        >
          <Plus className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>Add</span>
        </button>
      </div>
    </div>
  );
}
