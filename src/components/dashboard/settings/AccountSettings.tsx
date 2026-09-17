"use client";

import React, { useState, useEffect } from "react";
import { SettingsSaveFeedback } from "./SettingsSaveFeedback";

interface AccountSettingsProps {
  email: string;
}

export function AccountSettings({ email }: AccountSettingsProps) {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [modalNotice, setModalNotice] = useState<string | null>(null);
  const [signoutNotice, setSignoutNotice] = useState<string | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isPasswordModalOpen) {
        setIsPasswordModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPasswordModalOpen]);

  const handleOpenPasswordModal = () => {
    setIsPasswordModalOpen(true);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setErrors({});
    setModalNotice(null);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!currentPassword) {
      newErrors.currentPassword = "Current password is required.";
    }

    if (!newPassword || newPassword.length < 6) {
      newErrors.newPassword = "New password must be at least 6 characters.";
    }

    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setModalNotice("Password changes are not connected in this demo.");
    setErrors({});
    // Reset input fields immediately so zero password state is retained
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleSignoutClick = () => {
    setSignoutNotice("Sign out is disabled in this demo environment.");
    setTimeout(() => setSignoutNotice(null), 4000);
  };

  return (
    <section id="account" className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl p-6 md:p-8 space-y-6">
      <div className="border-b border-[#E8E2D9] pb-5">
        <h2 className="font-serif text-2xl text-[#2C2A29]">Account &amp; security</h2>
        <p className="text-sm text-[#6E6B65] mt-1">
          Manage your account credentials, security preferences, and active sessions.
        </p>
      </div>

      {signoutNotice && (
        <SettingsSaveFeedback type="info" message={signoutNotice} />
      )}

      <div className="space-y-6">
        {/* Account Email */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-white border border-[#E8E2D9]">
          <div>
            <label className="text-xs uppercase tracking-wider text-[#8C857B] font-medium block">
              Account Email
            </label>
            <p className="text-sm font-medium text-[#2C2A29] mt-0.5">{email}</p>
          </div>
          <span className="text-xs text-[#8C857B] italic">Primary sign-in address</span>
        </div>

        {/* Password */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-white border border-[#E8E2D9]">
          <div>
            <label className="text-xs uppercase tracking-wider text-[#8C857B] font-medium block">
              Password
            </label>
            <p className="text-sm font-medium text-[#2C2A29] mt-0.5">••••••••••••</p>
            <p className="text-xs text-[#8C857B] mt-0.5">Last changed: Demo account</p>
          </div>
          <button
            type="button"
            onClick={handleOpenPasswordModal}
            className="px-4 py-2 text-xs font-medium uppercase tracking-wider text-[#2C2A29] border border-[#2C2A29]/20 rounded-md hover:bg-[#F2ECE4] transition-colors self-start sm:self-auto"
          >
            Change Password
          </button>
        </div>

        {/* Login Sessions */}
        <div className="p-4 rounded-lg bg-white border border-[#E8E2D9] space-y-3">
          <label className="text-xs uppercase tracking-wider text-[#8C857B] font-medium block">
            Active Login Sessions
          </label>
          <div className="flex items-center justify-between gap-4 pt-1">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
              <div>
                <p className="text-sm font-medium text-[#2C2A29]">This browser</p>
                <p className="text-xs text-[#6E6B65]">Current active session</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleSignoutClick}
              className="px-3 py-1.5 text-xs font-medium text-[#6E6B65] border border-[#DCD5C9] rounded hover:text-[#2C2A29] hover:bg-[#F7F4EF] transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div
            className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl max-w-md w-full p-6 md:p-8 space-y-6 shadow-2xl relative"
            role="dialog"
            aria-modal="true"
            aria-labelledby="password-modal-title"
          >
            <div className="flex items-center justify-between border-b border-[#E8E2D9] pb-4">
              <h3 id="password-modal-title" className="font-serif text-xl text-[#2C2A29]">
                Change Password
              </h3>
              <button
                type="button"
                onClick={() => setIsPasswordModalOpen(false)}
                className="text-[#8C857B] hover:text-[#2C2A29] text-xl font-light leading-none"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            {modalNotice && (
              <SettingsSaveFeedback type="info" message={modalNotice} />
            )}

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="text-xs uppercase tracking-wider text-[#2C2A29] font-medium block mb-1">
                  Current Password
                </label>
                <input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full bg-white border border-[#DCD5C9] rounded-lg px-3.5 py-2 text-sm text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
                  placeholder="Enter current password"
                />
                {errors.currentPassword && (
                  <p className="text-xs text-rose-700 mt-1">{errors.currentPassword}</p>
                )}
              </div>

              <div>
                <label htmlFor="newPassword" className="text-xs uppercase tracking-wider text-[#2C2A29] font-medium block mb-1">
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-white border border-[#DCD5C9] rounded-lg px-3.5 py-2 text-sm text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
                  placeholder="Enter new password"
                />
                {errors.newPassword && (
                  <p className="text-xs text-rose-700 mt-1">{errors.newPassword}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="text-xs uppercase tracking-wider text-[#2C2A29] font-medium block mb-1">
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-white border border-[#DCD5C9] rounded-lg px-3.5 py-2 text-sm text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
                  placeholder="Confirm new password"
                />
                {errors.confirmPassword && (
                  <p className="text-xs text-rose-700 mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              <div className="pt-4 border-t border-[#E8E2D9] flex items-center justify-between">
                <p className="text-xs text-[#8C857B] italic">
                  Demo modal — credentials are never stored.
                </p>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsPasswordModalOpen(false)}
                    className="px-4 py-2 text-xs font-medium uppercase tracking-wider text-[#6E6B65] hover:text-[#2C2A29]"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-medium uppercase tracking-wider text-white bg-[#2C2A29] rounded-md hover:bg-[#1A1918]"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
