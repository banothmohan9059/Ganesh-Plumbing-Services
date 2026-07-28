// ============================================================
// Divider — Visual separator with variants
// ============================================================

import { cn } from "@/lib/utils";

interface DividerProps {
  variant?: "line" | "dots" | "gradient";
  className?: string;
  spacing?: "sm" | "md" | "lg";
}

const spacingClasses = {
  sm: "my-6",
  md: "my-10",
  lg: "my-16",
};

export function Divider({
  variant = "line",
  className,
  spacing = "md",
}: DividerProps) {
  if (variant === "dots") {
    return (
      <div
        className={cn(
          "flex items-center justify-center gap-2",
          spacingClasses[spacing],
          className
        )}
        role="separator"
        aria-hidden="true"
      >
        <span className="size-1 rounded-full bg-border" />
        <span className="size-1 rounded-full bg-border" />
        <span className="size-1 rounded-full bg-border" />
      </div>
    );
  }

  if (variant === "gradient") {
    return (
      <div
        className={cn(spacingClasses[spacing], className)}
        role="separator"
        aria-hidden="true"
      >
        <div className="mx-auto h-px max-w-md bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>
    );
  }

  return (
    <hr
      className={cn(
        "border-t border-border",
        spacingClasses[spacing],
        className
      )}
    />
  );
}
