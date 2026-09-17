"use client";

import React, { useState, useEffect } from "react";
import {
  DashboardVendor,
  VendorCategory,
  VendorStatus,
  PaymentStatus,
  VendorEvent,
} from "@/data/vendorsDashboard";
import { X, Check } from "lucide-react";

interface AddVendorFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAddVendor: (newVendor: DashboardVendor) => void;
}

export function AddVendorForm({
  isOpen,
  onClose,
  onAddVendor,
}: AddVendorFormProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<VendorCategory>("PHOTOGRAPHY");
  const [location, setLocation] = useState("Udaipur");
  const [description, setDescription] = useState("");
  const [event, setEvent] = useState<VendorEvent>("ALL_EVENTS");
  const [status, setStatus] = useState<VendorStatus>("BOOKED");
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("PARTIAL");
  const [amountStr, setAmountStr] = useState("");
  const [amountPaidStr, setAmountPaidStr] = useState("");
  const [nextAction, setNextAction] = useState("");
  const [nextActionDate, setNextActionDate] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [notes, setNotes] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!name.trim()) {
      errs.name = "Vendor name is required.";
    }

    if (!location.trim()) {
      errs.location = "Vendor location is required.";
    }

    const amt = amountStr !== "" ? parseFloat(amountStr) : undefined;
    const paid = amountPaidStr !== "" ? parseFloat(amountPaidStr) : undefined;

    if (amt !== undefined && (isNaN(amt) || amt < 0)) {
      errs.amount = "Total fee must be a valid positive amount.";
    }

    if (paid !== undefined && (isNaN(paid) || paid < 0)) {
      errs.amountPaid = "Amount paid must be a valid positive amount.";
    }

    if (amt !== undefined && paid !== undefined && paid > amt) {
      errs.amountPaid = "Amount paid cannot exceed total fee amount.";
    }

    if (contactEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
      errs.contactEmail = "Please enter a valid email address.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const amt = amountStr !== "" ? parseFloat(amountStr) : undefined;
    const paid = amountPaidStr !== "" ? parseFloat(amountPaidStr) : undefined;

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const newVendor: DashboardVendor = {
      id: `v-custom-${Date.now()}`,
      slug: slug || "custom-vendor",
      name: name.trim(),
      category,
      location: location.trim(),
      description: description.trim() || `${name} luxury ${category.toLowerCase()} services for celebration.`,
      imageSrc: "/images/wedding/wedora-vendor-frame-house.jpg",
      imageAlt: `${name} luxury vendor service`,
      status,
      paymentStatus,
      event,
      contactName: contactName.trim() || undefined,
      contactEmail: contactEmail.trim() || undefined,
      contactPhone: contactPhone.trim() || undefined,
      bookingDate: status === "BOOKED" ? new Date().toISOString().split("T")[0] : undefined,
      nextAction: nextAction.trim() || undefined,
      nextActionDate: nextActionDate || undefined,
      notes: notes.trim() || undefined,
      amount: amt,
      amountPaid: paid,
      enquirySentAt: status === "ENQUIRY_SENT" ? new Date().toISOString().split("T")[0] : undefined,
      updatedAt: new Date().toISOString().split("T")[0],
    };

    onAddVendor(newVendor);
    setSuccessMessage(true);

    setTimeout(() => {
      setSuccessMessage(false);
      // Reset form
      setName("");
      setCategory("PHOTOGRAPHY");
      setLocation("Udaipur");
      setDescription("");
      setEvent("ALL_EVENTS");
      setStatus("BOOKED");
      setPaymentStatus("PARTIAL");
      setAmountStr("");
      setAmountPaidStr("");
      setNextAction("");
      setNextActionDate("");
      setContactName("");
      setContactEmail("");
      setContactPhone("");
      setNotes("");
      setErrors({});
      onClose();
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-vendor-title"
    >
      <div className="bg-[#FAF8F5] border border-[#161514]/20 w-full max-w-2xl my-8 p-6 sm:p-8 space-y-6 shadow-2xl relative">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#161514]/15 pb-4">
          <div className="space-y-1">
            <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold">
              RECORD VENDOR
            </span>
            <h2 id="add-vendor-title" className="font-serif text-2xl text-[#161514] font-light">
              Add Vendor to Workspace
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1 text-[#5A5650] hover:text-[#161514] transition-colors focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Demo Notice */}
        <div className="p-3 bg-[#161514]/5 border border-[#161514]/10 text-xs font-sans text-[#5A5650]">
          <strong>Note:</strong> Record external vendor contracts or shortlist partners. Data updates your local demo session in real-time.
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div className="p-3 bg-[#2D4A3E]/10 border border-[#2D4A3E]/30 text-[#2D4A3E] text-xs font-sans flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>Vendor successfully recorded in your workspace!</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Vendor Name */}
            <div className="sm:col-span-2 space-y-1.5">
              <label className="block text-xs font-sans uppercase tracking-wider text-[#161514] font-medium">
                Vendor Name <span className="text-[#C5A880]">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Royal Strings Quartet"
                className="w-full px-3 py-2.5 bg-white border border-[#161514]/15 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
              {errors.name && (
                <p className="text-[11px] text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <label className="block text-xs font-sans uppercase tracking-wider text-[#161514] font-medium">
                Category <span className="text-[#C5A880]">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as VendorCategory)}
                className="w-full px-3 py-2.5 bg-white border border-[#161514]/15 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              >
                <option value="PLANNING">Planning</option>
                <option value="PHOTOGRAPHY">Photography</option>
                <option value="DECOR">Decor & Design</option>
                <option value="VENUE">Venue</option>
                <option value="CATERING">Catering</option>
                <option value="MUSIC">Music & Entertainment</option>
                <option value="BRIDAL">Bridal & Couture</option>
                <option value="MAKEUP">Makeup & Hair</option>
                <option value="TRAVEL">Travel & Logistics</option>
                <option value="OTHER">Other Services</option>
              </select>
            </div>

            {/* Location */}
            <div className="space-y-1.5">
              <label className="block text-xs font-sans uppercase tracking-wider text-[#161514] font-medium">
                Location <span className="text-[#C5A880]">*</span>
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Udaipur, Rajasthan"
                className="w-full px-3 py-2.5 bg-white border border-[#161514]/15 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
              {errors.location && (
                <p className="text-[11px] text-red-600">{errors.location}</p>
              )}
            </div>

            {/* Event Association */}
            <div className="space-y-1.5">
              <label className="block text-xs font-sans uppercase tracking-wider text-[#161514] font-medium">
                Associated Function <span className="text-[#C5A880]">*</span>
              </label>
              <select
                value={event}
                onChange={(e) => setEvent(e.target.value as VendorEvent)}
                className="w-full px-3 py-2.5 bg-white border border-[#161514]/15 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              >
                <option value="ALL_EVENTS">All Wedding Functions</option>
                <option value="MEHENDI">Mehendi & Sangeet</option>
                <option value="HALDI">Haldi Celebration</option>
                <option value="WEDDING">Wedding Ceremony</option>
                <option value="RECEPTION">Grand Reception</option>
              </select>
            </div>

            {/* Booking Status */}
            <div className="space-y-1.5">
              <label className="block text-xs font-sans uppercase tracking-wider text-[#161514] font-medium">
                Booking Status <span className="text-[#C5A880]">*</span>
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as VendorStatus)}
                className="w-full px-3 py-2.5 bg-white border border-[#161514]/15 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              >
                <option value="BOOKED">Booked</option>
                <option value="NEGOTIATING">Negotiating</option>
                <option value="ENQUIRY_SENT">Enquiry Sent</option>
                <option value="SHORTLISTED">Shortlisted</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>

            {/* Payment Status */}
            <div className="space-y-1.5">
              <label className="block text-xs font-sans uppercase tracking-wider text-[#161514] font-medium">
                Payment Status <span className="text-[#C5A880]">*</span>
              </label>
              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value as PaymentStatus)}
                className="w-full px-3 py-2.5 bg-white border border-[#161514]/15 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              >
                <option value="PARTIAL">Deposit Paid</option>
                <option value="PAID">Fully Paid</option>
                <option value="DUE">Payment Due</option>
                <option value="NOT_STARTED">Not Started</option>
              </select>
            </div>

            {/* Total Amount Fee */}
            <div className="space-y-1.5">
              <label className="block text-xs font-sans uppercase tracking-wider text-[#161514] font-medium">
                Total Contract Amount (₹)
              </label>
              <input
                type="number"
                value={amountStr}
                onChange={(e) => setAmountStr(e.target.value)}
                placeholder="e.g. 350000"
                className="w-full px-3 py-2.5 bg-white border border-[#161514]/15 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
              {errors.amount && (
                <p className="text-[11px] text-red-600">{errors.amount}</p>
              )}
            </div>

            {/* Amount Paid */}
            <div className="space-y-1.5">
              <label className="block text-xs font-sans uppercase tracking-wider text-[#161514] font-medium">
                Amount Paid So Far (₹)
              </label>
              <input
                type="number"
                value={amountPaidStr}
                onChange={(e) => setAmountPaidStr(e.target.value)}
                placeholder="e.g. 175000"
                className="w-full px-3 py-2.5 bg-white border border-[#161514]/15 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
              {errors.amountPaid && (
                <p className="text-[11px] text-red-600">{errors.amountPaid}</p>
              )}
            </div>

            {/* Next Action */}
            <div className="space-y-1.5">
              <label className="block text-xs font-sans uppercase tracking-wider text-[#161514] font-medium">
                Next Action / Milestone
              </label>
              <input
                type="text"
                value={nextAction}
                onChange={(e) => setNextAction(e.target.value)}
                placeholder="e.g. Review menu tasting options"
                className="w-full px-3 py-2.5 bg-white border border-[#161514]/15 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
            </div>

            {/* Next Action Date */}
            <div className="space-y-1.5">
              <label className="block text-xs font-sans uppercase tracking-wider text-[#161514] font-medium">
                Target Action Date
              </label>
              <input
                type="date"
                value={nextActionDate}
                onChange={(e) => setNextActionDate(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-[#161514]/15 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
            </div>

            {/* Contact Name & Email */}
            <div className="space-y-1.5">
              <label className="block text-xs font-sans uppercase tracking-wider text-[#161514] font-medium">
                Contact Person (Optional)
              </label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="e.g. Vikramaditya Singh"
                className="w-full px-3 py-2.5 bg-white border border-[#161514]/15 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-sans uppercase tracking-wider text-[#161514] font-medium">
                Contact Email (Optional)
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="vendor@example.com"
                className="w-full px-3 py-2.5 bg-white border border-[#161514]/15 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
              {errors.contactEmail && (
                <p className="text-[11px] text-red-600">{errors.contactEmail}</p>
              )}
            </div>
          </div>

          {/* Notes */}
          <div className="border-t border-[#161514]/10 pt-4 space-y-1.5">
            <label className="block text-xs font-sans uppercase tracking-wider text-[#161514] font-medium">
              Notes & Special Instructions (Optional)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Deposit agreement signed. Needs acoustic setup at 5 PM."
              className="w-full px-3 py-2 bg-white border border-[#161514]/15 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
            />
          </div>

          {/* Buttons */}
          <div className="border-t border-[#161514]/15 pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-[#161514]/20 text-xs font-sans uppercase tracking-wider text-[#5A5650] hover:text-[#161514] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#161514] text-[#FAF8F5] text-xs font-medium uppercase tracking-[0.15em] hover:bg-[#C5A880] hover:text-[#161514] transition-all duration-300 shadow-sm"
            >
              Save Vendor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
