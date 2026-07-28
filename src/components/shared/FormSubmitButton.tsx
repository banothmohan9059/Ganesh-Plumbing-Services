// ============================================================
// FormSubmitButton — Submit button with loading state
// ============================================================

"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/shared/LoadingState";

interface FormSubmitButtonProps {
  isSubmitting?: boolean;
  label?: string;
  submittingLabel?: string;
  className?: string;
  fullWidth?: boolean;
}

export function FormSubmitButton({
  isSubmitting = false,
  label = "Submit",
  submittingLabel = "Sending…",
  className,
  fullWidth = false,
}: FormSubmitButtonProps) {
  return (
    <Button
      type="submit"
      disabled={isSubmitting}
      className={cn(
        "h-11 px-6 text-sm font-semibold shadow-md transition-all hover:shadow-lg",
        fullWidth && "w-full",
        className
      )}
    >
      {isSubmitting ? (
        <>
          <Spinner size="sm" className="border-primary-foreground/25 border-t-primary-foreground" />
          {submittingLabel}
        </>
      ) : (
        label
      )}
    </Button>
  );
}
