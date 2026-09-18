"use client";

import React, { useState } from "react";
import { Lock, Plus, Edit2, Trash2, Check, X } from "lucide-react";

interface ClientNotesProps {
  notes?: string;
  onSaveNotes: (notes: string) => void;
  onDeleteNotes: () => void;
}

export const ClientNotes: React.FC<ClientNotesProps> = ({
  notes = "",
  onSaveNotes,
  onDeleteNotes,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(notes);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleSave = () => {
    onSaveNotes(text);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDeleteNotes();
    setText("");
    setShowConfirmDelete(false);
    setIsEditing(false);
  };

  return (
    <div className="bg-white border border-[#161514]/10 p-5 mb-8">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Lock className="w-3.5 h-3.5 text-[#C5A880]" />
          <h3 className="font-serif text-base font-medium text-[#161514]">
            Private Vendor Notes
          </h3>
        </div>
        <span className="text-[10px] uppercase tracking-wider text-[#5A5650] bg-[#FAF8F5] px-2 py-0.5 border border-[#161514]/10">
          Internal Relationship Notes
        </span>
      </div>

      {!isEditing ? (
        <div>
          {notes ? (
            <div className="p-3 bg-[#FAF8F5] border border-[#161514]/10 text-xs text-[#161514] leading-relaxed mb-3 whitespace-pre-wrap">
              {notes}
            </div>
          ) : (
            <p className="text-xs text-[#5A5650] italic mb-3">
              No private notes added yet. Use notes to log client preferences, crew requirements, or family contacts.
            </p>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setText(notes);
                setIsEditing(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs border border-[#161514]/20 font-medium hover:bg-[#FAF8F5] transition-colors text-[#161514]"
            >
              {notes ? (
                <>
                  <Edit2 className="w-3 h-3 text-[#5A5650]" />
                  <span>Edit Note</span>
                </>
              ) : (
                <>
                  <Plus className="w-3 h-3 text-[#C5A880]" />
                  <span>Add Note</span>
                </>
              )}
            </button>

            {notes && (
              <button
                onClick={() => setShowConfirmDelete(true)}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs text-rose-700 hover:text-rose-900 transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                <span>Delete</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <textarea
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add private internal vendor notes..."
            className="w-full p-3 bg-white border border-[#161514]/20 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
          />

          <div className="flex items-center gap-2 justify-end">
            <button
              onClick={() => {
                setIsEditing(false);
                setText(notes);
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs border border-[#161514]/20 text-[#161514]"
            >
              <X className="w-3 h-3" />
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs bg-[#161514] text-[#FAF8F5] font-medium"
            >
              <Check className="w-3 h-3 text-[#C5A880]" />
              Save Note
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      {showConfirmDelete && (
        <div className="mt-3 p-3 bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-center justify-between gap-3">
          <span>Are you sure you want to delete this private note?</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDelete}
              className="px-2.5 py-1 bg-rose-800 text-white font-semibold text-[10px] uppercase"
            >
              Delete
            </button>
            <button
              onClick={() => setShowConfirmDelete(false)}
              className="px-2.5 py-1 border border-rose-300 text-rose-900 text-[10px]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
