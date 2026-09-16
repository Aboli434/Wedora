import React from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";

export default function VendorsPage() {
  return (
    <Section padding="xl">
      <Container size="lg">
        <div className="py-20 text-center space-y-4">
          <span className="caption text-[var(--accent-gold)]">Route Placeholder</span>
          <Heading as="h1" size="display-lg">
            Vendors
          </Heading>
          <p className="body-md max-w-md mx-auto">
            Curated network of world-class wedding artisans, photographers, and venues.
          </p>
        </div>
      </Container>
    </Section>
  );
}
