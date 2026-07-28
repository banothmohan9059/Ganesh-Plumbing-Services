// ============================================================
// FAQPreview — Premium glass FAQ accordion
// ============================================================

"use client";

import { useState } from "react";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FAQItem } from "@/components/shared/FAQItem";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { FAQ_PREVIEW } from "@/lib/homepage-data";

export function FAQPreview() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section variant="default" spacing="md" containerSize="lg" className="gradient-section">
      <MotionDiv preset="slide-up">
        <SectionHeading
          badge="Common Questions"
          title="Frequently Asked Questions"
          subtitle="Quick answers to help you decide."
          align="center"
          className="mb-12"
        />
      </MotionDiv>

      <MotionDiv preset="stagger" as="div" className="space-y-3">
        {FAQ_PREVIEW.map((faq, index) => (
          <MotionDiv key={faq.question} preset="stagger-item">
            <FAQItem
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          </MotionDiv>
        ))}
      </MotionDiv>

      <MotionDiv preset="fade" className="mt-10 text-center">
        <Button
          variant="outline"
          size="lg"
          className="h-12 rounded-full px-8 border-brand-200 hover:border-brand-400 hover:shadow-md transition-all duration-300"
          render={<Link href="/faq" />}
        >
          View All FAQs
          <ArrowRight className="size-4" data-icon="inline-end" aria-hidden="true" />
        </Button>
      </MotionDiv>
    </Section>
  );
}
