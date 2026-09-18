"use client";

import React, { useState } from "react";
import { VendorSecurityInfo } from "@/data/vendorSettings";
import { Lock, ShieldAlert, KeyRound, Smartphone, Laptop, AlertCircle, X } from "lucide-react";

interface VendorSecuritySettingsProps {
  security: VendorSecurityInfo;
  onUpdate: (updatedSecurity: VendorSecurityInfo) => void;
  onShowFeedback: (msg: string) => void;
}

export const VendorSecuritySettings: React.FC<VendorSecuritySettingsProps> = ({
  security,
  onUpdate,
  onShowFeedback,
}) => {
  // Modal states
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);

  // Form states for password change modal
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [passError, setPassError] = useState("");

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPass) {
      setPassError("Please enter your current password.");
      return;
    }
    if (!newPass || newPass.length < 8) {
      setPassError("New password must be at least 8 characters long.");
      return;
    }
    if (newPass !== confirmPass) {
      setPassError("New password and confirm password do not match.");
      return;
    }

    setPassError("");
    setShowPasswordModal(false);
    setCurrentPass("");
    setNewPass("");
    setConfirmPass("");
    onShowFeedback("Demo only — password changes are not connected.");
  };

  const handleToggleLoginAlerts = () => {
    onUpdate({
      ...security,
      loginAlertsEnabled: !security.loginAlertsEnabled,
    });
  };

  const handleRevokeSession = (sessionId: string) => {
    const updatedSessions = security.activeSessions.filter((s) => s.id !== sessionId);
    onUpdate({
      ...security,
      activeSessions: updatedSessions,
    });
    onShowFeedback("Demo session revoked for this view.");
  };

  return (
    <div id="security" className="bg-white border border-[#161514]/10 rounded-sm p-6 space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-[#161514]/10">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-[#C5A880]" />
          <h3 className="font-serif text-xl font-medium text-[#161514]">
            Account Security & Active Sessions
          </h3>
        </div>
        <p className="text-xs text-[#5A5650] mt-1 font-sans">
          Manage authentication credentials, two-factor verification, and active login sessions.
        </p>
      </div>

      {/* Password & Authentication Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Password Card */}
        <div className="p-4 bg-[#FAF8F5] border border-[#161514]/10 rounded-sm space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#161514] flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-[#C5A880]" />
                Studio Account Password
              </span>
              <span className="text-[10px] text-[#5A5650] bg-white border px-2 py-0.5 rounded-sm">
                Encrypted
              </span>
            </div>
            <p className="text-xs text-[#5A5650]">
              Last changed: <strong className="text-[#161514]">{security.passwordLastChangedAt}</strong>
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowPasswordModal(true)}
            className="w-full mt-3 px-4 py-2 bg-[#161514] text-[#FAF8F5] text-xs font-medium uppercase tracking-wider hover:bg-[#2c2927] transition-colors rounded-sm text-center"
          >
            Change Password
          </button>
        </div>

        {/* 2FA Card */}
        <div className="p-4 bg-[#FAF8F5] border border-[#161514]/10 rounded-sm space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#161514] flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-[#C5A880]" />
                Two-Factor Authentication (2FA)
              </span>
              <span
                className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-sm border ${
                  security.twoFactorEnabled
                    ? "bg-green-100 text-green-800 border-green-200"
                    : "bg-amber-100 text-amber-800 border-amber-200"
                }`}
              >
                {security.twoFactorEnabled ? "Enabled" : "Disabled"}
              </span>
            </div>
            <p className="text-xs text-[#5A5650]">
              Add an extra layer of security to your studio workspace using authenticator apps.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShow2FAModal(true)}
            className="w-full mt-3 px-4 py-2 border border-[#161514]/20 bg-white text-[#161514] text-xs font-medium uppercase tracking-wider hover:bg-[#161514]/5 transition-colors rounded-sm text-center"
          >
            Set Up 2FA
          </button>
        </div>
      </div>

      {/* Login Alert Toggle */}
      <div className="pt-2">
        <div
          onClick={handleToggleLoginAlerts}
          className="flex items-start justify-between p-3.5 bg-white hover:bg-[#FAF8F5] border border-[#161514]/10 rounded-sm cursor-pointer transition-colors"
        >
          <div>
            <span className="text-xs font-medium text-[#161514] block">
              Unrecognized Device Login Alerts
            </span>
            <span className="text-[11px] text-[#5A5650] block mt-0.5 font-sans">
              Receive security emails whenever a login attempt occurs from an unknown location.
            </span>
          </div>

          <div
            className={`w-9 h-5 rounded-full transition-colors p-0.5 shrink-0 ${
              security.loginAlertsEnabled ? "bg-[#161514]" : "bg-[#161514]/20"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-[#FAF8F5] transition-transform ${
                security.loginAlertsEnabled ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </div>
        </div>
      </div>

      {/* Active Sessions List */}
      <div className="pt-4 border-t border-[#161514]/10 space-y-3">
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#161514]">
          Active Studio Logins ({security.activeSessions.length})
        </label>

        <div className="space-y-2">
          {security.activeSessions.map((session) => {
            const isMobile = session.device.toLowerCase().includes("iphone") || session.device.toLowerCase().includes("android");
            return (
              <div
                key={session.id}
                className="p-3 bg-[#FAF8F5] border border-[#161514]/10 rounded-sm flex items-center justify-between gap-4 text-xs"
              >
                <div className="flex items-center gap-3">
                  {isMobile ? (
                    <Smartphone className="w-4 h-4 text-[#C5A880] shrink-0" />
                  ) : (
                    <Laptop className="w-4 h-4 text-[#C5A880] shrink-0" />
                  )}
                  <div>
                    <div className="font-medium text-[#161514] flex items-center gap-2">
                      {session.device}
                      {session.isCurrent && (
                        <span className="text-[9px] font-semibold uppercase px-1.5 py-0.5 bg-[#161514] text-[#FAF8F5] rounded-xs">
                          Current Device
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-[#5A5650] mt-0.5">
                      {session.location} • {session.lastActive}
                    </div>
                  </div>
                </div>

                {!session.isCurrent && (
                  <button
                    type="button"
                    onClick={() => handleRevokeSession(session.id)}
                    className="text-[11px] font-medium text-red-600 hover:text-red-800 underline uppercase tracking-wider"
                  >
                    Revoke Access
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="change-password-title"
          className="fixed inset-0 z-50 bg-[#161514]/60 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white border border-[#161514]/20 rounded-sm w-full max-w-md p-6 space-y-5 shadow-xl animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#161514]/10">
              <h3 id="change-password-title" className="font-serif text-xl font-medium text-[#161514]">
                Change Account Password
              </h3>
              <button
                type="button"
                onClick={() => setShowPasswordModal(false)}
                className="text-[#5A5650] hover:text-[#161514]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#161514] mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPass}
                  onChange={(e) => setCurrentPass(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3 py-2 text-sm border border-[#161514]/20 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#161514]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#161514] mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full px-3 py-2 text-sm border border-[#161514]/20 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#161514]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#161514] mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  placeholder="Repeat new password"
                  className="w-full px-3 py-2 text-sm border border-[#161514]/20 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#161514]"
                />
              </div>

              {passError && (
                <div className="text-xs text-red-600 bg-red-50 p-2.5 rounded-sm border border-red-200 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {passError}
                </div>
              )}

              <div className="text-[11px] text-[#5A5650] bg-[#FAF8F5] p-2.5 rounded-sm border">
                Demo notice: No real credentials are updated or persisted.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 border border-[#161514]/20 text-[#5A5650] text-xs font-medium uppercase rounded-sm hover:bg-[#161514]/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#161514] text-[#FAF8F5] text-xs font-medium uppercase tracking-wider rounded-sm hover:bg-[#2c2927]"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2FA Demo Modal */}
      {show2FAModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="setup-2fa-title"
          className="fixed inset-0 z-50 bg-[#161514]/60 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white border border-[#161514]/20 rounded-sm w-full max-w-md p-6 space-y-5 shadow-xl animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#161514]/10">
              <h3 id="setup-2fa-title" className="font-serif text-xl font-medium text-[#161514]">
                Two-Factor Authentication (2FA)
              </h3>
              <button
                type="button"
                onClick={() => setShow2FAModal(false)}
                className="text-[#5A5650] hover:text-[#161514]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#5A5650]">
              <div className="p-4 bg-[#C5A880]/10 border border-[#C5A880]/30 rounded-sm text-[#161514]">
                <span className="font-semibold block mb-1">Backend Infrastructure Notice</span>
                Authentication infrastructure will be connected in a future backend phase.
              </div>

              <p>
                When enabled, logging into The Frame House studio account will require an authenticator code (Google Authenticator, Authy, or 1Password).
              </p>
            </div>

            <div className="flex items-center justify-end pt-2">
              <button
                type="button"
                onClick={() => setShow2FAModal(false)}
                className="px-5 py-2 bg-[#161514] text-[#FAF8F5] text-xs font-medium uppercase tracking-wider rounded-sm hover:bg-[#2c2927]"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
