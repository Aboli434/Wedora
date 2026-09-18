"use client";

import React, { useState } from "react";
import {
  VendorBooking,
  BookingStatus,
  BookingSource,
  BookingDateStatus,
  BookingPaymentStatus,
} from "@/data/vendorBookings";
import { X, Check } from "lucide-react";

interface BookingEditorProps {
  isOpen: boolean;
  onClose: () => void;
  bookingToEdit?: VendorBooking | null;
  onSave: (booking: Partial<VendorBooking>) => void;
}

export const BookingEditor: React.FC<BookingEditorProps> = ({
  isOpen,
  onClose,
  bookingToEdit,
  onSave,
}) => {
  const isEdit = !!bookingToEdit;

  const [coupleName, setCoupleName] = useState(bookingToEdit?.coupleName || "");
  const [partnerName, setPartnerName] = useState(bookingToEdit?.partnerName || "");
  const [email, setEmail] = useState(bookingToEdit?.email || "");
  const [phone, setPhone] = useState(bookingToEdit?.phone || "");
  const [weddingDate, setWeddingDate] = useState(bookingToEdit?.weddingDate || "");
  const [weddingDateStatus, setWeddingDateStatus] = useState<BookingDateStatus>(
    bookingToEdit?.weddingDateStatus || "CONFIRMED"
  );
  const [destination, setDestination] = useState(bookingToEdit?.destination || "Mumbai");
  const [venue, setVenue] = useState(bookingToEdit?.venue || "");
  const [guestCount, setGuestCount] = useState<number | undefined>(
    bookingToEdit?.guestCount || 150
  );

  const [serviceName, setServiceName] = useState(
    bookingToEdit?.serviceName || "Wedding Photography & Cinematography"
  );
  const [packageName, setPackageName] = useState(
    bookingToEdit?.packageName || "Signature Luxury Package"
  );

  const [totalAmount, setTotalAmount] = useState<number>(
    bookingToEdit?.totalAmount || 3500000
  );
  const [amountReceived, setAmountReceived] = useState<number>(
    bookingToEdit?.amountReceived || 1000000
  );
  const [nextPaymentDue, setNextPaymentDue] = useState(
    bookingToEdit?.nextPaymentDue || "2026-11-15"
  );
  const [nextPaymentAmount, setNextPaymentAmount] = useState<number>(
    bookingToEdit?.nextPaymentAmount || 1500000
  );

  const [bookingStatus, setBookingStatus] = useState<BookingStatus>(
    bookingToEdit?.bookingStatus || "CONFIRMED"
  );
  const [source, setSource] = useState<BookingSource>(
    bookingToEdit?.source || "DIRECT"
  );
  const [notes, setNotes] = useState(bookingToEdit?.notes || "");

  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coupleName.trim()) {
      setError("Couple name is required.");
      return;
    }
    if (!email.trim()) {
      setError("Email address is required.");
      return;
    }
    if (!weddingDate && weddingDateStatus === "CONFIRMED") {
      setError("Wedding date is required when date status is CONFIRMED.");
      return;
    }
    if (totalAmount <= 0) {
      setError("Total contract amount must be greater than 0.");
      return;
    }
    if (amountReceived > totalAmount) {
      setError("Amount received cannot exceed total contract amount.");
      return;
    }

    let pStatus: BookingPaymentStatus = "NOT_STARTED";
    if (amountReceived >= totalAmount) {
      pStatus = "PAID";
    } else if (amountReceived > 0) {
      pStatus = "PARTIALLY_PAID";
    }

    setError(null);
    onSave({
      id: bookingToEdit?.id,
      coupleName,
      partnerName,
      email,
      phone,
      weddingDate,
      weddingDateStatus,
      destination,
      venue,
      guestCount,
      serviceName,
      packageName,
      totalAmount,
      amountReceived,
      amountOutstanding: Math.max(0, totalAmount - amountReceived),
      nextPaymentDue,
      nextPaymentAmount,
      bookingStatus,
      paymentStatus: pStatus,
      source,
      notes,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#161514]/60 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-[#FAF8F5] border border-[#161514]/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#161514]/10">
          <div>
            <span className="text-[10px] font-semibold tracking-[0.2em] text-[#C5A880] uppercase">
              {isEdit ? "EDIT BOOKING DOSSIER" : "NEW BOOKING ENTRY"}
            </span>
            <h3 className="font-serif text-2xl font-medium text-[#161514]">
              {isEdit ? `Edit ${bookingToEdit.bookingReference}` : "Create Contract Booking"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#161514] hover:bg-[#161514]/10 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Couple & Partner */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="booking-couple-name" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                Couple Primary Name *
              </label>
              <input
                id="booking-couple-name"
                type="text"
                required
                value={coupleName}
                onChange={(e) => setCoupleName(e.target.value)}
                placeholder="e.g. Aditi Sharma"
                className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
            </div>
            <div>
              <label htmlFor="booking-partner-name" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                Partner Name
              </label>
              <input
                id="booking-partner-name"
                type="text"
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                placeholder="e.g. Arjun Kapoor"
                className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="booking-email" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                Email Address *
              </label>
              <input
                id="booking-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="couple@weddingdemo.in"
                className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
            </div>
            <div>
              <label htmlFor="booking-phone" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                Phone Number
              </label>
              <input
                id="booking-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98200 00000"
                className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
            </div>
          </div>

          {/* Date & Date Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="booking-wedding-date" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                Wedding Date *
              </label>
              <input
                id="booking-wedding-date"
                type="date"
                value={weddingDate}
                onChange={(e) => setWeddingDate(e.target.value)}
                className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
            </div>
            <div>
              <label htmlFor="booking-date-status" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                Date Status
              </label>
              <select
                id="booking-date-status"
                value={weddingDateStatus}
                onChange={(e) =>
                  setWeddingDateStatus(e.target.value as BookingDateStatus)
                }
                className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              >
                <option value="CONFIRMED">Confirmed Date</option>
                <option value="FLEXIBLE">Flexible Dates</option>
              </select>
            </div>
          </div>

          {/* Destination & Venue */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label htmlFor="booking-destination" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                Destination
              </label>
              <input
                id="booking-destination"
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. Udaipur"
                className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
            </div>
            <div>
              <label htmlFor="booking-venue" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                Venue
              </label>
              <input
                id="booking-venue"
                type="text"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="e.g. Jagmandir Island Palace"
                className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
            </div>
            <div>
              <label htmlFor="booking-guest-count" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                Guest Count
              </label>
              <input
                id="booking-guest-count"
                type="number"
                value={guestCount || ""}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                placeholder="150"
                className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
            </div>
          </div>

          {/* Service & Package */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="booking-service-name" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                Service Title
              </label>
              <input
                id="booking-service-name"
                type="text"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
            </div>
            <div>
              <label htmlFor="booking-package-name" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                Package Name
              </label>
              <input
                id="booking-package-name"
                type="text"
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
                className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
            </div>
          </div>

          {/* Financials */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-white border border-[#161514]/10">
            <div>
              <label htmlFor="booking-total-amount" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                Total Contract Amount (₹) *
              </label>
              <input
                id="booking-total-amount"
                type="number"
                required
                value={totalAmount}
                onChange={(e) => setTotalAmount(Number(e.target.value))}
                className="w-full p-2.5 bg-[#FAF8F5] border border-[#161514]/20 font-medium text-sm focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
            </div>
            <div>
              <label htmlFor="booking-amount-received" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                Amount Received to Date (₹)
              </label>
              <input
                id="booking-amount-received"
                type="number"
                value={amountReceived}
                onChange={(e) => setAmountReceived(Number(e.target.value))}
                className="w-full p-2.5 bg-[#FAF8F5] border border-[#161514]/20 font-medium text-sm focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
            </div>
            <div>
              <label htmlFor="booking-next-payment-due" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                Next Payment Due Date
              </label>
              <input
                id="booking-next-payment-due"
                type="date"
                value={nextPaymentDue}
                onChange={(e) => setNextPaymentDue(e.target.value)}
                className="w-full p-2.5 bg-[#FAF8F5] border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
            </div>
            <div>
              <label htmlFor="booking-next-payment-amount" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                Next Payment Due Amount (₹)
              </label>
              <input
                id="booking-next-payment-amount"
                type="number"
                value={nextPaymentAmount}
                onChange={(e) => setNextPaymentAmount(Number(e.target.value))}
                className="w-full p-2.5 bg-[#FAF8F5] border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
            </div>
          </div>

          {/* Status & Source */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="booking-status-select" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                Booking Status
              </label>
              <select
                id="booking-status-select"
                value={bookingStatus}
                onChange={(e) => setBookingStatus(e.target.value as BookingStatus)}
                className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              >
                <option value="INQUIRY">Hold / Inquiry</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
            <div>
              <label htmlFor="booking-source-select" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                Lead Source
              </label>
              <select
                id="booking-source-select"
                value={source}
                onChange={(e) => setSource(e.target.value as BookingSource)}
                className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              >
                <option value="ENQUIRY">Enquiry Conversion</option>
                <option value="WEDORA">Wedora Network</option>
                <option value="PUBLIC_PROFILE">Public Profile</option>
                <option value="DIRECT">Direct Client</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="booking-notes-textarea" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
              Internal Notes
            </label>
            <textarea
              id="booking-notes-textarea"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Internal vendor notes, crew logistics, or special shoot instructions..."
              className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
            />
          </div>

          {/* Form buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#161514]/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#161514]/20 text-[#161514]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#161514] text-[#FAF8F5] font-medium uppercase tracking-wider"
            >
              <Check className="w-4 h-4 text-[#C5A880]" />
              {isEdit ? "Update Dossier" : "Save Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
