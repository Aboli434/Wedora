"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";

export function useAuth() {
  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);
  const initialize = useAuthStore((s) => s.initialize);
  const refetchUser = useAuthStore((s) => s.refetchUser);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const dashboardHref =
    user?.role === "ADMIN"
      ? "/admin/dashboard"
      : user?.role === "VENDOR"
      ? "/vendor/dashboard"
      : "/dashboard";

  return {
    user,
    loading,
    error: null,
    isAuthenticated: !!user,
    isClient: user?.role === "CLIENT",
    isVendor: user?.role === "VENDOR",
    isAdmin: user?.role === "ADMIN",
    dashboardHref,
    refetchUser,
    logout,
  };
}

