import { initFirebaseAdmin } from "@/lib/firebase/admin";

export interface LocationData {
  id: string;
  name: string;
  areaInfo: string;
  popularServices: string[];
}

/**
 * Fetches all locations from the Firestore 'locations' collection using Firebase Admin SDK.
 * This is designed to be used by Next.js Server Components.
 */
export async function getLocations(): Promise<LocationData[]> {
  try {
    const { adminDb, adminError } = await initFirebaseAdmin();
    
    if (adminError || !adminDb) {
      console.error("Firebase admin error while fetching locations:", adminError);
      return [];
    }
    
    const snapshot = await adminDb.collection("locations").get();
    
    const locations = snapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<LocationData, "id">)
    }));

    return locations;
  } catch (error) {
    console.error("Error fetching locations from Firestore:", error);
    return [];
  }
}
