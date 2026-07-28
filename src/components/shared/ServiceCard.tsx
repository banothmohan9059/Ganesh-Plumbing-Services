// ============================================================
// ServiceCard — Premium glass service card
// ============================================================

import { cn } from "@/lib/utils";
import { IconWrapper } from "@/components/shared/IconWrapper";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features?: string[];
  href?: string;
  className?: string;
}

export function ServiceCard({
  icon,
  title,
  description,
  features,
  href,
  className,
}: ServiceCardProps) {
  const cardClasses = cn(
    "group relative flex flex-col overflow-hidden rounded-2xl p-6 transition-all duration-500",
    "bg-white/70 backdrop-blur-sm border border-white/40",
    "shadow-card hover:shadow-premium hover:-translate-y-1",
    href && "cursor-pointer",
    className
  );

  const content = (
    <>
      {/* Animated gradient border on hover */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes border-shimmer {
          to { background-position: 200% center; }
        }
      `}} />
      <div 
        className="pointer-events-none absolute inset-0 z-20 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          padding: '2px',
          background: 'linear-gradient(90deg, oklch(0.55 0.18 250), oklch(0.73 0.17 65), oklch(0.85 0.20 80), oklch(0.55 0.18 250))',
          backgroundSize: '200% auto',
          animation: 'border-shimmer 3s linear infinite',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
        aria-hidden="true"
      />

      {/* Gradient hover overlay for inner glow */}
      <div
        className="pointer-events-none absolute inset-[2px] rounded-[14px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: "linear-gradient(135deg, oklch(0.55 0.18 250 / 0.08), oklch(0.73 0.17 65 / 0.04))",
        }}
        aria-hidden="true"
      />

      {/* Subtle background image texture */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.06] mix-blend-multiply transition-opacity duration-500 group-hover:opacity-[0.12]"
        style={{
           backgroundImage: 'url("https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop")',
           backgroundSize: 'cover',
           backgroundPosition: 'center',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        <IconWrapper
          icon={icon}
          size="lg"
          variant="gradient"
          className="mb-5 transition-transform duration-500 group-hover:scale-110"
        />

        <h3 className="mb-2.5 font-heading text-lg font-bold text-foreground">
          {title}
        </h3>

        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        {features && features.length > 0 && (
          <ul className="mb-4 space-y-2 text-sm text-muted-foreground">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-400" aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>
        )}

        {href && (
          <div className="mt-auto flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors group-hover:text-brand-500">
            Learn more
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </div>
        )}
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cardClasses}>
        {content}
      </Link>
    );
  }

  return (
    <div className={cardClasses}>
      {content}
    </div>
  );
}
