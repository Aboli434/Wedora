"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { DEFAULT_LOGIN_VALUES, LoginValues } from "@/data/auth";
import { PasswordField } from "./PasswordField";
import { AuthSuccess } from "./AuthSuccess";

import { createClient } from "@/lib/supabase/client";
import { getCurrentUserApi } from "@/lib/api/endpoints";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/useAuthStore";

interface LoginFormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export function LoginForm() {
  const [formValues, setFormValues] = useState<LoginValues>(DEFAULT_LOGIN_VALUES);
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isUnderReview, setIsUnderReview] = useState(false);
  const [underReviewInfo, setUnderReviewInfo] = useState<{ businessName: string; email: string } | null>(null);
  const router = useRouter();

  const { user, isAuthenticated, dashboardHref, logout, refetchUser } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [userRole, setUserRole] = useState<"CLIENT" | "VENDOR" | "ADMIN" | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name as keyof LoginFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: LoginFormErrors = {};

    if (!formValues.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formValues.password) {
      newErrors.password = "Please enter your password.";
    } else if (formValues.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});
    setIsUnderReview(false);

    try {
      const supabase = createClient();
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: formValues.email.trim(),
        password: formValues.password,
      });

      if (authError || !authData?.user) {
        setErrors({ general: authError?.message || "Authentication failed. Please try again." });
        return;
      }

      // Check role directly from Supabase Auth user_metadata first
      let detectedRole: "CLIENT" | "VENDOR" | "ADMIN" | null = (authData.user.user_metadata?.role as "CLIENT" | "VENDOR" | "ADMIN") || null;

      // Fallback to API if metadata role is not present
      if (!detectedRole) {
        try {
          const user = await getCurrentUserApi();
          detectedRole = user.role;
        } catch {
          detectedRole = "CLIENT";
        }
      }

      // Check if vendor is verified by Admin
      if (detectedRole === "VENDOR") {
        try {
          const statusRes = await fetch(`/api/v1/auth/check-vendor?email=${encodeURIComponent(authData.user.email || formValues.email.trim())}`);
          const statusJson = await statusRes.json();
          if (statusJson.success && statusJson.data && !statusJson.data.verified) {
            // Unverified vendor: log out and show Profile Under Review screen
            await supabase.auth.signOut();
            useAuthStore.getState().setUser(null);
            setIsUnderReview(true);
            setUnderReviewInfo({
              businessName: statusJson.data.businessName || "Your Studio",
              email: authData.user.email || formValues.email.trim(),
            });
            setIsSubmitting(false);
            return;
          }
        } catch {
          // If check endpoint fails, continue
        }
      }

      const immediateUser = {
        id: authData.user.id,
        email: authData.user.email || formValues.email.trim(),
        role: detectedRole,
        fullName:
          (authData.user.user_metadata?.fullName as string) ||
          (authData.user.user_metadata?.name as string) ||
          "User",
        phoneNumber: authData.user.phone || null,
        avatarUrl: null,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        profile: null,
      };

      useAuthStore.getState().setUser(immediateUser);

      setUserRole(detectedRole);
      setIsSubmitted(true);

      if (detectedRole === "ADMIN") {
        router.push("/admin/dashboard");
      } else if (detectedRole === "VENDOR") {
        router.push("/vendor/dashboard");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setErrors({ general: err instanceof Error ? err.message : "Login failed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormValues(DEFAULT_LOGIN_VALUES);
    setErrors({});
    setIsSubmitted(false);
    setIsUnderReview(false);
    setUnderReviewInfo(null);
    setUserRole(null);
  };

  if (isSubmitted) {
    return <AuthSuccess type="login" role={userRole} onReset={handleReset} />;
  }

  // Profile Under Review Screen (when unverified vendor attempts login)
  if (isUnderReview) {
    return (
      <div className="space-y-8 bg-[#FAF8F5] p-8 sm:p-10 border border-[#161514]/15">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-amber-800" />
          </div>
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-amber-800">
            PROFILE UNDER REVIEW
          </span>
        </div>

        <div className="space-y-3">
          <h1 className="font-serif text-3xl sm:text-4xl font-light text-[#161514] leading-snug">
            {underReviewInfo?.businessName || "Vendor Studio"} is Pending Verification
          </h1>
          <p className="font-sans text-sm text-[#5A5650] font-light leading-relaxed">
            Your vendor account has been created, but access to the Vendor Studio is restricted until an administrator verifies and approves your credentials.
          </p>
        </div>

        <div className="p-4 bg-white border border-[#161514]/10 rounded-xs space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-semibold uppercase tracking-wider text-[10px] text-[#5A5650]">
              Account Status
            </span>
            <span className="px-2.5 py-0.5 bg-amber-50 text-amber-900 border border-amber-200 text-[10px] font-bold uppercase tracking-wider rounded-xs">
              Pending Admin Approval
            </span>
          </div>
          <p className="text-[11px] text-[#5A5650]">
            The Wedora Admin reviews all vendor accounts to maintain directory authenticity. Once verified by the Admin in the Admin Console, you will be able to sign in and your profile will be published to client directories.
          </p>
        </div>

        <div className="pt-6 border-t border-[#161514]/15 space-y-3">
          <button
            type="button"
            onClick={handleReset}
            className="w-full py-4 bg-[#161514] !text-[#FAF8F5] text-xs font-semibold tracking-[0.2em] uppercase inline-flex items-center justify-center gap-2 hover:bg-[#C5A880] hover:!text-[#161514] transition-colors rounded-xs shadow-xs"
          >
            <span className="!text-[#FAF8F5]">Try Signing In Again</span>
            <ArrowRight className="w-4 h-4 !text-[#FAF8F5]" />
          </button>

          <Link
            href="/"
            className="w-full py-3.5 bg-transparent text-[#161514] border border-[#161514]/30 font-semibold text-xs tracking-[0.2em] uppercase inline-flex items-center justify-center hover:bg-[#FAF8F5] transition-colors rounded-xs"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  if (mounted && isAuthenticated && user) {
    const isUnverified =
      user.role === "VENDOR" &&
      user.profile &&
      "verified" in user.profile &&
      !user.profile.verified;

    if (isUnverified) {
      const biz = user.profile && "businessName" in user.profile ? (user.profile.businessName as string) : "Your Studio";
      return (
        <div className="space-y-8 bg-[#FAF8F5] p-8 sm:p-10 border border-[#161514]/15">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-amber-800" />
            </div>
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-amber-800">
              PROFILE UNDER REVIEW
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="font-serif text-3xl sm:text-4xl font-light text-[#161514] leading-snug">
              {biz} is Under Review
            </h1>
            <p className="font-sans text-sm text-[#5A5650] font-light">
              Your vendor profile is registered and pending admin review. You will be able to access your studio once approved.
            </p>
          </div>

          <div className="pt-6 border-t border-[#161514]/15 space-y-3">
            <button
              type="button"
              onClick={() => refetchUser()}
              className="w-full py-4 bg-[#161514] !text-[#FAF8F5] text-xs font-semibold tracking-[0.2em] uppercase inline-flex items-center justify-center gap-2 hover:bg-[#C5A880] hover:!text-[#161514] transition-colors rounded-xs shadow-xs"
            >
              <span className="!text-[#FAF8F5]">Refresh Verification Status</span>
              <ArrowRight className="w-4 h-4 !text-[#FAF8F5]" />
            </button>

            <button
              type="button"
              onClick={logout}
              className="w-full py-3.5 bg-transparent text-[#161514] border border-[#161514]/30 font-semibold text-xs tracking-[0.2em] uppercase inline-flex items-center justify-center hover:bg-red-50 hover:text-red-700 hover:border-red-300 transition-colors cursor-pointer rounded-xs"
            >
              Sign Out / Switch Account
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="space-y-8 bg-[#FAF8F5] p-8 sm:p-10 border border-[#161514]/15">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-6 h-6 text-[#C5A880]" />
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C5A880]">
            ALREADY SIGNED IN
          </span>
        </div>

        <div className="space-y-3">
          <h1 className="font-serif text-3xl sm:text-4xl font-light text-[#161514] leading-snug">
            Welcome, {user.fullName || user.email}
          </h1>
          <p className="font-sans text-sm text-[#5A5650] font-light">
            You are currently signed in with an active {user.role.toLowerCase()} account.
          </p>
        </div>

        <div className="pt-6 border-t border-[#161514]/15 space-y-3">
          <Link
            href={dashboardHref}
            className="w-full py-4 bg-[#161514] !text-[#FAF8F5] text-xs font-semibold tracking-[0.2em] uppercase inline-flex items-center justify-center gap-2 hover:bg-[#C5A880] hover:!text-[#161514] transition-colors rounded-xs shadow-xs"
          >
            <span className="!text-[#FAF8F5] font-sans">Go to Dashboard</span>
            <ArrowRight className="w-4 h-4 !text-[#FAF8F5]" />
          </Link>

          <button
            type="button"
            onClick={logout}
            className="w-full py-3.5 bg-transparent text-[#161514] border border-[#161514]/30 font-semibold text-xs tracking-[0.2em] uppercase inline-flex items-center justify-center hover:bg-red-50 hover:text-red-700 hover:border-red-300 transition-colors cursor-pointer"
          >
            Sign Out / Switch Account
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="space-y-2">
        <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C5A880] block">
          WELCOME BACK
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-light text-[#161514] tracking-tight">
          Continue your celebration.
        </h1>
        <p className="font-sans text-sm text-[#5A5650] font-light">
          Pick up where you left off.
        </p>
      </div>

      {errors.general && (
        <div className="p-4 rounded bg-red-50 border border-red-200 text-red-700 text-xs font-sans">
          {errors.general}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="login-email" className="block text-xs font-semibold tracking-wider uppercase text-[#161514]">
            Email address <span className="text-[#C5A880]">*</span>
          </label>
          <input
            id="login-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={formValues.email}
            onChange={handleInputChange}
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "error-login-email" : undefined}
            className="w-full px-4 py-3 bg-[#F3EFEA] border border-[#161514]/20 text-[#161514] placeholder-[#5A5650]/50 text-sm font-sans focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition-colors"
          />
          {errors.email && (
            <p id="error-login-email" className="text-xs text-red-700 font-sans mt-1">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <PasswordField
            id="login-password"
            name="password"
            label="Password"
            required
            autoComplete="current-password"
            value={formValues.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            error={errors.password}
          />
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formValues.rememberMe}
                onChange={handleInputChange}
                className="w-4 h-4 rounded-none border-[#161514]/30 accent-[#C5A880] focus:ring-[#C5A880]"
              />
              <span className="text-xs text-[#5A5650] font-sans">Remember me</span>
            </label>

            <button
              type="button"
              disabled
              aria-disabled="true"
              className="text-xs text-[#5A5650]/60 cursor-not-allowed italic"
            >
              Forgot password? (Coming soon)
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-[#161514] text-[#FAF8F5] text-xs font-semibold tracking-[0.2em] uppercase inline-flex items-center justify-center gap-2 hover:bg-[#C5A880] hover:text-[#161514] disabled:opacity-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
        >
          <span>{isSubmitting ? "Signing in..." : "Log In"}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Navigation Links */}
      <div className="pt-6 border-t border-[#161514]/15 space-y-4 text-center">
        <p className="text-xs font-sans text-[#5A5650]">
          Don&apos;t have a Wedora account?{" "}
          <Link
            href="/register"
            className="text-[#161514] font-semibold underline underline-offset-4 hover:text-[#C5A880] transition-colors"
          >
            Create an account
          </Link>
        </p>

        <p className="text-xs font-sans text-[#5A5650]">
          <Link
            href="/"
            className="hover:text-[#C5A880] transition-colors tracking-wide uppercase text-[11px]"
          >
            ← Continue exploring
          </Link>
        </p>
      </div>
    </div>
  );
}
