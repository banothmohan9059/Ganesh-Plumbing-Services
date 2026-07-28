"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  Users, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare,
  CheckCircle2,
  LogOut,
  Plus,
  X,
  Wrench
} from "lucide-react";
import { auth } from "@/lib/firebase/client";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

import { Lead } from "@/types";

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddLead, setShowAddLead] = useState(false);
  const [newLeadForm, setNewLeadForm] = useState({
    name: "",
    phone: "",
    service: "General Inquiry",
    message: "",
  });
  const router = useRouter();

  useEffect(() => {
    let unsubscribe: () => void;
    let fallbackTimeout: NodeJS.Timeout;

    import("firebase/firestore").then(({ collection, query, orderBy, onSnapshot }) => {
      try {
        const q = query(collection(db, "leads"), orderBy("createdAt", "desc"));
        
        // If Firestore hangs for more than 5 seconds, assume it's not created
        fallbackTimeout = setTimeout(() => {
          if (loading) {
            toast.error("Database connection timed out. Did you create Firestore in the console?");
            setLoading(false);
          }
        }, 5000);

        unsubscribe = onSnapshot(q, (snapshot) => {
          clearTimeout(fallbackTimeout);
          const fetchedLeads: Lead[] = [];
          snapshot.forEach((doc) => {
            fetchedLeads.push({ id: doc.id, ...doc.data() } as Lead);
          });
          setLeads(fetchedLeads);
          setLoading(false);
        }, (error) => {
          clearTimeout(fallbackTimeout);
          console.error("Error fetching leads:", error);
          toast.error("Failed to load leads. Did you create the Firestore Database?");
          setLoading(false);
        });
      } catch (err) {
        console.error("Firestore init error:", err);
        toast.error("Could not connect to database. Please create it in Firebase Console.");
        setLoading(false);
      }
    }).catch(err => {
      console.error("Dynamic import error:", err);
      setLoading(false);
    });

    return () => {
      if (unsubscribe) unsubscribe();
      if (fallbackTimeout) clearTimeout(fallbackTimeout);
    };
  }, [loading]);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { doc, updateDoc } = await import("firebase/firestore");
      const leadRef = doc(db, "leads", id);
      await updateDoc(leadRef, { status: newStatus });
      toast.success(`Lead marked as ${newStatus}`);
    } catch {
      toast.error("Failed to update lead status");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/admin/login");
    } catch {
      toast.error("Failed to logout");
    }
  };

  const handleAddLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadForm.name || !newLeadForm.phone) {
      toast.error("Name and phone are required");
      return;
    }
    
    try {
      const { collection, addDoc, serverTimestamp } = await import("firebase/firestore");
      await addDoc(collection(db, "leads"), {
        name: newLeadForm.name,
        phone: newLeadForm.phone,
        email: null,
        service: newLeadForm.service,
        message: newLeadForm.message,
        status: "new",
        createdAt: serverTimestamp(),
      });
      toast.success("Lead added successfully!");
      setShowAddLead(false);
      setNewLeadForm({ name: "", phone: "", service: "General Inquiry", message: "" });
    } catch {
      toast.error("Failed to add lead manually");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-blue-100 text-blue-800 border-blue-200";
      case "contacted": return "bg-amber-100 text-amber-800 border-amber-200";
      case "resolved": return "bg-emerald-100 text-emerald-800 border-emerald-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading dashboard data...</div>;
  }

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Topbar */}
      <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold">
            G
          </div>
          <h1 className="font-heading font-bold text-xl">Admin Dashboard</h1>
        </div>
        <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground">
          <LogOut className="size-4 mr-2" />
          Logout
        </Button>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6 space-y-6">
        
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold font-heading">Recent Leads</h2>
          <div className="flex gap-4 items-center">
            <div className="text-sm text-muted-foreground hidden sm:block">
              Total: {leads.length} leads
            </div>
            <Button onClick={() => setShowAddLead(true)} className="bg-brand-600 hover:bg-brand-700">
              <Plus className="size-4 mr-2" /> Add Lead
            </Button>
          </div>
        </div>

        {showAddLead && (
          <div className="bg-card p-6 rounded-2xl border shadow-lg mb-6 relative">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-4 top-4 rounded-full"
              onClick={() => setShowAddLead(false)}
              aria-label="Close manual lead entry"
            >
              <X className="size-4" />
            </Button>
            <h3 className="font-bold text-lg mb-4">Manual Lead Entry</h3>
            <form onSubmit={handleAddLead} className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="lead-name" className="block text-sm font-medium mb-1">Customer Name *</label>
                <input 
                  id="lead-name"
                  type="text" 
                  value={newLeadForm.name}
                  onChange={e => setNewLeadForm({...newLeadForm, name: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  placeholder="e.g. Rahul Sharma"
                  required
                />
              </div>
              <div>
                <label htmlFor="lead-phone" className="block text-sm font-medium mb-1">Phone Number *</label>
                <input 
                  id="lead-phone"
                  type="tel" 
                  value={newLeadForm.phone}
                  onChange={e => setNewLeadForm({...newLeadForm, phone: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  placeholder="e.g. +91 9876543210"
                  required
                />
              </div>
              <div>
                <label htmlFor="lead-service" className="block text-sm font-medium mb-1">Service Required</label>
                <input 
                  id="lead-service"
                  type="text" 
                  value={newLeadForm.service}
                  onChange={e => setNewLeadForm({...newLeadForm, service: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  placeholder="e.g. WhatsApp Lead - Tap Repair"
                />
              </div>
              <div>
                <label htmlFor="lead-message" className="block text-sm font-medium mb-1">Message / Notes</label>
                <input 
                  id="lead-message"
                  type="text" 
                  value={newLeadForm.message}
                  onChange={e => setNewLeadForm({...newLeadForm, message: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  placeholder="Any additional details"
                />
              </div>
              <div className="sm:col-span-2 pt-2">
                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">Save Lead</Button>
              </div>
            </form>
          </div>
        )}

        {leads.length === 0 ? (
          <div className="text-center py-20 bg-card rounded-2xl border border-dashed">
            <Users className="size-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium">No leads yet</h3>
            <p className="text-muted-foreground text-sm">When customers fill out the contact form, they will appear here.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {leads.map((lead) => (
              <div key={lead.id} className="bg-card rounded-xl p-5 border shadow-sm flex flex-col md:flex-row gap-4 md:items-start justify-between">
                
                {/* Left: Info */}
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-lg">{lead.name}</h3>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium uppercase tracking-wider ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Phone className="size-4 text-brand-500" />
                      <a href={`tel:${lead.phone}`} className="hover:text-brand-600 hover:underline">{lead.phone}</a>
                    </div>
                    {lead.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="size-4 text-brand-500" />
                        <a href={`mailto:${lead.email}`} className="hover:text-brand-600 hover:underline">{lead.email}</a>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Wrench className="size-4 text-brand-500" />
                      <span className="font-medium text-foreground">{lead.service}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="size-4 text-brand-500" />
                      {lead.createdAt && typeof lead.createdAt === 'object' && 'seconds' in lead.createdAt
                        ? new Date((lead.createdAt as {seconds: number}).seconds * 1000).toLocaleString() 
                        : "Just now"}
                    </div>
                  </div>

                  {lead.message && (
                    <div className="mt-3 bg-muted/50 p-3 rounded-lg text-sm flex gap-3 items-start border">
                      <MessageSquare className="size-4 text-muted-foreground shrink-0 mt-0.5" />
                      <p className="text-foreground/80 leading-relaxed">{lead.message}</p>
                    </div>
                  )}
                </div>

                {/* Right: Actions */}
                <div className="flex flex-row md:flex-col gap-2 shrink-0 border-t pt-4 md:border-t-0 md:pt-0">
                  {lead.status === "new" && (
                    <Button size="sm" variant="outline" className="w-full" onClick={() => updateStatus(lead.id, "contacted")}>
                      Mark Contacted
                    </Button>
                  )}
                  {lead.status !== "resolved" && (
                    <Button size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={() => updateStatus(lead.id, "resolved")}>
                      <CheckCircle2 className="size-4 mr-1.5" />
                      Resolve
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}


