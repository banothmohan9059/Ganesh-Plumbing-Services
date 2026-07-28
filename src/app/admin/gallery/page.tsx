"use client";

import { useEffect, useState } from "react";
import { collection, query, onSnapshot, doc, deleteDoc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Edit, Trash, Plus, Save, X, Image as ImageIcon } from "lucide-react";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { MediaLibraryModal } from "@/components/admin/MediaLibraryModal";
import Image from "next/image";

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: string;
}

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<GalleryItem>>({});

  useEffect(() => {
    const q = query(collection(db, "gallery"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: GalleryItem[] = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as GalleryItem);
      });
      setItems(data);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching gallery:", error);
      toast.error("Failed to load gallery items");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleEdit = (item: GalleryItem) => {
    setEditingId(item.id);
    setEditForm(item);
  };


  const handleSave = async () => {
    if (!editingId || !editForm.title || !editForm.src) {
      toast.error("Title and Image are required.");
      return;
    }
    
    try {
      const docRef = doc(db, "gallery", editingId);
      await updateDoc(docRef, {
        title: editForm.title,
        src: editForm.src,
        alt: editForm.alt || editForm.title,
        category: editForm.category || "General",
      });
      toast.success("Gallery item updated!");
      setEditingId(null);
    } catch {
      toast.error("Failed to update gallery item");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this image?")) {
      try {
        await deleteDoc(doc(db, "gallery", id));
        toast.success("Item deleted!");
      } catch {
        toast.error("Failed to delete item");
      }
    }
  };

  const handleCreateNew = async () => {
    const newId = Date.now().toString();

    try {
      await setDoc(doc(db, "gallery", newId), {
        title: "New Project",
        src: "", // Empty so they know they need to upload
        alt: "New plumbing project",
        category: "Repairs",
      });
      setEditingId(newId);
      setEditForm({ title: "New Project", src: "", category: "Repairs" });
      toast.success("Created! Now provide an image URL.");
    } catch {
      toast.error("Failed to save item");
    }
  };

  if (loading) return <div className="p-8 text-center">Loading gallery...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-heading">Manage Gallery</h1>
          <p className="text-muted-foreground mt-1">Upload and edit photos for your portfolio.</p>
        </div>
        <Button onClick={handleCreateNew} className="bg-brand-600 hover:bg-brand-700">
          <Plus className="size-4 mr-2" /> Add Image
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {items.map(item => (
          <div key={item.id} className="bg-card border rounded-xl overflow-hidden shadow-sm flex flex-col">
            <div className="aspect-square bg-muted relative">
              {item.src ? (
                <Image src={item.src} alt={item.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover w-full h-full" />
              ) : (
                <div className="flex flex-col items-center justify-center w-full h-full bg-slate-100">
                  <ImageIcon className="size-8 text-muted-foreground mb-2" />
                  <span className="text-xs text-muted-foreground">No image yet</span>
                </div>
              )}
            </div>
            
            <div className="p-4 space-y-4 flex-1 flex flex-col justify-between">
              {editingId === item.id ? (
                // EDIT MODE
                <div className="space-y-3">
                  <input 
                    aria-label="Project Title"
                    type="text" 
                    value={editForm.title} 
                    onChange={e => setEditForm({...editForm, title: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2 text-sm font-bold"
                    placeholder="Project Title"
                  />
                  
                  {/* Cloudinary Image Upload & Media Library */}
                  <div className="space-y-3">
                    <span className="text-xs font-semibold text-muted-foreground block">Project Image</span>
                    <ImageUpload 
                      value={editForm.src} 
                      onChange={(url) => setEditForm({ ...editForm, src: url })} 
                      folder="ganesh-plumbing/gallery"
                    />
                    
                    {!editForm.src && (
                      <div className="pt-2">
                        <MediaLibraryModal 
                          folder="ganesh-plumbing/gallery" 
                          onSelect={(url) => setEditForm({ ...editForm, src: url })} 
                        />
                      </div>
                    )}
                  </div>

                  <input 
                    type="text" 
                    value={editForm.category} 
                    onChange={e => setEditForm({...editForm, category: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    placeholder="Category (e.g. Repairs)"
                  />
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" onClick={handleSave} className="w-full bg-emerald-600 hover:bg-emerald-700">
                      <Save className="size-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setEditingId(null)} className="w-full">
                      <X className="size-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                // VIEW MODE
                <>
                  <div>
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="text-xs text-brand-600 font-medium">{item.category}</p>
                  </div>
                  <div className="flex gap-2 pt-2 border-t mt-4">
                    <Button size="sm" variant="outline" className="flex-1" onClick={() => handleEdit(item)}>
                      <Edit className="size-4 mr-2" /> Edit
                    </Button>
                    <Button size="sm" variant="destructive" className="flex-1" onClick={() => handleDelete(item.id)}>
                      <Trash className="size-4 mr-2" /> Delete
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
