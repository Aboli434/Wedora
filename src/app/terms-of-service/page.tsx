import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Terms of Service | Wedora — Luxury Wedding & Vendor Platform",
  description:
    "Wedora's Terms of Service outline the rules, account obligations, booking terms, payment protocols, and platform usage policies for Clients and Vendors.",
};

export default function TermsOfServicePage() {
  const lastUpdated = "September 24, 2026";

  const sections = [
    { id: "introduction", title: "1. Introduction" },
    { id: "acceptance", title: "2. Acceptance of Terms" },
    { id: "account-registration", title: "3. Account Registration" },
    { id: "client-accounts", title: "4. Client Accounts" },
    { id: "vendor-accounts", title: "5. Vendor Accounts" },
    { id: "planning-features", title: "6. Wedding Planning Features" },
    { id: "vendor-listings", title: "7. Vendor Listings & Public Profiles" },
    { id: "enquiries-messaging", title: "8. Enquiries & Messaging" },
    { id: "bookings", title: "9. Bookings & Contracts" },
    { id: "payment-transactions", title: "10. Payment Transactions" },
    { id: "reviews-content", title: "11. Reviews & User Content" },
    { id: "prohibited-use", title: "12. Prohibited Use" },
    { id: "suspension-termination", title: "13. Account Suspension & Termination" },
    { id: "third-party-services", title: "14. Third-Party Services" },
    { id: "intellectual-property", title: "15. Intellectual Property" },
    { id: "disclaimer", title: "16. Disclaimer of Warranties" },
    { id: "limitation-liability", title: "17. Limitation of Liability" },
    { id: "changes-terms", title: "18. Changes to Terms" },
    { id: "governing-law", title: "19. Governing Law & Jurisdiction" },
  ];

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#161514] pt-28 pb-24">
      {/* Header Section */}
      <section className="border-b border-[#161514]/10 pb-16">
        <Container size="md">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#C5A880]">
              Terms of Use
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-[#161514] tracking-tight">
              Terms of Service
            </h1>
            <p className="font-sans text-sm md:text-base text-[#161514]/70 font-light leading-relaxed">
              Effective Date: {lastUpdated}
            </p>
            <p className="font-serif italic text-base sm:text-lg text-[#161514]/80 max-w-2xl mx-auto pt-2">
              Please read these Terms of Service carefully before accessing or using Wedora. They govern your access to our luxury wedding planning ecosystem, vendor directory, and messaging infrastructure.
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
              <nav aria-label="Terms of Service Table of Contents">
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

            {/* Main Terms Content Body */}
            <div className="lg:col-span-8 space-y-12 font-sans text-sm text-[#161514]/85 leading-relaxed">

              {/* Section 1 */}
              <section id="introduction" className="space-y-4 scroll-mt-28">
                <h2 className="font-serif text-2xl font-light text-[#161514] border-b border-[#161514]/10 pb-2">
                  1. Introduction
                </h2>
                <p>
                  Welcome to <strong>Wedora</strong>. These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you (&quot;User&quot;, &quot;Client&quot;, or &quot;Vendor&quot;) and Wedora regarding your use of the Wedora website, mobile web applications, planning software, and vendor marketplace services.
                </p>
              </section>

              {/* Section 2 */}
              <section id="acceptance" className="space-y-4 scroll-mt-28">
                <h2 className="font-serif text-2xl font-light text-[#161514] border-b border-[#161514]/10 pb-2">
                  2. Acceptance of Terms
                </h2>
                <p>
                  By creating an account, browsing vendor portfolios, submitting enquiries, or accessing any service provided by Wedora, you explicitly agree to comply with and be bound by these Terms and our Privacy Policy. If you do not agree to these terms, you must refrain from using the platform.
                </p>
              </section>

              {/* Section 3 */}
              <section id="account-registration" className="space-y-4 scroll-mt-28">
                <h2 className="font-serif text-2xl font-light text-[#161514] border-b border-[#161514]/10 pb-2">
                  3. Account Registration
                </h2>
                <p>
                  To access key planning features or list vendor services, you must register an account. You represent and warrant that:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>You are at least 18 years of age and possess full legal capacity to enter contracts.</li>
                  <li>All registration details provided (email, name, role) are accurate and kept up to date.</li>
                  <li>You are responsible for maintaining the confidentiality of your login credentials and for all activities under your account.</li>
                </ul>
              </section>

              {/* Section 4 */}
              <section id="client-accounts" className="space-y-4 scroll-mt-28">
                <h2 className="font-serif text-2xl font-light text-[#161514] border-b border-[#161514]/10 pb-2">
                  4. Client Accounts
                </h2>
                <p>
                  Client accounts are designed for engaged couples and authorized wedding planners. Clients gain access to luxury planning suite tools including budget allocation calculators, sub-event management, guest RSVP lists, vendor shortlisting, and direct messaging. Clients are responsible for ensuring guest data uploaded to the platform complies with applicable privacy consents.
                </p>
              </section>

              {/* Section 5 */}
              <section id="vendor-accounts" className="space-y-4 scroll-mt-28">
                <h2 className="font-serif text-2xl font-light text-[#161514] border-b border-[#161514]/10 pb-2">
                  5. Vendor Accounts
                </h2>
                <p>
                  Vendor accounts are reserved for verified wedding professionals (photographers, venue managers, couture designers, caterers, decorators, planners, and entertainment artists). Vendors warrant that all portfolio assets, credentials, pricing starting rates, and business licenses presented are genuine, non-misleading, and legally owned or licensed by the vendor.
                </p>
              </section>

              {/* Section 6 */}
              <section id="planning-features" className="space-y-4 scroll-mt-28">
                <h2 className="font-serif text-2xl font-light text-[#161514] border-b border-[#161514]/10 pb-2">
                  6. Wedding Planning Features
                </h2>
                <p>
                  Wedora provides interactive planning modules (e.g., budget calculations, expense breakdowns, vendor payment milestone tracking). While calculations use integer financial precision to ensure mathematical accuracy, users acknowledge that budget allocations serve as organizational estimates and do not guarantee final vendor quotations.
                </p>
              </section>

              {/* Section 7 */}
              <section id="vendor-listings" className="space-y-4 scroll-mt-28">
                <h2 className="font-serif text-2xl font-light text-[#161514] border-b border-[#161514]/10 pb-2">
                  7. Vendor Listings &amp; Public Profiles
                </h2>
                <p>
                  Vendors control their public studio profile details, photo galleries, FAQs, and service tiers. Wedora reserves the right to review, edit for typography/formatting, or unpublish listings that violate quality standards or copyright policies.
                </p>
              </section>

              {/* Section 8 */}
              <section id="enquiries-messaging" className="space-y-4 scroll-mt-28">
                <h2 className="font-serif text-2xl font-light text-[#161514] border-b border-[#161514]/10 pb-2">
                  8. Enquiries &amp; Messaging
                </h2>
                <p>
                  The Wedora enquiry system allows direct communication between Clients and Vendors. Users agree not to send spam, unsolicited promotions, abusive content, or fraudulent proposals through Wedora messaging channels.
                </p>
              </section>

              {/* Section 9 */}
              <section id="bookings" className="space-y-4 scroll-mt-28">
                <h2 className="font-serif text-2xl font-light text-[#161514] border-b border-[#161514]/10 pb-2">
                  9. Bookings &amp; Contracts
                </h2>
                <p>
                  Wedora acts as an editorial showcase and management technology platform. Formal service contracts, performance guarantees, and cancellation policies negotiated between Clients and Vendors are agreements directly between those parties unless explicitly specified under a formal Wedora Managed Service agreement.
                </p>
              </section>

              {/* Section 10 */}
              <section id="payment-transactions" className="space-y-4 scroll-mt-28">
                <h2 className="font-serif text-2xl font-light text-[#161514] border-b border-[#161514]/10 pb-2">
                  10. Payment Transactions
                </h2>
                <p>
                  Wedora records payment transactions and milestone ledger balances in exact currency sub-units (paise/cents). Payment status indicators (PENDING, PAID, OVERDUE) reflect internal platform ledger records. Wedora is not liable for external bank transfer delays or payment processor interruptions.
                </p>
              </section>

              {/* Section 11 */}
              <section id="reviews-content" className="space-y-4 scroll-mt-28">
                <h2 className="font-serif text-2xl font-light text-[#161514] border-b border-[#161514]/10 pb-2">
                  11. Reviews &amp; User Content
                </h2>
                <p>
                  Clients who have engaged vendor services may submit reviews and ratings. Reviews must be based on genuine service experiences. Defamatory, extortionate, or fake reviews are strictly prohibited and will be removed upon investigation.
                </p>
              </section>

              {/* Section 12 */}
              <section id="prohibited-use" className="space-y-4 scroll-mt-28">
                <h2 className="font-serif text-2xl font-light text-[#161514] border-b border-[#161514]/10 pb-2">
                  12. Prohibited Use
                </h2>
                <p>
                  Users shall not:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Scrape, crawl, or harvest platform content, vendor directories, or media without written authorization.</li>
                  <li>Attempt to bypass API authentication, manipulate JWT headers, or compromise database security.</li>
                  <li>Impersonate any person, business entity, or Wedora official.</li>
                  <li>Post infringing, defamatory, profane, or unlawful content.</li>
                </ul>
              </section>

              {/* Section 13 */}
              <section id="suspension-termination" className="space-y-4 scroll-mt-28">
                <h2 className="font-serif text-2xl font-light text-[#161514] border-b border-[#161514]/10 pb-2">
                  13. Account Suspension &amp; Termination
                </h2>
                <p>
                  Wedora reserves the right to suspend or terminate accounts that breach these Terms, engage in fraudulent activity, or exhibit behavior detrimental to the platform community, without prior notice.
                </p>
              </section>

              {/* Section 14 */}
              <section id="third-party-services" className="space-y-4 scroll-mt-28">
                <h2 className="font-serif text-2xl font-light text-[#161514] border-b border-[#161514]/10 pb-2">
                  14. Third-Party Services
                </h2>
                <p>
                  Wedora may incorporate links or services provided by third parties (such as cloud hosting, map providers, or social networks). Wedora is not responsible for the availability, content, or privacy practices of external websites.
                </p>
              </section>

              {/* Section 15 */}
              <section id="intellectual-property" className="space-y-4 scroll-mt-28">
                <h2 className="font-serif text-2xl font-light text-[#161514] border-b border-[#161514]/10 pb-2">
                  15. Intellectual Property
                </h2>
                <p>
                  The Wedora brand, logo, luxury editorial design system, database schemas, codebases, and custom UI components are the exclusive intellectual property of Wedora. Vendors retain copyright over their submitted portfolio images while granting Wedora a worldwide license to display them for platform marketing and directory showcase purposes.
                </p>
              </section>

              {/* Section 16 */}
              <section id="disclaimer" className="space-y-4 scroll-mt-28">
                <h2 className="font-serif text-2xl font-light text-[#161514] border-b border-[#161514]/10 pb-2">
                  16. Disclaimer of Warranties
                </h2>
                <p>
                  Wedora is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. Wedora makes no express or implied warranties regarding uninterrupted platform uptime, error-free operation, or specific vendor availability.
                </p>
              </section>

              {/* Section 17 */}
              <section id="limitation-liability" className="space-y-4 scroll-mt-28">
                <h2 className="font-serif text-2xl font-light text-[#161514] border-b border-[#161514]/10 pb-2">
                  17. Limitation of Liability
                </h2>
                <p>
                  To the maximum extent permitted by applicable law, Wedora and its officers, directors, and developers shall not be liable for indirect, incidental, punitive, or consequential damages resulting from platform use, vendor disputes, or loss of data.
                </p>
              </section>

              {/* Section 18 */}
              <section id="changes-terms" className="space-y-4 scroll-mt-28">
                <h2 className="font-serif text-2xl font-light text-[#161514] border-b border-[#161514]/10 pb-2">
                  18. Changes to Terms
                </h2>
                <p>
                  We reserve the right to modify these Terms at any time. Continued use of the platform following published modifications constitutes your acceptance of the updated Terms.
                </p>
              </section>

              {/* Section 19 */}
              <section id="governing-law" className="space-y-4 scroll-mt-28 border-t border-[#161514]/10 pt-8">
                <h2 className="font-serif text-2xl font-light text-[#161514]">
                  19. Governing Law &amp; Jurisdiction
                </h2>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of [Governing State/Country], without regard to conflict of law principles. Any legal suit or proceeding arising under these Terms shall be instituted in the courts located in [Jurisdiction / City].
                </p>
                <div className="p-6 bg-[#161514]/[0.03] border border-[#161514]/10 space-y-2 font-mono text-xs mt-6">
                  <p><strong>Legal Entity:</strong> [Company Legal Name]</p>
                  <p><strong>Registered Address:</strong> [Registered Business Address]</p>
                  <p><strong>Legal Support Contact:</strong> legal@[domain.com] / [Support Email]</p>
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
