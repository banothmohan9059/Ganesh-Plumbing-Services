// ============================================================
// Ganesh Plumbing Services — Form Validation Schemas
// ============================================================

import { z } from "zod";

// ------------------------------------------------------------
// Contact Form
// ------------------------------------------------------------

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  phone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .max(15, "Please enter a valid phone number")
    .regex(/^[+]?[\d\s-()]+$/, "Please enter a valid phone number"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .optional()
    .or(z.literal("")),
  service: z
    .string()
    .min(1, "Please select a service"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

// ------------------------------------------------------------
// Quick Inquiry (simplified)
// ------------------------------------------------------------

export const quickInquirySchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .regex(/^[+]?[\d\s-()]+$/, "Please enter a valid phone number"),
  service: z
    .string()
    .min(1, "Please select a service"),
});

export type QuickInquiryValues = z.infer<typeof quickInquirySchema>;
