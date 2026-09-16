"use client";

import React, { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import {
  CONTACT_DESTINATIONS,
  CONTACT_EVENT_COUNTS,
  CONTACT_GUEST_RANGES,
  CONTACT_METHODS,
  CONTACT_SERVICE_INTERESTS,
  DEFAULT_CONTACT_FORM_VALUES,
  ContactFormValues,
  ContactMethod,
} from "@/data/contact";
import { ContactSuccess } from "./ContactSuccess";

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  destination?: string;
  guestCount?: string;
  eventCount?: string;
  consent?: string;
}

export function ContactForm() {
  const [formValues, setFormValues] = useState<ContactFormValues>(DEFAULT_CONTACT_FORM_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Field change handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleContactMethodSelect = (method: ContactMethod) => {
    setFormValues((prev) => ({ ...prev, contactMethod: method }));
  };

  const handleDateUndecidedToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setFormValues((prev) => ({
      ...prev,
      isDateUndecided: isChecked,
      weddingDate: isChecked ? "" : prev.weddingDate,
    }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormValues((prev) => {
      const exists = prev.interests.includes(interest);
      const updated = exists
        ? prev.interests.filter((item) => item !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests: updated };
    });
  };

  const handleConsentToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setFormValues((prev) => ({ ...prev, consent: isChecked }));
    if (errors.consent) {
      setErrors((prev) => ({ ...prev, consent: undefined }));
    }
  };

  // Client-side validation function
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formValues.name.trim()) {
      newErrors.name = "Please enter your name.";
    }

    if (!formValues.email.trim()) {
      newErrors.email = "Please enter a valid email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formValues.phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
    } else if (formValues.phone.trim().length < 7) {
      newErrors.phone = "Please enter your phone number.";
    }

    if (!formValues.destination || formValues.destination === CONTACT_DESTINATIONS[0]) {
      newErrors.destination = "Please choose a destination.";
    }

    if (!formValues.guestCount || formValues.guestCount === CONTACT_GUEST_RANGES[0]) {
      newErrors.guestCount = "Please choose an approximate guest count.";
    }

    if (!formValues.eventCount || formValues.eventCount === CONTACT_EVENT_COUNTS[0]) {
      newErrors.eventCount = "Please choose how many events you're planning.";
    }

    if (!formValues.consent) {
      newErrors.consent = "Please confirm that you'd like to be contacted.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submission boundary structured for future API integration
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      // Focus first error element
      const firstErrorKey = Object.keys(errors)[0];
      const errorEl = document.getElementById(`field-${firstErrorKey}`);
      if (errorEl) errorEl.focus();
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulation delay for smooth UX transition
      await new Promise((resolve) => setTimeout(resolve, 400));

      // Ready for future API call:
      // await fetch("/api/contact", { method: "POST", body: JSON.stringify(formValues) });

      setIsSubmitted(true);
    } catch {
      // Error handling placeholder
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormValues(DEFAULT_CONTACT_FORM_VALUES);
    setErrors({});
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return <ContactSuccess onReset={handleReset} />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-12 bg-[#FAF8F5] p-6 sm:p-10 border border-[#161514]/15"
    >
      {/* SECTION 01 — ABOUT YOU */}
      <div className="space-y-6">
        <div className="border-b border-[#161514]/15 pb-3">
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C5A880]">
            01 — ABOUT YOU
          </span>
          <h3 className="font-serif text-2xl font-light text-[#161514] mt-1">
            Personal Details
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="space-y-2">
            <label htmlFor="field-name" className="block text-xs font-semibold tracking-wider uppercase text-[#161514]">
              Your name <span className="text-[#C5A880]">*</span>
            </label>
            <input
              id="field-name"
              name="name"
              type="text"
              required
              value={formValues.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "error-name" : undefined}
              className="w-full px-4 py-3 bg-[#F3EFEA] border border-[#161514]/20 text-[#161514] placeholder-[#5A5650]/50 text-sm font-sans focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition-colors"
            />
            {errors.name && (
              <p id="error-name" className="text-xs text-red-700 font-sans mt-1">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="field-email" className="block text-xs font-semibold tracking-wider uppercase text-[#161514]">
              Email address <span className="text-[#C5A880]">*</span>
            </label>
            <input
              id="field-email"
              name="email"
              type="email"
              required
              value={formValues.email}
              onChange={handleInputChange}
              placeholder="you@example.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "error-email" : undefined}
              className="w-full px-4 py-3 bg-[#F3EFEA] border border-[#161514]/20 text-[#161514] placeholder-[#5A5650]/50 text-sm font-sans focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition-colors"
            />
            {errors.email && (
              <p id="error-email" className="text-xs text-red-700 font-sans mt-1">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Phone */}
          <div className="space-y-2">
            <label htmlFor="field-phone" className="block text-xs font-semibold tracking-wider uppercase text-[#161514]">
              Phone number <span className="text-[#C5A880]">*</span>
            </label>
            <input
              id="field-phone"
              name="phone"
              type="tel"
              required
              value={formValues.phone}
              onChange={handleInputChange}
              placeholder="+91 98765 43210"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "error-phone" : undefined}
              className="w-full px-4 py-3 bg-[#F3EFEA] border border-[#161514]/20 text-[#161514] placeholder-[#5A5650]/50 text-sm font-sans focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition-colors"
            />
            {errors.phone && (
              <p id="error-phone" className="text-xs text-red-700 font-sans mt-1">
                {errors.phone}
              </p>
            )}
          </div>

          {/* Preferred Contact Method */}
          <div className="space-y-2">
            <span className="block text-xs font-semibold tracking-wider uppercase text-[#161514]">
              Preferred contact method
            </span>
            <div className="flex gap-2 pt-1" role="radiogroup" aria-label="Preferred contact method">
              {CONTACT_METHODS.map((method) => {
                const isSelected = formValues.contactMethod === method;
                return (
                  <button
                    key={method}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => handleContactMethodSelect(method)}
                    className={`flex-1 py-2.5 px-3 text-xs font-semibold uppercase tracking-wider transition-colors border ${
                      isSelected
                        ? "bg-[#161514] text-[#FAF8F5] border-[#161514]"
                        : "bg-[#F3EFEA] text-[#5A5650] border-[#161514]/20 hover:border-[#161514]/40"
                    }`}
                  >
                    {method}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 02 — ABOUT THE CELEBRATION */}
      <div className="space-y-6 pt-4">
        <div className="border-b border-[#161514]/15 pb-3">
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C5A880]">
            02 — YOUR CELEBRATION
          </span>
          <h3 className="font-serif text-2xl font-light text-[#161514] mt-1">
            Event Overview
          </h3>
        </div>

        {/* Wedding Date */}
        <div className="space-y-2">
          <label htmlFor="field-weddingDate" className="block text-xs font-semibold tracking-wider uppercase text-[#161514]">
            When are you planning to celebrate?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            <div className="sm:col-span-8">
              <input
                id="field-weddingDate"
                name="weddingDate"
                type="date"
                disabled={formValues.isDateUndecided}
                value={formValues.weddingDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#F3EFEA] border border-[#161514]/20 text-[#161514] text-sm font-sans focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              />
            </div>
            <div className="sm:col-span-4 flex items-center">
              <label className="inline-flex items-center gap-2 text-xs font-sans text-[#5A5650] cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formValues.isDateUndecided}
                  onChange={handleDateUndecidedToggle}
                  className="w-4 h-4 rounded-none border-[#161514]/30 accent-[#C5A880] focus:ring-[#C5A880]"
                />
                <span>Not decided yet</span>
              </label>
            </div>
          </div>
        </div>

        {/* Destination & Guest Count */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Destination */}
          <div className="space-y-2">
            <label htmlFor="field-destination" className="block text-xs font-semibold tracking-wider uppercase text-[#161514]">
              Where will the celebration happen? <span className="text-[#C5A880]">*</span>
            </label>
            <select
              id="field-destination"
              name="destination"
              required
              value={formValues.destination}
              onChange={handleInputChange}
              aria-invalid={!!errors.destination}
              aria-describedby={errors.destination ? "error-destination" : undefined}
              className="w-full px-4 py-3 bg-[#F3EFEA] border border-[#161514]/20 text-[#161514] text-sm font-sans focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition-colors"
            >
              {CONTACT_DESTINATIONS.map((dest, idx) => (
                <option key={dest} value={dest} disabled={idx === 0}>
                  {dest}
                </option>
              ))}
            </select>
            {errors.destination && (
              <p id="error-destination" className="text-xs text-red-700 font-sans mt-1">
                {errors.destination}
              </p>
            )}
          </div>

          {/* Guest Count */}
          <div className="space-y-2">
            <label htmlFor="field-guestCount" className="block text-xs font-semibold tracking-wider uppercase text-[#161514]">
              Approximate guest count <span className="text-[#C5A880]">*</span>
            </label>
            <select
              id="field-guestCount"
              name="guestCount"
              required
              value={formValues.guestCount}
              onChange={handleInputChange}
              aria-invalid={!!errors.guestCount}
              aria-describedby={errors.guestCount ? "error-guestCount" : undefined}
              className="w-full px-4 py-3 bg-[#F3EFEA] border border-[#161514]/20 text-[#161514] text-sm font-sans focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition-colors"
            >
              {CONTACT_GUEST_RANGES.map((range, idx) => (
                <option key={range} value={range} disabled={idx === 0}>
                  {range}
                </option>
              ))}
            </select>
            {errors.guestCount && (
              <p id="error-guestCount" className="text-xs text-red-700 font-sans mt-1">
                {errors.guestCount}
              </p>
            )}
          </div>
        </div>

        {/* Number of events */}
        <div className="space-y-2">
          <label htmlFor="field-eventCount" className="block text-xs font-semibold tracking-wider uppercase text-[#161514]">
            Number of events <span className="text-[#C5A880]">*</span>
          </label>
          <select
            id="field-eventCount"
            name="eventCount"
            required
            value={formValues.eventCount}
            onChange={handleInputChange}
            aria-invalid={!!errors.eventCount}
            aria-describedby={errors.eventCount ? "error-eventCount" : undefined}
            className="w-full px-4 py-3 bg-[#F3EFEA] border border-[#161514]/20 text-[#161514] text-sm font-sans focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition-colors"
          >
            {CONTACT_EVENT_COUNTS.map((cnt, idx) => (
              <option key={cnt} value={cnt} disabled={idx === 0}>
                {cnt === "Select event count" ? cnt : `${cnt} ${cnt === "1" ? "event" : "events"}`}
              </option>
            ))}
          </select>
          {errors.eventCount && (
            <p id="error-eventCount" className="text-xs text-red-700 font-sans mt-1">
              {errors.eventCount}
            </p>
          )}
        </div>
      </div>

      {/* SECTION 03 — WHAT YOU NEED */}
      <div className="space-y-6 pt-4">
        <div className="border-b border-[#161514]/15 pb-3">
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C5A880]">
            03 — WHAT YOU NEED
          </span>
          <h3 className="font-serif text-2xl font-light text-[#161514] mt-1">
            What would you like help with?
          </h3>
          <p className="text-xs text-[#5A5650] mt-1">Select all that apply</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="group" aria-label="Services you need help with">
          {CONTACT_SERVICE_INTERESTS.map((service) => {
            const isChecked = formValues.interests.includes(service);
            return (
              <button
                key={service}
                type="button"
                aria-pressed={isChecked}
                onClick={() => handleInterestToggle(service)}
                className={`flex items-center justify-between p-3.5 text-left text-xs font-medium transition-colors border ${
                  isChecked
                    ? "bg-[#161514] text-[#FAF8F5] border-[#161514]"
                    : "bg-[#F3EFEA] text-[#161514] border-[#161514]/15 hover:border-[#161514]/35"
                }`}
              >
                <span>{service}</span>
                <span
                  className={`w-4 h-4 rounded-none border flex items-center justify-center ml-2 transition-colors ${
                    isChecked
                      ? "border-[#C5A880] bg-[#C5A880] text-[#161514]"
                      : "border-[#161514]/30 bg-transparent"
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 04 — YOUR NOTE */}
      <div className="space-y-6 pt-4">
        <div className="border-b border-[#161514]/15 pb-3">
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C5A880]">
            04 — YOUR NOTE
          </span>
          <h3 className="font-serif text-2xl font-light text-[#161514] mt-1">
            Tell us more
          </h3>
        </div>

        <div className="space-y-2">
          <label htmlFor="field-notes" className="block text-xs font-semibold tracking-wider uppercase text-[#161514]">
            What are you imagining?
          </label>
          <textarea
            id="field-notes"
            name="notes"
            rows={4}
            value={formValues.notes}
            onChange={handleInputChange}
            placeholder="Tell us about the celebration, what matters most to you, or anything you'd like us to know..."
            className="w-full px-4 py-3 bg-[#F3EFEA] border border-[#161514]/20 text-[#161514] placeholder-[#5A5650]/50 text-sm font-sans focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition-colors resize-y"
          />
        </div>
      </div>

      {/* SECTION C — CONSENT & SUBMIT */}
      <div className="space-y-6 pt-6 border-t border-[#161514]/15">
        <div className="space-y-2">
          <label className="flex items-start gap-3 cursor-pointer select-none group">
            <input
              id="field-consent"
              name="consent"
              type="checkbox"
              required
              checked={formValues.consent}
              onChange={handleConsentToggle}
              aria-invalid={!!errors.consent}
              aria-describedby={errors.consent ? "error-consent" : undefined}
              className="mt-0.5 w-4 h-4 rounded-none border-[#161514]/30 accent-[#C5A880] focus:ring-[#C5A880]"
            />
            <span className="text-xs font-sans text-[#161514] font-medium leading-normal">
              I agree to be contacted about my enquiry. <span className="text-[#C5A880]">*</span>
            </span>
          </label>
          {errors.consent && (
            <p id="error-consent" className="text-xs text-red-700 font-sans pl-7">
              {errors.consent}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-8 py-4 bg-[#161514] text-[#FAF8F5] text-xs font-semibold tracking-[0.2em] uppercase inline-flex items-center justify-center gap-3 hover:bg-[#C5A880] hover:text-[#161514] disabled:opacity-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
        >
          <span>{isSubmitting ? "Processing..." : "Send Enquiry"}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
