"use client";

import React, { useState } from "react";
import { VendorAvailabilityBlock } from "@/data/vendorCalendar";
import { X, Ban } from "lucide-react";

interface AvailabilityBlockEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveBlock: (block: Omit<VendorAvailabilityBlock, "id" | "createdAt">) => void;
}

export const AvailabilityBlockEditor: React.FC<AvailabilityBlockEditorProps> = ({
  isOpen,
  onClose,
  onSaveBlock,
}) => {
  const [title, setTitle] = useState("Personal / Family Vacation");
  const [startDate, setStartDate] = useState("2026-10-20");
  const [endDate, setEndDate] = useState("2026-10-28");
  const [reason, setReason] = useState("Personal / Unavailable");
  const [notes, setNotes] = useState("No new shoot commitments during holiday week.");
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      setError("Start and end dates are required.");
      return;
    }
    if (new Date(endDate).getTime() < new Date(startDate).getTime()) {
      setError("End date cannot precede start date.");
      return;
    }

    setError(null);
    onSaveBlock({
      title,
      startDate,
      endDate,
      reason,
      notes,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#161514]/60 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-[#FAF8F5] border border-[#161514]/20 max-w-md w-full p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#161514]/10">
          <div>
            <span className="text-[10px] font-semibold tracking-[0.2em] text-rose-700 uppercase">
              AVAILABILITY BLOCK
            </span>
            <h3 className="font-serif text-2xl font-medium text-[#161514]">
              Block Date Period
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#161514] hover:bg-[#161514]/10 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label htmlFor="availability-block-title" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
              Block Label / Title *
            </label>
            <input
              id="availability-block-title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Annual Family Vacation"
              className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="availability-start-date" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                Start Date *
              </label>
              <input
                id="availability-start-date"
                type="date"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
            </div>
            <div>
              <label htmlFor="availability-end-date" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                End Date *
              </label>
              <input
                id="availability-end-date"
                type="date"
                required
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="availability-reason" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
              Reason / Category
            </label>
            <select
              id="availability-reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
            >
              <option value="Personal / Unavailable">Personal / Unavailable</option>
              <option value="Travel">Travel & Transit</option>
              <option value="Studio Closure">Studio Maintenance / Closure</option>
              <option value="Another Shoot Hold">External Assignment Hold</option>
            </select>
          </div>

          <div>
            <label htmlFor="availability-notes" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
              Internal Notes
            </label>
            <textarea
              id="availability-notes"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Internal reminders..."
              className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#161514]/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#161514]/20 text-[#161514]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2 bg-rose-900 text-white font-medium uppercase tracking-wider hover:bg-rose-950 transition-colors"
            >
              <Ban className="w-3.5 h-3.5" />
              Save Block Period
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
