// ============================================================
// FormField — Field wrapper with label and error message
// ============================================================

import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  description?: string;
  className?: string;
  children: React.ReactNode;
}

export function FormField({
  label,
  htmlFor,
  error,
  required = false,
  description,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-foreground"
      >
        {label}
        {required && (
          <span className="ml-0.5 text-destructive" aria-hidden="true">*</span>
        )}
      </label>

      {description && (
        <p className="text-xs text-muted-foreground" id={`${htmlFor}-description`}>
          {description}
        </p>
      )}

      {children}

      {error && (
        <p
          className="text-xs font-medium text-destructive"
          id={`${htmlFor}-error`}
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
