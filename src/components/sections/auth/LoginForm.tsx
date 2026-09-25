"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { DEFAULT_LOGIN_VALUES, LoginValues } from "@/data/auth";
import { PasswordField } from "./PasswordField";
import { AuthSuccess } from "./AuthSuccess";

import { createClient } from "@/lib/supabase/client";
import { getCurrentUserApi } from "@/lib/api/endpoints";

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
  const router = useRouter();

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

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: formValues.email.trim(),
        password: formValues.password,
      });

      if (authError) {
        setErrors({ general: authError.message });
        return;
      }

      setIsSubmitted(true);
      const user = await getCurrentUserApi();
      if (user.role === 'VENDOR') {
        router.push('/vendor/dashboard');
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      setErrors({ general: err instanceof Error ? err.message : 'Login failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormValues(DEFAULT_LOGIN_VALUES);
    setErrors({});
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return <AuthSuccess type="login" onReset={handleReset} />;
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
