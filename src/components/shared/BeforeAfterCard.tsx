// ============================================================
// BeforeAfterCard — Premium before/after comparison card
// ============================================================

import { cn } from "@/lib/utils";
import Image from "next/image";
import { MapPin } from "lucide-react";

interface BeforeAfterCardProps {
  title: string;
  location?: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  className?: string;
}

export function BeforeAfterCard({
  title,
  location,
  description,
  beforeImage,
  afterImage,
  className,
}: BeforeAfterCardProps) {
  return (
    <div
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl",
        "border border-gray-100/80 bg-white/70 backdrop-blur-sm",
        "shadow-[0_2px_8px_oklch(0_0_0/0.06)]",
        "transition-all duration-500",
        "hover:shadow-[0_16px_48px_oklch(0_0_0/0.12),0_4px_16px_oklch(0.55_0.18_250/0.06)]",
        "hover:-translate-y-1 hover:border-brand-100/80",
        className
      )}
    >
      {/* Image comparison */}
      <div className="grid grid-cols-2 divide-x divide-gray-100">
        {/* Before Image */}
        <figure className="relative aspect-square sm:aspect-[4/3] bg-muted overflow-hidden">
          <Image
            src={beforeImage}
            alt={`Before: ${title}`}
            fill
            sizes="(max-width: 640px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute left-3 top-3 rounded-full bg-black/65 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
            Before
          </div>
          {/* Left fade-in overlay */}
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: "linear-gradient(135deg, oklch(0 0 0 / 0.06) 0%, transparent 60%)",
            }}
            aria-hidden="true"
          />
        </figure>

        {/* After Image */}
        <figure className="relative aspect-square sm:aspect-[4/3] bg-muted overflow-hidden">
          <Image
            src={afterImage}
            alt={`After: ${title}`}
            fill
            sizes="(max-width: 640px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div
            className="absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-bold text-white backdrop-blur-sm"
            style={{
              background: "linear-gradient(135deg, oklch(0.55 0.18 250 / 0.9), oklch(0.48 0.19 250 / 0.9))",
            }}
          >
            After
          </div>
        </figure>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        {/* Top gradient accent line */}
        <div
          className="absolute left-6 right-6 h-0.5 -mt-6 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: "linear-gradient(90deg, oklch(0.55 0.18 250), oklch(0.73 0.17 65))",
          }}
          aria-hidden="true"
        />

        <h3 className="mb-2 font-heading text-lg font-bold text-foreground">
          {title}
        </h3>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        {location && (
          <div className="mt-auto flex items-center gap-1.5 text-sm font-semibold text-brand-600">
            <MapPin className="size-4 shrink-0" aria-hidden="true" />
            {location}
          </div>
        )}
      </div>
    </div>
  );
}
