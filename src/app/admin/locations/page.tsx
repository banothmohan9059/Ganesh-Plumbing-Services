"use client";

import { useEffect, useState } from "react";
import { collection, query, onSnapshot, doc, deleteDoc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Edit, Trash, Plus, Save, X, MapPin } from "lucide-react";

interface LocationData {
  id: string;
  name: string;
  areaInfo: string;
  popularServices: string[];
}

export default function AdminLocationsPage() {
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<LocationData>>({});

  useEffect(() => {
    const q = query(collection(db, "locations"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: LocationData[] = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as LocationData);
      });
      setLocations(data);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching locations:", error);
      toast.error("Failed to load locations");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleEdit = (loc: LocationData) => {
    setEditingId(loc.id);
    setEditForm(loc);
  };

  const handleSave = async () => {
    if (!editingId || !editForm.name || !editForm.areaInfo) {
      toast.error("Name and area info are required.");
      return;
    }
    
    try {
      const ref = doc(db, "locations", editingId);
      await updateDoc(ref, {
        name: editForm.name,
        areaInfo: editForm.areaInfo,
        popularServices: editForm.popularServices || [],
      });
      toast.success("Location updated!");
      setEditingId(null);
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update location");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this location?")) {
      try {
        await deleteDoc(doc(db, "locations", id));
        toast.success("Location deleted!");
      } catch {
        toast.error("Failed to delete location");
      }
    }
  };

  const handleCreateNew = async () => {
    const newId = prompt("Enter a unique URL slug (e.g., 'madhapur'):");
    if (!newId) return;

    try {
      await setDoc(doc(db, "locations", newId), {
        name: "New Area",
        areaInfo: "Information about plumbing in this area.",
        popularServices: ["Service 1", "Service 2"],
      });
      toast.success("New location created!");
    } catch {
      toast.error("Failed to save location");
    }
  };

  if (loading) return <div className="p-8 text-center">Loading locations...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-heading">Manage Areas</h1>
          <p className="text-muted-foreground mt-1">Add or edit the locations Ganesh Plumbing serves.</p>
        </div>
        <Button onClick={handleCreateNew} className="bg-brand-600 hover:bg-brand-700">
          <Plus className="size-4 mr-2" /> Add Area
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {locations.map(loc => (
          <div key={loc.id} className="bg-card border rounded-xl p-5 shadow-sm space-y-4">
            {editingId === loc.id ? (
              // EDIT MODE
              <div className="space-y-3">
                <input 
                  aria-label="Area Name"
                  type="text" 
                  value={editForm.name} 
                  onChange={e => setEditForm({...editForm, name: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 text-sm font-bold"
                  placeholder="Area Name"
                />
                <textarea 
                  aria-label="Area Info (SEO Description)"
                  value={editForm.areaInfo} 
                  onChange={e => setEditForm({...editForm, areaInfo: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 text-sm h-24"
                  placeholder="Area Info (SEO Description)"
                />
                <div>
                  <label htmlFor="popularServices" className="text-xs font-semibold text-muted-foreground mb-1 block">Popular Services (comma separated)</label>
                  <input 
                    id="popularServices"
                    type="text" 
                    value={editForm.popularServices?.join(", ")} 
                    onChange={e => setEditForm({...editForm, popularServices: e.target.value.split(",").map(f => f.trim())})}
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
                <div className="flex items-center gap-2">
                  <MapPin className="size-5 text-brand-500" />
                  <div>
                    <h3 className="font-bold text-lg">{loc.name}</h3>
                    <p className="text-xs text-muted-foreground font-mono">ID: {loc.id}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3">{loc.areaInfo}</p>
                <div className="flex flex-wrap gap-1">
                  {loc.popularServices?.map((f, i) => (
                    <span key={i} className="text-[10px] bg-muted px-2 py-1 rounded-md">{f}</span>
                  ))}
                </div>
                <div className="flex gap-2 pt-2 border-t mt-4">
                  <Button size="sm" variant="outline" className="flex-1" onClick={() => handleEdit(loc)}>
                    <Edit className="size-4 mr-2" /> Edit
                  </Button>
                  <Button size="sm" variant="destructive" className="flex-1" onClick={() => handleDelete(loc.id)}>
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
