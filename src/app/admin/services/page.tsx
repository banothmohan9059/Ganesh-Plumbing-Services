"use client";

import { useEffect, useState } from "react";
import { collection, query, onSnapshot, doc, deleteDoc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Edit, Trash, Plus, Save, X } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  iconName?: string;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Edit State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Service>>({});

  useEffect(() => {
    const q = query(collection(db, "services"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: Service[] = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Service);
      });
      setServices(data);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching services:", error);
      toast.error("Failed to load services");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleEdit = (service: Service) => {
    setEditingId(service.id);
    setEditForm(service);
  };

  const handleSave = async () => {
    if (!editingId || !editForm.title || !editForm.description) {
      toast.error("Title and description are required.");
      return;
    }
    
    try {
      const ref = doc(db, "services", editingId);
      await updateDoc(ref, {
        title: editForm.title,
        description: editForm.description,
        features: editForm.features || [],
        iconName: editForm.iconName || "Wrench"
      });
      toast.success("Service updated!");
      setEditingId(null);
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update service");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      try {
        await deleteDoc(doc(db, "services", id));
        toast.success("Service deleted!");
      } catch {
        toast.error("Failed to delete service");
      }
    }
  };

  const handleCreateNew = async () => {
    const newId = prompt("Enter a unique URL slug for the new service (e.g., 'pipe-repair'):");
    if (!newId) return;

    try {
      await setDoc(doc(db, "services", newId), {
        title: "New Service",
        description: "Description goes here.",
        features: ["Feature 1", "Feature 2"],
        iconName: "Wrench"
      });
      toast.success("New service created! You can now edit it.");
    } catch {
      toast.error("Failed to save service");
    }
  };

  if (loading) return <div className="p-8 text-center">Loading services...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-heading">Manage Services</h1>
          <p className="text-muted-foreground mt-1">Add, edit, or remove services offered by Ganesh Plumbing.</p>
        </div>
        <Button onClick={handleCreateNew} className="bg-brand-600 hover:bg-brand-700">
          <Plus className="size-4 mr-2" /> Add Service
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map(service => (
          <div key={service.id} className="bg-card border rounded-xl p-5 shadow-sm space-y-4">
            {editingId === service.id ? (
              // EDIT MODE
              <div className="space-y-3">
                <input 
                  aria-label="Service Title"
                  type="text" 
                  value={editForm.title} 
                  onChange={e => setEditForm({...editForm, title: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 text-sm font-bold"
                  placeholder="Service Title"
                />
                <textarea 
                  aria-label="Service Description"
                  value={editForm.description} 
                  onChange={e => setEditForm({...editForm, description: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 text-sm h-24"
                  placeholder="Service Description"
                />
                <div>
                  <label htmlFor="service-features" className="text-xs font-semibold text-muted-foreground mb-1 block">Features (comma separated)</label>
                  <input 
                    id="service-features"
                    type="text" 
                    value={editForm.features?.join(", ")} 
                    onChange={e => setEditForm({...editForm, features: e.target.value.split(",").map(f => f.trim())})}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
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
                  <h3 className="font-bold text-lg">{service.title}</h3>
                  <p className="text-xs text-muted-foreground font-mono">ID: {service.id}</p>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3">{service.description}</p>
                <div className="flex flex-wrap gap-1">
                  {service.features?.slice(0, 3).map((f, i) => (
                    <span key={i} className="text-[10px] bg-muted px-2 py-1 rounded-md">{f}</span>
                  ))}
                  {service.features?.length > 3 && <span className="text-[10px] text-muted-foreground">+{service.features.length - 3} more</span>}
                </div>
                <div className="flex gap-2 pt-2 border-t mt-4">
                  <Button size="sm" variant="outline" className="flex-1" onClick={() => handleEdit(service)}>
                    <Edit className="size-4 mr-2" /> Edit
                  </Button>
                  <Button size="sm" variant="destructive" className="flex-1" onClick={() => handleDelete(service.id)}>
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
