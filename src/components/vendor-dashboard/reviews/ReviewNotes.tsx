"use client";

import React, { useState } from "react";
import { Lock, Edit2, Trash2, ShieldAlert } from "lucide-react";

interface ReviewNotesProps {
  reviewId: string;
  notes?: string;
  onSaveNotes: (reviewId: string, content: string) => void;
  onDeleteNotes: (reviewId: string) => void;
}

export const ReviewNotes: React.FC<ReviewNotesProps> = ({
  reviewId,
  notes,
  onSaveNotes,
  onDeleteNotes,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [noteContent, setNoteContent] = useState(notes || "");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleSave = () => {
    if (noteContent.trim()) {
      onSaveNotes(reviewId, noteContent.trim());
      setIsEditing(false);
    }
  };

  return (
    <div className="space-y-3 pt-4 border-t border-[#161514]/10 font-sans">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-[#C5A880]" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#5A5650]">
            Private Vendor Note
          </span>
        </div>

        {notes && !isEditing && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="p-1 text-[#5A5650] hover:text-[#161514] transition-colors text-xs flex items-center gap-1"
            >
              <Edit2 className="w-3 h-3" />
              Edit
            </button>
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              className="p-1 text-rose-700 hover:text-rose-900 transition-colors text-xs flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" />
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Viewing Mode */}
      {!isEditing && notes && (
        <div className="p-3 bg-white border border-[#161514]/10 rounded-sm">
          <p className="text-xs text-[#161514] leading-relaxed italic">
            &quot;{notes}&quot;
          </p>
          <span className="text-[10px] text-[#5A5650] block mt-2 font-mono">
            INTERNAL VENDOR NOTE ONLY
          </span>
        </div>
      )}

      {/* Editing / Adding Mode */}
      {(isEditing || !notes) && !confirmDelete && (
        <div className="space-y-2">
          <textarea
            rows={3}
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            placeholder="Add internal vendor note (e.g. follow-up call agreement, studio discussion)..."
            className="w-full p-2.5 bg-white border border-[#161514]/20 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880] rounded-sm font-sans"
          />
          <div className="flex items-center gap-2 justify-end">
            {notes && (
              <button
                type="button"
                onClick={() => {
                  setNoteContent(notes);
                  setIsEditing(false);
                }}
                className="px-3 py-1 bg-white border border-[#161514]/20 text-xs text-[#161514] rounded-sm"
              >
                Cancel
              </button>
            )}
            <button
              type="button"
              onClick={handleSave}
              className="px-3 py-1 bg-[#161514] text-[#FAF8F5] text-xs font-medium uppercase tracking-wider rounded-sm hover:bg-[#2c2927]"
            >
              Save Note
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Box */}
      {confirmDelete && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-sm text-xs space-y-2">
          <div className="flex items-center gap-1 text-rose-900 font-semibold font-sans">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-700" />
            Delete this private vendor note?
          </div>
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => {
                onDeleteNotes(reviewId);
                setNoteContent("");
                setConfirmDelete(false);
                setIsEditing(false);
              }}
              className="px-3 py-1 bg-rose-800 text-white text-[11px] font-medium rounded-xs hover:bg-rose-900"
            >
              Confirm Delete
            </button>
            <button
              type="button"
              onClick={() => setConfirmDelete(false)}
              className="px-3 py-1 bg-white border border-rose-200 text-xs text-[#161514] rounded-xs"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
