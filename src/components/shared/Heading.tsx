// ============================================================
// Heading — Consistent heading hierarchy
// ============================================================

import { cn } from "@/lib/utils";
import type { HeadingLevel } from "@/types";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  as?: HeadingLevel;
  subtitle?: string;
  align?: "left" | "center" | "right";
}

const levelClasses: Record<HeadingLevel, string> = {
  h1: "text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight",
  h2: "text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight",
  h3: "text-2xl sm:text-3xl font-semibold tracking-tight",
  h4: "text-xl sm:text-2xl font-semibold",
  h5: "text-lg sm:text-xl font-medium",
  h6: "text-base sm:text-lg font-medium",
};

const alignClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export function Heading({
  level = "h2",
  as,
  subtitle,
  align = "left",
  className,
  children,
  ...props
}: HeadingProps) {
  const Tag = as || level;

  return (
    <div className={cn("space-y-3", alignClasses[align])}>
      <Tag
        className={cn(
          "font-heading text-balance text-foreground",
          levelClasses[level],
          className
        )}
        {...props}
      >
        {children}
      </Tag>
      {subtitle && (
        <p
          className={cn(
            "text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg",
            align === "center" && "mx-auto max-w-2xl"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
