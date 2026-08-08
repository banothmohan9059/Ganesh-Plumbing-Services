import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

let authInstance = null;
let dbInstance = null;
let adminInitError: string | null = null;

try {
  if (!getApps().length) {
    if (process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL && process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
      
      let privateKey = process.env.FIREBASE_PRIVATE_KEY;
      
      // If the user pasted the entire JSON string, parse it out
      try {
        const parsedJSON = JSON.parse(privateKey);
        if (parsedJSON.private_key) {
           privateKey = parsedJSON.private_key;
        }
      } catch {
        // Not JSON, continue treating as raw string
      }

      if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
        privateKey = privateKey.slice(1, -1);
      }
      if (privateKey.startsWith("'") && privateKey.endsWith("'")) {
        privateKey = privateKey.slice(1, -1);
      }
      privateKey = privateKey.replace(/\\n/g, "\n");

      let clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
      if (clientEmail.startsWith('"') && clientEmail.endsWith('"')) clientEmail = clientEmail.slice(1, -1);

      let projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
      if (projectId.startsWith('"') && projectId.endsWith('"')) projectId = projectId.slice(1, -1);

      initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
      authInstance = getAuth();
      dbInstance = getFirestore();
    } else {
      console.warn("Firebase Admin missing credentials. Admin features disabled.");
      adminInitError = "Missing credentials in environment variables.";
    }
  } else {
    authInstance = getAuth();
    dbInstance = getFirestore();
  }
} catch (error: unknown) {
  console.error("Firebase admin initialization error", error);
  adminInitError = error instanceof Error ? error.message : String(error);
}

export const adminAuth = authInstance;
export const adminDb = dbInstance;
export const adminError = adminInitError;
