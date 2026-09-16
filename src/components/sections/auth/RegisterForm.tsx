"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  CLIENT_DESTINATIONS,
  CLIENT_GUEST_RANGES,
  DEFAULT_CLIENT_REGISTRATION_VALUES,
  DEFAULT_VENDOR_REGISTRATION_VALUES,
  UserRole,
  VENDOR_CATEGORIES,
  VENDOR_LOCATIONS,
  ClientRegistrationValues,
  VendorRegistrationValues,
} from "@/data/auth";
import { RoleSelector } from "./RoleSelector";
import { PasswordField } from "./PasswordField";
import { AuthSuccess } from "./AuthSuccess";

interface RegisterFormErrors {
  role?: string;
  name?: string;
  businessName?: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  destination?: string;
  guestCount?: string;
  category?: string;
  location?: string;
  terms?: string;
}

export function RegisterForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [role, setRole] = useState<UserRole | null>(null);

  const [clientValues, setClientValues] = useState<ClientRegistrationValues>(
    DEFAULT_CLIENT_REGISTRATION_VALUES
  );
  const [vendorValues, setVendorValues] = useState<VendorRegistrationValues>(
    DEFAULT_VENDOR_REGISTRATION_VALUES
  );

  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Field Change Handlers
  const handleClientChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setClientValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name as keyof RegisterFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleVendorChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setVendorValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name as keyof RegisterFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleDateUndecidedToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setClientValues((prev) => ({
      ...prev,
      isDateUndecided: isChecked,
      weddingDate: isChecked ? "" : prev.weddingDate,
    }));
  };

  const handleStep1Next = () => {
    if (!role) {
      setErrors({ role: "Please select a role to continue." });
      return;
    }
    setErrors({});
    setStep(2);
  };

  const validateStep2 = (): boolean => {
    const newErrors: RegisterFormErrors = {};

    if (role === "CLIENT") {
      if (!clientValues.name.trim()) {
        newErrors.name = "Please enter your name.";
      }

      if (!clientValues.email.trim()) {
        newErrors.email = "Please enter your email address.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientValues.email.trim())) {
        newErrors.email = "Please enter a valid email address.";
      }

      if (!clientValues.phone.trim()) {
        newErrors.phone = "Please enter your phone number.";
      }

      if (!clientValues.password) {
        newErrors.password = "Please create a password.";
      } else if (clientValues.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters.";
      }

      if (!clientValues.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password.";
      } else if (clientValues.password !== clientValues.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match.";
      }

      if (
        !clientValues.destination ||
        clientValues.destination === CLIENT_DESTINATIONS[0]
      ) {
        newErrors.destination = "Please choose a destination.";
      }

      if (
        !clientValues.guestCount ||
        clientValues.guestCount === CLIENT_GUEST_RANGES[0]
      ) {
        newErrors.guestCount = "Please choose an approximate guest count.";
      }

      if (!clientValues.terms) {
        newErrors.terms = "Please accept the Terms and Privacy Policy to continue.";
      }
    } else if (role === "VENDOR") {
      if (!vendorValues.businessName.trim()) {
        newErrors.businessName = "Please enter your business or studio name.";
      }

      if (!vendorValues.contactPerson.trim()) {
        newErrors.contactPerson = "Please enter a contact person name.";
      }

      if (!vendorValues.email.trim()) {
        newErrors.email = "Please enter your email address.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vendorValues.email.trim())) {
        newErrors.email = "Please enter a valid email address.";
      }

      if (!vendorValues.phone.trim()) {
        newErrors.phone = "Please enter your phone number.";
      }

      if (!vendorValues.password) {
        newErrors.password = "Please create a password.";
      } else if (vendorValues.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters.";
      }

      if (!vendorValues.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password.";
      } else if (vendorValues.password !== vendorValues.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match.";
      }

      if (
        !vendorValues.category ||
        vendorValues.category === VENDOR_CATEGORIES[0]
      ) {
        newErrors.category = "Please select a primary category.";
      }

      if (
        !vendorValues.location ||
        vendorValues.location === VENDOR_LOCATIONS[0]
      ) {
        newErrors.location = "Please select your city or location.";
      }

      if (!vendorValues.terms) {
        newErrors.terms = "Please accept the Terms and Privacy Policy to continue.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep2()) return;

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 400));
      setIsSubmitted(true);
    } catch {
      // Error handling boundary
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setRole(null);
    setClientValues(DEFAULT_CLIENT_REGISTRATION_VALUES);
    setVendorValues(DEFAULT_VENDOR_REGISTRATION_VALUES);
    setErrors({});
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return <AuthSuccess type="register" role={role} onReset={handleReset} />;
  }

  return (
    <div className="space-y-8">
      {/* Progress Indicator */}
      <div className="flex items-center justify-between border-b border-[#161514]/15 pb-4">
        <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C5A880]">
          JOIN WEDORA
        </span>
        <span className="text-xs font-sans text-[#5A5650] tracking-wider uppercase">
          Step 0{step} of 02
        </span>
      </div>

      {/* STEP 1: ROLE SELECTION */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="font-serif text-3xl sm:text-4xl font-light text-[#161514] tracking-tight">
              Choose your journey.
            </h1>
            <p className="font-sans text-sm text-[#5A5650] font-light leading-relaxed">
              Whether you&apos;re planning a celebration or creating one, Wedora starts with the right experience for you.
            </p>
          </div>

          <RoleSelector
            selectedRole={role}
            onSelectRole={(r) => {
              setRole(r);
              if (errors.role) setErrors((prev) => ({ ...prev, role: undefined }));
            }}
            error={errors.role}
          />

          <button
            type="button"
            onClick={handleStep1Next}
            className="w-full py-4 bg-[#161514] text-[#FAF8F5] text-xs font-semibold tracking-[0.2em] uppercase inline-flex items-center justify-center gap-2 hover:bg-[#C5A880] hover:text-[#161514] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
          >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 2: REGISTRATION FORM */}
      {step === 2 && (
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-1.5 text-xs text-[#5A5650] hover:text-[#161514] transition-colors uppercase tracking-wider"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Edit role</span>
            </button>
            <span className="text-xs font-semibold tracking-widest text-[#C5A880] uppercase">
              {role === "CLIENT" ? "Couple Account" : "Vendor Account"}
            </span>
          </div>

          <div className="space-y-1">
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#161514]">
              {role === "CLIENT" ? "Tell us about you." : "Tell us about your work."}
            </h2>
          </div>

          {/* CLIENT FIELDS */}
          {role === "CLIENT" && (
            <>
              {/* Full Name */}
              <div className="space-y-2">
                <label htmlFor="reg-client-name" className="block text-xs font-semibold tracking-wider uppercase text-[#161514]">
                  Your name <span className="text-[#C5A880]">*</span>
                </label>
                <input
                  id="reg-client-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={clientValues.name}
                  onChange={handleClientChange}
                  placeholder="Enter your name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "error-client-name" : undefined}
                  className="w-full px-4 py-3 bg-[#F3EFEA] border border-[#161514]/20 text-[#161514] placeholder-[#5A5650]/50 text-sm font-sans focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition-colors"
                />
                {errors.name && (
                  <p id="error-client-name" className="text-xs text-red-700 font-sans mt-1">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="reg-client-email" className="block text-xs font-semibold tracking-wider uppercase text-[#161514]">
                    Email address <span className="text-[#C5A880]">*</span>
                  </label>
                  <input
                    id="reg-client-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={clientValues.email}
                    onChange={handleClientChange}
                    placeholder="you@example.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "error-client-email" : undefined}
                    className="w-full px-4 py-3 bg-[#F3EFEA] border border-[#161514]/20 text-[#161514] placeholder-[#5A5650]/50 text-sm font-sans focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition-colors"
                  />
                  {errors.email && (
                    <p id="error-client-email" className="text-xs text-red-700 font-sans mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="reg-client-phone" className="block text-xs font-semibold tracking-wider uppercase text-[#161514]">
                    Phone number <span className="text-[#C5A880]">*</span>
                  </label>
                  <input
                    id="reg-client-phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    value={clientValues.phone}
                    onChange={handleClientChange}
                    placeholder="+91 98765 43210"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "error-client-phone" : undefined}
                    className="w-full px-4 py-3 bg-[#F3EFEA] border border-[#161514]/20 text-[#161514] placeholder-[#5A5650]/50 text-sm font-sans focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition-colors"
                  />
                  {errors.phone && (
                    <p id="error-client-phone" className="text-xs text-red-700 font-sans mt-1">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Password & Confirm Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <PasswordField
                  id="reg-client-password"
                  name="password"
                  label="Create a password"
                  required
                  autoComplete="new-password"
                  value={clientValues.password}
                  onChange={handleClientChange}
                  placeholder="Min 8 characters"
                  error={errors.password}
                />

                <PasswordField
                  id="reg-client-confirmPassword"
                  name="confirmPassword"
                  label="Confirm password"
                  required
                  autoComplete="new-password"
                  value={clientValues.confirmPassword}
                  onChange={handleClientChange}
                  placeholder="Re-enter password"
                  error={errors.confirmPassword}
                />
              </div>

              {/* Wedding Date */}
              <div className="space-y-2">
                <label htmlFor="reg-client-date" className="block text-xs font-semibold tracking-wider uppercase text-[#161514]">
                  Approximate wedding date
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                  <div className="sm:col-span-7">
                    <input
                      id="reg-client-date"
                      name="weddingDate"
                      type="date"
                      disabled={clientValues.isDateUndecided}
                      value={clientValues.weddingDate}
                      onChange={handleClientChange}
                      className="w-full px-4 py-2.5 bg-[#F3EFEA] border border-[#161514]/20 text-[#161514] text-sm font-sans focus:outline-none focus:border-[#C5A880] disabled:opacity-50 transition-colors"
                    />
                  </div>
                  <div className="sm:col-span-5">
                    <label className="inline-flex items-center gap-2 text-xs font-sans text-[#5A5650] cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={clientValues.isDateUndecided}
                        onChange={handleDateUndecidedToggle}
                        className="w-4 h-4 rounded-none border-[#161514]/30 accent-[#C5A880]"
                      />
                      <span>Not decided yet</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Destination & Guest Count */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="reg-client-destination" className="block text-xs font-semibold tracking-wider uppercase text-[#161514]">
                    Destination <span className="text-[#C5A880]">*</span>
                  </label>
                  <select
                    id="reg-client-destination"
                    name="destination"
                    required
                    value={clientValues.destination}
                    onChange={handleClientChange}
                    aria-invalid={!!errors.destination}
                    aria-describedby={errors.destination ? "error-client-dest" : undefined}
                    className="w-full px-4 py-3 bg-[#F3EFEA] border border-[#161514]/20 text-[#161514] text-sm font-sans focus:outline-none focus:border-[#C5A880] transition-colors"
                  >
                    {CLIENT_DESTINATIONS.map((dest, idx) => (
                      <option key={dest} value={dest} disabled={idx === 0}>
                        {dest}
                      </option>
                    ))}
                  </select>
                  {errors.destination && (
                    <p id="error-client-dest" className="text-xs text-red-700 font-sans mt-1">
                      {errors.destination}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="reg-client-guestCount" className="block text-xs font-semibold tracking-wider uppercase text-[#161514]">
                    Approximate guests <span className="text-[#C5A880]">*</span>
                  </label>
                  <select
                    id="reg-client-guestCount"
                    name="guestCount"
                    required
                    value={clientValues.guestCount}
                    onChange={handleClientChange}
                    aria-invalid={!!errors.guestCount}
                    aria-describedby={errors.guestCount ? "error-client-guest" : undefined}
                    className="w-full px-4 py-3 bg-[#F3EFEA] border border-[#161514]/20 text-[#161514] text-sm font-sans focus:outline-none focus:border-[#C5A880] transition-colors"
                  >
                    {CLIENT_GUEST_RANGES.map((range, idx) => (
                      <option key={range} value={range} disabled={idx === 0}>
                        {range}
                      </option>
                    ))}
                  </select>
                  {errors.guestCount && (
                    <p id="error-client-guest" className="text-xs text-red-700 font-sans mt-1">
                      {errors.guestCount}
                    </p>
                  )}
                </div>
              </div>
            </>
          )}

          {/* VENDOR FIELDS */}
          {role === "VENDOR" && (
            <>
              {/* Business Name & Contact Person */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="reg-vendor-biz" className="block text-xs font-semibold tracking-wider uppercase text-[#161514]">
                    Business / Studio name <span className="text-[#C5A880]">*</span>
                  </label>
                  <input
                    id="reg-vendor-biz"
                    name="businessName"
                    type="text"
                    required
                    autoComplete="organization"
                    value={vendorValues.businessName}
                    onChange={handleVendorChange}
                    placeholder="Studio or brand name"
                    aria-invalid={!!errors.businessName}
                    aria-describedby={errors.businessName ? "error-vendor-biz" : undefined}
                    className="w-full px-4 py-3 bg-[#F3EFEA] border border-[#161514]/20 text-[#161514] placeholder-[#5A5650]/50 text-sm font-sans focus:outline-none focus:border-[#C5A880] transition-colors"
                  />
                  {errors.businessName && (
                    <p id="error-vendor-biz" className="text-xs text-red-700 font-sans mt-1">
                      {errors.businessName}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="reg-vendor-contact" className="block text-xs font-semibold tracking-wider uppercase text-[#161514]">
                    Contact person <span className="text-[#C5A880]">*</span>
                  </label>
                  <input
                    id="reg-vendor-contact"
                    name="contactPerson"
                    type="text"
                    required
                    autoComplete="name"
                    value={vendorValues.contactPerson}
                    onChange={handleVendorChange}
                    placeholder="Your full name"
                    aria-invalid={!!errors.contactPerson}
                    aria-describedby={errors.contactPerson ? "error-vendor-contact" : undefined}
                    className="w-full px-4 py-3 bg-[#F3EFEA] border border-[#161514]/20 text-[#161514] placeholder-[#5A5650]/50 text-sm font-sans focus:outline-none focus:border-[#C5A880] transition-colors"
                  />
                  {errors.contactPerson && (
                    <p id="error-vendor-contact" className="text-xs text-red-700 font-sans mt-1">
                      {errors.contactPerson}
                    </p>
                  )}
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="reg-vendor-email" className="block text-xs font-semibold tracking-wider uppercase text-[#161514]">
                    Email address <span className="text-[#C5A880]">*</span>
                  </label>
                  <input
                    id="reg-vendor-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={vendorValues.email}
                    onChange={handleVendorChange}
                    placeholder="business@example.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "error-vendor-email" : undefined}
                    className="w-full px-4 py-3 bg-[#F3EFEA] border border-[#161514]/20 text-[#161514] placeholder-[#5A5650]/50 text-sm font-sans focus:outline-none focus:border-[#C5A880] transition-colors"
                  />
                  {errors.email && (
                    <p id="error-vendor-email" className="text-xs text-red-700 font-sans mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="reg-vendor-phone" className="block text-xs font-semibold tracking-wider uppercase text-[#161514]">
                    Phone number <span className="text-[#C5A880]">*</span>
                  </label>
                  <input
                    id="reg-vendor-phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    value={vendorValues.phone}
                    onChange={handleVendorChange}
                    placeholder="+91 98765 43210"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "error-vendor-phone" : undefined}
                    className="w-full px-4 py-3 bg-[#F3EFEA] border border-[#161514]/20 text-[#161514] placeholder-[#5A5650]/50 text-sm font-sans focus:outline-none focus:border-[#C5A880] transition-colors"
                  />
                  {errors.phone && (
                    <p id="error-vendor-phone" className="text-xs text-red-700 font-sans mt-1">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Password & Confirm Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <PasswordField
                  id="reg-vendor-password"
                  name="password"
                  label="Create a password"
                  required
                  autoComplete="new-password"
                  value={vendorValues.password}
                  onChange={handleVendorChange}
                  placeholder="Min 8 characters"
                  error={errors.password}
                />

                <PasswordField
                  id="reg-vendor-confirmPassword"
                  name="confirmPassword"
                  label="Confirm password"
                  required
                  autoComplete="new-password"
                  value={vendorValues.confirmPassword}
                  onChange={handleVendorChange}
                  placeholder="Re-enter password"
                  error={errors.confirmPassword}
                />
              </div>

              {/* Category & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="reg-vendor-cat" className="block text-xs font-semibold tracking-wider uppercase text-[#161514]">
                    Primary category <span className="text-[#C5A880]">*</span>
                  </label>
                  <select
                    id="reg-vendor-cat"
                    name="category"
                    required
                    value={vendorValues.category}
                    onChange={handleVendorChange}
                    aria-invalid={!!errors.category}
                    aria-describedby={errors.category ? "error-vendor-cat" : undefined}
                    className="w-full px-4 py-3 bg-[#F3EFEA] border border-[#161514]/20 text-[#161514] text-sm font-sans focus:outline-none focus:border-[#C5A880] transition-colors"
                  >
                    {VENDOR_CATEGORIES.map((cat, idx) => (
                      <option key={cat} value={cat} disabled={idx === 0}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p id="error-vendor-cat" className="text-xs text-red-700 font-sans mt-1">
                      {errors.category}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="reg-vendor-loc" className="block text-xs font-semibold tracking-wider uppercase text-[#161514]">
                    City / Location <span className="text-[#C5A880]">*</span>
                  </label>
                  <select
                    id="reg-vendor-loc"
                    name="location"
                    required
                    value={vendorValues.location}
                    onChange={handleVendorChange}
                    aria-invalid={!!errors.location}
                    aria-describedby={errors.location ? "error-vendor-loc" : undefined}
                    className="w-full px-4 py-3 bg-[#F3EFEA] border border-[#161514]/20 text-[#161514] text-sm font-sans focus:outline-none focus:border-[#C5A880] transition-colors"
                  >
                    {VENDOR_LOCATIONS.map((loc, idx) => (
                      <option key={loc} value={loc} disabled={idx === 0}>
                        {loc}
                      </option>
                    ))}
                  </select>
                  {errors.location && (
                    <p id="error-vendor-loc" className="text-xs text-red-700 font-sans mt-1">
                      {errors.location}
                    </p>
                  )}
                </div>
              </div>

              {/* Description textarea */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="reg-vendor-desc" className="block text-xs font-semibold tracking-wider uppercase text-[#161514]">
                    Short description
                  </label>
                  <span className="text-[11px] text-[#5A5650]">
                    {vendorValues.description.length}/500
                  </span>
                </div>
                <textarea
                  id="reg-vendor-desc"
                  name="description"
                  maxLength={500}
                  rows={3}
                  value={vendorValues.description}
                  onChange={handleVendorChange}
                  placeholder="Tell couples a little about your work..."
                  className="w-full px-4 py-3 bg-[#F3EFEA] border border-[#161514]/20 text-[#161514] placeholder-[#5A5650]/50 text-sm font-sans focus:outline-none focus:border-[#C5A880] transition-colors resize-y"
                />
              </div>
            </>
          )}

          {/* Terms Checkbox */}
          <div className="space-y-2 pt-2 border-t border-[#161514]/15">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                id="reg-terms"
                type="checkbox"
                required
                checked={
                  role === "CLIENT" ? clientValues.terms : vendorValues.terms
                }
                onChange={(e) => {
                  if (role === "CLIENT") {
                    setClientValues((prev) => ({
                      ...prev,
                      terms: e.target.checked,
                    }));
                  } else {
                    setVendorValues((prev) => ({
                      ...prev,
                      terms: e.target.checked,
                    }));
                  }
                  if (errors.terms) {
                    setErrors((prev) => ({ ...prev, terms: undefined }));
                  }
                }}
                className="mt-0.5 w-4 h-4 rounded-none border-[#161514]/30 accent-[#C5A880]"
              />
              <span className="text-xs font-sans text-[#161514] leading-normal">
                I agree to the{" "}
                <span className="underline underline-offset-2 hover:text-[#C5A880] cursor-pointer">
                  Wedora Terms
                </span>{" "}
                and{" "}
                <span className="underline underline-offset-2 hover:text-[#C5A880] cursor-pointer">
                  Privacy Policy
                </span>
                . <span className="text-[#C5A880]">*</span>
              </span>
            </label>
            {errors.terms && (
              <p className="text-xs text-red-700 font-sans pl-7">
                {errors.terms}
              </p>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-[#161514] text-[#FAF8F5] text-xs font-semibold tracking-[0.2em] uppercase inline-flex items-center justify-center gap-2 hover:bg-[#C5A880] hover:text-[#161514] disabled:opacity-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
          >
            <span>{isSubmitting ? "Creating account..." : "Create Account"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      )}

      {/* Navigation Link to Login */}
      <div className="pt-4 border-t border-[#161514]/15 text-center">
        <p className="text-xs font-sans text-[#5A5650]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#161514] font-semibold underline underline-offset-4 hover:text-[#C5A880] transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
