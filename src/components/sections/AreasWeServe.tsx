// ============================================================
// AreasWeServe — Premium glass pills with stagger
// ============================================================

"use client";

import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { CTA } from "@/components/shared/CTA";

interface AreasWeServeProps {
  areas: string[];
}

export function AreasWeServe({ areas }: AreasWeServeProps) {
  return (
    <Section variant="default" spacing="md" containerSize="xl" className="bg-muted/30">
      <MotionDiv preset="slide-up">
        <SectionHeading
          badge="Service Areas"
          title="Serving Miyapur & Nearby Areas"
          subtitle="Quick response times across Hyderabad's top localities."
          align="center"
          className="mb-12"
        />
      </MotionDiv>

      <MotionDiv preset="stagger" as="div">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-3">
          {areas.map((area) => (
            <MotionDiv key={area} preset="stagger-item">
              <span
                className={`inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                  area === "Miyapur"
                    ? "bg-gradient-to-r from-brand-500 to-brand-700 text-white shadow-md glow-brand"
                    : "bg-white/70 text-foreground ring-1 ring-white/40 backdrop-blur-sm shadow-card hover:shadow-elevated hover:-translate-y-0.5 hover:ring-brand-200"
                }`}
              >
                {area}
              </span>
            </MotionDiv>
          ))}
        </div>
      </MotionDiv>

      <MotionDiv preset="fade" className="mt-12">
        <CTA variant="inline" size="md" className="justify-center" />
      </MotionDiv>
    </Section>
  );
}
