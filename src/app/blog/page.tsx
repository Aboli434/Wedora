import React from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";

export default function JournalPage() {
  return (
    <Section padding="xl">
      <Container size="lg">
        <div className="py-20 text-center space-y-4">
          <span className="caption text-[var(--accent-gold)]">Route Placeholder</span>
          <Heading as="h1" size="display-lg">
            Journal
          </Heading>
          <p className="body-md max-w-md mx-auto">
            Insights, luxury trends, and editorial articles on modern celebrations.
          </p>
        </div>
      </Container>
    </Section>
  );
}
