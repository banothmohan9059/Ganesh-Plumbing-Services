// ============================================================
// CustomBadge — Premium badge with shimmer + dark-glass variants
// ============================================================

import { cn } from "@/lib/utils";

type BadgeVariant = "primary" | "accent" | "outline" | "muted" | "glass" | "dark-glass" | "shimmer";

interface CustomBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  dot?: boolean;
}

const variantClasses: Record<BadgeVariant, string> = {
  primary:
    "bg-brand-50 text-brand-700 ring-1 ring-brand-200/80 backdrop-blur-sm",
  accent:
    "bg-gold-50/80 text-gold-800 ring-1 ring-gold-200/60 backdrop-blur-sm",
  outline:
    "bg-background/50 text-foreground ring-1 ring-border backdrop-blur-sm",
  muted:
    "bg-muted/80 text-muted-foreground backdrop-blur-sm",
  glass:
    "bg-white/10 text-white/80 ring-1 ring-white/15 backdrop-blur-md",
  "dark-glass":
    "bg-white/5 text-white/70 ring-1 ring-white/10 backdrop-blur-md",
  shimmer:
    "bg-gradient-to-r from-brand-50 via-white to-brand-50 text-brand-700 ring-1 ring-brand-200/60 animate-shimmer",
};

export function CustomBadge({
  variant = "primary",
  dot = false,
  className,
  children,
  ...props
}: CustomBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest transition-all duration-300",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {dot && (
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex size-1.5 rounded-full bg-green-500" />
        </span>
      )}
      {children}
    </span>
  );
}
