// ============================================================
// CustomCard — Flexible card with hover effects
// ============================================================

import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface CustomCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  hover?: boolean;
}

export function CustomCard({
  icon: Icon,
  title,
  description,
  hover = true,
  className,
  children,
  ...props
}: CustomCardProps) {
  return (
    <div
      className={cn(
        "group relative rounded-xl border border-border bg-card p-6 text-card-foreground shadow-card transition-all duration-[var(--duration-normal)]",
        hover &&
          "hover:shadow-elevated hover:-translate-y-0.5 hover:border-brand-200",
        className
      )}
      {...props}
    >
      {Icon && (
        <div className="mb-4 inline-flex rounded-lg bg-brand-50 p-3 text-brand-600 transition-colors duration-[var(--duration-normal)] group-hover:bg-brand-100">
          <Icon className="size-6" aria-hidden="true" />
        </div>
      )}
      {title && (
        <h3 className="mb-2 font-heading text-lg font-semibold text-foreground">
          {title}
        </h3>
      )}
      {description && (
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
