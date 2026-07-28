// ============================================================
// FormInput — Styled text input for forms
// ============================================================

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ hasError, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground transition-colors",
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

FormInput.displayName = "FormInput";
