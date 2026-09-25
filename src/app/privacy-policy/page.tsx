import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Privacy Policy | Wedora — Luxury Wedding & Vendor Platform",
  description:
    "Wedora's Privacy Policy details how we collect, store, protect, and manage account, wedding, guest, vendor, and payment transaction data.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "September 24, 2026";

  const sections = [
    { id: "introduction", title: "1. Introduction" },
    { id: "information-collected", title: "2. Information We Collect" },
    { id: "how-information-used", title: "3. How Information Is Used" },
    { id: "authentication-security", title: "4. Authentication & Account Security" },
    { id: "wedding-guest-vendor-data", title: "5. Wedding, Guest & Vendor Data" },
    { id: "messaging-enquiry-data", title: "6. Messaging and Enquiry Data" },
    { id: "payment-information", title: "7. Payment Information" },
    { id: "notifications-activity", title: "8. Notifications & Activity Logs" },
    { id: "data-sharing", title: "9. Data Sharing" },
    { id: "public-vendor-profiles", title: "10. Public Vendor Profiles" },
    { id: "data-retention", title: "11. Data Retention" },
    { id: "data-security", title: "12. Data Security" },
    { id: "user-rights", title: "13. User Rights & Data Requests" },
    { id: "cookies-storage", title: "14. Cookies & Local Storage" },
    { id: "third-party-services", title: "15. Third-Party Services" },
    { id: "changes-policy", title: "16. Changes to this Privacy Policy" },
    { id: "contact-information", title: "17. Contact Information" },
  ];

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#161514] pt-28 pb-24">
      {/* Header Section */}
      <section className="border-b border-[#161514]/10 pb-16">
        <Container size="md">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#C5A880]">
              Legal & Transparency
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-[#161514] tracking-tight">
              Privacy Policy
            </h1>
            <p className="font-sans text-sm md:text-base text-[#161514]/70 font-light leading-relaxed">
              Effective Date: {lastUpdated}
            </p>
            <p className="font-serif italic text-base sm:text-lg text-[#161514]/80 max-w-2xl mx-auto pt-2">
              At Wedora, we treat your wedding plans, guest communications, financial records, and vendor interactions with the highest degree of privacy, discretion, and technical security.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Content & Sidebar Layout */}
      <section className="pt-12 md:pt-16">
        <Container size="md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Table of Contents Sticky Sidebar */}
            <aside className="lg:col-span-4 hidden lg:block sticky top-28 p-6 bg-[#161514]/[0.02] border border-[#161514]/10 rounded-sm">
              <h2 className="font-serif text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A880] mb-4">
                Table of Contents
              </h2>
              <nav aria-label="Privacy Policy Table of Contents">
                <ul className="space-y-2 font-sans text-xs text-[#161514]/70">
                  {sections.map((sec) => (
                    <li key={sec.id}>
                      <a
                        href={`#${sec.id}`}
                        className="hover:text-[#C5A880] transition-colors block py-0.5"
                      >
                        {sec.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            {/* Main Policy Content Body */}
            <div className="lg:col-span-8 space-y-12 font-sans text-sm text-[#161514]/85 leading-relaxed">
              
              {/* Section 1 */}
              <section id="introduction" className="space-y-4 scroll-mt-28">
                <h2 className="font-serif text-2xl font-light text-[#161514] border-b border-[#161514]/10 pb-2">
                  1. Introduction
                </h2>
                <p>
                  Welcome to <strong>Wedora</strong> (&quot;Wedora&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). Wedora operates a premier luxury wedding planning platform connecting couples (&quot;Clients&quot;), wedding guests, and luxury service providers (&quot;Vendors&quot;).
                </p>
                <p>
                  This Privacy Policy outlines the categories of personal data we collect, how that information is processed, stored, and shared, and the privacy controls available to you when using our website, services, and mobile applications. By registering an account or browsing our platform, you acknowledge the terms described in this policy.
                </p>
              </section>

              {/* Section 2 */}
              <section id="information-collected" className="space-y-4 scroll-mt-28">
                <h2 className="font-serif text-2xl font-light text-[#161514] border-b border-[#161514]/10 pb-2">
                  2. Information We Collect
                </h2>
                <p>
                  We collect information necessary to deliver bespoke wedding planning workflows, facilitate vendor matching, execute bookings, and maintain audit logs. This includes:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Account Information:</strong> Full names, email addresses, phone numbers, password hashes, user roles (CLIENT, VENDOR, ADMIN), and profile avatar URLs.
                  </li>
                  <li>
                    <strong>Wedding Information:</strong> Partner names, wedding dates, total budget specifications, target location/city preferences, guest count estimates, and customized planning checklists.
                  </li>
                  <li>
                    <strong>Guest Information:</strong> Guest names, email addresses, RSVP status, dietary preferences, seating assignments, plus-one allocations, and associated sub-events.
                  </li>
                  <li>
                    <strong>Vendor Information:</strong> Business/studio names, service categories, pricing structures, portfolio image galleries, team member details, address/location details, and availability calendars.
                  </li>
                  <li>
                    <strong>Enquiry and Messaging Information:</strong> Messages, custom quotes, inquiry threads, message timestamps, attachments, and read receipts between Clients and Vendors.
                  </li>
                  <li>
                    <strong>Booking Information:</strong> Service packages selected, booking status, milestone dates, contract summaries, and payment schedules.
                  </li>
                  <li>
                    <strong>Payment Transaction Information:</strong> Internal ledger records including payment amounts (stored precisely in sub-units / paise), transaction status (PENDING, PAID, OVERDUE), due dates, receipt numbers, and associated booking IDs.
                  </li>
                  <li>
                    <strong>Technical &amp; Session Information:</strong> IP addresses, browser types, operating systems, session tokens, device descriptors, and request telemetry.
                  </li>
                </ul>
              </section>

              {/* Section 3 */}
              <section id="how-information-used" className="space-y-4 scroll-mt-28">
                <h2 className="font-serif text-2xl font-light text-[#161514] border-b border-[#161514]/10 pb-2">
                  3. How Information Is Used
                </h2>
                <p>
                  We use your personal and operational data exclusively to operate and enhance Wedora:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Fulfilling core planning functionality (budget tracking, RSVP management, vendor shortlisting, milestone tracking).</li>
                  <li>Facilitating secure, role-isolated communications between couples and verified luxury vendors.</li>
                  <li>Processing financial transaction ledgers and maintaining double-entry accounting accuracy for vendor payouts and client milestone tracking.</li>
                  <li>Sending transaction notifications, security alerts, and activity log updates.</li>
                  <li>Monitoring platform health, security compliance, and preventing unauthorized access.</li>
                </ul>
              </section>

              {/* Section 4 */}
              <section id="authentication-security" className="space-y-4 scroll-mt-28">
                <h2 className="font-serif text-2xl font-light text-[#161514] border-b border-[#161514]/10 pb-2">
                  4. Authentication &amp; Account Security
                </h2>
                <p>
                  Wedora utilizes enterprise-grade authentication powered by Supabase Auth and JSON Web Tokens (JWT). Passwords are hashed securely using industry-standard algorithms and are never stored in plain text.
                </p>
                <p>
                  Role Isolation is strictly enforced: CLIENT account data, guest lists, and financial ledgers cannot be queried by unauthorized users or cross-accessed by unrelated Vendors.
                </p>
              </section>

              {/* Section 5 */}
              <section id="wedding-guest-vendor-data" className="space-y-4 scroll-mt-28">
                <h2 className="font-serif text-2xl font-light text-[#161514] border-b border-[#161514]/10 pb-2">
                  5. Wedding, Guest &amp; Vendor Data
                </h2>
                <p>
                  Your guest list, dietary records, seating arrangements, and personal wedding notes remain private to your account unless you explicitly share details with co-planners or assigned vendors.
                </p>
                <p>
                  Vendor account details submitted for public listing (such as studio description, portfolio galleries, and baseline package pricing) are displayed publicly in the Wedora directory. Private contact details (such as personal phone numbers) can be adjusted via Vendor Privacy Controls in the dashboard.
                </p>
              </section>

              {/* Section 6 */}
              <section id="messaging-enquiry-data" className="space-y-4 scroll-mt-28">
                <h2 className="font-serif text-2xl font-light text-[#161514] border-b border-[#161514]/10 pb-2">
                  6. Messaging and Enquiry Data
                </h2>
                <p>
                  Enquiries, price negotiations, and messages sent between Clients and Vendors are stored securely in Wedora&apos;s encrypted database. Messages are accessible only to the participating parties and authorized platform system routines responsible for delivering notifications.
                </p>
              </section>

              {/* Section 7 */}
              <section id="payment-information" className="space-y-4 scroll-mt-28">
                <h2 className="font-serif text-2xl font-light text-[#161514] border-b border-[#161514]/10 pb-2">
                  7. Payment Information
                </h2>
                <div className="bg-[#161514]/[0.03] p-4 border-l-2 border-[#C5A880]">
                  <p className="font-medium text-[#161514]">
                    Financial Data Isolation Statement:
                  </p>
                  <p className="mt-1 text-xs text-[#161514]/80">
                    Wedora records payment transaction metadata, milestone statuses, and financial totals formatted in exact integer sub-units (paise/cents) to ensure zero floating-point rounding errors. Wedora does <strong>NOT</strong> collect, store, or process credit card numbers, CVV codes, bank account credentials, or raw payment gateway secrets on our servers.
                  </p>
                </div>
                <p>
                  All external card processing and banking integrations, when active, are executed via PCI-DSS Compliant Third-Party Payment Gateways.
                </p>
              </section>

              {/* Section 8 */}
              <section id="notifications-activity" className="space-y-4 scroll-mt-28">
                <h2 className="font-serif text-2xl font-light text-[#161514] border-b border-[#161514]/10 pb-2">
                  8. Notifications &amp; Activity Logs
                </h2>
                <p>
                  To keep your planning timeline synchronized, Wedora generates automated notifications and activity audit logs for events such as:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>New vendor enquiries and response status changes</li>
                  <li>Contract or booking milestone updates</li>
                  <li>Payment schedule deadlines and receipt verifications</li>
                  <li>RSVP updates from wedding guests</li>
                </ul>
              </section>

              {/* Section 9 */}
              <section id="data-sharing" className="space-y-4 scroll-mt-28">
                <h2 className="font-serif text-2xl font-light text-[#161514] border-b border-[#161514]/10 pb-2">
                  9. Data Sharing
                </h2>
                <p>
                  Wedora does <strong>NOT</strong> sell, rent, or trade your personal information to third-party data brokers or marketing agencies. Data is shared strictly under the following conditions:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>With Vendors:</strong> When a Client submits an enquiry or confirms a booking with a vendor, relevant contact and event details are shared with that vendor to fulfill the request.
                  </li>
                  <li>
                    <strong>Infrastructure Service Providers:</strong> Secure database hosting, authentication providers (Supabase), and cloud infrastructure providers under strict confidentiality protocols.
                  </li>
                  <li>
                    <strong>Legal Compliance:</strong> If required by law, subpoena, or valid legal process.
                  </li>
                </ul>
              </section>

              {/* Section 10 */}
              <section id="public-vendor-profiles" className="space-y-4 scroll-mt-28">
                <h2 className="font-serif text-2xl font-light text-[#161514] border-b border-[#161514]/10 pb-2">
                  10. Public Vendor Profiles
                </h2>
                <p>
                  Information published by Vendors within their studio listing—such as business descriptions, showcase images, starting package pricing, and public reviews—is visible to all platform visitors and indexed by search engines.
                </p>
              </section>

              {/* Section 11 */}
              <section id="data-retention" className="space-y-4 scroll-mt-28">
                <h2 className="font-serif text-2xl font-light text-[#161514] border-b border-[#161514]/10 pb-2">
                  11. Data Retention
                </h2>
                <p>
                  We retain personal data as long as your account remains active or as needed to provide our services. You may request account deactivation or data deletion at any time. Financial transaction records may be retained longer as required by applicable tax and accounting laws.
                </p>
              </section>

              {/* Section 12 */}
              <section id="data-security" className="space-y-4 scroll-mt-28">
                <h2 className="font-serif text-2xl font-light text-[#161514] border-b border-[#161514]/10 pb-2">
                  12. Data Security
                </h2>
                <p>
                  We enforce technical safeguards including Transport Layer Security (TLS 1.3/HTTPS), database Row Level Security (RLS), service-role credential isolation, and stringent input validation to protect your information against unauthorized access, loss, or alteration.
                </p>
              </section>

              {/* Section 13 */}
              <section id="user-rights" className="space-y-4 scroll-mt-28">
                <h2 className="font-serif text-2xl font-light text-[#161514] border-b border-[#161514]/10 pb-2">
                  13. User Rights &amp; Data Requests
                </h2>
                <p>
                  Depending on your jurisdiction, you possess the right to:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Access a copy of your personal data held by Wedora</li>
                  <li>Rectify inaccurate or incomplete account details</li>
                  <li>Request erasure of your personal data (&quot;Right to be Forgotten&quot;)</li>
                  <li>Export your wedding budget, guest list, or vendor contacts</li>
                  <li>Opt out of non-essential operational communications</li>
                </ul>
              </section>

              {/* Section 14 */}
              <section id="cookies-storage" className="space-y-4 scroll-mt-28">
                <h2 className="font-serif text-2xl font-light text-[#161514] border-b border-[#161514]/10 pb-2">
                  14. Cookies &amp; Local Storage
                </h2>
                <p>
                  Wedora uses essential HTTP cookies and browser LocalStorage exclusively for maintaining authenticated sessions, security CSRF protection, and user interface preferences (such as dashboard layout states). We do not deploy invasive third-party tracking cookies.
                </p>
              </section>

              {/* Section 15 */}
              <section id="third-party-services" className="space-y-4 scroll-mt-28">
                <h2 className="font-serif text-2xl font-light text-[#161514] border-b border-[#161514]/10 pb-2">
                  15. Third-Party Services
                </h2>
                <p>
                  Wedora integrates with trusted infrastructure partners to provide platform services, notably:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Supabase:</strong> Cloud database, authentication, and security token management.</li>
                  <li><strong>Vercel / Cloud Infrastructure:</strong> Edge hosting, serverless execution, and asset delivery.</li>
                </ul>
              </section>

              {/* Section 16 */}
              <section id="changes-policy" className="space-y-4 scroll-mt-28">
                <h2 className="font-serif text-2xl font-light text-[#161514] border-b border-[#161514]/10 pb-2">
                  16. Changes to this Privacy Policy
                </h2>
                <p>
                  We may update this Privacy Policy periodically to reflect changes in legal requirements or platform updates. Material changes will be communicated via email or prominent notice within the Wedora dashboard prior to taking effect.
                </p>
              </section>

              {/* Section 17 */}
              <section id="contact-information" className="space-y-4 scroll-mt-28 border-t border-[#161514]/10 pt-8">
                <h2 className="font-serif text-2xl font-light text-[#161514]">
                  17. Contact Information
                </h2>
                <p>
                  For privacy inquiries, data protection requests, or security disclosures, please reach out to our privacy compliance desk:
                </p>
                <div className="p-6 bg-[#161514]/[0.03] border border-[#161514]/10 space-y-2 font-mono text-xs">
                  <p><strong>Entity Name:</strong> [Company Legal Name]</p>
                  <p><strong>Registered Address:</strong> [Registered Business Address]</p>
                  <p><strong>Privacy Contact Email:</strong> privacy@[domain.com] / [Support Email]</p>
                  <p><strong>Concierge Contact Page:</strong> <Link href="/contact" className="underline hover:text-[#C5A880] text-sans font-normal">wedora.com/contact</Link></p>
                </div>
              </section>

            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
