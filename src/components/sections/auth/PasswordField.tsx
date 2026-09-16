"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
}

export function PasswordField({
  id,
  label,
  error,
  required,
  className = "",
  ...props
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="block text-xs font-semibold tracking-wider uppercase text-[#161514]">
          {label} {required && <span className="text-[#C5A880]">*</span>}
        </label>
      </div>

      <div className="relative">
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full px-4 py-3 pr-12 bg-[#F3EFEA] border border-[#161514]/20 text-[#161514] placeholder-[#5A5650]/50 text-sm font-sans focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition-colors ${className}`}
          {...props}
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A5650] hover:text-[#161514] p-1.5 focus:outline-none focus:ring-1 focus:ring-[#C5A880] transition-colors"
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
      </div>

      {error && (
        <p id={`${id}-error`} className="text-xs text-red-700 font-sans mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
