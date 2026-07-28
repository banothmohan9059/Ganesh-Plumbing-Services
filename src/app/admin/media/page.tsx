"use client";

import { useState, useEffect } from "react";
import { Loader2, Trash, Copy, ImageIcon, FolderOpen } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { MediaItem } from "@/types";
import Image from "next/image";
import { useCallback } from "react";
import { auth } from "@/lib/firebase/client";

const CATEGORIES = [
  { id: "ganesh-plumbing", label: "All Media" },
  { id: "ganesh-plumbing/general", label: "General" },
  { id: "ganesh-plumbing/gallery", label: "Gallery" },
  { id: "ganesh-plumbing/services", label: "Services" },
  { id: "ganesh-plumbing/hero", label: "Hero" },
  { id: "ganesh-plumbing/logo", label: "Logo" },
];

export default function AdminMediaPage() {
  const [resources, setResources] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFolder, setActiveFolder] = useState("ganesh-plumbing");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchMedia = useCallback(async (folder: string) => {
    setLoading(true);
    try {
      const token = await auth.currentUser?.getIdToken();
      const res = await fetch(`/api/cloudinary/media?folder=${folder}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error("Failed to fetch media");
      const data = await res.json();
      setResources(data.resources || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load media library");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // We use a small timeout to avoid synchronous setState warnings in some strict React setups
    const timer = setTimeout(() => {
      fetchMedia(activeFolder);
    }, 0);
    return () => clearTimeout(timer);
  }, [activeFolder, fetchMedia]);

  const handleDelete = async (publicId: string) => {
    if (!confirm("Are you sure you want to permanently delete this image from Cloudinary?")) return;

    setDeletingId(publicId);
    try {
      const token = await auth.currentUser?.getIdToken();
      const res = await fetch("/api/cloudinary/media", {
        method: "DELETE",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ publicId }),
      });
      
      if (!res.ok) throw new Error("Delete failed");
      
      toast.success("Image deleted successfully");
      setResources(resources.filter(r => r.public_id !== publicId));
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete image");
    } finally {
      setDeletingId(null);
    }
  };

  const handleCopyUrl = (url: string) => {
    const optimizedUrl = url.replace("/upload/", "/upload/f_auto,q_auto/");
    navigator.clipboard.writeText(optimizedUrl);
    toast.success("Image URL copied to clipboard!");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-heading">Media Library</h1>
        <p className="text-muted-foreground mt-1">Manage all your uploaded images in Cloudinary.</p>
      </div>

      {/* Upload Section */}
      <div className="bg-card border rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <UploadIcon /> Upload New Image
        </h2>
        <div className="max-w-xl">
          <ImageUpload 
            onChange={() => {
              // Refresh the current folder if we uploaded to it
              fetchMedia(activeFolder);
            }} 
            folder={activeFolder === "ganesh-plumbing" ? "ganesh-plumbing/general" : activeFolder}
          />
        </div>
      </div>

      {/* Library Section */}
      <div className="space-y-4">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <Button
              key={cat.id}
              variant={activeFolder === cat.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFolder(cat.id)}
              className="rounded-full"
            >
              <FolderOpen className="mr-2 size-3.5" />
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Grid */}
        <div className="bg-card border rounded-xl p-6 shadow-sm min-h-[400px]">
          {loading ? (
            <div className="h-64 flex flex-col items-center justify-center text-muted-foreground">
              <Loader2 className="size-8 animate-spin text-brand-500 mb-4" />
              <p>Loading media...</p>
            </div>
          ) : resources.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-muted-foreground">
              <ImageIcon className="size-12 mb-4 opacity-20" />
              <p>No images found in {CATEGORIES.find(c => c.id === activeFolder)?.label}.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {resources.map((resource) => (
                <div key={resource.public_id} className="group relative rounded-xl border border-border overflow-hidden aspect-square bg-muted">
                  <Image 
                    src={resource.secure_url.replace("/upload/", "/upload/w_400,f_auto,q_auto/")} 
                    alt={resource.public_id}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                    <div className="flex justify-end">
                      <Button 
                        size="icon" 
                        variant="destructive" 
                        className="size-8 rounded-full"
                        onClick={() => handleDelete(resource.public_id)}
                        disabled={deletingId === resource.public_id}
                      >
                        {deletingId === resource.public_id ? <Loader2 className="size-4 animate-spin" /> : <Trash className="size-4" />}
                      </Button>
                    </div>
                    
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      className="w-full bg-white/20 hover:bg-white/30 text-white border-0"
                      onClick={() => handleCopyUrl(resource.secure_url)}
                    >
                      <Copy className="size-3.5 mr-2" /> Copy URL
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function UploadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
  );
}
