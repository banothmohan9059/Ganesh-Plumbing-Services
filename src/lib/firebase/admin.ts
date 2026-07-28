import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

let authInstance = null;
let dbInstance = null;

// Initialize the Firebase Admin SDK if not already initialized.
try {
  if (!getApps().length) {
    if (process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL) {
      initializeApp({
        credential: cert({
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          // Private keys in env variables often need newline characters replaced
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
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
