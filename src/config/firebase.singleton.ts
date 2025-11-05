import admin from "firebase-admin";
import { envs } from "./envs";

export default class FirebaseSingleton {
  private static instance: admin.app.App;

  static getInstance(): admin.app.App {
    if (!FirebaseSingleton.instance) {
      FirebaseSingleton.instance = admin.initializeApp({
        credential: admin.credential.cert(envs.FIREBASE_SERVICE_ACCOUNT_PATH as admin.ServiceAccount),
      });
      console.log("Firebase initialized successfully (singleton)");
    }
    return FirebaseSingleton.instance;
  }
}