"use client";

import { useState, useCallback, useRef } from "react";
import { UploadCloud, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { auth } from "@/lib/firebase/client";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
}

export function ImageUpload({ value, onChange, folder = "ganesh-plumbing/general" }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    setIsUploading(true);
    const toastId = toast.loading("Uploading image...");

    try {
      // 1. Get Signature
      const timestamp = Math.round(new Date().getTime() / 1000);
      const paramsToSign = {
        timestamp,
        folder,
      };

      const token = await auth.currentUser?.getIdToken();

      const signRes = await fetch("/api/cloudinary/sign", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ paramsToSign }),
      });

      if (!signRes.ok) throw new Error("Failed to get signature");
      const { signature, apiKey } = await signRes.json();

      // 2. Upload to Cloudinary
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", apiKey);
      formData.append("timestamp", timestamp.toString());
      formData.append("signature", signature);
      formData.append("folder", folder);

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadData.error?.message || "Upload failed");

      // Apply f_auto,q_auto for optimization
      const optimizedUrl = uploadData.secure_url.replace("/upload/", "/upload/f_auto,q_auto/");
      
      onChange(optimizedUrl);
      toast.success("Image uploaded successfully!", { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload image", { id: toastId });
    } finally {
      setIsUploading(false);
    }
  };

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files?.[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleUpload(e.target.files[0]);
    }
  };

  if (value) {
    return (
      <div className="relative group overflow-hidden rounded-xl border border-border">
        <div className="aspect-video relative bg-muted">
          <Image 
            src={value} 
            alt="Uploaded media" 
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              Replace
            </Button>
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => onChange("")}
              disabled={isUploading}
              aria-label="Remove image"
            >
              <X className="size-4" />
            </Button>
          </div>
        </div>
        <input 
          type="file" 
          accept="image/*" 
          className="hidden" 
          ref={fileInputRef} 
          onChange={onFileChange} 
        />
      </div>
    );
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Upload image"
      className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer
        ${isDragOver ? 'border-brand-500 bg-brand-50' : 'border-border hover:bg-muted/50'}
        ${isUploading ? 'opacity-50 pointer-events-none' : ''}
      `}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={() => fileInputRef.current?.click()}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          fileInputRef.current?.click();
        }
      }}
    >
      <input 
        type="file" 
        accept="image/*" 
        className="hidden" 
        ref={fileInputRef} 
        onChange={onFileChange} 
      />
      <div className="flex flex-col items-center gap-3">
        {isUploading ? (
          <Loader2 className="size-8 text-brand-500 animate-spin" />
        ) : (
          <UploadCloud className="size-8 text-muted-foreground" />
        )}
        <div>
          <p className="text-sm font-semibold text-foreground">
            {isUploading ? "Uploading..." : "Click or drag image to upload"}
          </p>
          {!isUploading && (
            <p className="text-xs text-muted-foreground mt-1">
              Supports JPEG, PNG, WebP (Max 5MB)
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
