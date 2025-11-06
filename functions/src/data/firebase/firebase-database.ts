import admin from "firebase-admin";
import { Firestore } from "firebase-admin/firestore";

export class FirestoreDatabase {
  private static db: Firestore | null = null;

  static connect(): Firestore {
    if (this.db) return this.db;
    this.db = admin.firestore();
    console.log("Firestore connected successfully");
    return this.db;
  }

  static dbInstance(): Firestore {
    if (!this.db) throw new Error("Firestore not initialized. Call connect() first.");
    return this.db;
  }
}