// ============================================================
// WhyChooseUs — Premium numbered cards with ghost numbers + glow icons
// ============================================================

"use client";

import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FeatureCard } from "@/components/shared/FeatureCard";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { WHY_CHOOSE_US } from "@/lib/homepage-data";

export function WhyChooseUs() {
  return (
    <Section
      variant="default"
      spacing="md"
      containerSize="xl"
      className="relative overflow-hidden"
    >
      {/* Decorative orbs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute -right-40 top-20 size-[350px] rounded-full animate-float-slow"
          style={{
            background:
              "radial-gradient(circle at center, oklch(0.55 0.18 250 / 0.06) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -left-40 bottom-20 size-[280px] rounded-full animate-float"
          style={{
            background:
              "radial-gradient(circle at center, oklch(0.73 0.17 65 / 0.04) 0%, transparent 70%)",
          }}
        />
      </div>

      <MotionDiv preset="blur-in" className="mb-16">
        <SectionHeading
          badge="Why Ganesh Plumbing"
          title="Why Homeowners Trust Us"
          subtitle="Reliable, professional, and always on time — here's what sets us apart from the rest."
          align="center"
        />
      </MotionDiv>

      <MotionDiv
        preset="stagger"
        as="div"
        className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {WHY_CHOOSE_US.map((item, index) => (
          <MotionDiv key={item.title} preset="stagger-item">
            <FeatureCard
              icon={item.icon}
              title={item.title}
              description={item.description}
              index={index}
            />
          </MotionDiv>
        ))}
      </MotionDiv>
    </Section>
  );
}
