import { NextResponse } from "next/server";
import { Resend } from "resend";
import { adminDb, adminError } from "@/lib/firebase/admin";
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
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  service: z.string().min(2, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// ----------------------------------------------------------------------
// POST Handler
// ----------------------------------------------------------------------
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

    // 2. Parse Request Body
    let data;
    try {
      data = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON payload." },
        { status: 400 }
      );
    }

    // 3. Validate Data
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
        console.error("Firebase admin is not initialized. Error:", adminError);
        return NextResponse.json(
          { error: `Database not configured properly. Detail: ${adminError || "Unknown"}` },
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
        source: "contact_form",
        createdAt: new Date(),
      });
    } catch (firebaseError: any) {
      console.error("Error saving lead to Firebase:", firebaseError);
      return NextResponse.json(
        { error: "Failed to save lead. Please try again later.", detail: firebaseError.message },
        { status: 500 }
      );
    }

    // 5. Send Email via Resend (Optional)
    if (!process.env.RESEND_API_KEY) {
      // Return true since it successfully saved to Firebase, even if no email is sent.
      return NextResponse.json({ success: true, savedToDb: true });
    }

    const toEmail = process.env.CONTACT_EMAIL || "owner@example.com";

    // HTML Email Template
    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e40af;">New Service Request</h2>
        <p>A new lead has been submitted via the website contact form.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 120px;">Name</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Phone</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">
              <a href="tel:${phone}">${phone}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">
              ${email ? `<a href="mailto:${email}">${email}</a>` : "Not provided"}
            </td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Service</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${service}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;" colspan="2">Message</td>
          </tr>
          <tr>
            <td style="padding: 10px; background-color: #f8fafc; border-radius: 4px;" colspan="2">
              ${message.replace(/\n/g, "<br>")}
            </td>
          </tr>
        </table>
        
        <div style="margin-top: 30px; font-size: 12px; color: #64748b;">
          This message was sent from your website's contact form.
        </div>
      </div>
    `;

    const { error: resendError } = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: [toEmail],
      subject: `New Service Request: ${service} from ${name}`,
      html: emailHtml,
      replyTo: email || undefined,
    });

    if (resendError) {
      console.error("Failed to send email via Resend:", resendError);
      return NextResponse.json(
        { error: "Failed to send email notification.", detail: resendError },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, savedToDb: true, emailSent: true });

  } catch (error: unknown) {
    console.error("API Contact Error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
