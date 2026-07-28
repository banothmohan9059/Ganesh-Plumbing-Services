// ============================================================
// ContactForm — Premium glassmorphism form with brand focus rings
// ============================================================

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Loader2, Send, MessageCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/constants";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  phone: z
    .string()
    .min(10, "Please enter a valid 10-digit phone number.")
    .max(15, "Phone number is too long.")
    .regex(/^[0-9+\-\s]+$/, "Please enter a valid phone number format."),
  email: z.string().email("Please enter a valid email address.").optional().or(z.literal("")),
  service: z.string().min(1, "Please select a service."),
  message: z.string().min(10, "Message must be at least 10 characters long."),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

// Premium input base classes
const inputBase = [
  "flex w-full rounded-xl border px-4 py-3 text-sm text-foreground",
  "bg-white/60 backdrop-blur-sm",
  "border-gray-200/80 placeholder:text-muted-foreground/60",
  "transition-all duration-300",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-0",
  "focus-visible:border-brand-400 focus-visible:bg-white",
  "focus-visible:shadow-[0_0_0_4px_oklch(0.55_0.18_250/0.08)]",
  "disabled:cursor-not-allowed disabled:opacity-50",
  "hover:border-brand-200/80 hover:bg-white/80",
].join(" ");

const errorInputClasses = "border-destructive/60 focus-visible:ring-destructive/30 focus-visible:border-destructive/60";

interface FieldProps {
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}

function FormField({ label, required, optional, error, children }: FieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-foreground/80">
        {label}
        {required && <span className="ml-1 text-brand-500" aria-label="required">*</span>}
        {optional && (
          <span className="ml-1.5 text-xs font-normal text-muted-foreground">(Optional)</span>
        )}
      </label>
      <div className="relative">
        {children}
        {error && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <AlertCircle className="size-5 text-destructive" aria-hidden="true" />
          </div>
        )}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="text-xs font-medium text-destructive"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<ContactFormValues | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      service: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setSubmittedData(data);
      setIsSuccess(true);
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#0284c7", "#38bdf8", "#e0f2fe"], // Brand colors
      });

      toast.success("Request sent successfully!", {
        description: "We have received your message and will contact you shortly.",
        duration: 5000,
      });
      reset();
    } catch {
      toast.error("Error sending message", {
        description: "Please try again or contact us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppFallback = () => {
    if (!submittedData) return;
    const text = `Hello Ganesh Plumbing Services!%0A%0A*New Contact Form Request*%0A%0A*Name:* ${submittedData.name}%0A*Phone:* ${submittedData.phone}%0A*Service Required:* ${submittedData.service}%0A%0A*Message:*%0A${submittedData.message}`;
    const waNumber = SITE_CONFIG.whatsapp.replace(/[^0-9]/g, "");
    const whatsappUrl = `https://wa.me/${waNumber}?text=${text}`;
    window.open(whatsappUrl, "_blank");
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center space-y-6 text-center py-10 px-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-brand-600">
          <Send className="size-8" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">Message Sent!</h3>
          <p className="mt-2 text-muted-foreground">
            Thank you for reaching out. We will get back to you as soon as possible.
          </p>
        </div>
        <div className="w-full pt-4 space-y-3">
          <p className="text-sm font-medium text-foreground/80">Need an immediate response?</p>
          <Button
            onClick={handleWhatsAppFallback}
            className="w-full h-12 bg-[#25D366] text-white hover:bg-[#20bd5a] hover:scale-[1.02] shadow-md hover:shadow-lg transition-all"
          >
            <MessageCircle className="mr-2 size-4" />
            Message us on WhatsApp
          </Button>
          <Button
            variant="outline"
            className="w-full h-12"
            onClick={() => setIsSuccess(false)}
          >
            Send another message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Name + Phone row */}
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Full Name" required error={errors.name?.message}>
          <input
            id="name"
            type="text"
            className={cn(inputBase, "h-12", errors.name && errorInputClasses)}
            placeholder="John Doe"
            {...register("name")}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
        </FormField>

        <FormField label="Phone Number" required error={errors.phone?.message}>
          <input
            id="phone"
            type="tel"
            className={cn(inputBase, "h-12", errors.phone && errorInputClasses)}
            placeholder="+91 98765 43210"
            {...register("phone")}
            aria-invalid={!!errors.phone}
          />
        </FormField>
      </div>

      {/* Email */}
      <FormField label="Email Address" optional error={errors.email?.message}>
        <input
          id="email"
          type="email"
          className={cn(inputBase, "h-12", errors.email && errorInputClasses)}
          placeholder="john@example.com"
          {...register("email")}
          aria-invalid={!!errors.email}
        />
      </FormField>

      {/* Service */}
      <FormField label="Service Required" required error={errors.service?.message}>
        <select
          id="service"
          className={cn(
            inputBase,
            "h-12 cursor-pointer appearance-none",
            errors.service && errorInputClasses
          )}
          {...register("service")}
          aria-invalid={!!errors.service}
        >
          <option value="" disabled>
            Select a service...
          </option>
          <option value="Emergency Plumbing">Emergency Plumbing</option>
          <option value="Leak Detection & Repair">Leak Detection &amp; Repair</option>
          <option value="Drain Cleaning">Drain Cleaning</option>
          <option value="Bathroom Plumbing">Bathroom Plumbing</option>
          <option value="Geyser Repair">Geyser Repair</option>
          <option value="Borewell Motor">Borewell Motor</option>
          <option value="General Maintenance">General Maintenance</option>
          <option value="Other">Other</option>
        </select>
      </FormField>

      {/* Message */}
      <FormField label="Message" required error={errors.message?.message}>
        <textarea
          id="message"
          className={cn(
            inputBase,
            "min-h-[120px] resize-none py-3",
            errors.message && errorInputClasses
          )}
          placeholder="Please describe your plumbing issue in detail..."
          {...register("message")}
          aria-invalid={!!errors.message}
        />
      </FormField>

      {/* Submit */}
      <Button
        type="submit"
        size="lg"
        className={[
          "h-13 w-full rounded-xl text-[15px] font-semibold",
          "bg-brand-600 text-white",
          "shadow-[0_4px_20px_oklch(0.55_0.18_250/0.3)]",
          "hover:bg-brand-500",
          "hover:shadow-[0_8px_32px_oklch(0.55_0.18_250/0.45)]",
          "hover:scale-[1.01] transition-all duration-300",
        ].join(" ")}
        disabled={isSubmitting}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 size-5 animate-spin" aria-hidden="true" />
            Sending Message...
          </>
        ) : (
          <>
            <Send className="mr-2 size-4" aria-hidden="true" />
            Send Message
          </>
        )}
      </Button>

      <p className="text-center text-xs text-muted-foreground/70">
        We typically respond within 30 minutes during business hours.
      </p>
    </form>
  );
}
