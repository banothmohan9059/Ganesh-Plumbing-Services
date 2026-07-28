// ============================================================
// TrustBadge — Social proof indicator with icon + label
// ============================================================

import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface TrustBadgeProps {
  icon: LucideIcon;
  label: string;
  sublabel?: string;
  className?: string;
}

export function TrustBadge({
  icon: Icon,
  label,
  sublabel,
  className,
}: TrustBadgeProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-card",
        className
      )}
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
        <Icon className="size-5" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-foreground leading-tight">
          {label}
        </p>
        {sublabel && (
          <p className="text-xs text-muted-foreground leading-tight">
            {sublabel}
          </p>
        )}
      </div>
    </div>
  );
}
