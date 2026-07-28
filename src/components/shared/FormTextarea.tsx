// ============================================================
// FormTextarea — Styled textarea for forms
// ============================================================

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ hasError, className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "flex min-h-[100px] w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground transition-colors resize-y",
          "placeholder:text-muted-foreground/60",
          "focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20",
          "disabled:cursor-not-allowed disabled:opacity-50",
          hasError
            ? "border-destructive focus:border-destructive focus:ring-destructive/20"
            : "border-input",
          className
        )}
        {...props}
      />
    );
  }
);

FormTextarea.displayName = "FormTextarea";
