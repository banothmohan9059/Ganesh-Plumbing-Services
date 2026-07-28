// ============================================================
// TestimonialsSection — Auto-scrolling infinite marquee carousel
// ============================================================

"use client";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { TestimonialCard } from "@/components/shared/TestimonialCard";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { TESTIMONIALS } from "@/lib/homepage-data";
import type { TestimonialData } from "@/lib/homepage-data";

// Duplicate enough times so the marquee has enough cards to fill viewport + loop
const ROW_MULTIPLIER = 6;
import { Review } from "@/types";

const makeTrack = <T,>(items: T[]): T[] =>
  Array.from({ length: ROW_MULTIPLIER }, () => items).flat();

function MarqueeTrack({
  items,
  direction,
}: {
  items: (TestimonialData | Review)[];
  direction: "ltr" | "rtl";
}) {
  return (
    <div className="overflow-hidden">
      <div
        className={
          direction === "ltr"
            ? "flex animate-marquee-ltr"
            : "flex animate-marquee-rtl"
        }
        style={{ width: "max-content" }}
        aria-hidden={direction === "rtl" ? "true" : undefined}
      >
        {items.map((t, i) => (
          <div
            key={i}
            className="flex-none w-[340px] sm:w-[380px] mr-5"
          >
            <TestimonialCard
              name={"author" in t ? t.author : t.name}
              location={"location" in t ? t.location : "Hyderabad"}
              rating={t.rating}
              text={t.text}
              dark
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function TestimonialsSection({ reviews = [] }: { reviews?: Review[] }) {
  const displayReviews = reviews.length > 0 ? reviews : TESTIMONIALS;
  
  const row1 = makeTrack<TestimonialData | Review>(displayReviews);
  const row2 = makeTrack<TestimonialData | Review>([...displayReviews].reverse());

  return (
    <section className="relative overflow-hidden bg-brand-950 py-20 lg:py-28">
      {/* Background mesh */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 0%, oklch(0.55 0.18 250 / 0.1) 0%, transparent 60%)",
          }}
        />
        <div className="absolute inset-0 dot-grid-bg opacity-10" />
      </div>

      <div className="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <MotionDiv preset="blur-in" className="mb-16">
          <SectionHeading
            badge="Customer Reviews"
            title="What Our Customers Say"
            subtitle="Trusted by homeowners and businesses across Hyderabad."
            align="center"
            dark
          />
        </MotionDiv>
      </div>

      {/* Carousel — full bleed with fade masks */}
      <div className="relative marquee-container">
        {/* Left / right fade masks */}
        <div
          className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 lg:w-40"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(to right, oklch(0.10 0.02 250), transparent)",
          }}
        />
        <div
          className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 lg:w-40"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(to left, oklch(0.10 0.02 250), transparent)",
          }}
        />

        <div className="space-y-5">
          <MarqueeTrack items={row1} direction="ltr" />
          <MarqueeTrack items={row2} direction="rtl" />
        </div>
      </div>
    </section>
  );
}
