"use client";

import React, { useState } from "react";
import { AlertTriangle, ShieldAlert, X, UserX, Trash2 } from "lucide-react";

interface VendorDangerZoneProps {
  onShowFeedback: (msg: string) => void;
}

export const VendorDangerZone: React.FC<VendorDangerZoneProps> = ({
  onShowFeedback,
}) => {
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [deleteConfirmationText, setDeleteConfirmationText] = useState("");

  const handleConfirmDeactivate = () => {
    setShowDeactivateModal(false);
    onShowFeedback("Demo only — no account action was performed.");
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmationText.trim().toUpperCase() !== "DELETE") return;
    setShowDeleteModal(false);
    setDeleteConfirmationText("");
    onShowFeedback("Demo only — no account action was performed.");
  };

  return (
    <div id="danger" className="bg-red-50/40 border border-red-200/60 rounded-sm p-6 space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-red-200/60">
        <div className="flex items-center gap-2 text-red-700">
          <AlertTriangle className="w-4 h-4 text-red-600" />
          <h3 className="font-serif text-xl font-medium">
            Account Danger Zone
          </h3>
        </div>
        <p className="text-xs text-[#5A5650] mt-1 font-sans">
          Permanent actions affecting studio directory listing, team permissions, and studio dataset.
        </p>
      </div>

      {/* Action List */}
      <div className="space-y-4">
        {/* Deactivate Profile */}
        <div className="p-4 bg-white border border-red-200/60 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-[#161514] block">
              Deactivate Studio Profile
            </span>
            <span className="text-xs text-[#5A5650] font-sans block mt-0.5">
              Temporarily unpublish profile from directory and hide lead intake forms.
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowDeactivateModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-red-300 text-red-700 text-xs font-medium uppercase tracking-wider hover:bg-red-50 transition-colors rounded-sm shrink-0"
          >
            <UserX className="w-3.5 h-3.5" />
            Deactivate Profile
          </button>
        </div>

        {/* Delete Account */}
        <div className="p-4 bg-white border border-red-200/60 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-red-700 block">
              Delete Studio Account Permanently
            </span>
            <span className="text-xs text-[#5A5650] font-sans block mt-0.5">
              Permanently purge portfolio images, client contacts, booking history, and reviews.
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-700 text-white text-xs font-medium uppercase tracking-wider hover:bg-red-800 transition-colors rounded-sm shrink-0 shadow-xs"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete Account
          </button>
        </div>
      </div>

      {/* Explanatory notice */}
      <div className="text-[11px] text-[#5A5650] bg-white p-3 rounded-sm border border-red-200/60 flex items-center gap-2">
        <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
        <span>
          Account lifecycle actions will require backend authentication and confirmation in production builds.
        </span>
      </div>

      {/* Deactivate Modal */}
      {showDeactivateModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="deactivate-dialog-title"
          className="fixed inset-0 z-50 bg-[#161514]/60 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white border border-[#161514]/20 rounded-sm w-full max-w-md p-6 space-y-4 shadow-xl animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#161514]/10">
              <h3 id="deactivate-dialog-title" className="font-serif text-xl font-medium text-[#161514] flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                Deactivate The Frame House?
              </h3>
              <button
                type="button"
                onClick={() => setShowDeactivateModal(false)}
                className="text-[#5A5650] hover:text-[#161514]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#5A5650] leading-relaxed font-sans">
              Deactivating your studio profile will unlist your package rates, hide your portfolio from search, and prevent new couples from sending enquiries. Active bookings will remain untouched.
            </p>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-sm text-xs text-amber-900 font-medium">
              Demo warning: This action is simulated and will perform no real data removal.
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowDeactivateModal(false)}
                className="px-4 py-2 border border-[#161514]/20 text-[#5A5650] text-xs font-medium uppercase rounded-sm hover:bg-[#161514]/5"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDeactivate}
                className="px-4 py-2 bg-amber-600 text-white text-xs font-medium uppercase tracking-wider rounded-sm hover:bg-amber-700"
              >
                Confirm Deactivation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal with Type DELETE */}
      {showDeleteModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-dialog-title"
          className="fixed inset-0 z-50 bg-[#161514]/60 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white border border-[#161514]/20 rounded-sm w-full max-w-md p-6 space-y-4 shadow-xl animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#161514]/10">
              <h3 id="delete-dialog-title" className="font-serif text-xl font-medium text-red-700 flex items-center gap-2">
                <Trash2 className="w-5 h-5 text-red-600" />
                Delete Studio Account
              </h3>
              <button
                type="button"
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmationText("");
                }}
                className="text-[#5A5650] hover:text-[#161514]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#5A5650] leading-relaxed font-sans">
              This action is permanent and cannot be undone. All photo galleries, client notes, active bookings, and reviews associated with <strong className="text-[#161514]">The Frame House</strong> will be removed.
            </p>

            <div className="space-y-1.5">
              <label htmlFor="confirmDeleteInput" className="block text-xs font-medium text-[#161514]">
                To confirm, type <span className="font-mono font-bold text-red-700">DELETE</span> below:
              </label>
              <input
                id="confirmDeleteInput"
                type="text"
                value={deleteConfirmationText}
                onChange={(e) => setDeleteConfirmationText(e.target.value)}
                placeholder="Type DELETE"
                className="w-full px-3 py-2 text-sm border border-red-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-red-600 font-mono"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmationText("");
                }}
                className="px-4 py-2 border border-[#161514]/20 text-[#5A5650] text-xs font-medium uppercase rounded-sm hover:bg-[#161514]/5"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleteConfirmationText.trim().toUpperCase() !== "DELETE"}
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-700 text-white text-xs font-medium uppercase tracking-wider rounded-sm hover:bg-red-800 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Permanently Delete Studio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
