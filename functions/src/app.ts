// functions/src/app.ts
import express from "express";
import cors from "cors";
import FirebaseSingleton from "./config/firebase.singleton";
import { AppRoutes } from "./presentation/routes";
import { FirestoreDatabase } from "./data/firebase/firebase-database";

export function makeApp() {
  const app = express();

  // Health trivial
  app.get("/__health", (_req, res) => res.status(200).send("ok"));

  app.use(cors());
  app.use(express.json());

  // Inicializaciones protegidas
  try { FirebaseSingleton.getInstance(); } 
  catch (e) { console.error("Admin init failed:", e); }

  try { 
    FirestoreDatabase.connect();
    console.log("Firestore connected successfully");
  } catch (e) { 
    console.error("Firestore connect failed:", e);
  }

  try {
    if (!AppRoutes?.routes) throw new Error("AppRoutes.routes undefined");
    app.use(AppRoutes.routes);
  } catch (e) {
    console.error("Routes mount failed:", e);
    app.get("/", (_req, res) => res.json({ ok: true, msg: "API up (routes not mounted)" }));
  }

  app.use((err: unknown, _req: any, res: any, _next: any) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ ok: false, error: String(err) });
  });

  return app;
}
