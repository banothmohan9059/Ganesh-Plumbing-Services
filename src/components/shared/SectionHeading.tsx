// ============================================================
// SectionHeading — Premium section title with animated gradient + accent line
// ============================================================

import { cn } from "@/lib/utils";
import { CustomBadge } from "@/components/shared/CustomBadge";
import type { HeadingLevel } from "@/types";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  level?: HeadingLevel;
  align?: "left" | "center";
  gradient?: boolean;
  animated?: boolean;
  dark?: boolean;
  className?: string;
  titleClassName?: string;
}

const levelClasses: Record<HeadingLevel, string> = {
  h1: "text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.06]",
  h2: "text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-[1.1]",
  h3: "text-2xl sm:text-3xl font-bold tracking-tight leading-[1.15]",
  h4: "text-xl sm:text-2xl font-semibold leading-snug",
  h5: "text-lg sm:text-xl font-medium leading-snug",
  h6: "text-base sm:text-lg font-medium leading-normal",
};

export function SectionHeading({
  badge,
  title,
  subtitle,
  level = "h2",
  align = "center",
  gradient = false,
  animated = false,
  dark = false,
  className,
  titleClassName,
}: SectionHeadingProps) {
  const Tag = level;

  return (
    <div
      className={cn(
        "space-y-5",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      {badge && (
        <div className={align === "center" ? "flex justify-center" : ""}>
          <CustomBadge variant={dark ? "dark-glass" : "primary"}>
            {badge}
          </CustomBadge>
        </div>
      )}

      <Tag
        className={cn(
          "font-heading",
          levelClasses[level],
          align === "center" && "mx-auto max-w-3xl",
          dark ? "text-white" : "text-foreground",
          gradient && "gradient-text",
          animated && "gradient-text-animated",
          titleClassName
        )}
      >
        {title}
      </Tag>

      {subtitle && (
        <p
          className={cn(
            "text-base leading-relaxed sm:text-lg sm:leading-relaxed",
            align === "center" && "mx-auto max-w-2xl",
            dark ? "text-white/60" : "text-muted-foreground"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
