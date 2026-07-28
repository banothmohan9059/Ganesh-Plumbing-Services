// ============================================================
// IconWrapper — Premium icon container with glow + animated ring
// ============================================================

import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type IconSize = "sm" | "md" | "lg" | "xl" | "2xl";
type IconVariant = "primary" | "accent" | "muted" | "outline" | "gradient" | "glow" | "dark-gradient";

interface IconWrapperProps {
  icon: LucideIcon;
  size?: IconSize;
  variant?: IconVariant;
  pulse?: boolean;
  className?: string;
}

const sizeClasses: Record<IconSize, { wrapper: string; icon: string }> = {
  sm:  { wrapper: "p-2 rounded-lg",    icon: "size-4" },
  md:  { wrapper: "p-2.5 rounded-xl",  icon: "size-5" },
  lg:  { wrapper: "p-3.5 rounded-xl",  icon: "size-6" },
  xl:  { wrapper: "p-4 rounded-2xl",   icon: "size-8" },
  "2xl": { wrapper: "p-5 rounded-2xl", icon: "size-10" },
};

const variantClasses: Record<IconVariant, string> = {
  primary:         "bg-brand-50 text-brand-600",
  accent:          "bg-gold-50 text-gold-700",
  muted:           "bg-muted text-muted-foreground",
  outline:         "bg-transparent text-foreground ring-1 ring-border",
  gradient:        "bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg",
  "dark-gradient": "bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-lg",
  glow:            "bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg animate-glow-pulse",
};

export function IconWrapper({
  icon: Icon,
  size = "md",
  variant = "primary",
  pulse = false,
  className,
}: IconWrapperProps) {
  return (
    <div className="relative inline-flex shrink-0" aria-hidden="true">
      {/* Pulse ring for glow variant */}
      {(variant === "glow" || pulse) && (
        <span
          className="absolute inset-0 rounded-[inherit] bg-brand-400/30 animate-pulse-ring"
          style={{ borderRadius: "inherit" }}
        />
      )}
      <div
        className={cn(
          "inline-flex items-center justify-center shrink-0",
          sizeClasses[size].wrapper,
          variantClasses[variant],
          className
        )}
      >
        <Icon className={sizeClasses[size].icon} />
      </div>
    </div>
  );
}
