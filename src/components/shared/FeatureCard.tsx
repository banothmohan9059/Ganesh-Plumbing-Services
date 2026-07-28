// ============================================================
// FeatureCard — Premium glassmorphism card with numbered ghost + gradient hover
// ============================================================

import { cn } from "@/lib/utils";
import { IconWrapper } from "@/components/shared/IconWrapper";
import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index?: number;
  className?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  index,
  className,
}: FeatureCardProps) {
  const num = index !== undefined ? String(index + 1).padStart(2, "0") : undefined;

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl p-7 transition-all duration-500",
        "bg-white border border-white/60",
        "shadow-[0_1px_3px_oklch(0_0_0/0.06),0_1px_2px_oklch(0_0_0/0.04)]",
        "hover:shadow-[0_20px_60px_oklch(0_0_0/0.10),0_8px_20px_oklch(0.55_0.18_250/0.08)]",
        "hover:-translate-y-1.5",
        "card-gradient-top",
        className
      )}
      data-number={num}
    >
      {/* Ghost number background */}
      {num && (
        <span
          className="pointer-events-none absolute top-2 right-4 font-heading text-8xl font-black leading-none select-none text-brand-500/[0.06] transition-colors duration-500 group-hover:text-brand-500/[0.10]"
          aria-hidden="true"
        >
          {num}
        </span>
      )}

      {/* Hover gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.55 0.18 250 / 0.04), oklch(0.73 0.17 65 / 0.03))",
        }}
        aria-hidden="true"
      />

      <div className="relative">
        <IconWrapper
          icon={icon}
          size="xl"
          variant="gradient"
          className="mb-6 transition-transform duration-500 group-hover:scale-110"
        />

        <h3 className="mb-3 font-heading text-lg font-bold text-foreground">
          {title}
        </h3>

        <p className="text-[15px] leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}
