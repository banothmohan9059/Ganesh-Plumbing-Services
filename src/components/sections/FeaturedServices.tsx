// ============================================================
// FeaturedServices — Premium service cards with gradient top border
// ============================================================

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { FEATURED_SERVICES } from "@/lib/homepage-data";
import { IconWrapper } from "@/components/shared/IconWrapper";
import * as Icons from "lucide-react";

import { Service } from "@/types";

export function FeaturedServices({ services = [] }: { services?: Service[] }) {
  const displayServices = services.length > 0 ? services : FEATURED_SERVICES.slice(0, 4);

  return (
    <Section
      variant="default"
      spacing="md"
      containerSize="xl"
      className="relative bg-[oklch(0.985_0.003_250)]"
    >
      {/* Decorative */}
      <div
        className="pointer-events-none absolute -left-40 bottom-20 size-[280px] rounded-full"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle at center, oklch(0.73 0.17 65 / 0.05) 0%, transparent 70%)",
        }}
      />

      <MotionDiv preset="blur-in" className="mb-16">
        <SectionHeading
          badge="Our Services"
          title="Expert Plumbing Solutions"
          subtitle="From emergency repairs to full bathroom renovations — we handle it all with precision and care."
          align="center"
        />
      </MotionDiv>

      <MotionDiv
        preset="stagger"
        as="div"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {displayServices.map((service) => {
          const IconComponent = (Icons as unknown as Record<string, import("lucide-react").LucideIcon>)[service.iconName || "Wrench"] || Icons.Wrench;
          return (
            <MotionDiv key={service.title} preset="stagger-item">
              <Link href={`/services/${service.id}`} className="block focus:outline-none">
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
                  className={[
                    "group relative overflow-hidden rounded-2xl p-6",
                    "bg-white border border-gray-100/80",
                    "shadow-[0_1px_3px_oklch(0_0_0/0.05),0_1px_2px_oklch(0_0_0/0.04)]",
                    "hover:shadow-[0_20px_50px_oklch(0_0_0/0.10),0_6px_16px_oklch(0.55_0.18_250/0.07)]",
                    "transition-all duration-400",
                  ].join(" ")}
                >
                {/* Gradient top accent on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl opacity-0 transition-opacity duration-400 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(90deg, oklch(0.55 0.18 250), oklch(0.73 0.17 65))",
                  }}
                  aria-hidden="true"
                />

                {/* Hover gradient overlay */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.55 0.18 250 / 0.03), oklch(0.73 0.17 65 / 0.02))",
                  }}
                  aria-hidden="true"
                />

                <IconWrapper
                  icon={IconComponent}
                  size="xl"
                  variant="gradient"
                  className="mb-5 transition-transform duration-500 group-hover:scale-110"
                />

                <h3 className="mb-2.5 font-heading text-[15px] font-bold text-foreground">
                  {service.title}
                </h3>

                <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
                  {service.description}
                </p>

                <div className="mt-5 flex items-center text-xs font-semibold text-brand-600 opacity-0 transition-all duration-300 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0">
                  Learn more
                  <ArrowRight
                    className="ml-1.5 size-3 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </div>
              </motion.div>
              </Link>
            </MotionDiv>
          );
        })}
      </MotionDiv>

      <MotionDiv preset="fade" className="mt-12 text-center">
        <Button
          size="lg"
          className="h-12 rounded-full px-8 bg-brand-600 text-white shadow-md hover:bg-brand-500 hover:shadow-lg hover:scale-[1.03] transition-all duration-300"
          render={<Link href="/services" />}
        >
          View All Services
          <ArrowRight className="size-4" data-icon="inline-end" aria-hidden="true" />
        </Button>
      </MotionDiv>
    </Section>
  );
}
