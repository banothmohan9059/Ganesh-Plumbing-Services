"use client";

import { useState } from "react";
import { db } from "@/lib/firebase/client";
import { collection, doc, setDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ALL_SERVICES } from "@/lib/services-page-data";
import { TARGET_LOCATIONS } from "@/lib/location-data";

export default function MigrateDataPage() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState("");

  const runMigration = async () => {
    setLoading(true);
    try {
      // 1. Migrate Services
      setProgress("Migrating Services...");
      for (const service of ALL_SERVICES) {
        // We already replaced 'icon' with 'iconName' in the types, so no need to strip it.
        const serviceDataToSave = { ...service };
        
        await setDoc(doc(collection(db, "services"), service.id), {
          ...serviceDataToSave,
          iconName: service.id // A temporary string identifier we can use later to map icons
        });
      }

      // 2. Migrate Locations
      setProgress("Migrating Locations...");
      for (const loc of TARGET_LOCATIONS) {
        await setDoc(doc(collection(db, "locations"), loc.id), loc);
      }

      // Optional: Add basic testimonials/gallery logic here if needed

      setProgress("Migration Complete!");
      toast.success("Successfully migrated all local data to Firestore!");
    } catch (error: unknown) {
      console.error("Migration failed:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Migration failed: Unknown error");
      }
      setProgress("Migration Failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-heading">Data Migration Tool</h1>
        <p className="text-muted-foreground mt-2">
          Click the button below to push all your hardcoded static arrays (Services, Locations) into your live Firestore Database.
          You only need to do this ONCE.
        </p>
      </div>

      <div className="bg-card p-6 rounded-xl border">
        <Button 
          onClick={runMigration} 
          disabled={loading}
          className="w-full h-12 bg-brand-600 hover:bg-brand-700 text-white font-semibold"
        >
          {loading ? "Migrating Data..." : "Run Migration"}
        </Button>

        {progress && (
          <p className="mt-4 text-sm font-medium text-center text-foreground/80">
            Status: {progress}
          </p>
        )}
      </div>
    </div>
  );
}
