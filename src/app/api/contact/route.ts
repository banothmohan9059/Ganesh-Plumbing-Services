import { NextResponse } from "next/server";
import { Resend } from "resend";
import { adminDb } from "@/lib/firebase/admin";
import { FieldValue } from "firebase-admin/firestore";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key_for_build");

// ----------------------------------------------------------------------
// Rate Limiter (In-Memory for Serverless)
// Note: On Vercel this resets per cold start and per lambda instance, 
// but it is sufficient to block naive spam bursts.
// ----------------------------------------------------------------------
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowData = rateLimitMap.get(ip);

  if (!windowData) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return true;
  }

  if (now - windowData.lastReset > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return true;
  }

  if (windowData.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  windowData.count += 1;
  return true;
}

// ----------------------------------------------------------------------
// Validation Schema
// ----------------------------------------------------------------------
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  phone: z.string().min(10, "Phone number is too short").max(20),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  service: z.string().min(2, "Please select a valid service").max(100),
  message: z.string().max(1000, "Message is too long").optional(),
});

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting Check
    const ip = req.headers.get("x-forwarded-for") || "unknown-ip";
    const isAllowed = checkRateLimit(ip);
    
    if (!isAllowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // 2. Parse Payload
    let data;
    try {
      data = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
    }

    // 3. Zod Validation
    const validatedResult = contactSchema.safeParse(data);
    
    if (!validatedResult.success) {
      return NextResponse.json(
        { 
          error: "Validation failed.", 
          details: validatedResult.error.format() 
        }, 
        { status: 400 }
      );
    }

    const { name, phone, email, service, message } = validatedResult.data;

    // 4. Save Lead to Firebase Firestore
    try {
      if (!adminDb) {
        console.error("Firebase admin is not initialized. Cannot save lead.");
        return NextResponse.json(
          { error: "Database not configured properly." },
          { status: 500 }
        );
      }
      
      await adminDb.collection("leads").add({
        name,
        phone,
        email: email || null,
        service,
        message,
        status: "new",
        createdAt: FieldValue.serverTimestamp(),
      });
    } catch (firebaseError) {
      console.error("Firebase insertion error:", firebaseError);
      return NextResponse.json(
        { error: "Failed to save lead to database." },
        { status: 500 }
      );
    }

    // 5. Send Email via Resend (Optional)
    if (!process.env.RESEND_API_KEY) {
      // Return true since it successfully saved to Firebase, even if no email is sent.
      return NextResponse.json({ success: true, savedToDb: true });
    }

    const emailHtml = `
      <h2>New Plumbing Service Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email || "Not provided"}</p>
      <p><strong>Service:</strong> ${service}</p>
      <br />
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;

    const toEmail = process.env.CONTACT_EMAIL || "info@ganeshplumbing.com";

    const { error: resendError } = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: [toEmail],
      subject: `New Service Request: ${service} from ${name}`,
      html: emailHtml,
      replyTo: email || undefined,
    });

    if (resendError) {
      console.error("Resend error:", resendError);
      return NextResponse.json(
        { error: "Failed to send email.", details: resendError },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("API Contact Error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
