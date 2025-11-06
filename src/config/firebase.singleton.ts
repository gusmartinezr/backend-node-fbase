import admin from "firebase-admin";
import fs from "fs";
import path from "path";
import { envs } from "./envs";

export default class FirebaseSingleton {
  private static instance: admin.app.App;

  static getInstance(): admin.app.App {
    if (!FirebaseSingleton.instance) {
      const serviceAccountPath = path.resolve(envs.FIREBASE_SERVICE_ACCOUNT_PATH);
      const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

      FirebaseSingleton.instance = admin.initializeApp({
        credential: admin.credential.cert({
          projectId: serviceAccount.project_id,
          clientEmail: serviceAccount.client_email,
          privateKey: serviceAccount.private_key.replace(/\\n/g, "\n"), // <- importante
        }),
      });

      console.log("Firebase initialized successfully (singleton)");
    }
    return FirebaseSingleton.instance;
  }
}
