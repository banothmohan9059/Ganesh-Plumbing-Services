// ============================================================
// TrustStrip — Premium dark glass stat panels with animated counters
// ============================================================

"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TRUST_STATS } from "@/lib/homepage-data";

function AnimatedNumber({ value, suffix }: { value: string; suffix?: string }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10);
          if (isNaN(numericValue)) {
            setDisplay(value);
            return;
          }

          const duration = 1800;
          const steps = 50;
          const increment = numericValue / steps;
          let current = 0;
          let step = 0;

          const timer = setInterval(() => {
            step++;
            current = Math.min(Math.round(increment * step), numericValue);
            setDisplay(current.toLocaleString());
            if (step >= steps) {
              clearInterval(timer);
              setDisplay(value);
            }
          }, duration / steps);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="font-heading text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
      {display}
      {suffix && (
        <span className="gradient-text-gold">{suffix}</span>
      )}
    </div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export function TrustStrip() {
  return (
    <section className="relative overflow-hidden bg-brand-950 py-10 sm:py-16">
      {/* Subtle ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, oklch(0.55 0.18 250 / 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6"
        >
          {TRUST_STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className={[
                "flex flex-col items-center rounded-2xl py-6 px-3 sm:py-8 sm:px-4 text-center",
                "bg-white/[0.05] border border-white/[0.08] backdrop-blur-sm",
                "shadow-[0_4px_24px_oklch(0_0_0/0.2)]",
                "hover:bg-white/[0.08] hover:border-white/[0.12]",
                "transition-all duration-300",
              ].join(" ")}
            >
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              <p className="mt-3 text-sm font-medium text-white/45">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
