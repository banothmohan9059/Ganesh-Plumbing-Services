import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

let authInstance = null;
let dbInstance = null;

// Initialize the Firebase Admin SDK if not already initialized.
try {
  if (!getApps().length) {
    if (process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL && process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
      
      let privateKey = process.env.FIREBASE_PRIVATE_KEY;
      // Remove surrounding quotes if added accidentally
      if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
        privateKey = privateKey.slice(1, -1);
      }
      if (privateKey.startsWith("'") && privateKey.endsWith("'")) {
        privateKey = privateKey.slice(1, -1);
      }
      // Replace literal '\n' with actual newlines
      privateKey = privateKey.replace(/\\n/g, "\n");

      initializeApp({
        credential: cert({
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey,
        }),
      });
      authInstance = getAuth();
      dbInstance = getFirestore();
    } else {
      console.warn("Firebase Admin missing credentials. Admin features disabled.");
    }
  } else {
    authInstance = getAuth();
    dbInstance = getFirestore();
  }
} catch (error) {
  console.error("Firebase admin initialization error", error);
}

export const adminAuth = authInstance;
export const adminDb = dbInstance;
