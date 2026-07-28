// ============================================================
// StatCard — Premium glass stat card with animated gradient number
// ============================================================

import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  value: string;
  label: string;
  icon?: LucideIcon;
  suffix?: string;
  dark?: boolean;
  className?: string;
}

export function StatCard({
  value,
  label,
  icon: Icon,
  suffix,
  dark = false,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center text-center p-7 rounded-2xl transition-all duration-300",
        dark
          ? "bg-white/[0.06] border border-white/10 backdrop-blur-sm hover:bg-white/[0.09]"
          : [
              "bg-white border border-gray-100",
              "shadow-[0_1px_3px_oklch(0_0_0/0.06)]",
              "hover:shadow-[0_16px_40px_oklch(0.55_0.18_250/0.08),0_4px_12px_oklch(0_0_0/0.06)] hover:-translate-y-1",
            ],
        className
      )}
    >
      {Icon && (
        <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg">
          <Icon className="size-6" aria-hidden="true" />
        </div>
      )}
      <div
        className={cn(
          "mb-2 font-heading text-4xl font-extrabold tracking-tight sm:text-5xl",
          dark ? "text-white" : "gradient-text"
        )}
      >
        {value}
        {suffix && (
          <span
            className={dark ? "text-gold-400" : "gradient-text-gold"}
          >
            {suffix}
          </span>
        )}
      </div>
      <p
        className={cn(
          "text-sm font-medium",
          dark ? "text-white/50" : "text-muted-foreground"
        )}
      >
        {label}
      </p>
    </div>
  );
}
