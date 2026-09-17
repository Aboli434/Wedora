"use client";

import React, { useState, useEffect } from "react";
import { SettingsSaveFeedback } from "./SettingsSaveFeedback";

export function DangerZone() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isConfirmedCheckbox, setIsConfirmedCheckbox] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [signoutFeedback, setSignoutFeedback] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isDeleteModalOpen) {
        setIsDeleteModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDeleteModalOpen]);

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsConfirmedCheckbox(false);
    setFeedback(null);
  };

  const handleDeleteConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConfirmedCheckbox) return;

    setFeedback("Account deletion is not connected in this demo.");
  };

  const handleSignoutClick = () => {
    setSignoutFeedback("Sign out is not connected in this demo.");
    setTimeout(() => setSignoutFeedback(null), 4000);
  };

  return (
    <section id="danger-zone" className="bg-[#FAF8F5] border border-rose-200/80 rounded-xl p-6 md:p-8 space-y-6">
      <div className="border-b border-rose-200/60 pb-5">
        <h2 className="font-serif text-2xl text-rose-950">Account actions</h2>
        <p className="text-sm text-[#6E6B65] mt-1">
          Perform high-impact actions for your client workspace session.
        </p>
      </div>

      {signoutFeedback && (
        <SettingsSaveFeedback type="info" message={signoutFeedback} />
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-white border border-rose-200/50">
        <div>
          <p className="text-sm font-medium text-[#2C2A29]">Sign Out</p>
          <p className="text-xs text-[#6E6B65] mt-0.5">Safely end your active planning session on this browser.</p>
        </div>
        <button
          type="button"
          onClick={handleSignoutClick}
          className="px-4 py-2 text-xs font-medium uppercase tracking-wider text-[#2C2A29] border border-[#2C2A29]/20 rounded-md hover:bg-[#F2ECE4] transition-colors self-start sm:self-auto"
        >
          Sign Out
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-rose-50/50 border border-rose-200/60">
        <div>
          <p className="text-sm font-medium text-rose-950">Delete Account</p>
          <p className="text-xs text-rose-700/80 mt-0.5">
            Permanently erase all wedding data, vendor messages, and guest lists.
          </p>
        </div>
        <button
          type="button"
          onClick={handleOpenDeleteModal}
          className="px-4 py-2 text-xs font-medium uppercase tracking-wider text-rose-900 bg-rose-100 border border-rose-300 rounded-md hover:bg-rose-200 transition-colors self-start sm:self-auto"
        >
          Delete Account
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div
            className="bg-[#FAF8F5] border border-rose-200 rounded-xl max-w-md w-full p-6 md:p-8 space-y-6 shadow-2xl relative"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-modal-title"
          >
            <div className="flex items-center justify-between border-b border-[#E8E2D9] pb-4">
              <h3 id="delete-modal-title" className="font-serif text-xl text-rose-950">
                Delete your Wedora account?
              </h3>
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="text-[#8C857B] hover:text-[#2C2A29] text-xl font-light leading-none"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            <p className="text-xs text-[#6E6B65]">
              This is a demo action. No account will actually be deleted.
            </p>

            {feedback && (
              <SettingsSaveFeedback type="warning" message={feedback} />
            )}

            <form onSubmit={handleDeleteConfirm} className="space-y-6">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-rose-100/50 border border-rose-200">
                <input
                  id="confirm-delete-check"
                  type="checkbox"
                  checked={isConfirmedCheckbox}
                  onChange={(e) => setIsConfirmedCheckbox(e.target.checked)}
                  className="mt-0.5 rounded border-rose-300 text-rose-900 focus:ring-rose-500"
                />
                <label htmlFor="confirm-delete-check" className="text-xs text-rose-950 font-medium cursor-pointer">
                  I understand this is irreversible.
                </label>
              </div>

              <div className="pt-2 border-t border-[#E8E2D9] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium uppercase tracking-wider text-[#6E6B65] hover:text-[#2C2A29]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!isConfirmedCheckbox}
                  className={`px-5 py-2 text-xs font-medium uppercase tracking-wider text-white rounded-md transition-colors ${
                    isConfirmedCheckbox
                      ? "bg-rose-900 hover:bg-rose-950 shadow-sm cursor-pointer"
                      : "bg-rose-300 cursor-not-allowed opacity-70"
                  }`}
                >
                  Confirm Deletion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
