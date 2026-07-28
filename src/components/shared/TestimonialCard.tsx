// ============================================================
// TestimonialCard — Premium dark card for carousel
// ============================================================

import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  location: string;
  rating: number;
  text: string;
  dark?: boolean;
  className?: string;
}

export function TestimonialCard({
  name,
  location,
  rating,
  text,
  dark = false,
  className,
}: TestimonialCardProps) {
  const initial = name.charAt(0).toUpperCase();

  return (
    <div
      className={cn(
        "group flex flex-col rounded-2xl p-7 transition-all duration-500",
        dark
          ? [
              "bg-white/[0.06] border border-white/10 backdrop-blur-sm",
              "hover:bg-white/[0.09] hover:border-white/15",
              "shadow-[0_4px_24px_oklch(0_0_0/0.2)]",
              "hover:shadow-[0_8px_40px_oklch(0_0_0/0.35)]",
            ]
          : [
              "bg-white border border-gray-100",
              "shadow-[0_1px_3px_oklch(0_0_0/0.06),0_1px_2px_oklch(0_0_0/0.04)]",
              "hover:shadow-[0_16px_48px_oklch(0_0_0/0.10),0_4px_16px_oklch(0.55_0.18_250/0.06)]",
              "hover:-translate-y-1",
            ],
        className
      )}
    >
      {/* Large decorative quote */}
      <div
        className={cn(
          "mb-5 font-serif text-7xl leading-none select-none",
          dark ? "text-brand-400/30" : "text-brand-100"
        )}
        aria-hidden="true"
      >
        &ldquo;
      </div>

      {/* Review text */}
      <blockquote
        className={cn(
          "mb-6 flex-1 text-[15px] leading-relaxed",
          dark ? "text-white/75" : "text-foreground/85"
        )}
      >
        {text}
      </blockquote>

      {/* Rating */}
      <div
        className="mb-5 flex items-center gap-0.5"
        aria-label={`${rating} out of 5 stars`}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "size-3.5",
              i < rating
                ? "fill-gold-400 text-gold-400"
                : dark
                ? "fill-white/10 text-white/10"
                : "fill-muted text-muted"
            )}
            aria-hidden="true"
          />
        ))}
      </div>

      {/* Customer info */}
      <div className="flex items-center gap-3">
        {/* Avatar with gradient ring */}
        <div className="relative shrink-0">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-400 to-gold-400 blur-[3px] opacity-60" />
          <div className="relative flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-bold text-white shadow-sm">
            {initial}
          </div>
        </div>
        <div>
          <p
            className={cn(
              "text-sm font-bold",
              dark ? "text-white" : "text-foreground"
            )}
          >
            {name}
          </p>
          <p
            className={cn(
              "text-xs",
              dark ? "text-white/50" : "text-muted-foreground"
            )}
          >
            {location}
          </p>
        </div>
      </div>
    </div>
  );
}
