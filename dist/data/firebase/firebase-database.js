"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirestoreDatabase = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
class FirestoreDatabase {
    static connect() {
        if (this.db)
            return this.db;
        this.db = firebase_admin_1.default.firestore();
        console.log("Firestore connected successfully");
        return this.db;
    }
    static dbInstance() {
        if (!this.db)
            throw new Error("Firestore not initialized. Call connect() first.");
        return this.db;
    }
}
exports.FirestoreDatabase = FirestoreDatabase;
FirestoreDatabase.db = null;
