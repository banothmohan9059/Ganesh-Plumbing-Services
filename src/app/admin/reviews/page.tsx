"use client";

import { useEffect, useState } from "react";
import { collection, query, onSnapshot, doc, deleteDoc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Edit, Trash, Plus, Save, X, Star } from "lucide-react";

interface Review {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Review>>({});

  useEffect(() => {
    const q = query(collection(db, "reviews"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: Review[] = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Review);
      });
      setReviews(data);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching reviews:", error);
      toast.error("Failed to load reviews");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleEdit = (review: Review) => {
    setEditingId(review.id);
    setEditForm(review);
  };

  const handleSave = async () => {
    if (!editingId || !editForm.name || !editForm.content) {
      toast.error("Name and review content are required.");
      return;
    }
    
    try {
      const ref = doc(db, "reviews", editingId);
      await updateDoc(ref, {
        name: editForm.name,
        role: editForm.role || "Customer",
        content: editForm.content,
        rating: Number(editForm.rating) || 5,
      });
      toast.success("Review updated!");
      setEditingId(null);
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update review");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this review?")) {
      try {
        await deleteDoc(doc(db, "reviews", id));
        toast.success("Review deleted!");
      } catch {
        toast.error("Failed to delete review");
      }
    }
  };

  const handleCreateNew = async () => {
    const newId = Date.now().toString();

    try {
      await setDoc(doc(db, "reviews", newId), {
        name: "John Doe",
        role: "Homeowner",
        content: "Great plumbing service! Very professional.",
        rating: 5,
      });
      toast.success("New review created!");
    } catch {
      toast.error("Failed to save review");
    }
  };

  if (loading) return <div className="p-8 text-center">Loading reviews...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-heading">Manage Reviews</h1>
          <p className="text-muted-foreground mt-1">Add or edit customer testimonials displayed on the homepage.</p>
        </div>
        <Button onClick={handleCreateNew} className="bg-brand-600 hover:bg-brand-700">
          <Plus className="size-4 mr-2" /> Add Review
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map(review => (
          <div key={review.id} className="bg-card border rounded-xl p-5 shadow-sm space-y-4">
            {editingId === review.id ? (
              // EDIT MODE
              <div className="space-y-3">
                <input 
                  aria-label="Customer Name"
                  type="text" 
                  value={editForm.name} 
                  onChange={e => setEditForm({...editForm, name: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 text-sm font-bold"
                  placeholder="Customer Name"
                />
                <input 
                  aria-label="Role (e.g. Homeowner)"
                  type="text" 
                  value={editForm.role} 
                  onChange={e => setEditForm({...editForm, role: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  placeholder="Role (e.g. Homeowner)"
                />
                <div className="flex items-center gap-2">
                  <label htmlFor="review-rating" className="text-xs font-semibold text-muted-foreground">Rating (1-5):</label>
                  <input 
                    id="review-rating"
                    type="number" 
                    min="1" max="5"
                    value={editForm.rating} 
                    onChange={e => setEditForm({...editForm, rating: parseInt(e.target.value)})}
                    className="w-20 border rounded-lg px-3 py-1 text-sm"
                  />
                </div>
                <textarea 
                  aria-label="Review content"
                  value={editForm.content} 
                  onChange={e => setEditForm({...editForm, content: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 text-sm h-24"
                  placeholder="Review content"
                />
                <div className="flex gap-2 pt-2">
                  <Button size="sm" onClick={handleSave} className="w-full bg-emerald-600 hover:bg-emerald-700">
                    <Save className="size-4 mr-2" /> Save
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setEditingId(null)} className="w-full">
                    <X className="size-4 mr-2" /> Cancel
                  </Button>
                </div>
              </div>
            ) : (
              // VIEW MODE
              <>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-lg">{review.name}</h3>
                    <div className="flex items-center text-amber-500">
                      <Star className="size-4 fill-current" />
                      <span className="text-sm font-medium ml-1">{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-brand-600 font-medium">{review.role}</p>
                </div>
                <p className="text-sm text-muted-foreground italic line-clamp-4">&quot;{review.content}&quot;</p>
                
                <div className="flex gap-2 pt-2 border-t mt-4">
                  <Button size="sm" variant="outline" className="flex-1" onClick={() => handleEdit(review)}>
                    <Edit className="size-4 mr-2" /> Edit
                  </Button>
                  <Button size="sm" variant="destructive" className="flex-1" onClick={() => handleDelete(review.id)}>
                    <Trash className="size-4 mr-2" /> Delete
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
