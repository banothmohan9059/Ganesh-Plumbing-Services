"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ImageIcon, Loader2, Check } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { MediaItem } from "@/types";
import { auth } from "@/lib/firebase/client";

interface MediaLibraryModalProps {
  onSelect: (url: string) => void;
  folder?: string;
  trigger?: React.ReactElement;
}

export function MediaLibraryModal({ onSelect, folder = "ganesh-plumbing", trigger }: MediaLibraryModalProps) {
  const [open, setOpen] = useState(false);
  const [resources, setResources] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMedia = async () => {
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
    };

    if (open) {
      fetchMedia();
    }
  }, [open, folder]);

  const handleSelect = (resource: MediaItem) => {
    // Return optimized URL
    const optimizedUrl = resource.secure_url.replace("/upload/", "/upload/f_auto,q_auto/");
    onSelect(optimizedUrl);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger 
        render={
          trigger || (
            <Button variant="outline" type="button" className="w-full">
              <ImageIcon className="mr-2 size-4" />
              Browse Media Library
            </Button>
          )
        }
      />
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Media Library</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto min-h-0 py-4">
          {loading ? (
            <div className="h-full flex items-center justify-center">
              <Loader2 className="size-8 animate-spin text-brand-500" />
            </div>
          ) : resources.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
              <ImageIcon className="size-12 mb-4 opacity-20" />
              <p>No media found in {folder}.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {resources.map((resource) => (
                <div 
                  role="button"
                  tabIndex={0}
                  aria-label={`Select image ${resource.public_id}`}
                  key={resource.public_id} 
                  className="relative group cursor-pointer aspect-square rounded-xl overflow-hidden border border-border hover:border-brand-500 transition-all"
                  onClick={() => handleSelect(resource)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelect(resource);
                    }
                  }}
                >
                  <Image 
                    src={resource.secure_url.replace("/upload/", "/upload/w_400,f_auto,q_auto/")} 
                    alt={resource.public_id}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button size="sm" variant="secondary">
                      <Check className="size-4 mr-2" /> Select
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
