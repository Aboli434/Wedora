import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import {
  ContactHero,
  ContactIntro,
  ContactForm,
  ContactDetails,
  ContactCTA,
} from "@/components/sections/contact";

export const metadata = {
  title: "Contact | Wedora",
  description:
    "Start a conversation about your celebration with Wedora and share the details that matter most.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      {/* 1. CONTACT HERO */}
      <ContactHero />

      {/* 2. ENQUIRY INTRO */}
      <ContactIntro />

      {/* 3. WEDDING ENQUIRY FORM & SIDEBAR DETAILS */}
      <Section padding="lg" className="bg-[#FAF8F5]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Main Enquiry Form */}
            <div className="lg:col-span-7 xl:col-span-8">
              <ContactForm />
            </div>

            {/* Editorial Side Information Column */}
            <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-28">
              <ContactDetails />
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. CLOSING CTA */}
      <ContactCTA />
    </main>
  );
}
