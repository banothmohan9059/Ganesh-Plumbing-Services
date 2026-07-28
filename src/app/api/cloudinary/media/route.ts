import { NextResponse } from "next/server";
import { cloudinary } from "@/lib/cloudinary";
import { z } from "zod";
import { adminAuth } from "@/lib/firebase/admin";

const getMediaSchema = z.object({
  folder: z.string().regex(/^[a-zA-Z0-9-_/]+$/, "Invalid folder name").default("ganesh-plumbing"),
});

const deleteMediaSchema = z.object({
  publicId: z.string().min(1, "publicId is required"),
});

export async function GET(request: Request) {
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

    const { searchParams } = new URL(request.url);
    const folderParam = searchParams.get("folder") || "ganesh-plumbing";
    
    const validatedResult = getMediaSchema.safeParse({ folder: folderParam });
    if (!validatedResult.success) {
      return NextResponse.json({ error: "Invalid folder parameter" }, { status: 400 });
    }
    const { folder } = validatedResult.data;
    
    // Use the search API to find resources in the specified folder
    const result = await cloudinary.search
      .expression(`folder:${folder}/*`)
      .sort_by("created_at", "desc")
      .max_results(500)
      .execute();

    return NextResponse.json({ resources: result.resources });
  } catch (error) {
    console.error("Cloudinary fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch media" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
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
    const validatedResult = deleteMediaSchema.safeParse(body);

    if (!validatedResult.success) {
      return NextResponse.json(
        { error: "Invalid publicId", details: validatedResult.error.format() }, 
        { status: 400 }
      );
    }

    const { publicId } = validatedResult.data;

    const result = await cloudinary.uploader.destroy(publicId);

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    return NextResponse.json({ error: "Failed to delete media" }, { status: 500 });
  }
}
