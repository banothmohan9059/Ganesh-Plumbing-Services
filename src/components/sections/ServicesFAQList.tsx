"use client";

import { useState } from "react";
import { FAQItem } from "@/components/shared/FAQItem";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { SERVICES_FAQ } from "@/lib/services-page-data";

export function ServicesFAQList() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <MotionDiv preset="stagger" as="div" className="space-y-3">
      {SERVICES_FAQ.map((faq, index) => (
        <MotionDiv key={index} preset="stagger-item">
          <FAQItem
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          />
        </MotionDiv>
      ))}
    </MotionDiv>
  );
}
