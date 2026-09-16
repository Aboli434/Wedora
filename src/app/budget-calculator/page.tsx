import React from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";

export default function BudgetCalculatorPage() {
  return (
    <Section padding="xl" className="pt-32">
      <Container size="lg">
        <div className="py-20 text-center space-y-4">
          <span className="caption text-[var(--accent-gold)]">Route Placeholder</span>
          <Heading as="h1" size="display-lg">
            Budget Calculator
          </Heading>
          <p className="body-md max-w-md mx-auto">
            Interactive wedding budget estimation, guest count scaling, and event cost breakdown.
          </p>
        </div>
      </Container>
    </Section>
  );
}
