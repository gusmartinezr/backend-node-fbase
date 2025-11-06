import { initializeApp, applicationDefault, App } from "firebase-admin/app";

export default class FirebaseSingleton {
  private static instance: App | null = null;

  static getInstance(): App {
    if (FirebaseSingleton.instance) return FirebaseSingleton.instance;
    FirebaseSingleton.instance = initializeApp({ credential: applicationDefault() });
    return FirebaseSingleton.instance;
  }
}
