"use client";

import React, { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Building2,
  Users,
  Heart,
  Search,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Sparkles,
  ArrowRight,
  RefreshCw,
  LogOut,
  SlidersHorizontal,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface AdminStats {
  totalUsers: number;
  totalVendors: number;
  totalClients: number;
  verifiedVendors: number;
  pendingVendors: number;
  totalWeddings: number;
}

interface AdminVendor {
  id: string;
  userId: string;
  businessName: string;
  slug: string;
  category: string;
  city: string;
  rating: number;
  reviewCount: number;
  startingPrice: string;
  verified: boolean;
  featured: boolean;
  createdAt: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone?: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [vendors, setVendors] = useState<AdminVendor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "verified">("all");
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [, startTransition] = useTransition();

  const loadData = async () => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const authHeaders: Record<string, string> = {};
      if (session?.access_token) {
        authHeaders["Authorization"] = `Bearer ${session.access_token}`;
      }

      const [statsRes, vendorsRes] = await Promise.all([
        fetch("/api/v1/admin/stats", { headers: authHeaders }),
        fetch("/api/v1/admin/vendors", { headers: authHeaders }),
      ]);

      if (statsRes.status === 401 || statsRes.status === 403) {
        console.warn("Admin stats authorization response:", statsRes.status);
        setFeedbackMessage({
          type: "error",
          text: "Authorization check: please verify your admin session.",
        });
      } else if (statsRes.ok) {
        const statsJson = await statsRes.json();
        if (statsJson.success) setStats(statsJson.data);
      }

      if (vendorsRes.ok) {
        const vendorsJson = await vendorsRes.json();
        if (vendorsJson.success) setVendors(vendorsJson.data);
      }
    } catch (err) {
      console.error("Failed to load admin data:", err);
      setFeedbackMessage({ type: "error", text: "Failed to load admin data." });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleToggleVerification = async (vendorId: string, currentStatus: boolean) => {
    setActionLoadingId(vendorId);
    setFeedbackMessage(null);

    try {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const authHeaders: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (session?.access_token) {
        authHeaders["Authorization"] = `Bearer ${session.access_token}`;
      }

      const res = await fetch("/api/v1/admin/vendors", {
        method: "PATCH",
        headers: authHeaders,
        body: JSON.stringify({
          vendorId,
          verified: !currentStatus,
        }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        // Optimistic / Local update
        setVendors((prev) =>
          prev.map((v) => (v.id === vendorId ? { ...v, verified: !currentStatus } : v))
        );
        if (stats) {
          setStats({
            ...stats,
            verifiedVendors: !currentStatus ? stats.verifiedVendors + 1 : stats.verifiedVendors - 1,
            pendingVendors: !currentStatus ? stats.pendingVendors - 1 : stats.pendingVendors + 1,
          });
        }
        setFeedbackMessage({
          type: "success",
          text: !currentStatus
            ? "Vendor verified and approved successfully."
            : "Vendor verification revoked (verification turned OFF).",
        });
      } else {
        setFeedbackMessage({ type: "error", text: json.message || "Failed to update vendor status." });
      }
    } catch {
      setFeedbackMessage({ type: "error", text: "Network error while updating status." });
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleToggleFeatured = async (vendorId: string, currentStatus: boolean) => {
    setActionLoadingId(vendorId);
    setFeedbackMessage(null);

    try {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const authHeaders: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (session?.access_token) {
        authHeaders["Authorization"] = `Bearer ${session.access_token}`;
      }

      const res = await fetch("/api/v1/admin/vendors", {
        method: "PATCH",
        headers: authHeaders,
        body: JSON.stringify({
          vendorId,
          featured: !currentStatus,
        }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setVendors((prev) =>
          prev.map((v) => (v.id === vendorId ? { ...v, featured: !currentStatus } : v))
        );
        setFeedbackMessage({
          type: "success",
          text: !currentStatus ? "Vendor is now featured on the directory." : "Vendor removed from featured list.",
        });
      } else {
        setFeedbackMessage({ type: "error", text: json.message || "Failed to update featured status." });
      }
    } catch {
      setFeedbackMessage({ type: "error", text: "Network error while updating status." });
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleRejectVendor = async (vendorId: string, businessName: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to reject and remove "${businessName}"? This vendor profile will be permanently deleted from the platform.`
    );
    if (!confirmed) return;

    setActionLoadingId(vendorId);
    setFeedbackMessage(null);

    try {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const authHeaders: Record<string, string> = {};
      if (session?.access_token) {
        authHeaders["Authorization"] = `Bearer ${session.access_token}`;
      }

      const res = await fetch(`/api/v1/admin/vendors?vendorId=${vendorId}`, {
        method: "DELETE",
        headers: authHeaders,
      });

      const json = await res.json();
      if (res.ok && json.success) {
        const removed = vendors.find((v) => v.id === vendorId);
        setVendors((prev) => prev.filter((v) => v.id !== vendorId));
        if (stats && removed) {
          setStats({
            ...stats,
            totalVendors: Math.max(0, stats.totalVendors - 1),
            verifiedVendors: removed.verified
              ? Math.max(0, stats.verifiedVendors - 1)
              : stats.verifiedVendors,
            pendingVendors: !removed.verified
              ? Math.max(0, stats.pendingVendors - 1)
              : stats.pendingVendors,
          });
        }
        setFeedbackMessage({
          type: "success",
          text: `Vendor "${businessName}" has been rejected and removed from the platform.`,
        });
      } else {
        setFeedbackMessage({
          type: "error",
          text: json.message || "Failed to reject vendor.",
        });
      }
    } catch {
      setFeedbackMessage({
        type: "error",
        text: "Network error while rejecting vendor.",
      });
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    startTransition(() => {
      router.push("/login");
    });
  };

  // Filter vendors
  const filteredVendors = vendors.filter((v) => {
    const matchesSearch =
      v.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.ownerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.ownerName.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (statusFilter === "pending") return !v.verified;
    if (statusFilter === "verified") return v.verified;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#161514] font-sans">
      {/* Top Admin Bar */}
      <header className="border-b border-[#161514]/10 bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-[#161514] text-[#C5A880] flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl tracking-tight font-medium text-[#161514]">
                  Wedora
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] px-2 py-0.5 bg-[#C5A880]/20 text-[#161514] border border-[#C5A880]/40 rounded-xs">
                  Admin Command Center
                </span>
              </div>
              <p className="text-xs text-[#5A5650]">Platform Superuser Oversight & Verification</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="px-3.5 py-2 bg-[#F3EFEA] hover:bg-[#EBE5DE] text-[#161514] text-xs font-semibold tracking-wider uppercase border border-[#161514]/15 rounded-xs transition-colors inline-flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#5A5650]" />
              <span>Live Website</span>
            </Link>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2 bg-[#161514] hover:bg-red-700 text-[#FAF8F5] text-xs font-semibold tracking-wider uppercase rounded-xs transition-colors inline-flex items-center gap-1.5 shadow-xs"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 sm:px-10 py-8 space-y-8">
        {/* Feedback Alert */}
        {feedbackMessage && (
          <div
            className={`p-4 rounded-xs border text-xs flex items-center justify-between ${
              feedbackMessage.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            <span>{feedbackMessage.text}</span>
            <button
              onClick={() => setFeedbackMessage(null)}
              className="underline uppercase font-bold text-[10px] ml-4 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Level 1: Metric Cards */}
        <section aria-label="Platform Statistics">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white p-5 sm:p-6 border border-[#161514]/10 rounded-xs shadow-xs space-y-2">
              <div className="flex items-center justify-between text-[#5A5650]">
                <span className="text-xs font-semibold tracking-wider uppercase">Total Platform Users</span>
                <Users className="w-4 h-4 text-[#C5A880]" />
              </div>
              <p className="font-serif text-3xl font-light text-[#161514]">
                {isLoading ? "..." : stats?.totalUsers ?? 0}
              </p>
              <p className="text-[11px] text-[#5A5650]">
                Clients: {stats?.totalClients ?? 0} • Vendors: {stats?.totalVendors ?? 0}
              </p>
            </div>

            <div className="bg-white p-5 sm:p-6 border border-[#161514]/10 rounded-xs shadow-xs space-y-2">
              <div className="flex items-center justify-between text-[#5A5650]">
                <span className="text-xs font-semibold tracking-wider uppercase">Registered Weddings</span>
                <Heart className="w-4 h-4 text-[#C5A880]" />
              </div>
              <p className="font-serif text-3xl font-light text-[#161514]">
                {isLoading ? "..." : stats?.totalWeddings ?? 0}
              </p>
              <p className="text-[11px] text-[#5A5650]">Active couple planning files</p>
            </div>

            <div className="bg-white p-5 sm:p-6 border border-[#161514]/10 rounded-xs shadow-xs space-y-2">
              <div className="flex items-center justify-between text-[#5A5650]">
                <span className="text-xs font-semibold tracking-wider uppercase">Verified Vendors</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="font-serif text-3xl font-light text-[#161514]">
                {isLoading ? "..." : stats?.verifiedVendors ?? 0}
              </p>
              <p className="text-[11px] text-emerald-700 font-medium">Publicly recommended</p>
            </div>

            <div
              className={`p-5 sm:p-6 border rounded-xs shadow-xs space-y-2 ${
                (stats?.pendingVendors ?? 0) > 0
                  ? "bg-amber-50/60 border-amber-300/80 text-amber-900"
                  : "bg-white border-[#161514]/10 text-[#161514]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-wider uppercase">Pending Verification</span>
                <ShieldCheck className="w-4 h-4 text-amber-600" />
              </div>
              <p className="font-serif text-3xl font-light">
                {isLoading ? "..." : stats?.pendingVendors ?? 0}
              </p>
              <p className="text-[11px]">Requires admin approval / review</p>
            </div>
          </div>
        </section>

        {/* Level 2: Vendor Verification Console */}
        <section className="bg-white border border-[#161514]/10 rounded-xs shadow-xs overflow-hidden">
          {/* Header & Controls */}
          <div className="p-6 border-b border-[#161514]/10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#C5A880] block mb-1">
                  VENDOR MANAGEMENT & VERIFICATION
                </span>
                <h2 className="font-serif text-2xl font-normal text-[#161514]">
                  Vendor Directory & Approval Console
                </h2>
                <p className="text-xs text-[#5A5650] mt-0.5">
                  Verify or revoke vendor business credentials to control public directory trust badges.
                </p>
              </div>

              <button
                onClick={loadData}
                disabled={isLoading}
                className="self-start sm:self-auto inline-flex items-center gap-2 px-3.5 py-2 bg-[#F3EFEA] hover:bg-[#EBE5DE] text-[#161514] text-xs font-semibold tracking-wider uppercase rounded-xs transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
                <span>Refresh</span>
              </button>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-[#5A5650] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search business name, city, owner, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[#FAF8F5] border border-[#161514]/15 rounded-xs text-xs text-[#161514] placeholder-[#5A5650]/60 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880]"
                />
              </div>

              {/* Status Tabs */}
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#5A5650] mr-1 hidden sm:block" />
                <button
                  onClick={() => setStatusFilter("all")}
                  className={`px-3 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-xs transition-colors ${
                    statusFilter === "all"
                      ? "bg-[#161514] text-[#FAF8F5]"
                      : "bg-[#F3EFEA] text-[#5A5650] hover:text-[#161514]"
                  }`}
                >
                  All ({vendors.length})
                </button>
                <button
                  onClick={() => setStatusFilter("pending")}
                  className={`px-3 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-xs transition-colors ${
                    statusFilter === "pending"
                      ? "bg-amber-600 text-white"
                      : "bg-[#F3EFEA] text-[#5A5650] hover:text-[#161514]"
                  }`}
                >
                  Pending ({vendors.filter((v) => !v.verified).length})
                </button>
                <button
                  onClick={() => setStatusFilter("verified")}
                  className={`px-3 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-xs transition-colors ${
                    statusFilter === "verified"
                      ? "bg-emerald-700 text-white"
                      : "bg-[#F3EFEA] text-[#5A5650] hover:text-[#161514]"
                  }`}
                >
                  Verified ({vendors.filter((v) => v.verified).length})
                </button>
              </div>
            </div>
          </div>

          {/* Vendors Table */}
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="p-12 text-center text-xs text-[#5A5650]">Loading vendor data...</div>
            ) : filteredVendors.length === 0 ? (
              <div className="p-12 text-center space-y-2">
                <Building2 className="w-8 h-8 text-[#C5A880] mx-auto opacity-70" />
                <p className="font-serif text-lg text-[#161514]">No vendors found</p>
                <p className="text-xs text-[#5A5650]">Try adjusting your search query or filter.</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#FAF8F5] border-b border-[#161514]/10 text-[#5A5650] uppercase tracking-wider text-[10px]">
                    <th className="py-3.5 px-6 font-semibold">Vendor / Business</th>
                    <th className="py-3.5 px-4 font-semibold">Owner & Contact</th>
                    <th className="py-3.5 px-4 font-semibold">Category & City</th>
                    <th className="py-3.5 px-4 font-semibold">Verification Status</th>
                    <th className="py-3.5 px-4 font-semibold">Featured</th>
                    <th className="py-3.5 px-6 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#161514]/5">
                  {filteredVendors.map((vendor) => {
                    const isOperating = actionLoadingId === vendor.id;
                    return (
                      <tr key={vendor.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                        {/* Business Name */}
                        <td className="py-4 px-6">
                          <div className="space-y-0.5">
                            <span className="font-serif text-sm font-medium text-[#161514] block">
                              {vendor.businessName}
                            </span>
                            <span className="text-[11px] text-[#5A5650] font-mono">
                              /{vendor.slug}
                            </span>
                          </div>
                        </td>

                        {/* Owner Contact */}
                        <td className="py-4 px-4">
                          <div className="space-y-0.5">
                            <span className="font-medium text-[#161514] block">
                              {vendor.ownerName}
                            </span>
                            <span className="text-[11px] text-[#5A5650] block">
                              {vendor.ownerEmail}
                            </span>
                            {vendor.ownerPhone && (
                              <span className="text-[10px] text-[#5A5650]/80 block font-mono">
                                {vendor.ownerPhone}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Category & City */}
                        <td className="py-4 px-4">
                          <div className="space-y-0.5">
                            <span className="inline-block px-2 py-0.5 bg-[#FAF8F5] border border-[#161514]/15 rounded-xs text-[10px] uppercase font-semibold text-[#161514]">
                              {vendor.category}
                            </span>
                            <span className="text-[11px] text-[#5A5650] block mt-1">
                              {vendor.city}
                            </span>
                          </div>
                        </td>

                        {/* Verification Status */}
                        <td className="py-4 px-4">
                          {vendor.verified ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xs font-semibold text-[10px] uppercase tracking-wider">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              Verified
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-xs font-semibold text-[10px] uppercase tracking-wider">
                              <XCircle className="w-3.5 h-3.5 text-amber-600" />
                              Unverified / Pending
                            </span>
                          )}
                        </td>

                        {/* Featured Status */}
                        <td className="py-4 px-4">
                          {vendor.featured ? (
                            <span className="inline-flex items-center gap-1 text-[#C5A880] font-semibold text-[11px]">
                              <Sparkles className="w-3 h-3 fill-current" />
                              Featured
                            </span>
                          ) : (
                            <span className="text-[#5A5650]/50 text-[11px]">Standard</span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-6 text-right">
                          <div className="inline-flex items-center gap-2 justify-end">
                            {/* Toggle Verification */}
                            <button
                              onClick={() => handleToggleVerification(vendor.id, vendor.verified)}
                              disabled={isOperating}
                              className={`px-3 py-1.5 rounded-xs text-xs font-semibold uppercase tracking-wider transition-colors disabled:opacity-50 ${
                                vendor.verified
                                  ? "bg-amber-50 text-amber-800 border border-amber-300 hover:bg-amber-100"
                                  : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs"
                              }`}
                              title={
                                vendor.verified
                                  ? "Turn OFF verification for this vendor"
                                  : "Verify and approve this vendor"
                              }
                            >
                              {isOperating
                                ? "..."
                                : vendor.verified
                                ? "Turn OFF Verification"
                                : "✓ Verify Vendor"}
                            </button>

                            {/* Reject / Delete Vendor */}
                            <button
                              onClick={() => handleRejectVendor(vendor.id, vendor.businessName)}
                              disabled={isOperating}
                              className="px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors disabled:opacity-50 inline-flex items-center gap-1"
                              title="Reject and remove fake or unapproved vendor"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              <span>Reject</span>
                            </button>

                            {/* Toggle Featured */}
                            <button
                              onClick={() => handleToggleFeatured(vendor.id, vendor.featured)}
                              disabled={isOperating}
                              className="px-2.5 py-1.5 bg-[#F3EFEA] hover:bg-[#EBE5DE] text-[#161514] text-xs font-medium rounded-xs border border-[#161514]/15 transition-colors"
                              title={vendor.featured ? "Remove featured badge" : "Mark as featured"}
                            >
                              {vendor.featured ? "Unfeature" : "★ Feature"}
                            </button>

                            {/* View Public Profile */}
                            <Link
                              href={`/vendors/${vendor.slug}`}
                              target="_blank"
                              className="p-1.5 text-[#5A5650] hover:text-[#161514] hover:bg-[#FAF8F5] rounded-xs transition-colors"
                              title="Preview public profile"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
