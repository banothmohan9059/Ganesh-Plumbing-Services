// ============================================================
// PageHero — Premium cinematic page hero with animated blur-in
// ============================================================

"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { CustomBadge } from "@/components/shared/CustomBadge";

interface PageHeroProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
  className?: string;
  bgImage?: string;
}

const sizeClasses = {
  sm: "py-16 md:py-20",
  md: "py-20 md:py-28",
  lg: "py-24 md:py-36",
};

const titleSizeClasses = {
  sm: "text-3xl sm:text-4xl",
  md: "text-4xl sm:text-5xl font-extrabold",
  lg: "text-4xl sm:text-5xl lg:text-6xl font-extrabold",
};


export function PageHero({
  badge,
  title,
  subtitle,
  align = "center",
  size = "md",
  children,
  className,
  bgImage = "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
}: PageHeroProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-gradient-to-b from-brand-950 to-brand-900",
        sizeClasses[size],
        className
      )}
    >
      {/* Animated gradient mesh & Background Image */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImage}
            alt={title}
            fill
            sizes="100vw"
            priority
            className="object-cover opacity-20 mix-blend-overlay"
          />
        </div>
        <div className="absolute inset-0 opacity-40 z-10"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% -10%, oklch(0.55 0.18 250 / 0.5) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 80% 60%, oklch(0.73 0.17 65 / 0.2) 0%, transparent 60%)",
          }}
        />
        {/* Dot grid */}
        <div className="absolute inset-0 dot-grid-bg opacity-30" />
        
        {/* Floating orbs */}
        {isMounted && (
          <>
            <motion.div
              className="absolute -top-24 -right-24 size-[400px] rounded-full"
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              style={{
                background: "radial-gradient(circle at center, oklch(0.55 0.18 250 / 0.35), transparent 70%)",
              }}
            />
            <motion.div
              className="absolute -bottom-16 -left-16 size-[300px] rounded-full"
              animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
              style={{
                background: "radial-gradient(circle at center, oklch(0.73 0.17 65 / 0.2), transparent 70%)",
              }}
            />
          </>
        )}
      </div>

      <Container size="xl" className="relative z-10">
        <div
          className={cn(
            "space-y-6",
            align === "center"
              ? "mx-auto max-w-3xl text-center"
              : "max-w-2xl text-left"
          )}
        >
          {badge && (
            <div
              className={cn(
                "animate-slide-up-fade",
                align === "center" ? "flex justify-center" : ""
              )}
            >
              <CustomBadge variant="dark-glass">{badge}</CustomBadge>
            </div>
          )}

          <h1
            className={cn(
              "font-heading tracking-tight text-white animate-slide-up-fade delay-100",
              titleSizeClasses[size]
            )}
          >
            {title}
          </h1>

          {subtitle && (
            <p
              className={cn(
                "text-base leading-relaxed text-white/60 sm:text-lg animate-slide-up-fade delay-300",
                align === "center" && "mx-auto max-w-2xl"
              )}
            >
              {subtitle}
            </p>
          )}

          {children && (
            <div
              className="pt-2 animate-slide-up-fade delay-500"
            >
              {children}
            </div>
          )}
        </div>
      </Container>

    </section>
  );
}
