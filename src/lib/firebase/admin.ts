import type { Auth } from "firebase-admin/auth";
import type { Firestore } from "firebase-admin/firestore";

let authInstance: Auth | null = null;
let dbInstance: Firestore | null = null;
let isInitialized = false;

export async function initFirebaseAdmin() {
  if (isInitialized) {
    return { adminAuth: authInstance, adminDb: dbInstance, adminError: null };
  }

  let adminInitError: string | null = null;

  try {
    const { getApps, initializeApp, cert } = await import("firebase-admin/app");
    const { getAuth } = await import("firebase-admin/auth");
    const { getFirestore } = await import("firebase-admin/firestore");

    if (!getApps().length) {
      if (process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL && process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
        
        let privateKey = process.env.FIREBASE_PRIVATE_KEY;
        
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
        isInitialized = true;
      } else {
        console.warn("Firebase Admin missing credentials. Admin features disabled.");
        adminInitError = "Missing credentials in environment variables.";
      }
    } else {
      authInstance = getAuth();
      dbInstance = getFirestore();
      isInitialized = true;
    }
  } catch (error: unknown) {
    console.error("Firebase admin initialization error", error);
    adminInitError = error instanceof Error ? error.message : String(error);
  }

  return {
    adminAuth: authInstance,
    adminDb: dbInstance,
    adminError: adminInitError
  };
}
