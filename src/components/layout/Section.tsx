// ============================================================
// Section — Consistent section spacing & backgrounds
// ============================================================

import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import type { ContainerSize, SectionVariant } from "@/types";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: SectionVariant;
  containerSize?: ContainerSize;
  spacing?: "sm" | "md" | "lg";
  noContainer?: boolean;
}

const variantClasses: Record<SectionVariant, string> = {
  default: "bg-background text-foreground",
  muted: "bg-muted/50 text-foreground",
  primary: "bg-primary text-primary-foreground",
  dark: "bg-foreground text-background",
};

const spacingClasses = {
  sm: "section-padding-sm",
  md: "section-padding",
  lg: "section-padding-lg",
};

export function Section({
  variant = "default",
  containerSize = "xl",
  spacing = "md",
  noContainer = false,
  className,
  children,
  id,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(variantClasses[variant], spacingClasses[spacing], className)}
      {...props}
    >
      {noContainer ? (
        children
      ) : (
        <Container size={containerSize}>{children}</Container>
      )}
    </section>
  );
}
