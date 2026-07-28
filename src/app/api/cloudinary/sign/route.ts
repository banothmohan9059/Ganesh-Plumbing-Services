import { NextResponse } from "next/server";
import { cloudinary } from "@/lib/cloudinary";
import { z } from "zod";
import { adminAuth } from "@/lib/firebase/admin";

const signSchema = z.object({
  paramsToSign: z.record(z.string(), z.any()),
});

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const token = authHeader.split("Bearer ")[1];
    if (!adminAuth) {
      console.warn("adminAuth is not initialized");
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

    try {
      await adminAuth.verifyIdToken(token);
    } catch {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 403 });
    }

    const body = await request.json().catch(() => ({}));
    const validatedResult = signSchema.safeParse(body);

    if (!validatedResult.success) {
      return NextResponse.json(
        { error: "Invalid parameters", details: validatedResult.error.format() }, 
        { status: 400 }
      );
    }

    const { paramsToSign } = validatedResult.data;

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET as string
    );

    return NextResponse.json({ 
      signature, 
      apiKey: process.env.CLOUDINARY_API_KEY 
    });
  } catch (error) {
    console.error("Signature generation error:", error);
    return NextResponse.json({ error: "Failed to generate signature" }, { status: 500 });
  }
}
